# Poster People corrective implementation — re-audit

Date: 2026-11-02. Verdict: **Improved substantially; previous findings are not all closed.**

## Scope and method

Re-audit the current implementation against the project integration guide, immutable v1 component/page styles, component API and human reference. Check each original A01–A08 acceptance criterion independently from the previous fix report. No application or reference code was changed by this audit.

Fresh isolated Chromium comparison: listing and offer at 1280, 1100, 850, 700, 600, 390 and 320 CSS px, reference and application (28 measurements). Fresh screenshots at 1280/390 plus the current homepage. Exercised query/facet reset, browser back/forward, chip keyboard removal, section-link navigation and mobile dialog scrolling/Escape. Evidence: ignored `artifacts/design-system-reaudit/results.json` and PNGs. Compared typography properties rather than requiring equal text-dependent heights across different jobs.

Ran `./scripts/verify` on the current source: formatting, unchanged kit integrity (67 files / 333 references / six tests), lint, TypeScript, 27 unit tests, baseline packet, static build and 22 Chromium journeys passed. Existing Zod annotation and bundle-size warnings remain non-blocking. Passing this gate does not close the findings below; its current assertions do not cover them.

## Original finding closure matrix

| ID                                    | Status               | Evidence and remaining scope                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 — listing composition             | **Closed**           | Illustrated entry, persistent query/location search, category buttons/counts, desktop facets/results and mobile filter-only entry are present. At 1280px the search measures 1200px; at 390px it remains visible and 354px wide. Existing single-value facets and map are documented host adaptations.                                                   |
| A02 — stale values after reset        | **Closed**           | Entered Product, selected remote, reset: URL `/#/oferty`, empty input and unchecked remote. Back restores Product plus remote URL; forward restores the cleared state. Mobile dialog Escape restores trigger focus. A separate chip-focus defect is R02 below, not recurrence of the stale-value defect.                                                 |
| A03 — salary hierarchy                | **Closed**           | Shared SalaryFact separates amount and basis/period; pay precedes responsive two-column mobile terms and actions. Desktop card amount 15px, desktop offer amount 24px, 390px offer amount 25px. Missing-data text is explicit in source. A residual line-height detail at 700px is recorded under A05/R04.                                               |
| A04 — offer composition               | **Partially closed** | Identity, H1/core facts, available function label, reading navigation, company context and shared related cards are present. Available data is retained without fabricated skill lists/benefits. The new section links have invalid standalone destinations under HashRouter: R01.                                                                       |
| A05 — responsive typography/geometry  | **Partially closed** | Original main discrepancies are fixed: offer H1 64/54/46/47px across relevant ranges; card title 28/26/28/26px; 390px card line-height 29.38px; reading H2 36px desktop / 33px mobile. Remaining action typography and one 700px salary line-height differ: R04.                                                                                         |
| A06 — mobile filter composition       | **Closed**           | Full-height dialog contains facets only, independent scroll body, fixed header/footer and bottom result action. At 390×844, scrolling changes neither header y=0 nor footer y=764; Escape returns focus to trigger.                                                                                                                                      |
| A07 — shared variants/style ownership | **Partially closed** | Ghost is quiet, superseded poster-card rules and important heading rules are removed, namespaced common/listing/offer styles are separated. Shared Button still supplies mismatching type roles and a second contour on Search (R04); homepage category surfaces lack the documented/shared contour (R03). Reuse and consistency are not yet equivalent. |
| A08 — evidence/completion claims      | **Partially closed** | Meaningful source geometry and state-coherence tests were added; 1.1 is explicitly deferred and kit integrity is correctly separated from app checks. However, the fix report marks A01–A08 resolved while R01–R04 are still present. Keep technical test success, design conformance and human acceptance separate.                                     |

Four original findings are closed, four are partially closed. None of the original major listing/reset/salary failures remains unchanged; full application design acceptance is still premature.

## Remaining actionable findings

### R01 · P2 · Offer section links cannot be copied or opened as valid destinations

**Source:** `src/features/prototype/marketplace.tsx:421–437`. **Contract:** API C13 native navigation plus project HashRouter boundaries.

