---
id: "014"
title: "Deploy prototype — relocated project"
type: commit
status: complete
createdAt: "2026-03-15"
skill: flexos-deploy-prototype
---

# 014 — Deploy Prototype (Relocated Project)

Ran full deploy-prototype audit after relocating the Grove project to `/Users/jos/Developer/FLEXOS/flexos-templates/grove/`.

## What changed

### Step 0: Sitemap Reconciliation
- Found 22 HTML files on disk, all v1
- All 22 already registered in sitemap with correct versions
- 0 auto-registered, 0 stale, 0 phantoms
- Sitemap was already current

### Step 2: vercel.json
- Generated `vercel.json` at project root with 24 rewrite rules
- Landing alias: `/preview` -> landing-v1.html
- 22 screen-specific rewrites: `/preview/{slug}` -> `{slug}-v1.html`
- Catch-all: `/preview/:path*` for shared assets

### Steps 3-4: Link Audit & Repair
- Audited all 22 HTML files
- All navigation `<a>` links already have `data-slug` attributes
- All links use correct relative paths (no broken `../` prefixes)
- Dual-mode detection script present in all 22 files
- 0 broken links, 0 links needing repair

### Step 5: Navigation Completeness
- All app screens (inbox, guests, knowledge, analytics, settings, guest-profile) have sidebar links to: Inbox, Guests, Knowledge, Analytics, Settings
- All marketing screens (landing, pricing, about, contact) have nav links to: pricing, about, contact, login, signup
- All auth screens (login, signup, forgot-password, reset-password) cross-link correctly
- Group screens (group, group-properties) have both main sidebar + group section nav
- Settings sub-screens all have settings sub-navigation with all 6 settings pages
- No navigation gaps found

### Step 6: Sitemap Updated
- Rewrote sitemap.md config block with linksTo/linkedFrom for all 22 pages
- Added `broken: []` and `disabled: []` arrays per page
- Set lastAudit to 2026-03-15

## Files written
- `vercel.json` (new)
- `.flexos/prototype/sitemap.md` (updated)
- `.flexos/commits/014-deploy-prototype-relocated.md` (new)

## No HTML files modified
All 22 prototype HTML files were already correctly configured with data-slug attributes, relative paths, and dual-mode scripts from previous generation runs.
