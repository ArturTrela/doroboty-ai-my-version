# Prevent design-system integration regressions

## Intent

Update active project design-system guidance with the lessons of A01–A08 and R01–R04, as requested by Wojtek. Keep the original v1 kit immutable; make host implementation and acceptance rules discoverable without reading old chats or task reports. Continue on the existing branch.

## Acceptance

- Active guidance covers composition, minimal component reuse, routes/state/focus, actual responsive type roles and evidence-based completion.
- Remove stale installation-only statements and prevent the deferred proposal from acting as current requirements.
- Link a concrete implementation map and verification checklist from existing required entry points.
- Clearly distinguish source requirements, host adaptations, actual checks and human acceptance.
- Validate links, kit integrity and ./scripts/verify; perform a separate documentation review.

## Behavior register

FEATURES.md was reviewed. This task changes engineering guidance only; no product behavior or register update is needed.

## Validation

Executed with Node 24.20.0:

- `./scripts/verify`: passed formatting, kit inventory/hash integrity, six source-kit tests, lint, TypeScript, 27 unit tests, baseline packet, static build and 26 Chromium journeys.
- Checked 92 relative links in the updated entry points and new guidance; no unresolved destinations.
- `git diff --check`: passed. The immutable v1 kit retains all 67 file hashes and its 333 local reference checks pass.
- Reviewed source component/listing/offer declarations against the new breakpoint table and verified local host paths. No new runtime/test implementation was needed for this documentation change. Existing non-blocking Zod annotation and bundle-size warnings remain.

## Separate documentation review

Re-read active entry points and companion guides as an agent's reading path. Checked that canonical anatomy, reusable owners, URL/state/focus examples, breakpoint distinctions and evidence requirements are concrete and consistent. Removed installation-only statements from README/GUI/CLAUDE, distinguished bundled asset resolution from prohibited standalone code imports, and replaced the obsolete proposal's active-looking table with a superseded historical note. The guidance now points to current regression examples without claiming they ran in future tasks or that counts prove visual acceptance.

A01–A08 and R01–R04 are covered by implementation/acceptance rules. Host single-value facets, existing data/roles/storage and available content remain explicit exceptions rather than silently copied source features. These are receiving-project documentation updates authorized by the current request, not an automatic v1.1 kit release or blanket design approval.

Work remains on `codex/install-poster-people-design-system`. No app behavior, immutable reference, dependencies, deployment or Notion entry changed.
