# Poster People branch integration review

## Intent

Wojtek explicitly requested committing the completed work and merging the current `codex/install-poster-people-design-system` branch. Integrate into local main after final validation and separate review. Remote publication is not part of this instruction.

## Reviewed scope

The branch includes the immutable Poster People v1 reference/integrity tooling, replacement of obsolete theme guides, React host tokens/primitives and marketplace adaptation, shared process/candidate records, application preview/form, CV snapshots, score bands, return links, hover and successful-submit confetti. It also includes current component/acceptance/status documentation, behavior-register updates and regression coverage. These changes were authored and iterated in this conversation; generated build/test artifacts and browser-local data are excluded.

Reviewed the complete file inventory, integration/configuration/packaging diff, shared snapshot/controller boundaries and current state/acceptance documentation. Existing route/role/local-data operations remain the product contract. Source fixture data, backend/dependency boundaries and the immutable kit are preserved. Company audit NH-01–NH-05 remain explicitly open; this integration is not their closure. The existing browser-native PDF viewer limitation in the embedded preview remains documented, with local open/download alternatives.

## Acceptance

- Refresh remote refs and check main relationship before merging; do not discard or force-update unrelated work.
- Run ./scripts/verify on the final branch tree and inspect staged content/diff whitespace.
- Commit the authorized changes, merge into local main, and verify both parents/ancestry and a clean working tree.
- Report actual commit/merge IDs and validation results. Do not claim a remote push, deployment, new kit version or resolution of known open audit findings.

## Final readiness

`git fetch origin` completed; local main, origin/main and the task branch base were all at 97d1df9 before the integration commit (no divergent main work). The final ./scripts/verify passed with Node 24: formatting, all 67 kit hashes/six reference checks, lint, types, 27 unit tests, baseline packet, static build and 34 Chromium journeys. Existing nonblocking upstream build warnings remain.

The separate integration review confirmed that all changed/untracked source paths belong to the authorized design-system work, the reference kit is 5.8 MB including its local evidence/assets, and generated artifacts are ignored. Model/storage/domain fixtures and package-lock.json have no changes. Staging whitespace/content boundaries are checked before commit. This record describes merge readiness; actual commit/merge IDs and clean-tree verification are reported after Git operations complete.

Staged review: 153 files, all within the authorized source/docs/reference replacement. No generated artifacts, environment files, instructor sources or browser-local records are staged. Authored changes pass `git diff --cached --check` excluding the immutable imported kit. The unmodified v1 kit itself contains two upstream whitespace notices (reference/components.md blank EOF and scripts/serve.mjs trailing space); its 67 verified hashes take precedence over reformatting those source files. The superseded PROPOSED-1.1.md is explicitly historical and does not claim a new approved release.
