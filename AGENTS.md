# Working on DoRoboty.ai Case

This is a frontend-only AIPH3 teaching prototype, separate from the public production portal.
Read BRIEF.md, docs/case/CASE_PROTOCOL.md, TODO.md and relevant FEATURES.md entries before product work.

## Start and boundaries

- The only participant setup is Node.js 24, npm ci, npm run dev (http://127.0.0.1:3001).
- Do not install system services, Docker, database software, CLIs or a backend without an explicit user request. Missing tooling is a reason to explain the requirement, never to provision it automatically.
- Do not add authentication services, API routes, environment files, cloud accounts, credentials or external runtime requests. Role selection is a simulation, not security.
- All domain data lives in committed JSON, React state and versioned localStorage. No SQL, IndexedDB, API mocks or ORM. Share plain Zod schemas between forms and local operations.
- AI text, Match Scores and summaries are scenario simulations. Preserve human editing and approval; do not imply that they assess arbitrary CVs. Use synthetic data only.
- Keep historical case evidence separate from prototype state. Include only baseline in participant packages; source history and instructor materials must not be distributed.

## Workflow

1. Record intent and acceptance criteria in docs/tasks/ for changes larger than one line.
2. Use a task branch/worktree. Do not let multiple agents write in one worktree.
3. Implement and run ./scripts/verify before claiming completion; explain actual failures.
4. Perform a separate review pass before merging. Record durable lessons when useful.

## Product behavior register

FEATURES.md describes current behavior, not a roadmap. Update it in the same change/commit for added, changed, removed or simulated flows. Preserve stable IDs, route/role/data boundaries and source/test references. Do not equate source coverage with an executed test or deployment. For changes without behavioral impact, record that the register was reviewed and did not need updating.

## Standards

- Code, comments and authored engineering documentation are English; end-user UI and canonical AIPH source wording are Polish.
- Use npm, Node.js 24 and package-lock.json. No second package manager.
- Features belong in src/features; src/components/ui contains shared Base UI primitives.
- For UI changes follow GUI.md and graphical-ui, graphical-convert or graphical-audit as appropriate. Preserve the active tokens, local font, Base UI components and render composition API.
- Use React Router hash routes. The production output is static assets, without a runtime server.
- Never log private free text or introduce secrets into the frontend.

## Validation

- npm run check verifies formatting, lint, types, unit tests, static build and browser journeys. ./scripts/verify runs the same gate.
- npm run dev never installs browser binaries or system tools. Browser tests require a provisioned Playwright Chromium; if missing, report it. Do not install OS dependencies automatically.
- Check mobile/desktop, keyboard access, error states, data recovery and external-network independence.
- Report what actually ran. Local checks do not prove CI, publishing or human approval.
