---
id: spaces-index
title: "Spaces"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Spaces are focused session workspaces. Each space is a numbered subfolder.

STRUCTURE: spaces/NNN-{slug}/
- space.md (type: space, subtype: session) — topic + reading list via relatesTo
- NOTES.md — append-only log of what was discussed and decided

When a user selects a space, the AI loads all relatesTo files as context.
This makes switching between focused topics fast and coherent.

NAMING: NNN-{slug}/ → 001-kickoff/, 002-design-review/, 003-auth-sprint/
</flex_block>
