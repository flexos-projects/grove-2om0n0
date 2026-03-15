---
id: page-guest-profile
title: "Guest Profile"
type: page
subtype: route
status: active
sequence: 28
route: /guests/:id
prototype: "prototype/guest-profile-v1.html"
relatesTo:
  - docs/003-pages.md
  - docs/002-features.md
  - docs/004-flows.md
  - docs/005-database.md
  - docs/006-design.md
  - docs/008-content.md
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
The guest profile page shows everything the hotel knows about a single guest:
name, phone, preferences, staff notes, and full conversation history. Staff can
edit the guest's name, manage preference tags, and update notes directly.

Theme: dark
Auth: required (staff or admin)
Shell: app (sidebar + topbar with breadcrumb + .app-content)

All CSS classes referenced below are defined in components.css.
All MOCK_DB paths are defined in the prototype's mock data layer.
All UI copy comes from Doc 008-content.md.
</flex_block>

# Guest Profile

**Route:** `/guests/:id`
**Shell:** App (dark theme) — `.app-layout` with `.app-sidebar` + `.app-topbar` (breadcrumb: "Guests / {Guest Name}") + `.app-content`
**Purpose:** Everything the hotel knows about one guest. Editable name, preferences, staff notes, and full conversation history grouped by visit.
**Audience:** All authenticated staff and admins.

---

## Layout

```
.app-layout
  .app-sidebar          (standard app sidebar)
  .app-main
    .app-topbar         (breadcrumb: "Guests / {guest.name}")
    .app-content
      .guest-header     (avatar, name, phone, stats)
      .guest-section    (preferences)
      .guest-section    (staff notes)
      .guest-section    (conversation history)
```

---

## Sidebar

Standard app sidebar (`.app-sidebar`):

- `.sidebar-logo` — Grove logo mark
- `.sidebar-nav` with `.nav-item` entries:
  - **Inbox** — `.nav-item` with `.nav-badge` showing unread count, linking to `/inbox`
  - **Guests** — `.nav-item.active` (parent route is active)
  - **Knowledge** — `.nav-item` linking to `/knowledge`
  - **Analytics** — `.nav-item` linking to `/analytics` (admin only)
  - **Settings** — `.nav-item` linking to `/settings` (admin only)
- `.sidebar-footer` — Current user avatar + name (`MOCK_DB.currentUser.name`: "Maria Chen"), logout action

---

## Topbar

- `.app-topbar` with breadcrumb navigation:
  - "Guests" — clickable link back to `/guests`
  - " / " separator
  - `{guest.name}` — current page (not linked)

---

## Sections

### Guest Header

- `.guest-header` containing:
  - `.guest-avatar` — Large avatar circle with guest initial(s)
  - `.guest-info`:
    - `.guest-name` — Guest name, editable inline (click to edit, press Enter or blur to save)
    - `.guest-phone` — Phone number (read-only, formatted)
  - `.guest-stats`:
    - First contact: formatted date from `guest.firstContactAt`
    - Total conversations: `guest.totalConversations` count

- Vue ref: `editingName` — boolean, default `false`
- Vue ref: `guestName` — string, initialised from `guest.name`
- On save: shows toast `MOCK_DB.copy.toasts.guestUpdated` ("Guest profile updated.")

### Preferences Section

- `.guest-section` with `.guest-section-title`: "Preferences"
- `.guest-preferences` containing:
  - `.preference-tag` for each item in `guest.preferences[]`
  - Each tag has a remove button (x icon) to delete the preference
  - "Add preference" button (`.btn.btn-ghost.btn-sm`) at the end
- Vue ref: `preferences` — array, initialised from `guest.preferences`
- Adding a preference: inline input appears, type and press Enter to add
- Removing a preference: click x on the tag, preference removed from list
- On change: shows toast `MOCK_DB.copy.toasts.guestUpdated` ("Guest profile updated.")

### Staff Notes Section

- `.guest-section` with `.guest-section-title`: "Staff Notes"
- `.guest-notes` containing:
  - `.textarea` — Editable textarea pre-filled with `guest.staffNotes`
  - Save button (`.btn.btn-primary.btn-sm`): "Save Notes"
