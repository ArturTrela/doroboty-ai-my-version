alter table public.jobs
  add column map_latitude double precision,
  add column map_longitude double precision,
  add constraint jobs_map_coordinates_complete check (
    (map_latitude is null and map_longitude is null)
    or (map_latitude between -90 and 90 and map_longitude between -180 and 180)
  );

update public.jobs set map_latitude = 52.2297, map_longitude = 21.0122
where slug = 'ai-product-manager';
update public.jobs set map_latitude = 52.2550, map_longitude = 21.0300
where slug = 'ai-operations-specialist';
update public.jobs set map_latitude = 50.0647, map_longitude = 19.9450
where slug = 'staff-ai-engineer';
update public.jobs set map_latitude = 51.1079, map_longitude = 17.0385
where slug = 'senior-product-designer-ai';
update public.jobs set map_latitude = 51.1250, map_longitude = 17.0650
where slug = 'machine-learning-engineer';
update public.jobs set map_latitude = 52.0693, map_longitude = 19.4803
where slug = 'growth-lead-ai-products';

create table public.candidate_documents (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  storage_path text not null unique check (storage_path = user_id::text || '/cv.pdf'),
  file_name text not null check (char_length(file_name) between 1 and 180),
  mime_type text not null check (mime_type = 'application/pdf'),
  size_bytes integer not null check (size_bytes between 1 and 5242880),
  uploaded_at timestamptz not null default now()
);

alter table public.candidate_documents enable row level security;

create policy "candidate document ownership"
  on public.candidate_documents for all to authenticated
  using (user_id = auth.uid() or public.is_operator())
  with check (user_id = auth.uid() and public.current_profile_role() = 'candidate');

grant select, insert, update, delete on public.candidate_documents to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('candidate-cv', 'candidate-cv', false, 5242880, array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "candidates upload their own cv"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'candidate-cv'
    and (storage.foldername(name))[1] = auth.uid()::text
    and name = auth.uid()::text || '/cv.pdf'
    and public.current_profile_role() = 'candidate'
  );

create policy "candidates read their own cv"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'candidate-cv'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_operator())
  );

create policy "candidates update their own cv"
  on storage.objects for update to authenticated
  using (bucket_id = 'candidate-cv' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (
    bucket_id = 'candidate-cv'
    and (storage.foldername(name))[1] = auth.uid()::text
    and name = auth.uid()::text || '/cv.pdf'
  );

create policy "candidates delete their own cv"
  on storage.objects for delete to authenticated
  using (bucket_id = 'candidate-cv' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "employers read organization jobs"
  on public.jobs for select to authenticated
  using (
    public.is_operator()
    or exists (
      select 1
      from public.organizations
      join public.organization_memberships
        on organization_memberships.organization_id = organizations.id
      where organizations.company_id = jobs.company_id
        and organization_memberships.user_id = auth.uid()
    )
  );

create or replace function public.create_employer_job(
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
  job_salary_min integer default null,
  job_salary_max integer default null,
  job_salary_currency text default null,
  job_salary_period public.salary_period default null,
  job_salary_kind public.salary_kind default null,
  job_expiry_at timestamptz default null,
  job_map_latitude double precision default null,
  job_map_longitude double precision default null
)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  actor_company uuid;
  created_job uuid;
begin
  if actor is null or public.current_profile_role() <> 'employer' then
    raise exception 'employer authentication required';
  end if;

  select organizations.company_id into actor_company
  from public.organization_memberships
  join public.organizations
    on organizations.id = organization_memberships.organization_id
  where organization_memberships.user_id = actor
  order by organization_memberships.created_at
  limit 1;

  if actor_company is null then raise exception 'organization required'; end if;
  if job_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or char_length(job_title) not between 2 and 160
    or char_length(job_summary) not between 20 and 300
    or char_length(job_description) not between 50 and 30000
    or cardinality(job_locations) < 1
    or exists (select 1 from unnest(job_locations) location where char_length(trim(location)) not between 2 and 120)
    or (job_expiry_at is not null and job_expiry_at <= now()) then
    raise exception 'invalid job data';
  end if;
  if (job_map_latitude is null) <> (job_map_longitude is null)
    or job_map_latitude not between -90 and 90
    or job_map_longitude not between -180 and 180 then
    raise exception 'invalid map coordinates';
  end if;
  if (job_salary_min is null) <> (job_salary_max is null)
    or (job_salary_min is not null and (
      job_salary_min <= 0 or job_salary_max <= 0 or job_salary_min > job_salary_max
      or job_salary_currency not in ('PLN', 'EUR')
      or job_salary_period is null or job_salary_kind is null
    )) then
    raise exception 'invalid salary data';
  end if;

  insert into public.jobs (
    slug, company_id, title, summary, description, category, function, remote_status,
    locations, seniority, contract_type, salary_min, salary_max, salary_currency,
    salary_period, salary_kind, publication_status, verification_status, expiry_at,
    map_latitude, map_longitude
  ) values (
    job_slug, actor_company, job_title, job_summary, job_description, job_category,
    job_function, job_remote_status, job_locations, job_seniority, job_contract_type,
    job_salary_min, job_salary_max, job_salary_currency, job_salary_period, job_salary_kind,
    'review', 'unverified', job_expiry_at, job_map_latitude, job_map_longitude
  ) returning id into created_job;

  insert into public.job_text_versions (
    job_id, version, source, visibility, title, summary, description
  ) values (
    created_job, 1, 'human', 'private', job_title, job_summary, job_description
  );

  return created_job;
end;
$$;

grant execute on function public.create_employer_job(
  text, text, text, text, public.job_category, public.job_function,
  public.remote_status, text[], public.seniority_level, public.contract_type,
  integer, integer, text, public.salary_period, public.salary_kind, timestamptz,
  double precision, double precision
) to authenticated;

comment on table public.candidate_documents is 'Private metadata for candidate-owned CV files stored in the candidate-cv bucket.';
comment on function public.create_employer_job is 'Creates an unverified review-status job scoped to the caller organization.';
