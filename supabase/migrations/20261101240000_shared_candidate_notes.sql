-- Reuse the private draft notes column for canonical pre-generation notes.
-- Allow two legacy 5,000-character fields to be merged without truncating either.
alter table public.application_drafts drop constraint application_drafts_experience_notes_check;
alter table public.application_drafts add constraint application_drafts_experience_notes_check
  check(char_length(experience_notes) <= 11000);
comment on column public.application_drafts.experience_notes is
  'Canonical candidate-authored source notes for both application drafting and matching. Legacy column name retained for compatibility; no separate live experience input.';
