# Poster People implementation audit

Date: 2026-11-02. Status: **Fails design-system acceptance. Application unchanged by this audit.**

## Intent and acceptance criteria

Audit the previous redesign against the approved project integration guide, immutable agent kit, component API and human reference. Distinguish documented requirements, legitimate host adaptations and unapproved design changes. Record reproducible defects and corrective acceptance criteria without changing application code or approving the proposed 1.1 release.

## Method and evidence

Read `docs/design-system/README.md`, `agent-kit/design.md`, `agent-kit/components/API.md`, the relevant C01/C07/C09/C11/C14–C22 human-reference sections, source CSS/HTML and current React/CSS. Captured current reference and application listing/offer at 1280, 850 and 390 CSS px in isolated Chromium (12 full-page captures), plus the application mobile filter dialog. Loaded local Geist before measurement. Reproduced the search reset defect with actual UI interactions. Raw measurements and screenshots are in ignored `artifacts/design-system-audit/`; `measurements.json` includes the reset result.

The reference uses 24 jobs; the application uses its six existing jobs and real local submission simulation. Those data/behavior differences are required host boundaries, not visual defects. Different title lengths mean card heights alone cannot establish a spacing defect. Findings below use measured styles, anatomy and interactions in addition to screenshots.

## Findings

### A01 · P1 · The listing composition was replaced instead of adapted

**Requirement:** `agent-kit/design.md:59–63`, API C05/C14/C15/C16, human reference C14–C16. Illustrated compact entry, visible search/location bar, category buttons, then desktop filters/results; mobile retains search/categories and moves the filter panel to a modal.

**Actual:** `src/features/prototype/marketplace.tsx:127–158`, `src/features/jobs/job-filters.tsx:43–109`, `src/app/poster-people.css:250–290`. No listing illustration, no category-button row, no search-location control. Search is placed inside the 245px desktop sidebar; the entire form moves into the mobile dialog. At 1280px the reference search is 1200px wide; the app search is 203px. At 390px no search exists in the visible page DOM until the dialog opens. The illustration added to the homepage does not satisfy the listing composition.

**Impact:** The primary screen looks and works like a different job board. Core search is hidden on mobile and the category hierarchy is lost.

**Correction acceptance:** Rebuild the page composition from C14–C16, retaining domain IDs, URL filters and local state. Keep unsupported host filters as explicitly mapped extensions; do not import reference fixtures or silently introduce incompatible multivalue domain semantics.

### A02 · P1 · Clearing filters leaves stale form values

**Requirement:** Project integration guide preservation of routes/state/current workflows; C17 recovery must restore a coherent state.

**Reproduction:** At desktop, enter `Product`, submit Search, then click `Wyczyść`. The address becomes `/#/oferty` and the results reset, but the textbox still contains `Product`. Confirmed in `measurements.json`: `reset.query = "Product"`.

**Cause:** The redesign removed the `JobFiltersForm` key at `marketplace.tsx:158`. The form still uses `defaultValue` (`job-filters.tsx:60`) and FormSelect stores its initial default in internal state (`src/components/ui/form-select.tsx`). No replacement form key or controlled synchronization was implemented. The previous task report incorrectly says that only the form is keyed; the current source has no such key.

**Correction acceptance:** URL changes/reset/back-forward update all displayed field values, while mobile submit/Escape still restore focus. Test both properties together, not focus in isolation.

### A03 · P1 · Salary loses the documented information hierarchy

**Requirement:** Human reference C07 (`reference/components.md:636`) and C21 (`:1500–1532`). Desktop card salary 15px; offer salary 24px desktop / 25px mobile. The offer panel starts with salary, then conditions and actions; the mobile conditions use two columns.

**Actual:** `marketplace.tsx:264–295` puts salary last in a generic definition list. Runtime offer salary is 13px at both 1280 and 390px. Card salary is also 13px at desktop (`poster-people.css:521–524`). `formatSalary()` places currency, gross/net and period inside the pink pill, making it wrap; the source separates the amount from supporting basis/period text. The mobile offer retains a long one-column facts stack.

**Impact:** A principal job-comparison fact is visually demoted. On mobile, the current first card salary pill is 52px tall versus approximately 26px in the reference; this is supported by different text anatomy and line-height, not a claim that differing fixture text must have equal dimensions.

**Correction acceptance:** Use a shared SalaryFact anatomy with amount and supporting conditions, exact documented type roles and explicit missing-data rendering. Use C21's pay-first and responsive terms layout.

### A04 · P2 · Offer header and page composition remain incomplete

**Requirement:** API C13/C20–C22, human reference C20–C22, `design.md:65–69`. Identity precedes the H1; core facts and skill row belong to the header. Offer composition includes employer context and related cards.

**Actual:** `marketplace.tsx:231–255` renders back link, category, title, then company and summary. Core facts exist only in the sidebar; the header has no skill row. No on-page section navigation, employer block or related offers are rendered by JobPage. Existing plain job descriptions must not be replaced by invented benefits/process content, but available company data and related jobs can be composed without doing that.

**Correction acceptance:** Port documented visual anatomy using actual available data. Keep the application workflow and company route. Document optional source affordances (for example share) and unavailable structured content instead of silently treating them as implemented.

### A05 · P2 · Responsive typography and geometry only partially match

