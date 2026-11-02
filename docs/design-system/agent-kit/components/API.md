# Public surface and required anatomy

Read [design.md](../design.md) first. The public surface consists of existing CSS classes, semantic HTML and the existing ESM exports. No React dependency or synthetic framework wrapper is introduced. Example-specific `.catalog-*` and `.kit-*` classes are private page layout.

## CSS modules

| File | Purpose | Required ordering |
| --- | --- | --- |
| `../styles/tokens.css` | Existing color/radius/font variables, names unchanged | Imported by foundation |
| `../styles/foundation.css` | Reset, font-face, body/H typography, container, skip link, focus | First |
| `../styles/components.css` | Controls, labels, marks, cards, header/footer, feedback and dialogs | After foundation |
| `../styles/listing.css` | Intro and results-page composition; responsive filter column | Only where used |
| `../styles/offer.css` | Full role header, reading sections, panel, employer and related composition | After shared styles |

## Classes and structure

| Reference family | Public classes / HTML | Required parts and behavior | Working example |
| --- | --- | --- | --- |
| C01 Actions | `.button`, `.button-primary`, `.text-button`, `.icon-button`, `.save-button`, `.icon` | Native button for actions; anchor with href for navigation. Every icon-only action has an accessible name. `aria-pressed` is a boolean string on a save toggle. | `components.html#actions` |
| C02 Inputs | `.search-field`, `.input-clear`, `.salary-input`, `.salary-input-label`, `.salary-filter` | Label associated by for/id; separate hint; number min/max/step and described-by. `.salary-input` wraps input and unit. | `components.html#fields`; listing form |
| C03 Select | `.location-field`, `.sort-field`, native select | Associated label, valid options and selected value. A custom-looking native select is not a searchable combobox. | Catalog fields; listing |
| C04 Checkbox | `.filter-group`, `.salary-check`, native checkbox | `fieldset > legend`, then labels containing input and text. Optional `.facet-count` on work mode. Two states only in the package. | Catalog fields |
| C05 Categories | `.category-tabs`, `.category-tab`, `.selected`, `.category-count` | Group of buttons, exactly one selected, each `aria-pressed`; label, optional small description and count. No tab/tabpanel roles. | Catalog categories; listing |
| C06 Applied chip | `.active-filters`, `.filter-chip` | Button containing criterion and decorative ×; accessible removal name, controller removes one condition and manages focus. | Catalog chips; listing |
| C07 Facts | `.salary-tag`, `.salary-missing`, `.salary-description`, `.job-tags`, `.offer-skill-row` | Noninteractive text. Salary is accompanied by currency, basis and period; null means explicit absence. | Catalog facts/cards; offer |
| C08 Identity | `.company-logo`, `.logo-pink/yellow/white/ink`, `.offer-identity`, `.offer-employer` | Mark plus full readable company name. Missing mark uses initials. Decorative platform artwork is not company identity. | Catalog marks; offer/company |
| C09 Job card | `.job-card`, `.job-main`, `.job-title`, `.job-facts`, `.job-side`, `.job-list` | Use `jobCard`; title is H3 with anchor, conditions stay near amount, separate save button. Each numeric job ID appears once per document. | Catalog cards; listing/related |
| C10 Pagination | `.pagination`, `.page-summary`, `.page-button` | Named nav, current button `aria-current="page"`, disabled boundary buttons, descriptive names for arrows. | Catalog pagination; listing |
| C11 Header | `.site-header`, `.header-inner`, `.wordmark`, `.brand-square`, `.desktop-nav`, `.saved-nav` | Brand anchor, main nav, context-aware saved action/count. Hidden middle nav on narrow screens is the source pattern. | Listing / offer |
| C12 Footer | `.site-footer`, `.footer-inner`, `.footer-wordmark` | Brand, honest demo note, information action. Not a complete production legal footer. | Listing / offer |
| C13 Context navigation | `.offer-breadcrumb`, `.offer-section-nav` | Native return/anchor links with named nav. First-item underline is static in this snapshot. | Offer |
| C14 Search bar | `.search-form`, `.search-field`, `.location-field`, `.search-submit` | Form with query, location and submit. Preserve its split mobile rows. | Listing |
| C15 Filter panel | `.filter-panel`, `.filter-heading`, `.filter-group`, `.filter-button`, `.filter-dialog` | Same controls move into the mobile modal. Clear/close/apply semantics are controlled by the page script. | Listing / mobile |
| C16 Entry | `.intro-section`, `.intro-grid`, `.intro-copy`, `.people-art` | Text H1/description remain separate from the illustration. One source scene with mobile recomposition. | Listing |
| C17 Empty/recovery | `.empty-state`, `.empty-mark`, `.offer-not-found` | Icon, contextual heading, reason and appropriate recovery action. Zero results is not a server error. | Empty listing / invalid offer |
| C18 Dialog | `dialog.about-dialog`, `.dialog-heading`, `.about-content`, `.filter-dialog` | `aria-labelledby` points to heading; close button; native showModal/close. Filter dialog has own scrolling header/footer. | Catalog / listing / offer |
| C19 Status | `.toast`, `[role="status"]`, `[aria-live="polite"]` | Initially hidden; textContent updates; timer in controller; no focus stealing. | Catalog / listing / offer |
| C20 Role header | `.offer-hero`, `.offer-key-facts`, `.offer-skill-row`, `.offer-share` | Company identity, full H1, facts and optional share action. | Offer |
| C21 Conditions | `.offer-sidebar`, `.offer-action-card`, `.offer-pay`, `.offer-terms`, `.offer-actions` | Salary/basis, definition list, primary/secondary actions, demo limitation. Sticky is composition, not fixed positioning. | Offer |
| C22 Reading blocks | `.offer-description`, `.offer-reading`, `.offer-section`, `.offer-benefits`, `.offer-process`, `.offer-closing` | H2/H3 hierarchy, paragraphs/lists; benefits and ordered process are static information, not an accordion/stepper. | Offer |

