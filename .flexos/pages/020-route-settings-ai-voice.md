---
id: page-settings-ai-voice
title: "Settings — AI Voice Training"
type: page
subtype: route
status: active
sequence: 37
route: /settings/ai-voice
prototype: "prototype/settings-ai-voice-v1.html"
description: "AI voice training page for configuring brand voice description, preferred/avoided words, example Q&A pairs, and testing the voice with a live preview."
relatesTo:
  - core-features # F-015 Custom AI Voice Training
  - core-content # toast messages
  - core-database # aiVoiceConfig collection
  - core-design # form inputs, tag inputs, cards
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Settings — AI Voice Training page.
Route: /settings/ai-voice
Prototype: settings-ai-voice-v1.html (pending generation)

Key decisions:
- Layout: app shell + settings sub-nav (active: AI Voice)
- Primary data: aiVoiceConfig for the current property
- Main interactions: edit all fields, tag input for words, Q&A pair management, voice preview, save
- Plan gate: Professional and Group only. Starter sees upgrade prompt.
</flex_block>

## Route
`/settings/ai-voice`
Prototype file: `settings-ai-voice-v1.html`
Theme: `dark`
Auth required: `yes` (admin only)

## Purpose
Train the AI to match the hotel's voice by providing a brand description, preferred and avoided words, and example question-and-answer pairs. Includes a live preview to test the trained voice against sample questions.

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
  - `.nav-item` "Quick Actions" → `settings-quick-actions-v1.html`
  - `.nav-item.active` "AI Voice" → `settings-ai-voice-v1.html`
  - `.nav-item` "Billing" → `settings-billing-v1.html`

### Plan Gate (Starter only)
- **Wrapper:** `.card` (shown only when `MOCK_DB.currentProperty.planTier === 'starter'`)
- **Components used:** `.empty-state`, `.empty-icon`, `.empty-title`, `.empty-desc`, `.btn`, `.btn-md`, `.btn-primary`
- **Copy:**
  - `.empty-title`: "Custom AI Voice Training"
  - `.empty-desc`: "Train the AI to match your hotel's unique voice with example conversations, preferred language, and brand guidelines. Available on Professional and Group plans."
  - Button (`.btn .btn-md .btn-primary`): "Upgrade to Professional"
- **Behaviour:** When planTier is 'starter', only this section renders. All form fields below are hidden.

### Page Header (Professional/Group only)
- **Wrapper:** `.page-header`
- **Copy:** H2 (`.text-h2`): "AI Voice Training"
- **Components used:** `.page-title`, `.text-h2`

### Brand Voice Description
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Brand Voice Description"
- **Hint:** `.form-hint` "Describe your hotel's personality and communication style in 1-2 paragraphs. The AI will use this as a guide."
- **Input:** `.textarea` (5 rows) bound to `brandVoiceDescription`
- **Data:** `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).brandVoiceDescription`

### Words to Use
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Words to Use"
- **Hint:** `.form-hint` "Words and phrases the AI should prefer. Press Enter to add."
- **Components used:** `.badge`, `.input`, `.btn`, `.btn-sm`, `.btn-ghost`
- **Data:** `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).wordsToUse`
- **Display:** List of `.badge` tags, each with an "x" remove button. Below: `.input` (type="text", placeholder="Add a word or phrase...") for adding new tags.

### Words to Avoid
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Words to Avoid"
- **Hint:** `.form-hint` "Words and phrases the AI should never use. Press Enter to add."
- **Components used:** `.badge`, `.input`, `.btn`, `.btn-sm`, `.btn-ghost`
- **Data:** `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).wordsToAvoid`
- **Display:** Same tag input pattern as Words to Use.

### Example Q&A Pairs
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Example Conversations"
- **Hint:** `.form-hint` "Show the AI how you'd respond to common questions. Aim for 10-20 examples."
- **Components used:** `.card`, `.form-group`, `.form-label`, `.input`, `.textarea`, `.btn`, `.btn-sm`, `.btn-ghost`, `.btn-danger`, `.btn-secondary`
- **Data:** `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).examplePairs`
- **Per pair:** `.card` containing:
  - Label (`.form-label .text-small`): "Guest Question"
  - `.input` bound to pair question
  - Label (`.form-label .text-small`): "Ideal Response"
  - `.textarea` (3 rows) bound to pair idealResponse
  - "Remove" `.btn .btn-sm .btn-ghost` to delete the pair
- **Below pairs:** "Add Example" `.btn .btn-sm .btn-secondary`

### Voice Preview
- **Wrapper:** `.card`
- **Components used:** `.text-h3`, `.form-group`, `.input`, `.btn`, `.btn-md`, `.btn-secondary`, `.text-body`, `.text-secondary`
- **Copy:**
  - H3 (`.text-h3`): "Test Your Voice"
  - Description (`.text-small .text-secondary`): "Enter a sample guest question to see how the AI would respond with your current voice settings."
