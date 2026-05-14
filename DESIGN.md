---
version: alpha
name: Tim Hortons
description: >
  Warmth, heritage, accessibility. A cream-on-white foundation with deep
  espresso narrative and a single signature red for action.
colors:
  primary: "#c80f2e"
  primary-dark: "#a90d26"
  primary-ink: "#6b0918"
  neutral: "#fbf6ef"
  neutral-soft: "#f4ecdf"
  secondary: "#2a1a12"
  secondary-soft: "#4a3327"
  on-surface: "#1a120c"
  on-surface-muted: "#6b5d52"
  outline: "#e6dccc"
  outline-strong: "#c9b9a3"
  surface: "#ffffff"
  on-primary: "#ffffff"
typography:
  h1:
    fontFamily: Sofia Pro Black
    fontWeight: 900
    fontSize: 70px
    lineHeight: 1
    letterSpacing: -0.02em
  h2:
    fontFamily: Sofia Pro Bold
    fontWeight: 600
    fontSize: 46px
    lineHeight: 1.05
    letterSpacing: -0.025em
  h3:
    fontFamily: Sofia Pro Bold
    fontWeight: 600
    fontSize: 32px
    lineHeight: 1.1
  body-md:
    fontFamily: Manrope
    fontWeight: 400
    fontSize: 16px
    lineHeight: 1.6
  body-lg:
    fontFamily: Manrope
    fontWeight: 400
    fontSize: 17px
    lineHeight: 1.6
  label-mono:
    fontFamily: JetBrains Mono
    fontWeight: 500
    fontSize: 12px
    lineHeight: 1
    letterSpacing: 0.05em
spacing:
  section-y: 96px
  section-y-compact: 64px
  gutter: 56px
  max-content-width: 1180px
rounded:
  th: 4px
  default: 0.25rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.default}"
    padding: "0 16px"
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.default}"
    height: 40px
  button-secondary:
    backgroundColor: "{colors.neutral-soft}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.default}"
    height: 40px
  cta-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.th}"
  card:
    backgroundColor: "{colors.neutral-soft}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.default}"
---

# Tim Hortons Design System

## Overview

The Tim Hortons UI is built around three brand instincts: **warmth**, **heritage**, and **accessibility**. The page foundation is never pure white — a soft cream (`neutral`) substitutes for it, lending the screen the temperature of a hot beverage on a paper cup. Narrative text is set in deep espresso brown rather than black, which keeps long reading passages from feeling clinical or corporate. Signature TH red is reserved exclusively for the single most important interactive moment on a screen, so that when a user sees it, they always know what to do.

The visual posture is **flat and broadsheet-like**. Depth is achieved through tonal layers (cream on white) and 1px rule borders rather than drop shadows. Type does the heavy lifting for hierarchy: Sofia Pro Black at large display sizes anchors hero moments; Manrope handles long-form body copy with quiet humility.

## Colors

The palette is rooted in a warm, paper-tinted neutral foundation and a single, evocative red accent.

