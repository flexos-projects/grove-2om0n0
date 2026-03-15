---
id: page-pricing
title: "Pricing Page"
type: page
subtype: route
status: active
sequence: 19
route: /pricing
prototype: "prototype/pricing-v1.html"
description: "Plan comparison page with three pricing tiers, feature table, FAQ accordion, and CTA."
relatesTo:
  - core-features # plan tiers and limits
  - core-content # pricing copy
  - core-database # planLimits
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Pricing page.
Route: /pricing
Prototype: pricing-v1.html (pending generation)

Key decisions:
- Layout: marketing shell (nav + sections + footer)
- Primary data source: MOCK_DB.planLimits for tier limits, static copy for everything else
- Main interaction: FAQ accordion toggle
</flex_block>

## Route
`/pricing`
Prototype file: `pricing-v1.html`
Theme: `light`
Auth required: `no`

## Purpose
Show the three Grove pricing tiers side-by-side so hotel operators can compare plans and start a free trial.

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
- **Right:** Nav links — "Pricing" (current, `.text-brand`), "About" (links to `about-v1.html`), "Contact" (links to `contact-v1.html`), "Log In" (`.btn-ghost`, links to `login-v1.html`), "Start Free Trial" (`.btn-primary .btn-sm`, links to `signup-v1.html`)

### Page Header
- **Wrapper:** `.marketing-section` > `.marketing-inner` > `.page-header`
- **Data:** Static copy
- **Copy:**
  - H1 (`.text-display`): "Simple pricing. No surprises."
  - Subtitle (`.text-body .text-secondary`): "Every plan includes AI-powered SMS concierge. Choose the one that fits."
- **Components used:** `.page-header`, `.text-display`, `.text-body`, `.text-secondary`

### Plan Cards
- **Wrapper:** `.marketing-section` > `.marketing-inner` > 3-column grid
- **Data:** `MOCK_DB.planLimits` for conversation limits and seat counts
- **Components used:** `.card`, `.text-h3`, `.text-body`, `.text-small`, `.text-secondary`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-secondary`, `.badge`, `.badge-active`

#### Starter Card
- **Copy:**
  - Plan name (`.text-h3`): "Starter"
  - Price (`.text-display`): "$149"
  - Period (`.text-secondary`): "/month per property"
  - Description (`.text-body .text-secondary`): "For hotels trying Grove for the first time"
  - Features list:
    - "1 property"
    - "500 conversations/month"
    - "AI auto-responses"
    - "2 staff seats"
    - "Email support"
  - CTA (`.btn .btn-md .btn-secondary`): "Start Free Trial" → `signup-v1.html`

#### Professional Card (recommended)
- **Copy:**
  - Badge (`.badge .badge-active`): "Recommended"
  - Plan name (`.text-h3`): "Professional"
  - Price (`.text-display`): "$349"
  - Period (`.text-secondary`): "/month per property"
  - Description (`.text-body .text-secondary`): "For hotels ready to make Grove their standard"
  - Features list:
    - "Everything in Starter, plus:"
    - "Unlimited conversations"
    - "Custom AI voice training"
    - "5 staff seats"
    - "Guest memory & recognition"
    - "Request routing"
    - "White-label SMS"
    - "Priority support"
  - CTA (`.btn .btn-md .btn-primary`): "Start Free Trial" → `signup-v1.html`
- **Visual emphasis:** Slightly elevated card (extra shadow or border accent)

#### Group Card
- **Copy:**
  - Plan name (`.text-h3`): "Group"
  - Price (`.text-display`): "$249"
  - Period (`.text-secondary`): "/month per property (min 3)"
  - Description (`.text-body .text-secondary`): "For hotel groups running multiple properties"
  - Features list:
    - "Everything in Professional, plus:"
    - "3-20 properties"
    - "15 seats per property"
    - "Cross-property guest recognition"
    - "Group analytics"
    - "API access"
    - "Dedicated onboarding"
  - CTA (`.btn .btn-md .btn-secondary`): "Contact Sales" → `contact-v1.html`

### Feature Comparison Table
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Data:** `MOCK_DB.planLimits` for limit values
- **Components used:** `.text-h2`, `.text-small`, `.text-secondary`
- **Copy:**
  - Section heading (`.text-h2`): "Compare plans"
  - Table columns: Feature | Starter | Professional | Group
  - Rows:
    - "Properties" | "1" | "1" | "3-20"
    - "Conversations/month" | "500" | "Unlimited" | "Unlimited"
    - "Staff seats" | "2" | "5" | "15/property"
    - "AI auto-responses" | check | check | check
    - "Custom AI voice" | dash | check | check
    - "Guest memory" | dash | check | check
    - "Request routing" | dash | check | check
    - "Knowledge entries" | "50" | "Unlimited" | "Unlimited"
    - "White-label SMS" | dash | check | check
    - "Cross-property recognition" | dash | dash | check
    - "Group analytics" | dash | dash | check
    - "API access" | dash | dash | check
    - "Support" | "Email" | "Priority" | "Dedicated"

### FAQ Section
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Data:** Static copy
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.card`
- **Copy:**
  - Section heading (`.text-h2`): "Frequently asked questions"
  - Q1: "What happens when I hit my conversation limit?"
    A1: "AI auto-responses pause, but your team can still respond manually. You'll see a banner with the option to upgrade."
  - Q2: "Can I switch plans anytime?"
    A2: "Yes. Upgrades take effect immediately. Downgrades take effect at your next billing date."
  - Q3: "Is there a contract?"
    A3: "No. Month-to-month. Cancel anytime."
  - Q4: "What counts as a conversation?"
    A4: "A conversation is a thread of messages with one guest. Multiple messages in the same visit count as one conversation."
  - Q5: "Do guests need to download anything?"
    A5: "No. Grove works over standard SMS. Guests just text a phone number."

