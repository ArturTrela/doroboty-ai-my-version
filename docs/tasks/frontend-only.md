# Frontend-only participant application

## Intent

Replace the server application with one React/Vite frontend. Participants need only Node and npm; agents must never provision system services. Preserve the current Graphical theme and a coherent candidate/employer workflow.

## Acceptance criteria

- JSON fixtures, React state, versioned localStorage; no database, API, credentials or external runtime requests.
- Role selection, profile/CV sample, saved jobs, job publishing, application submission and employer decisions share local state and survive reload.
- Hash deep links, reset, validated import/export, unavailable storage and incompatible saves are handled.
- AI and Match Scores are scenario simulations; no real CV processing.
- Participant evidence contains only baseline; no future-release source, history or generator in the distributed packet.
- Update FEATURES.md with stable IDs and review agent/setup instructions.
- Run ./scripts/verify, browser journeys, responsive/keyboard review and a separate final review pass.

## Status

Implemented on codex/frontend-only. No merge, commit, push or deployment performed.

## Verification

- Node.js 24.22.2: ./scripts/verify passed formatting, lint, types, 26 unit tests, baseline packet validation, production build and 11 Chromium journeys.
- Browser journeys exercise published role → candidate draft/approval/submission → employer review/conversation/continuation → candidate history, reload, duplicate prevention, role/organization views, withdrawal, profile snapshots, import/reset confirmation, incompatible saves and denied persistence.
- No external runtime requests or browser errors were observed in the full workflow/map checks. Axe checks reported no WCAG A/AA violations on job filters and candidate profile.
- Screenshots reviewed: desktop home/application detail, mobile profile and dark settings at 375px, job filters/list at 320px. No horizontal overflow detected in checked mobile layouts.
- Production npm audit: zero vulnerabilities. Development tool advisories remain outside this production result; no blanket audit-fix was applied.
- A baseline participant source package was built outside the repository and its fresh npm ci/build passed. The final reviewed package also passed standard npm ci (without --ignore-scripts) and the complete npm run check under Node 24.22.2: 26 unit tests, 11 browser journeys, formatting/lint/types, baseline verification and static build. It contains no .env, .git or instructor source directory.

## Separate review pass

Reviewed the migration diff, local state/transition boundaries, register IDs, agent/startup guidance, source distribution and browser evidence after implementation.

Resolved findings: overlapping map markers now group by location; packet fingerprint checks apply to pristine distribution only so participant edits/build artifacts remain valid; malformed empty event histories no longer throw inside schema refinement; sample CV download uses the selected persona; imports reject invalid references/duplicate pairs/transitions; job edits preserve salary metadata and submitted snapshots. Retained the existing four-color Match Score palette.

FEATURES.md was updated for all changed/removed/simulated flows, with original IDs retained and the pre-existing duplicate EMP-10 explicitly consolidated. Active setup no longer requests database/services. Original Polish instructor documents stay under docs/source and are excluded, along with Git history, from the allowlisted participant package.

## Limits

AI and scores simulate scenarios; personas share browser data rather than provide security. No cross-tab/device synchronization or binary CV storage. A shared URL does not transfer local changes. CI/deployment, GitHub required-check rules and human course release approval were not modified or verified remotely. The build emits advisory bundle-size/Zod annotation warnings; its static output and behavior checks pass.

## Follow-up: application validation

The application editor silently disabled submission for answers shorter than 20 characters, even after approval. Keep the existing minimum, display it beside the field, and let submission explain invalid input rather than present an unexplained disabled action. Focus the first invalid control, preserve entered content, and verify recovery from both a short answer and missing approval. Update CAN-09/CAN-13 and run the project gate.
