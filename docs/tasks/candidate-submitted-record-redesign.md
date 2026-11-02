# Candidate submitted application — shared process record

## Intent and scope

Redesign `/#/app/aplikacje/:id`, including the user's current locally saved application, using the implemented Poster People process view. Preserve the same application IDs, immutable answer/CV/identity, scenario score, ownership lookup and local persistence. Inspect the requested record read-only; do not withdraw or rewrite the user's application during verification.

## Acceptance and reuse

- Replace stacked panels with shared process geometry: role-title header, context/status/date/score metadata, one RecordSheet with Answer/CV tabs, and open actual history/summary margin. Reuse BackLink, MatchScore, ProcessTimeline, CvAttachment and the existing typography/surface recipes.
- Introduce one shared ApplicationRecord composition for candidate and employer views rather than copying their layout/snapshot markup. Controllers retain role-specific notes/actions; candidate history must be projected to stage/date before rendering, with no employer notes or raw legacy source text in either tab.
- H3 answer/CV headings, matching local PDF preview and full custom-text fallback; mobile materials before history, no clipping at 320px or for long content.
- Preserve two-step withdrawal. Opening/cancelling restores logical button focus; successful withdrawal focuses the surviving status, persists the terminal state and removes actions. Rejected/hired/withdrawn records remain terminal. Do not add employer controls or invented future stages.
- Update FEATURES.md and host design-system guidance, run ./scripts/verify, compare actual desktop/mobile/state views and review separately. Keep the immutable reference kit unchanged and the existing branch.

## Validation

Implemented shared ApplicationRecord (header, immutable Answer/CV sheet, score, history/summary) and separate CandidateApplication/RecruitingApplication controllers. Candidate history is explicitly projected to stage/date; no employer note or legacy source/generated field is rendered. Removed the old candidate panel stack. Withdrawal keeps its two-step operation and now focuses confirm, restores trigger on cancel and focuses the surviving status on success. Snapshot and role/domain operations are unchanged.

### Executed validation

- `./scripts/verify` passed under Node 24: formatting, immutable 67-file kit/six reference tests, lint, types, 27 unit tests, baseline packet, build and 34 Chromium journeys. Existing nonblocking build warnings remain.
- Two new journeys cover candidate-only history projection, omitted employer/source/generated text, shared snapshot tabs/PDF identity, zero scoped Axe violations, confirm/cancel/status focus, terminal persistence, wrong-candidate deep links and long/custom CV snapshots across 1280/1100/951/950/600/390/320px.
- Existing PDF and withdrawal assertions were updated to select the explicit CV tab and target current header status, since current stage also appears in history. A full-flow test initially used an ambiguous exact stage-text query; scoped it to the current-status element without weakening its workflow/privacy assertions. The final full gate passes.
- Read the user's actual requested local record in a background in-app tab and verified HMR updated that same UUID without replacing data or selecting another persona. Actual record title/context, stage, score, answer, file URL and dates remain intact. Inspected desktop Answer and CV, and the narrow layout with materials before history. No withdrawal action was executed on that record. Restored the temporary viewport override.
- The in-app viewport override reported an actual DOM width of 433px with document width also 433px (no horizontal overflow); exact 390/320px coverage comes from the isolated Chromium journeys, not that host screenshot.
- The original local PDF iframe and open/download links mount correctly. The embedded in-app viewer displayed a dark native surface during this inspection; actual PDF rendering in that surface is not claimed. The shared browser-native viewer behavior is unchanged and explicit open/download alternatives remain available.

### Separate review

Inspected the actual record's desktop/narrow layout and source against the accepted process composition: one white r24 ink-outlined sheet, H3 material headings, shared return link and score palette, open real history/summary, and no nested candidate panels. Reviewed the authorization lookup before role controllers, explicit candidate history sanitization, terminal restrictions and focus after replaced actions. Shared employer actions/notes and all previous application/draft/submit journeys pass. No data migration, fixture rewrite, new dependency, remote runtime or reference-kit change was introduced.

FEATURES.md CAN-15/CAN-16 and current design-system catalog/record/status/acceptance files were updated. Source Markdown targets and `git diff --check` pass. The five company-page findings remain open and unrelated. Native PDF engine compatibility remains the pre-existing documented browser boundary; no unresolved layout or local-flow finding remains in scope.
