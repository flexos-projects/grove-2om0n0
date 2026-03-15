---
id: patterns-base
title: "Component Patterns"
type: design
subtype: patterns
status: active
sequence: 13
description: "Structural CSS class vocabulary — 50+ component classes, all var() token references. Grove SMS concierge."
relatesTo: [design/001-tokens-design-system.md, docs/006-design.md]
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This file documents the component CSS class library for Grove.
The components.css file in prototype/shared/ is generated from these patterns.
Class names map directly to Vue component names in the production app:
  .conversation-item -> components/app/ConversationItem.vue
  .message-bubble -> components/app/MessageBubble.vue
  .guest-header -> components/app/GuestHeader.vue
  .knowledge-card -> components/app/KnowledgeCard.vue
  .stats-bar -> components/app/StatsBar.vue
  .response-area -> components/app/ResponseArea.vue
  etc.

To update components: edit this file and regenerate components.css.
</flex_block>

# Component Patterns

## Component -> CSS Class Map

| Vue Component | CSS Class | Section |
|---|---|---|
| AppShell | `.app-layout` | Layout shells |
| AppSidebar | `.app-sidebar` | Layout shells |
| AppMain | `.app-main`, `.app-topbar`, `.app-content` | Layout shells |
| MarketingPage | `.marketing-page`, `.marketing-section`, `.marketing-inner` | Layout shells |
| AuthPage | `.auth-page`, `.auth-card` | Layout shells |
| SidebarNav | `.sidebar-logo`, `.sidebar-nav`, `.sidebar-footer` | Navigation |
| NavItem | `.nav-item` | Navigation |
| MarketingNav | `.marketing-nav`, `.marketing-nav-inner` | Navigation |
| Button | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger` | Buttons |
| TextInput | `.input` | Inputs & forms |
| TextArea | `.textarea` | Inputs & forms |
| Select | `.select` | Inputs & forms |
| FormGroup | `.form-group`, `.form-label`, `.form-error` | Inputs & forms |
| Card | `.card`, `.card-interactive` | Cards |
| StatCard | `.stat-card` | Cards |
| StatsBar | `.stats-bar` | Cards |
| PageHeader | `.page-header`, `.page-title` | Cards |
| Badge | `.badge`, `.badge-active`, `.badge-waiting`, `.badge-resolved` | Badges & status |
| BadgeAI | `.badge-ai` | Badges & status |
| CategoryBadge | `.badge-category-dining`, `.badge-category-transport`, etc. | Badges & status |
| DataTable | `.table-wrapper`, `.table` | Tables |
| TabBar | `.tab-bar`, `.tab` | Tabs |
| Modal | `.modal-backdrop`, `.modal-box` | Modals |
| Toast | `.toast-container`, `.toast` | Toasts |
| EmptyState | `.empty-state` | Empty states |
| ProgressBar | `.progress`, `.progress-fill` | Progress |
| ConversationList | `.conversation-list` | Conversation list |
| ConversationItem | `.conversation-item` | Conversation list |
| ConversationAvatar | `.conversation-avatar` | Conversation list |
| MessageThread | `.message-thread` | Message bubbles |
| MessageBubble | `.message-bubble`, `.message-guest`, `.message-staff`, `.message-ai`, `.message-note` | Message bubbles |
| ResponseArea | `.response-area`, `.response-input`, `.response-actions` | Response area |
| AIDraftBar | `.ai-draft-bar` | Response area |
| QuickActionChips | `.quick-action-chips`, `.quick-action-chip` | Response area |
| GuestHeader | `.guest-header` | Guest profile |
| GuestPreferences | `.guest-preferences` | Guest profile |
| GuestNotes | `.guest-notes` | Guest profile |
| GuestHistory | `.guest-history` | Guest profile |
| KnowledgeCard | `.knowledge-card` | Knowledge entry cards |
| KnowledgeCategoryBadge | `.knowledge-category-badge` | Knowledge entry cards |

## Sections

### 1. Typography utilities
Display through xs text sizes using Instrument Serif for headings and Inter for body. Color utilities for text hierarchy and semantic states.

### 2. Layout shells
App shell with sidebar + main area for authenticated pages. Marketing shell for public pages with max-width content. Auth shell for centered login/signup cards. Inbox layout with two-panel split (conversation list + thread).

### 3. Navigation
Sidebar nav items with icon + label, active state using brand-muted background. Marketing nav with sticky positioning and backdrop blur.

### 4. Buttons
Four variants (primary/secondary/ghost/danger) matching the forest green brand. Three sizes (sm 32px, md 40px, lg 48px). Disabled and loading states.

### 5. Inputs & forms
Text inputs, textareas, and selects with 40px height, warm surface background. Focus state uses brand green ring. Error state with danger border.

### 6. Cards
Base card with subtle shadow. Interactive variant with hover lift. Stat cards for analytics dashboard metrics. Page header with title and actions.

### 7. Badges & status
Conversation status badges: active (green), waiting (amber), resolved (grey). AI badge for AI-generated messages. Request category badges for routing display (dining, transport, housekeeping, etc.).

### 8. Tables
For staff performance tables and team management. Warm hover state, uppercase header labels.

### 9. Tabs
Used for inbox filters (All/Active/Waiting/Resolved), knowledge base categories, and settings sub-navigation. Brand-colored underline on active tab.

### 10. Modals
Confirmation dialogs for destructive actions (remove team member, delete entry). Backdrop fade with content scale-up animation.

### 11. Toasts
Success, error, and info notifications. Positioned bottom-right. Auto-dismiss after 5 seconds.

### 12. Empty states
Centered layout for zero-data pages: empty inbox, no guests, empty knowledge base, insufficient analytics data. Heading uses Instrument Serif for warmth.

### 13. Progress & indicators
Usage bars (conversations used/limit), danger zones for destructive settings.

### 14. Conversation list (Grove-specific)
Left panel of the inbox. Conversation items with avatar, guest name, message preview, timestamp, status dot, and assignee. States: selected (brand-muted bg with left border), unread (semibold text), hover (sunken bg).

### 15. Message bubbles (Grove-specific)
Guest messages left-aligned on light stone background. Staff messages right-aligned on green background. AI messages right-aligned on subtle green with AI badge. Internal notes full-width on warm yellow with "Staff Only" label and left border accent.

### 16. Response area (Grove-specific)
Bottom of conversation thread. Multi-line expanding input, AI draft suggestion bar (dismissable/editable), quick action chips, send button, internal note toggle.

### 17. Guest profile (Grove-specific)
Header with name and contact info. Preference tags using accent-muted chips. Staff notes section. Conversation history grouped by visit.

### 18. Knowledge entry cards (Grove-specific)
Card layout for knowledge base entries. Category badge, title, description preview, optional link indicator. Interactive hover state.

### 19. Prototype utilities
Fixed label identifying prototype screens during development.
