import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const run = (command, args, stdio = "inherit") =>
  execFileSync(command, args, { cwd: root, stdio, env: process.env });

// Supabase prints all local credentials on successful start. Keep that output private and
// expose only the public URL/key written below.
try {
  run("npx", ["supabase", "stop", "--no-backup"], ["ignore", "ignore", "ignore"]);
} catch {
  // A first setup has no local stack to stop.
}
run("npx", ["supabase", "start"], ["ignore", "ignore", "inherit"]);
run("npx", ["supabase", "db", "reset", "--local"]);
run("npm", ["run", "case:accounts"]);

const status = JSON.parse(
  execFileSync("npx", ["supabase", "status", "-o", "json"], {
    cwd: root,
    encoding: "utf8",
  }),
);
const url = status.API_URL;
const key = status.ANON_KEY ?? status.PUBLISHABLE_KEY;
if (!url || !key || !["127.0.0.1", "localhost"].includes(new URL(url).hostname)) {
  throw new Error("Local Supabase did not return a safe public configuration.");
}

const envPath = resolve(root, ".env.local");
let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
const setEnv = (name, value) => {
  const line = `${name}=${value}`;
  const pattern = new RegExp(`^${name}=.*$`, "m");
  content = pattern.test(content)
    ? content.replace(pattern, line)
    : `${content.trimEnd()}\n${line}\n`;
};
setEnv("NEXT_PUBLIC_SUPABASE_URL", url);
setEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", key);
writeFileSync(envPath, content.trimStart(), { mode: 0o600 });

console.log("\nLocal DoRoboty.ai is ready:");
console.log(`- Studio: ${status.STUDIO_URL ?? "http://127.0.0.1:55323"}`);
console.log("- Candidate: candidate@doroboty.local");
console.log("- Employer: employer@doroboty.local");
console.log("- Password: DoRoboty-local-only-2026!");
console.log("Restart npm run dev so Next.js loads .env.local.");
