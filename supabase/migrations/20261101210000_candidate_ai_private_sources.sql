-- Candidate CV text and unapproved notes stay private even when a job belongs to an employer.
-- Employers receive the submitted application and its approved CV snapshot separately.
drop policy "requesters and involved employers read AI generations" on public.ai_generations;

create policy "private candidate drafts and organization job drafts" on public.ai_generations
for select to authenticated
using (
  requested_by = auth.uid()
  or public.is_operator()
  or (
    purpose = 'job_draft'
    and exists (
      select 1 from public.jobs
      join public.organizations on organizations.company_id = jobs.company_id
      where jobs.id = ai_generations.job_id
        and public.is_organization_member(organizations.id)
    )
  )
);
