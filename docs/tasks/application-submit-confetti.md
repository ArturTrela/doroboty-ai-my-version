# Confetti on successful application submission

## Intent and acceptance

Add a short, local confetti burst originating from the Send application button only after the existing submit operation succeeds. Show a disabled success button briefly, then preserve the existing applications-list redirect. No confetti for validation/operation failures, draft saving or revisiting an existing application. Prevent repeated submission and clean up the animation/navigation work on unmount. Respect reduced-motion preferences by skipping decoration and the celebration delay.

Reuse the current Button, success icon and Poster People pink/yellow/ink palette. A small reusable decorative portal owns particles without intercepting pointer/keyboard input or creating page overflow. No package, backend, external asset or runtime request. Preserve submission data, approval, legacy fields and static/local persistence. Update FEATURES.md and host guidance, check success/error/reduced-motion/duplicate states and actual desktop/mobile animation, run ./scripts/verify and review separately.

## Validation

Implemented a reusable aria-hidden ConfettiBurst portal with 30 deterministic pink/yellow/ink particles, originating from the submitted button's viewport center. The successful local operation sets a guarded success state, disables editing/repeat submission, changes the button to “Wysłano!” and redirects after 900ms. The 850ms animation ends first. Existing-record navigation remains immediate when revisiting. Reduced motion creates no portal and redirects without the celebration delay. The navigation timer is cleared on unmount and the portal is owned by React.

### Executed validation

- `./scripts/verify` passed under Node 24: formatting, immutable kit/six reference checks, lint, types, 27 unit tests, baseline packet, build and 32 Chromium journeys. Existing nonblocking build warnings remain.
- Two added journeys exercise normal/reduced motion, no burst for short-answer validation or draft saving, the success button lock, decorative aria-hidden/pointer behavior, duplicate submit guard (exactly one candidate record), redirect, removal on navigation and no replay after reload or an existing application revisit.
- The first gate exposed duplicate status regions introduced by the initial implementation. Consolidated draft/success feedback into one live status region, retaining the existing draft keyboard/persistence assertions. Also scoped the new validation assertion to its answer alert because multiple invalid fields legitimately produce multiple alerts. The final complete gate passes.
- Actual browser inspection at 1280/390/320px confirmed 30 particles at the button center and no horizontal overflow. Captured representative CSS animation frames at 280ms in ignored `artifacts/application-confetti/1280.png`, `390.png` and `320.png`.

### Separate review

Inspected the mobile animation frame and reviewed portal ownership, hooks before early returns, success guard, timer cleanup, reduced-motion JS/CSS boundaries and the existing snapshot/approval operation. The burst remains decorative and clipped to the viewport, with no input interception, external requests or dependency. The accessible textual confirmation and subsequent list notice carry the success state independently of animation. FEATURES.md CAN-13 and host motion guidance were updated; the immutable kit remains unchanged. `git diff --check` passes. No unresolved finding in scope.
