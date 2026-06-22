# AMERICAN JOURNEY MASTER HANDOFF

## PURPOSE

This document is the authoritative onboarding and operating guide for future development sessions.

A new developer, AI assistant, or future project contributor should read this document first before making recommendations or code changes.

MASTER_MAP.md defines the vision.

MASTER_HANDOFF.md defines how development operates.

---

# PROJECT IDENTITY

## What The American Journey Is

The American Journey is a success platform designed to help people build successful, prosperous, and meaningful lives in America.

The platform improves:

* Economic Mobility
* Social Mobility
* Trust Capital
* Integration
* Self-Awareness
* Leadership
* Long-Term Contribution

Education is a mechanism.

Success is the outcome.

---

# CORE PRODUCT THESIS

The American Journey is not primarily an educational platform.

The platform is designed to improve measurable life outcomes.

Users do not want:

* Tax lessons
* Credit lessons
* Citizenship lessons

Users want:

* Jobs
* Income
* Stability
* Opportunity
* Success

The platform teaches necessary concepts in service of those outcomes.

---

# PRODUCT NORTH STAR

Help people build their version of the American Dream.

Success is measured by outcomes rather than lesson completion.

Examples:

* Employment
* Income Growth
* Credit Improvement
* Housing Stability
* Community Participation
* Leadership Development
* Long-Term Contribution

---

# STRATEGIC FRAMEWORKS

## Economic Mobility

One of the platform's highest priorities.

Examples:

* Employment Readiness
* Resume Development
* Interview Preparation
* Career Advancement
* Entrepreneurship
* Wealth Building

---

## Social Mobility

The ability to improve opportunities, relationships, networks, influence, and quality of life.

Examples:

* Professional Relationships
* Networking
* Community Participation
* Leadership Development

---

## Trust Capital

Trust Capital is accumulated through:

* Reliability
* Accountability
* Integrity
* Follow Through
* Civic Responsibility

Trust Capital increases opportunity and accelerates both social and economic mobility.

---

## Italian Immigrant Thought Experiment

A recurring product design exercise.

Question:

"If my grandparents arrived from Italy today, what would I want them to know?"

Use this framework when evaluating:

* Features
* Curriculum
* Partnerships
* Workflows
* Tools

---

# PRODUCT DECISION FILTER

Future features should be evaluated using:

1. Does this improve economic mobility?
2. Does this improve social mobility?
3. Does this improve trust capital?
4. Does this improve integration?
5. Does this improve self-awareness?
6. Does this improve long-term success?
7. Does this improve contribution?
8. Does this create measurable outcomes?

Features satisfying multiple criteria should generally receive higher priority.

---

# CURRENT STAGE ARCHITECTURE

Current stages:

1. Arrival
2. Foundation
3. Work
4. Citizenship
5. Leadership
6. Legacy

Stage Philosophy:

Arrival:
Entering the system.

Foundation:
Understanding the system.

Work:
Creating economic value.

Citizenship:
Participating in community.

Leadership:
Contributing beyond self.

Legacy:
Creating long-term impact.

---

# SUCCESS PATH PHILOSOPHY

Not all users want the same destination.

Potential paths include:

* Stability Path
* Career Path
* Entrepreneurship Path
* Investor Path
* Community Leadership Path

Users should be able to stop when they reach their desired outcome or continue pursuing additional paths.

---

# CURRENT MVP STATE

Working.

Core progression engine operational.

Authentication operational.

Progress persistence operational.

Stage unlocking operational.

Dashboard operational.

Journey operational.

Supabase operational.

---

# CURRENT VERIFIED ROUTES

Verified:

/dashboard

/journey

/journey/arrival

/journey/foundation

/login

/test-auth

Additional stage routes are expected to exist but should be verified against the file structure.

---

# CURRENT TECH STACK

Frontend:

* Next.js App Router
* React
* TypeScript
* Tailwind CSS

Backend:

* Supabase

Authentication:

* Supabase Auth

Database:

* PostgreSQL

Environment:

localhost:3000

---

# CURRENT KNOWN-GOOD FILES

app/dashboard/page.tsx

app/journey/page.tsx

app/journey/[stage]/page.tsx

app/data/stages.ts

app/lib/supabase.ts

Development should begin from verified known-good baselines whenever possible.

---

# GITHUB WORKFLOW

## Required Fields

Every issue should contain:

Priority

Type

Effort

Area

Status

---

## Status Flow

Backlog

↓

Ready

↓

Sprint

↓

In Progress

↓

Review

↓

Done

---

## Priority Definitions

P1 Critical

Blocks project direction or foundational architecture.

P2 High

Significant user value.

P3 Medium

Useful improvements.

P4 Low

Nice-to-have enhancements.

---

## Effort Definitions

XS = Less than 1 hour

S = Several hours

M = One day

L = Multiple days

XL = Major initiative

---

# DEVELOPMENT WORKFLOW

## Phase 1

Feature Identification

---

## Phase 2

GitHub Issue Creation

---

## Phase 3

Success Criteria Definition

---

## Phase 4

Implementation

---

## Phase 5

Testing

---

## Phase 6

Verification

---

## Phase 7

Issue Closure

---

## Phase 8

Next Issue Selection

---

# ENGINEERING RULES

## Rule 1

Full file replacements only.

Never provide patch-style edits.

---

## Rule 2

Use exact file paths.

Do not tell the user to search for files.

---

## Rule 3

One feature at a time.

Avoid multi-feature implementation.

---

## Rule 4

Preserve known-good baselines.

---

## Rule 5

Supabase is the source of truth.

Avoid localStorage-based architecture.

---

## Rule 6

Verify before assumptions.

Use evidence before theory.

---

# DEBUGGING FORMAT

Always use:

CURRENT FACTS

HYPOTHESIS

CONTRADICTIONS

NEXT TEST

Facts and theories must remain separate.

---

# KNOWN FAILURE MODES

1. Confusing page.tsx files.

2. Partial edits.

3. File hunting.

4. Mixing facts and hypotheses.

5. Losing track of verified facts.

6. Corrupting known-good files.

7. Assuming project structure.

8. Debugging multiple theories simultaneously.

---

# DOCUMENT HIERARCHY

The following documents should be treated as authoritative.

1. MASTER_MAP.md
2. MASTER_HANDOFF.md
3. PRODUCT_STRATEGY.md
4. Product-Roadmap.md
5. Product-Architecture.md
6. PRD.md
7. Vision.md

When conflicts occur, higher documents take precedence.

---

# REQUIRED RESPONSE BEFORE CODING

Before recommending code changes:

Summarize:

1. Current Project State
2. Current Sprint
3. Current Objective
4. Known-Good Baseline
5. Current Open Issues
6. Next Development Target

Then wait for confirmation.

---

# GUIDING PRINCIPLE

The objective is not information.

The objective is transformation.

The American Journey exists to help people become:

* Economically Successful
* Socially Mobile
* Self-Aware
* Professionally Capable
* Civically Engaged
* Community Contributors
* Long-Term Leaders
