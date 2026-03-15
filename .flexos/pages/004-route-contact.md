---
id: page-contact
title: "Contact Page"
type: page
subtype: route
status: active
sequence: 21
route: /contact
prototype: "prototype/contact-v1.html"
description: "Sales inquiry form with contact information sidebar for prospective hotel operators."
relatesTo:
  - core-content # toast messages
  - core-pages # contact page spec
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This is a page spec for the Contact page.
Route: /contact
Prototype: contact-v1.html (pending generation)

Key decisions:
- Layout: marketing shell (nav + sections + footer)
- Primary data source: Static copy, MOCK_DB.copy.toasts for success toast
- Main interaction: Form submission with loading state and success toast
</flex_block>

## Route
`/contact`
Prototype file: `contact-v1.html`
Theme: `light`
Auth required: `no`

## Purpose
Provide a contact form for sales inquiries, particularly for Group plan prospects and general questions.

## Layout Shell
- Shell: `marketing`
- Wrapper classes: `.marketing-page`
- Each section uses `.marketing-section` > `.marketing-inner`
- Top navigation: `.marketing-nav` > `.marketing-nav-inner`

## Sections (top to bottom)

### Navigation Bar
- **Wrapper:** `.marketing-nav` > `.marketing-nav-inner`
- **Data:** Static
- **Components used:** `.btn`, `.btn-sm`, `.btn-primary`, `.btn-ghost`
- **Left:** Grove logo (text wordmark, links to `landing-v1.html`)
- **Right:** Nav links — "Pricing" (links to `pricing-v1.html`), "About" (links to `about-v1.html`), "Contact" (current, `.text-brand`), "Log In" (`.btn-ghost`, links to `login-v1.html`), "Start Free Trial" (`.btn-primary .btn-sm`, links to `signup-v1.html`)

### Page Header
- **Wrapper:** `.marketing-section` > `.marketing-inner` > `.page-header`
- **Copy:**
  - H1 (`.text-display`): "Get in touch"
  - Subtitle (`.text-body .text-secondary`): "Questions about Grove? Interested in the Group plan? We'd love to hear from you."
- **Components used:** `.page-header`, `.text-display`, `.text-body`, `.text-secondary`

### Contact Form + Info Sidebar (2-column layout)
- **Wrapper:** `.marketing-section` > `.marketing-inner` > 2-column grid (form 2/3, sidebar 1/3)

#### Contact Form (left column)
- **Wrapper:** `.card`
- **Components used:** `.form-group`, `.form-label`, `.input`, `.textarea`, `.btn`, `.btn-md`, `.btn-primary`, `.btn-loading`
- **Fields:**
  - Name (`.form-group` > `.form-label` "Your name" + `.input` type="text" placeholder="Full name")
  - Email (`.form-group` > `.form-label` "Email address" + `.input` type="email" placeholder="you@hotel.com")
  - Property Name (`.form-group` > `.form-label` "Property name" + `.form-hint` "Optional" + `.input` type="text" placeholder="Your hotel or group name")
  - Message (`.form-group` > `.form-label` "Message" + `.textarea` placeholder="Tell us about your property and what you're looking for..." rows="5")
- **Submit button:** `.btn .btn-md .btn-primary` text "Send Message"
- **Loading state:** `.btn .btn-md .btn-primary .btn-loading` text "Sending..."

#### Info Sidebar (right column)
- **Wrapper:** `.card`
- **Components used:** `.text-h4`, `.text-body`, `.text-secondary`, `.text-small`
- **Copy:**
  - Heading (`.text-h4`): "Other ways to reach us"
  - Email row: Label (`.text-small .text-secondary`): "Email" / Value (`.text-body`): "hello@grove.app"
  - Response time row: Label (`.text-small .text-secondary`): "Response time" / Value (`.text-body`): "We reply within one business day"
  - Divider
  - Note (`.text-small .text-secondary`): "Looking to start right away? You can begin a free trial without talking to us."
  - Link (`.btn .btn-sm .btn-secondary`): "Start Free Trial" → `signup-v1.html`

### Footer
- **Wrapper:** `.marketing-section` > `.marketing-inner`
- **Copy:** Links to Pricing, About, Contact, Log In. Copyright "© 2026 Grove". Contact email.

## Interactive States

### Form Submission
- **Trigger:** Click "Send Message" button
- **Vue refs:**
  ```js
  const contactForm = ref({
    name: '',
    email: '',
    propertyName: '',
    message: ''
  })
  const isSubmitting = ref(false)
  const formErrors = ref({})
  const showSuccessToast = ref(false)
  ```
- **Implementation:**
  ```js
  function validateForm() {
    const errors = {}
    if (!contactForm.value.name.trim()) errors.name = 'Name is required'
    if (!contactForm.value.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.value.email)) errors.email = 'Enter a valid email address'
    if (!contactForm.value.message.trim()) errors.message = 'Message is required'
    formErrors.value = errors
    return Object.keys(errors).length === 0
  }

  async function submitForm() {
    if (!validateForm()) return
    isSubmitting.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    isSubmitting.value = false
    showSuccessToast.value = true
    // Reset form
    contactForm.value = { name: '', email: '', propertyName: '', message: '' }
    // Auto-dismiss toast
    setTimeout(() => { showSuccessToast.value = false }, 5000)
  }
  ```
- **Before:** Form fields empty, button says "Send Message"
- **After submit click:** Button shows `.btn-loading` state with "Sending...", fields disabled
- **After success:** Form resets, success toast appears top-right

### Success Toast
- **Trigger:** Successful form submission
- **Vue ref:** `showSuccessToast` (see above)
- **Implementation:**
  ```html
  <div v-if="showSuccessToast" class="toast-container">
    <div class="toast toast-success">
      Message sent. We'll be in touch within one business day.
    </div>
  </div>
  ```
- **Before:** No toast visible
- **After:** Toast slides in from top-right, auto-dismisses after 5 seconds

### Form Validation Errors
- **Trigger:** Submit with empty required fields
- **Vue ref:** `formErrors` (see above)
- **Implementation:**
  ```html
  <div class="form-group">
    <label class="form-label">Your name</label>
    <input class="input" :class="{ 'input-error': formErrors.name }" v-model="contactForm.name" />
    <span v-if="formErrors.name" class="form-error">{{ formErrors.name }}</span>
  </div>
  ```
- **Before:** No error messages shown
- **After:** Red border on invalid fields, `.form-error` text below each

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Success toast message | MOCK_DB.copy.toasts | Pattern reference; actual copy is custom for this page |

## Edge Cases
| Scenario | How to trigger | UI response |
|---|---|---|
| Submit with empty fields | Click "Send Message" without filling required fields | Inline validation errors on name, email, message |
| Invalid email format | Enter "notanemail" in email field | `.form-error`: "Enter a valid email address" |
| Double submit | Click send button rapidly | Button disabled during `isSubmitting`, prevents duplicate |
| Optional field empty | Leave "Property name" blank | No error — field is optional |

## Navigation Links
| Label | Target file | Condition |
|---|---|---|
| Grove logo | landing-v1.html | Always |
| "Pricing" | pricing-v1.html | Always |
| "About" | about-v1.html | Always |
| "Log In" | login-v1.html | Always |
| "Start Free Trial" (nav) | signup-v1.html | Always |
| "Start Free Trial" (sidebar) | signup-v1.html | Always |

## Prototype Controls
No dev toggles needed.

<flex_block type="prototypes">
{
  "versions": [
    { "file": "prototype/contact-v1.html", "status": "current", "date": "2026-03-15" }
  ]
}
</flex_block>
