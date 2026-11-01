import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { PGlite } from "@electric-sql/pglite";

const db = new PGlite();
await db.exec(`
  create role anon nologin;
  create role authenticated nologin;
  create schema auth;
  create schema storage;
  create table auth.users (
    id uuid primary key default gen_random_uuid(),
    raw_user_meta_data jsonb not null default '{}'::jsonb
  );
  create or replace function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
  $$;
  create table storage.buckets (
    id text primary key,
    name text not null,
    public boolean not null default false,
    file_size_limit bigint,
    allowed_mime_types text[]
  );
  create table storage.objects (
    id uuid primary key default gen_random_uuid(),
    bucket_id text not null references storage.buckets(id),
    name text not null
  );
  create or replace function storage.foldername(name text) returns text[] language sql stable as $$
    select string_to_array(name, '/')
  $$;
`);

const directory = join(process.cwd(), "supabase", "migrations");
const migrations = (await readdir(directory)).filter((file) => file.endsWith(".sql")).sort();
for (const migration of migrations) {
  try {
    const sql = (await readFile(join(directory, migration), "utf8")).replace(
      "create extension if not exists pgcrypto;",
      "-- pgcrypto is built into Supabase; PGlite smoke tests the remaining migration",
    );
    await db.exec(sql);
    console.log(`migration ok: ${migration}`);
  } catch (error) {
    throw new Error(
      `Migration failed: ${migration}\n${error instanceof Error ? error.message : error}`,
    );
  }
}
await db.exec(await readFile(join(process.cwd(), "supabase", "seed.sql"), "utf8"));

const candidateA = "70000000-0000-4000-8000-000000000001";
const candidateB = "70000000-0000-4000-8000-000000000002";
await db.exec(`insert into auth.users (id, raw_user_meta_data) values
  ('${candidateA}', '{"display_name":"Candidate A"}'),
  ('${candidateB}', '{"display_name":"Candidate B"}')`);
async function actAs(id) {
  await db.exec(
    `reset role; select set_config('request.jwt.claim.sub', '${id}', false); set role authenticated;`,
  );
}
await actAs(candidateA);
const ownProfiles = (await db.query("select id from public.profiles order by id")).rows;
if (ownProfiles.length !== 1 || ownProfiles[0].id !== candidateA) {
  throw new Error("Candidate profile RLS did not restrict reads to the current actor.");
}
let roleEscalationRejected = false;
try {
  await db.query("update public.profiles set role = 'operator' where id = $1", [candidateA]);
} catch {
  roleEscalationRejected = true;
}
const candidateRole = (
  await db.query("select role from public.profiles where id = $1", [candidateA])
).rows[0]?.role;
if (!roleEscalationRejected || candidateRole !== "candidate") {
  throw new Error("Candidate was able to change their controlled profile role.");
}
const submitted = await db.query(`select public.submit_application_with_evidence(
  '20000000-0000-4000-8000-000000000001', 'long_form',
  'Prowadziłem discovery procesu i dowiozłem mierzalne wdrożenie z zespołem operacyjnym.',
  null, '{"fixture":true}', '{}', 'text-v1', '{"overlap":0.5}', 0.5
) as id`);
const applicationId = submitted.rows[0].id;
await actAs(candidateB);
const foreignApplications = (
  await db.query("select id from public.applications where id = $1", [applicationId])
).rows;
if (foreignApplications.length !== 0)
  throw new Error("Application RLS leaked another candidate's record.");
await db.query(`select public.submit_application_with_evidence(
  '20000000-0000-4000-8000-000000000002', 'long_form',
  'Budowałem ewaluacje systemów AI i wdrożyłem nadzór człowieka w regulowanym środowisku.',
  null, '{"fixture":true}', '{}', 'text-v1', '{"overlap":0.6}', 0.6
)`);
const employerA = "70000000-0000-4000-8000-000000000003";
const employerB = "70000000-0000-4000-8000-000000000004";
const operator = "70000000-0000-4000-8000-000000000005";
await db.exec(`reset role; select set_config('request.jwt.claim.sub', '', false);
  insert into auth.users (id, raw_user_meta_data) values
    ('${employerA}', '{"display_name":"Employer A"}'),
    ('${employerB}', '{"display_name":"Employer B"}'),
    ('${operator}', '{"display_name":"Operator"}');
  update public.profiles set role = 'employer' where id in ('${employerA}', '${employerB}');
  update public.profiles set role = 'operator' where id = '${operator}';
  insert into public.organization_memberships (organization_id, user_id, role) values
    ('40000000-0000-4000-8000-000000000001', '${employerA}', 'recruiter'),
    ('40000000-0000-4000-8000-000000000002', '${employerB}', 'recruiter');`);
