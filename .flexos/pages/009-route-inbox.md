---
id: page-inbox
title: "Inbox"
type: page
subtype: route
status: active
sequence: 26
route: /inbox
prototype: "prototype/inbox-v1.html"
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
This is the most important page in the product. Staff spend 90% of their time here.
The inbox is a two-panel layout: conversation list on the left, active conversation thread
on the right. It handles both /inbox (no selection) and /inbox/:id (conversation selected).

Theme: dark
Auth: required (staff or admin)
Shell: app (sidebar + topbar), main content uses .inbox-layout instead of .app-content

All CSS classes referenced below are defined in components.css.
All MOCK_DB paths are defined in the prototype's mock data layer.
All UI copy comes from Doc 008-content.md.
</flex_block>

# Inbox

**Route:** `/inbox` (also handles `/inbox/:id`)
**Shell:** App (dark theme) — `.app-layout` with `.app-sidebar` + `.app-topbar`, but main content area uses `.inbox-layout` instead of `.app-content`
**Purpose:** The primary workspace. Conversation list on the left, active conversation thread and response area on the right. Where staff read, respond, assign, and resolve guest SMS conversations.
**Audience:** All authenticated staff and admins.

---

## Layout

```
.app-layout
  .app-sidebar          (standard app sidebar)
  .app-main
    .app-topbar         (page title: "Inbox")
    .inbox-layout       (two-panel, replaces .app-content)
      .inbox-list       (left panel, 320px fixed width)
      .inbox-thread     (right panel, fills remaining space)
```

---

## Sidebar

Standard app sidebar (`.app-sidebar`):

- `.sidebar-logo` — Grove logo mark
- `.sidebar-nav` with `.nav-item` entries:
  - **Inbox** — `.nav-item.active` with `.nav-badge` showing unread conversation count (computed from `conversations.filter(c => c.unreadByStaff).length`)
  - **Guests** — `.nav-item` linking to `/guests`
  - **Knowledge** — `.nav-item` linking to `/knowledge`
  - **Analytics** — `.nav-item` linking to `/analytics` (visible to admin role only)
  - **Settings** — `.nav-item` linking to `/settings` (visible to admin role only)
- `.sidebar-footer` — Current user avatar + name (`MOCK_DB.currentUser.name`: "Maria Chen"), logout action

---

## Left Panel — Conversation List (`.inbox-list`)

### Search Bar

- `.conversation-search` containing an `.input` element
- Placeholder: "Search conversations..."
- Vue ref: `searchQuery`
- Searches guest name, phone number, and message preview via `MOCK_DB.helpers.search(conversations, ['guestName', 'guestPhone', 'lastMessagePreview'], searchQuery)`

### Filter Tabs

- `.tab-bar` with four `.tab` items:
  - **All** `.tab.active` (default) with `.tab-count` showing total count
  - **Active** `.tab` with `.tab-count` showing active count
  - **Waiting** `.tab` with `.tab-count` showing waiting count
  - **Resolved** `.tab` with `.tab-count` showing resolved count
- Vue ref: `activeFilter` (values: `'all'`, `'active'`, `'waiting'`, `'resolved'`)
- Filtering: `MOCK_DB.helpers.filterBy(conversations, 'status', activeFilter)` when not `'all'`

### Conversation List

- `.conversation-list` containing `.conversation-item` for each conversation
- Data source: `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id)`, sorted by `lastMessageAt` descending via `MOCK_DB.helpers.sortBy(conversations, 'lastMessageAt', 'desc')`
- Each `.conversation-item` contains:
  - `.conversation-avatar` — Guest initial or avatar
  - `.conversation-body`:
    - `.conversation-name` — Guest name from `MOCK_DB.helpers.getById(MOCK_DB.guests, conversation.guestId).name`
    - `.conversation-preview` — `conversation.lastMessagePreview` (truncated)
  - `.conversation-meta`:
    - `.conversation-time` — Relative timestamp from `conversation.lastMessageAt`
    - `.conversation-status` with appropriate modifier:
      - `.conversation-status.active` — green dot
      - `.conversation-status.waiting` — yellow dot
      - `.conversation-status.resolved` — grey dot
- State classes:
  - `.conversation-item.selected` — applied when `conversation.id === selectedConversationId`
  - `.conversation-item.unread` — applied when `conversation.unreadByStaff === true`
- Click handler: sets `selectedConversationId` to `conversation.id`

---

## Right Panel — No Conversation Selected

When `selectedConversationId` is `null`:

