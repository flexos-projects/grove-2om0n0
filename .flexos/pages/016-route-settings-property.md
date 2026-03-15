---
id: page-settings-property
title: "Settings — Property"
type: page
subtype: route
status: active
sequence: 33
route: /settings/property
prototype: "prototype/settings-property-v1.html"
description: "Property settings page for configuring property name, address, timezone, operating hours, check-in/out times, greeting message, AI voice preset, phone number, and logo."
relatesTo:
  - core-features # F-013 Property Settings
  - core-content # toast messages
  - core-database # properties collection
  - core-design # form inputs, radio cards
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings — Property page.
Route: /settings/property
Prototype: settings-property-v1.html (pending generation)

Key decisions:
- Layout: app shell + settings sub-nav (active: Property)
- Primary data: MOCK_DB.currentProperty
- Main interactions: form editing, save with loading + toast, copy phone number, logo upload preview
- AI voice preset: 3 radio cards with example preview text
</flex_block>

## Route
`/settings/property`
Prototype file: `settings-property-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
Configure property details including name, address, timezone, operating hours, check-in/out times, SMS greeting, AI voice preset, and logo. All fields are editable by admins.

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
  - `.nav-item.active` "Property" → `settings-property-v1.html`
  - `.nav-item` "Team" → `settings-team-v1.html`
  - `.nav-item` "Routing" → `settings-routing-v1.html`
  - `.nav-item` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item` "Billing" → `settings-billing-v1.html`

### Page Header
- **Wrapper:** `.page-header`
- **Copy:** H2 (`.text-h2`): "Property"
- **Components used:** `.page-title`, `.text-h2`

### Property Name
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Property Name"
- **Input:** `.input` type="text" bound to `MOCK_DB.currentProperty.name`
- **Data:** `MOCK_DB.currentProperty.name`

### Address
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Address"
- **Input:** `.input` type="text" bound to `MOCK_DB.currentProperty.address`
- **Data:** `MOCK_DB.currentProperty.address`

### Timezone
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Timezone"
- **Input:** `.select` with IANA timezone options, bound to `MOCK_DB.currentProperty.timezone`
- **Data:** `MOCK_DB.currentProperty.timezone`

### Operating Hours
- **Wrapper:** `.form-group` with two side-by-side selects
- **Copy:** Label (`.form-label`): "Operating Hours"
- **Hint:** `.form-hint` "Staff availability hours. Requests outside these hours are handled by AI only."
- **Inputs:**
  - "Start" `.select` with time options (e.g. 07:00, 08:00...) bound to `MOCK_DB.currentProperty.operatingHoursStart`
  - "End" `.select` with time options bound to `MOCK_DB.currentProperty.operatingHoursEnd`

### Check-in / Check-out Times
- **Wrapper:** `.form-group` with two side-by-side selects
- **Copy:** Label (`.form-label`): "Check-in / Check-out"
- **Hint:** `.form-hint` "Used for visit grouping in guest profiles."
- **Inputs:**
  - "Check-in" `.select` bound to `MOCK_DB.currentProperty.checkInTime`
  - "Check-out" `.select` bound to `MOCK_DB.currentProperty.checkOutTime`

### SMS Greeting Message
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "SMS Greeting Message"
- **Hint:** `.form-hint` "Automatically sent when a guest texts your number for the first time."
- **Input:** `.textarea` (3 rows) bound to `MOCK_DB.currentProperty.greetingMessage`
- **Data:** `MOCK_DB.currentProperty.greetingMessage`

### AI Voice Preset
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "AI Voice"
- **Hint:** `.form-hint` "Choose the tone your AI responses will use."
- **Components used:** `.card` (3 radio cards side by side)
- **Data:** `MOCK_DB.currentProperty.aiVoice` (one of: casual, warm, formal)
- **Radio cards:**
  - **Casual:** `.card` with radio input. Title (`.text-h4`): "Casual". Preview (`.text-small .text-secondary`): "Hey! Great question — there's an amazing Italian place just around the corner called Trattoria Sorrento. Want me to check if they have a table tonight?"
  - **Warm:** `.card` with radio input. Title (`.text-h4`): "Warm". Preview (`.text-small .text-secondary`): "I'd love to help with that! I'd recommend Trattoria Sorrento — it's a lovely Italian restaurant just a 5-minute walk from the hotel. Shall I look into availability for you?"
  - **Formal:** `.card` with radio input. Title (`.text-h4`): "Formal". Preview (`.text-small .text-secondary`): "Certainly. I would recommend Trattoria Sorrento, an excellent Italian restaurant approximately five minutes from the hotel. Would you like me to inquire about availability?"

