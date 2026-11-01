-- Writing assistants are authorized by role and ownership, never by a case release.
-- Retain historical assignment/exposure rows, but retire all live experiment operations.

create or replace function public.submit_application_with_evidence(
  target_job_id uuid,
  target_variant public.application_variant,
  final_answer text,
  target_generation_id uuid,
  source_snapshot jsonb,
  source_evidence_ids text[],
  fit_version text,
  fit_components jsonb,
  fit_score numeric
)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  target_organization uuid;
  created_application uuid;
begin
  if actor is null or public.current_profile_role() <> 'candidate' then
    raise exception 'candidate authentication required';
  end if;
  if char_length(final_answer) not between 40 and 5000 then raise exception 'invalid answer'; end if;
  if jsonb_typeof(source_snapshot) <> 'object' then raise exception 'invalid source snapshot'; end if;
  if jsonb_typeof(fit_components) <> 'object' or fit_score not between 0 and 1 then
    raise exception 'invalid fit score';
  end if;

  select organizations.id into target_organization
  from public.jobs
  join public.organizations on organizations.company_id = jobs.company_id
  where jobs.id = target_job_id and jobs.publication_status = 'published';
  if target_organization is null then raise exception 'job unavailable'; end if;

  if target_generation_id is not null and not exists (
    select 1 from public.ai_generations
    where id = target_generation_id and requested_by = actor and job_id = target_job_id
      and purpose = 'candidate_answer' and status = 'succeeded' and application_id is null
  ) then raise exception 'generation unavailable'; end if;

  insert into public.applications (
    candidate_id, job_id, organization_id, variant, answer, answer_generation_id, source_snapshot
  ) values (
    actor, target_job_id, target_organization, target_variant, final_answer,
    target_generation_id, source_snapshot
  ) returning id into created_application;

  insert into public.application_answer_versions (
    application_id, version, source, generation_id, source_evidence_ids, answer, approved_at
  ) values (
    created_application, 1,
    case when target_generation_id is null then 'human'::public.text_version_source
      else 'human_edited'::public.text_version_source end,
    target_generation_id, source_evidence_ids, final_answer, now()
  );

  insert into public.fit_scores (
    application_id, version, input_answer_version, components, score
  ) values (created_application, fit_version, 1, fit_components, fit_score);

  if target_generation_id is not null then
    update public.ai_generations set application_id = created_application
    where id = target_generation_id;
  end if;

  return created_application;
end;
$$;

drop function public.can_use_ai(public.experiment_surface);
drop function public.record_experiment_exposure(uuid, uuid);
drop function public.assign_experiment(public.experiment_surface);

revoke insert, update, delete on public.experiment_assignments, public.experiment_exposures
  from public, anon, authenticated;

comment on table public.experiment_assignments is
  'Historical experiment archive. No live assignment or feature gating.';
comment on table public.experiment_exposures is
  'Historical experiment archive. No live exposure writes.';
