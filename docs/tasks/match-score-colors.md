# Shared Match Score color coding

## Intent and acceptance

Apply score-dependent colors to the employer header tag and every existing candidate/employer Match Score display. Preserve the current thresholds (0–39 red, 40–59 orange, 60–79 yellow, 80–100 vivid green), numerical values and scenario behavior. Keep the percentage readable independently of color and retain noninteractive semantics.

Replace the isolated header tag and older dot-only score renderer with one shared feature component. Use dedicated host score-color tokens and the existing supporting-fact pill anatomy; do not edit the immutable kit or imply a new assessment operation. Check threshold boundaries, both role contexts, desktop/mobile wrapping and text contrast; run ./scripts/verify and a separate review. Update FEATURES.md and host component guidance.

## Validation

Implemented one `MatchScore({ score })` feature component for employer/candidate lists and details, including header metadata. Removed the older private dot renderer and the unconditional pink score tag. Added dedicated host palette tokens and one pill recipe; percent text stays visible and the score is not interactive. Original stage/status colors and domain values are unchanged. Updated the behavior register and host component documentation.

### Executed validation

- `./scripts/verify` passed under Node 24: formatting, immutable kit integrity/six reference tests, lint, types, 27 unit tests, baseline packet, build and all 28 browser journeys. Existing nonblocking build warnings remain.
- Isolated Chromium checks exercised 0/39/40/59/60/79/80/100 plus the current 72% and verified actual computed colors at every boundary. Checked the shared yellow treatment on the employer list and candidate list/detail. The header's 72% now appears yellow as required by the preserved thresholds.
- Measured ink/fill contrast from actual browser colors: red 6.45:1, orange 9.89:1, yellow 13.95:1, vivid green 7.94:1. All exceed 4.5:1; numbers remain readable without depending on color.
- Checked 320px overflow (none), noninteractive cursor and captured each band plus mobile. Evidence is in ignored `artifacts/match-score-colors/`: `checks.json`, `header-red.png`, `header-orange.png`, `header-yellow.png`, `header-green.png`, `320.png`.

### Separate review

Reviewed rendered header screenshots for red/yellow/green and inspected reuse/source references. Confirmed the same component owns all four application score placements, no parallel renderer remains, header metadata wraps, source stage selection remains pink, and hover rules do not turn the score into an action. Kit files remain unchanged; host extensions are documented explicitly. `git diff --check` passes. No unresolved finding in this scope.
