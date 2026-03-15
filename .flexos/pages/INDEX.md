---
id: pages-index
title: "Page Specs"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Page specs define WHAT APPEARS ON SCREEN and serve as building briefs for prototypes.

SUBTYPES:
- route: A page with a URL. Has a `route` field (e.g., /dashboard).
- component: A reusable UI element without its own URL.
- layout: A page shell/wrapper (app shell, marketing layout, auth layout).
- overlay: Modal, drawer, sheet — appears over another page.

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-route-landing.md, 005-component-conversation-panel.md

Route specs include:
- route: /path
- prototype: prototype/{slug}-vN.html (once generated)
- prototypes flex_block listing all versions
- Full building brief: layout, sections, data bindings, interactive states, copy

NAVIGATION LINKS use clean paths (/preview/slug), never versioned filenames.
</flex_block>