Catalog anchors are relative to [examples/components.html](../examples/components.html). Canonical markup for composite screens is [the listing](../examples/index.html) and [offer](../examples/oferta.html?id=1). Preserve descendant structure: the CSS uses nested selectors, grid children and responsive order. Replacing the anatomy with arbitrary divs can change layout even when the outer class name is kept.

## JavaScript exports

Import from `../components/ui.js` relative to an example HTML/module directory. From the existing controllers in `examples/assets/`, the exact import is `../../components/ui.js`.

| Export — signature retained | Returns / contract |
| --- | --- |
| `esc(value)` | String escaped for text/quoted HTML attributes. It is not a general HTML sanitizer. |
| `icon(name)` | Decorative SVG string; available names below; unknown name uses the source `work` symbol. Add the accessible name to the parent control when needed. |
| `money(number)` | pl-PL number formatting; no currency suffix by itself. Pass finite values. |
| `logoHTML(job)` | Decorative company-mark span; tone is whitelisted; missing mark derives first-two-word initials. Render company name separately. |
| `salaryHTML(job)` | A salary pill for numeric min/max, or explicit text when salaryMin is null. Add `contractLabel` nearby. |
| `contractLabel(job)` | B2B / UoP / Zlecenie monthly basis text used in the source. |
| `age(job)` | Relative fixture age text from non-negative integer `days`. Not an authoritative publication date service. |
| `jobCard(job, saved, href)` | Semantic article HTML. `saved` is a Set of numeric IDs. `href` is safe relative/fragment/query or HTTP(S); unsupported schemes become `#`. It does not bind event listeners. |
| `offerURL(id, back = '', saved = new Set())` | Relative URL to `./oferta.html`, carrying ID, optional listing query and transient marks. Route contract belongs to the supplied examples. |

Icon names: `search`, `pin`, `bookmark`, `arrow-right`, `arrow-left`, `arrow-up`, `external`, `close`, `sliders`, `work`, `remote`, `smile`, `spark`, `check`.

### Job data

```js
const job = {
  id: 100,                         // positive safe integer, unique in the DOM
  title: 'AI Product Designer',
  company: 'Przykładowa firma',
  category: 'Apply',               // Build | Apply | Lead in the supplied examples
  city: 'Warszawa',
  mode: 'Hybrydowo',               // Zdalnie | Hybrydowo | Stacjonarnie
  level: 'Senior',                 // Junior | Mid | Senior | Lead
  contract: 'B2B',                 // B2B | UoP | Zlecenie
  salaryMin: 18000,                // finite number, or null for missing salary
  salaryMax: 24000,                // finite number >= salaryMin; null with missing salary
  tags: ['Product design', 'AI products'],
  logo: 'PF',                     // empty string uses initials fallback
  tone: 'pink',                   // pink | yellow | white | ink
  days: 0                         // non-negative integer
};
```

These are the actual example-data contracts, not a validated domain API. Validate data at integration boundaries. Strings are escaped by the exported renderers; Invalid numeric IDs throw; callers must ensure each ID appears only once per document. The component still expects arrays/numbers with the documented shapes. It does not authenticate users, validate a server mutation, fetch jobs or persist saves.

```js
import { jobCard, offerURL } from './components/ui.js';
const saved = new Set();
const markup = jobCard(job, saved, offerURL(job.id, '', saved));
```

Use `innerHTML` only for renderer-generated markup, not arbitrary job descriptions or external HTML. Prefer textContent for status/error text. If rich content is added later, establish a separate sanitization and semantic-content boundary.

### State and controllers

- `.selected` and `aria-pressed` must agree for categories. Keep one active category in this source composition.
- Save controls keep a constant name and `aria-pressed`; use toast plus visible icon state for confirmation. For the icon-only card, the name includes the job title.
- `hidden` removes status, active-chip row or empty state when inactive. It is not a CSS-only offscreen trick for focusable controls.
- The listing controller holds saved IDs in memory and passes them in internal links. Share URLs omit them. No account/storage contract is established.
- The supplied `app.js` and `offer.js` are example page controllers tied to their documented IDs. They are not generic controllers to attach to a blank screen. Use them with their full HTML or write a scoped controller for a new composition.
- The source section navigation still highlights its first item statically. A new current-section model requires explicit semantics and tests.

## Extension rules

Reuse these classes and composition examples; add private page-layout classes as needed. Add a new public variant only for an actual new requirement, with anatomy, states, responsive behavior and tests. Do not encode a one-off exception as a universal token. Do not introduce dark mode, new status colors, multiple font families or a framework dependency as a silent default.
