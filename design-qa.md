# Design QA — neutral shadcn refresh

## Comparison target

- Source visual truth path:
  `/Users/wojtek/.codex/generated_images/01a10762-8a17-7e30-9a86-f70ecfc8639d/exec-1234b634-c64d-4794-a978-a36c19e3d72b.png`
- Implementation route: `http://127.0.0.1:3000/oferty`
- Implementation screenshot evidence: browser-rendered capture from the Codex in-app browser,
  emitted in the build thread after the final layout correction.
- Viewport: desktop `1440 x 1024` CSS px; mobile `390 x 844` CSS px.
- Source pixels: `1487 x 1058`.
- Implementation pixels: `1440 x 1024` at browser density `1x`.
- Density normalization: the source was judged at its natural aspect ratio and normalized against
  the `1440 x 1024` implementation viewport. The small source export overscan did not change the
  layout comparison.
- State: default `/oferty` results with six fixture jobs and no active filters.

## Full-view comparison evidence

The final implementation preserves the selected direction's hierarchy and proportions: a 64 px
header, wide container, compact page introduction, dominant search field, five secondary filter
controls, count/sort row, and a single-column job list. The final container starts at approximately
72 px in the 1440 px viewport, matching the normalized source. Results begin at the same vertical
position within a few pixels after source normalization.

## Focused-region comparison evidence

- Header: logo, three restrained navigation links, and one bordered auth action match the source's
  density and alignment.
- Search and filters: search is the primary action; filter controls use a 56 px height, subtle
  borders, label/value hierarchy, and Lucide icons. Native selects and the GET form remain
  functional without JavaScript.
- Result rows: title/company/badges, location/contract/salary, relative date, and the row action
  follow the source's four-column scan pattern and collapse to a readable mobile stack.
- Supporting pages: homepage, job detail, company, methodology, privacy, and application entry use
  the same typography, blue accent, neutral surfaces, borders, radii, and shadow restraint.

## Required fidelity surfaces

- Fonts and typography: passed. Inter is used for body, interface, and display text with source-like
  weights, tight heading tracking, readable body leading, and no condensed/retro type.
- Spacing and layout rhythm: passed after iteration 1. Container width, intro placement, filter
  rhythm, row density, radii, and separators now match the selected direction.
- Colors and visual tokens: passed. White and zinc-neutral surfaces use one restrained blue accent;
  yellow, cyan, red, hard black borders, and offset shadows were removed.
- Image quality and asset fidelity: passed for the available data. The source uses illustrative
  company marks, while fixture companies provide no logo assets; the implementation uses clear
  initial-based fallbacks in standard avatar-shaped containers rather than inventing logos.
- Copy and content: passed. Polish product copy, six jobs, filters, company names, salaries, and
  application paths remain real application data rather than mock-only text.

## Interaction and accessibility evidence

- Native category filter submitted `category=lead` and returned `2 ofert`.
- Search and filters remain a server-rendered GET form.
- Mobile `390 x 844` capture had no horizontal overflow.
- Job detail retained the visible `Aplikuj w DoRoboty.ai` action.
- Browser console contained zero warnings or errors in the final checked state.
- Playwright: 15 tests passed, including mobile containment, no-JavaScript browsing, and WCAG A/AA
  checks on core public pages.
- Lighthouse medians passed on all three key routes: `/` scored 96/100/100/100,
  `/oferty` scored 94/98/100/100, and `/oferty/ai-product-manager` scored
  96/100/100/100 for Performance/Accessibility/Best Practices/SEO.

## Comparison history

### Iteration 1

- Earlier finding: `[P2]` the initial implementation used the inherited `max-w-7xl` container,
  placing primary content about 40 px too far inward on each side compared with the source.
- Earlier finding: `[P2]` the page intro and filters started about 30 px too low, reducing the
  number of visible results above the fold.
- Fixes made: expanded the public shell and marketplace container to `1360px`; reduced marketplace
  top padding from 64 px to 36 px; retained the source-like 64 px header.
- Post-fix evidence: the final desktop capture aligns the logo and content near x=72, places the
  intro near y=103, places filters near y=322, and begins results near y=432, matching the
  normalized source composition.

## Findings

No actionable P0, P1, or P2 differences remain.

## Open questions

None blocking.

## Implementation checklist

- [x] Replace retro tokens and fonts with neutral shadcn tokens and Inter.
- [x] Rebuild `/oferty` around primary search and a single-column result list.
- [x] Preserve native GET filters and existing application links.
- [x] Apply the system to all public product surfaces.
- [x] Verify desktop, mobile, filtering, no-JavaScript behavior, accessibility, build, and console.

## Follow-up polish

- `[P3]` Replace monogram fallbacks with real company logos when fixture `logoUrl` values become
  available.

final result: passed