- **Input:** `.input` placeholder="e.g. Can you recommend a nice restaurant nearby?"
- **Button:** "Preview Response" `.btn .btn-md .btn-secondary`
- **Response area:** `.card` with simulated AI response text (`.text-body`)

### Save Button
- **Wrapper:** Bottom of form, right-aligned
- **Components used:** `.btn`, `.btn-md`, `.btn-primary`, `.btn-loading`
- **Copy:** "Save Changes"

## Interactive States

### Tag Input (Words to Use / Words to Avoid)
- **Trigger:** Type text and press Enter in the tag input field
- **Vue refs:**
  ```js
  const config = ref(MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id))
  const wordsToUse = ref([...config.value.wordsToUse])
  const wordsToAvoid = ref([...config.value.wordsToAvoid])
  const newWordToUse = ref('')
  const newWordToAvoid = ref('')
  ```
- **Implementation:**
  ```js
  function addWord(list, inputRef) {
    const word = inputRef.value.trim()
    if (word && !list.value.includes(word)) {
      list.value.push(word)
      inputRef.value = ''
    }
  }

  function removeWord(list, index) {
    list.value.splice(index, 1)
  }
  ```
- **Before:** Tags displayed, empty input
- **After:** New tag appears as `.badge`, input clears

### Add/Remove Q&A Pair
- **Trigger:** Click "Add Example" or "Remove" on a pair
- **Vue refs:**
  ```js
  const examplePairs = ref([...config.value.examplePairs])
  ```
- **Implementation:**
  ```js
  function addPair() {
    examplePairs.value.push({ question: '', idealResponse: '' })
  }

  function removePair(index) {
    examplePairs.value.splice(index, 1)
  }
  ```
- **After add:** New empty pair card appears at bottom
- **After remove:** Pair card removed

### Voice Preview
- **Trigger:** Type a question and click "Preview Response"
- **Vue refs:**
  ```js
  const previewQuestion = ref('')
  const previewResponse = ref('')
  const isPreviewing = ref(false)
  ```
- **Implementation:**
  ```js
  async function previewVoice() {
    if (!previewQuestion.value.trim()) return
    isPreviewing.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    // Simulated response based on current voice settings
    previewResponse.value = "I'd love to help with that! Based on your question, here's how the AI would respond using your configured voice and brand guidelines. This is a simulated preview for the prototype."
    isPreviewing.value = false
  }
  ```
- **Before:** Empty response area
- **After:** Simulated AI response displayed in response card

### Save All Changes
- **Trigger:** Click "Save Changes"
- **Vue refs:**
  ```js
  const isSaving = ref(false)
  ```
- **Implementation:**
  ```js
  async function saveVoiceConfig() {
    isSaving.value = true
    await new Promise(resolve => setTimeout(resolve, 1200))
    isSaving.value = false
    showToast(MOCK_DB.copy.toasts.aiVoiceUpdated)
  }
  ```
- **Before:** Button says "Save Changes"
- **After:** Button shows `.btn-loading` "Saving...", then toast: "AI voice updated. Changes take effect within the hour."

### Toast Notifications
- **Wrapper:** `.toast-container`
- **Components used:** `.toast-success`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Brand voice textarea | `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).brandVoiceDescription` | Editable |
| Words to use tags | `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).wordsToUse` | Array of strings |
| Words to avoid tags | `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).wordsToAvoid` | Array of strings |
| Example pairs | `MOCK_DB.helpers.getPropertyAiVoiceConfig(MOCK_DB.currentProperty.id).examplePairs` | Array of {question, idealResponse} |
| Toast: saved | `MOCK_DB.copy.toasts.aiVoiceUpdated` | "AI voice updated. Changes take effect within the hour." |
| Plan tier (gate check) | `MOCK_DB.currentProperty.planTier` | Show upgrade prompt for 'starter' |
| User name in sidebar | `MOCK_DB.currentUser.name` | Footer display |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Starter plan | planTier === 'starter' | All form fields hidden, upgrade prompt shown |
| No voice config exists | New property, no aiVoiceConfig record | All fields empty, ready for input |
| Empty example pairs | No Q&A pairs added | "Add Example" button shown, hint encourages 10-20 examples |
| Duplicate word tag | Enter word that already exists | Tag not added (silently ignored) |
| Empty preview question | Click "Preview Response" with no question | Nothing happens (button disabled or no-op) |
| Many example pairs (20+) | Add more than 20 pairs | All pairs shown, no limit enforced in UI (guidance is 10-20) |

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
| Quick Actions | settings-quick-actions-v1.html | Settings sub-nav |
| AI Voice | settings-ai-voice-v1.html | Settings sub-nav, current |
| Billing | settings-billing-v1.html | Settings sub-nav |
| Group Overview | group-v1.html | Group plan only |
| Properties | group-properties-v1.html | Group plan only |

## Prototype Controls
No dev toggles needed. The plan gate is driven by `MOCK_DB.currentProperty.planTier`.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/settings-ai-voice-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