await actAs(employerA);
const employerAApplications = (await db.query("select id from public.applications")).rows;
if (employerAApplications.length !== 1 || employerAApplications[0].id !== applicationId) {
  throw new Error("Organization RLS did not isolate employer applications.");
}
// Assistants must work at baseline, without assignments, for each authorized account.
await actAs(operator);
await db.query("select public.release_case('baseline')");
for (const candidateId of [candidateA, candidateB]) {
  await actAs(candidateId);
  await db.query(
    `insert into public.ai_generations
    (purpose, requested_by, job_id, provider, model, prompt_version, source_payload, output_text, latency_ms, status)
    values ('candidate_answer', $1, '20000000-0000-4000-8000-000000000001',
      'deterministic', 'course-fixture-v1', 'evidence-first-v1', '{}', 'Candidate draft', 0, 'succeeded')`,
    [candidateId],
  );
}
await actAs(employerA);
await db.query(
  `insert into public.ai_generations
  (purpose, requested_by, job_id, provider, model, prompt_version, source_payload, output_text, latency_ms, status)
  values ('job_draft', $1, '20000000-0000-4000-8000-000000000001',
    'deterministic', 'course-fixture-v1', 'evidence-first-v1', '{}', 'Employer draft', 0, 'succeeded')`,
  [employerA],
);
let foreignDraftBlocked = false;
try {
  await db.query(
    `insert into public.ai_generations
    (purpose, requested_by, job_id, provider, model, prompt_version, source_payload, output_text, latency_ms, status)
    values ('job_draft', $1, '20000000-0000-4000-8000-000000000002',
      'deterministic', 'course-fixture-v1', 'evidence-first-v1', '{}', 'Forbidden draft', 0, 'succeeded')`,
    [employerA],
  );
} catch {
  foreignDraftBlocked = true;
}
if (!foreignDraftBlocked)
  throw new Error("Employer gained AI access to another organization's job.");
await db.exec("reset role");
const liveExperimentFunctions = (
  await db.query(`select proname from pg_proc
  where pronamespace = 'public'::regnamespace
    and proname in ('assign_experiment', 'record_experiment_exposure', 'can_use_ai')`)
).rows;
if (liveExperimentFunctions.length) throw new Error("Live experiment RPCs were not retired.");
const exposures = (await db.query("select count(*)::int as count from public.experiment_exposures"))
  .rows[0].count;
if (exposures !== 0) throw new Error("Application submission still records experiment exposure.");
await actAs(operator);
for (const release of ["baseline", "post_one_click", "discovery", "post_ai", "pilot", "demo_day"]) {
  await db.query("select public.release_case($1)", [release]);
  const active = (await db.query("select public.current_case_release() as release")).rows[0]
    ?.release;
  if (active !== release)
    throw new Error(`Case release failed: expected ${release}, got ${active}.`);
}
await db.exec("reset role; select set_config('request.jwt.claim.sub', '', false);");

const jobs = (await db.query("select count(*)::int as count from public.jobs")).rows[0].count;
const companies = (await db.query("select count(*)::int as count from public.companies")).rows[0]
  .count;
const releases = (await db.query("select count(*)::int as count from public.case_releases")).rows[0]
  .count;
const rlsTables = (
  await db.query(
    "select count(*)::int as count from pg_class where relnamespace = 'public'::regnamespace and relrowsecurity",
  )
).rows[0].count;
if (jobs !== 6 || companies !== 3 || releases !== 6 || rlsTables < 15) {
  throw new Error(
    `Unexpected seed/schema counts: jobs=${jobs}, companies=${companies}, releases=${releases}, RLS=${rlsTables}`,
  );
}

