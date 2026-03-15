---
id: page-settings
title: "Settings Hub"
type: page
subtype: route
status: active
sequence: 31
route: /settings
prototype: "prototype/settings-v1.html"
description: "Settings hub page with sub-navigation linking to all settings sub-pages. Defaults to showing Property settings. Admin only."
relatesTo:
  - core-pages # settings overview
  - core-features # F-013 Property Settings
  - core-design # sidebar nav, tab patterns
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings hub page.
Route: /settings
Prototype: settings-v1.html (pending generation)

Key decisions:
- Layout: app shell with settings sub-navigation
- Hub page that shows Property settings by default
- Sub-nav is a vertical list inside the content area (settings sidebar pattern)
- Admin-only access
</flex_block>

## Route
`/settings`
Prototype file: `settings-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
Central settings hub that provides navigation to all settings sub-pages. Defaults to showing the Property settings view. Acts as the entry point for all property configuration.

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
- **Wrapper:** Vertical nav list inside `.app-content`, left column (220px)
- **Components used:** `.nav-item`, `.nav-item.active`
- **Items:**
  - `.nav-item.active` "Property" → `settings-property-v1.html`
  - `.nav-item` "Team" → `settings-team-v1.html`
  - `.nav-item` "Routing" → `settings-routing-v1.html`
  - `.nav-item` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item` "Billing" → `settings-billing-v1.html`

### Settings Content Area
- **Wrapper:** Right column, remaining space
- **Content:** Loads Property settings by default (same content as `/settings/property`)
- **Data:** `MOCK_DB.currentProperty` for property fields
- **Note:** In the prototype, the hub page renders the Property settings inline. Sub-nav links navigate to individual prototype files.

## Interactive States

### Settings Navigation
- **Trigger:** Click any settings sub-nav item
- **Vue refs:**
  ```js
  const activeSettingsTab = ref('property')
  ```
- **Implementation:**
  ```js
  function navigateSettings(tab) {
    // In prototype, navigate to the sub-page file
    const routes = {
      property: 'settings-property-v1.html',
      team: 'settings-team-v1.html',
      routing: 'settings-routing-v1.html',
      'quick-actions': 'settings-quick-actions-v1.html',
      'ai-voice': 'settings-ai-voice-v1.html',
      billing: 'settings-billing-v1.html'
    }
    window.location.href = routes[tab]
  }
  ```
- **Before:** Property tab active, Property settings content visible
- **After:** Navigates to the selected sub-page

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |
| Plan badge in sidebar | `MOCK_DB.currentProperty.planTier` | Shown in sidebar footer |
| Group nav visibility | `MOCK_DB.currentProperty.planTier === 'group'` | Only show group section if group plan |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Non-admin access | Staff user navigates to /settings | Redirect to /inbox (not shown in prototype) |
| No group plan | Property is starter or professional | Group section hidden from sidebar |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Inbox | inbox-v1.html | Always |
| Guests | guests-v1.html | Always |
| Knowledge | knowledge-v1.html | Always |
| Analytics | analytics-v1.html | Admin only |
| Settings | settings-v1.html | Admin only, current |
| Property | settings-property-v1.html | Always (default) |
| Team | settings-team-v1.html | Always |
| Routing | settings-routing-v1.html | Always |
| Quick Actions | settings-quick-actions-v1.html | Always |
| AI Voice | settings-ai-voice-v1.html | Always |
| Billing | settings-billing-v1.html | Always |
| Group Overview | group-v1.html | Group plan only |
| Properties | group-properties-v1.html | Group plan only |

## Prototype Controls
No dev toggles needed. The hub page simply renders Property settings by default.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/settings-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
