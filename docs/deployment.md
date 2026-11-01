# Deployment and maintenance

The repository contains configuration, but does not automatically create accounts, a Vercel project, or a remote database.

## GitHub

Publish the repository and set `main` as the default branch. After the first CI run, enable a ruleset requiring a pull request and the **Quality and demo** and **Supabase integration** checks. Rule availability depends on your plan and repository visibility. A workflow YAML file alone does not protect a branch.

CI runs without production secrets and uses the minimum `contents: read` permission. The second job runs its own Supabase instance on the runner. Playwright reports and traces are available as artifacts for 7 days. Dependencies are updated manually; automated Dependabot pull requests are disabled.

## Hybrid Match Score configuration

Apply all database migrations before deploying the new application. After migration,
copy the credential from `private.match_worker_config.secret` into the server-only
`MATCH_SCORE_WORKER_SECRET` environment setting using an authorized database console.
Do not expose the private schema through the Data API, add a NEXT_PUBLIC prefix, use
service-role credentials for normal application requests, or put the credential in logs.
Use a separate credential/database for each environment. Local `npm run db:setup`
installs the canonical local credential in ignored `.env.local` without printing it;
restart the development server if its environment has already been loaded.

The matching provider needs JSON-object output support. The current OpenAI-compatible
adapter requests it for criterion extraction and assessment. Deterministic mode produces
unknown assessments and a visible test label, not a substitute hiring score.

An owning employer must open `/app/oferty/[id]`, generate/review the matching criteria,
and approve the rubric before new applications can be assessed. Editing the public
job invalidates that rubric for future applications; approve a new version. Existing
applications retain the submitted sources, criteria and result. Missing criteria,
unreadable sources or AI outages do not block application submission.

Assessment runs with Next.js `after`, outside the submission response, under the
platform request-duration limit. Allow at least the 30-second provider timeout plus
database overhead. Candidate views refresh while processing and allow bounded retry;
a two-minute lease permits recovery after interrupted work. This is not a durable
external queue. A deployment needing guaranteed background execution should integrate
a queue before making uptime commitments.

## Vercel

1. Import the repository into Vercel. Select Next.js, Node 24, `npm run build` as the build command, and `npm ci` as the install command.
2. For the initial demo deployment, leave Supabase variables empty. The build must work without them.
3. For production, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Configure auth using the [Supabase instructions](supabase.md). Never add a Supabase secret/service-role key to this application.
4. For Preview, use a **separate Supabase project** and separate variables. You can also keep previews in demo mode. Do not copy production databases or secrets into pull requests.
5. Configure callback URLs separately for each environment. Set `NEXT_PUBLIC_SITE_URL` to the canonical deployment. Public variables are embedded at build time; changing them requires a new deployment.
6. To enable product analytics, set `POSTHOG_PROJECT_KEY`, `POSTHOG_HOST=https://eu.i.posthog.com`, and a long random `ANALYTICS_SALT`. Missing analytics configuration is an intentional no-op. Session replay is not installed.
7. AI defaults to the deterministic course provider. To use an approved provider, set `AI_PROVIDER=openai-compatible`, `AI_API_KEY`, `AI_MODEL`, and optionally `AI_BASE_URL`. Set the model's current `AI_INPUT_USD_PER_MILLION` and `AI_OUTPUT_USD_PER_MILLION` rates plus `AI_MAX_COST_USD_PER_REQUEST`; also configure a hard spend limit with the provider. Verify timeout, quota, invalid-output, outage, and cost-limit behavior first.
8. The Vercel integration creates a preview for each pull request. Protect previews containing unlocked case data with Vercel Authentication. Deploy production after merging into a protected `main` with passing CI.

## Verifying a deployment

Browse and filter jobs at 320px and desktop widths. Create a candidate account, complete a synthetic profile, submit an application, then verify an employer can review only its organization. Confirm password recovery, operator release controls, AI safe failure, PostHog event properties, and no future-stage evidence. Check Vercel logs and SMTP delivery. Do not log passwords, tokens, prompts, or free text.

Run the public deployment smoke test against the canonical URL:

```bash
DEPLOYMENT_URL=https://doroboty-ai-case.vercel.app npm run test:deployment
```

The gate checks the homepage, marketplace, representative job, sign-in page, robots file,
and sitemap over HTTPS. Authenticated journeys still require an isolated Supabase project and
must be verified separately with synthetic accounts.

After creating synthetic rehearsal accounts, run the role smoke test with the password supplied
from a secret manager rather than the shell history:

```bash
DEPLOYMENT_URL=https://doroboty-ai-case.vercel.app \
  REHEARSAL_ACCOUNT_PASSWORD="$REHEARSAL_ACCOUNT_PASSWORD" \
  npm run test:deployment:auth
```

The test uses isolated browser contexts for candidate, employer, and operator sessions, verifies
their role-specific navigation, and never prints the password.

Before collecting important data, configure Supabase backups and Vercel monitoring, verify restore on a non-production project, and record the active case release.

## Rollback

In Vercel, restore the previous working deployment. In GitHub, prepare a revert of the faulty change. **Rolling back code does not roll back migrations or data.** Keep migrations compatible with both old and new versions; destructive changes require a data backup and a separate plan. Never run `db reset` in production.
