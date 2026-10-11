# Expanded local marketplace fixtures

## Intent and acceptance

Add 100 synthetic published jobs across 25 fictional companies for local marketplace,
map, application and company-page testing. Preserve current jobs, candidate data,
memberships and canonical course fixtures. Provide an explicit local-only, transactional,
idempotent seeding command; do not reset the active database or seed a remote project.
Each job needs a corresponding organization, private source brief, approved text version,
valid salary/dates and map coordinates. Existing employer permissions must not expand.

## Verification plan

Run the supplement against the full migrated schema using PGlite; check counts,
relationships, variety, anonymous visibility, private briefs and repeat-run preservation.
Run the project verifier and local integration suite in an isolated Supabase stack.
Apply the supplement to the user's local database without reset and inspect HTTP results.
Update FEATURES.md and the database runbook in the same change.

## Results and review

- PGlite applied all 13 migrations and the canonical seed, then validated the supplement:
  100 jobs / 25 companies, all three categories, six functions, three work modes,
  four seniority levels, three contracts, salaries, active dates and coordinates.
- Relationship, anonymous visibility, private-brief RLS, repeat-run/no-duplicate checks
  passed; reruns preserved an edited fixture, original job and organization memberships.
- Applied to the running local database without reset: jobs 7 → 107, companies 4 → 29,
  applications unchanged at 7. All 100 new jobs have coordinates.
- Local HTTP checks returned 200 for listing, map view, a new role and its company.
  Browser checks found all 100 added roles at widths 390 and 1280 with no overflow;
  map state reached ready with 106 markers (new roles plus existing geocoded roles).
- All 26 integration tests passed against the separate `doroboty-marketplace-tests`
  stack on ports 573xx. The added scenario seeds twice, checks preserved applications
  and employer isolation, browses a four-role company, and submits a new-role application.
- `./scripts/verify` passed on Node 24: lint, 51 unit tests, TypeScript and production
  build. Formatting and diff-whitespace checks passed. The isolated test stack was
  stopped with its recoverable backup; the user's original stack remains running.
- Separate review confirmed no cloud target, new memberships, dependency changes,
  schema migrations or staged-case data changes. CLI status errors are sanitized to
  avoid exposing credential-bearing output. Data are opt-in and survive normal restarts,
  but an intentional local reset requires rerunning the supplement.
