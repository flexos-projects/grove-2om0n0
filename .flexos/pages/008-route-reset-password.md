---
id: page-reset-password
title: "Reset Password Page"
type: page
subtype: route
status: active
sequence: 25
route: /reset-password
prototype: "prototype/reset-password-v1.html"
description: "Set a new password after clicking the reset link from email."
relatesTo:
  - core-features # F-003 Login/Logout
  - core-flows # Flow 8 Password Reset
  - core-content # password reset email template
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Reset Password page.
Route: /reset-password
Prototype: reset-password-v1.html (pending generation)

Key decisions:
- Layout: auth shell (centered card on dark background)
- Primary data source: None (form-only page)
- Main interaction: Password match validation, submit → loading → success → redirect to login
</flex_block>

## Route
`/reset-password`
Prototype file: `reset-password-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
Allow users to set a new password after clicking the reset link received via email.

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

### Reset Password Card
- **Wrapper:** `.auth-card`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.form-group`, `.form-label`, `.form-hint`, `.form-error`, `.input`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-block`, `.btn-loading`

#### Heading
- **Copy:**
  - H2 (`.text-h2`): "Choose a new password"
  - Subtitle (`.text-body .text-secondary`): "Enter your new password below."

#### New Password Field
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "New password"
- **Hint:** `.form-hint`: "At least 8 characters"
- **Input:** `.input` type="password" placeholder="Enter new password"

#### Confirm Password Field
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Confirm password"
- **Input:** `.input` type="password" placeholder="Enter password again"

#### Submit Button
- **Default:** `.btn .btn-md .btn-primary .btn-block`: "Reset Password"
- **Loading:** `.btn .btn-md .btn-primary .btn-block .btn-loading`: "Resetting..."

### Success State (replaces form)
- **Wrapper:** `.auth-card` (same card, content swapped)
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-block`
- **Copy:**
  - Heading (`.text-h2`): "Password updated"
  - Body (`.text-body .text-secondary`): "Your password has been changed. You can now log in with your new password."
- **Button:** `.btn .btn-md .btn-primary .btn-block`: "Go to Log In" → `login-v1.html`

### Expired Token State (replaces form)
- **Wrapper:** `.auth-card` (same card, content swapped)
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.btn`, `.btn-md`, `.btn-secondary`, `.btn-block`
- **Copy:**
  - Heading (`.text-h2`): "Link expired"
  - Body (`.text-body .text-secondary`): "This password reset link has expired. Request a new one to continue."
- **Button:** `.btn .btn-md .btn-secondary .btn-block`: "Request New Link" → `forgot-password-v1.html`

## Interactive States

### Password Validation
- **Trigger:** Click "Reset Password" with invalid inputs
- **Vue refs:**
  ```js
  const newPassword = ref('')
  const confirmPassword = ref('')
  const formErrors = ref({})
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  const tokenExpired = ref(false)  // set to true to show expired state
  ```
- **Implementation:**
  ```js
  function validatePasswords() {
    const errors = {}
    if (!newPassword.value) {
      errors.newPassword = 'Password is required'
    } else if (newPassword.value.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters'
    }
    if (!confirmPassword.value) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (newPassword.value !== confirmPassword.value) {
      errors.confirmPassword = 'Passwords do not match'
    }
    formErrors.value = errors
    return Object.keys(errors).length === 0
  }
  ```
- **Before:** No errors shown
- **After:** `.form-error` messages under invalid fields

### Submit → Loading → Success
- **Trigger:** Click "Reset Password" with valid, matching passwords
- **Vue ref:** `isSubmitting`, `showSuccess`
- **Implementation:**
  ```js
  async function handleReset() {
    if (!validatePasswords()) return
    isSubmitting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    isSubmitting.value = false
    showSuccess.value = true
  }
  ```
- **Template:**
  ```html
  <!-- Expired token state -->
  <div v-if="tokenExpired">
    <h2 class="text-h2">Link expired</h2>
    <p class="text-body text-secondary">This password reset link has expired. Request a new one to continue.</p>
    <a href="forgot-password-v1.html" class="btn btn-md btn-secondary btn-block">Request New Link</a>
  </div>

  <!-- Form state -->
  <div v-else-if="!showSuccess">
    <h2 class="text-h2">Choose a new password</h2>
    <p class="text-body text-secondary">Enter your new password below.</p>
    <div class="form-group">
      <label class="form-label">New password</label>
      <span class="form-hint">At least 8 characters</span>
      <input class="input" type="password" v-model="newPassword" placeholder="Enter new password" />
      <span v-if="formErrors.newPassword" class="form-error">{{ formErrors.newPassword }}</span>
    </div>
    <div class="form-group">
      <label class="form-label">Confirm password</label>
      <input class="input" type="password" v-model="confirmPassword" placeholder="Enter password again" />
      <span v-if="formErrors.confirmPassword" class="form-error">{{ formErrors.confirmPassword }}</span>
    </div>
    <button class="btn btn-md btn-primary btn-block" :class="{ 'btn-loading': isSubmitting }"
            :disabled="isSubmitting" @click="handleReset">
      {{ isSubmitting ? 'Resetting...' : 'Reset Password' }}
    </button>
  </div>

  <!-- Success state -->
  <div v-else>
    <h2 class="text-h2">Password updated</h2>
    <p class="text-body text-secondary">Your password has been changed. You can now log in with your new password.</p>
    <a href="login-v1.html" class="btn btn-md btn-primary btn-block">Go to Log In</a>
  </div>
  ```
- **Before:** Form with two password fields and submit button
- **During submit:** Button shows `.btn-loading` "Resetting...", fields disabled
- **After success:** Form replaced with "Password updated" message and login link

### Password Match Live Feedback
- **Trigger:** User types in confirm password field
- **Vue ref:** `formErrors.confirmPassword`
- **Implementation:**
  ```js
  // Watch for real-time mismatch feedback (optional enhancement)
  watch(confirmPassword, (val) => {
    if (val && newPassword.value && val !== newPassword.value) {
      formErrors.value.confirmPassword = 'Passwords do not match'
    } else if (formErrors.value.confirmPassword === 'Passwords do not match') {
      delete formErrors.value.confirmPassword
    }
  })
  ```
- **Before:** No error while typing
- **After:** If passwords mismatch, shows `.form-error` "Passwords do not match" in real time

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| N/A | N/A | No MOCK_DB data needed; form-only page |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Empty new password | Submit with blank field | `.form-error`: "Password is required" |
| Short password | Enter < 8 characters | `.form-error`: "Password must be at least 8 characters" |
| Empty confirm password | Submit with blank confirm | `.form-error`: "Please confirm your password" |
| Passwords don't match | Enter different values | `.form-error`: "Passwords do not match" |
| Expired reset token | Prototype toggle `tokenExpired = true` | Shows "Link expired" state with link to request new one |
| Double submit | Click rapidly | Button disabled during `isSubmitting` |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| "Go to Log In" | login-v1.html | After successful password reset |
| "Request New Link" | forgot-password-v1.html | When token is expired |

## Prototype Controls
Toggle to simulate expired token state:

```html
<div class="prototype-label" style="position: fixed; bottom: 1rem; right: 1rem;">
  <label>
    <input type="checkbox" v-model="tokenExpired" /> Simulate expired token
  </label>
</div>
```

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/reset-password-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
