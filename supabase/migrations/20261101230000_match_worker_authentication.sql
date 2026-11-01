-- Bind worker writes to a server-only credential without granting service-role access.
-- The caller's session controls data access; a separate server-only credential
-- attests assessment worker calls so candidates cannot write their own verdicts.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
create table private.match_worker_config (
  singleton boolean primary key default true check(singleton),
  secret text not null default gen_random_uuid()::text || gen_random_uuid()::text
);
insert into private.match_worker_config(singleton) values(true);
revoke all on private.match_worker_config from public, anon, authenticated;

-- Legacy submission RPCs cannot be used to inject a completed hybrid score.
create function public.require_initial_hybrid_score() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.version = 'evidence-hybrid-v1' and
    (new.score is not null or new.status not in ('pending','insufficient','unavailable')) then
    raise exception 'hybrid scores must start without a verdict';
  end if;
  return new;
end; $$;
create trigger require_initial_hybrid_score before insert on public.fit_scores
  for each row execute function public.require_initial_hybrid_score();

create or replace function public.submit_hybrid_application(
  target_job_id uuid, target_variant public.application_variant, final_answer text,
  target_generation_id uuid, source_snapshot jsonb, source_evidence_ids text[], match_sources jsonb
) returns uuid language plpgsql security definer set search_path = '' as $$
declare rubric public.job_match_rubrics; created_application_id uuid; initial_status text; details jsonb; target_organization uuid; actor uuid := auth.uid();
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
  if char_length(final_answer) not between 40 and 5000 or final_answer is null then raise exception 'invalid answer'; end if;
  if jsonb_typeof(source_snapshot) is distinct from 'object' then raise exception 'invalid source snapshot'; end if;
  select o.id into target_organization from public.jobs j join public.organizations o on o.company_id = j.company_id
    where j.id = target_job_id and j.publication_status = 'published';
  if target_organization is null then raise exception 'job unavailable'; end if;
  if target_generation_id is not null and not exists (
    select 1 from public.ai_generations where id = target_generation_id and requested_by = actor
      and job_id = target_job_id and purpose = 'candidate_answer' and status = 'succeeded' and application_id is null
  ) then raise exception 'generation unavailable'; end if;
  insert into public.applications(candidate_id, job_id, organization_id, variant, answer, answer_generation_id, source_snapshot)
    values(actor, target_job_id, target_organization, target_variant, final_answer, target_generation_id, source_snapshot)
    returning id into created_application_id;
  insert into public.application_answer_versions(application_id, version, source, generation_id, source_evidence_ids, answer, approved_at)
    values(created_application_id, 1, case when target_generation_id is null then 'human'::public.text_version_source else 'human_edited'::public.text_version_source end,
      target_generation_id, source_evidence_ids, final_answer, now());
  insert into public.fit_scores(application_id, version, input_answer_version, components, score, status)
    values(created_application_id, 'evidence-hybrid-v1', 1, details, null, initial_status);
  if target_generation_id is not null then update public.ai_generations set application_id = created_application_id where id = target_generation_id; end if;
  insert into public.application_match_inputs values(created_application_id, match_sources);
  return created_application_id;
end; $$;
revoke all on function public.submit_hybrid_application(uuid, public.application_variant, text, uuid, jsonb, text[], jsonb) from public, anon;
grant execute on function public.submit_hybrid_application(uuid, public.application_variant, text, uuid, jsonb, text[], jsonb) to authenticated;

drop function public.claim_match_assessment(uuid);
drop function public.complete_match_assessment(uuid, uuid, text, numeric, jsonb);
-- A lease prevents duplicate requests and stale workers from replacing newer results.
create function public.claim_match_assessment(target_application_id uuid, worker_secret text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare claimed public.fit_scores;
begin
  if auth.uid() is null or worker_secret is distinct from (select secret from private.match_worker_config where singleton) then raise exception 'assessment worker authentication required'; end if;
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
revoke all on function public.claim_match_assessment(uuid, text) from public, anon;
grant execute on function public.claim_match_assessment(uuid, text) to authenticated;

create function public.complete_match_assessment(target_score_id uuid, target_run_id uuid,
  result_status text, result_score numeric, result_components jsonb, worker_secret text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare affected integer;
begin
  if auth.uid() is null or worker_secret is distinct from (select secret from private.match_worker_config where singleton) then raise exception 'assessment worker authentication required'; end if;
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
revoke all on function public.complete_match_assessment(uuid, uuid, text, numeric, jsonb, text) from public, anon;
grant execute on function public.complete_match_assessment(uuid, uuid, text, numeric, jsonb, text) to authenticated;
