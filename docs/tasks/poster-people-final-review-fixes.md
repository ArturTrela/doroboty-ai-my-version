# Close re-audit R01–R04

## Intent

Correct the route-aware section links, keyboard chip removal, homepage surface reuse and remaining marketplace action typography/contours identified in the re-audit. Keep the current branch, local domain/state and immutable reference.

## Acceptance

- Offer section destinations work with HashRouter on primary click, keyboard, copied/new-context navigation and history.
- Removing one of several chips focuses a surviving chip; removing the last focuses the results heading.
- Homepage categories reuse the existing outlined panel recipe.
- Search/offer action weight, size, line-height and contour match the source at all relevant boundaries; pay line-height changes at 600px.
- Add focused browser regressions, compare runtime/source and run ./scripts/verify plus a separate review.

## Validation

Executed with Node 24.20.0:

- `./scripts/verify` passed formatting, immutable kit integrity (67 files / 333 references / six tests), ESLint, TypeScript, 27 unit tests, baseline packet, static build and 26 Chromium journeys.
- New browser regressions cover copied section destinations in a new page, keyboard activation, section focus/scroll, back/forward navigation, multiple/last-chip removal at 1280 and 390px, all three homepage panel contours and search/offer action typography at 1280/1100/850/700/600/390px.
- Fresh reference/application comparison: 28 measurements across 1280/1100/850/700/600/390/320px. No differences in measured font size, weight, line-height or tracking for the sampled title/card title/salary/reading heading/action roles. Search has one real border with no inset shadow.
- Repeated all-route matrix: 19 compositions at 1280/850/390/320px (76 captures); no horizontal document overflow and no external runtime requests.
- Evidence copied to ignored `artifacts/final-review-fixes/`, including `results.json` and current desktop/mobile screenshots. The comparison script also refreshed its earlier ignored `design-system-reaudit/` output; the historical report remains a record of the findings at audit time, qualified by this follow-up.

## Closure evidence

| Finding | Implemented correction                                                                                                                                                         | Observed result                                                                                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R01     | React Router Link destinations contain pathname and section hash. A guarded route effect focuses/scrolls only known sections after shell focus handling.                       | Copied destination `/#/oferty/ai-product-manager#employer` renders the offer, focuses the employer section and scrolls there. Role/employer keyboard navigation and browser history pass. |
| R02     | Surviving chip button refs and a pending focus target are resolved after URL-driven render. Last removal focuses the existing results heading.                                 | Multiple-chip removal focuses the next surviving chip; last removal focuses H2 Oferty pracy. Both desktop/mobile regressions pass.                                                        |
| R03     | Homepage categories use the existing prototype-panel recipe. No new card family or broad utility selector.                                                                     | All three have r24 and one ink 1px inset contour.                                                                                                                                         |
| R04     | Shared Button weight is 600; marketplace context roles map exact source type/breakpoint values. Search disables the inherited inset contour. Pay line-height changes at 600px. | Search 14px desktop / 12px at <=850; offer action 14/13/12/14px by source ranges. Pay line-height at 700px is 36.25px, at 600px is 33.75px. Source comparisons and tests pass.            |

## Separate review

Reviewed changes after implementation: hook ordering for unavailable offers, whitelisted section targets, route-aware hrefs instead of click interception, cleanup of scheduled focus/scroll, chip successor selection after removal, explicit surface reuse, single-contour source mapping, consumer impact of shared button weight, immutable reference boundaries and actual test evidence. Re-read the re-audit criteria and the corrective diff separately. No unresolved R01–R04 findings remain in this pass.

FEATURES.md records the section-navigation and chip-focus behavior. Earlier audit reports remain historical; this report supplies closure rather than deleting findings. No dependencies, storage/schema/domain records or reference bytes changed. Existing non-blocking Zod annotation and bundle-size warnings remain. Work stays on the same branch; no merge, publish, CI result, full accessibility certification or human design approval is claimed.
