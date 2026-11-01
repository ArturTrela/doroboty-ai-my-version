# Production release and font preload

Requested on 2026-11-01: push the committed application changes to GitHub and deploy
on the existing Vercel production project.

## Release boundary

Deploy the committed CV/application/matching work through PR #6. Preserve concurrent,
uncommitted marketplace expansion. Verify the linked hosted database matches Vercel,
apply reviewed pending migrations without reseeding/resetting data, install production
AI Gateway/worker configuration, and refresh only eligible original public descriptions.

## CI performance repair

The first CI run passed functional, browser, integration and migration checks but failed
the homepage Lighthouse performance threshold: median 88 versus the required 90.
Local diagnosis identified a font request behind the render-blocking stylesheet.
Use Next.js local-font preloading for the existing Timeless Grotesk variable file,
weights and sans-serif fallback. Existing theme roles reference the generated variable;
no typography dimensions, content or theme colors change. Keep the performance gate. The next route check exposed eager MapLibre loading on
list visits; defer the existing renderer and its stylesheet until a map mounts.
Preserve the server-rendered linked result list and safely cancel initialization
after unmount. Add a browser regression for the list download budget and font preload.

Acceptance: retain rendered heading dimensions, preload one local font, pass verifier,
Lighthouse, public E2E and CI. Deploy without switching the public alias until ready;
verify the canonical site after promotion. No Notion Memories.

Local validation: verifier passed (122 tests, lint and production build), all 20
public/demo browser tests passed, including the list download budget and preload.
Lighthouse medians passed unchanged thresholds: home 94, listing 91, detail 91;
accessibility 96/95/100, best practices and SEO 100. Formatting and security passed.
The database/RLS gate passed all 18 migrations. Production activation awaits CI
and hosted migration/configuration checks.
