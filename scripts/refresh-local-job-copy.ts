import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { localSupabaseStatus, localTarget } from "./lib/local-database.ts";
import { originalCopyQuery, planOriginalJobCopy } from "./lib/original-job-copy.ts";
import type { OriginalCopyRow } from "./lib/original-job-copy.ts";

const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--apply") || args.length > 1)
  throw new Error("Usage: node scripts/refresh-local-job-copy.ts [--apply]");
const apply = args.includes("--apply");
// Validate both the CLI target and the actual container/port before any read or write.
localSupabaseStatus();
const target = localTarget();
const container = "supabase_db_" + target.projectId;
try {
  const inspected = JSON.parse(
    execFileSync("docker", ["inspect", container], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
  )[0];
  if (
    !inspected.State.Running ||
    !(inspected.NetworkSettings.Ports["5432/tcp"] ?? []).some(
      (port: { HostPort: string }) => Number(port.HostPort) === target.databasePort,
    )
  )
    throw new Error();
} catch {
  throw new Error("Canonical local database container/port verification failed.");
}
function query(sql: string) {
  try {
    return execFileSync(
      "docker",
      [
        "exec",
        "-i",
        container,
        "psql",
        "-U",
        "postgres",
        "-d",
        "postgres",
        "-At",
        "-v",
        "ON_ERROR_STOP=1",
      ],
      { input: sql, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] },
    );
  } catch {
    throw new Error("Local copy refresh failed. Diagnostics suppressed.");
  }
}
const rows: OriginalCopyRow[] = JSON.parse(query(originalCopyQuery));
const plan = planOriginalJobCopy(rows);
if (apply && plan.changes.length) {
  const directory = resolve(import.meta.dirname, "../artifacts");
  mkdirSync(directory, { recursive: true });
  writeFileSync(
    resolve(directory, "original-job-copy-before-" + Date.now() + ".json"),
    JSON.stringify(rows, null, 2),
    { mode: 0o600 },
  );
  query(plan.sql);
  const after: OriginalCopyRow[] = JSON.parse(query(originalCopyQuery));
  if (
    plan.changes.some(
      (change) =>
        !after.some((row) => row.id === change.id && row.description === change.description),
    )
  )
    throw new Error("Copy refresh committed, but read-back verification failed.");
}
console.log(
  JSON.stringify({
    target: target.projectId,
    eligible: plan.changes.length,
    updated: apply ? plan.changes.length : 0,
    preserved: rows.length - plan.changes.length,
    dryRun: !apply,
  }),
);
