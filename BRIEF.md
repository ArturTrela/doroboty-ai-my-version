# DoRoboty.ai AIPH3 Case — Product Brief

**Status:** build plan  
**Created:** 2026-10-06  
**Product name:** DoRoboty.ai  
**Upstream:** `superhero-tech/superstarter`

## One sentence

DoRoboty.ai Case is a realistic, synthetic job marketplace that lets AI Product Heroes 3
participants follow one product from diagnosis through prototype, deployment,
measurement, organizational pilot, and Demo Day.

## Product boundary

This repository is not a rewrite of the public DoRoboty.ai job board. The public product
remains the acquisition and SEO surface. This repository is a forkable teaching
application with authentication, internal applications, employer decisions, controlled
experiments, and synthetic data.

The two products may share brand tokens, taxonomy, public job content, and selected
domain logic. They must not share production candidate data or authentication state.

## Why this exists

The AIPH3 prepared case needs more than a public job directory. Its central learning
depends on observing what happens after an application:

1. A long application form creates visible abandonment.
2. One-click apply increases completed applications without improving useful recruiting
   conversations.
3. Discovery identifies unclear job posts and weak candidate evidence.
4. AI writing assistance improves both texts and raises a text-based fit score.
5. The downstream outcome remains flat.
6. Participants discover that the platform improved the polish of signals while making
   them less informative about the real role and the candidate's demonstrated work.

Without internal applications, employer stage decisions, text provenance, experiment
exposure, and downstream outcomes, participants cannot discover or falsify this story.

## Learning outcome

Participants should learn to distinguish:

- interface conversion from customer outcome;
- text quality from decision-useful information;
- a plausible executive request from a validated diagnosis;
- prototype usability from product effectiveness;
- an improving proxy metric from an improving marketplace;
- AI that organizes evidence from AI that substitutes persuasive text for evidence.

The case must not teach that AI writing assistance is inherently harmful. It must contain
counterexamples and segment differences that force participants to inspect the mechanism.

## Users

### Participant

A product manager, designer, builder, engineer, or functional leader completing the
prepared AIPH3 path. They receive a forkable application, staged evidence, and weekly
deliverables.

### Candidate persona

A synthetic user who browses jobs, maintains a profile, submits an application, optionally
uses AI to draft a job-specific answer, and can attach evidence of previous work.

### Employer persona

A synthetic recruiter or hiring manager who creates a job from an internal brief, reviews
applications, invites candidates, records the first conversation, and decides whether to
continue.

### Instructor/operator

The person who prepares datasets, unlocks the next case stage, resets fixtures, validates
the intended discovery, and supports participant deployments.

### Real tester

A real person who tests a participant's prototype during week 3. Synthetic personas and
AI-generated interviews do not satisfy this program requirement.

## Primary journey through the program

### Week 1 — Agent and product context

- Run the product locally.
- Load the brief, architecture, data dictionary, and case protocol into the participant's
  agent.
- Inspect the baseline product and state the CEO hypothesis.

### Week 2 — Sense and Decide

- Analyze baseline and post-one-click datasets.
- Review interviews, tickets, and recruiting examples.
- Build an opportunity map and choose one solution direction before the week ends.

### Week 3 — Prototype

- Build a database-backed, AI-enabled prototype.
- Preserve human approval of generated text.
- Test the prototype with one real person.

### Week 4 — Deploy and Learn

- Deploy under the participant's own URL.
- Configure login and product analytics.
- Compare exposed and unexposed cohorts using case data.
- Explain what the fit score and completion rate do and do not establish.

### Week 5 — Unblock and Scale

- Define a 30-day organizational pilot.
- Address privacy, permissions, operating cost, adoption, and sponsorship.
- Build a business case tied to downstream recruiting outcomes.

### Week 6 — Demo Day

- Demonstrate a working prototype.
- Present the path from initial belief through evidence, decision, result, and next test.

## Product scope

### Public surface

- Polish homepage and job marketplace positioning.
- Job listing, filters, job detail, and company detail.
- Build / Apply / Lead taxonomy retained from the public DoRoboty.ai product.
- Responsive, accessible UI based on the DoRoboty.ai visual identity.

