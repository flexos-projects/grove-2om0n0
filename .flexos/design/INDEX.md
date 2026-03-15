---
id: design-index
title: "Design Specs"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Design specs define HOW THE PRODUCT LOOKS AND FEELS.

SUBTYPES:
- tokens: Design tokens (colours, typography, spacing, radii, shadows, transitions)
- patterns: CSS component class vocabulary
- reference: Brand guidelines, visual references, mood boards

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-tokens-design-system.md, 002-patterns-base.md

001-tokens-design-system.md MUST contain tokens flex_blocks — one per category:
categories: colors (dark + light), typography, spacing, radii, shadows, transitions
These blocks are read by flexos-tokens to generate prototype/shared/tokens.css.
NEVER edit tokens.css directly — update this spec and regenerate.

002-patterns-base.md documents CSS component classes.
These map 1:1 to Vue component names in the production app.
</flex_block>
