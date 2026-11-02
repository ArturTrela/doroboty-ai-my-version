# Consolidate design-system host documentation

## Intent and acceptance

Update the receiving design-system files to describe implemented work: recruiting process layout, sheet/CV/timeline APIs, H3 section typography, shared score colors, hover, return links, offer-action separation, application preview/form and success confetti. Make these contracts discoverable from the main entry points and add the corresponding acceptance checks.

Keep the 67-file Poster People v1 kit byte-identical. These are implemented, user-requested React host extensions, not a new source-kit release or blanket design approval. Preserve historical task evidence and clearly retain the five open Northstar company audit findings; documentation must not declare unfixed UI compliant.

Documentation-only change on the current branch. Check actual component props/styles/call sites, validate relative Markdown targets and kit integrity, run ./scripts/verify and review the handoff separately. FEATURES.md reviewed; this change adds no runtime behavior and does not need a register update.

## Validation

Updated the design-system entry points and added HOST-COMPONENTS.md (actual React component catalog/API/ownership) and STATUS.md (implemented scope, evidence and open findings). Refined RECORDS.md with explicit CvAttachment props, current row/stack consumers, named-panel lifecycle guidance, H3 hierarchy and score contrast. Expanded VERIFICATION.md with process/CV/score/BackLink/hover/application/confetti/company checks and the requirement to settle media-query layout before sampling. README.md, IMPLEMENTATION.md and GUI.md now lead to the current contracts.

Preserved all five Northstar findings as open. Kept unsupported full-company-page recommendations distinct from canonical source requirements. Historical task evidence remains intact. No UI/domain/FEATURES.md behavior changed; no immutable reference file or manifest was modified.

### Executed verification

- `./scripts/verify` passed with Node 24: formatting, all 67 kit hashes/six reference tests, lint, types, 27 unit tests, baseline packet, static build and 32 Chromium journeys. Existing nonblocking build warnings remain. Later documentation-only portability wording was rechecked with Prettier and target/anchor validation.
- Checked 139 relative file/Markdown-heading targets across eight receiving docs/GUI files with zero failures, both in the repository and in a freshly generated baseline participant package at `/tmp/doroboty-ds-docs-20261102`.
- `npm run package:participant -- /tmp/doroboty-ds-docs-20261102` passed baseline verification. Engineering task paths are explicitly repository-only plain references because participant packages exclude task history; current contracts and open findings remain self-contained. Confirmed neither docs/tasks nor .git was included.
- `git diff --check` and final targeted Prettier checks pass.

### Separate review

Compared the handoff against actual props, style owners, viewport rules, success lifecycle and current role consumers. Corrected stale descriptions that placed score context in the process margin or called the editable application's CV consumer a stack. Verified that the current public catalog directs developers to one component owner and that docs do not turn an open company defect into an accepted variant. Checked that the update neither claims a new v1 kit release nor treats the green general gate as proof of complete company-page accessibility. No unresolved documentation finding remains in this scope.
