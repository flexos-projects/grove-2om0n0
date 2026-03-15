---
id: page-settings-billing
title: "Settings — Billing"
type: page
subtype: route
status: active
sequence: 36
route: /settings/billing
prototype: "prototype/settings-billing-v1.html"
description: "Billing settings page showing current plan, usage counters, payment method, and invoice history. Integrates with Stripe portal for plan changes."
relatesTo:
  - core-features # F-018 Subscription Management
  - core-flows # billing flow
  - core-content # toast messages, plan limit messages
  - core-database # properties (planTier, conversationCount, conversationLimit, stripeCustomerId)
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings — Billing page.
Route: /settings/billing
Prototype: settings-billing-v1.html (pending generation)

Key decisions:
- Layout: app shell + settings sub-nav (active: Billing)
- Primary data: currentProperty for plan/usage, planLimits for tier details
- Main interactions: change plan (simulated Stripe redirect), update payment, download invoice
- Prototype controls: plan tier switcher to preview different plan states
</flex_block>

## Route
`/settings/billing`
Prototype file: `settings-billing-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
View and manage the property's subscription plan, monitor conversation usage, update payment methods via Stripe, and access invoice history.

## Layout Shell
- Shell: `app`
- Wrapper classes: `.app-layout` > `.app-sidebar` + `.app-main` > `.app-topbar` + `.app-content`
- Content area splits into settings sub-nav (left, 220px) + settings content (right, remaining space)

## App Sidebar

- **Wrapper:** `.app-sidebar`
- **Logo:** `.sidebar-logo` — "Grove" wordmark
- **Nav:** `.sidebar-nav`
  - `.nav-item` "Inbox" + `.nav-badge` (unread count) → `inbox-v1.html`
  - `.nav-item` "Guests" → `guests-v1.html`
  - `.nav-item` "Knowledge" → `knowledge-v1.html`
  - `.nav-item` "Analytics" (admin only) → `analytics-v1.html`
  - `.nav-item.active` "Settings" (admin only) → `settings-v1.html`
- **Group section** (if group plan):
  - `.sidebar-section-label` "Group"
  - `.nav-item` "Group Overview" → `group-v1.html`
  - `.nav-item` "Properties" → `group-properties-v1.html`
- **Footer:** `.sidebar-footer` — currentUser initials + name + plan badge

## Sections (top to bottom)

### Top Bar
- **Wrapper:** `.app-topbar`
- **Copy:** `.page-title` "Settings"
- **Components used:** `.text-h1`

### Settings Sub-Navigation
- **Wrapper:** Vertical nav list, left column (220px)
- **Components used:** `.nav-item`, `.nav-item.active`
- **Items:**
  - `.nav-item` "Property" → `settings-property-v1.html`
  - `.nav-item` "Team" → `settings-team-v1.html`
  - `.nav-item` "Routing" → `settings-routing-v1.html`
  - `.nav-item` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item.active` "Billing" → `settings-billing-v1.html`

### Page Header
- **Wrapper:** `.page-header`
- **Copy:** H2 (`.text-h2`): "Billing"
- **Components used:** `.page-title`, `.text-h2`

### Current Plan Card
- **Wrapper:** `.card`
- **Components used:** `.text-h3`, `.text-body`, `.text-secondary`, `.text-small`, `.badge`, `.btn`, `.btn-md`, `.btn-secondary`
- **Content:**
  - Plan name (`.text-h3`): "Professional" (or current plan tier, capitalised)
  - Price (`.text-body`): "$349/month per property" (varies by tier)
  - Key features list (`.text-small .text-secondary`):
    - Starter: "1 property, 500 conversations/month, 2 staff seats, AI auto-responses"
    - Professional: "1 property, unlimited conversations, 5 staff seats, custom AI voice, request routing, white-label SMS"
    - Group: "3-20 properties, unlimited conversations, 15 seats/property, cross-property recognition, group analytics, API access"
  - Button (`.btn .btn-md .btn-secondary`): "Change Plan"
- **Data:** `MOCK_DB.currentProperty.planTier`, `MOCK_DB.helpers.getPlanLimits(MOCK_DB.currentProperty.planTier)`

### Usage This Month (Starter only)
- **Wrapper:** `.card` (conditionally shown when planTier === 'starter')
- **Components used:** `.text-h3`, `.text-body`, `.text-secondary`, `.progress`, `.progress-fill`, `.progress-fill.warning`, `.progress-fill.danger`
- **Content:**
  - H3 (`.text-h3`): "Usage This Month"
  - Count (`.text-body`): "{conversationCount} of {conversationLimit} conversations"
  - Progress bar (`.progress` > `.progress-fill`): width = (conversationCount / conversationLimit) * 100%
    - Normal: `.progress-fill` (green)
    - 80-94%: `.progress-fill.warning` (amber)
    - 95-100%: `.progress-fill.danger` (red)
  - Warning text (shown at 80%+, `.text-small .text-secondary`): from `MOCK_DB.copy.planLimitMessages`
- **Data:** `MOCK_DB.currentProperty.conversationCount`, `MOCK_DB.currentProperty.conversationLimit`