- **Primary (#c80f2e):** Signature TH red — the sole driver for interactive elements. Use for the primary CTA on a screen, the underline on the focused control, and the rule under a "hot moment" headline. Never as a decorative fill.
- **Primary Dark (#a90d26):** Hover and pressed states of the primary color. Also acceptable for small inverted text on cream backgrounds where #c80f2e fails contrast.
- **Primary Ink (#6b0918):** A deep oxblood used for body text *inside* cream cards (the `card-foreground` role) — preserves warmth where pure black would feel cold.
- **Neutral (#fbf6ef):** Warm "kraft cream." The default brand body color and an alternative to white for full-bleed page backgrounds.
- **Neutral Soft (#f4ecdf):** A slightly deeper cream used for cards, secondary panels, and muted surfaces. The contrast against `neutral` and against `surface` (white) is the entire elevation system.
- **Secondary (#2a1a12):** Espresso brown. The default color for headlines and narrative text. Substitute for pure black throughout the system.
- **Secondary Soft (#4a3327):** A lighter espresso for body paragraphs paired with `secondary` headlines.
- **On-Surface (#1a120c):** Near-black for the highest-contrast text against white backgrounds (rare — usually `secondary` is enough).
- **On-Surface Muted (#6b5d52):** Espresso-tinted gray for captions, metadata, and timestamps.
- **Outline (#e6dccc):** 1px rule color for separating sections, the default border on cards and inputs.
- **Outline Strong (#c9b9a3):** A darker rule, used where a card needs more definition or where two rules visually overlap.

Light theme is authoritative in this document. Dark theme inverts these tokens by swapping `--background`, `--card`, and `--foreground` against the `[data-theme='dark']` selector in `globals.css`; the same hex values play different roles under dark mode rather than being a separate palette.

## Typography

The typography stack pairs **Sofia Pro** (display, hero) with **Manrope** (body) and **JetBrains Mono** (technical labels).

- **Display headlines (h1):** Sofia Pro Black at 900 weight. Tight negative letter-spacing (-0.02em) and a line-height of 1 give hero text the visual weight of a newspaper masthead. Sizes are fluid via `clamp(36px, 5.5vw, 70px)` — the YAML records the upper bound as design intent.
- **Section headlines (h2):** Sofia Pro Bold at 600 weight. Used inside RichText blocks and at the top of card sections. `clamp(28px, 3.6vw, 46px)`.
- **Sub-headlines (h3):** Sofia Pro Bold, smaller scale.
- **Body (body-md, body-lg):** Manrope at 400 weight, line-height 1.6. The `b-richtext` class uses 17px for slightly more comfortable long-form reading; UI labels and buttons use 16px.
- **Technical labels (label-mono):** JetBrains Mono at 12px with widened letter-spacing. Used for slugs, metadata tags, and the "ROUTE_TITLE" eyebrows that sit above page headers.

Local font files (Sofia Pro variants) live in `public/fonts/` and are loaded via `next/font/local` in `src/app/(frontend)/layout.tsx`. Manrope and JetBrains Mono are loaded from Google Fonts.

## Layout & Spacing

The layout follows a **fluid container** model: a max content width of 1180px, with horizontal gutters that shrink on small viewports and expand on large ones.

- **Container:** `max-content-width: 1180px`. All major page content is centered inside this width.
- **Gutter:** `clamp(20px, 4vw, 56px)`. The horizontal breathing room between content and the viewport edge.
- **Section vertical rhythm:** `clamp(56px, 7vw, 96px)` for standard sections; `clamp(36px, 4.5vw, 64px)` for compact sections (e.g. a `PageHeader` directly above a hero).

There is no hardcoded grid — block components use CSS Grid or Flex with `clamp()`-derived gaps. The 96px section-y upper bound is the "lung-full" the design system gives between major narrative beats.

## Elevation & Depth

Depth is **tonal, not cast**. Shadows are minimal-to-absent.

- **Level 0 (page background):** `#ffffff` (or `neutral` for warmer pages).
- **Level 1 (card / muted panel):** `neutral-soft` (#f4ecdf) on white. The cream-on-white contrast is itself the elevation.
- **Level 2 (interactive cards):** Same `neutral-soft` fill plus a 1px `outline` border. On hover, a subtle box-shadow may appear (`hover:shadow-md` is the Tailwind default the codebase uses sparingly).
- **Inverted (red panels, CTA):** The CTA block uses `primary` as a fill with `on-primary` (#fff) text — visually the highest "elevation" because it commands attention, even though it carries no shadow.

Rule borders (`outline`, `outline-strong`) do the work of separation between sections inside a single panel.

## Shapes

Corner radii are deliberately understated.

- **`rounded.th` (4px):** The brand-canonical radius. Default for cards, buttons, inputs, and CTA panels. Maps to `--th-radius: 4px`.
- **`rounded.default` (0.25rem / 4px):** The shadcn role token, kept equal to `rounded.th` so primitive components inherit brand shape automatically.

The system does not use heavily rounded "pill" buttons or fully circular avatars except where a content medium (a coffee cup, a portrait) requires it. The visual language is engineered, not playful.

## Components

The codebase ships these atomic + composite components, all of which derive from the tokens above. Their live appearance is rendered on `/blocks/design-system/components`.

- **Button (primary / outline / secondary / ghost / link):** Defined in [src/components/ui/button.tsx](src/components/ui/button.tsx) via `cva`. Primary uses `--primary` (TH red) with white text; outline keeps a 1px `--input` border on a white fill; secondary uses `neutral-soft` for low-emphasis actions. All variants share `rounded-[6px]` from the shadcn default *and* honor the brand `--radius` (0.25rem) via shadcn role tokens.
- **CTA Block:** Defined in [src/blocks/CallToAction/Component.tsx](src/blocks/CallToAction/Component.tsx). A full-width red panel (`--th-red` fill) with inverted typography (white headings, 85%-opacity white body). Used as the closing pitch of a page.
- **Card:** Generic surface used by the block library, accordion items, and grid cells. Fill: `neutral-soft`. Text: `primary-ink`. Border: `outline`.
- **Input / Textarea / Select:** Defined under `src/components/ui/`. White fill, `outline` border, `--ring` (TH red) focus ring.
- **Accordion:** Defined in [src/blocks/Accordion/Component.tsx](src/blocks/Accordion/Component.tsx). Items are separated by `outline` rules; expanded items reveal Manrope body copy.

When designing new components, prefer reusing these existing primitives over introducing a new visual idiom. Stylistic novelty is best invested in *content* (illustration, photography, copy) rather than in *chrome*.

## Do's and Don'ts

- **Do** use TH red (`primary`) for the single primary action per screen, and nothing else.
- **Do** use `secondary` (espresso) for headlines and narrative body text in place of pure black.
- **Do** keep page backgrounds in `surface` (white) or `neutral` (cream); avoid colored full-bleed backgrounds outside the CTA block.
- **Do** lean on tonal contrast (cream on white) rather than shadows to convey hierarchy.
- **Don't** combine multiple red accents on the same screen — the eye should always know which red is "the" red.
- **Don't** introduce new corner radii. If 4px feels wrong for a new component, the component itself is probably wrong.
- **Don't** mix Sofia Pro and Manrope inside the same headline. Use one type system per line.
- **Don't** use drop shadows above `shadow-md`. Heavy elevation is off-brand.
- **Don't** add new design tokens to `globals.css` without also adding them to this DESIGN.md (the lint script will fail).