const marketplaceSql = await readFile(
  join(process.cwd(), "supabase", "marketplace-fixtures.sql"),
  "utf8",
);
const originalJob = (await db.query("select * from public.jobs order by id limit 1")).rows[0];
const originalMemberships = (
  await db.query("select * from public.organization_memberships order by user_id")
).rows;
await db.exec(marketplaceSql);
const expanded = (
  await db.query(`select
  count(*)::int as jobs,
  count(distinct company_id)::int as companies,
  count(distinct category)::int as categories,
  count(distinct function)::int as functions,
  count(distinct remote_status)::int as modes,
  count(distinct seniority)::int as levels,
  count(distinct contract_type)::int as contracts,
  count(*) filter (where publication_status = 'published' and expiry_at > now()
    and map_latitude between -90 and 90 and map_longitude between -180 and 180
    and salary_min > 0 and salary_max > salary_min)::int as valid
  from public.jobs where id::text like 'a2000000-%'`)
).rows[0];
if (
  JSON.stringify(expanded) !==
  JSON.stringify({
    jobs: 100,
    companies: 25,
    categories: 3,
    functions: 6,
    modes: 3,
    levels: 4,
    contracts: 3,
    valid: 100,
  })
)
  throw new Error(`Invalid expanded marketplace fixture coverage: ${JSON.stringify(expanded)}`);
const linked = (
  await db.query(`select count(*)::int as count from public.jobs j
  join public.organizations o on o.company_id = j.company_id
  join public.employer_briefs b on b.id = j.employer_brief_id and b.company_id = j.company_id
  join public.job_text_versions v on v.job_id = j.id and v.version = 1
    and v.visibility = 'public' and v.approved_at is not null
  where j.id::text like 'a2000000-%'`)
).rows[0].count;
if (linked !== 100)
  throw new Error("Expanded jobs lack an organization, source brief or text version.");
await db.exec(`update public.jobs set summary = 'Edited local fixture — keep this content on rerun.'
  where id = 'a2000000-0000-4000-8000-000000000001'`);
await db.exec(marketplaceSql);
const totals = (
  await db.query(`select
  (select count(*)::int from public.jobs) as jobs,
  (select count(*)::int from public.companies) as companies,
  (select count(*)::int from public.job_text_versions where job_id::text like 'a2000000-%') as versions`)
).rows[0];
if (totals.jobs !== 106 || totals.companies !== 28 || totals.versions !== 100)
  throw new Error("Marketplace fixture rerun created duplicates.");
const edited = (
  await db.query(
    "select summary from public.jobs where id = 'a2000000-0000-4000-8000-000000000001'",
  )
).rows[0];
if (edited.summary !== "Edited local fixture — keep this content on rerun.")
  throw new Error("Marketplace fixture rerun overwrote local edits.");
const preservedJob = (await db.query("select * from public.jobs where id = $1", [originalJob.id]))
  .rows[0];
const preservedMemberships = (
  await db.query("select * from public.organization_memberships order by user_id")
).rows;
if (
  JSON.stringify(originalJob) !== JSON.stringify(preservedJob) ||
  JSON.stringify(originalMemberships) !== JSON.stringify(preservedMemberships)
)
  throw new Error("Marketplace supplement changed canonical data or memberships.");
await db.exec("set role anon");
const publicJobs = (
  await db.query("select count(*)::int as count from public.jobs where id::text like 'a2000000-%'")
).rows[0].count;
if (publicJobs !== 100) throw new Error("Expanded published jobs are not publicly readable.");
let privateBriefsBlocked = false;
try {
  await db.query("select * from public.employer_briefs");
} catch {
  privateBriefsBlocked = true;
}
if (!privateBriefsBlocked) throw new Error("Expanded briefs are exposed anonymously.");
await actAs(employerA);
const foreignBriefs = (
  await db.query("select id from public.employer_briefs where id::text like 'a3000000-%'")
).rows;
if (foreignBriefs.length)
  throw new Error("Existing employer gained access to foreign source briefs.");
await db.close();
console.log(
  `Migration gate passed: ${migrations.length} migrations, deterministic seed, and ${rlsTables} RLS tables.`,
);
console.log(
  "Marketplace supplement passed: 100 jobs, 25 companies, all relationships, idempotency and privacy.",
);
