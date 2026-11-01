# Verify both writing assistants with DeepSeek V4 Flash

Requested by Wojtek on 2026-11-01. Switch the local writing-assistant configuration
from GPT-5 Mini to `deepseek/deepseek-v4-flash` through Vercel AI Gateway and verify
both authenticated application journeys with real model responses.

## Acceptance criteria

- Both assistants use the project-scoped Gateway API key already stored in ignored
  local configuration. No credentials enter tracked files or browser bundles.
- The model and estimated input/output rates are updated together.
- A candidate can generate a role-specific answer from selected synthetic experience.
- An employer can generate and approve a job draft from an accessible private brief.
- Successful generations are saved with the DeepSeek model identifier. Generation
  alone does not submit an application or change a published job.
- Local checks use only local Supabase and synthetic data, without resetting an
  existing database or changing the deployed application or hosted database.

## Validation

FEATURES.md was reviewed: CAN-12, EMP-06 and OPS-06 already describe configurable
real-provider generation. No application source or feature-register change was
needed for this local environment-only model switch.

- Set `AI_MODEL=deepseek/deepseek-v4-flash` and the Gateway catalog estimates of
  USD 0.13/M input tokens and USD 0.26/M output tokens in ignored local configuration.
- The original local database has the extra migration `20261022150000`, which is
  absent from this checkout. The CLI refused to migrate it. Its history and data
  were preserved; no reset or migration repair was performed.
- Prepared `doroboty-ai-local` using current migrations and synthetic seeds under
  ignored `.vercel/local-supabase`. Its API is `http://127.0.0.1:58321` and Studio is
  `http://127.0.0.1:58323`. The local application uses that database. The later
  canonical-local-database cleanup promoted its settings into root `supabase/config.toml`
  and removed that duplicate workdir. Use `npm run db:setup` from the repository root.
- A real Chromium candidate journey generated a 440-character answer in 6.819 s,
  preserved the selected experience's 20% result, and saved successful DeepSeek
  provenance without submitting an application. Regeneration of a resumed draft
  was also verified.
- A separate authenticated employer context generated a 478-character description
  from the owned role's private brief in 6.525 s. Its generated title, summary and
  description passed the actual approval action; a private text version was saved
  with the generation ID, while the published title, summary and description stayed
  unchanged.
- These were actual Vercel AI Gateway responses, not the deterministic test provider.
  Screenshots and machine-readable results are in ignored
  `.vercel/deepseek-assistant-check/`. No secret is included in those artifacts.

`./scripts/verify` passed after the browser checks: lint, all 69 unit tests and the
production build. A final review confirmed the local Gateway model/rates, both
saved generation records, private approval/publication boundaries and the absence
of tracked secrets or application-source changes. The application remains available
locally on port 3001. No hosted deployment or hosted database was changed.
