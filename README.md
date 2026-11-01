# DoRoboty.ai — AIPH3 case application

DoRoboty.ai is the prepared spanning-case application for AI Product Heroes 3. It is a
separate teaching environment built from
[Superstarter](https://github.com/superhero-tech/superstarter), not the public
DoRoboty.ai production portal.

Participants use the same product story across the program: diagnose why more job
applications do not create more useful recruiting conversations, prototype AI writing
assistance, measure the result, and discover when polished text stops carrying the
signals needed for a hiring decision.

## Start here

1. Read [`BRIEF.md`](BRIEF.md).
2. Read [`docs/case/CASE_PROTOCOL.md`](docs/case/CASE_PROTOCOL.md).
3. Follow the sprint order in [`TODO.md`](TODO.md).
4. Use the preserved source material under [`docs/source/`](docs/source/).

The current flows, features, permissions, and known gaps are registered in
[`FEATURES.md`](FEATURES.md). Keep it updated with every behavior change, as required by
[`AGENTS.md`](AGENTS.md).

## Local development

Requirements: Node.js 24 and npm.

```sh
npm ci
npm run dev
```

The public marketplace works with deterministic fixtures when Supabase is absent. Authenticated candidate, employer, AI, and instructor workflows require Supabase and never silently fall back after it is configured. See the [participant guide](docs/PARTICIPANT_GUIDE.md) and [Supabase runbook](docs/supabase.md).

To start the canonical local database, apply pending migrations, prepare test accounts
and configure `.env.local` without deleting existing data, run:

```sh
npm run db:setup
npm run dev
```

Use `candidate@doroboty.local` or `employer@doroboty.local` with password
`dupadupa8` (local test accounts only). The application runs at
`http://127.0.0.1:3001`, Supabase API at `http://127.0.0.1:58321`, and Studio at
`http://127.0.0.1:58323`. The only development configuration is the tracked
`supabase/config.toml`, for project `doroboty-ai-local`. `db:setup` is safe to rerun:
it preserves data and AI settings, and keeps the fixture passwords consistent.
`npm run dev` rejects a connection to another database.

`npm run test:integration` creates and removes its own disposable database and build.
It does not reset the development database or rewrite `.env.local`.

## Verification

```sh
./scripts/verify
```

The project uses the agentic harness documented in [`AGENTS.md`](AGENTS.md).

The instructor release model, synthetic data dictionary, discovery packet, real-person test, pilot, and Demo Day runbooks are under [`docs/case/`](docs/case/).
