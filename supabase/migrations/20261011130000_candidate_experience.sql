alter table public.profiles
  add column first_name text check (first_name is null or char_length(first_name) between 1 and 80),
  add column last_name text check (last_name is null or char_length(last_name) between 1 and 120);

update public.profiles
set first_name = nullif(split_part(display_name, ' ', 1), ''),
    last_name = nullif(trim(substr(display_name, length(split_part(display_name, ' ', 1)) + 1)), '')
where display_name is not null;

alter table public.candidate_profiles
  add column preferred_functions public.job_function[] not null default '{}',
  add column preferred_categories public.job_category[] not null default '{}',
  add column preferred_seniority public.seniority_level[] not null default '{}',
  add column preferred_locations text[] not null default '{}',
  add column preferred_remote public.remote_status[] not null default '{}',
  add column preferred_contracts public.contract_type[] not null default '{}',
  add column salary_expectation_min integer check (salary_expectation_min is null or salary_expectation_min > 0),
  add column salary_expectation_currency text check (salary_expectation_currency is null or salary_expectation_currency in ('PLN', 'EUR')),
  add column onboarding_completed_at timestamptz;

alter table public.candidate_experiences
  add column sort_order integer not null default 0,
  add column updated_at timestamptz not null default now();

alter table public.candidate_work_samples
  add column sort_order integer not null default 0,
  add column updated_at timestamptz not null default now();

create table public.saved_jobs (
  candidate_id uuid not null references public.profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (candidate_id, job_id)
);

create table public.application_drafts (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  answer text not null default '' check (char_length(answer) <= 5000),
  selected_experience_ids uuid[] not null default '{}',
  selected_work_sample_ids uuid[] not null default '{}',
  ai_generation_id uuid references public.ai_generations(id) on delete set null,
  current_step smallint not null default 1 check (current_step between 1 and 4),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (candidate_id, job_id)
);

create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  requested_at timestamptz not null default now(),
  cancelled_at timestamptz,
  status text not null default 'pending' check (status in ('pending', 'cancelled', 'completed'))
);

create index saved_jobs_candidate_idx on public.saved_jobs (candidate_id, saved_at desc);
create index application_drafts_candidate_idx on public.application_drafts (candidate_id, updated_at desc);

alter table public.saved_jobs enable row level security;
alter table public.application_drafts enable row level security;
alter table public.account_deletion_requests enable row level security;

create policy "candidate saved job ownership"
  on public.saved_jobs for all to authenticated
  using (candidate_id = auth.uid() or public.is_operator())
  with check (candidate_id = auth.uid() and public.current_profile_role() = 'candidate');

create policy "candidate application draft ownership"
  on public.application_drafts for all to authenticated
  using (candidate_id = auth.uid() or public.is_operator())
  with check (candidate_id = auth.uid() and public.current_profile_role() = 'candidate');

create policy "account deletion request ownership"
  on public.account_deletion_requests for all to authenticated
  using (user_id = auth.uid() or public.is_operator())
  with check (user_id = auth.uid());

grant select, insert, delete on public.saved_jobs to authenticated;
grant select, insert, update, delete on public.application_drafts to authenticated;
grant select, insert, update on public.account_deletion_requests to authenticated;
grant update (first_name, last_name, display_name) on public.profiles to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  given_name text := nullif(trim(new.raw_user_meta_data ->> 'first_name'), '');
  family_name text := nullif(trim(new.raw_user_meta_data ->> 'last_name'), '');
  full_name text;
begin
  full_name := nullif(trim(concat_ws(' ', given_name, family_name)), '');
  insert into public.profiles (id, role, display_name, first_name, last_name)
  values (
    new.id,
    'candidate',
    coalesce(full_name, nullif(new.raw_user_meta_data ->> 'display_name', '')),
    given_name,
    family_name
  );
  insert into public.candidate_profiles (user_id) values (new.id);
  return new;
end;
$$;

create or replace function public.withdraw_application(target_application_id uuid)
returns void
language plpgsql
security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  current_status public.application_status;
begin
  if actor is null or public.current_profile_role() <> 'candidate' then
    raise exception 'candidate authentication required';
  end if;

  select status into current_status
  from public.applications
  where id = target_application_id and candidate_id = actor
  for update;

  if current_status is null then raise exception 'application unavailable'; end if;
  if current_status in ('rejected', 'withdrawn', 'hired') then
    raise exception 'application is terminal';
  end if;

  update public.applications
  set status = 'withdrawn', updated_at = now()
  where id = target_application_id;

  insert into public.application_stage_events (application_id, stage, actor_id)
  values (target_application_id, 'withdrawn', actor);
end;
$$;

grant execute on function public.withdraw_application(uuid) to authenticated;

comment on table public.application_drafts is 'Private, recoverable candidate work before an explicit application submission.';
comment on table public.saved_jobs is 'Candidate-private job shortlist; archived jobs remain identifiable to the owner.';
comment on table public.account_deletion_requests is 'Auditable self-service deletion request; fulfillment follows the documented retention process.';
