---
id: page-knowledge
title: "Knowledge Base"
type: page
subtype: route
status: active
sequence: 29
route: /knowledge
prototype: "prototype/knowledge-v1.html"
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
The knowledge base page lets staff build and manage local information the AI uses
to answer guest questions: restaurants, attractions, transport, hotel FAQs, etc.
Card grid layout with category filtering and add/edit/delete modals.

Theme: dark
Auth: required (staff or admin)
Shell: app (sidebar + topbar + .app-content)

All CSS classes referenced below are defined in components.css.
All MOCK_DB paths are defined in the prototype's mock data layer.
All UI copy comes from Doc 008-content.md.
</flex_block>

# Knowledge Base

**Route:** `/knowledge`
**Shell:** App (dark theme) — `.app-layout` with `.app-sidebar` + `.app-topbar` + `.app-content`
**Purpose:** Build and manage the local information the AI uses to answer guest questions. Restaurants, attractions, transport options, hotel FAQs, and more.
**Audience:** All authenticated staff and admins.

---

## Layout

```
.app-layout
  .app-sidebar          (standard app sidebar)
  .app-main
    .app-topbar         (page title: "Knowledge Base")
    .app-content
      .page-header      (title + add button)
      .tab-bar          (category filter tabs)
      entry count       (count + limit indicator)
      .knowledge-grid   (entry cards)
```

---

## Sidebar

Standard app sidebar (`.app-sidebar`):

- `.sidebar-logo` — Grove logo mark
- `.sidebar-nav` with `.nav-item` entries:
  - **Inbox** — `.nav-item` with `.nav-badge` showing unread count, linking to `/inbox`
  - **Guests** — `.nav-item` linking to `/guests`
  - **Knowledge** — `.nav-item.active`
  - **Analytics** — `.nav-item` linking to `/analytics` (admin only)
  - **Settings** — `.nav-item` linking to `/settings` (admin only)
- `.sidebar-footer` — Current user avatar + name (`MOCK_DB.currentUser.name`: "Maria Chen"), logout action

---

## Sections

### Page Header

- `.page-header` containing:
  - `.page-title` — "Knowledge Base"
  - "Add Entry" button (`.btn.btn-primary.btn-md`) — opens add entry modal
- Search bar below header: `.input` with placeholder "Search entries..."
- Vue ref: `searchQuery`

### Category Filter Tabs

- `.tab-bar` with `.tab` items:
  - **All** `.tab.active` (default) with `.tab-count`
  - **Dining** `.tab` with `.tab-count`
  - **Nightlife** `.tab` with `.tab-count`
  - **Activities** `.tab` with `.tab-count`
  - **Shopping** `.tab` with `.tab-count`
  - **Transport** `.tab` with `.tab-count`
  - **Services** `.tab` with `.tab-count`
  - **Hotel FAQ** `.tab` with `.tab-count`
- Vue ref: `activeCategory` (values: `'all'`, `'dining'`, `'nightlife'`, `'activities'`, `'shopping'`, `'transport'`, `'services'`, `'hotel-faq'`)
- Tab counts reflect the number of entries in each category

### Entry Count & Limit Indicator

- Text line below tabs: "{n} entries" (total for current filter)
- For Starter plan properties: show limit indicator with `.progress` bar — "{n} of 50 entries used"
  - `.progress` container with `.progress-fill` showing percentage
  - When at limit: warning text "Entry limit reached. Upgrade for unlimited entries."

### Knowledge Grid

- `.knowledge-grid` containing `.knowledge-card` for each entry
- Data source: `MOCK_DB.helpers.getPropertyKnowledge(MOCK_DB.currentProperty.id)`, filtered by `activeCategory` via `MOCK_DB.helpers.filterBy(entries, 'category', activeCategory)` when not `'all'`, filtered by `searchQuery` via `MOCK_DB.helpers.search(entries, ['title', 'description'], searchQuery)`
- Each `.knowledge-card`:
  - `.knowledge-card-header`:
    - `.knowledge-card-title` — Entry title
    - `.knowledge-category-badge` — Category badge using appropriate modifier (`.badge-category-dining`, `.badge-category-transport`, etc.)
  - `.knowledge-card-desc` — Entry description (truncated to 3 lines)
  - `.knowledge-card-footer`:
    - `.knowledge-card-link` — External URL if `entry.url` exists (displayed as truncated link text)
    - Hours text if `entry.hours` exists
  - Click handler: opens edit entry modal with pre-filled data
  - Actions on hover: Edit button, Delete button (`.btn.btn-ghost.btn-sm`)

---

## Add / Edit Entry Modal

- `.modal-backdrop` + `.modal-box`
- `.modal-title` — "Add Entry" or "Edit Entry"
- `.modal-body` containing `.form-group` elements:
  - **Title** — `.form-label` "Title" + `.input`
  - **Category** — `.form-label` "Category" + `.select` with options: Dining, Nightlife, Activities, Shopping, Transport, Services, Hotel FAQ
  - **Description** — `.form-label` "Description" + `.textarea`
  - **URL** (optional) — `.form-label` "Link (optional)" + `.input` with placeholder "https://..."
  - **Hours** (optional) — `.form-label` "Hours (optional)" + `.input` with placeholder "e.g., Mon-Sat 11am-10pm"
  - **Seasonal** (optional) — Toggle for seasonal availability with date range pickers for `seasonalStart` and `seasonalEnd`
