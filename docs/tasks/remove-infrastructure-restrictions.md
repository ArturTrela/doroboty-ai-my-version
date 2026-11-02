# Remove infrastructure restrictions

## Intent

Remove the blanket frontend-only, no-backend and no-provider restrictions from active repository guidance. The user requested deletion of these rules without adding a replacement contract.

The user also requested removing the mandatory task branch/worktree rule and merging these documentation changes into main.

## Acceptance criteria

- Active agent and product guidance no longer prohibits backend, API routes, environment configuration or external AI calls.
- Preserve synthetic data, human approval, frontend secret protection and historical evidence boundaries.
- Keep descriptions of the current local implementation and simulated AI accurate; do not claim new functionality.
- Review FEATURES.md and run ./scripts/verify. Record actual results and a separate diff review.

## Validation

- ./scripts/verify passed formatting, lint, types, 27 unit tests, baseline packet validation and the static build. Its browser stage initially could not bind 127.0.0.1:3106 in the sandbox (EPERM).
- Reran npm run test:e2e with permission to start the local server: all 19 Chromium journeys passed, including mobile/desktop, keyboard, recovery and existing network-independence checks.
- Checks ran with the available Node.js 25.9.0 and npm 11.12.1; Node.js 24 was not separately verified. Build emitted Zod annotation and bundle-size warnings.
- FEATURES.md reviewed: no runtime behavior changed. Removed prospective frontend-only wording and clarified that its limits describe the current implementation.
- Separate review of the completed diff and active guidance found no remaining blanket backend/API/provider prohibition. Existing implementation descriptions, historical migration records and browser assertions remain accurate. git diff --check passed.
- Repeated validation after removing the mandatory task branch/worktree rule: formatting, lint, types, 27 unit tests, packet validation and build passed; all 19 browser journeys passed when rerun with local-server permission after the same sandbox EPERM.
- Integration scope is limited to these documentation changes. The separate design-audit task note is excluded. No remote publishing is requested.
