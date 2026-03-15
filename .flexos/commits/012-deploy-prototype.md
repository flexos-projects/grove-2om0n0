---
id: "012"
title: "Deploy prototype"
type: commit
status: complete
createdAt: "2026-03-15"
---

# 012 — Deploy Prototype

## What changed

- Reconciled sitemap: registered 11 missing screens (guests, guest-profile, knowledge, analytics, settings-property, settings-team, settings-routing, settings-quick-actions, settings-ai-voice, settings-billing, group-properties) bringing total to 22 screens
- Generated `vercel.json` with 24 rewrite rules for clean `/preview/{slug}` URLs
- Audited all 22 prototype HTML files for navigation link correctness
- Added `data-slug` attributes to all internal navigation `<a>` tags across all files
- Injected dual-mode detection script into every prototype file (file:// keeps relative paths, https:// uses clean /preview/ routes)
- Fixed landing page placeholder links (href="#") to point to actual screens
- Fixed inbox sidebar placeholder links (href="#") to point to actual screens
- Verified sidebar navigation consistency across all app screens
- Verified marketing nav consistency across all marketing screens
- Verified auth screen cross-links (login/signup/forgot-password/reset-password)

## Files modified

- `vercel.json` (new)
- `.flexos/prototype/sitemap.md` (updated)
- All 22 `.html` files in `.flexos/prototype/` (link repairs + dual-mode script)

## Routing table

| Slug | File | Clean URL |
|------|------|-----------|
| about | about-v1.html | /preview/about |
| analytics | analytics-v1.html | /preview/analytics |
| contact | contact-v1.html | /preview/contact |
| forgot-password | forgot-password-v1.html | /preview/forgot-password |
| group | group-v1.html | /preview/group |
| group-properties | group-properties-v1.html | /preview/group-properties |
| guest-profile | guest-profile-v1.html | /preview/guest-profile |
| guests | guests-v1.html | /preview/guests |
| inbox | inbox-v1.html | /preview/inbox |
| knowledge | knowledge-v1.html | /preview/knowledge |
| landing | landing-v1.html | /preview/landing |
| login | login-v1.html | /preview/login |
| pricing | pricing-v1.html | /preview/pricing |
| reset-password | reset-password-v1.html | /preview/reset-password |
| settings | settings-v1.html | /preview/settings |
| settings-ai-voice | settings-ai-voice-v1.html | /preview/settings-ai-voice |
| settings-billing | settings-billing-v1.html | /preview/settings-billing |
| settings-property | settings-property-v1.html | /preview/settings-property |
| settings-quick-actions | settings-quick-actions-v1.html | /preview/settings-quick-actions |
| settings-routing | settings-routing-v1.html | /preview/settings-routing |
| settings-team | settings-team-v1.html | /preview/settings-team |
| signup | signup-v1.html | /preview/signup |
