# Security review

## Boundaries

The browser receives only a Supabase publishable key. Secret/service-role keys are rejected by environment validation. Normal reads and writes are caller-scoped by RLS; security-definer functions re-check identity, role, organization, resource relation, lengths, and controlled enums. Candidate submission is one database transaction. AI source and output never enter browser telemetry.

## Dependency audit, 2026-10-06

`npm audit --omit=dev` reports zero production vulnerabilities. The full audit reports nine high-severity development-only findings rooted in `braces <=3.0.3`, reached through current `eslint-config-next` and the shadcn CLI. The registry currently exposes no patched `braces` release. npm's proposed “fix” downgrades incompatible major versions of Next lint config and shadcn, so it is not applied.

Risk is limited to trusted build-time glob patterns in CI/developer tools; those packages are not part of the production server dependency set. Recheck on every dependency update and remove the exception as soon as upstream publishes a compatible fix. Do not run the shadcn CLI against untrusted registries or attacker-controlled glob input.

## Release checks

Run production audit, secret scanning, source-map inspection, RLS integration tests, and a clean build. Disable public browser source maps. Confirm Vercel and Supabase logs contain no tokens, prompts, free text, or contact details.

## AI runtime policy

AI calls are server-only, limited to 20 attempts per subject per hour, and time out after 30 seconds. Provider output must be non-empty text no longer than 30,000 characters; candidate application drafts must also fit the application editor’s 40–5000-character range. CV text and unapproved notes in candidate generations are visible only to the requester and authorized operators, never job-owning employers. Token usage is converted to an estimated cost using deployment-specific per-million-token rates and rejected when it exceeds `AI_MAX_COST_USD_PER_REQUEST`.

The service makes one provider attempt per user action. It does not retry automatically because a timed-out generation may already have incurred cost; the user receives a safe message and can deliberately retry. Structured runtime logs contain only purpose, provider/model identifiers, outcome, latency, token counts, estimated cost, and a normalized error code—never prompts, source evidence, generated text, account identifiers, or raw provider diagnostics.

## Hybrid matching

Approved rubrics are immutable, organization-scoped, and bound to the exact public job
text. Approval RPCs re-check employer/operator role, organization and expected job content.
Submission snapshots the current approved rubric and candidate-approved matching sources
atomically. Source text is stored in `application_match_inputs`, readable only by its
candidate; involved employers see saved criterion summaries/citations, never raw input
rows or private writing drafts. Matching never reads private employer briefs.

Assessment input is untrusted reference data. Prompts prohibit embedded instructions,
protected characteristics, invented experience, unsupported negative inferences and overall
model scores. Runtime schema validation enforces exact criterion IDs, verdict enums and
verbatim source quotations; code computes points and coverage. Quotations establish
provenance, not the truth of candidate claims or correctness of model interpretation.

Candidate-owned leases limit assessment to three attempts and reject concurrent/stale
worker writes; completed/insufficient results cannot be replaced. Failed/pending tasks
can be resumed without submitting again. Ordinary operations use the caller's session,
never service-role credentials. A separate server-only `MATCH_SCORE_WORKER_SECRET` is required to claim or complete
an assessment. The database generates this credential in an inaccessible `private`
schema; local setup installs it in ignored server configuration. Candidate sessions
cannot read it or submit completed hybrid scores through the legacy submission RPC.
No assessment may automatically rank, reject or advance a candidate.

Runtime traces and analytics contain no CVs, free text, quotes or account identifiers.
Synthetic deterministic mode returns unknown assessments and is visibly identified; it
never silently substitutes keyword matching for a failed real-provider assessment.
