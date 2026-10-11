# S7–S11 — Candidate experience

## Canonical journey

An anonymous visitor opens a job and chooses sign-in or candidate registration. Registration
collects first name, last name, email, password and privacy acknowledgement. Email confirmation
preserves the internal return path, including the intended job. Onboarding shows account,
profile, experience and CV readiness. Profile edits preserve the return link to onboarding and
the application. A candidate may pause and resume from the account dashboard.

The application workspace keeps the complete public role visible alongside the candidate's
selected experience, work samples and answer. Available AI treatment is still determined by
the case release and experiment assignment. The candidate can write manually, generate,
regenerate or discard an AI draft. An explicit confirmation is required for submission. The
receipt links to an immutable application detail with a timeline and eligible withdrawal.

Saved jobs and private drafts belong to the candidate. Preferences stay private and are not
included in the submitted profile. Employers receive only selected evidence and the CV version
recorded with the application. Updating or removing the current CV does not rewrite previously
submitted bytes. The employer preview reads that submitted version rather than the live CV.

## Implementation and security review

- Structured names, preferences, ordering, saved jobs, drafts and deletion requests are added
  by new migrations; generated public-schema types are committed in `src/lib/supabase/database.types.ts`.
- Server mutations check the current role and validate inputs. Local tests cover two candidates,
  two employer organizations, operator, anonymous and signed-out access.
- CV objects use versioned paths. Employers cannot read an unsubmitted replacement; submitted
  versions cannot be overwritten or deleted through candidate Storage policies.
- Application snapshots exclude private salary and job preferences. Export is restricted to the
  current user's records and fails rather than silently delivering a partial file.
- Expired jobs remain visible for context; application submission is rejected both in the UI
  and by a database trigger. This is transaction integrity, not a case-data filtering intervention.
- Return-path validation rejects external URLs, protocol-relative paths and backslash redirects.
- Analytics accept only typed enumerations, flags, counts and IDs. Names, email, filenames and
  free-form profile/application text are rejected.

## Graphical change audit

Scope: changed public session navigation, auth, candidate dashboard/onboarding, profile,
preview, saved jobs, settings, application workspace, receipt and detail. Baseline: active
`tokens.css`, existing Base UI wrappers, `GUI.md` and Graphical guidance. Existing unrelated
public marketing layout and employer screens were not converted.

| Finding                                                                        | Repair                                                                                          | Status |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ------ |
| New currency field used a native select                                        | Reused `FormSelect`, including themed portal and keyboard controls                              | Fixed  |
| New candidate layouts used numeric spacing and independent relaxed line-height | Mapped spacing to existing `--gui-space-*` roles and used complete typography aliases           | Fixed  |
| White text on the shared red destructive button measured 4.04:1                | Used existing black neutral token in both modes; red fill remains unchanged                     | Fixed  |
| Shared error text had the same weak red-on-white contrast                      | Used existing readable text on the translucent error surface, with existing spacing/type tokens | Fixed  |
| Verification badge was an invalid direct definition-list group                 | Added its semantic term and definition                                                          | Fixed  |
| Unselected checkboxes disappeared against evidence cards                       | Used the existing background surface for evidence rows                                          | Fixed  |
| Internal “snapshot” wording and decorative CV eyebrow leaked into candidate UI | Replaced with plain Polish explanations and removed redundant copy                              | Fixed  |

Structural widths, grid ratios, responsive breakpoints and icon geometry are intentional
layout choices. Existing theme fonts, icons, colors, radii, shadows and portal inheritance are
reused. No new theme scale or dependency was introduced.

Browser coverage includes 11 routes at 390px and 1280px in both light and dark mode, horizontal
overflow checks, Axe WCAG A/AA checks, and keyboard use of the currency select. Screenshots of
the dashboard, profile and application are generated by Playwright. Dashboard and desktop/mobile
application screenshots were visually reviewed; this is not a claim of complete manual WCAG
certification or a human usability study.

## Final local verification

- `./scripts/verify`: lint, 48 unit tests across 15 files and the production build passed.
- `npm run test:e2e`: all 17 secret-free public/demo browser tests passed.
- `npm run test:integration`: all 22 local Supabase/browser integration tests passed,
  including the fresh-account journey, cross-account access checks, versioned CV isolation,
  manual and AI-assisted applications, and the 44-state graphical/accessibility audit.
- `npm run db:check`: 13 migrations, the deterministic seed and 24 RLS-protected tables passed.
- Formatting and `git diff --check` passed. These checks use synthetic local data only.

## External acceptance still required

- M11-07: the candidate can reauthenticate, request account deletion and cancel the request.
  Actual fulfillment is an operator process, not an automated destructive job. Before operating
  with real personal data, the owner must approve retention/anonymization rules and implement or
  rehearse fulfillment using appropriately privileged administration. No production identity
  or CV data is used by this teaching application.
- M11-34: an automated fresh-account journey covers registration, confirmation, onboarding,
  profile, CV, job save, private draft resume, manual application, receipt, withdrawal, export
  and deletion-request cancellation. A real first-time person's hesitation and understanding
  cannot be inferred from that test. Schedule the observation using the existing participant
  test protocol and record consent, hesitation, visibility comprehension and context loss.

No human test, external email delivery, production deployment or PostHog ingestion was claimed
as verified by the local suites.