`O firmie` has `href="#employer"`. Normal primary activation is intercepted with preventDefault/scrollIntoView, but the actual destination resolves to `http://127.0.0.1:3001/#employer`. Following that URL shows `Nie znaleziono strony`, confirmed in the fresh browser. The same structural issue affects `#role`. This breaks native copy/open-in-new-tab behavior even though clicking in the current page invokes a scroll handler.

**Acceptance:** Encode destinations using the current hash route, restore the intended section on direct navigation, and verify primary click, copied URL/new context and keyboard activation. Do not add another router or server.

### R02 · P2 · Keyboard focus falls to body after chip removal

**Source:** `src/features/prototype/marketplace.tsx:257–269`. **Contract:** API C06 explicitly requires focus management when a criterion is removed.

Reproduction: search Product, focus `Usuń filtr: Product`, press Enter. Criterion and chip disappear; `document.activeElement.tagName` becomes BODY. The handler only changes URL state; it does not choose a surviving chip, source control or results heading as the next focus location.

**Acceptance:** Define and implement a logical focus successor; test both the last-chip and multiple-chip cases with keyboard input. Keep existing reset/back-forward synchronization intact.

### R03 · P2 · Homepage category surfaces bypass the shared outlined-panel recipe

**Source:** `src/features/prototype/home.tsx:72–86`; `src/app/poster-people.css` shared surface rules. **Contract:** integration guide paper/white/ink hierarchy with visible thin contours, and reuse-first host extension rules.

The three Build/Apply/Lead category cards use raw `rounded-xl bg-card p-6`, not the shared panel recipe. Fresh runtime measurement of the first card: border 0px, box-shadow none, radius 24px. They render as unoutlined white blocks, unlike the source surfaces and the application's outlined record/form panels. The previous correction removed the broad class-based border override but did not replace these consumers with an explicit reusable surface.

There is no pixel-exact homepage in the kit; this is a shared surface consistency issue, not a claim that the homepage must equal the listing screenshot.

**Acceptance:** Use an explicit shared outlined surface recipe across these cards and review its other consumers. Avoid reinstating a broad selector based on utility class names.

### R04 · P2 · Base UI button typography is still only partially adapted

**Source:** `src/components/ui/button.tsx:5–26`, `src/app/marketplace.css:24–29` and action adaptations. **Contract:** reference C01 and exact component/page source declarations.

| Element / width        | Reference        | Current application |
| ---------------------- | ---------------- | ------------------- |
| Search / 1280px        | weight 600       | weight 500          |
| Search / 850px         | 12px, line 18px  | 14px, line 21px     |
| Offer primary / 1280px | 14px, weight 600 | 15px, weight 500    |
| Offer primary / 850px  | 12px, line 18px  | 15px, line 21px     |
| Offer primary / 390px  | 14px, weight 600 | 15px, weight 500    |

The Search button also has both a real 1px border and the shared inset 1px edge shadow; reference has a real border and no inset contour. Do not treat this as a general prohibition of inset implementation: the issue is combining both on the same control.

A small additional mismatch: offer pay at 700px has line-height 33.75px in the app versus 36.25px in the source; at <=600px the source itself changes to 33.75px. This boundary detail was not caught by the existing font-size-only assertions.

**Acceptance:** Map source variants/type roles through shared primitives and context-specific roles, preserve one contour, and verify the 600/700/850/1100 boundaries including line-height and weight. Do not repair the marketplace by globally shrinking unrelated workspace controls.

## Confirmed gains and justified differences

Local Geist Serif 400, source heading/card/salary sizes, paper/white/ink/pink colors, source illustration, canonical listing/offer anatomy, stable save names/aria-pressed, independent mobile scrolling and existing data/role/storage/routes are retained. Source fixture count, skills, multiple-value filter semantics, sample application dialog and sorting options are not requirements to import into this governed prototype. The robot/person navigation and local application workflow are required host behavior.

The 1.1 proposal remains deferred. Nothing in this re-audit approves a reference release, modifies v1, proves complete accessibility compliance or claims CI/deployment/human approval. Application source is unchanged by this audit; only this report and ignored local evidence were created.

## Follow-up after this audit

R01–R04 were subsequently corrected and verified in [final review fixes](poster-people-final-review-fixes.md). The findings above describe the audited state before that correction. The ignored comparison output directory was refreshed during follow-up; current closure evidence is copied to `artifacts/final-review-fixes/`.
