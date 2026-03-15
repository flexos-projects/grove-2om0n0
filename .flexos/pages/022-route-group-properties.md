---
id: page-group-properties
title: "Group — Properties"
type: page
subtype: route
status: active
sequence: 39
route: /group/properties
prototype: "prototype/group-properties-v1.html"
description: "Property management page for hotel groups showing all properties as cards with key metrics. Allows adding new properties and navigating to individual property dashboards."
relatesTo:
  - core-features # F-017 Group Analytics
  - core-database # groups, properties, propertyMembers collections
  - core-design # cards, badges, stats
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Group Properties page.
Route: /group/properties
Prototype: group-properties-v1.html (pending generation)

Key decisions:
- Layout: app shell with group Properties nav active
- Only visible if currentProperty.planTier === 'group'
- Primary data: all properties in the group
- Main interactions: click card to navigate to property dashboard, add property button (simulated)
</flex_block>

## Route
`/group/properties`
Prototype file: `group-properties-v1.html`
Theme: `dark`
Auth required: `yes` (group admin only)

## Purpose
View and manage all properties within a hotel group. Each property is displayed as a card with key details and metrics. Clicking a card navigates to that property's settings or dashboard.

## Layout Shell
- Shell: `app`
- Wrapper classes: `.app-layout` > `.app-sidebar` + `.app-main` > `.app-topbar` + `.app-content`

## App Sidebar

- **Wrapper:** `.app-sidebar`
- **Logo:** `.sidebar-logo` — "Grove" wordmark
- **Nav:** `.sidebar-nav`
  - `.nav-item` "Inbox" + `.nav-badge` (unread count) → `inbox-v1.html`
  - `.nav-item` "Guests" → `guests-v1.html`
  - `.nav-item` "Knowledge" → `knowledge-v1.html`
  - `.nav-item` "Analytics" (admin only) → `analytics-v1.html`
  - `.nav-item` "Settings" (admin only) → `settings-v1.html`
- **Group section:**
  - `.sidebar-section-label` "Group"
  - `.nav-item` "Group Overview" → `group-v1.html`
  - `.nav-item.active` "Properties" → `group-properties-v1.html`
- **Footer:** `.sidebar-footer` — currentUser initials + name + plan badge

## Sections (top to bottom)

### Top Bar
- **Wrapper:** `.app-topbar`
- **Copy:** `.page-title` "Properties"
- **Components used:** `.text-h1`, `.page-title`

### Page Header
- **Wrapper:** `.page-header`
- **Copy:**
  - H2 (`.text-h2`): "Properties"
  - Button (`.btn .btn-md .btn-primary`): "Add Property"
- **Components used:** `.page-title`, `.text-h2`, `.btn`, `.btn-md`, `.btn-primary`

### Property Cards Grid
- **Wrapper:** Responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- **Components used:** `.card`, `.text-h3`, `.text-body`, `.text-small`, `.text-secondary`, `.text-tertiary`, `.badge`, `.badge-active`
- **Data:** `MOCK_DB.helpers.getGroupProperties(MOCK_DB.groups[0].id)`
- **Card content per property:**
  - Property name (`.text-h3`): property name
  - Address (`.text-small .text-secondary`): property address
  - Phone number (`.text-small .text-tertiary`): property phoneNumber
  - Plan tier badge (`.badge .badge-active`): capitalised planTier (e.g., "Professional", "Group")
  - Stats row:
    - Conversations (`.text-small`): conversationCount + " conversations this month"
    - Team members (`.text-small .text-secondary`): "{count} team members" — derived from team size for that property
- **Card click:** Navigates to property dashboard/settings

## Interactive States

### Click Property Card
- **Trigger:** Click any property card
- **Implementation:**
  ```js
  function openProperty(propertyId) {
    // In production: switch active property context and navigate
    // In prototype: navigate to settings for that property
    window.location.href = 'settings-property-v1.html'
  }
  ```
- **After:** Navigates to the property's settings/dashboard view

### Add Property
- **Trigger:** Click "Add Property" button
- **Vue refs:**
  ```js
  const showAddPropertyModal = ref(false)
  ```
- **Implementation:**
  ```js
  function addProperty() {
    // Simulated in prototype
    showToast('Opening property setup...', 'info')
  }
  ```
- **After:** Toast: "Opening property setup..." (In production, would open onboarding flow for a new property)

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-info`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Property cards | `MOCK_DB.helpers.getGroupProperties(MOCK_DB.groups[0].id)` | Array of property objects |
| Property name | `property.name` | Per card |
| Property address | `property.address` | Per card |
| Property phone | `property.phoneNumber` | Per card |
| Plan tier | `property.planTier` | Badge display |
| Conversation count | `property.conversationCount` | Per card stat |
| Team member count | Derived from `MOCK_DB.propertyMembers` filtered by propertyId | Count per property |
| Group ID | `MOCK_DB.groups[0].id` | Used to fetch group properties |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |
| Plan badge | `MOCK_DB.currentProperty.planTier` | Should be 'group' |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Not group plan | planTier !== 'group' | Page not accessible. Group nav section hidden entirely |
| Maximum properties reached (20) | Group has 20 properties | "Add Property" button disabled, `.text-small .text-secondary`: "Maximum of 20 properties reached." |
| Minimum properties (3) | Group has exactly 3 properties | Normal display, no special handling |
| New property with no data | Property just added, no conversations | Card shows "0 conversations this month" |
| Property has no team | Freshly added, only owner | Card shows "1 team member" |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Inbox | inbox-v1.html | Always |
| Guests | guests-v1.html | Always |
| Knowledge | knowledge-v1.html | Always |
| Analytics | analytics-v1.html | Admin only |
| Settings | settings-v1.html | Admin only |
| Group Overview | group-v1.html | Group plan |
| Properties | group-properties-v1.html | Group plan, current |
| Property card click | settings-property-v1.html | Opens selected property |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/group-properties-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
