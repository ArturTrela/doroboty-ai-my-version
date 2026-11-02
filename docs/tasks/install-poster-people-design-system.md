# Install the accepted Poster People design system

Created: 2026-11-02
Branch: codex/install-poster-people-design-system

## Intent

Wojtek requested the complete accepted agent materials inside doroboty-ai-prototyp, explicit AGENTS.md/README.md/CLAUDE.md instructions to build from them, and removal of the previous Graphical guidance. Install guidance and reference assets without converting the running interface in this task.

## Acceptance criteria

- [x] All 67 original agent-kit files are present, byte-identical, including examples, CSS/JS, font/license, illustration, human reference and evidence.
- [x] AGENTS.md, README.md and CLAUDE.md require the system and link to a concrete React/Base UI integration guide.
- [x] Conflicting active theme instructions and the old gui/ reference tree are removed; GUI.md points to the accepted system.
- [x] The guide explains reading order, source precedence, host integration, routes/state, assets, commands, states and verification without relying on another chat or a home-directory skill.
- [x] Participant packaging includes the design system and excludes instructor sources/history.
- [x] The kit integrity/examples checks and ./scripts/verify run, with actual results recorded.
- [x] A separate review pass checks links, source boundaries, old-theme references and the diff.

## Behavior register review

Application flows, routes, storage, data and rendered styles are unchanged. FEATURES.md is reviewed; OPS-09 and SYS-06 reflect distribution/check tooling changes, and SYS-01 wording describes the current implementation without mandating the removed theme.

## Validation and review

Executed with Node 24.20.0:

- `./scripts/verify`: passed formatting, design-system integrity/example checks, ESLint, TypeScript, 27 application unit tests, baseline packet validation, static build and 19 Chromium E2E tests. The six additional kit tests passed; all 67 source file hashes matched and 333 kit-local references resolved.
- `npm run package:participant -- /private/tmp/doroboty-design-system-participant.VezAW7`: passed. The copied package passed `npm run design-system:check` without dependency installation and the pristine participant manifest/baseline verification. It contains all reference files and excludes the removed gui/ tree, instructor sources and Git history.
- Link review: 55 local links in AGENTS/CLAUDE/README/GUI/BRIEF/architecture/font/integration documentation resolve. The kit has its separate 333-reference check.
- `git diff --check`: passed. No application runtime source, root token definitions, dependencies or lockfile were changed. Browser/UI source behavior is covered by the existing E2E suite; no new visual conversion is claimed.

Separate review pass after implementation checked source precedence, React/Base UI integration instructions, unchanged kit hashes, command/port separation, packaging inclusion, FEATURES.md tooling entries and removal of conflicting active guides. Fixed README wording to avoid implying that local edits were already committed. No unresolved findings.

The previous gui/ reference tree (ten files) and active theme-skill pointers were removed per Wojtek's explicit follow-up. Current token names and asset provenance remain runtime implementation facts rather than visual instructions. No project-local skill directory existed; packaging no longer attempts to distribute it.

The successful build emitted non-blocking upstream Zod comment-annotation and chunk-size warnings. No test or verification gate failed. Publishing, remote push and visual adoption of the running app were outside this material-installation task.