### Phone Number
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "SMS Phone Number"
- **Hint:** `.form-hint` "This is the number guests text. It cannot be changed."
- **Display:** `.input` (read-only, disabled) showing `MOCK_DB.currentProperty.phoneNumber` + "Copy" `.btn .btn-sm .btn-ghost` button
- **Data:** `MOCK_DB.currentProperty.phoneNumber`

### Logo Upload
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Property Logo"
- **Hint:** `.form-hint` "Used in the dashboard. Not guest-facing. PNG, JPG, or SVG. Max 5MB."
- **Components:** Upload area (dashed border, click to upload) with preview if logo exists

### Save Button
- **Wrapper:** Bottom of form, right-aligned
- **Components used:** `.btn`, `.btn-md`, `.btn-primary`, `.btn-loading`
- **Copy:** "Save Changes"

## Interactive States

### Form Editing and Save
- **Trigger:** Edit any field and click "Save Changes"
- **Vue refs:**
  ```js
  const propertyName = ref(MOCK_DB.currentProperty.name)
  const address = ref(MOCK_DB.currentProperty.address)
  const timezone = ref(MOCK_DB.currentProperty.timezone)
  const operatingHoursStart = ref(MOCK_DB.currentProperty.operatingHoursStart)
  const operatingHoursEnd = ref(MOCK_DB.currentProperty.operatingHoursEnd)
  const checkInTime = ref(MOCK_DB.currentProperty.checkInTime)
  const checkOutTime = ref(MOCK_DB.currentProperty.checkOutTime)
  const greetingMessage = ref(MOCK_DB.currentProperty.greetingMessage)
  const aiVoice = ref(MOCK_DB.currentProperty.aiVoice)
  const isSaving = ref(false)
  ```
- **Implementation:**
  ```js
  async function saveSettings() {
    isSaving.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    isSaving.value = false
    showToast(MOCK_DB.copy.toasts.settingsSaved)
  }
  ```
- **Before:** Button says "Save Changes"
- **After click:** Button shows `.btn-loading` "Saving...", then toast: "Settings saved."

### Copy Phone Number
- **Trigger:** Click "Copy" button next to phone number
- **Implementation:**
  ```js
  function copyPhoneNumber() {
    navigator.clipboard.writeText(MOCK_DB.currentProperty.phoneNumber)
    showToast('Number copied.')
  }
  ```
- **After:** Toast: "Number copied."

### Logo Upload Preview
- **Trigger:** Click upload area or drop a file
- **Vue refs:**
  ```js
  const logoPreview = ref(null)
  ```
- **Implementation:**
  ```js
  function handleLogoUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showToast('File too large. Maximum size is 10MB.', 'error')
      return
    }
    logoPreview.value = URL.createObjectURL(file)
  }
  ```
- **Before:** Upload area with placeholder
- **After:** Image preview shown in upload area

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-success`, `.toast-error`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Property name input | `MOCK_DB.currentProperty.name` | Editable |
| Address input | `MOCK_DB.currentProperty.address` | Editable |
| Timezone select | `MOCK_DB.currentProperty.timezone` | Editable |
| Operating hours start | `MOCK_DB.currentProperty.operatingHoursStart` | Editable |
| Operating hours end | `MOCK_DB.currentProperty.operatingHoursEnd` | Editable |
| Check-in time | `MOCK_DB.currentProperty.checkInTime` | Editable |
| Check-out time | `MOCK_DB.currentProperty.checkOutTime` | Editable |
| Greeting message | `MOCK_DB.currentProperty.greetingMessage` | Editable |
| AI voice preset | `MOCK_DB.currentProperty.aiVoice` | Radio selection |
| Phone number | `MOCK_DB.currentProperty.phoneNumber` | Read-only display |
| Toast: saved | `MOCK_DB.copy.toasts.settingsSaved` | "Settings saved." |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |
| Plan badge | `MOCK_DB.currentProperty.planTier` | Sidebar footer |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Empty property name | Clear name field and save | `.form-error`: "Property name is required" |
| Empty address | Clear address field and save | `.form-error`: "Address is required" |
| Invalid file type for logo | Upload a .gif or .pdf | `.toast-error`: "File type not supported. Use PNG, JPG, or SVG." |
| File too large | Upload file > 5MB | `.toast-error`: "File too large. Maximum size is 10MB." |
| No changes made | Click save without edits | Still shows toast (no dirty checking in prototype) |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Inbox | inbox-v1.html | Always |
| Guests | guests-v1.html | Always |
| Knowledge | knowledge-v1.html | Always |
| Analytics | analytics-v1.html | Admin only |
| Settings | settings-v1.html | Admin only |
| Property | settings-property-v1.html | Settings sub-nav, current |
| Team | settings-team-v1.html | Settings sub-nav |
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
    { "file": "prototype/settings-property-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
