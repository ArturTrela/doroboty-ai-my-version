-- Keep submitted CV bytes immutable and restrict employers to the submitted version.
alter table public.candidate_documents drop constraint candidate_documents_check;
alter table public.candidate_documents add constraint candidate_documents_storage_path_check
  check (storage_path like user_id::text || '/%' and storage_path ~ '/[^/]+\.pdf$');

drop policy "candidates upload their own cv" on storage.objects;
create policy "candidates upload their own cv" on storage.objects for insert to authenticated
  with check (bucket_id = 'candidate-cv'
    and (storage.foldername(name))[1] = auth.uid()::text
    and name ~ '/[^/]+\.pdf$'
    and public.current_profile_role() = 'candidate');

drop policy "candidates update their own cv" on storage.objects;
drop policy "candidates delete their own cv" on storage.objects;
create policy "candidates delete unsubmitted cv" on storage.objects for delete to authenticated
  using (bucket_id = 'candidate-cv' and (storage.foldername(name))[1] = auth.uid()::text
    and not exists (select 1 from public.applications
      where candidate_id = auth.uid() and source_snapshot #>> '{cv,storagePath}' = name));

drop policy "employers read applicant cv files" on storage.objects;
create policy "employers read submitted cv version" on storage.objects for select to authenticated
  using (bucket_id = 'candidate-cv' and exists (select 1 from public.applications
    where source_snapshot #>> '{cv,storagePath}' = name
      and candidate_id::text = (storage.foldername(name))[1]
      and public.is_organization_member(organization_id)));

drop policy "employers read applicant document metadata" on public.candidate_documents;

create or replace function public.require_open_application_job()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if not exists (select 1 from public.jobs where id = new.job_id
    and publication_status = 'published' and (expiry_at is null or expiry_at > now())) then
    raise exception 'job unavailable';
  end if;
  return new;
end;
$$;
create trigger require_open_application_job before insert on public.applications
  for each row execute function public.require_open_application_job();
