# Northstar Health company page — design-system audit

## Intent and scope

Audit `/#/firmy/northstar-health` against Poster People and the receiving host guidance. Read-only product review: do not change UI or the immutable kit. Inspect actual desktop/mobile geometry, typography, surfaces, identity and shared JobCard behavior, keyboard/hover, local-network boundary and long/missing/empty states. Record actionable findings with evidence and distinguish confirmed source requirements from host-composition recommendations: v1 documents a compact employer profile inside an offer, not a canonical full company landing page.

## Acceptance

Compare source C08 identity/profile, C09 shared cards, C11/C12 shell, C13 context navigation and C17 empty recovery, plus foundations and host implementation/verification rules. Capture the actual page at 1280/390px, inspect 320px and responsive boundaries, compare relevant source examples and computed values. Check meaningful states rather than treating an old green test or screenshot count as visual acceptance. Review relevant FEATURES.md entries without changing behavior.

## Results

**Verdict: partially compliant.** Five open findings remain. The shared job-card visual adaptation is substantially correct; the company identity/information block still retains older host styling and invalid semantics. This was an audit only: no product UI, domain state, reference kit or behavior register was edited.

### Confirmed findings

| ID / priority  | Finding and evidence                                                                                                                                                                                                                                                                                                                            | Required correction / source                                                                                                                                                                                                                                                      | Status |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| NH-01 / High   | Invalid definition-list anatomy in CompanyPage (`src/features/prototype/marketplace.tsx:525–550`). The location/size terms are inside nested wrappers with sibling SVGs; the website anchor is a direct child of `dl`. A fresh scoped Axe run reports `definition-list` and `dlitem`, both serious (five affected nodes across two rule types). | Give each `dt`/`dd` pair a valid direct grouping under `dl` and place the website link outside it. Preserve actual labels/values and keyboard navigation. Source C21/fact definitions and host accessibility verification apply; this is a semantic bug, not a visual preference. | Open   |
| NH-02 / Medium | The company information panel has r24 but no ink contour or white work surface. At 1280 and 390px it computes to a 35%-opacity paper fill, 0px border and no inset edge; it visually merges into the paper canvas. Owner: CompanyPage line 525 (`rounded-xl bg-muted/35`).                                                                      | Adapt the information/profile work surface to the established white + single ink contour + r24 recipe (C08/profile and host surface rules). The exact full-page arrangement is a host decision, not a canonical v1 layout.                                                        | Open   |
| NH-03 / Medium | Header identity fallback is an 80×80 paper-colored box with 0px border/no inset edge and tiny 13px NH initials; on the same paper canvas its shape disappears. Owner: CompanyPage line 516 and `src/features/jobs/company-logo.tsx:18–24`. In the running C08 profile reference the mark has a visible 1px ink contour (55×55 there).           | Reuse the established identity treatment and a visible ink contour. Pick/document the full-company-page size rather than inheriting the old large control. 55px is evidence for the compact source profile, not a mandatory size for every hero.                                  | Open   |
| NH-04 / Medium | Company role cards omit save controls even for an active candidate. CompanyPage line 557 renders JobCard without `saved`, while JobCard only renders its save control when that value is supplied. Confirmed in an isolated Anna persona: two roles, zero save toggles.                                                                         | Pass the candidate-specific saved state/role boundary into the existing shared JobCard. Preserve stable name, aria-pressed and local persistence, as in C09 and the host reuse rules. Guests/employers should keep their appropriate behavior.                                    | Open   |
| NH-05 / Low    | This standalone company view has no visible indication that its company/roles are synthetic demo material. The source expanded profile includes that context and C12 lists an honest demo note in the footer. The current visible profile/footer do not supply it.                                                                              | Provide concise demo context in the profile or shared footer following C08/C12. Do not invent company verification claims or restore the explicitly removed Match Score caption.                                                                                                  | Open   |

### Host-composition recommendations, not confirmed v1 violations

- Use the shared public container when redesigning: this page starts at x=32 at 1280px and x=20 at 390px, while current canonical offer/application content starts at x=40/x=18. The source does not provide a full-company-page grid; choose and document one consistent host geometry.
- A contextual BackLink to offers would reuse the newly unified return pattern. Its absence is not proof of a source C13 violation on this unsupported full-page composition.
- The no-jobs state explains the absence but supplies no in-page recovery link (zero job cards and zero offer-list links in main). A C17-style recovery to other offers would be useful; this is an empty-company extension rather than an exact empty-listing clone.

Do not require the compact source profile's H2 34/31px to become this page's H1, or require its decorative illustration on a full company landing page. The source does not define that complete screen. Geist Serif 400 is already correct; the `font-semibold` JSX utility does not establish the final computed weight.

### Checks that passed

- Confirmed actual H1 uses local Geist Serif Regular 400. Shared job cards use white, ink 1px, r24 and correct source title breakpoints: 28px at 1280, 26px at 1100, 28px at 850/700 and 26px at 600/390/320. Salary/basis stay together, including the EUR/year role.
- Both local Northstar roles and company identity/data are present. Fallback initials derive from the actual company name rather than platform artwork.
- Website/role links have pointer and visible hover feedback. Enter on Staff AI Engineer reaches the correct offer. The external website was inspected but not opened.
- Checked 1280/1100/1024/1023/850/768/700/600/390/320px after two animation frames so CSS media changes were fully applied. No horizontal document overflow or out-of-viewport descendants in the normal page.
- Additional isolated-state checks with long company/role names, missing salary and initials fallback passed at 1280/1024/1023/850/390/320px. The no-jobs state resolves with its explicit Polish message. No committed fixture or user-browser scenario was changed.
- No external runtime requests occurred during the page/interaction audit.

### Evidence and test limits

Compared the running source `.offer-employer` on port 8952 with the actual company view on port 3001. The compact source profile computes to white, 1px contour, r24, padding 30×36 and an outlined 55px mark. This supports component-role comparisons, not a pixel-perfect full-company-page prescription.

Evidence in ignored `artifacts/northstar-company-audit/`: `company-1280.png`, `company-390.png`, `company-320.png`, `source-employer-1280.png`, `measurements.json`, `axe.json`, `edge-states.json`, `long-missing-salary-320.png`, `empty-320.png`. Browser checks used isolated guest and candidate contexts. Geometry metrics were sampled after layout settled; an earlier unpainted measurement was discarded rather than reported as a card typography regression.

`./scripts/verify` passed under Node 24 (formatting, immutable 67-file kit/six reference tests, lint, types, 27 unit tests, baseline packet, static build and 30 existing browser journeys). Existing nonblocking build warnings remain. This green gate does **not** close NH-01: existing accessibility journeys do not scan the company page, while the additional targeted scan fails on the two serious definition-list rules. Add company-specific accessibility and candidate-save regressions when fixing these findings.

FEATURES.md PUB-07/PUB-13/SYS-01 and candidate-save behavior were reviewed; no behavior change was implemented. Separate review reconciled screenshots, source requirements, computed styles and code owners, retaining the distinction between findings and host proposals. `git diff --check` passes. No publishing, human acceptance or full WCAG conformance claim is made.
