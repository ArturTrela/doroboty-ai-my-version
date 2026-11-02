# Correct Poster People adoption

## Intent

Resolve A01–A08 from the design-system audit on the existing branch. Adapt documented component anatomy and exact responsive composition, preserving domain/state/route boundaries. Do not change the immutable kit or approve 1.1.

## Acceptance

- Canonical listing has illustrated entry, visible query/location search, category buttons, desktop filter column and mobile filter-only dialog.
- URL/reset/back-forward and keyboard focus remain coherent. Single-choice domain facets retain their existing semantics.
- Shared cards/salary, role identity/facts, pay-first responsive conditions, employer and related content follow source roles.
- One namespaced adaptation of reference component/page CSS replaces competing market overrides. Shared primitives and host workspace recipes stay reusable.
- Compare desktop/mobile/intermediate source/runtime evidence; run ./scripts/verify and separate review.

## Validation

Executed with Node 24.20.0:

- `./scripts/verify` passes formatting, kit integrity (67 unchanged files / 333 references / six kit tests), ESLint, TypeScript, 27 unit tests, baseline packet, build and 22 Chromium journeys.
- Added regression coverage for desktop reset, mobile visible search, immediate facets, Escape/footer focus restoration and browser back; added canonical source typography/search geometry checks at desktop/intermediate/mobile breakpoints.
- Measured listing/offer at 1280, 1100, 850, 700, 600, 390 and 320px. Examples: 1280px search is 1200px wide, listing H1 72px, card title 28px, card pay 15px, offer H1 64px/pay 24px. At 850px offer H1 is 46px; at 390px title is 47px/pay 25px. No horizontal document overflow.
- Captured all 19 route compositions at 1280/850/390/320px (76 captures), no document overflow or external runtime requests. Tested long Polish title, initials and missing salary at 1280/390/320px.
- Current ignored evidence: `artifacts/audit-fixes/measurements.json`, listing/offer captures, filter dialog, long/missing-data captures and `all-routes/review.json`.
- Compared current listing/offer and mobile filters visually to the local reference after implementation. Geometry/type checks complement functional journeys; these are not full WCAG certification or evidence of deployment.

## Audit resolution and host boundaries

| Finding | Correction                                                                                                                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A01     | Canonical illustrated entry, persistent query/location search, category buttons/counts, named board/results anatomy.                                                                                                                                               |
| A02     | Search form keyed only by URL query/location; facets are controlled directly by current URL. ResponsivePanel stays mounted for focus restoration. Reset/back-forward are exercised.                                                                                |
| A03     | One SalaryFact implements amount and supporting contract/basis/period for cards and pay-first conditions. Explicit absence is plain text.                                                                                                                          |
| A04     | Identity and core facts precede/follow full H1 as documented; named section navigation, existing company data and shared related cards. No invented structured job requirements, benefits or AI data.                                                              |
| A05     | Host-owned namespaced adaptation preserves exact source page/component breakpoint values; new test asserts the relevant geometry.                                                                                                                                  |
| A06     | Only facets move into the full-height Base UI dialog, with a fixed header/footer and separately scrolling body. Search remains visible on the page.                                                                                                                |
| A07     | Removed competing poster-card overrides and broad global focus/important styling. Shared primitives retain explicit variants; ghost is quiet again. Split namespaced component, listing, offer and host-integration CSS; removed 169 unused source selector rules. |
| A08     | Deferred the previous 1.1 proposal, kept audit/history intact and added source geometry/state-coherence checks rather than claiming reference hashes verify the app.                                                                                               |

The existing single-value URL facets are preserved: checking a different choice replaces the previous choice in that group; this host boundary is explicit in the filter help. Source demonstration salary filters, multiple-choice domains, sorting options, fixture skills and sample application behavior are not imported as product features. Current map/list, robot brand, person selection, static company navigation, CV snapshots, local submissions and scenario decisions remain available. There are two adapted reading anchors for available content rather than invented requirements/benefits/recruitment sections; no static current-section underline falsely indicates scroll position.

## Separate review

Reviewed the final source after implementation, including source/host CSS ownership, selectors and breakpoints, namespaced token isolation, shared control consumers/portals, saved state, URL synchronization, keyboard focus, body/reset exclusion, existing local data/IDs/routes and evidence versus claims. The first browser gate exposed old DOM/text assertions plus delayed URL-driven checkbox updates and a generic dialog animation offset. Updated assertions to the documented anatomy, awaited URL-driven state in tests, and removed the centered-popup animation from the full-height filter composition. The completed gate passes after these corrections.

No reference bytes, dependencies, domain schemas, stored format, backend, remote font or runtime requests changed. Local build retains existing non-blocking Zod annotation and bundle-size warnings. Work remains on `codex/install-poster-people-design-system`; no merge, publishing or human design approval is claimed.
