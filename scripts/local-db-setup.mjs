import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  localSupabaseStatus,
  localTarget,
  projectRoot,
  updateLocalConnection,
} from "./lib/local-database.ts";

// Starting an existing stack preserves data. Never stop/reset it during normal setup.
try {
  execFileSync("npx", ["supabase", "start"], {
    cwd: projectRoot,
    stdio: ["ignore", "ignore", "pipe"],
  });
} catch {
  throw new Error(
    "Cannot start local Supabase. Check Docker and the ports in supabase/config.toml.",
  );
}
execFileSync("npx", ["supabase", "migration", "up", "--local"], {
  cwd: projectRoot,
  stdio: "inherit",
});
execFileSync("npm", ["run", "case:accounts"], { cwd: projectRoot, stdio: "inherit" });

const status = localSupabaseStatus();
const envPath = resolve(projectRoot, ".env.local");
const content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
const target = localTarget();
const matchWorkerSecret = execFileSync(
  "docker",
  [
    "exec",
    `supabase_db_${target.projectId}`,
    "psql",
    "-U",
    "postgres",
    "-d",
    "postgres",
    "-Atc",
    "select secret from private.match_worker_config where singleton",
  ],
  {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  },
).trim();
if (!matchWorkerSecret) throw new Error("Matching worker credential is unavailable.");
let localEnvironment = updateLocalConnection(content, status, target);
const workerSetting = `MATCH_SCORE_WORKER_SECRET=${matchWorkerSecret}`;
localEnvironment = /^MATCH_SCORE_WORKER_SECRET=.*$/m.test(localEnvironment)
  ? localEnvironment.replace(/^MATCH_SCORE_WORKER_SECRET=.*$/gm, () => workerSetting)
  : `${localEnvironment.trimEnd()}\n${workerSetting}\n`;
writeFileSync(envPath, localEnvironment, { mode: 0o600 });

console.log(`Local DoRoboty.ai ready: ${localTarget().appOrigin}`);
console.log(`Supabase API: ${status.API_URL}; Studio: ${status.STUDIO_URL}`);
console.log("Candidate and employer test accounts are ready. Credentials are in README.md.");
console.log("Restart npm run dev so Next.js loads the local connection.");
