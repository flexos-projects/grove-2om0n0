---
id: tokens-design-system
title: "Design System Tokens"
type: design
subtype: tokens
status: active
sequence: 12
description: "Complete design token set — colors (light + dark), typography, spacing, radii, shadows, transitions"
relatesTo: [docs/006-design.md]
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
This file contains all design tokens for Grove as structured flex_blocks.
The tokens.css file in prototype/shared/ is generated from these blocks.
To update tokens: edit this file and regenerate tokens.css.
Do not edit tokens.css directly — changes will be overwritten.
</flex_block>

<flex_block type="tokens">
{
  "category": "colors",
  "mode": "dark",
  "tokens": {
    "--color-bg": "#0F0F0E",
    "--color-surface": "#1A1918",
    "--color-surface-raised": "#242321",
    "--color-surface-sunken": "#0A0A09",
    "--color-border": "#2E2C28",
    "--color-border-strong": "#3D3A35",
    "--color-text": "#F5F3EF",
    "--color-text-secondary": "#A8A29E",
    "--color-text-tertiary": "#78716C",
    "--color-brand": "#40916C",
    "--color-brand-hover": "#52B788",
    "--color-brand-muted": "#1B4332",
    "--color-brand-text": "#FFFFFF",
    "--color-accent": "#C9A96E",
    "--color-accent-muted": "#2A2418",
    "--color-success": "#40916C",
    "--color-success-muted": "#1B4332",
    "--color-warning": "#D97706",
    "--color-warning-muted": "#451A03",
    "--color-danger": "#DC2626",
    "--color-danger-muted": "#450A0A",
    "--color-info": "#3B82F6",
    "--color-info-muted": "#1E3A5F",
    "--color-guest-bubble": "#242321",
    "--color-staff-bubble": "#1B4332",
    "--color-ai-bubble": "#1A2E23",
    "--color-note-bg": "#2A2418",
    "--color-note-border": "#3D3520"
  }
}
</flex_block>

<flex_block type="tokens">
{
  "category": "colors",
  "mode": "light",
  "tokens": {
    "--color-bg": "#FAF9F6",
    "--color-surface": "#FFFFFF",
    "--color-surface-raised": "#FFFFFF",
    "--color-surface-sunken": "#F3F1EC",
    "--color-border": "#E5E1DA",
    "--color-border-strong": "#CBC5BA",
    "--color-text": "#1C1917",
    "--color-text-secondary": "#78716C",
    "--color-text-tertiary": "#A8A29E",
    "--color-brand": "#1B4332",
    "--color-brand-hover": "#2D6A4F",
    "--color-brand-muted": "#D8F3DC",
    "--color-brand-text": "#FFFFFF",
    "--color-accent": "#B08D57",
    "--color-accent-muted": "#F5F0E8",
    "--color-success": "#2D6A4F",
    "--color-success-muted": "#D8F3DC",
    "--color-warning": "#B45309",
    "--color-warning-muted": "#FEF3C7",
    "--color-danger": "#991B1B",
    "--color-danger-muted": "#FEE2E2",
    "--color-info": "#1E40AF",
    "--color-info-muted": "#DBEAFE",
    "--color-guest-bubble": "#F3F1EC",
    "--color-staff-bubble": "#D8F3DC",
    "--color-ai-bubble": "#EDF5F0",
    "--color-note-bg": "#FFFBEB",
    "--color-note-border": "#F5E6B8"
  }
}
</flex_block>

<flex_block type="tokens">
{
  "category": "typography",
  "tokens": {
    "--font-heading": "'Instrument Serif', 'Georgia', 'Times New Roman', serif",
    "--font-body": "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
    "--font-mono": "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    "--text-xs": "0.75rem",
    "--text-sm": "0.8125rem",
    "--text-base": "0.9375rem",
    "--text-lg": "1.0625rem",
    "--text-xl": "1.25rem",
    "--text-2xl": "1.5rem",
    "--text-3xl": "2rem",
    "--text-4xl": "2.75rem",
    "--text-5xl": "3.5rem",
    "--weight-normal": "400",
    "--weight-medium": "500",
    "--weight-semibold": "600",
    "--weight-bold": "700",
    "--line-height-tight": "1.2",
    "--line-height-normal": "1.5",
    "--line-height-relaxed": "1.7",
    "--letter-spacing-tight": "-0.02em",
    "--letter-spacing-normal": "0",
    "--letter-spacing-wide": "0.05em"
  }
}
</flex_block>

