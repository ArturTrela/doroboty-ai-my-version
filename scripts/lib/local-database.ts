import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const projectRoot = resolve(import.meta.dirname, "../..");
export const LOCAL_TEST_PASSWORD = "dupadupa8";

export type LocalTarget = {
  projectId: string;
  apiPort: number;
  databasePort: number;
  appOrigin: string;
};

export type LocalStatus = {
  API_URL: string;
  DB_URL: string;
  ANON_KEY?: string;
  PUBLISHABLE_KEY?: string;
  SERVICE_ROLE_KEY?: string;
  SECRET_KEY?: string;
  STUDIO_URL?: string;
  INBUCKET_URL?: string;
  MAILPIT_URL?: string;
};

export function localTarget(workspace = projectRoot): LocalTarget {
  const text = readFileSync(resolve(workspace, "supabase/config.toml"), "utf8");
  const section = (name: string) =>
    text.match(new RegExp(`\\[${name}\\]\\s*\\n([\\s\\S]*?)(?=\\n\\[|$)`))?.[1] ?? "";
  const projectId = text.match(/^project_id\s*=\s*"([\w-]+)"/m)?.[1];
  const apiPort = Number(section("api").match(/^port\s*=\s*(\d+)/m)?.[1]);
  const databasePort = Number(section("db").match(/^port\s*=\s*(\d+)/m)?.[1]);
  const appOrigin = section("auth").match(/^site_url\s*=\s*"([^"]+)"/m)?.[1];
  if (!projectId || !apiPort || !databasePort || !appOrigin)
    throw new Error("Incomplete local Supabase configuration.");
  return { projectId, apiPort, databasePort, appOrigin };
}

export function assertLocalApi(url: string, target: LocalTarget) {
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== "http:" ||
      !["127.0.0.1", "localhost"].includes(parsed.hostname) ||
      Number(parsed.port) !== target.apiPort
    )
      throw new Error();
  } catch {
    throw new Error(
      `Local development requires Supabase on port ${target.apiPort}. Run npm run db:setup.`,
    );
  }
}

export function localSupabaseStatus(): LocalStatus {
  let status: LocalStatus;
  try {
    status = JSON.parse(
      execFileSync("npx", ["supabase", "status", "-o", "json"], {
        cwd: projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }),
    );
    const target = localTarget();
    assertLocalApi(status.API_URL, target);
    const database = new URL(status.DB_URL);
    if (
      !["127.0.0.1", "localhost"].includes(database.hostname) ||
      Number(database.port) !== target.databasePort
    )
      throw new Error();
  } catch {
    // CLI errors can contain credential-bearing output; never propagate it.
    throw new Error("Cannot read the canonical local database. Run npm run db:setup.");
  }
  return status;
}

export function updateLocalConnection(content: string, status: LocalStatus, target: LocalTarget) {
  assertLocalApi(status.API_URL, target);
  const key = status.ANON_KEY ?? status.PUBLISHABLE_KEY;
  if (!key) throw new Error("Local Supabase did not return a public key.");
  for (const [name, value] of Object.entries({
    NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
    NEXT_PUBLIC_SITE_URL: target.appOrigin,
  })) {
    const pattern = new RegExp(`^${name}=.*$`, "gm");
    const line = `${name}=${value}`;
    content = pattern.test(content)
      ? content.replace(pattern, () => line)
      : `${content.trimEnd()}\n${line}\n`;
  }
  return content.trimStart();
}
