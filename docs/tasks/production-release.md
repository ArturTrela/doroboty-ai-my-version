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

The first preload/map repair passed locally but the hosted CI homepage remained at 88. A further asset-only optimization pins the existing font's unused STYL/ital
axes to their current theme values, retains full Unicode coverage and weight
variation, and preserves the original font. This removes unused interpolation
data instead of changing the performance threshold or visible typeface.

Lighthouse now writes the full report for each sample to ignored artifacts, and
CI retains them with the public/demo report. Future failures expose the measured
LCP, blocking time and network chain rather than only the final score.

The optimized asset is 93396 bytes versus 211828 (56% smaller), with identical
character mapping and all 417 Unicode characters retained. The final local verifier
passed (122 tests and production build), and Lighthouse performance medians are
96/96/96 for home/list/detail with the unchanged thresholds.

The following CI run passed Lighthouse and exposed outdated production dependencies
at the security gate. Upgrade Next.js and its ESLint configuration from 16.3.8 to
16.4.3, Zod to the patched 4.6.7 release, and compatible vulnerable transitive entries.
Keep the existing major versions, pinned Next.js versions and Zod caret policy.

Primary advisories: https://github.com/advisories/GHSA-2464-fhr4-w9xw and
https://github.com/advisories/GHSA-mrhx-c7xc-m3w5 . Release dependencies are installed
in this isolated checkout; the active local app's node_modules remain unchanged.
FEATURES.md was reviewed; these security upgrades do not add another product flow.

After the dependency updates, the production audit reports zero vulnerabilities.
The verifier (122 unit tests/build), 20 public/browser tests, formatting and local
Lighthouse pass on the patched runtime. CI revalidates this exact lockfile.
