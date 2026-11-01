# Supabase

The public marketplace can run without Supabase or Docker by using deterministic fixtures. Authenticated case workflows require Supabase. Versioned migrations contain the domain model, RLS, experiment controls, AI provenance, and analysis view.

## Cloud project

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Enter the URL and publishable key from the Connect panel. A legacy anon key also works. **Never use a service_role or secret key.**
3. In Auth, set Site URL to the application URL. Add `/auth/callback` to Redirect URLs with its parameters: `/auth/callback?next=/app` and `/auth/callback?next=/auth/update-password`. For local development, use `http://127.0.0.1:3001` and the equivalent callback URLs.
4. For this synthetic teaching app, disable **Confirm email** under Auth → Providers → Email (`mailer_autoconfirm: true` in the Management API). Candidate email/password signup must immediately return a session without sending confirmation mail. The local equivalent is `[auth.email] enable_confirmations = false`. Changing this flag does not verify ownership of an email address; do not treat the address as verified evidence or use shared course accounts for real candidate data. Employer registration remains provisioned only.
5. Password recovery and email changes remain separate, email-based flows. Configure SMTP and the `recovery.html` template before relying on recovery delivery. The retained confirmation callback/template is compatibility support for forks that deliberately re-enable confirmation, not the default registration path. Our templates require RedirectTo with a next parameter; do not reuse them in other clients without it.
6. Restart `npm run dev` and open `/app`.

After signing in, candidates see profiles and applications, employers see jobs and their candidate inbox, and operators see release controls and case analysis. Incomplete configuration shows setup instructions without pretending authenticated data is available.

## Canonical local development

The tracked `supabase/config.toml` is the sole local database configuration:
`doroboty-ai-local`, API 58321, PostgreSQL 58322, Studio 58323, and Mailpit 58324.
The application and local auth callbacks use `http://127.0.0.1:3001`.
The retired project on 55321 and the duplicate `.vercel/local-supabase` workdir
must not be recreated.

Run `npm run db:setup`, then `npm run dev`. Setup starts the existing stack, applies
pending migrations and prepares local accounts without resetting data. It merges only
the local connection/site values into `.env.local`, preserving AI provider settings.
Existing fixture users receive the shared password `dupadupa8`; candidate/employer
addresses are in README.md. Existing profile content and uploaded CVs are preserved.
The development startup check rejects other Supabase endpoints; a missing configuration
still permits the standalone public fixture/demo mode without Docker.

`npm run db:stop` stops this stack with its normal backup behavior. `npm run db:reset`
is an explicit destructive operation against this canonical local database. Use it
only when deliberately discarding its contents, then run `npm run db:setup` again.
Normal startup and test commands never reset it.

## Refresh the six original public descriptions

Fresh seeds already include the expanded role-specific copy. For an existing local
database, preview with `node scripts/refresh-local-job-copy.ts`, then apply with
`node scripts/refresh-local-job-copy.ts --apply`. The command validates the canonical
local CLI target and Docker port, updates only exact known legacy or earlier authored
copies (using recorded SHA-256 fingerprints), appends
approved public versions and saves a public-copy snapshot under ignored `artifacts/`.
Edited or already-enriched roles are preserved. A job/company change after preflight
rolls back the transaction. It does not reset data, touch cloud projects or rewrite
private briefs and historical application snapshots.

## Local integration tests

Docker must be running. Install Chromium once and run:

```sh
npx playwright install chromium
npm run test:integration
```

The integration runner creates a unique temporary Supabase project on a free port range
and copies the application into an isolated build directory. It applies the current
migrations/seed and prepares fixture accounts there, uses deterministic AI, and exercises
login, applications, RLS, role boundaries and assistant flows through the test app on
port 3107. Emails go to that disposable local mailbox. It never uses the development
project's data, environment file or Next.js build output. Reports are copied back to
ignored local report directories. The temporary stack, volumes and workspace are removed
in cleanup. CI uses this same lifecycle without starting a second persistent development
stack.

## Optional local marketplace volume

With the local stack running, add 100 published synthetic jobs across 25 fictional
companies without resetting data:

```sh
npm run db:seed-marketplace
```

The command validates the local CLI database URL and Docker container/port, then applies
`supabase/marketplace-fixtures.sql` in one transaction. Stable reserved IDs and conflict
handling make reruns nonduplicating and preserve edits to existing records. A conflicting
slug fails the transaction rather than overwriting another record. Companies use reserved
`.invalid` websites; roles clearly identify themselves as fictional. All jobs include map
coordinates, an organization, a private source brief and an approved public text version.
No users or organization memberships are added. Existing employers therefore cannot manage
these companies; use an operator for authorized inspection, or explicitly provision an
employer for one company separately. Candidates can browse and apply normally.

This supplement is deliberately opt-in and is not included in `db:reset` or the canonical
six-job course seed. After an intentional local reset, run it again if needed. It does not
alter staged synthetic learning datasets. `npm run db:check` checks the supplement's
relationships, variety, rerun preservation and access boundaries against the migrated schema.

## Domain deployment

Before deployment, run `npx supabase db push --dry-run` against the intended project, review every migration, and test RLS with candidate, employer, other-organization, operator, and anonymous sessions. Never use `db reset` against a remote or production project.

For an explicitly isolated rehearsal project, `npm run case:rehearsal-accounts` can create the
synthetic role accounts without email delivery. It requires the exact project ref, matching project
URL, a generated rehearsal password, a scoped `sb_secret_` key (or a verified legacy
`service_role` key when Auth Admin does not accept the scoped key), and
`CONFIRM_REMOTE_REHEARSAL=CREATE_SYNTHETIC_USERS_ONLY`. Supply these values only as process
environment variables from a secret manager. The command is idempotent, uses reserved `.invalid`
addresses, and never prints credentials. Never run it against a real-user or shared production
project.
