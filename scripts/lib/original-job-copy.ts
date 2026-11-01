import { createHash } from "node:crypto";
import { jobs } from "../../src/features/jobs/fixtures.ts";
import { originalJobDescriptions } from "../../src/features/jobs/original-job-copy.ts";
import legacyDescriptions from "../fixtures/legacy-job-descriptions.json" with { type: "json" };
import previousCopyHashes from "../fixtures/previous-job-copy-hashes.json" with { type: "json" };

export type OriginalCopyRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  company_id: string;
  description: string;
  context_hash: string;
};

export const originalCopyQuery = `select coalesce(json_agg(row_to_json(r) order by r.id), '[]') from (
  select j.id,j.slug,j.title,j.summary,j.company_id,j.description,
    md5(to_jsonb(j)::text || to_jsonb(c)::text) as context_hash
  from public.jobs j join public.companies c on c.id=j.company_id
  where j.id in (${jobs.map((job) => "'" + job.id + "'").join(",")})
) r`;

export function planOriginalJobCopy(rows: OriginalCopyRow[]) {
  if (rows.length !== jobs.length || new Set(rows.map((row) => row.id)).size !== jobs.length)
    throw new Error("Expected all six original fixture jobs, without duplicates.");
  const changes = rows.flatMap((row) => {
    const job = jobs.find((job) => job.id === row.id);
    if (!job) throw new Error("Unexpected job outside the original fixtures.");
    const legacy = legacyDescriptions[job.slug as keyof typeof legacyDescriptions];
    const previousHashes = previousCopyHashes[job.slug as keyof typeof previousCopyHashes];
    const knownCopy =
      row.description === legacy ||
      previousHashes.includes(createHash("sha256").update(row.description.trim()).digest("hex"));
    if (
      row.slug !== job.slug ||
      row.title !== job.title ||
      row.summary !== job.summary ||
      row.company_id !== job.companyId ||
      !knownCopy ||
      row.description === originalJobDescriptions[job.slug]
    )
      return [];
    if (!/^[a-f0-9]{32}$/.test(row.context_hash)) throw new Error("Invalid context hash.");
    return [{ ...row, description: originalJobDescriptions[job.slug] }];
  });
  if (!changes.length) return { changes, sql: "" };
  const quote = (value: string) => "'" + value.replaceAll("'", "''") + "'";
  const values = changes
    .map((row) => "(" + [row.id, row.context_hash, row.description].map(quote).join(",") + ")")
    .join(",\n");
  return {
    changes,
    sql: [
      "begin;",
      "create temporary table original_copy_refresh (id uuid primary key, expected_hash text, description text) on commit drop;",
      "insert into original_copy_refresh values " + values + ";",
      "select j.id from public.jobs j join original_copy_refresh p on p.id=j.id order by j.id for update;",
      "select c.id from public.companies c where c.id in (select j.company_id from public.jobs j join original_copy_refresh p on p.id=j.id) order by c.id for update;",
      "do $guard$ begin if (select count(*) from public.jobs j join original_copy_refresh p on p.id=j.id join public.companies c on c.id=j.company_id where md5(to_jsonb(j)::text || to_jsonb(c)::text)=p.expected_hash) <> " +
        changes.length +
        " then raise exception 'Job or company changed since preflight; no updates applied'; end if; end $guard$;",
      "insert into public.job_text_versions (job_id,version,source,visibility,title,summary,description,approved_at) select j.id,(select coalesce(max(v.version),0)+1 from public.job_text_versions v where v.job_id=j.id),'human_edited','public',j.title,j.summary,p.description,now() from public.jobs j join original_copy_refresh p on p.id=j.id;",
      "update public.jobs j set description=p.description,updated_at=now() from original_copy_refresh p where j.id=p.id;",
      "commit;",
    ].join("\n"),
  };
}