**Requirement:** Exact documented breakpoints and type roles, `reference/components.md:147–170`, C09/C21/C22.

| Role                       | Reference measured  | Application measured |
| -------------------------- | ------------------- | -------------------- |
| Offer H1 at 850px          | 46px                | 54px                 |
| Card title at 390px        | 26px / 29.38px line | 26px / 29.12px line  |
| Offer reading H2 at 1280px | 36px                | 32px                 |
| Offer reading H2 at 390px  | 33px                | 32px                 |
| Public wordmark at 1280px  | 28px                | 15px text            |

The card layout switches to mobile at 700px in the app (`poster-people.css:526`), versus 600px in the source; the 851–1100 card-title step is absent. Offer sidebar changes directly to 285px at 1100px rather than 310px then 285px. Heading letter spacing is globally generalized rather than preserving role-specific values.

**Correction acceptance:** Map role-specific styles and all intermediate breakpoints from source; compare 600/700/850/1100 boundaries rather than testing only document overflow.

### A06 · P2 · Mobile filters reuse the wrong dialog composition

**Requirement:** C18's mobile filter composition has its own scrolling body and persistent header/footer; C14 search remains outside that panel. Existing host filter submission semantics may be retained where required by the product contract.

**Actual:** `src/components/responsive-panel.tsx` wraps all controls and search in the generic centered info dialog. `poster-people.css:459–480` caps it at 580px and provides no dedicated sticky filter header/footer. Applying uses Search at the top; there is no bottom result action. Escape focus works after the previous fix, but that does not verify the intended mobile composition.

**Correction acceptance:** Reuse the Base UI Dialog interaction primitive with the C15/C18 filter-specific layout. Explicitly decide how the host's submit semantics map to the reference; the unapproved 1.1 proposal is not approval to redefine C15.

### A07 · P2 · Shared controls and CSS integration are inconsistent

**Requirement:** Source anatomy/variants, foundations/components/page separation, minimal reusable components; no competing styling authorities.

**Actual:** `src/components/ui/button.tsx:12–17` gives `ghost` exactly the same white outlined treatment as `outline`. This adds a full outlined button around card bookmarks unlike the source's quiet save control. Global unlayered rules in `poster-people.css` override existing utility/component declarations, including `!important` headings, universal focus styling and selectors tied to `:nth-child`, `:last-child` and utility class names. Multiple superseded card declarations remain in the file (`:160`, `:292`, `:313`, `:484`). Reference radii are broadly aliased into legacy slots, so small tags inherit pill treatments rather than their documented local anatomy.

**Impact:** Shared component count is low, but there is no single reliable style definition per reusable component. This makes cross-screen consistency and future changes fragile.

**Correction acceptance:** Give each shared primitive explicit variants; put component anatomy in one place and page geometry in named compositions. Remove superseded overrides and preserve documented local exceptions. Reusing React wrappers alone does not establish system consistency.

### A08 · P2 · Completion claims and proposed system update overstate the evidence

**Requirement:** Project integration guide `:81–87`: actual new screens must be compared against the reference; kit integrity is separate from application adoption.

**Actual:** The previous 76 captures checked many routes, no document overflow and no external requests. Those are useful regression checks but contain no enforced reference typography/anatomy comparison. `tests/e2e/prototype.spec.ts:455–485` asserts column ordering and deliberately expects no Senior fact in the hero (`:466`), although C20 includes core facts there. It does not verify C21 salary hierarchy or C14/C16 listing composition. The reset defect also escaped the new focus test. The previous final statement that the redesign was complete was too strong.

The 1.1 proposal mixes reasonable new workspace recipes with replacement behavior for an already documented filter family. It is unapproved and must not be used to justify A01/A06.

**Correction acceptance:** Reopen visual acceptance. Resolve documented reference mismatches before proposing new recipes; add targeted visual/anatomy and state-coherence checks. Keep the original task report as historical evidence and use this audit as its explicit qualification. Do not approve or revise the kit to normalize implementation defects.

## What does conform

Local Geist Serif Regular 400 headings and sans-serif body, paper/white/ink/pink roles, primary pink action with dark labels, rounded outlined cards, stable save accessible names with aria-pressed, use of Base UI/render composition, local routes/storage/data boundaries and immutable kit preservation. The offer has the correct broad desktop/sidebar and mobile conditions-before-reading order. These are partial successes, not full visual adoption.

## Unsupported screens

Workspace, profile, editor, applications and instructor views do not have exact reference screens in v1. Their extension was authorized by the user. Audit them against shared anatomy/roles and clearly label new recipes; do not invent pixel-exact v1 requirements for these pages. Their current use of shared tokens/panels is a foundation, but the CSS/variant issues in A07 affect them too.

## Recommended correction sequence

1. Fix state synchronization in A02 and protect it together with keyboard focus.
2. Rebuild the canonical listing and offer against the existing reference (A01/A03/A04/A05/A06), preserving host product behavior and data.
3. Consolidate shared styles/variants and apply them to all workspace consumers (A07).
4. Compare fresh paired screenshots and measurements, verify all flows, then propose only genuinely missing reusable recipes for acceptance (A08).

No application source, existing system proposal or approved reference was changed during this audit. No deployment, merge or full new functional-suite pass is claimed. Runtime evidence here is from the current isolated-browser comparison and reset reproduction.
