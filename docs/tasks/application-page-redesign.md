# Application page with offer context

## Intent and acceptance

On the current branch, fix touching Apply/Save buttons on public offer detail and redesign the full candidate application page using Poster People. Add a readable offer preview (real identity, full role title, salary/basis, facts, summary and expandable complete description) alongside the form. Replace the nested CV panel with the shared attachment row inside one reading/form sheet.

Preserve candidate role gates, hash URLs, submitted/unknown job states, draft save/resume (including hidden legacy fields), answer/consent validation and focus, local PDF identity and immutable submission behavior. Use no new dependencies or external requests. Desktop: offer context beside form; mobile: offer context before the form, expandable description without leaving or resetting the answer. Verify long Polish content, missing salary/mark fallback and 320px wrapping.

## Design/reuse

Source C01 actions, C02 fields, C08 identity, C13 return navigation, C20 role context, C21 conditions and C22 reading surface. Reuse CompanyLogo, SalaryFact, JobDescription, CvAttachment, Base UI controls and the host record-sheet surface. ApplicationOfferPreview is a feature composition of those existing components, not a new control/card family. Use local Geist Serif 400, paper/white/ink/pink and source r24/10/18 treatment. Keep agent-kit byte-identical. Source has no submitting application page: document this host composition explicitly.

## Validation

Update FEATURES.md and host guidance, add focused coverage for contextual offer reading without losing a draft and action separation, run ./scripts/verify, inspect complete desktop/mobile/state screenshots and perform a separate review.

## Implementation and executed checks

Implemented ApplicationOfferPreview from CompanyLogo, SalaryFact and JobDescription. The offer context shows actual published data and a native full-description disclosure; wide screens place it beside one form sheet, <=850px place it before the form. The form integrates CV via CvAttachment's context-aware row, preserves complete custom CV text, and retains the answer, consent, draft and submission operations. Added explicit 10px action sibling spacing to the host offer adaptation.

- `./scripts/verify` passed under Node 24: formatting, 67-file immutable kit integrity/six reference checks, lint, types, 27 unit tests, baseline packet, static build and 30 Chromium journeys. Existing nonblocking build annotation/chunk warnings remain.
- Two new desktop/mobile journeys verify Apply/Save separation, real job/company conditions, keyboard disclosure without losing answer/consent, file identity, draft persistence/reload and zero scoped Axe violations. Existing short-answer/approval focus, immutable CV, legacy draft fields, full employer workflow and role restrictions still pass.
- The first run found a legacy test coupled to the former `section + label` markup. Replaced that selector with named CV-region/answer checks and a DOM reading-order assertion; retained its keyboard, persistence and legacy-data assertions. The final complete gate passes.
- Browser geometry checks measured a 10px action gap at 1280/850/700/390/320px. Normal application checks at 1280/1100/851/850/700/600/390/320px found no horizontal document overflow or clipped application children.
- Additional isolated imported-state checks covered a long Polish/unbroken title, long company name/initials, missing salary, open full description and complete custom CV text at 1280/1100/851/850/390/320px. No overflow or mismatched prepared PDF. Synthetic test data stayed in an isolated browser context.

## Separate review

Inspected complete 1280px and 390px application screenshots against the source reading/conditions roles and prior baseline, then reviewed the final source/interaction boundaries. Confirmed source paper/white/ink/pink, Geist Serif Regular, one r24 ink contour per work surface, no nested CV panel, readable amount with agreement/basis/period, and mobile context-before-form order. Disclosure expansion stops sticky positioning and does not navigate or remount the form. Existing native field constraints, explicit consent reset on answer edits, local operations and persona/CV snapshot rules remain intact. Shared attachment consumers and the employer process view pass the existing journeys. The kit stays byte-identical; `git diff --check` passes.

Updated FEATURES.md CAN-09/PUB-06, host implementation guidance and CvAttachment documentation. Evidence in ignored `artifacts/application-redesign/`: before/after application captures, baseline offer, open-description and long/custom-CV mobile captures. These checks do not establish deployment or human acceptance. No unresolved finding in this scope.
