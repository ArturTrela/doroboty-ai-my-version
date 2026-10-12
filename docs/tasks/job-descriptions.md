# Readable and varied job descriptions

Render legacy section labels and a deliberately limited heading/list text syntax
as escaped React elements in role details and the candidate application context.
Use the existing Untitled typography/spacing tokens, semantic H3 below the existing
H2, and shared rendering in both modes. No raw HTML, new dependencies or schema changes.

Vary only the 100 reserved synthetic marketplace jobs. Preserve six original roles,
all non-copy metadata, companies, applications and memberships. Append public text
versions instead of rewriting provenance. Optimistic description hashes prevent
overwriting edits after preflight; skip non-stock synthetic records.

Reference: AIPH3 super-repo spanning-case source-data/publications.csv (compact,
classic, assisted structures) and public_ad rows of source-data/job_versions.csv
(first project, responsibility, mandate, team and decision boundaries). Do not
copy private recruiting briefs, actors, candidates or later course evidence.
Keep the public fictional-recruitment notice. Short, standard, detailed, narrative
and extended variants should have meaningful role-specific projects and lengths.

Acceptance: parser/render safety tests, variation statistics, public/mobile/both-mode
review, application-context checks, database preservation and version consistency,
FEATURES update, verifier and isolated integration checks. Record actual results.

## Verification and separate review

- Final verifier passed: lint, 66 unit tests, TypeScript and production build.
  Public/demo E2E passed (19); isolated Supabase integration passed (26), including
  semantic headings in candidate application context. Existing rapid-navigation
  destination-stream warnings occurred, with all assertions passing.
- Five role structures rendered with 4/7/9/8/11 H3 headings and real lists. Desktop
  and 390px light/dark screenshots were inspected; no overflow or WCAG A/AA gaps.
  The candidate context displayed the same 11 extended-role section headings.
- Isolated data test refused a stale plan after a manual metadata edit, rolled back
  all copy-version inserts, then updated 100 distinct descriptions with 100 appended
  versions after a new preflight. The final reviewed planner also locks company
  rows and records edits as human_edited synthetic copy, not an AI intervention.
- Final plans span 985–3913 characters, with five variants and role/category/seniority
  context. No private CSV briefs, actors or candidate records were imported. Existing
  theme tokens, dependency versions, lockfiles and intentional customizations stay.
- The planner is read-only: node scripts/plan-marketplace-copy.ts local or cloud.
  It writes an ignored SQL plan and before-copy snapshot under artifacts/. Cloud
  mode only reads the explicitly named teaching project. Execution is a separately
  authorized, reviewed operation; plans refuse already-enriched or edited fixtures.
  The local seeder is unchanged and still installs the original stock text; after
  an intentional fixture reset, this separate refresh must be explicitly repeated.

Production deployment and database preservation checks are recorded after execution.
