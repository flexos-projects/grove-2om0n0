---
id: page-forgot-password
title: "Forgot Password Page"
type: page
subtype: route
status: active
sequence: 24
route: /forgot-password
prototype: "prototype/forgot-password-v1.html"
description: "Password reset request form that sends a reset link email."
relatesTo:
  - core-features # F-003 Login/Logout
  - core-flows # Flow 8 Password Reset
  - core-content # password reset email template
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Forgot Password page.
Route: /forgot-password
Prototype: forgot-password-v1.html (pending generation)

Key decisions:
- Layout: auth shell (centered card on dark background)
- Primary data source: None (static form)
- Main interaction: Form submit → loading → success message
</flex_block>

## Route
`/forgot-password`
Prototype file: `forgot-password-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
Allow users to request a password reset link sent to their email address.

## Layout Shell
- Shell: `auth`
- Wrapper classes: `.auth-page` (full viewport, centered content, dark theme background)
- Card: `.auth-card`

## Sections (top to bottom)

### Logo
- **Wrapper:** Above `.auth-card`, centered
- **Data:** Static
- **Copy:** "Grove" text wordmark in brand green
- **Components used:** `.text-h2`, `.text-brand`

### Forgot Password Card
- **Wrapper:** `.auth-card`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.form-group`, `.form-label`, `.form-error`, `.input`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-block`, `.btn-loading`, `.text-small`

#### Heading
- **Copy:**
  - H2 (`.text-h2`): "Reset your password"
  - Subtitle (`.text-body .text-secondary`): "Enter your email and we'll send you a link to reset your password."

#### Email Field
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Email"
- **Input:** `.input` type="email" placeholder="you@hotel.com"

#### Submit Button
- **Default:** `.btn .btn-md .btn-primary .btn-block`: "Send Reset Link"
- **Loading:** `.btn .btn-md .btn-primary .btn-block .btn-loading`: "Sending..."

#### Login Link
- **Wrapper:** Below button, centered
- **Copy (`.text-small .text-secondary`):** "Remember your password? " + link (`.text-brand`): "Log in" → `login-v1.html`

### Success State (replaces form)
- **Wrapper:** `.auth-card` (same card, content swapped)
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.btn`, `.btn-md`, `.btn-secondary`, `.btn-block`
- **Copy:**
  - Heading (`.text-h2`): "Check your email"
  - Body (`.text-body .text-secondary`): "If an account exists for that email, we've sent a password reset link. The link expires in 1 hour."
  - Below (`.text-body .text-secondary`): "Didn't receive it? Check your spam folder or try again."
- **Button:** `.btn .btn-md .btn-secondary .btn-block`: "Back to Log In" → `login-v1.html`

## Interactive States

### Form Validation
- **Trigger:** Click "Send Reset Link" with empty or invalid email
- **Vue refs:**
  ```js
  const email = ref('')
  const formError = ref('')
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  ```
- **Implementation:**
  ```js
  function validateEmail() {
    if (!email.value.trim()) {
      formError.value = 'Email is required'
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      formError.value = 'Enter a valid email address'
      return false
    }
    formError.value = ''
    return true
  }
  ```
- **Before:** No error shown
- **After:** `.form-error` under email field

### Submit → Loading → Success
- **Trigger:** Click "Send Reset Link" with valid email
- **Vue ref:** `isSubmitting`, `showSuccess`
- **Implementation:**
  ```js
  async function handleSubmit() {
    if (!validateEmail()) return
    isSubmitting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    isSubmitting.value = false
    showSuccess.value = true
    // Note: always show success regardless of whether email exists (security)
  }
  ```
- **Template:**
  ```html
  <!-- Form state -->
  <div v-if="!showSuccess">
    <h2 class="text-h2">Reset your password</h2>
    <p class="text-body text-secondary">Enter your email and we'll send you a link to reset your password.</p>
    <div class="form-group">
      <label class="form-label">Email</label>
      <input class="input" type="email" v-model="email" placeholder="you@hotel.com" />
      <span v-if="formError" class="form-error">{{ formError }}</span>
    </div>
    <button class="btn btn-md btn-primary btn-block" :class="{ 'btn-loading': isSubmitting }"
            :disabled="isSubmitting" @click="handleSubmit">
      {{ isSubmitting ? 'Sending...' : 'Send Reset Link' }}
    </button>
    <p class="text-small text-secondary" style="text-align: center; margin-top: 1.5rem;">
      Remember your password? <a href="login-v1.html" class="text-brand">Log in</a>
    </p>
  </div>

  <!-- Success state -->
  <div v-else>
    <h2 class="text-h2">Check your email</h2>
    <p class="text-body text-secondary">If an account exists for that email, we've sent a password reset link. The link expires in 1 hour.</p>
    <p class="text-body text-secondary">Didn't receive it? Check your spam folder or try again.</p>
    <a href="login-v1.html" class="btn btn-md btn-secondary btn-block">Back to Log In</a>
  </div>
  ```
- **Before:** Form with email input and submit button
- **During submit:** Button shows loading spinner, "Sending..."
- **After:** Form replaced by success message with "Check your email" heading

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| N/A | N/A | No MOCK_DB data needed; always shows success (security pattern) |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Empty email | Click submit with blank field | `.form-error`: "Email is required" |
| Invalid email format | Enter "notanemail" | `.form-error`: "Enter a valid email address" |
| Non-existent email | Enter any email not in system | Same success message (no email existence leak) |
| Double submit | Click rapidly | Button disabled during `isSubmitting` |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| "Log in" | login-v1.html | Before submit |
| "Back to Log In" | login-v1.html | After success |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/forgot-password-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
