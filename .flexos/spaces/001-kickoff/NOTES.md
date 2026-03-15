# Kickoff Session Notes

**Project:** Grove
**Started:** 2026-03-15

## What We Know

Grove is an SMS concierge platform for boutique hotels. The founder described it as "a butler in your pocket" — guests text a number and get everything sorted. Deep forest green is the brand identity colour, not an accent.

The creative brief was generated from a single founder sentence and expanded into a full product vision. All 8 holy docs (vision, features, pages, flows, database, design, technical, content) have been generated. 22 page prototypes have been built covering marketing pages, auth flows, the operator dashboard (inbox, guests, knowledge base, analytics, settings), and group/multi-property management.

## Key Decisions Made

- **SMS-first:** Guests interact via SMS only. No app download, no login for guests.
- **B2B SaaS model:** Hotels pay, not guests. Operator dashboard is the product.
- **Hybrid AI:** AI handles routine requests (~70-80%), humans handle complex/emotional ones. Guest never knows which.
- **Tech stack locked:** Nuxt 4, Convex, Vercel, Trigger.dev v4.
- **White-label feel:** Each hotel's guests should feel like the service is the hotel's own, not a platform's.
- **Aesthetic direction:** Hospitality-grade design — Aesop retail meets a well-designed reservation book. No startup energy, no gradients, no glassmorphism.
- **Multi-property support:** Hotel groups (2-8 properties) are a core use case from day one.

## Open Questions

1. **AI or human behind the SMS?** Assumed hybrid (AI drafts, staff approves complex). Needs validation — what percentage of requests can realistically be fully automated at launch?
2. **Who pays — the hotel or the guest?** Assumed B2B SaaS (hotel subscribes). Pricing tiers not yet defined.
3. **Integration depth:** Assumed standalone-first. PMS integrations (Mews, Cloudbeds, Little Hotelier) planned as growth features. When should we scope the first integration?
4. **Pricing model:** Tiered by property count and feature access, but specific tiers and price points not defined yet.
5. **Launch market:** US, UK, and EU boutique hotels mentioned. Which market first?
6. **Twilio vs alternatives:** Twilio assumed for SMS. Should we evaluate MessageBird or others for cost/coverage?
