# Expanded local marketplace

Add 100 optional local jobs across 25 companies, 20 roles and four experience
levels. Preserve the six original roles and all user-owned data. Each company has
its own public context; role-specific projects, requirements and seniority scope
are composed into varied lengths, structures and voices. Preserve the current
natural recruiting copy without fictional-recruitment notices.

Acceptance criteria:

- Insert into the canonical running local database without reset; reruns preserve
  existing records, versions, applications and memberships.
- Each company has mixed seniorities; each role spans multiple levels across
  employers. Salary, title and responsibilities agree with the experience level.
- New seeds directly contain varied descriptions, with matching initial approved
  public text versions. Keep the six-job canonical seed and static demo separate.
- Check generator output, schema/fixtures, public browsing, filters, pagination,
  mobile/desktop rendering and isolated integration. Run the verifier, review
  separately, and update FEATURES.md and the database runbook.

## Verification and separate review

- Added 100 reserved jobs across 25 companies to the running canonical local
  database: 106 jobs and 28 companies total. All six original descriptions still
  match their authored source. All 100 new descriptions match their initial
  approved public text versions.
- All 20 role types span junior/mid/senior/lead; each new company has four roles at
  those four levels. The generator validates this distribution from SQL metadata.
- Six structures produce 100 distinct descriptions: 880–2994 characters,
  122–409 words. Company context, role projects/skills and experience scope vary.
  Titles, salaries, contract types and work modes use the same seed metadata.
- `node scripts/build-marketplace-copy.ts --check` passed in both checkouts. It
  evaluates metadata in an isolated PGlite instance, not the running database.
- Live seeder reruns preserved byte-for-byte hashes of eight complete tables:
  jobs, companies, organizations, private briefs, text versions, applications,
  memberships and candidate profiles. No reset, user provisioning or cloud write.
- `./scripts/verify` passed: lint, 74 unit tests, TypeScript and production build.
  `npm run db:check` passed all 14 baseline migrations and the revised supplement,
  including relationships, preservation, idempotency and access boundaries.
  All 19 public/demo browser tests passed.
- The full integration run passed 23 tests and exposed obsolete hard-coded
  description headings in the optional-volume test. The assertions now verify
  the actual role's semantic headings, list and final paragraph in application
  context. A final focused isolated rerun passed both the candidate/employer
  journey and optional-volume test, including submission to a new role. Existing
  rapid-navigation destination-stream warnings occurred with assertions passing.
  Disposable test stacks were cleaned up; no unresolved integration assertion.
- Live browser review checked eight role pages covering all six structures, six
  functions and four levels at 1440px and 390px. Complete copy rendered without
  overflow. All six listing pages covered 106 roles; all four level filters and
  a company profile worked. Desktop listing and mobile extended-role screenshots
  were inspected and are saved under ignored artifacts/.
- Separate review checked public/private boundaries, junior mentoring versus lead
  authority, metadata/copy consistency, SQL quoting, deterministic generation and
  non-overwriting conflict handling. FEATURES.md and the database runbook were
  updated. Scoped changes were copied into the active checkout without replacing
  unrelated work. Canonical six-job seed, static demo and cloud remain separate.
