---
id: page-landing
title: "Landing Page"
type: page
subtype: route
status: active
sequence: 16
route: /
prototype: "prototype/landing-v1.html"
relatesTo:
  - docs/003-pages.md
  - docs/008-content.md
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

# Landing Page

**Route:** `/`
**Shell:** Marketing (light theme)
**Purpose:** Convert hotel operators from visitor to signup. Single page, no navigation maze.
**Audience:** Boutique hotel owners/managers who found Grove through word of mouth, search, or a referral.

## Sections

1. **Marketing Nav** — Sticky, backdrop blur. Logo + links (Features, Pricing, About) + CTA.
2. **Hero** — H1, sub-headline, CTA, product preview showing inbox with live conversation.
3. **How It Works** — 3-step horizontal layout with icons.
4. **For Hotels That Care** — Editorial prose section, centered.
5. **Features Overview** — 6 feature cards in responsive grid.
6. **Social Proof** — 3 testimonial quotes.
7. **Pricing Preview** — 3 plan cards (Starter, Professional, Group).
8. **Final CTA** — Forest green background, white text, signup button.
9. **Footer** — Logo, links, copyright.

## Key Interactions

- CTA buttons link to `/signup`
- Pricing link links to `/pricing`
- Smooth scroll between sections via nav links
- Intersection Observer entrance animations on scroll
- Mobile nav toggle

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/landing-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
