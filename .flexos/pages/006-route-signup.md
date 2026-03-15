---
id: page-signup
title: "Signup / Onboarding Page"
type: page
subtype: route
status: active
sequence: 23
route: /signup
prototype: "prototype/signup-v1.html"
description: "4-step onboarding flow: account creation, property setup, phone number provisioning, and test drive."
relatesTo:
  - core-features # F-001 Hotel Onboarding
  - core-flows # Flow 5 Hotel Onboarding
  - core-database # users, properties, propertyMembers collections
  - core-content # UI microcopy
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Signup / Onboarding page.
Route: /signup
Prototype: signup-v1.html (pending generation)

Key decisions:
- Layout: auth shell (centered card on dark background, card is wider for multi-step form)
- Primary data source: MOCK_DB.currentProperty.phoneNumber for provisioned number preview
- Main interaction: 4-step wizard with progress indicator, per-step validation
</flex_block>

## Route
`/signup`
Prototype file: `signup-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
Create a new account and configure the first property in a 4-step guided flow, completable in under 5 minutes.

## Layout Shell
- Shell: `auth`
- Wrapper classes: `.auth-page` (full viewport, centered content, dark theme background)
- Card: `.auth-card` (wider variant for multi-step content, max-width ~560px)

## Sections (top to bottom)

### Logo
- **Wrapper:** Above `.auth-card`, centered
- **Data:** Static
- **Copy:** "Grove" text wordmark in brand green
- **Components used:** `.text-h2`, `.text-brand`

### Progress Indicator
- **Wrapper:** Top of `.auth-card`
- **Data:** Current step number
- **Components used:** `.progress`, `.progress-fill`, `.text-xs`, `.text-secondary`
- **Copy:** "Step {currentStep} of 4" (`.text-xs .text-secondary`)
- **Visual:** `.progress` bar with `.progress-fill` at 25%/50%/75%/100%

### Step 1: Account
- **Wrapper:** Inside `.auth-card`, shown when `currentStep === 1`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.form-group`, `.form-label`, `.form-error`, `.input`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-block`
- **Copy:**
  - Heading (`.text-h2`): "Create your account"
  - Subtitle (`.text-body .text-secondary`): "Start your free 14-day trial"
- **Fields:**
  - Full name (`.form-group` > `.form-label` "Full name" + `.input` type="text" placeholder="Your name")
  - Email (`.form-group` > `.form-label` "Email" + `.input` type="email" placeholder="you@hotel.com")
  - Password (`.form-group` > `.form-label` "Password" + `.form-hint` "At least 8 characters" + `.input` type="password" placeholder="Choose a password")
- **Button:** `.btn .btn-md .btn-primary .btn-block`: "Create Account"
- **Below button:** `.text-small .text-secondary` centered: "Already have an account? " + link (`.text-brand`): "Log in" → `login-v1.html`

### Step 2: Property
- **Wrapper:** Inside `.auth-card`, shown when `currentStep === 2`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.form-group`, `.form-label`, `.form-hint`, `.form-error`, `.input`, `.textarea`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-secondary`, `.btn-block`
- **Copy:**
  - Heading (`.text-h2`): "Tell us about your property"
  - Subtitle (`.text-body .text-secondary`): "This helps us set up your Grove account"
- **Fields:**
  - Property name (`.form-group` > `.form-label` "Property name" + `.input` type="text" placeholder="The Linden Hotel")
  - Address (`.form-group` > `.form-label` "Address" + `.input` type="text" placeholder="123 Main St, Austin, TX")
  - Timezone (`.form-group` > `.form-label` "Timezone" + `.form-hint` "Auto-detected from your address" + `.select` with common US timezones, default auto-detected)
  - Description (`.form-group` > `.form-label` "Brief description" + `.form-hint` "Optional — helps the AI understand your property" + `.textarea` placeholder="A boutique hotel in downtown Austin..." rows="3")
- **Buttons:** Row with "Back" (`.btn .btn-md .btn-secondary`) and "Continue" (`.btn .btn-md .btn-primary`)

### Step 3: Phone Number
- **Wrapper:** Inside `.auth-card`, shown when `currentStep === 3`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.text-h3`, `.form-group`, `.form-label`, `.select`, `.card`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-secondary`
- **Copy:**
  - Heading (`.text-h2`): "Choose your Grove number"
  - Subtitle (`.text-body .text-secondary`): "This is the number guests will text. Pick an area code."
- **Fields:**
  - Area code preference (`.form-group` > `.form-label` "Preferred area code" + `.select` with options: "512 — Austin", "737 — Austin", "214 — Dallas", "713 — Houston", "Other")
- **Provisioned number preview:**
  - `.card` with centered content:
    - Label (`.text-small .text-secondary`): "Your Grove number"
    - Number (`.text-h3 .text-brand`): Display `MOCK_DB.currentProperty.phoneNumber`
    - Note (`.text-small .text-secondary`): "Guests will text this number to reach your team"
- **Buttons:** Row with "Back" (`.btn .btn-md .btn-secondary`) and "Continue" (`.btn .btn-md .btn-primary`)

### Step 4: Test Drive
- **Wrapper:** Inside `.auth-card`, shown when `currentStep === 4`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.text-h3`, `.card`, `.btn`, `.btn-md`, `.btn-lg`, `.btn-primary`, `.btn-ghost`
- **Copy:**
  - Heading (`.text-h2`): "Take it for a spin"
  - Subtitle (`.text-body .text-secondary`): "Text your new Grove number to see the AI concierge in action."
