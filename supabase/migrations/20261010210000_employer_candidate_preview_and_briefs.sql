create policy "employers read applicant document metadata"
  on public.candidate_documents for select to authenticated
  using (
    exists (
      select 1
      from public.applications
      where applications.candidate_id = candidate_documents.user_id
        and public.is_organization_member(applications.organization_id)
    )
  );

create policy "employers read applicant cv files"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'candidate-cv'
    and exists (
      select 1
      from public.applications
      where applications.candidate_id::text = (storage.foldername(name))[1]
        and public.is_organization_member(applications.organization_id)
    )
  );

create or replace function public.save_employer_job_brief(
  target_job_id uuid,
  brief_source_text text,
  brief_decision_criteria text[]
)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  target_company uuid;
  target_title text;
  target_brief uuid;
begin
  if actor is null or public.current_profile_role() not in ('employer', 'operator') then
    raise exception 'employer authentication required';
  end if;
  if brief_source_text is null
    or brief_decision_criteria is null
    or char_length(trim(brief_source_text)) not between 40 and 10000
    or cardinality(brief_decision_criteria) not between 1 and 12
    or exists (
      select 1 from unnest(brief_decision_criteria) criterion
      where char_length(trim(criterion)) not between 3 and 300
    ) then
    raise exception 'invalid brief';
  end if;

  select jobs.company_id, jobs.title, jobs.employer_brief_id
  into target_company, target_title, target_brief
  from public.jobs
  where jobs.id = target_job_id;

  if target_company is null then raise exception 'job not found'; end if;
  if not public.is_operator() and not exists (
    select 1
    from public.organizations
    join public.organization_memberships
      on organization_memberships.organization_id = organizations.id
    where organizations.company_id = target_company
      and organization_memberships.user_id = actor
  ) then
    raise exception 'forbidden';
  end if;

  if target_brief is null then
    insert into public.employer_briefs (company_id, title, source_text, decision_criteria)
    values (
      target_company,
      target_title || ' — brief źródłowy',
      trim(brief_source_text),
      to_jsonb(brief_decision_criteria)
    )
    returning id into target_brief;

    update public.jobs set employer_brief_id = target_brief, updated_at = now()
    where id = target_job_id;
  else
    update public.employer_briefs set
      title = target_title || ' — brief źródłowy',
      source_text = trim(brief_source_text),
      decision_criteria = to_jsonb(brief_decision_criteria)
    where id = target_brief and company_id = target_company;
  end if;

  return target_brief;
end;
$$;

create or replace function public.create_employer_job_with_brief(
  job_slug text,
  job_title text,
  job_summary text,
  job_description text,
  job_category public.job_category,
  job_function public.job_function,
  job_remote_status public.remote_status,
  job_locations text[],
  job_seniority public.seniority_level,
  job_contract_type public.contract_type,
  job_salary_min integer,
  job_salary_max integer,
  job_salary_currency text,
  job_salary_period public.salary_period,
  job_salary_kind public.salary_kind,
  job_expiry_at timestamptz,
  job_map_latitude double precision,
  job_map_longitude double precision,
  job_source_text text,
  job_decision_criteria text[]
)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  created_job uuid;
begin
  created_job := public.create_employer_job(
    job_slug,
    job_title,
    job_summary,
    job_description,
    job_category,
    job_function,
    job_remote_status,
    job_locations,
    job_seniority,
    job_contract_type,
    job_salary_min,
    job_salary_max,
    job_salary_currency,
    job_salary_period,
    job_salary_kind,
    job_expiry_at,
    job_map_latitude,
    job_map_longitude
  );

  if nullif(trim(job_source_text), '') is not null then
    perform public.save_employer_job_brief(
      created_job,
      job_source_text,
      job_decision_criteria
    );
  end if;

  return created_job;
end;
$$;

grant execute on function public.save_employer_job_brief(uuid, text, text[]) to authenticated;
grant execute on function public.create_employer_job_with_brief(
  text, text, text, text, public.job_category, public.job_function,
  public.remote_status, text[], public.seniority_level, public.contract_type,
  integer, integer, text, public.salary_period, public.salary_kind, timestamptz,
  double precision, double precision, text, text[]
) to authenticated;

comment on function public.save_employer_job_brief(uuid, text, text[])
  is 'Creates or updates the private source brief for a job owned by the caller organization.';
comment on function public.create_employer_job_with_brief(
  text, text, text, text, public.job_category, public.job_function,
  public.remote_status, text[], public.seniority_level, public.contract_type,
  integer, integer, text, public.salary_period, public.salary_kind, timestamptz,
  double precision, double precision, text, text[]
) is 'Creates a review-status job and optionally attaches a private source brief.';