- `.empty-state` centered in `.inbox-thread`:
  - `.empty-icon` — message bubble icon
  - `.empty-title` — "Select a conversation"
  - `.empty-desc` — "Choose a conversation from the list to view the message thread."

---

## Right Panel — Conversation Selected (`.inbox-thread`)

When `selectedConversationId` is set, the right panel displays:

### Conversation Header

Top bar within `.inbox-thread`:

- Guest name (linked, clickable to `/guests/:guestId`) and phone number
- Category badge using `.badge` with category modifier (e.g., `.badge-category-dining`, `.badge-category-transport`, `.badge-category-housekeeping`, `.badge-category-activities`, `.badge-category-information`, `.badge-category-complaint`, `.badge-category-other`)
- Assignee dropdown (`.select`): lists team members from `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)`, current value from `conversation.assignedToUserId`
- Resolve button (`.btn.btn-secondary.btn-sm`): "Resolve" — triggers confirmation modal

### Message Thread

- `.message-thread` — scrollable container, auto-scrolls to bottom on load
- Data source: `MOCK_DB.helpers.getConversationMessages(selectedConversationId)` (returns messages sorted ascending by `createdAt`)
- Messages grouped by time with `.message-timestamp` separators between groups
- Each message rendered as a `.message-group` containing one or more `.message-bubble` elements:

  **Guest messages:**
  - `.message-guest` wrapper, left-aligned
  - `.message-bubble` with guest bubble styling
  - `.message-bubble-time` — timestamp
  - `.message-sender` — guest name

  **Staff messages:**
  - `.message-staff` wrapper, right-aligned
  - `.message-bubble` with staff bubble styling
  - `.message-bubble-time` — timestamp
  - `.message-sender` — staff member name from `MOCK_DB.helpers.getById(MOCK_DB.users, message.senderUserId).name`

  **AI messages:**
  - `.message-ai` wrapper, right-aligned
  - `.message-bubble` with AI bubble styling
  - `.badge-ai` — "AI" label badge within the bubble
  - `.message-bubble-time` — timestamp

  **Internal notes:**
  - `.message-note` wrapper, full-width
  - `.message-note-label` — "Staff Only"
  - `.message-bubble` with note styling (yellow/amber background)
  - `.message-sender` — staff member name

### Response Area

- `.response-area` at the bottom of `.inbox-thread`

  **AI Draft Bar** (shown when AI has a draft suggestion for the conversation):
  - `.ai-draft-bar` containing:
    - `.ai-draft-text` — The AI-suggested response text
    - `.ai-draft-actions` — Two buttons:
      - "Use" (`.btn.btn-primary.btn-sm`) — populates `.response-input` with the draft text
      - "Dismiss" (`.btn.btn-ghost.btn-sm`) — hides the draft bar

  **Quick Action Chips:**
  - `.quick-action-chips` containing `.quick-action-chip` for each action
  - Data source: `MOCK_DB.helpers.getPropertyQuickActions(MOCK_DB.currentProperty.id)`
  - Each `.quick-action-chip` displays the quick action title
  - Click handler: populates `.response-input` with `quickAction.templateBody`

  **Response Input Row:**
  - `.response-input-row` containing:
    - `.response-input` — Multi-line textarea for composing messages
    - `.response-input.note-mode` — Applied when `noteMode` is true (yellow/amber styling)
    - Send button (`.btn.btn-primary`) — "Send"
  - Vue ref: `responseText`
  - Vue ref: `noteMode` (boolean, default `false`)

  **Response Actions:**
  - `.response-actions` containing `.response-actions-left`:
    - Note toggle button (`.btn.btn-ghost.btn-sm`) — toggles `noteMode` ref. Label: "Note" / "Message" depending on state
    - Attachment button (`.btn.btn-ghost.btn-sm`) — icon button (prototype only, shows toast on click)
    - `.sms-counter` — Character count and SMS segment indicator (e.g., "45/160 (1 SMS)")

---

## Interactive States

### Tab Filtering
- Vue ref: `activeFilter` — string, default `'all'`
- Clicking a tab sets `activeFilter` and filters the conversation list
- Tab counts update to reflect filtered totals

### Conversation Selection
- Vue ref: `selectedConversationId` — string or null, default `null`
- Clicking a `.conversation-item` sets the selected ID
- URL updates to `/inbox/:id` (prototype can use hash routing)
- Right panel renders the selected conversation's thread

### Search
- Vue ref: `searchQuery` — string, default `''`
- Filters conversation list in real time as user types
- Uses `MOCK_DB.helpers.search()` across guest name, phone, and message preview
- Empty search results: `.empty-state` with `.empty-title` "No conversations found" and `.empty-desc` "Try a different search term."

