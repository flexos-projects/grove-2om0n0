---
id: commit-009
title: "Prototype: App screens v1 (Guests, Guest Profile, Knowledge, Analytics)"
type: commit
status: active
sequence: 9
createdAt: "2026-03-15"
---

# Prototype: App Screens v1

## Changes

- Created: prototype/guests-v1.html
- Created: prototype/guest-profile-v1.html
- Created: prototype/knowledge-v1.html
- Created: prototype/analytics-v1.html

## Source

Generated from:
- pages/010-route-guests.md
- pages/011-route-guest-profile.md
- pages/012-route-knowledge.md
- pages/013-route-analytics.md

Design system: design/001-tokens-design-system.md
Mock data: content/mock-data/001-seed-records.md

## Details

All four screens share the dark-theme app shell with sidebar navigation (Inbox, Guests, Knowledge, Analytics, Settings), Maria Chen as the current user with Professional badge, and consistent unread badge from live mock data.

- **Guests**: Searchable, sortable guest directory table. Search by name/phone, sort by recent/alphabetical/conversations. Preference tags with +N overflow. Click-through to profile. Empty state toggle.
- **Guest Profile**: Breadcrumb nav, editable name (inline click-to-edit), preference tags with add/remove, staff notes with save, conversation history cards with status and category badges. Guest picker for switching profiles.
- **Knowledge Base**: Category-filtered card grid with tab counts. Add/edit/delete via modals with confirmation dialog. Search across title and description. Category badges per entry. Empty state toggle.
- **Analytics**: Stats bar (4 metric cards with trend arrows), conversations-over-time bar chart, request categories donut chart (conic-gradient), response time horizontal bars, busiest hours heatmap (CSS grid with opacity). Staff performance table. Period selector (7d/30d/90d). Export CSV toast. All charts pure CSS/HTML.
