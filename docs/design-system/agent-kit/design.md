# DoRoboty.ai — agent entry point

Version 1.0.0. Read this file before building or changing a screen. This is a local, runnable handoff extracted from the accepted standalone listing and offer prototype, source commit `6f1cd9e6980f40546d80732e228f39d2ad89fc3a`.

The detailed reference is [the designer documentation](reference/index.html), with its [full Markdown](reference/components.md) and preserved evidence. This package uses that system; it is not a new visual direction.

## Start here

Use Node 24 and npm. There are no runtime dependencies and no build step.

```sh
npm run check
npm run dev
```

Open `http://127.0.0.1:8952/`. `UI_KIT_PORT` can select another local port. Alternatively, serve this entire directory with any static HTTP server. Use HTTP for ES modules; opening example HTML directly through `file://` is not supported.

- [Component examples](examples/components.html): semantic markup, controls, native validation, save states, cards, dialog and toast.
- [Complete listing](examples/index.html): search, filters, sorting, pagination and transient saves.
- [Complete offer](examples/oferta.html?id=1): facts, reading column, employer and related roles.
- [Long title / initials](examples/oferta.html?id=7), [missing salary](examples/oferta.html?id=10), [invalid ID](examples/oferta.html?id=999).
- [Public classes and JS API](components/API.md).
- [Package decisions](CHANGES.md) and [verification](VERIFICATION.md).

## Imports and source ownership

For a new screen one directory below the package root:

```html
<link rel="preload" href="../assets/fonts/GeistSerif-Regular.woff2"
      as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../styles/foundation.css">
<link rel="stylesheet" href="../styles/components.css">
```

Add `../styles/listing.css` for the documented listing composition, or `../styles/offer.css` for the full offer composition. The header and common components are already in components.css; each example loads only its own page composition. Keep the order: foundation → components → page composition → private page layout. foundation.css imports `./tokens.css` and declares the local font. Preserve the relative assets directory when moving these files.

```js
import { jobCard, offerURL } from '../components/ui.js';
```

All existing exported names/signatures and public CSS classes are retained. `examples/assets/catalog.css` only arranges the catalog; it is not a component stylesheet to copy into a product. Do not duplicate component declarations in page-specific CSS.

This is the standalone prototype's HTML/CSS/ESM stack. It does not include the separate teaching application's Next.js/shadcn/Graphical implementation. If integrating into an already governed app, map these roles to that app's primitives and obtain the appropriate scope for a theme conversion; do not silently apply the global reset across unrelated screens.

## Visual contract — confirmed in the accepted reference

- Warm paper `--paper` behind white `--surface` work areas; thin 1px ink contours, no offset shadow system.
- Geist Serif Regular 400 for H1–H6. Arial/Helvetica/system sans for working text, labels, controls and amounts. Do not synthesize bold Serif.
- Primary action: `--action` pink with dark text. Salary/fact: lighter `--fact`. Selected controls: ink with white. Yellow belongs to people and selected company marks, not a second CTA hierarchy.
- Existing radii: `--radius-small:10px`, `--radius:18px`, `--radius-large:24px`. Keep documented local exceptions, including 5px checkboxes and 999px salary pills; do not pretend they are additional named tokens.
- Listing titles: 28px base, 26px mobile; retain the documented intermediate 26→28→26 rules when reusing the existing card. Full role title: 64px base, 47px at ≤700px. Long titles wrap fully and increase height.
- Logos remain small, with a text-initials fallback. Do not use platform illustrations as employer identity.

Exact declared values and source selectors are in the reference. No spacing token scale, dark theme, semantic error palette or additional Serif weights were established. Local values in the CSS are not automatically team standards.

## Compose the whole screen

### Listing and saved results

Use the header, compact illustrated entry, search, category selector and then the working results area. Desktop: filter column plus repeated wide rows; mobile: compact filter entry, dialog and single-column cards. Keep role, company, salary/terms, location and mode in stable positions. Related offers reuse the same `jobCard`, not another card family.

Keep search and filter semantics honest. In the example, query/location submit together; checkbox/numeric filters apply immediately. Closing mobile filters does not roll back changes. “Pokaż N ofert” closes the panel; it does not commit a separate draft. Zero results must have a clear recovery action.

### Full offer

Use the role header with company, full title and core facts; readable description sections; a supporting facts/action panel; employer information; related cards. The panel is sticky at 24px on desktop and static before the description at ≤700px. Do not add a full-height marketing hero or let a fixed action cover content/focus.

Keep salary amount, currency, contract basis and monthly period together. Show “Nie podano wynagrodzenia” for null. Never invent zero, a verified employer badge, urgency, ratings or a real application submission.

## Choosing and configuring components

Use [API.md](components/API.md) for required anatomy, classes and state attributes. Important distinctions:

- `.button.button-primary` for the main action; `.button` for a secondary action; native anchor for navigation, native button for local actions.
- `.category-tab` is a single-choice filter made from buttons, not an APG tab/tabpanel implementation.
- `.filter-chip` removes an applied criterion. `.job-tags span` only displays a skill.
- `.salary-tag` is a fact, never an action.
- `.save-button` uses a constant accessible name plus `aria-pressed`; retain focus and update the icon/state. This is a package decision documented in CHANGES.md.
- `jobCard(job, saved, href)` renders markup only. Attach your controller to `[data-save]`; use native links for navigation.
- Use `dialog.showModal()` and `close()` for existing dialog classes. Name the dialog, keep focus inside while open and return it to a logical trigger.

## Extension boundary

**Package decisions:** CSS extraction, safe card-string rendering, safe href filtering, numeric DOM IDs and stable save labels are defined in CHANGES.md. They are not retroactively claimed as observations from the original screenshots.

**Recommendations for future work:** maintain the color/action hierarchy, semantic controls, readable text and full wrapping. Extend with page-specific layout or composed existing primitives before inventing another visual family. For a missing interaction, define its data, states, keyboard behavior and acceptance criteria first.

**Still open:** intermediate type-scale intent, tiny 9–11px metadata, static first-item underline in offer section navigation, real application flows, asynchronous errors/loading, dark mode, RTL and multi-contract/multi-city variants. The examples preserve the documented static section underline; it does not track scroll position. Do not call these gaps complete features.

## Verify every new screen

1. Run `npm run check` after changing this package. Inspect links and local asset imports.
2. Compare desktop and a narrow viewport against the evidence: fonts, hierarchy, contour, radii, spacing, facts and illustration role.
3. Include a long Polish title, initials fallback, missing salary and enough repetition to reveal density problems. Check intermediate widths as well as mobile.
4. Exercise search, chosen/disabled/focus states, save/remove, native validation, dialog open/Escape/Tab and recovery. Check focus after re-rendered controls.
5. Test 320 CSS px, zoom, text-spacing overrides, target sizes and screen-reader announcements before claiming WCAG 2.2 AA. These are not established by screenshots or token contrast alone.
6. Report actual checks, transient demo state and missing integrations. Package examples send no CV, use no job API, and have no persistent browser storage.

The original website and accepted human reference are preserved. This handoff is local and contains no Site identity or automatic deployment setup.
