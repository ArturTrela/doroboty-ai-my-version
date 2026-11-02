# DoRoboty.ai AIPH3 — Frontend Prototype Brief

## Product

A forkable, frontend-only recruitment prototype for non-technical AIPH3 participants working with coding agents. This is separate from the public DoRoboty.ai production site.

## Primary outcome

A participant can start with Node.js 24 and npm, extend the interface and test a coherent job → candidate application → employer decision workflow without provisioning services.

## Behavior

- Preserve Polish product UI, Build / Apply / Lead taxonomy, Graphical tokens, local fonts and shared Base UI controls.
- Use prepared personas instead of real accounts. Candidate and employer views share one browser-local scenario.
- Store initial data in JSON and changes in React state/localStorage. Provide reset, validated import/export and recovery guidance.
- Retain jobs, filters/list/map, companies, profiles, sample CVs, saved jobs, application drafts/submission and recruiting decisions.
- AI writing uses local templates, and Match Scores/summaries are fixed persona scenario values. Preserve source notes separately from approved text. These are UX demonstrations, not evidence of model quality or hiring probability.
- Keep submitted applications/CVs immutable while profiles and jobs evolve.
- Keep historical teaching evidence separate from locally created prototype records. The shipped stage is baseline only.

## Boundaries

No database, backend, credentials, environment setup, live authentication, real CV processing, cross-device synchronization or live product analytics. A shareable static build contains no secrets and provides no confidentiality between roles. Hosting is optional and provider-independent.

## Learning

Participants investigate user needs, choose a solution, change the prototype and test it with a real person. The historical case distinguishes completed applications and text-based proxy scores from recruiting outcomes. Synthetic evidence does not establish product effectiveness.

Previous requirements for database-backed work, live login, AI providers and analytics have been superseded by this frontend-only contract. Canonical original Polish materials in docs/source are historical instructor references, not setup instructions or participant package content.

## Success

Fresh checkout: npm ci → npm run dev. A complete workflow survives reload. No external runtime requests. Hash deep links work on static hosting. Import/reset/recovery and role/person-specific views behave consistently. ./scripts/verify passes and separate review finds no active infrastructure setup instructions.
