---
id: flows-index
title: "Flow Specs"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Flow specs define HOW THINGS HAPPEN — user journeys, auth flows, backend processes.

SUBTYPES:
- user: A journey a person takes through the product
- auth: Authentication and authorisation flows
- backend: System processes without direct user interaction

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-user-onboarding-journey.md, 003-auth-login.md

Each file includes:
- flow flex_block with structured step JSON (steps, decisions, end points)
- Prose: happy path, decision points, error states
- Email/notification trigger table
- Data operations per step

flow flex_block format: { "steps": [{ "id", "type", "label", "actor", "next" }] }
Step types: action, decision, end
Actors: user, system, admin
</flex_block>
