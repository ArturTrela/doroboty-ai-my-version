# S8 — Untitled whole-app conversion

## Intent

Apply the Graphical UI **Untitled** revision `rn52x5tim2y8` to the complete DoRoboty.ai
application without changing its routes, data flows, interaction behavior, or Base UI primitives.

## Mapping

- Theme tokens live in `tokens.css`; shadcn semantic aliases continue to work through named
  Untitled tokens in light and dark mode.
- Timeless Sans Variable is loaded as the free Timeless Grotesk role fallback and pinned to the
  vendor-recommended `STYL=0`, `ital=0` axes.
- Existing Lucide icons remain the application icon set with the theme's 2px stroke.
- Shared components are the conversion boundary for buttons, fields, selects, dialogs, badges,
  separators, labels, and loading states.
- Existing layouts keep their information architecture but use Untitled spacing, type, radii,
  surfaces, shadows, focus states, and navigation emphasis.

## Component coverage

| Component / area             | Status    | Evidence or reason                                                                                                  |
| ---------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| Global tokens and typography | Converted | Exact Untitled palette, scale, radius, motion, font roles, and light/dark aliases in `tokens.css` and `globals.css` |
| Button                       | Converted | Effective Untitled Button assignment; Base UI API preserved                                                         |
| Input and textarea           | Converted | Text field assignment; textarea intentionally preserves multiline behavior                                          |
| Select and portal            | Converted | Select assignment including popup, option, selected, disabled, and scroll states                                    |
| Checkbox                     | Converted | Base UI checkbox with Untitled geometry, fills, indicator, focus, disabled, and checked states                       |
| Dialog and alert dialog      | Converted | Dialog assignments including themed backdrop, portal typography, motion, and elevation                              |
| Label and separator          | Converted | Text field label and explicit 1px separator assignments                                                             |
| Badge                        | Converted | Custom component mapped to Untitled surfaces, status colors, type, and radii                                        |
| Skeleton                     | Converted | Custom component mapped to the Untitled muted surface and radius                                                    |
| Public marketplace           | Converted | Homepage, jobs, filters, job/company detail, forms, methodology, privacy, and shell                                 |
| Auth and operator workspace  | Converted | Global provider plus auth, candidate, employer, operator, dashboard, and case surfaces                              |
| Components and demo routes   | Converted | Shared primitives, dark-mode controls, dashboard, settings, and example dialog                                      |

## Acceptance criteria

- Every theme-controlled value uses a named token, including both color modes.
- Shared components implement the effective Untitled assignments and preserve Base UI APIs.
- Popup content inherits the active font, mode, and theme variables.
- Public, auth, operator, demo, error, loading, and empty states share the Untitled language.
- Focus, hover, pressed, invalid, disabled, and reduced-motion behavior remain distinct.
- The Graphical audit has no unresolved in-scope drift, or each exception is recorded above.
- Formatting, linting, types, tests, build, and visual smoke checks pass.

## Graphical audit

Inspected scope: the complete `src/` application, shared primitives, theme source, both modes, and
the rendered public, settings, and component-dialog surfaces. The active baseline is Untitled
revision `rn52x5tim2y8`; repairs were included in the request.

| Impact | Location(s)                                               | Evidence and effect                                                                                                                         | Existing-theme replacement                                                                                                                 | Status |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| High   | `tokens.css`, `src/app/globals.css`, shared UI primitives | The former Inter/neutral-blue system and native component borders bypassed the selected theme across every route.                           | Untitled named roles, Timeless Grotesk, zero native borders, tokenized edge shadows, and effective component assignments.                  | Fixed  |
| High   | `tokens.css`, workspace and page surfaces                 | A legacy inset edge alias, offset-card usages, all-caps headings, and oversized dashboard-card type survived the first conversion pass.     | The Untitled zero-width edge contract, restrained heading roles, exact shadow values, and shared surface treatments.                       | Fixed  |
| Medium | Public and authenticated pages                            | Repeated 2px borders, offset shadows, 700 weight, and local control treatments competed with the shared components.                         | Untitled surfaces, 400/500/600 weights, radius roles, shared edge/divider shadows, and shared control states.                              | Fixed  |
| Medium | Filters, case controls, and dashboard selection            | Native controls and one-off action links diverged from the shared Button, Text field, Select, Label, and Checkbox assignments.               | Shared variants plus exact 2px cyan focus outlines, 15px field labels, neutral-3 control fills, and the Base UI checkbox.                  | Fixed  |
| High   | Public text and links                                     | Untitled neutral 7 and cyan text measured 3.97–4.11:1 and 2.44:1 on light surfaces, failing the repository's WCAG AA gate.                  | An accessibility semantic uses Untitled neutral 8 for secondary copy and Untitled color 2 for light-mode links; dark links retain color 1. | Fixed  |
| Low    | Portal surfaces                                           | Theme ownership previously existed only in nested app/demo providers, so public routes and detached portals had inconsistent mode coverage. | One root provider and global named variables; computed dialog font, surface, radius, and shadow were verified in dark mode.                | Fixed  |

### Exceptions and gaps

- The DoRoboty.ai two-part brand mark is intentionally preserved as brand artwork; its radii and
  colors now resolve through Untitled tokens.
- `icon.svg` contains the literal Untitled cyan and neutral-2 values because a standalone favicon
  cannot consume runtime CSS variables.
- Secondary text and text-link roles intentionally choose more contrast than the raw Untitled CTE
  assignment. They use colors already present in the supplied theme and are required for WCAG AA.
- Structural widths, grid ratios, breakpoints, and responsive positioning remain application-owned.
- No unresolved in-scope theme gaps remain.

### Verification

- Source audit: searched all application source for literal colors, native edges, legacy offset
  shadows, all-caps treatments, non-theme radii, motion, tracking, unsupported font weights,
  inline styles, and unresolved variables.
- Behavior: `npm run check` covers formatting, lint, type generation, 39 unit tests, production
  build, and 15 Playwright flows including keyboard, no-JavaScript, responsive, dark-mode
  persistence, and axe checks.
- Visual: inspected `/`, `/oferty`, `/demo`, `/demo/settings`, and `/components`; checked the
  dashboard and settings surfaces in light and dark mode plus a focused dialog portal.
- Runtime evidence: body and portal resolve to `"Timeless Grotesk", sans-serif`; `STYL` and `ital`
  are pinned to `0`; Lucide resolves to a 2px stroke; dark dialog resolves to neutral 2, 13px
  radius, and the Untitled medium shadow.
