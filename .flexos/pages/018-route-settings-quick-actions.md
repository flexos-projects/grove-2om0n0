---
id: page-settings-quick-actions
title: "Settings — Quick Actions"
type: page
subtype: route
status: active
sequence: 35
route: /settings/quick-actions
prototype: "prototype/settings-quick-actions-v1.html"
description: "Quick actions management page for creating, editing, reordering, and hiding pre-configured response templates."
relatesTo:
  - core-features # F-008 Quick Actions
  - core-content # toast messages, confirmation dialogs, seed data
  - core-database # quickActions collection
  - core-design # cards, modals, badges
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings — Quick Actions page.
Route: /settings/quick-actions
Prototype: settings-quick-actions-v1.html (pending generation)

Key decisions:
- Layout: app shell + settings sub-nav (active: Quick Actions)
- Primary data: quickActions (including hidden ones for management)
- Main interactions: add/edit modal, delete with confirmation, toggle hide/show, simulated reorder
- System defaults show a "Default" badge and cannot be deleted (only hidden)
</flex_block>

## Route
`/settings/quick-actions`
Prototype file: `settings-quick-actions-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
Manage pre-configured response templates that appear as quick action chips in the conversation view. Create custom actions, edit templates, hide system defaults, and reorder the list.

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
  - `.nav-item.active` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item` "Billing" → `settings-billing-v1.html`

### Page Header
- **Wrapper:** `.page-header`
- **Copy:**
  - H2 (`.text-h2`): "Quick Actions"
  - Description (`.text-body .text-secondary`): "Pre-configured response templates for common requests. These appear as chips above the reply field in conversations."
  - Button (`.btn .btn-md .btn-primary`): "Add Quick Action"
- **Components used:** `.page-title`, `.text-h2`, `.text-body`, `.text-secondary`, `.btn`, `.btn-md`, `.btn-primary`

### Quick Actions List
- **Wrapper:** Vertical card list
- **Components used:** `.card`, `.text-h4`, `.text-body`, `.text-small`, `.text-secondary`, `.text-tertiary`, `.badge`, `.btn`, `.btn-sm`, `.btn-ghost`, `.btn-danger`
- **Data:** All quick actions for the property (including hidden), from `MOCK_DB.helpers.getPropertyQuickActions(MOCK_DB.currentProperty.id)` plus hidden ones from `MOCK_DB.quickActions` filtered by propertyId
- **Card content per action:**
  - Title (`.text-h4`): quick action title
  - Template preview (`.text-small .text-tertiary`): templateBody truncated to 120 characters
  - Default badge: `.badge` "Default" if `isDefault === true`
  - Hidden indicator: `.text-xs .text-tertiary` "Hidden" if `isHidden === true`, with reduced opacity on the card
  - Actions row:
    - "Edit" `.btn .btn-sm .btn-ghost`
    - "Hide" / "Show" `.btn .btn-sm .btn-ghost` (toggle based on `isHidden`)
    - "Delete" `.btn .btn-sm .btn-danger` (only for custom actions, not system defaults)
  - Drag handle icon (left side, for simulated reorder)

## Interactive States

### Add Quick Action Modal
- **Trigger:** Click "Add Quick Action" button
- **Vue refs:**
  ```js
  const showActionModal = ref(false)
  const editingAction = ref(null)
  const actionTitle = ref('')
  const actionTemplateBody = ref('')
  const actionErrors = ref({})
  const isSavingAction = ref(false)
  ```
- **Modal markup:**
  - `.modal-backdrop` + `.modal-box`
  - `.modal-title`: "Add Quick Action" (or "Edit Quick Action" when editing)
  - `.modal-body`:
    - `.form-group` > `.form-label` "Title" + `.input` placeholder="e.g. Restaurant Rec"
    - `.form-group` > `.form-label` "Response Template" + `.textarea` (5 rows) placeholder="Type your template..."
    - `.form-hint`: "Use {guest_name} to insert the guest's name automatically."
  - `.modal-actions`: "Cancel" `.btn .btn-secondary` + "Save" `.btn .btn-primary .btn-loading` (when saving)
