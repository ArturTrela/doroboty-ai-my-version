# Smaller application and recruiter note headings

## Intent and acceptance

Change employer process-view “Przesłana aplikacja” and “Notatka rekrutacyjna” to semantic H3 headings using the existing host H3 scale (26px Geist Serif Regular), preserving section spacing and the textarea label. Add a visually hidden H2 for the named shared record sheet so the requested H3s retain a coherent outline. Leave other visible headings unchanged.

No domain or workflow change. FEATURES.md reviewed; no behavior-register update needed. Update the host component heading contract, run ./scripts/verify, inspect computed headings at desktop/mobile and review the final patch. The immutable design kit remains unchanged.

## Validation

Changed both requested headings to H3, inheriting the existing 26px/400 Geist Serif treatment. Preserved the reading heading margin and note label association; RecordSheet now supplies a visually hidden H2 so these subsections do not skip a heading level. Other visible headings retain their previous treatment.

`./scripts/verify` passed under Node 24: formatting, immutable kit/six reference checks, lint, types, 27 unit tests, baseline packet, build and 28 Chromium journeys. An isolated browser check confirmed both headings are H3, 26px and weight 400 at 1280/390/320px, with no horizontal overflow and a working textarea label. Captures are in ignored `artifacts/candidate-sheet-headings/`.

Separate review: inspected the final source patch and rendered desktop screenshot. Both headings now have the requested smaller hierarchy, spacing and form behavior remain intact, and the kit is unchanged. `git diff --check` passes. No unresolved finding in scope.

## Follow-up: consistent CV heading

Wojtek requested the same H3 treatment for “CV z momentu aplikowania” inside the employer CV tab. Change that heading to H3 using the existing 26px shared scale; preserve PDF preview, spacing and other screens. Update the host heading contract, run the verification gate and inspect the CV tab at desktop/mobile widths. FEATURES.md reviewed; no domain/workflow change.

Follow-up validation: changed the employer CV heading to H3 and updated the shared heading documentation. `./scripts/verify` passed (27 unit and 28 browser tests, plus formatting/lint/types/build/packet/kit checks). Browser inspection confirmed H3, 26px, Geist Serif 400 at 1280/390/320px with no horizontal overflow; captures are in ignored `artifacts/candidate-sheet-cv-heading/`. Separate source review confirmed the existing H3 margin preserves spacing and the CV preview and textarea label are unchanged. `git diff --check` passes.
