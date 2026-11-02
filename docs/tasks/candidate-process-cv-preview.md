# Candidate process view — header score and CV preview

## Intent

Apply Wojtek's follow-up to employer application detail on the current branch: move Match Score into the metadata tags below the candidate name, remove the visible “Wynik przykładowy” label and restrict CV materials to the CV tab with an immediately visible framed PDF preview.

## Acceptance

- Score remains the unchanged scenario value, displayed alongside stage metadata; retain the existing summary below history without the removed caption.
- Answer tab contains no CV file row or viewer. CV tab supplies the original local PDF links plus an accessible framed native PDF viewer. No upload, external requests, backend or new dependency.
- Prepared PDF matching still checks immutable submitted CV text. Custom imported snapshots render their full saved text without a mismatched PDF.
- Preserve note across tabs, stage actions/focus, candidate view, ownership boundaries and local persistence.
- Keep source typography/color/contour/radius and responsive wrapping. Check desktop/mobile, keyboard tab changes, snapshot PDF identity and custom imports, then ./scripts/verify and a separate review.

## Design mapping

Reuse C07 supporting facts, C01 file actions, C22 reading surface and existing host CvAttachment/RecordSheet. PDF preview is an optional CvAttachment composition, scoped to the employer CV tab. The immutable kit is unchanged. Update FEATURES.md and host component documentation to supersede the earlier permanent file row/score-caption choices.

## Validation

Implemented through the existing RecruitingApplication and CvAttachment composition. Match Score now shares the metadata tag treatment with the current stage. Removed its former caption, retained summary in an open, named section, and moved all submitted CV materials inside the CV tab. Optional `preview` uses a titled native iframe loading the same local immutable PDF as the open/download links. Custom snapshots render complete text instead.

### Executed validation

- Ran `./scripts/verify` with Node 24: formatting, kit integrity/six kit tests, lint, types, 27 unit tests, baseline packet and static build passed. The sandbox prevented the preview server binding port 3106. Re-ran the browser portion outside the sandbox: `npm run test:e2e` passed all 28 journeys. Existing nonblocking build annotation/chunk warnings remain.
- Updated existing regressions to require no CV row/viewer in Answer, the score tag beneath the name, absence of the removed caption, the exact snapshot viewer/link URL inside CV, preserved note/keyboard behavior and custom snapshot fallback. Profile/application/employer PDF identity checks now explicitly select the CV tab.
- Used the provisioned full Chromium (`channel: chromium`) to inspect the real native PDF viewer, not merely the iframe URL. Captured Answer at 1280px and CV at 1280/390/320px in `artifacts/candidate-cv-preview/`. Screenshots show the Marek Nowak PDF rendered inside the framed viewer on desktop and narrow viewport. Native viewer controls belong to the browser; open/download links remain available independently.
- Checked record descendants for clipping and document overflow at 1280/1100/951/950/768/767/600/390/320px: none found.

### Separate review

Reviewed the final source and desktop/mobile screenshots against the requested placement and existing source typography/contours. Confirmed Match Score remains the unchanged 72% fixture, no assessment operation was introduced, only the CV panel mounts the PDF iframe, and custom CVs cannot receive a prepared PDF. Existing candidate consumers retain the default non-preview attachment behavior. Notes/actions remain outside panel mounting and ownership checks/domain operations remain untouched. Host documentation and FEATURES.md describe the new behavior; the immutable kit still matches all 67 file hashes. `git diff --check` passes. No unresolved finding within this follow-up scope.