- **Implementation:**
  ```js
  function openAddModal() {
    editingAction.value = null
    actionTitle.value = ''
    actionTemplateBody.value = ''
    actionErrors.value = {}
    showActionModal.value = true
  }

  function openEditModal(action) {
    editingAction.value = action
    actionTitle.value = action.title
    actionTemplateBody.value = action.templateBody
    actionErrors.value = {}
    showActionModal.value = true
  }

  async function saveAction() {
    const errors = {}
    if (!actionTitle.value.trim()) errors.title = 'Title is required'
    if (!actionTemplateBody.value.trim()) errors.templateBody = 'Template body is required'
    actionErrors.value = errors
    if (Object.keys(errors).length > 0) return

    isSavingAction.value = true
    await new Promise(resolve => setTimeout(resolve, 800))
    isSavingAction.value = false
    showActionModal.value = false
    showToast(MOCK_DB.copy.toasts.quickActionSaved)
  }
  ```
- **After save:** Toast: "Quick action saved."

### Edit Quick Action
- **Trigger:** Click "Edit" on any quick action card
- **Behaviour:** Opens same modal as add, pre-filled with existing values
- **After save:** Card updates with new title/template, toast shown

### Delete Quick Action
- **Trigger:** Click "Delete" on a custom quick action card
- **Vue refs:**
  ```js
  const showDeleteDialog = ref(false)
  const actionToDelete = ref(null)
  ```
- **Confirmation dialog:**
  - `.modal-backdrop` + `.modal-box`
  - `.modal-title`: from `MOCK_DB.copy.confirmDialogs.deleteQuickAction.title` — "Delete this quick action?"
  - `.modal-body`: from `MOCK_DB.copy.confirmDialogs.deleteQuickAction.body` — "Your team won't be able to use it anymore."
  - `.modal-actions`: "Keep" `.btn .btn-secondary` + "Delete" `.btn .btn-danger`
- **Implementation:**
  ```js
  function confirmDelete(action) {
    actionToDelete.value = action
    showDeleteDialog.value = true
  }

  async function deleteAction() {
    await new Promise(resolve => setTimeout(resolve, 600))
    showDeleteDialog.value = false
    actionToDelete.value = null
    // Remove from list
  }
  ```
- **After:** Card removed from list

### Toggle Hide/Show
- **Trigger:** Click "Hide" or "Show" on a quick action card
- **Implementation:**
  ```js
  async function toggleVisibility(action) {
    action.isHidden = !action.isHidden
    await new Promise(resolve => setTimeout(resolve, 400))
    showToast(MOCK_DB.copy.toasts.quickActionSaved)
  }
  ```
- **After hide:** Card shows "Hidden" label, opacity reduced
- **After show:** Card returns to full opacity, "Hidden" label removed

### Simulated Reorder
- **Trigger:** Drag a quick action card up or down (simulated with up/down arrow buttons in prototype)
- **Implementation:**
  ```js
  function moveAction(index, direction) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= quickActions.value.length) return
    const items = [...quickActions.value]
    const [moved] = items.splice(index, 1)
    items.splice(newIndex, 0, moved)
    quickActions.value = items
  }
  ```

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-success`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Quick actions list | `MOCK_DB.quickActions.filter(q => q.propertyId === MOCK_DB.currentProperty.id)` | All actions including hidden, sorted by sortOrder |
| Visible quick actions | `MOCK_DB.helpers.getPropertyQuickActions(MOCK_DB.currentProperty.id)` | Non-hidden, sorted — used as reference |
| Toast: saved | `MOCK_DB.copy.toasts.quickActionSaved` | "Quick action saved." |
| Confirm: delete | `MOCK_DB.copy.confirmDialogs.deleteQuickAction` | {title, body, confirm} |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |
| Plan badge | `MOCK_DB.currentProperty.planTier` | Sidebar footer |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| No custom quick actions | Only system defaults exist | List shows defaults with "Default" badges, "Add Quick Action" button prominent |
| All actions hidden | Every action has isHidden: true | List still shows all cards with "Hidden" labels. Note below header: "All quick actions are hidden. Your team won't see any quick action chips in conversations." |
| Empty title on save | Submit modal with blank title | `.form-error`: "Title is required" |
| Empty template on save | Submit modal with blank template | `.form-error`: "Template body is required" |
| Delete system default | N/A | "Delete" button not shown for default actions — only "Hide" is available |

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
| Quick Actions | settings-quick-actions-v1.html | Settings sub-nav, current |
| AI Voice | settings-ai-voice-v1.html | Settings sub-nav |
| Billing | settings-billing-v1.html | Settings sub-nav |
| Group Overview | group-v1.html | Group plan only |
| Properties | group-properties-v1.html | Group plan only |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/settings-quick-actions-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