### Final CTA
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Copy:**
  - Heading (`.text-h2`): "Give your guests the concierge they deserve."
  - Sub (`.text-body .text-secondary`): "Free 14-day trial. No credit card required."
  - CTA (`.btn .btn-lg .btn-primary`): "Start Free Trial" → `signup-v1.html`

### Footer
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Copy:** Links to Pricing, About, Contact, Log In. Copyright "© 2026 Grove". Contact email.

## Interactive States

### FAQ Accordion
- **Trigger:** Click on a FAQ question row
- **Vue ref:** `const openFaq = ref(null)`
- **Implementation:**
  ```js
  // Vue 3 setup
  const openFaq = ref(null)

  function toggleFaq(index) {
    openFaq.value = openFaq.value === index ? null : index
  }
  ```
- **Template:**
  ```html
  <div v-for="(faq, index) in faqs" :key="index" class="card"
       @click="toggleFaq(index)" style="cursor: pointer; margin-bottom: 0.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span class="text-body">{{ faq.question }}</span>
      <span class="text-secondary">{{ openFaq === index ? '−' : '+' }}</span>
    </div>
    <p v-if="openFaq === index" class="text-body text-secondary" style="margin-top: 0.75rem;">
      {{ faq.answer }}
    </p>
  </div>
  ```
- **Before:** All FAQ items collapsed, only questions visible
- **After:** Clicked item expands to show answer; clicking again collapses

### Plan Card Hover
- **Trigger:** Mouse hover on plan card
- **Vue ref:** N/A (CSS only)
- **Implementation:** CSS transition on `.card` — on hover, elevate shadow from `--shadow-xs` to `--shadow-md`
- **Before:** Card at rest with `--shadow-xs`
- **After:** Card elevated with `--shadow-md`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Starter conversation limit | `MOCK_DB.planLimits.starter` | Display "500" for conversations/month |
| Professional seat count | `MOCK_DB.planLimits.professional` | Display "5" for staff seats |
| Group seat count | `MOCK_DB.planLimits.group` | Display "15" for seats per property |
| Plan limits helper | `MOCK_DB.helpers.getPlanLimits(tier)` | Can use to dynamically populate comparison table |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| All FAQs closed | Default state | All answer sections hidden |
| Multiple FAQ clicks | Click different questions rapidly | Only one open at a time (accordion pattern) |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Grove logo | landing-v1.html | Always |
| "Start Free Trial" (nav) | signup-v1.html | Always |
| "Start Free Trial" (Starter) | signup-v1.html | Always |
| "Start Free Trial" (Professional) | signup-v1.html | Always |
| "Contact Sales" (Group) | contact-v1.html | Always |
| "Log In" | login-v1.html | Always |
| "About" | about-v1.html | Always |
| "Contact" | contact-v1.html | Always |

## Prototype Controls
No dev toggles needed — static page with FAQ accordion only.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/pricing-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
