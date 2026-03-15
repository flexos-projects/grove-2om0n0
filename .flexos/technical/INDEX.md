---
id: technical-index
title: "Technical Specs"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Technical specs define HOW THE PRODUCT IS BUILT.

SUBTYPES:
- stack: Framework, database, hosting, styling choices
- integration: External services (Twilio, Stripe, Resend, etc.)
- infrastructure: Deployment, CI/CD, environment configuration
- auth: Authentication strategy, session management, security

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-stack-nuxt-convex.md, 002-integration-twilio.md

HARD RULES (never override):
- Framework: Nuxt 4 (never Nuxt 3)
- AI SDK: @google/genai (NEVER @google/generative-ai — deprecated)
- Auto-imports: disabled (explicit imports only)
- Default database: Convex
- Hosting: Vercel
- Build orchestration: Trigger.dev v4
</flex_block>
