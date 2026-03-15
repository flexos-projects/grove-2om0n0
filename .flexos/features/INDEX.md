---
id: features-index
title: "Feature Specs"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Feature specs define WHAT THE APP DOES. Each file is one feature.

SUBTYPES:
- primary: Core features that define the app
- secondary: Supporting features reused across primaries (notifications, search, export)

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-primary-core-feature.md, 004-secondary-notifications.md

Each file should include:
- What the feature does (user-facing description)
- Key behaviours (specific interactions and rules)
- Acceptance criteria (testable requirements)
- relatesTo: linked page specs, flow specs, database specs

STATUS: roadmap (planned for future), active (being built/live), archived (removed).
</flex_block>
