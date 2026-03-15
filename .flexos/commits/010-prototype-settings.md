---
id: commit-010
title: "Prototype: Settings Pages v1 (7 screens)"
type: commit
status: active
sequence: 10
createdAt: "2026-03-15"
---

# Prototype: Settings Pages v1 (7 screens)

## Changes

- Created: prototype/settings-v1.html (hub, defaults to Property)
- Created: prototype/settings-property-v1.html
- Created: prototype/settings-team-v1.html
- Created: prototype/settings-routing-v1.html
- Created: prototype/settings-quick-actions-v1.html
- Created: prototype/settings-billing-v1.html
- Created: prototype/settings-ai-voice-v1.html

## Source

Generated from:
- pages/014-route-settings.md
- pages/015-route-settings-team.md
- pages/016-route-settings-property.md
- pages/017-route-settings-routing.md
- pages/018-route-settings-quick-actions.md
- pages/019-route-settings-billing.md
- pages/020-route-settings-ai-voice.md

Design system: design/001-tokens-design-system.md
Mock data: content/mock-data/001-seed-records.md

## Details

All 7 settings screens share:
- Dark theme app shell with sidebar + topbar
- Vertical settings sub-navigation (220px left column) with Property, Team, Routing, Quick Actions, AI Voice, Billing
- Vue 3 reactivity for all interactive states
- Toast notifications using MOCK_DB.copy.toasts
- Confirmation dialogs using MOCK_DB.copy.confirmDialogs

### Per-page highlights:
- **settings-v1.html / settings-property-v1.html**: Property form with name, address, timezone, operating hours, check-in/out, greeting, AI voice preset cards, phone copy, logo upload, save
- **settings-team-v1.html**: Team table with role dropdowns, remove with confirmation, invite modal with validation, pending invites, seat limit enforcement
- **settings-routing-v1.html**: Category-to-member routing rules table with auto-save, add/remove rules, empty state
- **settings-quick-actions-v1.html**: Card list with reorder, add/edit modal, delete confirmation, hide/show toggle, default badge
- **settings-billing-v1.html**: Plan card, usage progress bar (starter only), payment method, invoice history, prototype plan tier switcher
- **settings-ai-voice-v1.html**: Plan gate for starter, brand voice textarea, words to use/avoid tag inputs, Q&A pairs, voice preview simulation, prototype plan tier switcher
