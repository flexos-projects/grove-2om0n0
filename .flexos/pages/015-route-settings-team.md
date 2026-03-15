---
id: page-settings-team
title: "Settings — Team Management"
type: page
subtype: route
status: active
sequence: 32
route: /settings/team
prototype: "prototype/settings-team-v1.html"
description: "Team management page for inviting staff, managing roles, and removing members. Shows seat usage against plan limits."
relatesTo:
  - core-features # F-002 Team Management
  - core-flows # Flow 6 Team Invitation
  - core-content # toast messages, confirmation dialogs
  - core-database # propertyMembers, invites, users
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings — Team page.
Route: /settings/team
Prototype: settings-team-v1.html (pending generation)

Key decisions:
- Layout: app shell + settings sub-nav (active: Team)
- Primary data: propertyMembers joined with users, invites
- Main interactions: invite modal, change role, remove member with confirmation
- Seat limit enforcement from planLimits
</flex_block>

## Route
`/settings/team`
Prototype file: `settings-team-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
Manage the property's team members. Invite new staff by email, assign roles (Admin/Staff), remove members, and track seat usage against plan limits.

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
  - `.nav-item.active` "Team" → `settings-team-v1.html`
  - `.nav-item` "Routing" → `settings-routing-v1.html`
  - `.nav-item` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item` "Billing" → `settings-billing-v1.html`

### Page Header
- **Wrapper:** `.page-header`
- **Components used:** `.page-title`, `.page-meta`, `.text-h2`, `.text-secondary`, `.btn`, `.btn-md`, `.btn-primary`
- **Copy:**
  - H2 (`.text-h2`): "Team"
  - Meta (`.page-meta .text-secondary`): "{memberCount} of {seatLimit} seats used"
  - Button (`.btn .btn-md .btn-primary`): "Invite Member"
- **Data:**
  - Member count: `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id).length`
  - Seat limit: `MOCK_DB.helpers.getPlanLimits(MOCK_DB.currentProperty.planTier).staffSeats`

### Team Members Table
- **Wrapper:** `.table-wrapper`
- **Components used:** `.table`, `.badge-role-admin`, `.badge-role-staff`, `.text-body`, `.text-secondary`, `.text-small`, `.btn`, `.btn-sm`, `.btn-ghost`, `.btn-danger`, `.select`
- **Columns:** Name, Email, Role, Last Active, Actions
- **Data:** `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)`
- **Row content:**
  - Name: `.text-body` member name
  - Email: `.text-secondary .text-small` member email
  - Role: `.badge .badge-role-admin` or `.badge .badge-role-staff`
  - Last Active: `.text-small .text-tertiary` relative timestamp
  - Actions: Role change `.select` dropdown + "Remove" `.btn .btn-sm .btn-danger` (hidden for current user if last admin)

### Pending Invites Section
- **Wrapper:** Below team table
- **Components used:** `.text-h3`, `.table-wrapper`, `.table`, `.badge`, `.badge-waiting`, `.btn`, `.btn-sm`, `.btn-ghost`, `.btn-secondary`
- **Copy:** H3 (`.text-h3`): "Pending Invites"
- **Data:** `MOCK_DB.helpers.getPropertyInvites(MOCK_DB.currentProperty.id)` filtered to status === 'pending'
- **Columns:** Email, Role, Status, Actions
- **Row content:**
  - Email: `.text-body` invite email
  - Role: `.badge .badge-role-admin` or `.badge .badge-role-staff`
  - Status: `.badge .badge-waiting` "Pending"
  - Actions: "Re-send" `.btn .btn-sm .btn-secondary` + "Cancel" `.btn .btn-sm .btn-ghost`

## Interactive States

### Invite Member Modal
- **Trigger:** Click "Invite Member" button
- **Vue refs:**
  ```js
  const showInviteModal = ref(false)
  const inviteEmail = ref('')
  const inviteRole = ref('staff')
  const inviteErrors = ref({})
  const isInviting = ref(false)
  ```
- **Implementation:**
  ```js
  async function sendInvite() {
    const errors = {}
    if (!inviteEmail.value.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.value)) errors.email = 'Enter a valid email address'
    // Check if already a member
    const team = MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)
    if (team.find(m => m.email === inviteEmail.value)) errors.email = 'This person is already on your team.'
    inviteErrors.value = errors
    if (Object.keys(errors).length > 0) return

    isInviting.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    isInviting.value = false
    showInviteModal.value = false
    inviteEmail.value = ''
    inviteRole.value = 'staff'
    showToast(MOCK_DB.copy.toasts.teamMemberInvited.replace('{email}', inviteEmail.value))
  }
  ```
- **Modal markup:**
  - `.modal-backdrop` + `.modal-box`
  - `.modal-title`: "Invite Team Member"
  - `.modal-body`: `.form-group` with email `.input` + role `.select` (Admin/Staff)
  - `.modal-actions`: "Cancel" `.btn .btn-secondary` + "Send Invite" `.btn .btn-primary .btn-loading` (when submitting)

