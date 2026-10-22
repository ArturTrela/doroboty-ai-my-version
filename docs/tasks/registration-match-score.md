# Instant candidate registration and visible Match Score

Enable email/password candidate registration without confirmation mail in the local
teaching app and document the separately required hosted flag. Preserve names, privacy acknowledgement, safe return paths,
password requirements and candidate role isolation. Do not bypass Supabase Auth or
add a service key to the browser. Password recovery/email-change flows stay separate.
Public employer registration remains out of scope.

Show the same saved application score to its candidate and authorized employer in
lists, details and the submission receipt. User-requested UI wording is “Match Score”
and “Dopasowanie kandydata do roli”. Keep the existing versioned calculation unchanged:
the token-Jaccard proxy uses the submitted answer and job text, not CV parsing or an
independent competency assessment. Do not imply predictive validation, rank applicants,
automate a hiring decision, recalculate history, or reveal future case comparisons.

Acceptance:

- Immediate candidate session and preserved onboarding destination, no signup email.
- Duplicate/invalid registration and employer audience boundaries stay safe.
- Supabase local config explicitly verified; cloud rollout recorded separately; no database reset.
- Shared Graphical score component with percent, zero, absent score and metadata states.
- Same saved value in candidate list/detail/receipt and employer inbox/detail.
- No score disclosure across candidates, organizations or anonymous sessions.
- Unit/render tests, isolated integration including fresh signup and score visibility,
  desktop/mobile light/dark review, verifier, FEATURES and runbook updates.
- Restart only local auth configuration without deleting local data. Record actual
  hosted/local verification separately; do not claim deployment from source changes.

## Verification and separate review

- Verifier passed: lint, 69 unit tests and production build/type checks. All 26
  Supabase integration tests passed after fixing a hardcoded test-port assertion
  and waiting for inbox-to-detail navigation before checking the result. All 19
  public/demo E2E tests passed. Formatting and whitespace checks passed.
- Fresh browser signup obtained a session immediately, retained its role destination,
  entered onboarding and sent no signup message to the local test mailbox. Password
  recovery still used mail and worked. Role switching and employer signup rejection
  remained intact. No new service key, dependency or schema migration was needed.
- Tests compared the same stored percentage in the receipt, candidate list/detail,
  employer inbox/detail. Other candidates, another organization and anonymous users
  could not read the saved score. Zero/missing/invalid/latest-version states have
  unit/render coverage. The existing calculation and recruiting actions are unchanged.
- Reviewed screenshots at 1280px and 390px for candidate/employer details, including
  light/dark mobile modes; no overflow or automated WCAG A/AA violations in those four
  mobile checks. Full/compact score compositions use existing Untitled tokens and
  verified aliases; no global theme, fonts, controls or portal changes. No theme gaps.
- Separate code review checked row-level authorization, absence of score-driven
  decisions, stable sorting of saved versions, neutral/missing states, signup role
  boundaries and the behavior-register updates. Employer notes remain private.
- Restarted only local doroboty-ai-case with backup retained; observed
  mailer_autoconfirm=true after startup. Before/after counts remained 107 jobs,
  7 applications and 23 users. Only the isolated 583xx test database was reset.
- Local dev remains at http://127.0.0.1:3107; listing and signup respond HTTP 200.
  FEATURES.md records source behavior and cloud configuration requirements. No
  cloud auth setting or production deployment changed in this task. UX-04 tracks
  hosted rollout pending the user's deployment choice.