- Vue ref: `staffNotes` — string, initialised from `guest.staffNotes`
- On save: shows toast `MOCK_DB.copy.toasts.guestUpdated` ("Guest profile updated.")

### Conversation History Section

- `.guest-section` with `.guest-section-title`: "Conversation History"
- `.guest-history` containing `.guest-visit` cards for each conversation
- Data source: conversations from `MOCK_DB.helpers.getGuestProfile(guestId)` which returns `guest` + `conversations` + `messages`
- Conversations grouped by visit (sorted by `lastMessageAt` descending)
- Each `.guest-visit`:
  - `.guest-visit-date` — Date range or single date of the conversation
  - `.guest-visit-count` — Message count: "{n} messages"
  - Status badge (`.badge` with `.badge-active`, `.badge-waiting`, or `.badge-resolved`)
  - Category badge (`.badge` with category modifier, e.g., `.badge-category-dining`)
  - Last message preview text (truncated)
- Click handler: clicking a conversation navigates to `/inbox/:conversationId`

---

## Interactive States

### Edit Name Inline
- Click on `.guest-name` to enter edit mode
- Name text becomes an `.input` field
- Press Enter or click away to save
- Press Escape to cancel
- Vue ref: `editingName`, `guestName`

### Add Preference Tag
- Click "Add preference" button
- Inline `.input` appears in the preferences row
- Type a preference and press Enter to add as a new `.preference-tag`
- Press Escape to cancel
- Vue ref: `newPreference` — string

### Remove Preference Tag
- Click x button on any `.preference-tag`
- Tag removed immediately from the list (no confirmation needed)

### Edit Staff Notes
- `.textarea` is always editable
- "Save Notes" button (`.btn.btn-primary.btn-sm`) below the textarea
- On save: toast `MOCK_DB.copy.toasts.guestUpdated` ("Guest profile updated.")

### Click Conversation
- Clicking a `.guest-visit` card navigates to `/inbox/:conversationId`
- Opens the conversation in the inbox view

---

## Data Bindings

| UI Element | MOCK_DB Source |
|-----------|---------------|
| Guest profile (all data) | `MOCK_DB.helpers.getGuestProfile(guestId)` |
| Guest name | `guest.name` |
| Guest phone | `guest.phoneNumber` |
| Guest preferences | `guest.preferences[]` |
| Guest notes | `guest.staffNotes` |
| Guest stats | `guest.firstContactAt`, `guest.totalConversations` |
| Conversation history | Returned by `getGuestProfile()` — `conversations[]` with `messages[]` |
| Toast copy | `MOCK_DB.copy.toasts.guestUpdated` |
| Unread badge (sidebar) | `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id).filter(c => c.unreadByStaff).length` |
| Current user | `MOCK_DB.currentUser` ("Maria Chen") |
| Current property | `MOCK_DB.currentProperty` ("The Linden", `prop_linden`) |

---

## Edge Cases

### Guest Not Found
- If `guestId` does not match any guest record
- Show `.empty-state` with `.empty-title` "Guest not found" and a link back to `/guests`

### No Preferences
- If `guest.preferences` is empty
- Show "No preferences recorded yet." text with the "Add preference" button

### No Staff Notes
- If `guest.staffNotes` is empty or null
- Show empty `.textarea` with placeholder: "Add notes about this guest..."

### No Conversation History
- If the guest has no conversations
- Show "No conversations yet." in the history section

### Long Preference List
- If many preferences exist, they wrap naturally within `.guest-preferences`

---

## Navigation Links

| Element | Destination |
|---------|------------|
| Breadcrumb "Guests" | `/guests` |
| Conversation history card | `/inbox/:conversationId` |
| Sidebar: Inbox | `/inbox` |
| Sidebar: Knowledge | `/knowledge` |
| Sidebar: Analytics | `/analytics` |
| Sidebar: Settings | `/settings` |

---

## Prototype Controls

- **Guest picker dropdown** — Select between demo guests to preview different profile states:
  - Sarah M. (returning guest, multiple preferences, staff notes)
  - James T. (single conversation, complaint category)
  - Anna K. (3rd visit, returning guest, French cuisine preference)
- **Empty states toggle** — Show profile with no preferences, no notes, no history

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/guest-profile-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
