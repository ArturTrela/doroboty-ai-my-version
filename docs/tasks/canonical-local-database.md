# Canonical local database

Wojtek requested on 2026-11-01 that the old local database be deleted and only the
existing database on port 58321 remain in use. Candidate and employer test accounts
must consistently accept `dupadupa8`.

## Acceptance criteria

- Root `supabase/config.toml` describes `doroboty-ai-local` on ports 58320–58324.
- Remove the old `doroboty-ai-case` containers/data volumes on 55321, preserving the
  active database and all other projects.
- Remove the duplicate ignored `.vercel/local-supabase` configuration after promoting
  its active settings into the tracked root configuration.
- Setup starts and migrates the canonical database without resetting existing data,
  preserves AI configuration and writes the corresponding public connection values.
- Both existing and newly provisioned local fixture accounts use the shared test
  password. Development fails clearly if configuration points at another database.
- Integration tests use a disposable isolated database and build, never the active
  development database or its environment file.
- Update README, Supabase instructions and FEATURES.md. Verify repeated setup,
  login/logout for both roles, migration checks and appropriate project checks.

## Validation

Completed locally. No Notion Memory was created for this work.

- Removed the old `doroboty-ai-case` stack and its database/storage volumes. Docker
  inspection confirmed no old project containers or volumes remain.
- Promoted the retained configuration into tracked `supabase/config.toml`, stopped
  the retained stack with data-preserving behavior, removed the duplicate ignored
  workdir, and successfully restarted through root `npm run db:setup`.
- Repeated setup preserved development applications/jobs/profiles, provider settings
  and existing CV/profile content. `.env.local` still points to API 58321.
- Both candidate and employer authenticated through the browser UI with `dupadupa8`
  after the restart and could open their correct workspaces and sign out.
- The startup guard accepted the canonical endpoint and rejected 55321. Tests and
  fixtures share one test-password constant.
- Typecheck, formatting, lint, 72 unit tests, production build and `./scripts/verify`
  passed. The database gate passed all 14 migrations and fixture/RLS checks.
- The rewritten integration command passed all 24 scenarios against its own temporary
  database/build, cleaned up its containers/volumes/workspace, and left the active
  development database and AI settings intact.
- A separate review pass checked target validation, secret-output handling, idempotent
  provisioning, data preservation, test isolation and CI cleanup. No open findings.
- The pre-existing untracked DeepSeek task note was retained; its obsolete startup
  instruction was annotated to use the canonical root setup command.

Only local development state/configuration was changed; hosted environments were not
updated.
