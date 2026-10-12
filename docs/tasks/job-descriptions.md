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

## Hosted release verification

- PR #2 merged as 90afe5b. Renderer deployment dpl_53XLTtvXVwex5hSraPNR6sLovBbz
  was checked before promotion to https://doroboty-ai-case.vercel.app. The database
  refresh was applied only after the public domain rendered section headings.
- All 100 reserved descriptions were updated, with 100 new approved public
  human_edited versions. Lengths span 985–3913 characters. Every version matches
  its current job description and retains the fictional-recruitment notice.
- Before/after hashes match for the six original jobs, all company records,
  original synthetic text versions and every non-copy field of the 100 fixtures.
  Published jobs remain 106, applications 0 and organization memberships 2.
- Production review confirmed the five heading/list structures, desktop and
  390px light/dark layouts, no horizontal overflow and no automated WCAG A/AA
  violations in the checked mobile role page. Both production screenshots were
  inspected. Authenticated application-context checks ran locally, not in cloud.
- Thirteen production smoke checks passed: public pages, auth forms, signed-out
  candidate/employer redirects, robots/sitemap, two logos and image optimization.
- GitHub Supabase integration passed. Quality CI failed only at the unchanged
  homepage Lighthouse Performance gate: median 88 versus required 90. The existing
  user-authorized performance exception remains; no threshold was reduced.
- Stopped the isolated 573xx Supabase test stack with backup and its port-3108
  preview. The user's existing local database/dev server and landing-page edits
  were not changed. Existing local fixtures still require an explicit copy refresh.
- FEATURES.md was updated in the implementation commit. This release-note update
  records evidence only and makes no further product behavior changes.
