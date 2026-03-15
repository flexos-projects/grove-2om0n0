---
id: assets-index
title: "Assets"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Asset specs register external files with standardised metadata.

SUBTYPES: image, logo, icon, font, video, document

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-image-hero.md, 003-logo-primary.md

Each file MUST have an asset flex_block:
{
  "url": "https://...",
  "text": "alt text / description",
  "format": "jpg | png | svg | mp4 | woff2 | pdf",
  "dimensions": "1200x800",
  "usage": "how to use this asset",
  "dontUsage": "how NOT to use this asset"
}

The AI reads these when building prototypes and production pages
to use the correct images and follow usage guidelines.
</flex_block>
