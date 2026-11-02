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

Implemented and locally verified on codex/frontend-only. The user requested publishing all current work to main; actual integration state is recorded by Git history and the pull request. Deployment is not part of this verification.

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

Follow-up verification: Node 24.22.2 ./scripts/verify passed with 26 unit tests and 12 browser journeys. The new regression reproduces a short approved answer, checks inline error/focus and preserved source notes, then verifies missing-approval feedback and successful submission after correction. A separate source review confirmed the minimum is shared with model validation, the submit action remains enabled, and invalid attempts do not call the state mutation. No services or runtime requests were added.

## Follow-up: light-only interface

Remove dark/system appearance selection, its state/action and dark token overrides. Always use the existing light theme, including under a dark OS preference. Continue accepting earlier saved/imported scenarios with the obsolete theme field without losing domain data; omit that field from new state/exports. Update SYS-01/SYS-05 and verify existing behavior plus dark-system/legacy-save compatibility.

Light-only verification: ./scripts/verify passed in Node 24.22.2 (27 unit tests, 13 browser journeys). Checked dark OS preference, a pre-existing dark scenario with preserved profile data, removal of the obsolete theme field on the next save, absence of the appearance selector and the mobile settings render. Separate diff review confirmed that dark token overrides, the shared-button dark variant and the theme action/state were removed; SYS-01/SYS-05 and related settings entries were updated.

## Follow-up: restore original public screen composition

The frontend migration changed public view markup beyond the authorized runtime/data replacement. Restore the original public job detail (cf5dcd8), including its constrained hero/summary, two-column description/facts layout and application actions below the description. Restore the shared public header/footer and the existing job list/company compositions from the same source. Adapt only routing, local actions, persona selection and the deliberately offline map. Keep the light-only theme and preserve stored data. Fix the prototype section's CSS layer so utility max-width overrides work on other constrained screens. Verify layout geometry on desktop/mobile, navigation, save/apply and all existing journeys; update PUB-02/03/06/07/10 and record the affected remaining differences honestly.

Public-composition verification: Node 24.22.2 ./scripts/verify passed (27 unit tests, 15 browser journeys). Reviewed desktop/mobile job screenshots, desktop company/list renders and shared navigation. Layout checks confirm the original 1024px hero limit, a desktop facts column to the right of the description, actions below the description, and no overflow at 320/375/640/768/1024px. Full application/save/review, data-recovery and light-only regressions still pass.

Separate source/diff review compared the restored public compositions against cf5dcd8. Removed Next-only prefetch flags and server/auth/analytics hooks; retained local actions, hash links, audience-aware person selection, offline map, immutable submitted-record links and the user's light-only preference. PUB-02/03/06/07/10 were updated. Other workspace screens were not represented as visually identical to the original server application in this public-screen correction.

## Integration request

The user requested committing all current repository changes and merging into main. Pre-integration review found origin/main f062060 differs from the migration base only by changing the retired Next.js section heading from H1 to H2 in AGENTS.md. Resolve that against the authorized frontend-only agent instructions, rerun ./scripts/verify after integration, and publish through the task branch. The final UI/data/register changes were separately reviewed and all current working-tree changes are included.
