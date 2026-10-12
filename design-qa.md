# Design QA — public job filters

## Comparison target

- Source visual truth path:
  `/var/folders/78/x88rk16x5_v80sqk69l65lmr0000gn/T/codex-clipboard-57dbcb14-6fe8-47b7-ba62-8eeff6f7aaaa.png`
- Implementation route: `http://127.0.0.1:3000/oferty?view=map`
- Implementation screenshot evidence: browser-rendered captures from the Codex in-app browser,
  emitted in the repair thread before and after the layout change.
- Source pixels: `1166 x 80`, a cropped dark-mode view of the filter row.
- Implementation viewport: `1166 x 800` CSS px at browser density `1x`, with additional checks
  at `1440 x 900` and `375 x 812`.
- Density normalization: no scaling was needed for the horizontal geometry. Color comparison was
  excluded because the supplied crop and browser capture use different modes; both modes consume
  the same Graphical layout and color tokens.
- State: map results, no active filters; category dropdown also checked open and dismissed with
  Escape.

## Full-view comparison evidence

The supplied crop showed five wide controls forced into one row and icons visually centered across
the combined label/value stack. At `1166px`, the repaired form uses a balanced three-column first
row and a second row containing two filters plus the clear action. The page width remains exactly
the viewport width with no horizontal overflow.

## Focused-region comparison evidence

- All five filter cards measure `359 x 56px` at the `1166px` viewport.
- The icon and selected-value centers are equal in every card (`349px` in row one and `417px` in
  row two), removing the visible vertical offset.
- At `1440px`, all five filters return to one row and each measures `227px` wide.
- At `375px`, controls form a single `335px` column and document width remains `375px`.
- The open category popup stays aligned to its trigger and retains the Untitled surface, option,
  selected, and shadow treatments.

## Required fidelity surfaces

- Fonts and typography: passed. Existing Untitled font roles, small label hierarchy, weights,
  line heights, and tracking remain unchanged.
- Spacing and layout rhythm: passed after iteration 1. Cards use the existing `56px` control
  rhythm, even column widths, and the shared grid gap.
- Colors and visual tokens: passed within scope. No new literals or tokens were introduced; the
  cards, popup, text, focus, and icon colors still use the active Graphical variables in both modes.
- Image quality and asset fidelity: not applicable. This control group contains Lucide interface
  icons and no raster imagery.
- Copy and content: passed. Labels, values, options, query parameters, and the clear action are
  unchanged.

## Interaction and accessibility evidence

- Every trigger keeps its Polish accessible name and Base UI keyboard behavior.
- The category popup opens, aligns with its trigger, shows the selected state, and dismisses with
  Escape.
- The progressive native-select fallback remains unchanged.
- Responsive geometry was inspected at `375px`, `1166px`, and `1440px`.
- Playwright passed all `17` browser tests, including the new medium-width grid regression,
  no-JavaScript filtering, mobile containment, and core WCAG A/AA checks.
- The project verification passed lint, `43` unit tests, type checking, and a production build.

## Comparison history

### Iteration 1

- Earlier finding: `[P2]` filter icons were centered against the entire label/value block, making
  them sit visibly above the selected-value baseline.
- Earlier finding: `[P2]` the five-column layout activated at `1024px`, compressing the controls
  and making the row feel uneven at medium desktop widths.
- Fixes made: moved the icon into the value row, made the compact trigger's actual Base UI size
  `24px`, and delayed the five-filter row until the `xl` breakpoint. Medium widths now use three
  equal columns.
- Post-fix evidence: browser measurements show exact icon/value center alignment, equal control
  widths, no page overflow, and the intended row count at all three checked widths.

## Findings

No actionable P0, P1, or P2 differences remain in the filter layout scope.

## Open questions

None blocking.

## Implementation checklist

- [x] Align every icon with its selected value.
- [x] Keep the compact filter card at the intended height.
- [x] Use a balanced medium-width layout and a single wide-desktop row.
- [x] Preserve the styled popup, keyboard behavior, native fallback, and query values.
- [x] Check desktop, medium desktop, and mobile geometry.

## Follow-up polish

None in scope.

final result: passed
