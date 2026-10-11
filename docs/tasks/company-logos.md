# Synthetic company logos

## Intent and acceptance

Generate original marks for the 25 fictional companies in the optional 100-job
marketplace fixture. Use one built-in imagegen call per asset (logo-brand); do not
use a contact sheet as the deliverable. Save transparent originals in
`public/company-logos/<company-slug>-v1.png` and preserve existing assets.

- All 25 companies have their own identifiable mark.
- Shared job cards, company pages and role details show the mark.
- Explicit company logo URLs take precedence; unrelated companies keep initials.
- Broken image URLs fall back to initials with JavaScript; names remain visible
  and usable without JavaScript. Reserved dimensions prevent layout shifts.
- Local originals use Next.js image optimization. No dependency or database changes.
- Review mobile/desktop and light/dark, image delivery, fallback and existing links.
- Update the functionality register and run the project verification policy.

## Prompt set

Generation mode: built-in imagegen, transparent background. The exact prompt set
is recorded in `docs/assets/company-logo-prompts.json`. These marks are synthetic
fixture artwork, not imported official company identities or a trademark clearance.

## Verification and review

- Saved all 25 built-in imagegen outputs, one call per company, as RGBA PNGs in
  `public/company-logos/`. Browser pixel inspection confirmed transparent regions
  and visible artwork for every asset. A review-only light/dark comparison is saved
  in `docs/assets/company-logos-preview.png`; it is not the delivered asset atlas.
- Final Node 24 `./scripts/verify` passed in an isolated source copy: lint, 61 unit
  tests in 18 files, TypeScript and production build. Formatting and diff checks
  passed. Public/demo browser coverage, including optimized delivery of all 25
  PNGs as smaller WebP responses, passed (19 tests).
- Against the active local database, all 20 first-page marks loaded at 390 and
  1280 widths in both modes. No horizontal overflow or WCAG A/AA violations in
  those four states. Visually reviewed the complete 25-mark light/dark comparison,
  desktop list and mobile cards. Company page has one header logo plus four roles;
  server HTML retains these five images without JavaScript. Forced image failures
  switched to initials and role/company navigation remained usable.
- Separate source review kept neutral surfaces, existing Graphical radii and
  named spacing/typography; no theme values, dependencies or lockfiles changed.
  The server wrapper sends only image URL, dimensions and initials to the client
  fallback, not repeated full company descriptions. Existing logo URLs win over
  defaults; no database records or credentials were modified. Logo-upload UI and
  map marker conversion are outside this task. Map initials remain legible labels.
- An unfiltered axe run also flagged the existing list heading-order best-practice
  warning (page H1 to job H3). This is not caused by logos and remains outside this
  asset task; the reported zero violations refers to the project's WCAG A/AA tags.
  This work does not claim a deployment or resolve the earlier Lighthouse gate.