### Change Role
- **Trigger:** Select new role from dropdown on a team member row
- **Vue ref:** Per-member reactive role
- **Implementation:**
  ```js
  async function changeRole(memberId, newRole) {
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Settings saved.')
  }
  ```
- **Before:** Current role shown in dropdown
- **After:** Role badge updates, toast: "Settings saved."

### Remove Team Member
- **Trigger:** Click "Remove" button on a team member row
- **Vue refs:**
  ```js
  const showRemoveDialog = ref(false)
  const memberToRemove = ref(null)
  ```
- **Implementation:**
  ```js
  function confirmRemove(member) {
    memberToRemove.value = member
    showRemoveDialog.value = true
  }
  async function removeMember() {
    await new Promise(resolve => setTimeout(resolve, 800))
    showRemoveDialog.value = false
    showToast(MOCK_DB.copy.toasts.teamMemberRemoved.replace('{name}', memberToRemove.value.name))
    memberToRemove.value = null
  }
  ```
- **Confirmation dialog:**
  - `.modal-backdrop` + `.modal-box`
  - `.modal-title`: from `MOCK_DB.copy.confirmDialogs.removeTeamMember.title` — "Remove {name}?"
  - `.modal-body`: from `MOCK_DB.copy.confirmDialogs.removeTeamMember.body` — "They'll lose access to {propertyName} immediately."
  - `.modal-actions`: "Cancel" `.btn .btn-secondary` + "Remove" `.btn .btn-danger`
- **After:** Member removed from table, seat count decremented, toast shown

### Re-send Invite
- **Trigger:** Click "Re-send" on a pending invite row
- **Implementation:**
  ```js
  async function resendInvite(invite) {
    await new Promise(resolve => setTimeout(resolve, 600))
    showToast(MOCK_DB.copy.toasts.teamMemberInvited.replace('{email}', invite.email))
  }
  ```

### Cancel Invite
- **Trigger:** Click "Cancel" on a pending invite row
- **Implementation:**
  ```js
  async function cancelInvite(invite) {
    await new Promise(resolve => setTimeout(resolve, 400))
    // Remove invite from list
  }
  ```

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-success`, `.toast-error`
- **Implementation:**
  ```js
  const toasts = ref([])
  function showToast(message, type = 'success') {
    const id = Date.now()
    toasts.value.push({ id, message, type })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 5000)
  }
  ```

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Team members table | `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)` | Returns [{id, email, name, role, membershipId}] |
| Pending invites | `MOCK_DB.helpers.getPropertyInvites(MOCK_DB.currentProperty.id)` | Filtered to status === 'pending' |
| Seat limit | `MOCK_DB.helpers.getPlanLimits(MOCK_DB.currentProperty.planTier).staffSeats` | Number (2, 5, or 15) |
| Seat count | `MOCK_DB.helpers.getPropertyTeam(...).length` | Current member count |
| Confirmation copy | `MOCK_DB.copy.confirmDialogs.removeTeamMember` | {title, body, confirm} |
| Toast: invited | `MOCK_DB.copy.toasts.teamMemberInvited` | "Invitation sent to {email}." |
| Toast: removed | `MOCK_DB.copy.toasts.teamMemberRemoved` | "{name} has been removed from the team." |
| Current user | `MOCK_DB.currentUser` | To prevent self-removal if last admin |
| Plan badge | `MOCK_DB.currentProperty.planTier` | Sidebar footer |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Seat limit reached | All seats occupied per plan tier | "Invite Member" button disabled, `.text-small .text-secondary`: "Your plan's seat limit has been reached." from `MOCK_DB.copy.planLimitMessages` |
| Last admin removal | Only one admin on the team | "Remove" button hidden for that member |
| Duplicate invite email | Enter email of existing team member | `.form-error`: "This person is already on your team." |
| No pending invites | No invites with status 'pending' | Pending invites section hidden entirely |
| Self in table | Current user appears in team list | "Remove" button hidden for own row |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Inbox | inbox-v1.html | Always |
| Guests | guests-v1.html | Always |
| Knowledge | knowledge-v1.html | Always |
| Analytics | analytics-v1.html | Admin only |
| Settings | settings-v1.html | Admin only |
| Property | settings-property-v1.html | Settings sub-nav |
| Team | settings-team-v1.html | Settings sub-nav, current |
| Routing | settings-routing-v1.html | Settings sub-nav |
| Quick Actions | settings-quick-actions-v1.html | Settings sub-nav |
| AI Voice | settings-ai-voice-v1.html | Settings sub-nav |
| Billing | settings-billing-v1.html | Settings sub-nav |
| Group Overview | group-v1.html | Group plan only |
| Properties | group-properties-v1.html | Group plan only |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/settings-team-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
