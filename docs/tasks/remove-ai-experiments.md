# Make AI assistants available by role

Requested by Wojtek on 2026-11-01. Remove live experiment assignment, exposure tracking,
and case-stage gates from both writing assistants. Keep authenticated role and
organization ownership checks, evidence selection, human approval and saved Match Score.

## Acceptance criteria

- Every candidate can access application drafting at every case stage once the required
  profile and source evidence are present.
- Every employer (and the existing authorized operator role) can draft from an accessible
  job brief without an experiment assignment or exposure.
- Application mode follows profile readiness rather than random assignment.
- No application runtime module calls experiment RPCs or records experiment exposure.
- A new migration retires experiment RPCs and live submission exposure writes without
  deleting historical experiment records or rewriting deployed migrations.
- Historical case evidence and release controls do not gate either assistant.
- FEATURES.md describes the resulting behavior. Regression checks cover early-stage AI,
  distinct candidate accounts, wrong roles, and employer organization isolation.

## Validation

Implemented and reviewed locally. No Notion Memory was created for this work.

- Removed all three runtime experiment modules, assistant visibility flags, group RPC
  calls and exposure effects. Candidate application mode follows profile readiness.
- Removed fixture/rehearsal group provisioning and retired the three experiment RPCs
  through `20261101190000_retire_live_experiments.sql`. Submission no longer writes
  exposure records. Historical migrations and records remain intact and read-only to clients.
- Updated FEATURES.md, the product brief, case protocol and roadmap note.
- Typecheck, formatting, lint, 69 unit tests, production build and `./scripts/verify` passed.
- `npm run db:check` passed all 14 migrations, baseline role/organization checks and the
  synthetic marketplace import checks.
- All 24 browser/database integration scenarios passed against the isolated local
  `doroboty-ai-access-test` Supabase project. This includes two distinct candidates using
  AI at baseline, employer generation/approval, saved Match Score, role boundaries,
  application privacy and organization ownership. The isolated stack was stopped afterward.
- A separate review pass checked UI/action role guards, removal of runtime RPC callers,
  preservation of submission/score/version behavior, migration safety and documentation.
  No unresolved findings remain.

## Deployment

Deploy the application code before applying the retirement migration to a shared
Supabase database: the previous application still calls the RPCs removed by that
migration. This task did not deploy to Vercel or change a shared database. Provider
configuration remains separate; the default generator is still deterministic.
