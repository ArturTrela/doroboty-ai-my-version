# Whole application Poster People redesign

## Intent

Redesign all public, candidate, employer and instructor views on the existing `codex/install-poster-people-design-system` branch, as explicitly requested. Preserve routes, local operations, validation and scenario data. Keep the installed reference immutable.

## Acceptance criteria

- Shared fonts, tokens, controls, panels, navigation and feedback follow Poster People.
- Public home, listing, offer, company and information screens and all workspace forms/lists/details use the same visual language.
- Reuse existing primitives and compositions; document extensions as a proposal requiring Wojtek’s acceptance.
- Check desktop/mobile, long content, keyboard and local journeys; run ./scripts/verify and a separate review.

## Validation

Executed with local Node 24.20.0:

- Full `./scripts/verify`: formatting, immutable kit checks (67 hashes / 333 references / six tests), lint, TypeScript, 27 unit tests, baseline packet, build and 20 Chromium journeys. Includes a new mobile filter dialog Escape/submit/focus regression test.
- Browser matrix: 19 route compositions at 1280, 850, 390 and 320 CSS px (76 captures), no document horizontal overflow and no external runtime requests. Local evidence is in ignored `artifacts/redesign/`, including `review.json`.
- Inspected home, listing, offer, candidate detail/profile, employer editor and mobile filter screenshots separately from implementation. Tested a long Polish title, missing salary and initials fallback at 1280/390/320; role H1 stays 64/47px, wraps completely and does not overflow.
- Existing journeys cover local publication, saves/drafts, submission, immutable CV snapshots, employer decisions, withdrawal, invalid import/reset and storage recovery. Axe checks cover the listing and profile; this is not a complete accessibility certification.

The first sandboxed browser-server start failed with EPERM. The same local checks ran with approved elevated execution. Initial failures asserting the previous white canvas and mobile section ordering were updated for the requested design. A new keyboard check exposed focus loss on filter submission: retaining ResponsivePanel while keying only the form fixes it. The final check covers this regression.

Build retains non-blocking upstream Zod annotation and bundle-size warnings. No dependencies, domain model, stored data format, services or remote runtime assets were added. No publishing or remote push was performed.

## Separate review

Reviewed host token consumers and portals, semantic save states, mobile reflow, local asset resolution and font weights, preserved routes/role boundaries, unchanged fixture/model/storage files, and separation from the pre-existing documentation installation changes. Corrected double form contours, selected checkbox colors, missing-salary treatment, filter trigger focus restoration and selector contours in the mobile portal. The v1 kit remains byte-identical. FEATURES.md records actual visual and filter-dialog changes.

## Proposed system update

`docs/design-system/PROPOSED-1.1.md` contains the concrete unapproved proposal: workspace shell, shared form/detail surface recipes and ResponsivePanel. Only one new React composition was introduced, using existing Base UI Button/Dialog and render composition. No new domain-specific card families. Wojtek must accept the proposal before a new reference release is prepared.

Work remains on the user-requested existing branch, `codex/install-poster-people-design-system`; no merge or commit is claimed.
