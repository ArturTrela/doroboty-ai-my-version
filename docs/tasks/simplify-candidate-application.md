# Simplify the candidate application form

## Intent

Remove candidate source notes and the AI proposal flow from the application form. Keep the CV, editable answer, explicit approval, draft saving and submission. Employer job-description generation is unchanged.

## Acceptance criteria

- The answer field follows the CV directly; no candidate notes, generation button, proposal preview or Use proposal action is rendered.
- Draft answers survive explicit save and reload; answer validation and approval still gate submission.
- Existing version-1 local saves and imports remain compatible. Legacy draft notes/generated text remain hidden and are preserved on save and submission; new drafts use empty metadata fields. Submitted snapshots remain immutable.
- The behavior register and current contract documentation distinguish legacy candidate metadata from the active form.
- Desktop/mobile rendering, keyboard access, legacy data compatibility and the end-to-end recruitment journey are checked. Run `./scripts/verify` and record actual results, then perform a separate review.

## Implementation and verification

- Removed the candidate notes editor, generation action and proposal preview; removed the unused candidate template helper. Existing answer validation, approval and save/submit operations remain.
- Kept the version-1 schema and storage key. The form forwards legacy draft metadata without rendering it; new drafts use empty strings. Updated CAN-09/10/12/13 and OPS-06 plus the brief/protocol.
- Updated the recruitment journey and validation regression. Added desktop (1440px) and mobile (375px) browser coverage for importing an old draft, editing/saving/reloading the answer, keyboard save/approval/submission, hidden legacy metadata and snapshot preservation.
- Used the existing Node 24.22.2 runtime under `/private/tmp/doroboty-node24-validation`; restored missing locked dependencies using `npm ci --offline --no-audit --no-fund` without changing the lockfile. The initial gate failed because dependencies were missing; the next run reached browser checks but sandbox restrictions prevented binding the preview server. The authorized rerun of `./scripts/verify` passed: formatting, lint, types, 27 unit tests, baseline packet verification, production build and 17 Chromium journeys. Build warnings concern dependency annotations and the existing large JS chunk.
- Inspected `artifacts/application-simplified-1440.png` and `artifacts/application-simplified-375.png`: the answer follows the CV directly, the removed UI is absent and both layouts fit the viewport.

## Separate review

Reviewed the completed diff, legacy metadata forwarding, import/reload/save/submit assertions, validation/focus behavior, generator references and behavior documentation. No issue requiring a product change was found. `git diff --check` passed. No new theme tokens, external runtime requests, services or schema migration were introduced. Concurrent CV attachment work in this checkout was preserved and is outside this task. No merge, publishing or human approval is claimed.
