import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, join, relative, resolve } from "node:path";
import { projectRoot } from "./lib/local-database.ts";

async function freePorts() {
  for (const base of [59320, 57320, 60320, 61320]) {
    const servers = [];
    try {
      for (let offset = 0; offset < 5; offset++) {
        const server = createServer();
        await new Promise((accept, reject) => {
          server.once("error", reject);
          server.listen(base + offset, "127.0.0.1", accept);
        });
        servers.push(server);
      }
      return base;
    } catch {
      // Try another complete range without touching a running local project.
    } finally {
      await Promise.all(servers.map((server) => new Promise((done) => server.close(done))));
    }
  }
  throw new Error("No free port range for the isolated integration database.");
}

const base = await freePorts();
const temporary = mkdtempSync(join(tmpdir(), "doroboty-integration-"));
const workspace = join(temporary, "app");
cpSync(projectRoot, workspace, {
  recursive: true,
  filter: (source) => {
    const path = relative(projectRoot, source);
    if (!path) return true;
    const top = path.split(/[\\/]/)[0];
    return (
      ![".git", ".next", ".vercel", "node_modules", "test-results", ".temp", "artifacts"].includes(
        top,
      ) &&
      !top.startsWith(".env") &&
      !top.startsWith("playwright-report") &&
      basename(source) !== ".temp" &&
      !source.endsWith(".tsbuildinfo")
    );
  },
});
symlinkSync(resolve(projectRoot, "node_modules"), join(workspace, "node_modules"), "dir");
const configPath = join(workspace, "supabase/config.toml");
let config = readFileSync(configPath, "utf8").replace(
  /^project_id\s*=.*$/m,
  `project_id = "doroboty-ai-integration-${process.pid}"`,
);
for (let offset = 0; offset < 5; offset++)
  config = config.replaceAll(String(58320 + offset), String(base + offset));
writeFileSync(configPath, config);

const env = {
  ...process.env,
  AI_PROVIDER: "deterministic",
  AI_API_KEY: "",
  AI_GATEWAY_API_KEY: "",
};
function run(command, args, privateOutput = false) {
  const result = spawnSync(command, args, {
    cwd: workspace,
    env,
    encoding: "utf8",
    stdio: privateOutput ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.status !== 0)
    throw new Error(`Isolated integration command failed: ${command} ${args.join(" ")}`);
  return result.stdout;
}
try {
  run("npx", ["supabase", "start"], true);
  const status = JSON.parse(run("npx", ["supabase", "status", "-o", "json"], true));
  const api = new URL(status.API_URL);
  if (!["127.0.0.1", "localhost"].includes(api.hostname) || Number(api.port) !== base + 1)
    throw new Error("The integration database is not the isolated local target.");
  Object.assign(env, {
    NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: status.ANON_KEY ?? status.PUBLISHABLE_KEY,
    LOCAL_MAIL_URL: status.MAILPIT_URL ?? status.INBUCKET_URL,
  });
  if (!env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || !env.LOCAL_MAIL_URL)
    throw new Error("Incomplete isolated integration configuration.");
  run("npm", ["run", "case:accounts"]);
  run("npm", ["run", "build"]);
  run("npm", ["exec", "playwright", "test", "--", "--config=playwright.integration.config.ts"]);
} finally {
  for (const name of ["playwright-report-integration", "test-results"]) {
    if (existsSync(join(workspace, name)))
      cpSync(join(workspace, name), join(projectRoot, name), { recursive: true });
  }
  const stopped = spawnSync("npx", ["supabase", "stop", "--no-backup"], {
    cwd: workspace,
    stdio: "ignore",
  });
  if (stopped.status === 0) rmSync(temporary, { recursive: true, force: true });
  else {
    console.error(`Could not stop the isolated test database. Workspace retained: ${workspace}`);
    process.exitCode = 1;
  }
}
