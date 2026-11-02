# Resolve pull conflicts

## Intent

Finish the interrupted pull merge on main without losing the local removal of
infrastructure/task-branch restrictions or the incoming Poster People integration.

## Acceptance criteria

- Resolve AGENTS.md, CLAUDE.md and FEATURES.md semantically, preserving both intents.
- Keep incoming product code, design-system guidance and immutable kit unchanged.
- Preserve stable behavior-register IDs and incoming behavior descriptions, with
  local wording that permits future extensions and describes current limits.
- Run ./scripts/verify, perform a separate review and record actual results before
  completing the merge. Do not push remote changes as part of this repair.

## Validation

- Resolved the three documentation conflicts. FEATURES.md was reviewed: all 70
  behavior IDs and incoming descriptions are preserved, except the two intentional
  local wording changes for future extensions and current infrastructure limits.
  This conflict repair introduces no additional runtime behavior.
- ./scripts/verify ran with the existing Node.js 24.22.2 binary. Formatting, 67
  immutable kit hashes, six kit tests, lint, types, 27 unit tests, baseline packet
  validation and static build passed. The browser stage initially failed because
  the sandbox denied binding 127.0.0.1:3106 (EPERM).
- Reran npm run test:e2e with local-server permission: all 34 Chromium journeys
  passed, including desktop/mobile, keyboard, recovery and application snapshots.
  Existing Zod annotation and bundle-size build warnings remain nonblocking.
- Separate review compared the resolved tree with both merge parents: the incoming
  source, tests, dependency files and design-system kit are unchanged; the local
  removal of infrastructure and task-branch restrictions survives. Conflict-marker
  scan and authored diff whitespace checks passed. The imported immutable kit is
  excluded from whitespace edits, as recorded in its integration review.
