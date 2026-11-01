import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertLocalApi, localTarget, projectRoot } from "./lib/local-database.ts";

let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
for (const name of [".env.development.local", ".env.local", ".env.development", ".env"]) {
  if (url !== undefined) break;
  const file = resolve(projectRoot, name);
  if (!existsSync(file)) continue;
  url = readFileSync(file, "utf8")
    .match(/^NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)$/m)?.[1]
    .trim()
    .replace(/^['"]|['"]$/g, "");
}
// Public fixtures and /demo still work without a configured database or Docker.
if (url) assertLocalApi(url, localTarget());
