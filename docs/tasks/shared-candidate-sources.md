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
