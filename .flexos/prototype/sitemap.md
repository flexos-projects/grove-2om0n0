---
id: prototype-sitemap
title: "Prototype Sitemap"
type: prototype
subtype: config
status: active
sequence: 17
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

# Prototype Sitemap

All prototype screens and their current versions.

<flex_block type="config">
{
  "pages": [
    {
      "slug": "about",
      "file": "prototype/about-v1.html",
      "title": "About",
      "route": "/preview/about",
      "status": "current",
      "category": "marketing",
      "version": 1,
      "linksTo": ["landing", "pricing", "contact", "login", "signup"],
      "linkedFrom": ["contact", "landing", "pricing"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "analytics",
      "file": "prototype/analytics-v1.html",
      "title": "Analytics",
      "route": "/preview/analytics",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "settings"],
      "linkedFrom": ["group", "group-properties", "guest-profile", "guests", "inbox", "knowledge", "settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "contact",
      "file": "prototype/contact-v1.html",
      "title": "Contact",
      "route": "/preview/contact",
      "status": "current",
      "category": "marketing",
      "version": 1,
      "linksTo": ["landing", "pricing", "about", "login", "signup"],
      "linkedFrom": ["about", "landing", "pricing"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "forgot-password",
      "file": "prototype/forgot-password-v1.html",
      "title": "Forgot Password",
      "route": "/preview/forgot-password",
      "status": "current",
      "category": "auth",
      "version": 1,
      "linksTo": ["login"],
      "linkedFrom": ["login", "reset-password"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "group",
      "file": "prototype/group-v1.html",
      "title": "Group Overview",
      "route": "/preview/group",
      "status": "current",
      "category": "group",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "group-properties"],
      "linkedFrom": ["group-properties"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "group-properties",
      "file": "prototype/group-properties-v1.html",
      "title": "Group Properties",
      "route": "/preview/group-properties",
      "status": "current",
      "category": "group",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "group"],
      "linkedFrom": ["group"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "guest-profile",
      "file": "prototype/guest-profile-v1.html",
      "title": "Guest Profile",
      "route": "/preview/guest-profile",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings"],
      "linkedFrom": ["guests"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "guests",
      "file": "prototype/guests-v1.html",
      "title": "Guests",
      "route": "/preview/guests",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "knowledge", "analytics", "settings", "guest-profile"],
      "linkedFrom": ["analytics", "group", "group-properties", "guest-profile", "inbox", "knowledge", "settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "inbox",
      "file": "prototype/inbox-v1.html",
      "title": "Inbox",
      "route": "/preview/inbox",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["guests", "knowledge", "analytics", "settings"],
      "linkedFrom": ["analytics", "group", "group-properties", "guest-profile", "guests", "knowledge", "login", "settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing", "settings-team", "signup"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "knowledge",
      "file": "prototype/knowledge-v1.html",
      "title": "Knowledge Base",
      "route": "/preview/knowledge",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "analytics", "settings"],
      "linkedFrom": ["analytics", "group", "group-properties", "guest-profile", "guests", "inbox", "settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "landing",
      "file": "prototype/landing-v1.html",
      "title": "Landing Page",
      "route": "/preview/landing",
      "status": "current",
      "category": "marketing",
      "version": 1,
      "linksTo": ["pricing", "about", "contact", "login", "signup"],
      "linkedFrom": ["about", "contact", "pricing"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "login",
      "file": "prototype/login-v1.html",
      "title": "Login",
      "route": "/preview/login",
      "status": "current",
      "category": "auth",
      "version": 1,
      "linksTo": ["signup", "forgot-password", "inbox"],
      "linkedFrom": ["about", "contact", "forgot-password", "landing", "pricing", "reset-password", "signup"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "pricing",
      "file": "prototype/pricing-v1.html",
      "title": "Pricing",
      "route": "/preview/pricing",
      "status": "current",
      "category": "marketing",
      "version": 1,
      "linksTo": ["landing", "about", "contact", "login", "signup"],
      "linkedFrom": ["about", "contact", "landing"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "reset-password",
      "file": "prototype/reset-password-v1.html",
      "title": "Reset Password",
      "route": "/preview/reset-password",
      "status": "current",
      "category": "auth",
      "version": 1,
      "linksTo": ["login", "forgot-password"],
      "linkedFrom": [],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings",
      "file": "prototype/settings-v1.html",
      "title": "Settings Hub",
      "route": "/preview/settings",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings-property", "settings-team", "settings-routing", "settings-quick-actions", "settings-ai-voice", "settings-billing"],
      "linkedFrom": ["analytics", "group", "group-properties", "guest-profile", "guests", "inbox", "knowledge", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings-ai-voice",
      "file": "prototype/settings-ai-voice-v1.html",
      "title": "Settings - AI Voice",
      "route": "/preview/settings-ai-voice",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "settings-property", "settings-team", "settings-routing", "settings-quick-actions", "settings-billing"],
      "linkedFrom": ["settings", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings-billing",
      "file": "prototype/settings-billing-v1.html",
      "title": "Settings - Billing",
      "route": "/preview/settings-billing",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "settings-property", "settings-team", "settings-routing", "settings-quick-actions", "settings-ai-voice"],
      "linkedFrom": ["settings", "settings-ai-voice", "settings-property", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings-property",
      "file": "prototype/settings-property-v1.html",
      "title": "Settings - Property",
      "route": "/preview/settings-property",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "settings-team", "settings-routing", "settings-quick-actions", "settings-ai-voice", "settings-billing"],
      "linkedFrom": ["settings", "settings-ai-voice", "settings-billing", "settings-quick-actions", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings-quick-actions",
      "file": "prototype/settings-quick-actions-v1.html",
      "title": "Settings - Quick Actions",
      "route": "/preview/settings-quick-actions",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "settings-property", "settings-team", "settings-routing", "settings-ai-voice", "settings-billing"],
      "linkedFrom": ["settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-routing", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings-routing",
      "file": "prototype/settings-routing-v1.html",
      "title": "Settings - Routing",
      "route": "/preview/settings-routing",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "settings-property", "settings-team", "settings-quick-actions", "settings-ai-voice", "settings-billing"],
      "linkedFrom": ["settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-team"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "settings-team",
      "file": "prototype/settings-team-v1.html",
      "title": "Settings - Team",
      "route": "/preview/settings-team",
      "status": "current",
      "category": "app",
      "version": 1,
      "linksTo": ["inbox", "guests", "knowledge", "analytics", "settings", "settings-property", "settings-routing", "settings-quick-actions", "settings-ai-voice", "settings-billing"],
      "linkedFrom": ["settings", "settings-ai-voice", "settings-billing", "settings-property", "settings-quick-actions", "settings-routing"],
      "broken": [],
      "disabled": []
    },
    {
      "slug": "signup",
      "file": "prototype/signup-v1.html",
      "title": "Signup / Onboarding",
      "route": "/preview/signup",
      "status": "current",
      "category": "auth",
      "version": 1,
      "linksTo": ["login", "inbox"],
      "linkedFrom": ["about", "contact", "landing", "login", "pricing"],
      "broken": [],
      "disabled": []
    }
    ,
    {
      "slug": "flexos",
      "file": "prototype/pages/index.html",
      "title": "Project Showcase",
      "route": "/preview/flexos",
      "status": "current",
      "category": "system",
      "version": 1,
      "linksTo": [],
      "linkedFrom": [],
      "broken": [],
      "disabled": []
    }
  ],
  "broken": [],
  "disabled": [],
  "lastAudit": "2026-03-15"
}
</flex_block>
