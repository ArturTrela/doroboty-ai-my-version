import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  marketplaceCopy,
  stockMarketplaceDescription,
  type CopyJob,
} from "../src/features/jobs/marketplace-copy.ts";

const mode = process.argv[2];
if (!["local", "cloud"].includes(mode))
  throw new Error(
    "Specify local or cloud; this command only reads and generates a reviewed SQL plan.",
  );
const target =
  mode === "cloud" ? ["--linked", "--project-ref", "vgxoiljieuhvnpuojaet"] : ["--local"];
const binary =
  process.env.SUPABASE_CLI ?? resolve(import.meta.dirname, "../node_modules/.bin/supabase");
const query =
  "select j.id,j.title,j.category,j.function,j.seniority,j.description,j.summary,c.name as company_name,c.location,md5(to_jsonb(j)::text || to_jsonb(c)::text) as context_hash from public.jobs j join public.companies c on c.id=j.company_id where j.id between 'a2000000-0000-4000-8000-000000000001' and 'a2000000-0000-4000-8000-000000000100' order by j.id";
let rows: (CopyJob & { description: string; summary: string; context_hash: string })[];
try {
  rows = JSON.parse(
    execFileSync(binary, ["db", "query", ...target, query], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 2_000_000,
    }),
  ).rows;
} catch {
  throw new Error(
    "Unable to read fixture descriptions; diagnostics suppressed to avoid credential exposure.",
  );
}
if (rows.length !== 100) throw new Error("Expected exactly 100 reserved fixture jobs.");
const eligible = rows.filter((row) => row.description === stockMarketplaceDescription(row));
if (eligible.length !== 100)
  throw new Error(
    "Non-stock or already-enriched descriptions detected; stop rather than overwrite edits.",
  );
const quote = (value: string) => "'" + value.replaceAll("'", "''") + "'";
const plans = eligible.map((row) => ({
  ...row,
  ...marketplaceCopy(row),
  expectedHash: row.context_hash,
}));
const values = plans
  .map((row) => "(" + [row.id, row.expectedHash, row.description].map(quote).join(",") + ")")
  .join(",\n");
const sql = [
  "begin;",
  "create temporary table copy_refresh (id uuid primary key, expected_hash text, description text) on commit drop;",
  "insert into copy_refresh values " + values + ";",
  "select j.id from public.jobs j join copy_refresh p on p.id=j.id for update;",
  "select c.id from public.companies c where c.id in (select j.company_id from public.jobs j join copy_refresh p on p.id=j.id) for update;",
  "do $guard$ begin if (select count(*) from public.jobs j join copy_refresh p on p.id=j.id join public.companies c on c.id=j.company_id where md5(to_jsonb(j)::text || to_jsonb(c)::text)=p.expected_hash) <> 100 then raise exception 'Job or company changed since preflight; no updates applied'; end if; end $guard$;",
  "insert into public.job_text_versions (job_id,version,source,visibility,title,summary,description,approved_at) select j.id,(select coalesce(max(v.version),0)+1 from public.job_text_versions v where v.job_id=j.id),'human_edited','public',j.title,j.summary,p.description,now() from public.jobs j join copy_refresh p on p.id=j.id;",
  "update public.jobs j set description=p.description,updated_at=now() from copy_refresh p where j.id=p.id;",
  "commit;",
].join("\n");
mkdirSync(resolve("artifacts"), { recursive: true });
writeFileSync(resolve("artifacts", "marketplace-copy." + mode + ".sql"), sql);
writeFileSync(
  resolve("artifacts", "marketplace-copy." + mode + ".before.json"),
  JSON.stringify(rows, null, 2),
);
const lengths = plans.map((plan) => plan.description.length);
console.log(
  JSON.stringify({
    mode,
    rows: plans.length,
    variants: [...new Set(plans.map((plan) => plan.variant))],
    minimumCharacters: Math.min(...lengths),
    maximumCharacters: Math.max(...lengths),
    sqlPlan: "artifacts/marketplace-copy." + mode + ".sql",
    writesPerformed: false,
  }),
);
