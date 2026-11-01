-- Approved public-job criteria and immutable submitted assessment inputs.
create table public.job_match_rubrics (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  version integer not null,
  criteria jsonb not null check (jsonb_typeof(criteria) = 'array'),
  job_snapshot jsonb not null,
  approved_by uuid not null references public.profiles(id),
  approved_at timestamptz not null default now(),
  unique(job_id, version)
);
alter table public.job_match_rubrics enable row level security;
create policy "members read approved matching criteria" on public.job_match_rubrics
for select to authenticated using (exists (
  select 1 from public.jobs j join public.organizations o on o.company_id = j.company_id
  where j.id = job_id and (public.is_organization_member(o.id) or public.is_operator())
));
grant select on public.job_match_rubrics to authenticated;

create function public.approve_match_rubric(target_job_id uuid, expected_job jsonb, target_criteria jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare current_job jsonb; rubric_id uuid; item jsonb; next_version integer;
begin
  if auth.uid() is null or public.current_profile_role() not in ('employer', 'operator') then
    raise exception 'employer authentication required';
  end if;
  perform pg_advisory_xact_lock(hashtext(target_job_id::text));
  select jsonb_build_object('title', j.title, 'summary', j.summary, 'description', j.description)
  into current_job from public.jobs j join public.organizations o on o.company_id = j.company_id
  where j.id = target_job_id and (public.is_organization_member(o.id) or public.is_operator());
  if current_job is null or current_job is distinct from expected_job then raise exception 'job changed or unavailable'; end if;
  if jsonb_typeof(target_criteria) is distinct from 'array' or jsonb_array_length(target_criteria) not between 1 and 12 then
    raise exception 'invalid criteria';
  end if;
  for item in select value from jsonb_array_elements(target_criteria) loop
    if coalesce(item->>'id', '') !~ '^[a-zA-Z0-9_-]{1,40}$'
      or coalesce(char_length(item->>'text'), 0) not between 3 and 300
      or coalesce((item->>'weight')::numeric, 0) not in (1,2,3)
      or jsonb_typeof(item->'required') is distinct from 'boolean'
      or coalesce(char_length(item->>'sourceQuote'), 0) not between 3 and 1000
      or position(item->>'sourceQuote' in concat_ws(' ', current_job->>'title', current_job->>'summary', current_job->>'description')) = 0
    then raise exception 'invalid criterion'; end if;
  end loop;
  if (select count(distinct value->>'id') from jsonb_array_elements(target_criteria)) <> jsonb_array_length(target_criteria) then
    raise exception 'duplicate criteria';
  end if;
  select coalesce(max(version), 0) + 1 into next_version from public.job_match_rubrics where job_id = target_job_id;
  insert into public.job_match_rubrics(job_id, version, criteria, job_snapshot, approved_by)
  values(target_job_id, next_version, target_criteria, current_job, auth.uid()) returning id into rubric_id;
  return rubric_id;
end; $$;
revoke all on function public.approve_match_rubric(uuid, jsonb, jsonb) from public, anon;
grant execute on function public.approve_match_rubric(uuid, jsonb, jsonb) to authenticated;

alter table public.fit_scores alter column score drop not null;
alter table public.fit_scores add column status text not null default 'completed'
  check(status in ('pending','processing','completed','insufficient','unavailable','failed'));
alter table public.fit_scores add column attempts integer not null default 0;
alter table public.fit_scores add column run_id uuid;
alter table public.fit_scores add column processing_started_at timestamptz;
create table public.application_match_inputs (
  application_id uuid primary key references public.applications(id) on delete cascade,
  sources jsonb not null check(jsonb_typeof(sources) = 'array')
);
alter table public.application_match_inputs enable row level security;
create policy "candidates read their submitted matching inputs" on public.application_match_inputs
for select to authenticated using (exists (
  select 1 from public.applications a where a.id = application_id and a.candidate_id = auth.uid()
));
grant select on public.application_match_inputs to authenticated;
alter table public.application_drafts add column experience_notes text not null default ''
  check(char_length(experience_notes) <= 5000);

create function public.submit_hybrid_application(
  target_job_id uuid, target_variant public.application_variant, final_answer text,
  target_generation_id uuid, source_snapshot jsonb, source_evidence_ids text[], match_sources jsonb
) returns uuid language plpgsql security definer set search_path = '' as $$
declare rubric public.job_match_rubrics; created_application_id uuid; initial_status text; details jsonb;
begin
  if auth.uid() is null or public.current_profile_role() <> 'candidate' then raise exception 'candidate authentication required'; end if;
  if jsonb_typeof(match_sources) is distinct from 'array' or jsonb_array_length(match_sources) > 22
    or octet_length(match_sources::text) > 150000 then raise exception 'invalid sources'; end if;
  select r.* into rubric from public.job_match_rubrics r join public.jobs j on j.id = r.job_id
  where r.job_id = target_job_id and r.job_snapshot = jsonb_build_object('title', j.title, 'summary', j.summary, 'description', j.description)
  order by r.version desc limit 1;
  initial_status := case when rubric.id is null then 'unavailable'
    when jsonb_array_length(match_sources) = 0 then 'insufficient' else 'pending' end;
  details := jsonb_build_object('rubricId', rubric.id, 'rubricVersion', rubric.version,
    'criteria', coalesce(rubric.criteria, '[]'::jsonb), 'minimumCoverage', 0.7,
    'reasonCode', case when rubric.id is null then 'no_approved_rubric'
      when jsonb_array_length(match_sources) = 0 then 'no_readable_sources' else null end);
  created_application_id := public.submit_application_with_evidence(target_job_id, target_variant, final_answer,
    target_generation_id, source_snapshot, source_evidence_ids, 'evidence-hybrid-v1', details, null);
  update public.fit_scores set status = initial_status where fit_scores.application_id = created_application_id
    and version = 'evidence-hybrid-v1';
  insert into public.application_match_inputs values(created_application_id, match_sources);
  return created_application_id;
end; $$;
revoke all on function public.submit_hybrid_application(uuid, public.application_variant, text, uuid, jsonb, text[], jsonb) from public, anon;
grant execute on function public.submit_hybrid_application(uuid, public.application_variant, text, uuid, jsonb, text[], jsonb) to authenticated;

-- A lease prevents duplicate requests and stale workers from replacing newer results.
create function public.claim_match_assessment(target_application_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare claimed public.fit_scores;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  update public.fit_scores s set status = 'failed', components = components || '{"reasonCode":"attempts_exhausted"}'::jsonb
  where s.application_id = target_application_id and s.version = 'evidence-hybrid-v1'
    and s.attempts >= 3 and s.status = 'processing' and s.processing_started_at < now() - interval '2 minutes'
    and exists(select 1 from public.applications a where a.id = s.application_id and a.candidate_id = auth.uid());
  update public.fit_scores s set status = 'processing', attempts = attempts + 1,
    run_id = gen_random_uuid(), processing_started_at = now()
  where s.application_id = target_application_id and s.version = 'evidence-hybrid-v1'
    and s.attempts < 3 and (s.status in ('pending','failed') or
      (s.status = 'processing' and s.processing_started_at < now() - interval '2 minutes'))
    and exists(select 1 from public.applications a where a.id = s.application_id and a.candidate_id = auth.uid())
  returning s.* into claimed;
  if claimed.id is null then return null; end if;
  return jsonb_build_object('scoreId', claimed.id, 'runId', claimed.run_id, 'components', claimed.components,
    'sources', (select sources from public.application_match_inputs where application_id = target_application_id));
end; $$;
revoke all on function public.claim_match_assessment(uuid) from public, anon;
grant execute on function public.claim_match_assessment(uuid) to authenticated;

create function public.complete_match_assessment(target_score_id uuid, target_run_id uuid,
  result_status text, result_score numeric, result_components jsonb)
returns boolean language plpgsql security definer set search_path = '' as $$
declare affected integer;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if result_status not in ('completed','insufficient','failed')
    or jsonb_typeof(result_components) is distinct from 'object'
    or (result_status = 'completed' and (result_score is null or result_score not between 0 and 1))
    or (result_status <> 'completed' and result_score is not null)
  then raise exception 'invalid assessment result'; end if;
  update public.fit_scores s set status = result_status, score = result_score,
    components = result_components, calculated_at = now()
  where s.id = target_score_id and s.run_id = target_run_id and s.status = 'processing'
    and exists(select 1 from public.applications a where a.id = s.application_id and a.candidate_id = auth.uid());
  get diagnostics affected = row_count;
  return affected = 1;
end; $$;
revoke all on function public.complete_match_assessment(uuid, uuid, text, numeric, jsonb) from public, anon;
grant execute on function public.complete_match_assessment(uuid, uuid, text, numeric, jsonb) to authenticated;
comment on table public.fit_scores is 'Versioned assessment summaries. Historical text similarity remains distinct from evidence-hybrid-v1. Never automate hiring decisions.';
comment on table public.application_match_inputs is 'Immutable submitted CV/experience sources, private to their candidate. Score citations refer only to these approved sources.';

-- Historical text-fit analytics must not silently incorporate a different methodology.
create or replace view public.application_outcome_analysis with (security_invoker = true) as
select a.id as application_id, a.job_id, a.organization_id, a.variant, a.submitted_at,
  s.score as text_fit_score, i.first_conversation_at,
  i.decision as first_conversation_decision, i.later_hired, a.status
from public.applications a
left join public.fit_scores s on s.application_id = a.id and s.version <> 'evidence-hybrid-v1'
left join public.interview_outcomes i on i.application_id = a.id;