### Payment Method
- **Wrapper:** `.card`
- **Components used:** `.text-h3`, `.text-body`, `.text-secondary`, `.text-small`, `.btn`, `.btn-sm`, `.btn-secondary`
- **Content:**
  - H3 (`.text-h3`): "Payment Method"
  - Card display (`.text-body`): "Visa ending in 4242"
  - Expiry (`.text-small .text-secondary`): "Expires 12/2027"
  - Button (`.btn .btn-sm .btn-secondary`): "Update"
- **Data:** Hardcoded prototype data (****4242, 12/2027)

### Invoice History
- **Wrapper:** `.table-wrapper`
- **Components used:** `.table`, `.text-h3`, `.text-body`, `.text-small`, `.text-secondary`, `.badge`, `.badge-active`, `.btn`, `.btn-sm`, `.btn-ghost`
- **Copy:** H3 (`.text-h3`): "Invoice History"
- **Columns:** Date, Amount, Status, Actions
- **Prototype data rows:**
  - March 1, 2026 | $349.00 | `.badge .badge-active` "Paid" | "Download PDF" `.btn .btn-sm .btn-ghost`
  - February 1, 2026 | $349.00 | `.badge .badge-active` "Paid" | "Download PDF" `.btn .btn-sm .btn-ghost`
  - January 1, 2026 | $349.00 | `.badge .badge-active` "Paid" | "Download PDF" `.btn .btn-sm .btn-ghost`

## Interactive States

### Change Plan
- **Trigger:** Click "Change Plan" button
- **Implementation:**
  ```js
  async function changePlan() {
    showToast('Redirecting to billing portal...', 'info')
    await new Promise(resolve => setTimeout(resolve, 1500))
    // In production: redirect to Stripe Customer Portal
    // In prototype: just show the toast
  }
  ```
- **After:** Toast: "Redirecting to billing portal..." (`.toast-info`)

### Update Payment Method
- **Trigger:** Click "Update" button on payment method card
- **Implementation:**
  ```js
  async function updatePayment() {
    showToast('Redirecting to billing portal...', 'info')
    await new Promise(resolve => setTimeout(resolve, 1500))
    // In production: redirect to Stripe Customer Portal
  }
  ```
- **After:** Toast: "Redirecting to billing portal..." (`.toast-info`)

### Download Invoice
- **Trigger:** Click "Download PDF" on an invoice row
- **Implementation:**
  ```js
  function downloadInvoice(invoiceId) {
    showToast('Downloading invoice...', 'info')
    // In prototype: simulated, no actual download
  }
  ```
- **After:** Toast: "Downloading invoice..." (`.toast-info`)

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-success`, `.toast-info`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Plan tier | `MOCK_DB.currentProperty.planTier` | "starter", "professional", or "group" |
| Plan limits/features | `MOCK_DB.helpers.getPlanLimits(MOCK_DB.currentProperty.planTier)` | Seat limits, conversation limits, features |
| Conversation count | `MOCK_DB.currentProperty.conversationCount` | Current month usage |
| Conversation limit | `MOCK_DB.currentProperty.conversationLimit` | null for unlimited |
| Plan limit messages | `MOCK_DB.copy.planLimitMessages` | Warning text at 80%/95% |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Starter at 80% usage | conversationCount >= 400 out of 500 | Progress bar turns warning (amber), warning message shown |
| Starter at 95% usage | conversationCount >= 475 out of 500 | Progress bar turns danger (red), urgent message shown |
| Starter at 100% usage | conversationCount >= 500 | Progress bar full + danger, message: "You've reached your monthly conversation limit." from `MOCK_DB.copy.toasts` |
| Professional/Group plan | planTier !== 'starter' | Usage section hidden entirely (unlimited conversations) |
| No invoices | New property, first month | "No invoices yet." (`.text-small .text-secondary`) below Invoice History heading |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Inbox | inbox-v1.html | Always |
| Guests | guests-v1.html | Always |
| Knowledge | knowledge-v1.html | Always |
| Analytics | analytics-v1.html | Admin only |
| Settings | settings-v1.html | Admin only |
| Property | settings-property-v1.html | Settings sub-nav |
| Team | settings-team-v1.html | Settings sub-nav |
| Routing | settings-routing-v1.html | Settings sub-nav |
| Quick Actions | settings-quick-actions-v1.html | Settings sub-nav |
| AI Voice | settings-ai-voice-v1.html | Settings sub-nav |
| Billing | settings-billing-v1.html | Settings sub-nav, current |
| Group Overview | group-v1.html | Group plan only |
| Properties | group-properties-v1.html | Group plan only |

## Prototype Controls
- **Plan tier switcher:** `.prototype-label` "Plan Tier" + 3 toggle buttons (Starter / Professional / Group)
  - Switches the displayed plan name, price, features, and toggles the usage section visibility
  - Implementation:
    ```js
    const previewTier = ref(MOCK_DB.currentProperty.planTier)
    const tierConfig = computed(() => {
      const configs = {
        starter: { name: 'Starter', price: '$149/month per property' },
        professional: { name: 'Professional', price: '$349/month per property' },
        group: { name: 'Group', price: '$249/month per property (min 3)' }
      }
      return configs[previewTier.value]
    })
    ```

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/settings-billing-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
