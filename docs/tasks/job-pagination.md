# Job listing pagination

## Intent and acceptance

- Show 20 roles per list page with total result count, displayed range, previous/next
  links and compact page numbers. Hide navigation when there is at most one page.
- Render links and page content on the server so navigation works without JavaScript.
- Preserve validated filters in page links; new filter submissions start at page one.
- Clamp unavailable pages and redirect to the valid URL; empty results remain useful.
- Keep map mode unpaginated and reset page on list/map changes, preserving filters.
- Use stable newest-first ordering with an ID tie-breaker; avoid altering sitemap,
  company pages, saved-job behavior, or course fixtures.
- Reuse existing Graphical shared controls/tokens in both modes, with keyboard/current/
  disabled states and a mobile layout without horizontal overflow.
- Update FEATURES.md and automated coverage. Verify against the local expanded dataset
  without resetting the user's database.

## Implementation boundary

Pagination slices the filtered result set on the server, not in the browser. Existing
database reads still load the published dataset within Supabase's configured row limit;
database-level pagination is a separate scaling improvement, not claimed here.

## Results and separate review

- Final Node 24 `./scripts/verify` passed: lint, 57 unit tests in 17 files, TypeScript
  and production build. Formatting and `git diff --check` passed.
- Public/demo E2E: 18 tests passed, including small/empty result pagination and redirect
  handling. Final isolated local integration suite: all 26 tests passed, including all
  six pages, no duplicate/missing roles, filter retention/reset, page 999 clamping,
  unpaginated map, keyboard navigation, no-JavaScript navigation and candidate submission.
- Active local database remained untouched. Browser verification found 20 rows on page 2,
  range 21–40 of 106, a disjoint next page, and page 999 redirecting to page 6. The
  engineering filter's last page had one result and remained navigable without JavaScript.
- Automated WCAG A/AA and overflow checks passed at 320, 390 and 1280 widths in light/dark.
  Pagination screenshots at 320 and 1280 were visually inspected; existing Graphical
  button variants, font, spacing, focus and mode tokens are reused without new assets,
  dependencies, theme values or global-style changes. Final local navigation scrolls
  to the top and the last page disables Next.
- Separate source review expanded the old arbitrary page-100 parser cap to safe integers,
  confirmed sitemap/company/map readers remain unpaginated, and disabled speculative
  prefetch on page links. Shared pretty-wrapping and local font aliases already exist.
- Next logged destination-stream cancellation errors during rapid integration navigation;
  all assertions passed. This task does not claim a warning-free CI/deployment or resolve
  the previously known Lighthouse release gate. Database-level paging remains deferred.
