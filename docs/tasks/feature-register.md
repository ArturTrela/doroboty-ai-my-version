# Product flows and functionality register

## Intent

Record the application's implemented flows, features, permissions, gates and limitations
in one maintained artifact. The user requested a persistent rule requiring future updates.

## Acceptance criteria

- Root `FEATURES.md` covers every current page/API route and candidate, employer,
  visitor and operator journeys, including starter/demo tooling.
- Stable IDs and explicit available/conditional/hidden/partial/tooling states distinguish
  current source behavior from roadmap, test execution and deployed behavior.
- Source/test links and known gaps make the register reviewable.
- `AGENTS.md` requires updates in the same change as affected behavior; README links it.
- Existing application behavior, database, dependencies and local user data are unchanged.

## Verification

- Repository-link validation passed: all 42 links in the register resolve locally.
- Route inventory review passed: all 30 current page/API route files are represented;
  the dynamic auth route is expanded into its supported modes. Metadata routes and
  not-found/error boundaries are documented separately.
- Prettier check passed for all four changed/added Markdown files; `git diff --check` passed.
- `./scripts/verify` passed: lint, 51 unit tests in 16 files, production build and TypeScript.
- Separate source/diff review corrected password-change wording: settings uses recovery,
  while email change verifies the current password. It also recorded actual pagination,
  expiry, manual-job coordinates and stage-telemetry gaps instead of roadmap assumptions.
- Browser/integration/deployment tests were not rerun: this is a documentation-only change.
  Coverage links describe existing test suites, not executions in this task. No database
  reset, dependency change or application behavior change was performed.
