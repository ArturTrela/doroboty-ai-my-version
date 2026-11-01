# Simple candidate list and AI summary

Wojtek's 2026-11-01 UI correction supersedes the earlier expanded Match Score presentation.

Acceptance:

- Employer inbox contains compact candidate rows: identity, role/status, a color-coded
  Match Score, a short grounded AI summary and a profile/CV link. Recruiting actions
  stay on candidate detail instead of every inbox row.
- Score colors: red below 40%, orange 40-59%, yellow 60-79%, green from 80%.
  Missing scores are neutral; percentages remain readable independently of color.
- Remove coverage, criterion analyses, quotes, formula, model/version and explanatory
  blocks from user views. Keep calculation, evidence and unknown handling internally.
- Model assessment also produces a two-sentence summary with source-backed facts.
  The displayed summary is saved, never invented from the application prose.
- Examples use ordinary candidate names, CV names and application copy. Remove
  fictional/synthetic recruitment notices from visible fixture job descriptions;
  keep development provenance in source documentation and preserve real-user data.
- Refresh only known local example records, demonstrate different real calculated
  scores, inspect desktop/mobile/light/dark and run the repository verifier.

## Implementation and verification

The employer inbox is now a compact list with identity/role/status, a colored score,
a saved AI summary, and one profile/CV link. Stage actions remain on detail. The shared
score component also removes analysis from candidate/receipt/detail views. Coverage,
evidence, unknown handling and calculation remain internal. Historical word-similarity
scores remain stored but are not displayed as current CV-based scores. An orange status
token was added at the existing theme's owning source; the other colors reuse current
status tokens, with readable foreground text and an independent percentage.

Assessment JSON can include a short summary and internal supporting source quotations;
source validation rejects fabricated citations. Real provider failures preserve a safe
failure type without storing upstream diagnostics. Existing local examples were updated
with normal profile/application/CV labels and actual provider-generated summaries. Only
known fixture/local example data and exact fixture notices were changed. Published
fixture copy and future fixture generators omit fictional recruitment notices. Private
sources, candidate permissions and background-worker credentials remain unchanged.

Checks:

- `./scripts/verify` passed: lint, 115 unit tests across 28 files and production build.
- All 27 isolated Supabase integration tests passed, including list-to-detail recruiting
  actions, saved summaries and absence of expanded analysis.
- All 19 public/demo E2E tests, 17-migration database/RLS gate, security scan and whitespace
  check passed. Global Prettier still flags only the unrelated `richer-job-copy.md` note.
- Real DeepSeek journeys saved five current scores on the AI Product Manager role:
  Marta Zielińska 100%, Anna Wójcik 62.5%, Karolina Szulc 50%, Piotr Lis 30%, Tomasz Mazur 0%.
  Scores were calculated from validated model assessments, not assigned to force colors.
  Existing unavailable/historical assessments are neutral rather than fabricated.
- Browser review covers the candidate list at 1280px/390px in light/dark modes, keyboard
  controls and accessible percentage text. Local review artifacts are in ignored
  `.vercel/candidate-list-check/`; no hosted deployment or Notion changes were made.

Separate review checked score thresholds/boundaries, zero versus absent scores, legacy
method separation, source-backed summary persistence, removal of analysis from every
consumer, tenant boundaries and preserved detail recruiting actions.
