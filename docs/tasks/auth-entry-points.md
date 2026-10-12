# Role-aware authentication entry points

## Intent and acceptance

- Public employer and candidate links identify the intended workspace.
- Authenticate credentials first, then check the stored profile role. Never infer privileges
  from the login URL, email, or user-supplied metadata.
- A mismatched account stays on the login screen with a clear explanation and an explicit
  local-session account-switch action; no silent fallback to the candidate dashboard.
- Existing mismatched sessions receive the same recovery path. Correct existing sessions
  enter the intended workspace. Operator access to employer screens remains supported.
- Employer login does not offer candidate registration; existing operator-provisioned employer
  accounts remain the supported employer onboarding mechanism. No signup/role migration is in scope.
- Preserve candidate job return paths and generic login for case operators/legacy callers.
- Verify role routing, both mismatch directions, account switching, matching sessions,
  candidate signup links, password-recovery context, and server authorization independently.

## Verification

- `./scripts/verify`: lint, 51 unit tests, TypeScript validation and production build passed.
- `npm run test:e2e`: all 17 public/demo browser tests passed.
- `npm run db:start`, `npm run test:integration`, `npm run db:stop`: tests ran against the
  separate `doroboty-auth-entry-tests` project on ports 56320–56324, not the developer's live
  database. All 25 integration tests passed, including both role mismatch directions, invalid
  credentials, existing sessions, account switching by keyboard, recovery links, registration
  boundaries, candidate job return paths, and existing cross-account/RLS checks.
- Both mismatch screens passed overflow and automated WCAG A/AA checks at 390px and 1280px
  in light and dark modes. Desktop light and mobile dark employer states were visually reviewed.
- The main local development server returned HTTP 200. The actual existing candidate browser
  session showed the employer mismatch message without being signed out or changed.
- Formatting and `git diff --check` passed. No database schema, dependency or theme-token changes.

## Separate review

Role checks continue to use stored profiles on the server and RLS; audience query parameters
only select the login experience. Proxy overwrites its internal return-path header, forwards it
only upstream, and preserves refreshed cookies. Return paths reject external URLs and auth-page
loops. Employer registration cannot silently create a candidate. Changing accounts is explicit
and signs out only the current session, clearing entered credentials. Operator employer access
and generic case login are preserved.

The known listing Lighthouse performance release gate (87/100 versus 90 required on GitHub)
is outside this authentication fix. This report does not claim deployment or merge completion.
