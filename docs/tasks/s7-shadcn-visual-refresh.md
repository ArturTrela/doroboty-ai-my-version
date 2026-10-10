# S7 — Neutral shadcn visual refresh

## Intent

Replace the public marketplace's retro/brutalist styling with a restrained, generic shadcn/ui
system while preserving the product's Polish content, server-rendered browsing, URL filters, and
course-case workflows.

## Selected visual target

`/Users/wojtek/.codex/generated_images/01a10762-8a17-7e30-9a86-f70ecfc8639d/exec-1234b634-c64d-4794-a978-a36c19e3d72b.png`

The selected direction is search-first: a large primary search field, compact secondary filters,
and a single-column, high-scanability results list.

## Acceptance criteria

- Global tokens use Inter, neutral surfaces, subtle borders, an 8px radius, and one blue accent.
- Public navigation, footer, homepage, job listing, job detail, company, methodology, privacy,
  application, error, and empty states share the same visual language.
- `/oferty` keeps a native GET form and remains useful without JavaScript.
- Job results use a single-column list on desktop and a readable stacked layout on mobile.
- Existing routes, metadata, analytics events, auth entry points, and test selectors remain intact.
- Design QA compares the selected source image and a browser-rendered implementation at the same
  desktop viewport and records a passing result in `design-qa.md`.
- `./scripts/verify` passes before handoff.
