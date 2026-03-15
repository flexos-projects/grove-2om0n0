---
id: builds-index
title: "Builds"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Builds track the lifecycle of production code generation.
Each build is a numbered subfolder containing:
- config.md — build configuration
- agent.md — builder AI instructions
- log.md — execution log (append-only)
- BUILD-MANIFEST.json — machine-readable task state
- tasks/NNN-{slug}.md — individual build tasks
- debug/NNN-{slug}.md — bug reports and fixes

TASK STATUS: pending → in-progress → done | failed | blocked
DEBUG SEVERITY: critical, high, medium, low

NAMING: NNN-{name}/ → 001-mvp/, 002-auth-billing/
</flex_block>
