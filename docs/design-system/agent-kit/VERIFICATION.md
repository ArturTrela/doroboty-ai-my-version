# Verification — 2026-11-02

Status: verified for the local package scope below. This is a manual browser review plus automated source checks; it is not a production readiness or WCAG certification.

## Automated checks

Executed `npm run check` with Node **24.20.0**. It checks local file references in HTML/CSS/JS/Markdown, JavaScript syntax and six Node renderer tests. No installation or runtime dependency is needed.

The ZIP was also extracted into an independent temporary directory and the same check passed there, confirming that local references do not depend on the original workspace.

All six tests passed: supplied text escaping, constant bookmark name/pressed state, unsafe link fallback, positive numeric DOM identity, missing data/mark/icon fallback, and filter/bookmark URL roundtrip. The test command is reproducible through `npm test`.

The original standalone source remains clean at `6f1cd9e6980f40546d80732e228f39d2ad89fc3a`; all nine source hashes in provenance.json still match. The copied human reference and evidence were compared byte-for-byte with the accepted documentation. No source website edit or deployment was performed.

## Browser review

Served this directory with scripts/serve.mjs and opened the pages in the in-app browser using localhost. Main reviews used **1280×800** and **390×844** CSS px. Additional overflow checks used **320×800** for the listing, catalog and long offer, and **850×900** for the listing breakpoint. The document did not overflow horizontally at those checked widths; the category strip retains its intentional local horizontal scrolling.

Compared typography, hierarchy, borders, colors, radii, page geometry and responsive reflow with the accepted evidence. Geist Serif loaded locally; desktop card titles were 28px, mobile 26px, and the 850px intermediate rule 28px. Full offer H1 was 64px on desktop and 47px on mobile. The facts panel was sticky on desktop and appeared before reading content on mobile. The offer example also passed a final desktop review after removing its unnecessary listing composition import.

Manually exercised:

- Catalog numeric input: 100001 rejected with native range validation/focus; 18000 accepted, status and toast updated. Work-mode choice, selected category, removable chip and card save updated correctly. Saving preserved focus on the re-rendered control.
- Informational and application dialogs: focus entered the dialog; Escape closed it and returned focus to its trigger. Application copy clearly stated that no application is sent.
- Keyboard: Tab produced a visible 3px ink outline with 4px offset on the offer action link. Native fields and buttons retained keyboard behavior. This is a focused interaction check, not a full screen-reader audit.
- Listing search: LLM + Kraków returned two results. Saving ID 2, opening the offer and using the return link preserved both filters and the save state.
- Mobile filters: selecting remote changed the count to 12; the bottom action closed the dialog and returned focus to the filter trigger.
- Pagination: page 2 displayed 12 cards, current-page state and disabled next button.
- Zero search results: recovery cleared the query and restored 12 visible cards from the 24-item dataset.
- Full offer ID 7: complete long title wrapped without document overflow, with company initials. ID 10 showed explicit missing salary. Invalid ID 999 showed a recovery link.

No warning/error entries were returned by the inspected catalog browser log. This does not claim continuous monitoring across every possible interaction or browser.

## Evidence and limits

Package captures are in [verification/](verification/); original evidence stays in [reference/evidence/](reference/evidence/). These are viewport screenshots, not full-page assertions. Machine-readable check context is in [report.json](verification/report.json).

Examples use fictional static data and transient saves, with no accounts, job API, real applications or persistent storage. Dark mode, RTL, asynchronous states, real sharing permissions and full assistive-technology/zoom/text-spacing coverage were not added or comprehensively tested. The original static section-navigation underline and small metadata remain documented open questions. A global application reset must not be imported into an unrelated governed application without an explicit theme integration.
