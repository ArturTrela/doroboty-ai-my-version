# Richer original job descriptions

The active local database contains the six original teaching roles with descriptions
of only 307–400 characters. Expand each public role with its own company/team
context, day-to-day work, first project, requirements, working arrangements and
recruitment process. Preserve the teaching narrative and private employer briefs.

Acceptance criteria:

- All six visible roles have substantial, distinct Polish descriptions using the
  existing safe headings/lists renderer. No UI or schema changes.
- Static/demo fixtures and a fresh canonical seed show the same descriptions.
- Refresh the running canonical local database without resetting it. Only exact
  known legacy descriptions qualify; append approved public text versions, preserve
  edits and all non-description fields, and make reruns no-ops.
- Test refresh preservation/idempotency on an isolated database, run the project
  verifier and review rendered role details on desktop/mobile when available.
- Review FEATURES.md and update it to reflect fixture refresh behavior.

Scope: original six roles only. Optional marketplace volume, cloud data, private
briefs, historical applications and staged learning datasets are unchanged.

## Verification and separate review

- `./scripts/verify` passed: ESLint, 74 unit tests, TypeScript and production build.
- `npm run db:check` passed all 14 current committed migrations, the canonical seed,
  optional marketplace relationships, preservation and access checks.
- `npx playwright test` passed all 19 public/demo browser checks, including mobile
  reflow and automated accessibility checks.
- All six live local role pages were checked at 1440px and 390px: each showed six
  section headings, the complete expanded text and no horizontal overflow. The
  product-manager mobile and desktop screenshots were saved under `artifacts/`.
- Applied the local refresh to six exact legacy descriptions: 3511–3835 characters,
  461–495 words. Every new current description matches its latest approved public
  `human_edited` version. The product-manager role already had two versions, so its
  refresh appended version 3; the other roles received version 2.
- A second apply updated zero rows and preserved all six. Before/after hashes match
  for all non-copy job fields (excluding normal updated_at), companies, private
  briefs, applications, memberships and original text versions.
- Isolated refresh tests cover edited-description preservation, metadata/version
  preservation, idempotency and full rollback on a company edit after preflight.
- Separate review checked role/company/working-mode/salary consistency, fictional
  notices, no private source imports, bounded IDs, SQL quoting, context locking,
  immutable version appends and local target verification. No unresolved findings.
- FEATURES.md and the database runbook were updated. No UI layout, schema, cloud
  data or staged teaching evidence was changed.

- Full Supabase integration was attempted, but the runner failed at `npx supabase
start` before browser tests. Its private-output wrapper suppresses diagnostics;
  the isolated stack was cleaned up. No integration pass is claimed. The schema/seed
  check and transactional copy tests above passed independently.
- Implementation verification used an isolated task checkout on the committed
  baseline. The bounded copy change was then applied to the active checkout while
  preserving unrelated work already in progress there.

## Follow-up: varied length and editorial structure

Wojtek requested more natural variation after reviewing the six similar-length
roles. Rewrite them as six distinct ads: compact operations, narrative design,
product ownership, extended technical engineering, growth context and a practical
ML project description. Vary heading counts, opening, list/paragraph balance and
length while preserving each role's published facts. Keep the current removal of
fictional-recruitment notices in the active checkout. Refresh only known prior
copies, keep immutable history, and preserve manual edits and other data.

Acceptance: distinct structures and material length differences; canonical seed,
static fixtures and local database agree; existing refresh preservation tests,
verifier and desktop/mobile public checks pass or limits are reported.

### Follow-up verification and review

| Role                      | Words | Section headings | Structure                                                              |
| ------------------------- | ----: | ---------------: | ---------------------------------------------------------------------- |
| AI Product Manager        |   279 |                4 | Plain opening, short responsibility list, project and ownership        |
| Staff AI Engineer         |   585 |                8 | Extended technical brief, evaluation, data and operational constraints |
| Senior Product Designer   |   238 |                3 | Narrative opening and prose throughout, no lists                       |
| AI Operations Specialist  |   179 |                3 | Terms first, three numbered tasks and a short skills list              |
| Growth Lead               |   350 |                4 | Commercial problem, experiments, working style and recruiting          |
| Machine Learning Engineer |   266 |                3 | Terms first, first project, technical toolkit and post-launch work     |

- `./scripts/verify` passed: lint, 74 unit tests, TypeScript and production build.
- `npm run db:check` passed for the isolated baseline schema and revised seed.
- All 19 public/demo browser tests passed. All six live local role pages were
  checked at 1440px and 390px: expected complete copy, 3–8 section headings and no
  horizontal overflow. Mobile operations and desktop design screenshots were
  inspected; screenshots are under ignored `artifacts/`.
- Six prior authored descriptions were refreshed with six new public approved
  versions. A second apply updated zero rows. Before/after preservation hashes
  match for all non-copy job fields, companies, private briefs, applications and
  memberships. A preflight simulation confirmed an additional manual text edit
  stays ineligible for refresh. The two existing transactional refresh tests pass.
- The planner accepts recorded SHA-256 fingerprints of previous authored copy
  (with surrounding whitespace ignored), keeping original legacy support. Unknown
  edits are still skipped and job/company context hashes still guard the write.
- Separate review checked variation, published salary/location/contract facts,
  seed/static consistency, bounded data refresh, immutable versions and retention
  of the active checkout's notice removal. No unresolved findings. Unrelated work
  in the active checkout was preserved; no cloud data or schema was changed.

- Full isolated Supabase integration passed all 24 tests, including candidate flows,
  mobile/desktop accessibility in both themes and application-context behavior.
  Existing rapid-navigation destination-stream warnings appeared; all assertions
  passed and the disposable stack was cleaned up successfully.
