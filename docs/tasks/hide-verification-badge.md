# Hide job verification badges

Wojtek requested temporarily hiding the verification badge everywhere in the app
because stored fixture statuses do not represent an operating verification process.

Acceptance criteria:

- Remove verification badge rendering from the shared job card, role detail and
  candidate application context, covering all consumers of the shared card.
- Preserve stored statuses, types, queries, taxonomy badges and unrelated hiring
  stage icons/actions. No schema or data mutation.
- Follow the existing Graphical theme without introducing styles or controls.
- Run the verifier and review public/mobile and candidate-context output. Perform
  a separate review and update FEATURES.md with actual verification results.

## Verification and separate review

- `./scripts/verify` passed: ESLint, 122 unit tests, TypeScript and production build.
- All 19 public/demo browser tests passed, including accessibility and reflow.
- Checked the running local homepage, job listing, company page, verified-role
  detail and authenticated candidate application context at 1440px and 390px.
  No verification badge appeared and no horizontal overflow was found. Role
  screenshots are saved under ignored artifacts/.
- A source search found no remaining verification-status display conditions or
  verified-job labels in the UI. Stored status fields, fixture values and query
  mappings remain. Unrelated hiring-stage icons/review flows were preserved.
- Separate review confirmed the bounded JSX/import removal, no placeholder gap,
  no new styles/tokens/dependencies, and no schema/data changes. The project
  graphical-ui guidance was followed. FEATURES.md was updated, and only the
  scoped changes were applied to the active checkout. No deployment was claimed.
