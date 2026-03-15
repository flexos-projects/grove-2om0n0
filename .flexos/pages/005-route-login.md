---
id: page-login
title: "Login Page"
type: page
subtype: route
status: active
sequence: 22
route: /login
prototype: "prototype/login-v1.html"
description: "Email and password login screen with error handling, loading state, and links to signup and password reset."
relatesTo:
  - core-features # F-003 Login/Logout
  - core-flows # Flow 8 password reset
  - core-content # error microcopy
  - core-database # users collection
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Login page.
Route: /login
Prototype: login-v1.html (pending generation)

Key decisions:
- Layout: auth shell (centered card on dark background)
- Primary data source: MOCK_DB.currentUser for simulated successful login
- Main interaction: Form validation, loading on submit, credential error state
</flex_block>

## Route
`/login`
Prototype file: `login-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
Authenticate existing staff and admin users with email and password.

## Layout Shell
- Shell: `auth`
- Wrapper classes: `.auth-page` (full viewport, centered content, dark theme background)
- Card: `.auth-card` (contains the login form)

## Sections (top to bottom)

### Logo
- **Wrapper:** Above `.auth-card`, centered
- **Data:** Static
- **Copy:** "Grove" text wordmark in brand green (`--color-brand` on dark: `#40916C`)
- **Components used:** `.text-h2`, `.text-brand`

### Login Card
- **Wrapper:** `.auth-card`
- **Components used:** `.text-h2`, `.text-body`, `.text-secondary`, `.form-group`, `.form-label`, `.form-hint`, `.form-error`, `.input`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-block`, `.btn-ghost`, `.btn-loading`

#### Heading
- **Copy:**
  - H2 (`.text-h2`): "Welcome back"
  - Subtitle (`.text-body .text-secondary`): "Log in to your Grove dashboard"

#### Email Field
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Email"
- **Input:** `.input` type="email" placeholder="you@hotel.com"

#### Password Field
- **Wrapper:** `.form-group`
- **Copy:** Label (`.form-label`): "Password"
- **Input:** `.input` type="password" placeholder="Enter your password"
- **Below input, right-aligned:** Link (`.text-small .text-brand`): "Forgot password?" → `forgot-password-v1.html`

#### Login Button
- **Copy:** `.btn .btn-md .btn-primary .btn-block`: "Log In"
- **Loading state:** `.btn .btn-md .btn-primary .btn-block .btn-loading`: "Logging in..."

#### Signup Link
- **Wrapper:** Below button, centered
- **Copy (`.text-small .text-secondary`):** "Don't have an account? " + link (`.text-brand`): "Sign up" → `signup-v1.html`

## Interactive States

### Form Validation
- **Trigger:** Click "Log In" with empty or invalid fields
- **Vue refs:**
  ```js
  const email = ref('')
  const password = ref('')
  const formErrors = ref({})
  const loginError = ref('')
  const isSubmitting = ref(false)
  ```
- **Implementation:**
  ```js
  function validateLogin() {
    const errors = {}
    if (!email.value.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.email = 'Enter a valid email address'
    if (!password.value) errors.password = 'Password is required'
    formErrors.value = errors
    return Object.keys(errors).length === 0
  }
  ```
- **Before:** No errors shown
- **After:** `.form-error` messages under each invalid field

### Login Submit (Loading + Success)
- **Trigger:** Click "Log In" with valid fields
- **Vue ref:** `isSubmitting`
- **Implementation:**
  ```js
  async function handleLogin() {
    loginError.value = ''
    if (!validateLogin()) return
    isSubmitting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Prototype: check against MOCK_DB.currentUser
    if (email.value === MOCK_DB.currentUser.email) {
      // Success — redirect to inbox
      window.location.href = 'inbox-v1.html'
    } else {
      // Wrong credentials
      isSubmitting.value = false
      loginError.value = 'Invalid email or password. Please try again.'
    }
  }
  ```
- **Before:** Button says "Log In"
- **After click:** Button shows `.btn-loading` "Logging in...", fields disabled
- **On success:** Redirect to `inbox-v1.html`

### Credential Error
- **Trigger:** Submit with wrong email/password
- **Vue ref:** `loginError`
- **Implementation:**
  ```html
  <div v-if="loginError" class="form-error" style="text-align: center; margin-bottom: 1rem;">
    {{ loginError }}
  </div>
  ```
- **Before:** No error banner
- **After:** Error message "Invalid email or password. Please try again." shown above the form fields or below the heading

### Account Locked
- **Trigger:** 5 failed login attempts (prototype: not simulated, documented for reference)
- **Copy:** "Too many attempts. Please try again in 15 minutes."

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Email validation check | `MOCK_DB.currentUser.email` | Used to simulate successful login in prototype |
| Redirect target | N/A | Success redirects to inbox-v1.html |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Empty email | Submit with blank email | `.form-error`: "Email is required" |
| Invalid email format | Enter "notanemail" | `.form-error`: "Enter a valid email address" |
| Empty password | Submit with blank password | `.form-error`: "Password is required" |
| Wrong credentials | Submit with non-matching email | Error: "Invalid email or password. Please try again." |
| Double submit | Click button rapidly | Button disabled during `isSubmitting` |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| "Forgot password?" | forgot-password-v1.html | Always |
| "Sign up" | signup-v1.html | Always |
| Success redirect | inbox-v1.html | On successful login |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/login-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
