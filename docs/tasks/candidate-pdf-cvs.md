# Candidate PDF CVs

## Intent

Replace the text-file CV download with realistic, ordinary PDF attachments for the two prepared candidate personas. Keep all files local, synthetic and available in static builds.

## Acceptance criteria

- Anna Kowalska and Marek Nowak each have a readable, one-page Polish CV PDF with selectable text and embedded fonts.
- Experience and results agree with the existing persona scenarios; added employers, education and contact details are fictional. The documents identify the synthetic teaching context discreetly.
- Profile, application form and submitted application detail expose the correct PDF with native open/download links. Candidate and employer see the same fixed persona attachment.
- Existing saved scenarios continue to work without reset or schema migration. Text CV snapshots remain stored; imported custom CVs without a matching prepared PDF are displayed as text.
- Versioned PDF assets are immutable: a future CV revision must use a new filename and explicit application snapshot handling.
- Update CAN-06 and related behavior entries in FEATURES.md; run ./scripts/verify, visually inspect both rendered PDFs and review the change separately.

## Validation and review

- Created two one-page A4 CVs with experience, skills, tools, education, languages and fictional example.com contacts. Retained the persona achievements (Anna: 18 interviews and 30% shorter handling; Marek: 25% shorter response time). Each PDF has a discreet synthetic-data footer.
- Rendered both PDFs with Poppler and inspected the PNGs. Checked one-page layout, selectable Polish text, embedded regular/bold fonts, metadata and matching scenario metrics using pypdf. No clipping, overflow or missing glyphs found.
- Added shared native PDF open/download links using the existing button variants in profile, application form and candidate/employer submitted detail. Fixed, versioned persona assets also work with existing saved scenarios; custom imported CV text uses the text fallback.
- `./scripts/verify` passed under bundled Node 24.22.1: formatting, lint, types, 27 unit tests, baseline packet validation, static production build and 19 Chromium journeys. The first sandboxed attempt passed through build but could not bind the browser preview server (EPERM); the authorized rerun passed. Corrected inconsistent JSON import attributes found during the initial build. Remaining build advisories concern existing dependency annotations and bundle size.
- Both new PDF journeys verified response MIME/signature, keyboard-triggered native download and exact bytes, profile edits/reload, mobile overflow, submission and employer access to the same file, and zero external requests. Inspected the mobile profile and desktop employer screenshots. PDF assets are present in `dist/cv`.

## Separate review

Reviewed the completed attachment component, its three integration sites, fixed persona mapping, custom-import fallback, static base path, PDF contents and behavior documentation. Existing theme variants are reused without new styling tokens or dependencies. `git diff --check` passed. Concurrent application simplification and configuration cleanup in this checkout were preserved and are outside this task. No commit, merge, deployment or human approval is claimed.