- `.modal-actions`:
  - "Save" (`.btn.btn-primary`) — saves entry, shows toast `MOCK_DB.copy.toasts.entrySaved` ("Entry saved."), closes modal, updates grid
  - "Cancel" (`.btn.btn-secondary`) — closes modal without saving
  - "Delete" (`.btn.btn-danger`, edit mode only) — triggers delete confirmation

---

## Delete Entry Confirmation

- `.modal-backdrop` + `.modal-box`
- `.modal-title` — from `MOCK_DB.copy.confirmDialogs.deleteKnowledgeEntry`: "Delete this entry?"
- `.modal-body` — "{entryTitle} will be permanently removed."
- `.modal-actions`:
  - "Delete" (`.btn.btn-danger`) — deletes entry, shows toast `MOCK_DB.copy.toasts.entryDeleted` ("Entry removed."), closes modal, updates grid
  - "Keep" (`.btn.btn-secondary`) — closes modal

---

## Interactive States

### Category Filter
- Vue ref: `activeCategory` — string, default `'all'`
- Clicking a tab filters the knowledge grid to that category
- Tab counts update to reflect filtered totals
- "All" tab shows all entries regardless of category

### Search
- Vue ref: `searchQuery` — string, default `''`
- Filters entries in real time by title and description
- Uses `MOCK_DB.helpers.search(entries, ['title', 'description'], searchQuery)`
- Combined with category filter (both applied simultaneously)

### Add Entry
- Vue ref: `showAddModal` — boolean, default `false`
- Click "Add Entry" button to open modal
- Fill form and click "Save"
- New card appears in grid

### Edit Entry
- Vue ref: `editingEntry` — object or null
- Click a card to open edit modal with pre-filled data
- Edit fields and click "Save"
- Card updates in grid

### Delete Entry
- From edit modal, click "Delete"
- Confirmation dialog appears
- On confirm: entry removed from grid

---

## Data Bindings

| UI Element | MOCK_DB Source |
|-----------|---------------|
| Knowledge entries | `MOCK_DB.helpers.getPropertyKnowledge(MOCK_DB.currentProperty.id)` |
| Category filtering | `MOCK_DB.helpers.filterBy(entries, 'category', activeCategory)` |
| Search filtering | `MOCK_DB.helpers.search(entries, ['title', 'description'], searchQuery)` |
| Entry count | Computed from filtered list `.length` |
| Toast copy (save) | `MOCK_DB.copy.toasts.entrySaved` |
| Toast copy (delete) | `MOCK_DB.copy.toasts.entryDeleted` |
| Confirm dialog copy | `MOCK_DB.copy.confirmDialogs.deleteKnowledgeEntry` |
| Empty state copy | `MOCK_DB.copy.emptyStates.knowledge` |
| Unread badge (sidebar) | `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id).filter(c => c.unreadByStaff).length` |
| Current user | `MOCK_DB.currentUser` ("Maria Chen") |
| Current property | `MOCK_DB.currentProperty` ("The Linden", `prop_linden`) |

---

## Edge Cases

### Empty Knowledge Base
- When no entries exist for the property
- `.empty-state` replaces the knowledge grid:
  - `.empty-icon` — book/knowledge icon
  - `.empty-title` — `MOCK_DB.copy.emptyStates.knowledge.headline`: "Your knowledge base is empty."
  - `.empty-desc` — `MOCK_DB.copy.emptyStates.knowledge.description`: "Add local restaurants, attractions, and tips so the AI can recommend them to guests."
  - CTA button (`.btn.btn-primary`): "Add First Entry" — opens add entry modal
- Prototype control: toggle button to simulate empty/populated state

### Empty Search / Filter Results
- When search or category filter yields no results
- Grid area shows inline message: "No entries found."

### Entry Limit Reached (Starter Plan)
- When entry count reaches 50 (Starter tier limit)
- "Add Entry" button becomes disabled
- `.progress-fill` at 100%
- Warning text below progress: "Entry limit reached. Upgrade for unlimited entries."

### Long Description
- `.knowledge-card-desc` truncated to 3 lines with ellipsis
- Full description visible in edit modal

### Seasonal Entries
- If `seasonalStart` and `seasonalEnd` are set, show a small seasonal indicator on the card
- Entries outside their seasonal window are visually dimmed but still visible to staff

---

## Navigation Links

| Element | Destination |
|---------|------------|
| Sidebar: Inbox | `/inbox` |
| Sidebar: Guests | `/guests` |
| Sidebar: Analytics | `/analytics` |
| Sidebar: Settings | `/settings` |

---

## Prototype Controls

- **Empty state toggle** — Switch between populated and empty knowledge base
- **Plan tier toggle** — Switch between Starter (shows limit indicator) and Professional (no limit)
- **Category pre-filter** — Dropdown to load page with a specific category tab active

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/knowledge-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
