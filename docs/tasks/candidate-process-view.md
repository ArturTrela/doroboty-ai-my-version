# Candidate application — process view

## Intent and scope

Implement the selected third image concept, `artifacts/candidate-layout-concepts/03-widok-procesu.png`, for employer application detail (`/#/app/kandydaci/:id`) on the current task branch. Preserve candidate detail, ownership checks, immutable submitted snapshots, current stage transitions and local persistence.

## Design and reuse

Source families: C01 actions, C02 fields, C13 context navigation, C19 feedback and C22 reading/process typography. The reference does not define interactive tabs or a recruiter dossier: these are explicit host extensions. Compose one white, ink-outlined r24 RecordSheet beside an unboxed ProcessTimeline and supporting scenario score. Reuse existing Base UI Tabs/Button/Textarea semantics and extend CvAttachment with a compact row; do not create separate cards for answer, CV, score, note and actions. Keep the v1 agent kit unchanged.

## Acceptance criteria

- Full name, role, company, actual stage and submission date remain readable.
- Only recorded events appear in the timeline; employer notes stay absent from candidate views.
- Answer/CV tabs support keyboard navigation; file links remain visible, snapshot-safe and local. Custom imported CVs show their saved text rather than a different prepared PDF.
- Note survives tab changes; an available stage action appends it to history and clears it only on success. Terminal states have no note editor or invented next action. Focus survives a stage update.
- Desktop has an open process margin and one reading sheet. Mobile places materials before history; all content wraps at 320px, including long imported content.
- Update host component guidance and behavior register; run ./scripts/verify, inspect desktop/mobile/keyboard/long-content states and perform a separate review.

## Validation and review

Implemented on `codex/install-poster-people-design-system`. Added RecordSheet and ProcessTimeline, extended CvAttachment with an optional row, and isolated employer composition behind the existing company ownership lookup. Candidate detail retains its prior reading/withdrawal behavior and explicitly renders no employer notes. FEATURES.md EMP-08/EMP-09/SYS-01 and host component guidance were updated.

### Executed checks

- `./scripts/verify` completed successfully under Node 24: formatting, immutable 67-file kit plus six reference tests, lint, types, 27 unit tests, baseline packet, static build and 28 Chromium journeys. Sandbox initially blocked the preview port/Chromium; the successful final run used approved local execution outside that restriction.
- New journeys exercise keyboard arrows/Home, active panel semantics, note retention, snapshot PDF link, successful stage changes, status focus, reload persistence, terminal editor/action removal, candidate note omission and custom/long imported snapshots at 1280/951/950/768/767/390/320px.
- The initial new tests exposed incorrect fixture identity, an overly broad panel selector during Base UI's exit lifecycle and a hardcoded development asset base. Corrected those test assumptions. Explicitly enabled focus-following tab activation for immediate local content. The complete final gate passed after corrections.
- Scoped Axe scan of the new record has zero violations. A whole-page scan also reported the existing moderate `region` issue on the shared workspace topbar; this task does not claim to fix or verify the entire shell's accessibility. Existing broader serious/critical accessibility journeys pass.
- Production build retains existing nonblocking Zod annotation and bundle-size warnings.

### Separate review pass

Reviewed component APIs, scoped CSS, authorization boundary and unchanged domain operations after implementation. Compared the selected concept against actual complete 1280px desktop and 390px mobile screenshots, then inspected active CV, reviewed-history and terminal mobile captures. Read source C13/C22 and inspected the running reference offer on port 8952. Confirmed Geist Serif Regular headings, white r24 surface with one 1px ink contour, open process margin, restrained pink supporting facts/actions and no nested section cards. Reading-sheet geometry and real tabs are documented host adaptations, not claimed source variants.

Additional browser inspection at 1440/1280/1100/951/950/850/768/767/700/600/390/320px found no horizontal overflow or out-of-viewport record children. At <=950px the sheet precedes the margin; the note is independent of panel mounting. Prepared PDFs remain local and custom snapshots cannot borrow another CV asset. No fixture stage, score, answer or CV was rewritten; only actual events populate the timeline. Global tokens, shared primitive behavior and immutable kit remain unchanged by this task.

Evidence is saved locally in ignored `artifacts/candidate-process-view/`: `1280.png`, `390.png`, `320.png`, `cv-desktop.png`, `reviewed-desktop.png`, `terminal-mobile.png` and `source-offer-desktop.png`. These support the checks above, not human acceptance, deployment or a new kit release. No unresolved finding remains within this screen's acceptance criteria.
