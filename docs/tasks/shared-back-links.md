# Consistent context return links

## Intent and acceptance

Unify contextual return links on offer detail, candidate application and employer process detail through one reusable BackLink. Follow source C13: 13px/12px sans text, ink, 17px decorative arrow, 9px gap, 36px minimum height, consistent underline/hover/focus. Retain actual hash destinations and use destination-appropriate labels. Align application entry spacing with offer detail. Leave C17 recovery CTAs as buttons rather than converting them to context links.

Remove superseded page-specific return-link styles so new screens cannot silently diverge. Update host guidance/FEATURES.md, run ./scripts/verify, check actual computed desktop/mobile states, keyboard activation and URL targets, and review the final patch. Keep the immutable kit unchanged.

## Validation

Added one BackLink component and shared host recipe. Migrated offer/list return, application/offer return and process/candidate return; removed their independent anchor/icon CSS and imports. The application page now shares the offer entry spacing. Labels identify the actual destination; unavailable-page recovery CTA remains separate. Updated host guidance and SYS-01.

`./scripts/verify` passed under Node 24: formatting, immutable 67-file kit/six reference tests, lint, types, 27 unit tests, packet, build and 30 Chromium journeys. Existing nonblocking build warnings remain.

Browser checks at 1280/390/320px confirmed identical source C13 metrics: font 13/12px, weight 400, ink text, 17px icon, 9px gap, 36px minimum height, pointer, pink hover and underline. Public return links align at y=108 desktop and y=90 mobile. Enter activation reaches the exact offer from application, the listing from offer and the candidate list from process detail. Checks wait for painted hover state and destination-specific link rendering before keyboard activation. Evidence: ignored `artifacts/back-links/checks.json` and desktop/mobile comparison captures.

Separate review: compared the two desktop hover captures and inspected the final source. Shared anatomy matches; only destination text/URL and surrounding page content differ. Superseded application/backlink/breadcrumb-anchor overrides are removed, native React Router links and keyboard/focus semantics are preserved, and the kit remains unchanged. `git diff --check` passes. No unresolved finding in scope.
