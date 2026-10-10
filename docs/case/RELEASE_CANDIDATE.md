# AIPH3 case release candidate

Recorded: **2026-10-10**

This is an evidence record for the current release candidate, not the final cohort release. It
contains no credentials or participant data.

## Build identity

- GitHub repository: `superhero-tech/doroboty-ai`
- Release branch: `main`
- Candidate commit: `89e9ebc82731a9fb95ccceb19eeef22e29500eb0`
- Vercel project: `wstrzalk-gmailcoms-projects/doroboty-ai-case`
- Canonical deployment: `https://doroboty-ai-case.vercel.app`
- Last known-good deployment: `dpl_5cVaVPiNRsL5E7gVuBmbXNXimSLG`
- Isolated Supabase project: `doroboty-ai-case` (`vgxoiljieuhvnpuojaet`, Frankfurt)

## Verified gates

- GitHub Actions run `38062637255`: **Quality and demo** passed.
- GitHub Actions run `38062637255`: **Supabase integration** passed.
- Public HTTPS deployment smoke passed for homepage, marketplace, representative job, sign-in,
  robots, and sitemap.
- Robots and sitemap use the canonical Vercel origin rather than localhost.
- Nine reviewed migrations and the deterministic seed were applied to the isolated Supabase
  project after a successful dry run.
- Candidate, employer, and operator authenticated deployment smoke passed in isolated browser
  sessions using synthetic `.invalid` accounts.
- The instructor deployment rehearsal passed all six release controls and participant packet
  checks, opened the pilot calculator, reached Demo Day, and restored `discovery`.

## Remaining release gates

- Verify typed analytics in an isolated PostHog EU project with synthetic IDs and inspect captured
  properties for PII.
- Run the technical and non-technical proxy rehearsals, independent case-data review, and
  real-person test after the named external decisions in `TODO.md` are approved.
- Replace this record with a cohort record and tag only after every release gate passes.

## Recovery point

The Vercel deployment above is the current code rollback point. Database rollback remains a
separate forward-only recovery procedure as documented in [`INSTRUCTOR_RUNBOOK.md`](INSTRUCTOR_RUNBOOK.md)
and [`../deployment.md`](../deployment.md).
