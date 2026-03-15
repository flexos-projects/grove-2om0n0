---
id: page-about
title: "About Page"
type: page
subtype: route
status: active
sequence: 20
route: /about
prototype: "prototype/about-v1.html"
description: "Company story, mission statement, and team section for Grove."
relatesTo:
  - core-content # about page copy
  - core-design # design direction
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the About page.
Route: /about
Prototype: about-v1.html (pending generation)

Key decisions:
- Layout: marketing shell (nav + sections + footer)
- Primary data source: Static copy from content doc
- Main interaction: None — static page
</flex_block>

## Route
`/about`
Prototype file: `about-v1.html`
Theme: `light`
Auth required: `no`

## Purpose
Tell the Grove company story and mission to build trust with prospective hotel operators.

## Layout Shell
- Shell: `marketing`
- Wrapper classes: `.marketing-page`
- Each section uses `.marketing-section` > `.marketing-inner`
- Top navigation: `.marketing-nav` > `.marketing-nav-inner`

## Sections (top to bottom)

### Navigation Bar
- **Wrapper:** `.marketing-nav` > `.marketing-nav-inner`
- **Data:** Static
- **Components used:** `.btn`, `.btn-sm`, `.btn-primary`, `.btn-ghost`
- **Left:** Grove logo (text wordmark, links to `landing-v1.html`)
- **Right:** Nav links — "Pricing" (links to `pricing-v1.html`), "About" (current, `.text-brand`), "Contact" (links to `contact-v1.html`), "Log In" (`.btn-ghost`, links to `login-v1.html`), "Start Free Trial" (`.btn-primary .btn-sm`, links to `signup-v1.html`)

### Hero Section
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Data:** Static copy
- **Copy:**
  - H1 (`.text-display`): "Built for hotels that care about the details."
- **Components used:** `.text-display`

### Mission Prose
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Data:** Static copy from Doc 8
- **Copy (`.text-body`, rendered as prose paragraphs with generous spacing):**
  - Paragraph 1: "Grove was born from a simple observation: the best hotels in the world are small ones, and they're being forced to choose between personal service and operational sanity."
  - Paragraph 2: "We build software that meets the standard boutique hotel operators set for everything else in their property — the linens, the lighting, the music in the lobby. Technology that's invisible to guests and intuitive for staff."
  - Paragraph 3: "We're a small team of hospitality nerds and engineers who believe that software for beautiful hotels should itself be beautiful."
- **Components used:** `.text-body`

### Team Section
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Data:** Static placeholder
- **Copy:**
  - Section heading (`.text-h2`): "The team"
  - Subtext (`.text-body .text-secondary`): "A small team of hospitality nerds and engineers."
  - Placeholder: 3-4 team member cards in a grid. Each card shows:
    - Circular avatar placeholder (grey circle, 80px)
    - Name (`.text-h4`): e.g., "Placeholder Name"
    - Role (`.text-small .text-secondary`): e.g., "Co-founder & CEO"
  - Note: Use `.prototype-label` to mark this section as "Team photos and bios pending"
- **Components used:** `.text-h2`, `.text-h4`, `.text-body`, `.text-small`, `.text-secondary`, `.prototype-label`

### CTA Section
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Copy:**
  - Heading (`.text-h2`): "Give your guests the concierge they deserve."
  - Sub (`.text-body .text-secondary`): "Free 14-day trial. No credit card required."
  - CTA (`.btn .btn-lg .btn-primary`): "Start Free Trial" → `signup-v1.html`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.btn`, `.btn-lg`, `.btn-primary`

### Footer
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Copy:** Links to Pricing, About, Contact, Log In. Copyright "© 2026 Grove". Contact email.

## Interactive States

None. This is a static marketing page.

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| N/A | N/A | All content is static copy |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| N/A | N/A | Static page, no edge cases |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Grove logo | landing-v1.html | Always |
| "Pricing" | pricing-v1.html | Always |
| "Contact" | contact-v1.html | Always |
| "Log In" | login-v1.html | Always |
| "Start Free Trial" (nav) | signup-v1.html | Always |
| "Start Free Trial" (CTA) | signup-v1.html | Always |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/about-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
