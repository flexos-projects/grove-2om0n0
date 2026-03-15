---
id: commits-index
title: "Commits"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Commits are AUTO-GENERATED changelog entries. Do not create manually.

Generated whenever specs are created or significantly changed. Records:
- What changed (which files, what was added/modified)
- Why it changed (user's original request/intent)
- When it changed

At build time, the AI reads commits chronologically to understand how
the project evolved and resolve conflicts between earlier and later decisions.

NAMING: NNN-{slug}.md — sequential, monotonic
EXAMPLE: 001-initial-brief.md, 002-holy-docs-generated.md
</flex_block>