- **Content:**
  - `.card` with centered content:
    - Label (`.text-small .text-secondary`): "Text this number"
    - Number (`.text-h3 .text-brand`): Display `MOCK_DB.currentProperty.phoneNumber`
    - Instruction (`.text-body .text-secondary`): "Send any message — try asking for a restaurant recommendation."
  - Simulated conversation preview area (`.card`, styled with message bubbles):
    - Shows a placeholder: "Your conversation will appear here in real time..."
- **Buttons:**
  - "Continue to Dashboard" (`.btn .btn-lg .btn-primary .btn-block`) → `inbox-v1.html`
  - "Skip for now" (`.btn .btn-md .btn-ghost .btn-block`, `.text-small`): → `inbox-v1.html`

## Interactive States

### Step Navigation
- **Trigger:** Click "Continue" / "Back" buttons
- **Vue refs:**
  ```js
  const currentStep = ref(1)
  const totalSteps = 4

  // Step 1 data
  const accountForm = ref({ name: '', email: '', password: '' })

  // Step 2 data
  const propertyForm = ref({ name: '', address: '', timezone: 'America/Chicago', description: '' })

  // Step 3 data
  const selectedAreaCode = ref('512')
  const provisionedNumber = ref(MOCK_DB.currentProperty.phoneNumber)

  // Step states
  const stepErrors = ref({})
  const isSubmitting = ref(false)
  ```
- **Implementation:**
  ```js
  function nextStep() {
    if (!validateCurrentStep()) return
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function progressPercent() {
    return (currentStep.value / totalSteps) * 100
  }
  ```
- **Before:** Step 1 visible, progress at 25%
- **After each "Continue":** Next step shown, progress bar advances

### Step 1 Validation
- **Trigger:** Click "Create Account" on step 1
- **Vue ref:** `stepErrors`
- **Implementation:**
  ```js
  function validateStep1() {
    const errors = {}
    if (!accountForm.value.name.trim()) errors.name = 'Name is required'
    if (!accountForm.value.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountForm.value.email)) errors.email = 'Enter a valid email address'
    if (!accountForm.value.password) errors.password = 'Password is required'
    else if (accountForm.value.password.length < 8) errors.password = 'Password must be at least 8 characters'
    stepErrors.value = errors
    return Object.keys(errors).length === 0
  }
  ```
- **Error copy:**
  - Name: "Name is required"
  - Email: "Email is required" / "Enter a valid email address"
  - Password: "Password is required" / "Password must be at least 8 characters"
  - Duplicate email: "This email already has an account. Try logging in instead." (shown as `.form-error` under email)

### Step 2 Validation
- **Trigger:** Click "Continue" on step 2
- **Implementation:**
  ```js
  function validateStep2() {
    const errors = {}
    if (!propertyForm.value.name.trim()) errors.propertyName = 'Property name is required'
    if (!propertyForm.value.address.trim()) errors.address = 'Address is required'
    stepErrors.value = errors
    return Object.keys(errors).length === 0
  }
  ```
- **Error copy:**
  - Property name: "Property name is required"
  - Address: "Address is required"
  - Timezone and description are optional

### Step 3 — Area Code Selection
- **Trigger:** Change area code dropdown
- **Vue ref:** `selectedAreaCode`, `provisionedNumber`
- **Implementation:**
  ```js
  function selectAreaCode(code) {
    selectedAreaCode.value = code
    // In prototype, always show the same MOCK_DB number
    provisionedNumber.value = MOCK_DB.currentProperty.phoneNumber
  }
  ```
- **Before:** Default area code selected, number preview shown
- **After:** Number preview updates (in prototype, stays the same)

### Complete Onboarding
- **Trigger:** Click "Continue to Dashboard" or "Skip for now" on step 4
- **Implementation:**
  ```js
  function completeOnboarding() {
    window.location.href = 'inbox-v1.html'
  }
  ```
- **Redirect:** → `inbox-v1.html`

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Provisioned phone number | `MOCK_DB.currentProperty.phoneNumber` | Shown in steps 3 and 4 |
| Current user email check | `MOCK_DB.currentUser.email` | For "email already exists" simulation |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Empty required fields (step 1) | Submit without filling name/email/password | `.form-error` under each field |
| Weak password | Enter < 8 characters | `.form-error`: "Password must be at least 8 characters" |
| Duplicate email | Enter `MOCK_DB.currentUser.email` | `.form-error`: "This email already has an account. Try logging in instead." |
| Empty property name (step 2) | Continue without property name | `.form-error`: "Property name is required" |
| Empty address (step 2) | Continue without address | `.form-error`: "Address is required" |
| Skip step 4 | Click "Skip for now" | Redirects to inbox-v1.html without testing |
| Back from step 1 | N/A | Back button not shown on step 1 |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| "Log in" | login-v1.html | Step 1 only |
| "Continue to Dashboard" | inbox-v1.html | Step 4 |
| "Skip for now" | inbox-v1.html | Step 4 |

## Prototype Controls
Optional: a dev toggle to jump directly to any step for testing.

```html
<div class="prototype-label" style="position: fixed; bottom: 1rem; right: 1rem;">
  Jump to step:
  <button @click="currentStep = 1">1</button>
  <button @click="currentStep = 2">2</button>
  <button @click="currentStep = 3">3</button>
  <button @click="currentStep = 4">4</button>
</div>
```

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/signup-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