### Send Message
- Click "Send" button or press Enter (Shift+Enter for newline)
- If `noteMode` is `false`: simulates sending an SMS — shows toast `MOCK_DB.copy.toasts.messageSent` ("Message sent.")
- If `noteMode` is `true`: simulates adding an internal note — adds a note-styled message to the thread
- Clears `responseText` after send
- On failure: toast `MOCK_DB.copy.toasts.messageFailed` ("Message couldn't be sent. Try again.")

### Toggle Note Mode
- Vue ref: `noteMode` — boolean
- When `true`: `.response-input` gets `.response-input.note-mode` class (yellow/amber styling), send button label changes to "Add Note"
- When `false`: normal message mode

### Use AI Draft
- Clicking "Use" on `.ai-draft-bar` copies `ai-draft-text` content into `.response-input`
- Hides the draft bar
- Staff can edit before sending

### Resolve Conversation
- Clicking "Resolve" button opens a confirmation modal:
  - `.modal-backdrop` + `.modal-box`
  - `.modal-title` — from `MOCK_DB.copy.confirmDialogs.resolveConversation`: "Resolve this conversation?"
  - `.modal-body` — "You can always reopen it if {guestName} messages again."
  - `.modal-actions`:
    - "Resolve" (`.btn.btn-primary`) — resolves, shows toast `MOCK_DB.copy.toasts.conversationResolved` ("Conversation resolved."), moves conversation to resolved filter
    - "Cancel" (`.btn.btn-secondary`) — closes modal

### Assign Conversation
- Dropdown (`.select`) in conversation header
- Options populated from `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)`
- Changing selection updates `conversation.assignedToUserId`

---

## Data Bindings

| UI Element | MOCK_DB Source |
|-----------|---------------|
| Conversation list | `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id)` |
| Guest name in list | `MOCK_DB.helpers.getById(MOCK_DB.guests, conversation.guestId).name` |
| Message thread | `MOCK_DB.helpers.getConversationMessages(selectedConversationId)` |
| Guest info in header | `MOCK_DB.helpers.getById(MOCK_DB.guests, conversation.guestId)` |
| Team members (assign) | `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)` |
| Quick actions | `MOCK_DB.helpers.getPropertyQuickActions(MOCK_DB.currentProperty.id)` |
| Unread badge count | `MOCK_DB.helpers.getPropertyConversations(MOCK_DB.currentProperty.id).filter(c => c.unreadByStaff).length` |
| Toast copy | `MOCK_DB.copy.toasts.messageSent`, `.messageFailed`, `.conversationResolved` |
| Confirm dialog copy | `MOCK_DB.copy.confirmDialogs.resolveConversation` |
| Empty state copy | `MOCK_DB.copy.emptyStates.inbox` |
| Current user | `MOCK_DB.currentUser` ("Maria Chen") |
| Current property | `MOCK_DB.currentProperty` ("The Linden", `prop_linden`) |

---

## Edge Cases

### Empty Inbox
- When no conversations exist for the property
- `.empty-state` replaces the conversation list area:
  - `.empty-icon` — inbox icon
  - `.empty-title` — `MOCK_DB.copy.emptyStates.inbox.headline`: "Your inbox is quiet."
  - `.empty-desc` — `MOCK_DB.copy.emptyStates.inbox.description`: "When guests text your Grove number, conversations will appear here."
- Prototype control: toggle button to simulate empty/populated inbox

### No Conversation Selected
- Default state on page load (no `:id` in URL)
- Right panel shows "Select a conversation" empty state
- On mobile: only the conversation list is visible

### Empty Search Results
- When `searchQuery` matches no conversations
- Conversation list area shows inline empty state: "No conversations found"

### Long Messages
- Message bubbles should wrap text naturally
- SMS counter in response area tracks character count and segment count

---

## Navigation Links

| Element | Destination |
|---------|------------|
| Guest name in conversation header | `/guests/:guestId` (guest profile) |
| Sidebar: Guests | `/guests` |
| Sidebar: Knowledge | `/knowledge` |
| Sidebar: Analytics | `/analytics` |
| Sidebar: Settings | `/settings` |

---

## Prototype Controls

- **Empty inbox toggle** — Switch between populated and empty inbox states
- **Conversation selector** — Dropdown to quickly select different demo conversations (from sample data: Sarah M. restaurant request, James T. AC complaint, Anna K. returning guest)
- **AI draft toggle** — Show/hide the AI draft suggestion bar

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/inbox-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
