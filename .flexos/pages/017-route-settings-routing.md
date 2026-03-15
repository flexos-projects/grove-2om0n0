---
id: page-settings-routing
title: "Settings — Routing Rules"
type: page
subtype: route
status: active
sequence: 34
route: /settings/routing
prototype: "prototype/settings-routing-v1.html"
description: "Routing rules configuration page for mapping request categories to team members. Auto-saves on change."
relatesTo:
  - core-features # F-011 Request Categories & Routing
  - core-content # toast messages
  - core-database # routingRules, propertyMembers
  - core-design # tables, badges, dropdowns
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings — Routing page.
Route: /settings/routing
Prototype: settings-routing-v1.html (pending generation)

Key decisions:
- Layout: app shell + settings sub-nav (active: Routing)
- Primary data: routingRules + team members for assignee dropdown
- Main interactions: change assignee dropdown (auto-save), add rule, remove rule
- Categories: dining, transport, housekeeping, activities, information, complaint, other
</flex_block>

## Route
`/settings/routing`
Prototype file: `settings-routing-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
Configure request routing rules that automatically assign incoming conversations to specific team members based on AI-detected category. Each category can be mapped to one team member.

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
  - `.nav-item.active` "Routing" → `settings-routing-v1.html`
  - `.nav-item` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item` "Billing" → `settings-billing-v1.html`

### Page Header
- **Wrapper:** `.page-header`
- **Copy:**
  - H2 (`.text-h2`): "Routing"
  - Description (`.text-body .text-secondary`): "Route incoming requests to the right team member by category. When a guest message is categorised by AI, it will be automatically assigned to the team member you specify."
- **Components used:** `.page-title`, `.text-h2`, `.text-body`, `.text-secondary`

### Routing Rules Table
- **Wrapper:** `.table-wrapper`
- **Components used:** `.table`, `.badge`, `.badge-category-dining`, `.badge-category-transport`, `.badge-category-housekeeping`, `.badge-category-activities`, `.badge-category-information`, `.badge-category-complaint`, `.badge-category-other`, `.select`, `.btn`, `.btn-sm`, `.btn-ghost`
- **Columns:** Category, Assigned To, Actions
- **Data:** `MOCK_DB.helpers.getPropertyRoutingRules(MOCK_DB.currentProperty.id)`
- **Row content:**
  - Category: `.badge .badge-category-{category}` showing capitalised category name
  - Assigned To: `.select` dropdown populated with team members from `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)`. Shows member name. First option: "Unassigned (general queue)"
  - Actions: "Remove" `.btn .btn-sm .btn-ghost` to delete the routing rule
- **Categories available:** dining, transport, housekeeping, activities, information, complaint, other

### Add Routing Rule
- **Wrapper:** Below table
- **Components used:** `.btn`, `.btn-sm`, `.btn-secondary`
- **Copy:** "Add Routing Rule" button
- **Behaviour:** Shows a new row with category `.select` (only categories not already assigned) + assignee `.select` + "Save" `.btn .btn-sm .btn-primary`

## Interactive States

### Change Assignee (Auto-save)
- **Trigger:** Select a new team member from the assignee dropdown on any routing rule row
- **Vue refs:**
  ```js
  const routingRules = ref(MOCK_DB.helpers.getPropertyRoutingRules(MOCK_DB.currentProperty.id))
  const teamMembers = ref(MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id))
  ```
- **Implementation:**
  ```js
  async function updateAssignee(ruleId, newUserId) {
    const rule = routingRules.value.find(r => r.id === ruleId)
    if (rule) rule.assignToUserId = newUserId
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast(MOCK_DB.copy.toasts.routingRuleSaved)
  }
  ```
- **Before:** Current assignee selected in dropdown
- **After:** Dropdown updates, auto-saves, toast: "Routing rule updated."

### Add Routing Rule
- **Trigger:** Click "Add Routing Rule" button
- **Vue refs:**
  ```js
  const showAddRow = ref(false)
  const newRuleCategory = ref('')
  const newRuleAssignee = ref('')
  ```
- **Implementation:**
  ```js
  const availableCategories = computed(() => {
    const usedCategories = routingRules.value.map(r => r.category)
    return ['dining', 'transport', 'housekeeping', 'activities', 'information', 'complaint', 'other']
      .filter(c => !usedCategories.includes(c))
  })

  async function saveNewRule() {
    if (!newRuleCategory.value || !newRuleAssignee.value) return
    routingRules.value.push({
      id: 'rule_new_' + Date.now(),
      propertyId: MOCK_DB.currentProperty.id,
      category: newRuleCategory.value,
      assignToUserId: newRuleAssignee.value
    })
    showAddRow.value = false
    newRuleCategory.value = ''
    newRuleAssignee.value = ''
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast(MOCK_DB.copy.toasts.routingRuleSaved)
  }
  ```
- **Before:** Button visible, no add row
- **After:** New row appears with category select + assignee select + "Save" button

### Remove Routing Rule
- **Trigger:** Click "Remove" on a routing rule row
- **Implementation:**
  ```js
  async function removeRule(ruleId) {
    routingRules.value = routingRules.value.filter(r => r.id !== ruleId)
    await new Promise(resolve => setTimeout(resolve, 400))
    showToast(MOCK_DB.copy.toasts.routingRuleSaved)
  }
  ```
- **After:** Row removed from table, toast shown

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-success`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Routing rules table | `MOCK_DB.helpers.getPropertyRoutingRules(MOCK_DB.currentProperty.id)` | [{id, propertyId, category, assignToUserId}] |
| Assignee dropdowns | `MOCK_DB.helpers.getPropertyTeam(MOCK_DB.currentProperty.id)` | [{id, name, email, role}] for dropdown options |
| Toast: saved | `MOCK_DB.copy.toasts.routingRuleSaved` | "Routing rule updated." |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |
| Plan badge | `MOCK_DB.currentProperty.planTier` | Sidebar footer |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| No routing rules configured | Fresh property, no rules | `.empty-state` with `.empty-icon`, `.empty-title` "No routing rules yet", `.empty-desc` "By default, all requests go to the general queue. Add rules to automatically assign categories to team members." |
| All categories assigned | All 7 categories have rules | "Add Routing Rule" button disabled, `.text-small .text-secondary`: "All categories have been assigned." |
| Team has one member | Only the admin on the team | Assignee dropdown shows only that one member |
| Remove last rule | Delete all rules | Empty state shown |

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
| Routing | settings-routing-v1.html | Settings sub-nav, current |
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
    { "file": "prototype/settings-routing-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
