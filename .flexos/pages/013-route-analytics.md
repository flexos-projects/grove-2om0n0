---
id: page-analytics
title: "Analytics Dashboard"
type: page
subtype: route
status: active
sequence: 30
route: /analytics
prototype: "prototype/analytics-v1.html"
relatesTo:
  - docs/003-pages.md
  - docs/002-features.md
  - docs/005-database.md
  - docs/006-design.md
  - docs/008-content.md
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
The analytics dashboard shows property-level metrics: conversation volume,
AI-handled percentage, response times, category breakdown, busiest hours,
and staff performance. Admin-only page. Charts built with pure CSS/HTML
(no chart library) since this is a prototype.

Theme: dark
Auth: required (admin only)
Shell: app (sidebar + topbar + .app-content)

All CSS classes referenced below are defined in components.css.
All MOCK_DB paths are defined in the prototype's mock data layer.
All UI copy comes from Doc 008-content.md.
</flex_block>

# Analytics Dashboard

**Route:** `/analytics`
**Shell:** App (dark theme) — `.app-layout` with `.app-sidebar` + `.app-topbar` + `.app-content`
**Purpose:** Understand how Grove is performing. Metrics that matter for hospitality: conversation volume, AI efficiency, response times, guest patterns, and staff performance.
**Audience:** Admins only.

---

## Layout

```
.app-layout
  .app-sidebar          (standard app sidebar)
  .app-main
    .app-topbar         (page title: "Analytics")
    .app-content
      .page-header      (title + period selector + export)
      .stats-bar        (4 metric cards)
      charts section    (4 charts in 2x2 grid)
      .table-wrapper    (staff performance table)
```

---

## Sidebar

Standard app sidebar (`.app-sidebar`):

- `.sidebar-logo` — Grove logo mark
- `.sidebar-nav` with `.nav-item` entries:
  - **Inbox** — `.nav-item` with `.nav-badge` showing unread count, linking to `/inbox`
  - **Guests** — `.nav-item` linking to `/guests`
  - **Knowledge** — `.nav-item` linking to `/knowledge`
  - **Analytics** — `.nav-item.active`
  - **Settings** — `.nav-item` linking to `/settings` (admin only)
- `.sidebar-footer` — Current user avatar + name (`MOCK_DB.currentUser.name`: "Maria Chen"), logout action

---

## Sections

### Page Header

- `.page-header` containing:
  - `.page-title` — "Analytics"
  - Period selector (`.select`): "Last 7 days", "Last 30 days", "Last 90 days", "Custom range"
  - Export button (`.btn.btn-secondary.btn-sm`): "Export CSV"
- Vue ref: `period` (values: `'7d'`, `'30d'`, `'90d'`, `'custom'`)
- Export click: shows toast "Export started" (prototype simulation)

### Stats Bar

- `.stats-bar` containing four `.stat-card` elements
- Data source: `MOCK_DB.helpers.getDashboardStats(MOCK_DB.currentProperty.id)`
- Cards:

  **Total Conversations:**
  - `.stat-label` — "Total Conversations"
  - `.stat-value` — `stats.totalConversations`
  - `.stat-trend.stat-trend-up` or `.stat-trend.stat-trend-down` — percentage change vs previous period (e.g., "+12%")

  **AI-Handled:**
  - `.stat-label` — "AI-Handled"
  - `.stat-value` — `stats.aiHandledPercent` + "%" (e.g., "68%")
  - `.stat-trend` — trend vs previous period

  **Avg Response Time:**
  - `.stat-label` — "Avg Response Time"
  - `.stat-value` — `stats.avgResponseTimeMinutes` formatted (e.g., "2.4 min")
  - `.stat-trend.stat-trend-down` (down is good for response time) — trend vs previous period

  **Total Guests:**
  - `.stat-label` — "Total Guests"
  - `.stat-value` — `stats.totalGuests`
  - `.stat-trend` — with `stats.returningGuests` returning guests noted (e.g., "+8, 3 returning")

### Charts Section

Four charts arranged in a 2x2 grid of `.card` containers. All charts are pure CSS/HTML (no chart library).

**Conversations Over Time (Line Chart):**
- `.card` with title "Conversations Over Time"
- Simple CSS line chart using positioned dots and connecting lines
- X-axis: dates for the selected period
- Y-axis: conversation count
- Simulated data points rendered as small circles connected by SVG lines or CSS borders

**Request Categories (Donut Chart):**
- `.card` with title "Request Categories"
- CSS donut chart using `conic-gradient` on a circular element
- Data source: `stats.categoryBreakdown` — object with category keys and count values
- Legend below the donut: category name + count + percentage, each with category badge colour (`.badge-category-dining`, `.badge-category-transport`, `.badge-category-housekeeping`, `.badge-category-activities`, `.badge-category-information`, `.badge-category-complaint`, `.badge-category-other`)

