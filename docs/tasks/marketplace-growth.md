# Marketplace growth: map, self-serve jobs, and candidate CV

## Intent

Extend the teaching marketplace with complete local testing paths for both sides of the
marketplace while keeping the Untitled Graphical system consistent across public and
authenticated screens.

## Acceptance criteria

- Every interactive select uses the shared styled select component and remains keyboard
  accessible; the public filter form keeps a no-JavaScript fallback.
- One documented command starts and seeds local Supabase, creates rehearsal accounts, and
  configures the local Next.js app without exposing privileged keys.
- `/oferty` offers list and map views. The map uses an open, keyless basemap, fits available
  jobs, and exposes the same job links in an accessible side list.
- The DoRoboty.ai wordmark uses a recognisable robot mark in public, auth, and app shells.
- An authenticated employer can create a validated review-status job for only their own
  organization and can immediately see it in the company panel.
- A visitor can explicitly register as a candidate and, when local email confirmation is
  disabled, enters the candidate profile directly.
- A candidate can upload, replace, open, and remove one private PDF CV up to 5 MB. Database
  and Storage policies prevent access by another candidate.
- Database migrations, RLS integration coverage, unit tests, build, demo E2E, responsive UI
  review, and Graphical audit pass.

## Out of scope

- Geocoding arbitrary employer input, map clustering, and native mobile apps.
- Publishing employer-created jobs without an operator review.
- Parsing, scoring, or forwarding uploaded CV files.

## Verification record

- `npm run test:e2e`: 16 browser tests passed, including no-JavaScript filtering, the map,
  responsive layouts, keyboard behavior, and automated accessibility.
- `npm run test:integration`: 18 local Supabase tests passed, including two-account RLS,
  private Storage access, employer organization scoping, registration, and panel flows.
- `./scripts/verify`: lint, 43 unit tests, and production build passed.
- Graphical audit: the new surfaces use the Untitled shared controls and tokens. The supplied
  light cyan/white accent pair missed AA, so `--gui-accent-text-accessible` is the documented
  accessibility extension used for small cyan controls in light and dark modes.
- Manual review: public map, employer job form, styled select labels, robot mark, and candidate
  CV panel were inspected locally on desktop. Mobile overflow and core accessibility are
  covered by Playwright.

## Regression repair: MapLibre worker

- Next.js with Turbopack must receive MapLibre's separate v6 worker through an explicit
  `setWorkerUrl(new URL(..., import.meta.url))` call before a map is created.
- The map E2E fixture serves a minimal style document, waits for MapLibre's real `load` event,
  and fails when the browser reports a worker-load error.

## Regression repair: public filter alignment

- Filter icons align with the selected value row instead of the combined label-and-value block.
- The filter grid uses three balanced columns at medium desktop widths and switches to the
  five-filter single row only when the content area is wide enough.
- The clear action completes the last row at medium widths and retains a full-width position in
  the two-column layout.

## Public job-title navigation

- Job titles link to their detail route in the main results, map side list, and marker popup.
- Title links retain semantic headings, keyboard focus, and the existing Graphical link color on
  hover without removing the explicit `Zobacz rolę` actions.
