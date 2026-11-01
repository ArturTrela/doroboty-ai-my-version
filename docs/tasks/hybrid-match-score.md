# Evidence-based hybrid Match Score

Requested by Wojtek on 2026-11-01. Replace new application text similarity with
criterion-by-criterion LLM interpretation of submitted CV/experience sources and
server-calculated weighted scoring. Preserve historical scores and fixtures.

Acceptance criteria:

- Employers generate criteria from the published offer, edit importance and required
  flags, and explicitly approve a rubric tied to that exact offer version.
- All new applications snapshot that rubric and approved candidate sources. AI-written
  application prose and private AI draft notes are excluded from assessment.
- LLM output is schema checked, must cover the exact criterion IDs, and every positive
  or negative assessment must cite a verbatim fragment of a submitted source.
- Code computes 1/0.5/0 weighted scores over assessed requirements and separately
  reports weighted coverage. Below 70% coverage, suppress the aggregate percentage.
  Unknown is never represented as a confirmed missing skill; required gaps stay visible.
- Application submission succeeds without an LLM call. Pending/failed/insufficient,
  unavailable rubric and historical states are visible. Candidate retry is authorized,
  bounded and safe against concurrent workers. No automated recruiting decisions.
- Both parties see criterion reasons and source citations, but raw CV assessment inputs
  and private writing drafts are not exposed through score queries.
- New migrations, isolation checks, behavior tests, desktop/mobile review, feature and
  case contract updates, and scripts/verify. Report actual local/hosted verification.

The 70% completeness threshold and weights are initial product rules, not calibrated
hiring probabilities. Real provider evaluation uses synthetic CVs only. Demo/test mode
returns explicit deterministic fixture assessments and never claims to run an LLM.

## Implementation and activation

Implemented on `codex/hybrid-match-score`, preserving the existing CV-first changes.
New matching code is in `src/features/matching/`; the shared Match Score component
renders the same saved assessment in candidate/employer views and receipts. Employer
criteria are reviewed in the job detail; detailed evidence uses the main column of
candidate review. Existing GUI tokens/components and both color modes are retained;
no global theme changes or new runtime dependencies were introduced.

Applied the two matching migrations to canonical local Supabase without a reset.
Local setup installs a database-generated, server-only worker credential in ignored
configuration. No hosted migration, deployment, sharing change or Notion write occurred.
Historical scores/fixtures remain separate; the historical text-fit analysis view
excludes hybrid results.

## Validation

- Final `./scripts/verify` passed: lint, 108 unit tests across 28 files, and production
  build/type checks. Explicit typecheck and whitespace checks also passed.
- Isolated Supabase/Chromium integration: all 27 tests passed. The new tests exercise
  criteria generation/approval, experience draft recovery, async unknown states,
  weighted saved results, citations, historical stability and both parties' views.
  The runner started and stopped its own database; canonical local data was preserved.
- `npm run db:check` passed all 17 migrations and the expanded RLS/worker gate, including
  foreign/stale approval rejection, private raw inputs, unauthorized worker calls,
  attempted hybrid-score injection through the legacy RPC, exclusive leases, retries,
  stale result rejection and terminal result immutability.
- All 19 public/demo E2E tests passed without configured services. The security scan
  passed. All matching files and touched supporting files pass targeted Prettier checks.
- Full-repository formatting also flagged the unrelated, concurrently edited
  `docs/tasks/richer-job-copy.md`; this task does not overwrite that work.
- A real DeepSeek V4 Flash browser journey extracted and approved five criteria from
  the local synthetic AI Product Manager offer, uploaded a synthetic text PDF, submitted
  separate experience notes, and saved a real assessment. The result was 62.5% at 80%
  weighted coverage, with citations to both CV and notes and one unknown criterion.
  This verifies integration, not calibration or predictive hiring validity.
- Visually reviewed the real candidate mobile result and employer desktop result.
  Additional employer checks at 1280px/390px in light/dark modes found no horizontal
  overflow or automated WCAG A/AA violations. Browser artifacts and the synthetic
  result are retained in ignored `.vercel/hybrid-check/`; integration screenshots are
  in ignored Playwright reports.

## Separate review pass

Reviewed authorization and credential flow, source/AI-draft separation, immutable
rubrics and snapshots, exact criterion/quote validation, score denominator/coverage,
zero/unknown/error distinctions, concurrent/retried worker writes and historical method
separation. Worker authentication was strengthened so a candidate session alone cannot
forge a hybrid assessment. Completed/insufficient assessments cannot be overwritten.
Sources and credentials do not enter browser telemetry or runtime audit logs. Deployment
setup and the best-effort `after` worker/recovery limitation are documented in
`docs/deployment.md`. Initial weights/70% coverage remain rules to calibrate against
human assessments; this implementation makes no validated hiring-probability claim.