### Identity and workspaces

- Supabase Auth with candidate, employer, and operator roles.
- Candidate profile and employer organization membership.
- Strict RLS and server-side authorization for every mutation.
- Deterministic demo accounts for local and instructor environments only.

### Marketplace transaction

- Internal job applications.
- Long-form and one-click application variants.
- Candidate answer to “Why are you a fit for this role?”.
- Employer application inbox and recruiting stage transitions.
- Explicit first-conversation and continue/reject outcomes.

### AI assistance

- AI-assisted job-post draft from an employer's source brief.
- AI-assisted candidate application and Match Score share the same CV snapshot and candidate-authored notes. The single editor preserves notes separately from generated/edited application copy. No separate experience/evidence field is required.
- Both assistants are available immediately by authenticated role, without experiment groups
  or stage gates. Sufficient source context, ownership checks and human approval still apply.
- Human review, editing, and approval before publication or submission.
- Stored provenance and versions for source, generated, and final text.
- New applications use an evidence-based hybrid Match Score: an LLM assesses employer-approved
  requirements against submitted CV/experience, while code computes weighted scores and coverage.
  The interface shows a colored score and a short AI summary. Unknown information, source citations
  and coverage remain internal to scoring; no hiring action is automated.
- Historical teaching datasets retain their limited text-similarity proxy. These methods and
  their results must remain separate and must not be compared as one metric.

### Learning and case operations

- Reproducible synthetic data snapshots for every reveal.
- Historical synthetic cohort evidence; no live experiment assignments or exposure writes.
- PostHog events without PII plus operational outcomes in Supabase.
- Instructor reset and fixture validation.
- CSV exports and a documented data dictionary.
- Staged case packets that do not reveal later conclusions early.

## North-star outcome

The primary case outcome is:

> The number of first recruiting conversations per job after which the employer chooses
> to continue with the candidate.

Application completion, text quality, and fit score are diagnostic or proxy metrics. They
must not be presented as proof that the marketplace creates better matches.

## Non-goals

- Replacing or migrating the public DoRoboty.ai production portal.
- Processing real CVs or production candidate data during the course.
- Building a complete commercial ATS, messaging inbox, scheduling system, or payroll flow.
- Using the fit score to make or automate a hiring decision.
- Rewriting staged historical evidence to match later live-product improvements.
- Teaching “ban AI” as the conclusion.
- Requiring every participant to build every possible solution direction.
- Multi-language product UI for the first case release.

## Technical direction

- Next.js App Router, React, TypeScript, Node.js 24, and npm.
- shadcn/ui on Base UI, Tailwind CSS, and DoRoboty.ai design tokens.
- Supabase Auth and PostgreSQL with migrations and RLS.
- Vercel for participant deployments.
- PostHog Cloud EU for non-PII product events.
- Zod schemas shared by forms and server mutations.
- Synthetic fixtures only in shared course environments.
- AI provider behind a server-only interface with deterministic test doubles.

## Success criteria

- A participant can complete the same coherent product story across all six weeks.
- Baseline, one-click, and AI cohorts are reproducible from committed fixtures.
- The intended twist can be independently found by joining quantitative data,
  qualitative evidence, text provenance, and downstream recruiting outcomes.
- The data also contains counterexamples that prevent the shortcut “AI text is bad”.
- Every participant can fork, configure, deploy, and share the application.
- Week 3 can be tested with a real person without exposing production data.
- Week 4 includes working authentication and analytics, not only a clickable mockup.
- Week 5 supports a concrete 30-day pilot and business case.
- `./scripts/verify` passes from a clean checkout.

## Source hierarchy

When sources disagree, use this order:

1. `docs/case/CASE_PROTOCOL.md` for the teaching narrative and reveal rules.
2. `docs/source/aiph3-program.md` for program requirements.
3. `docs/source/aiph3-case-one-pager.md` for the current case story.
4. `docs/source/aiph3-job-board-research.md` for evidence and limits.
5. `docs/source/public-mvp-brief.md` and `public-mvp-todo.md` for reusable public-product
   taxonomy, brand, and engineering patterns only.
