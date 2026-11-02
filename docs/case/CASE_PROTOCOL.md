# Frontend Teaching Case Protocol

## Current contract

The application is a browser-local UX prototype. The previous requirements for a database-backed product, live identity, AI provider and analytics are superseded. All participants can select personas and exercise the prepared flows without credentials or services.

## Narrative

Employers publish jobs; candidates submit applications; employers record recruiting stages and decisions. The initial executive hypothesis is that more completed applications will improve recruiting outcomes. Treat this as a hypothesis to test, not the diagnosis.

The primary historical outcome is employer continuation after the first conversation per job. Completion and text-based fit scores are proxies, never hiring recommendations. Real prototype tests assess usability; prepared outcomes do not demonstrate effectiveness.

## Data boundaries

- Interactive records and historical evidence are separate. Reset/import does not rewrite the baseline packet.
- The baseline packet contains 120 historical synthetic journeys with stable IDs/timestamps, plus stage-safe funnel/outcome columns.
- Source notes, generated copy and approved copy remain distinct in interactive applications. Submitted CV and identity are snapshots.
- Scenario Match Scores are fixed persona examples, not new assessments or historical text-similarity scores. Do not combine them into one trend.
- No real CVs or personal data; no service keys or operator secrets. Role selection does not enforce confidentiality.

## Stage-safe distribution

Only baseline evidence ships in this version. No release picker, future-stage generator or hidden later dataset may be bundled. Instructor canonical materials under docs/source and Git history must be excluded from participant distributions. Use package:participant and inspect its output before course release. Hiding data in JavaScript or an operator screen is not access control.

## Weekly deliverables

1. Run the prototype and give the agent the product context.
2. Analyze currently released evidence and choose a solution direction.
3. Extend the frontend and test it with a real person using synthetic data.
4. Share a static build and explain observations and limits.
5. Propose a 30-day organizational pilot with assumptions about privacy, permissions, costs and adoption.
6. Demonstrate the prototype and the reasoning from initial belief to the next experiment.

Future evidence releases and course approval remain instructor activities. No local test pass proves course release approval.
