---
id: page-guests
title: "Guest Directory"
type: page
subtype: route
status: active
sequence: 27
route: /guests
prototype: "prototype/guests-v1.html"
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
The guest directory lists all guests who have texted the hotel. Searchable, sortable,
with quick access to guest profiles. This is a standard app shell page.

Theme: dark
Auth: required (staff or admin)
Shell: app (sidebar + topbar + .app-content)

All CSS classes referenced below are defined in components.css.
All MOCK_DB paths are defined in the prototype's mock data layer.
All UI copy comes from Doc 008-content.md.
</flex_block>

# Guest Directory

**Route:** `/guests`
**Shell:** App (dark theme) — `.app-layout` with `.app-sidebar` + `.app-topbar` + `.app-content`
**Purpose:** Browse and search all guests who have ever texted the hotel. Entry point to individual guest profiles.
**Audience:** All authenticated staff and admins.

---

## Layout

```
.app-layout
  .app-sidebar          (standard app sidebar)
  .app-main
    .app-topbar         (page title: "Guests")
    .app-content
      .page-header      (title + search)
      .table-wrapper    (guest list table)
```

---

## Sidebar

Standard app sidebar (`.app-sidebar`):

- `.sidebar-logo` — Grove logo mark
- `.sidebar-nav` with `.nav-item` entries:
  - **Inbox** — `.nav-item` with `.nav-badge` showing unread count, linking to `/inbox`
  - **Guests** — `.nav-item.active`
  - **Knowledge** — `.nav-item` linking to `/knowledge`
  - **Analytics** — `.nav-item` linking to `/analytics` (admin only)
  - **Settings** — `.nav-item` linking to `/settings` (admin only)
- `.sidebar-footer` — Current user avatar + name (`MOCK_DB.currentUser.name`: "Maria Chen"), logout action

---

## Sections

### Page Header

- `.page-header` containing:
  - `.page-title` — "Guests"
  - `.page-meta` — Guest count: "{n} guests" (computed from filtered list length)
- Search bar below header: `.input` with placeholder "Search by name or phone..."
- Vue ref: `searchQuery`

### Sort Controls

- `.select` dropdown for sort order
- Vue ref: `sortField` (values: `'lastContactAt'`, `'name'`, `'totalConversations'`)
- Options:
  - "Most recent" (default) — `MOCK_DB.helpers.sortBy(guests, 'lastContactAt', 'desc')`
  - "Alphabetical" — `MOCK_DB.helpers.sortBy(guests, 'name', 'asc')`
  - "Most conversations" — `MOCK_DB.helpers.sortBy(guests, 'totalConversations', 'desc')`

### Guest List

- `.table-wrapper` containing `.table`
- Data source: `MOCK_DB.helpers.filterBy(MOCK_DB.guests, 'propertyId', MOCK_DB.currentProperty.id)`, filtered by `searchQuery` via `MOCK_DB.helpers.search(guests, ['name', 'phoneNumber'], searchQuery)`, then sorted by `sortField`
- Table columns:
  - **Guest** — `.guest-avatar` (initial circle) + guest name + phone number below in secondary text
  - **Last Contact** — Relative date from `guest.lastContactAt`
  - **Conversations** — `guest.totalConversations` count
  - **Preferences** — `.preference-tag` badges from `guest.preferences[]` (show first 3, "+N more" if more exist)
- Each row is clickable — navigates to `/guests/:id` (guest profile page, rendered as `guest-profile-v1.html`)
- Hover state on rows for affordance

---

## Interactive States

### Search
- Vue ref: `searchQuery` — string, default `''`
- Filters guest list in real time
- Uses `MOCK_DB.helpers.search(guests, ['name', 'phoneNumber'], searchQuery)`
- Empty search results: inline message "No guests match your search."

### Sort
- Vue ref: `sortField` — string, default `'lastContactAt'`
- Changing the dropdown re-sorts the guest list

### Row Click
- Clicking a guest row navigates to `/guests/:id`
- In prototype: links to `guest-profile-v1.html?id={guestId}` or uses hash routing

---

## Data Bindings

| UI Element | MOCK_DB Source |
|-----------|---------------|
| Guest list | `MOCK_DB.helpers.filterBy(MOCK_DB.guests, 'propertyId', MOCK_DB.currentProperty.id)` |
| Search filtering | `MOCK_DB.helpers.search(guests, ['name', 'phoneNumber'], searchQuery)` |
| Sort | `MOCK_DB.helpers.sortBy(guests, sortField, sortDir)` |
| Guest count | Computed from filtered list `.length` |
| Unread badge (sidebar) | `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id).filter(c => c.unreadByStaff).length` |
| Empty state copy | `MOCK_DB.copy.emptyStates.guests` |
| Current user | `MOCK_DB.currentUser` ("Maria Chen") |
| Current property | `MOCK_DB.currentProperty` ("The Linden", `prop_linden`) |

---

## Edge Cases

### Empty Guest List
- When no guests exist for the property
- `.empty-state` replaces the table:
  - `.empty-icon` — users icon
  - `.empty-title` — `MOCK_DB.copy.emptyStates.guests.headline`: "No guests yet."
  - `.empty-desc` — `MOCK_DB.copy.emptyStates.guests.description`: "Guest profiles are created automatically when someone texts your Grove number."
- Prototype control: toggle button to simulate empty/populated state

### Empty Search Results
- When `searchQuery` matches no guests
- Table area shows: "No guests match your search."

### Many Preferences
- If a guest has more than 3 preference tags, show the first 3 as `.preference-tag` badges and a "+N more" indicator

---

## Navigation Links

| Element | Destination |
|---------|------------|
| Guest row click | `/guests/:id` (guest profile) |
| Sidebar: Inbox | `/inbox` |
| Sidebar: Knowledge | `/knowledge` |
| Sidebar: Analytics | `/analytics` |
| Sidebar: Settings | `/settings` |

---

## Prototype Controls

- **Empty state toggle** — Switch between populated and empty guest list
- **Guest count selector** — Choose between "few guests" (3) and "many guests" (12+) demo datasets

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/guests-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
