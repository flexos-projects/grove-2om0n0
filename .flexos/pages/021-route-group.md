---
id: page-group
title: "Group Overview"
type: page
subtype: route
status: active
sequence: 38
route: /group
prototype: "prototype/group-v1.html"
description: "Group-level analytics overview showing aggregated stats across all properties and a comparison table for drilling down into individual property performance."
relatesTo:
  - core-features # F-017 Group Analytics
  - core-database # groups, properties collections
  - core-design # stats bar, tables, cards
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Group Overview page.
Route: /group
Prototype: group-v1.html (pending generation)

Key decisions:
- Layout: app shell with group nav active
- Only visible if currentProperty.planTier === 'group'
- Primary data: group properties with aggregated stats
- Main interactions: sortable comparison table, drill-down links to individual property analytics
</flex_block>

## Route
`/group`
Prototype file: `group-v1.html`
Theme: `dark`
Auth required: `yes` (group admin only)

## Purpose
Provide a roll-up analytics view across all properties in a hotel group. Compare property performance by key metrics and drill down into individual property dashboards.

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
  - `.nav-item.active` "Group Overview" → `group-v1.html`
  - `.nav-item` "Properties" → `group-properties-v1.html`
- **Footer:** `.sidebar-footer` — currentUser initials + name + plan badge

## Sections (top to bottom)

### Top Bar
- **Wrapper:** `.app-topbar`
- **Copy:** `.page-title` "Group Overview"
- **Meta:** `.page-meta .text-secondary` — group name from `MOCK_DB.groups[0].name`
- **Components used:** `.text-h1`, `.page-title`, `.page-meta`, `.text-secondary`

### Stats Bar
- **Wrapper:** `.stats-bar`
- **Components used:** `.stat-card`, `.stat-label`, `.stat-value`, `.stat-trend`
- **Cards:**
  - **Total Properties:** `.stat-label` "Properties" + `.stat-value` count of group properties
  - **Total Conversations:** `.stat-label` "Total Conversations" + `.stat-value` sum of all property conversations + `.stat-trend` vs previous period
  - **Avg Response Time:** `.stat-label` "Avg Response Time" + `.stat-value` weighted average across properties + `.stat-trend`
  - **AI-Handled:** `.stat-label` "AI-Handled" + `.stat-value` percentage across all properties + `.stat-trend`
- **Data:** Aggregated from `MOCK_DB.helpers.getGroupProperties(group.id)` and `MOCK_DB.helpers.getDashboardStats(propertyId)` for each property

### Property Comparison Table
- **Wrapper:** `.table-wrapper`
- **Components used:** `.table`, `.text-h3`, `.text-body`, `.text-small`, `.text-secondary`, `.btn`, `.btn-sm`, `.btn-ghost`
- **Copy:** H3 (`.text-h3`): "Property Performance"
- **Columns (sortable):**
  - Property Name (`.text-body`)
  - Conversations (`.text-body`) — total this period
  - Avg Response Time (`.text-body`) — formatted as "X min"
  - AI-Handled % (`.text-body`) — percentage
  - Satisfaction (`.text-body`) — score out of 5
- **Data:** Each row from `MOCK_DB.helpers.getGroupProperties(group.id)`, stats from `MOCK_DB.helpers.getDashboardStats(propertyId)`
- **Row click:** Links to individual property analytics (`analytics-v1.html` with property context)

## Interactive States

### Sort Table Columns
- **Trigger:** Click column header in comparison table
- **Vue refs:**
  ```js
  const sortColumn = ref('conversations')
  const sortDirection = ref('desc')
  const groupProperties = ref([])
  ```
- **Implementation:**
  ```js
  function sortBy(column) {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.value = column
      sortDirection.value = 'desc'
    }
  }

  const sortedProperties = computed(() => {
    return [...groupProperties.value].sort((a, b) => {
      const aVal = a.stats[sortColumn.value]
      const bVal = b.stats[sortColumn.value]
      return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal
    })
  })
  ```
- **Before:** Default sort by conversations descending
- **After:** Column header shows sort indicator, table re-sorts

### Drill Down to Property
- **Trigger:** Click a property row in the comparison table
- **Implementation:**
  ```js
  function drillDown(propertyId) {
    // Navigate to property-specific analytics
    window.location.href = 'analytics-v1.html'
  }
  ```
- **After:** Navigates to the analytics page for that property

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Group name | `MOCK_DB.groups[0].name` | Displayed in topbar meta |
| Group properties | `MOCK_DB.helpers.getGroupProperties(MOCK_DB.groups[0].id)` | Array of property objects |
| Per-property stats | `MOCK_DB.helpers.getDashboardStats(propertyId)` | Called for each property in group |
| Properties count | `MOCK_DB.helpers.getGroupProperties(...).length` | Stat card |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |
| Plan badge | `MOCK_DB.currentProperty.planTier` | Should be 'group' |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Not group plan | planTier !== 'group' | Page not accessible. Redirect to /inbox or hide group nav section entirely |
| Single property in group | Group has only 1 property (shouldn't happen, min 3) | Table shows one row, stats still display |
| No conversation data | New group, no conversations yet | Stats show 0 values, table rows show dashes for metrics |
| Property has no stats | getDashboardStats returns empty | Row shows "—" for metrics columns |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Inbox | inbox-v1.html | Always |
| Guests | guests-v1.html | Always |
| Knowledge | knowledge-v1.html | Always |
| Analytics | analytics-v1.html | Admin only |
| Settings | settings-v1.html | Admin only |
| Group Overview | group-v1.html | Group plan, current |
| Properties | group-properties-v1.html | Group plan |
| Property drill-down | analytics-v1.html | Click table row |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/group-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
