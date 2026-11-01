# Shared CV and notes for application drafting and matching

Requested by Wojtek on 2026-11-01. Use one source of candidate facts for both the
writing assistant and Match Score; remove the separate Additional experience field.

Acceptance:

- Before generation the single application field contains candidate-authored notes.
  After generation it contains the editable application; source notes remain separate.
- Regeneration always uses original notes, never the prior AI output. Returning to
  notes allows deliberate source editing without another textarea.
- Autosave/reload preserves notes, final text and generation reference independently.
  Merge legacy separate notes without losing data or treating generated prose as facts.
- Server submission reuses the generation's immutable CV text/metadata and notes.
  If CV or notes changed, require regeneration. Manual submissions use current CV
  and their manually authored text as the same source bundle.
- Remove Additional experience sections from submitted candidate/employer views.
  Preserve historical records and scores; retain raw source privacy and authorization.
- Shared source/provenance tests, browser regression, mobile review, verifier and
  feature/case documentation updates. No hosted deployment or Notion write.

## Implementation

Both tools use the same saved CV text and candidate-authored notes. The single editor
shows notes/manual text before generation and the editable application afterward.
Regeneration preserves the original notes; “Edytuj dopiski” deliberately discards the
current generated draft and restores source editing. Autosave stores original notes
separately from edited output. Legacy notes are merged without truncation and a changed
source bundle requires regeneration. The private legacy `experience_notes` draft column
is reused for canonical notes, with its limit widened to preserve two former fields.
No separate Additional experience textarea or submitted profile section remains.

Generated submissions re-check ownership, job, successful generation, notes and CV
identity before reusing the saved bundle for matching. Manual submissions read the
current CV once and use manually authored text. Internal CV snapshot paths are stored
for provenance but are not sent to the writing provider. Raw notes stay private in
matching inputs rather than appearing in the employer-readable submission snapshot.
Historical submissions, existing scores, private AI drafts and CV permissions are preserved.

## Validation and review

- `./scripts/verify` passed: lint, 122 unit tests across 29 files and production build.
- All 29 isolated Supabase/browser integration tests passed, including notes retained
  through regeneration/reload, final text excluded from matching, and changed CVs
  rejected before submission. The isolated database was stopped by the runner.
- All 19 public/demo E2E tests, 18-migration/RLS database gate, formatting, security
  scan and whitespace checks passed. Applied only the pending local draft-notes
  migration without a database reset or hosted changes.
- Real DeepSeek V4 Flash verification generated, regenerated, edited and resumed an
  application from a text PDF and notes, then submitted it. Saved matching inputs
  exactly equalled the writing generation's CV text and source notes; generated output
  was excluded. The assessment completed with a 70% score. A transient provider timeout
  preserved input and was recovered by retrying through the normal UI.
- Checked the single editor at 1280px/390px in light/dark modes: no horizontal overflow
  or automated WCAG A/AA violations. Visually reviewed the mobile editor. Artifacts
  are retained in ignored `.vercel/shared-sources-check/`.
- Separate review checked source/output separation, legacy recovery, CV identity,
  generation ownership and raw-source privacy. No runtime dependency or theme changes,
  external deployment, Notion update or automatic historical recalculation occurred.