**Response Time Distribution (Bar Chart):**
- `.card` with title "Response Time Distribution"
- Horizontal bar chart using CSS widths
- Buckets: "<1 min", "1-5 min", "5-15 min", "15+ min"
- Each bar: label + `.progress` container with `.progress-fill` at proportional width + count label

**Busiest Hours (Heatmap Grid):**
- `.card` with title "Busiest Hours"
- CSS grid: 7 rows (Mon-Sun) x 24 columns (hours 0-23)
- Each cell is a small square with background opacity proportional to activity
- Colour: brand green at varying opacity (0.1 to 1.0)
- Row headers: day abbreviations. Column headers: hour numbers (0, 6, 12, 18)

### Staff Performance Table

- `.card` with title "Staff Performance"
- `.table-wrapper` containing `.table`
- Columns:
  - **Name** — Staff member name
  - **Conversations Handled** — Count
  - **Avg Response Time** — Formatted minutes
- Data source: derived from `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)` cross-referenced with conversation assignments
- Sorted by conversations handled (descending)

---

## Interactive States

### Period Selector
- Vue ref: `period` — string, default `'30d'`
- Changing the period re-renders all stats and charts with the selected timeframe's data
- All four stat cards, all four charts, and the staff table respond to the period change

### Chart Hover Tooltips (Simulated)
- On hover over chart elements (dots, bars, donut segments, heatmap cells), show a tooltip with the specific value
- Tooltips rendered as absolutely-positioned divs with `.card` styling
- Prototype can use CSS `:hover` with `::after` pseudo-elements for simple tooltips

### Export CSV
- Click "Export CSV" button
- Shows toast: "Export started" (prototype simulation only)
- No actual file download in prototype

---

## Data Bindings

| UI Element | MOCK_DB Source |
|-----------|---------------|
| All stats | `MOCK_DB.helpers.getDashboardStats(MOCK_DB.currentProperty.id)` |
| Total conversations | `stats.totalConversations` |
| Active conversations | `stats.activeConversations` |
| Waiting conversations | `stats.waitingConversations` |
| Resolved conversations | `stats.resolvedConversations` |
| AI-handled count | `stats.aiHandledCount` |
| AI-handled percent | `stats.aiHandledPercent` |
| Avg response time | `stats.avgResponseTimeMinutes` |
| Total guests | `stats.totalGuests` |
| Returning guests | `stats.returningGuests` |
| Category breakdown | `stats.categoryBreakdown` |
| Staff performance | `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)` |
| Empty state copy | `MOCK_DB.copy.emptyStates.analytics` |
| Unread badge (sidebar) | `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id).filter(c => c.unreadByStaff).length` |
| Current user | `MOCK_DB.currentUser` ("Maria Chen") |
| Current property | `MOCK_DB.currentProperty` ("The Linden", `prop_linden`) |

---

## Edge Cases

### Not Enough Data
- When the property has fewer than 50 conversations total
- `.empty-state` replaces the entire content area:
  - `.empty-icon` — chart/bar-chart icon
  - `.empty-title` — `MOCK_DB.copy.emptyStates.analytics.headline`: "Not enough data yet."
  - `.empty-desc` — `MOCK_DB.copy.emptyStates.analytics.description`: "Analytics will appear after your first 50 conversations."
- Prototype control: toggle button to simulate empty/populated state

### Non-Admin Access
- Staff role users should not see the Analytics nav item in the sidebar
- If a staff user navigates directly to `/analytics`, redirect to `/inbox`

### Single Staff Member
- Staff performance table shows only one row
- Still useful for response time tracking

### Zero in a Category
- Donut chart omits categories with zero conversations
- Legend still shows all categories with 0 count where applicable

### Custom Date Range
- When `period` is `'custom'`, show a date range picker (two `.input[type=date]` fields)
- Vue refs: `customStart`, `customEnd`

---

## Navigation Links

| Element | Destination |
|---------|------------|
| Sidebar: Inbox | `/inbox` |
| Sidebar: Guests | `/guests` |
| Sidebar: Knowledge | `/knowledge` |
| Sidebar: Settings | `/settings` |

---

## Prototype Controls

- **Empty state toggle** — Switch between populated dashboard and "not enough data" empty state
- **Period selector** — Already part of the UI, but prototype pre-loads realistic data for each period
- **Data density toggle** — Switch between "light activity" (small hotel) and "busy property" (high volume) demo datasets

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/analytics-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
