# CV-first application editor

Requested by Wojtek on 2026-11-01. Replace separate evidence selection with the
candidate's saved CV and one application text field. Extra experience belongs in
that field; AI helps shape it for the selected role.

## Acceptance criteria

- Show saved CV, one editable application field, AI drafting and explicit submission.
  Remove experience/work-sample selection and their completeness requirements.
- CV stays optional for manual applications; AI needs readable CV content or substantive
  notes. Missing or unreadable CVs have actionable recovery.
- AI reads only the authenticated candidate's private PDF, selected public role and
  current text. Source documents are data, not instructions or permission to invent facts.
- Hide separate experience forms without deleting records or historical snapshots.
- Preserve draft resume, AI discard, failure recovery, deliberate approval, private CV
  access, application snapshots and Match Score. Generation never submits automatically.
- Update FEATURES.md; test CV extraction, CV-only generation, notes fallback, no-evidence
  submission and recruiter access. Inspect mobile and desktop.

The canonical-local-database changes committed during this task are preserved. No Notion Memory
will be created without separate approval.

## Validation

Implemented on `codex/cv-first-application`.

- `./scripts/verify`: ESLint, 79 unit tests across 24 files and production build passed.
- Formatting and TypeScript checks passed.
- Demo/public E2E: 19 tests passed. Isolated local integration: 25 tests passed,
  including no-evidence submission, CV-only generation, notes-only fallback for missing
  and unreadable PDFs, draft resume/discard, explicit approval, historical CV access,
  Match Score and recruiter privacy. Candidate screens passed WCAG A/AA checks and
  reflow checks at 390 and 1280 px in both themes.
- Migration gate: 15 migrations and 24 RLS tables passed. The new candidate-source
  privacy migration is applied to the canonical local database on port 58321.
- Real Vercel AI Gateway / `deepseek/deepseek-v4-flash` browser smoke passed:
  CV-only generation retained a supplied 20% result; CV + notes generation included
  eight trained team members; autosave/reload/discard restored original notes;
  generation did not submit; explicit submission produced a Match Score receipt.
  An unreadable CV recovered using notes in the same field. Calls took about
  19.3, 9.1 and 4.7 seconds, so the provider timeout is now 30 seconds, with the
  same one-attempt policy and existing quota/cost guards.
- Real-provider UI passed Axe checks and visual/reflow inspection at 390 and 1365 px,
  light and dark. Ignored artifacts are in `.vercel/cv-first-application/`.
- Separate review checked authenticated private downloads, source-payload RLS,
  output/editor limits, absence of new evidence requirements and retained historical data.
  Empty profile defaults no longer advertise zero years to the employer.

## Limits and rollout

PDF extraction accepts up to 5 MB, 30 pages and 30000 text characters. Scanned,
password-protected and otherwise unreadable PDFs have a notes-only recovery; there
is no OCR. Human review remains necessary. Match Score remains the existing
text-similarity case proxy.

Changes are local; no Vercel deployment or hosted database migration was performed.
Deploy the new privacy migration with the application before enabling CV-source
AI on a hosted environment. No Notion Memories were written.
