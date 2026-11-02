# Consistent pointer and hover feedback

## Intent and acceptance

Ensure every enabled application link/button exposes a pointer cursor and a visible color change on hover, including workspace navigation, plain links, tabs, PDF actions, marketplace controls and portal actions. Disabled controls retain a distinct unavailable state; noninteractive facts remain noninteractive. Preserve focus outlines, selected states, geometry, roles and local flows.

Use source C01 actions, C06 categories and C13 navigation colors. Add one shared host interaction contract with per-variant hover colors instead of patching individual screens. Primary remains source pink → #ffacef, quiet/outlined actions and plain links use supporting pink, selected navigation remains ink/white with a lighter ink hover. Keep the immutable kit unchanged. Update host guidance and FEATURES.md; inspect actual hover computed styles across public and role routes, including dialogs, keyboard focus and disabled actions, then run ./scripts/verify and a separate review.

## Validation

Implemented one shared semantic interaction stylesheet, imported after host page styles. Enabled anchors/native buttons/button-role actions use a pointer and a visible hover color change. Button variants supply explicit hover backgrounds, including source primary and destructive variants; selected navigation and checked checkbox treatments retain white text on ink. No hover treatment is attached to salary/score facts or ordinary reading content. Host implementation guidance and SYS-01 behavior register were updated.

### Executed validation

- `./scripts/verify` passed under Node 24 with approved local execution for the preview server and Chromium: formatting, 67-file immutable kit integrity and six kit checks, lint, types, 27 unit tests, baseline packet, static build and all 28 browser journeys. Existing nonblocking build warnings remain.
- Compared resting/hover computed background, text color and cursor for 305 enabled-action instances across 17 route/state visits: home, listing, offer, person picker, candidate dashboard/profile/settings/application, employer dashboard/jobs/editor, candidate process Answer/CV, mobile listing and filter/reset dialogs. Every inspected enabled action changed color and used `pointer`; disabled controls were checked separately for the unavailable cursor. Counts include repeated controls across visits, not 305 unique components.
- The audit first needed adjustment for the keyboard-only skip link and covered background controls behind an open modal. Focused the skip link before checking it and scoped dialog checks to the active dialog; these were audit traversal corrections, not product failures. No product hover defect remained after applying the shared rule.
- Evidence: ignored `artifacts/hover-states/audit.json` (per-visit counts/no failures) and `record-hover.png` (hovered primary action).

### Separate review

Reviewed source selectors and the actual hovered record screenshot against the source pink action hierarchy and previous resting captures. Confirmed no geometry, typography, route, local data, focus outline or native keyboard changes. Existing selected sidebar/category/view state remains dark with white text during hover; PDF open/download controls inherit the shared feedback. Native PDF viewer chrome is browser-owned and outside application CSS. Shared styles also reach portal buttons. The reference kit stays byte-identical and `git diff --check` passes. No unresolved finding in this task scope.
