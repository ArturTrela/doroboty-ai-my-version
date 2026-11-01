# AI thinking indicator

Requested on 2026-11-01: visibly show that AI is working while drafting an application.

## Acceptance

- Candidate and employer drafting show a rotating icon and readable pending status for the full request.
- Status is announced politely; decorative icon is hidden from assistive technology.
- Respect reduced-motion preferences and retain existing pending/disabled behavior.
- Use the current Graphical tokens and CSS animation primitive; no runtime dependencies.
- Update FEATURES.md, inspect desktop/mobile and success/failure cleanup, run scripts/verify.

## Validation

- `./scripts/verify` passed in an isolated checkout: lint, 79 unit tests and production build.
- Browser smoke held actual server-action requests to inspect pending state for both assistants.
  Confirmed rotation changes across animation frames, stationary icon with reduced motion,
  390 px reflow, and cleanup after success. Candidate network failure also clears the
  indicator and preserves the text. Inspected candidate desktop/mobile and employer screenshots.
- Animation-only changes were integrated without overwriting concurrent Match Score work.
  Targeted lint and formatting passed in the canonical checkout.
- Uses the existing CSS spinner primitive and theme duration. No API, database, model,
  dependency or submission behavior changed. No Notion Memory was created.

## Commit scope

The dedicated animation commit contains the shared indicator, pending UI in both
assistants, register entries and this note. CV-first applications, matching and job-copy
work remain separate. The animation-only snapshot was independently verified against
the committed baseline: lint, 72 unit tests across 22 files and production build passed.