<flex_block type="tokens">
{
  "category": "spacing",
  "tokens": {
    "--space-0": "0",
    "--space-px": "1px",
    "--space-0.5": "0.125rem",
    "--space-1": "0.25rem",
    "--space-1.5": "0.375rem",
    "--space-2": "0.5rem",
    "--space-3": "0.75rem",
    "--space-4": "1rem",
    "--space-5": "1.25rem",
    "--space-6": "1.5rem",
    "--space-8": "2rem",
    "--space-10": "2.5rem",
    "--space-12": "3rem",
    "--space-16": "4rem",
    "--space-20": "5rem",
    "--space-24": "6rem"
  }
}
</flex_block>

<flex_block type="tokens">
{
  "category": "radii",
  "tokens": {
    "--radius-sm": "0.25rem",
    "--radius-md": "0.5rem",
    "--radius-lg": "0.75rem",
    "--radius-xl": "1rem",
    "--radius-2xl": "1.25rem",
    "--radius-full": "9999px"
  }
}
</flex_block>

<flex_block type="tokens">
{
  "category": "shadows",
  "tokens": {
    "--shadow-xs": "0 1px 2px rgba(28, 25, 23, 0.04)",
    "--shadow-sm": "0 1px 3px rgba(28, 25, 23, 0.06), 0 1px 2px rgba(28, 25, 23, 0.04)",
    "--shadow-md": "0 4px 8px rgba(28, 25, 23, 0.06), 0 2px 4px rgba(28, 25, 23, 0.04)",
    "--shadow-lg": "0 12px 24px rgba(28, 25, 23, 0.08), 0 4px 8px rgba(28, 25, 23, 0.04)",
    "--shadow-xl": "0 20px 40px rgba(28, 25, 23, 0.1), 0 8px 16px rgba(28, 25, 23, 0.04)"
  }
}
</flex_block>

<flex_block type="tokens">
{
  "category": "transitions",
  "tokens": {
    "--transition-fast": "120ms ease-out",
    "--transition-base": "200ms ease-out",
    "--transition-slow": "350ms ease-out",
    "--transition-spring": "400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    "--ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    "--ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "--ease-in": "cubic-bezier(0.4, 0, 1, 1)"
  }
}
</flex_block>

# Design System Tokens

Grove's visual language is rooted in hospitality, not technology. The palette draws from the natural world -- deep forest green (#1B4332) as the brand identity, warm stone and parchment for surfaces, charcoal for text, and a restrained gold accent (#B08D57) that appears sparingly like candlelight on a returning guest badge.

The aesthetic references Aesop retail stores (natural materials, generous space, quiet confidence), The LINE hotel's editorial brand identity, and Linear's information density when needed. Dark mode is the app default -- it feels like an evening lobby. Light mode serves marketing pages -- bright, airy, welcoming.

Typography pairs Instrument Serif for headings (quiet authority, like a boutique hotel room number plate) with Inter for body and UI text (invisible, warm, legible at every size). JetBrains Mono handles code and system identifiers.

Spacing follows a 4px base unit. The product should breathe -- when in doubt, more space, not less. Border radii are soft but never bubbly. Shadows use warm-tinted rgba values (drawn from the text colour, not black) so they feel natural rather than digital. Transitions favour ease-out curves -- motion should feel like a deep breath, not a snap.

What to avoid: glassmorphism, gradients, neon accents, startup-bright colours, gamification patterns, thick borders, heavy shadows. Nothing that screams "SaaS dashboard."
