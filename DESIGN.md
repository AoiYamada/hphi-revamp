---
name: HPHI — 專業心理治療及催眠應用（香港）
description: A considered, contemplative visual system for a Hong Kong psychotherapy and hypnosis institute.
colors:
  iris-ink: "#3c2865"
  hyacinth: "#5a3f8e"
  soft-violet: "#b9aacd"
  calm-paper: "#faf8fb"
  soft-bloom: "#f3eff6"
  hush-line: "#e3dde9"
  slate-plum: "#322b3a"
  quiet-plum: "#6b6376"
  sage: "#5a8a64"
  amber: "#c08a2b"
  madder: "#b8413f"
typography:
  display:
    fontFamily: "var(--font-geist-sans), Geist, ui-sans-serif, -apple-system, 'PingFang TC', 'Noto Sans TC', sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-geist-sans), Geist, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "var(--font-geist-sans), Geist, ui-sans-serif, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-geist-sans), Geist, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist-sans), Geist, ui-sans-serif, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  mono:
    fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "20px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "72px"
components:
  button-primary:
    backgroundColor: "{colors.iris-ink}"
    textColor: "{colors.calm-paper}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.hyacinth}"
    textColor: "{colors.calm-paper}"
  button-outline:
    backgroundColor: "{colors.calm-paper}"
    textColor: "{colors.iris-ink}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.soft-bloom}"
    textColor: "{colors.iris-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.iris-ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "44px"
  card:
    backgroundColor: "{colors.calm-paper}"
    textColor: "{colors.slate-plum}"
    rounded: "{rounded.lg}"
    padding: "24px"
  cta-panel:
    backgroundColor: "{colors.soft-bloom}"
    textColor: "{colors.slate-plum}"
    rounded: "{rounded.xl}"
    padding: "32px"
  input:
    backgroundColor: "{colors.calm-paper}"
    textColor: "{colors.slate-plum}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
    height: "44px"
  chip:
    backgroundColor: "{colors.soft-bloom}"
    textColor: "{colors.iris-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: HPHI — 專業心理治療及催眠應用（香港）

## 1. Overview

**Creative North Star: "The Considered Practice"**

This is the visual language of a working psychotherapy and hypnosis room — not the brochure for one. Calm, considered, contemplative, with the seriousness of a clinical practice and the warmth of a place you'd actually return to. The brand color is purple — but purple in the sense of *iris ink* and *deep hyacinth*, not the lavender soap aisle. Surfaces are warm-tinted near-whites. Type is restrained and confident. Motion is slow. Nothing competes for attention; the content does the talking.

The previous system reads as flat-and-candy: a mid-saturation indigo applied flat to buttons, a too-bright lavender used as both background fill *and* default border, and dead-gray neutrals that don't relate to the brand. This system replaces those failures with: one deep committed primary, one soft accent that is **never** used as a background or a border, warm purple-tinted neutrals as the surface family, and a single rounding scale applied consistently across every component.

**Key Characteristics:**
- Restrained color strategy: tinted neutrals do 90% of the work; the deep iris carries identity.
- Warm purple-leaning neutrals — **never** pure `#fff` or `#000`.
- One rounding scale (6 / 10 / 14 / 20 px). No more `rounded`, `rounded-md`, `rounded-xl` mixed by accident.
- Tonal layering over shadow stacks. Depth comes from surface tone, not from drop shadow.
- Type hierarchy through weight + scale, never color.

## 2. Colors

A restrained palette built around a single committed primary in the iris–hyacinth family, carried by warm neutrals tinted faintly toward the same hue. The candy lavender that previously filled `--muted` is retired from background and border roles and survives only as a rare accent.

### Primary

- **Iris Ink** (`#3c2865`, `oklch(0.32 0.10 290)`): The committed primary. Used on the primary button, on emphatic links, on the logotype, and on the small set of headline elements that carry brand voice. Dark enough to read confidently on `Calm Paper`; never used as a large background fill.
- **Hyacinth** (`#5a3f8e`, `oklch(0.45 0.13 290)`): The hover and pressed state of the primary, and the color of secondary emphasis (sub-headings, active nav, focused field outline).

### Accent

- **Soft Violet** (`#b9aacd`, `oklch(0.78 0.06 290)`): Reserved for tiny moments — a divider in a footer, a drop cap, a hover halo, a chart series. **Never** a panel background. **Never** a default border.

### Neutral

- **Calm Paper** (`#faf8fb`, `oklch(0.985 0.005 290)`): Default page background. Reads white but carries 0.005 chroma toward the brand hue, which is what relates it to the rest of the palette.
- **Soft Bloom** (`#f3eff6`, `oklch(0.965 0.008 290)`): Raised surfaces — cards, callouts, the CTA panel, the open state of accordions. The "second layer" without resorting to shadow.
- **Hush Line** (`#e3dde9`, `oklch(0.90 0.01 290)`): The divider/border tone. Quiet enough to disappear, present enough to structure. **The only border color in the system at rest.**
- **Slate Plum** (`#322b3a`, `oklch(0.28 0.015 290)`): Body text. Warm-dark. Replaces the previous dead-gray `240 10% 3.9%`.
- **Quiet Plum** (`#6b6376`, `oklch(0.50 0.015 290)`): Muted text — captions, meta, helper copy, breadcrumbs.

### Status

- **Sage** (`#5a8a64`, `oklch(0.55 0.10 145)`): Success.
- **Amber** (`#c08a2b`, `oklch(0.65 0.13 75)`): Warning.
- **Madder** (`#b8413f`, `oklch(0.52 0.16 25)`): Error / destructive. Not the default-Tailwind tomato red.

### Named Rules

**The One Voice Rule.** Iris Ink + Hyacinth carry the brand. They appear on no more than ~10% of any given screen. Their rarity is what makes them read as voice, not noise.

**The No-Lavender-Backgrounds Rule.** Soft Violet is never a fill. Not a card background. Not a section band. Not a hover state on a list item. If a panel needs a tinted surface, it is **Soft Bloom**. Not negotiable — this is the failure mode of the previous system and we will not return to it.

**The Hush-Line Rule.** Borders, dividers, and field strokes are `Hush Line` and **1px**. Not 2px. Not Soft Violet. Not Hyacinth. If a field is focused, the border becomes Hyacinth at 1px plus a 2px Soft-Violet ring outside it.

## 3. Typography

**Display / Body Font:** Geist (`var(--font-geist-sans)`), with `PingFang TC, Noto Sans TC` ahead in the stack so Traditional Chinese content (the canonical content of this site) gets the right glyph metrics.

**Mono Font:** Geist Mono (`var(--font-geist-mono)`) — for tabular figures, code blocks, and the rare occasion where a label needs technical voice.

**Character:** Geist is geometric, contemporary, slightly literary at heavier weights. Paired with PingFang's well-proportioned Traditional Chinese, the type feels like a serious institution rather than a wellness app. We get our personality from **weight contrast and scale ratio** — never from a decorative display face, never from gradient text.

### Hierarchy

- **Display** (400 weight, `clamp(2.25rem, 4.5vw, 3.5rem)`, line-height 1.1, letter-spacing −0.02em): Hero headlines only. Lighter weight at large sizes — the optical illusion is that big + light reads quieter and more confident than big + bold.
- **Headline** (500 weight, `clamp(1.5rem, 2.4vw, 2rem)`, line-height 1.2, letter-spacing −0.01em): Section headings on long pages.
- **Title** (600 weight, `1.125rem`, line-height 1.35): Card titles, accordion headers, in-block sub-headings.
- **Body** (400 weight, `1rem`, line-height 1.6): Long-form Chinese content reads at slightly more line-height than Latin convention; 1.6 is intentional. Cap measure at **65–75ch**.
- **Label** (500 weight, `0.75rem`, line-height 1, letter-spacing 0.06em, **uppercase Latin / unchanged Chinese**): Eyebrow tags, meta, button micro-labels.
- **Mono** (400 weight, `0.875rem`): Tabular figures only.

### Named Rules

**The Weight-Not-Color Rule.** Hierarchy comes from scale + weight contrast. **Never** color a heading Iris Ink to make it "more important" — that is the brand voice spent for nothing.

**The 65ch Rule.** Any block of body copy wider than 75ch is broken. Add a max-width or rebalance the layout.

## 4. Elevation

This is a **flat-by-default tonal-layering** system. Depth is conveyed by shifting the surface tone (`Calm Paper` → `Soft Bloom`), not by stacking shadows. Shadows exist as a small, ambient vocabulary for state and floating elements only.

### Shadow Vocabulary

- **lift-1** (`box-shadow: 0 1px 2px 0 oklch(0.32 0.10 290 / 0.06)`): The resting elevation of a card with content the user can act on. Almost imperceptible — it's there to pull the surface off the page by half a millimeter, not to announce itself.
- **lift-2** (`box-shadow: 0 8px 24px -12px oklch(0.32 0.10 290 / 0.18)`): Hover state on cards, the open state of dropdowns and popovers. One step up.
- **lift-focus** (`box-shadow: 0 0 0 3px oklch(0.78 0.06 290 / 0.45)`): Keyboard focus ring. Always Soft Violet at 45% opacity, always 3px outside the element. Never replaces the border — it sits **outside** it.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. `lift-1` is the *only* shadow allowed at rest, and only on cards-as-objects (course cards, post cards, tutor cards) — not on buttons, not on inputs, not on full-bleed sections.

**The No-Stacking Rule.** A card with `lift-1` and a 1px Hush Line border is the canonical card. **Do not** stack `lift-1` + `lift-2` + a glow + a border + a gradient. One layer of depth.

## 5. Components

### Buttons

- **Shape:** softly rounded (10px / `rounded.md`). Same radius across every variant. **Pill buttons are reserved for chips and tags — not actions.**
- **Height:** 44px default (touch-comfortable, generous on desktop), 36px small, 52px large.
- **Primary:** Iris Ink background, Calm Paper text, no shadow. Hover: background shifts to Hyacinth, no transform, no scale. Focus: `lift-focus` ring + Hyacinth border.
- **Outline:** Calm Paper background, Iris Ink text, 1px Hush Line border. Hover: background to Soft Bloom, border to Hyacinth.
- **Ghost:** No background, Iris Ink text. Hover: background to Soft Bloom. Used in dense UI where a third button would feel busy.
- **Link:** Hyacinth text, no background, underline on hover only. Used inline with body copy.
- **States:** Disabled drops opacity to 0.5 and removes interaction. Loading replaces the label with a spinner *inline*, never a covering scrim.
- **Bans:** No `box-shadow` on buttons. No gradient buttons. No `transform: translateY` on hover. No "shimmer" pseudo-elements.

### Chips / Tags

- **Style:** Soft Bloom background, Iris Ink text, `rounded.pill`, 4px / 12px padding, label typography (12px 500, 0.06em tracking).
- **Selected state:** Iris Ink background, Calm Paper text. No border switch.

### Cards

- **Corner Style:** 14px (`rounded.lg`). Same radius across course cards, post cards, tutor cards, accordion items, content-block backgrounds-on, and FAQ panels. **No `rounded-xl` (12px hardcoded). No mixed radii.**
- **Background:** Calm Paper at rest. Soft Bloom for "secondary surface" cards inside a Soft-Bloom section (so the card is one tonal step lighter, not darker).
- **Shadow Strategy:** `lift-1` at rest, `lift-2` on hover for *clickable* cards. Static cards stay flat.
- **Border:** 1px Hush Line. Always.
- **Internal Padding:** 24px (`spacing.lg`) default. 32px on the CTA panel. Never less than 16px.

### Inputs

- **Style:** 1px Hush Line border, Calm Paper background, 10px radius, 12px / 14px padding, 44px height. Slate Plum text, Quiet Plum placeholder.
- **Focus:** Hyacinth 1px border + 3px Soft Violet ring outside. No glow inside the field.
- **Error:** Madder 1px border + 3px Madder-at-30%-opacity ring. Helper text below in Madder.
- **Disabled:** Hush Line background, Quiet Plum text, no border change.

### Navigation

- **Style:** Sticky header on Calm Paper with `lift-1` only after scroll. Top-level links: 15px label-style, Slate Plum at rest, Iris Ink at hover/active. Underline is a 1px Hyacinth bar appearing under the active item, **not** a background pill.
- **Mobile:** Full-screen overlay, Calm Paper background, 18px Title-weight links, generous 16px vertical rhythm. Close button top-right at icon size.

### Collapsible / Accordion (the existing `CollapsibleBlock`)

- **Container:** Card-shape (14px radius, 1px Hush Line, Calm Paper). One per item with 12px gap between items.
- **Trigger row:** 20px / 24px padding, Title-weight label, chevron right at 16px in Quiet Plum, rotating 90° to open.
- **Open state:** No border-color change, no background change. The chevron rotation and the content reveal are the entire affordance. The previous "card with shadow + chevron + state-color shift" was three signals for one event.
- **Content area:** 24px padding, Body type, max-width 65ch.

### Call-To-Action Panel (the existing `CallToActionBlock`)

- **Container:** 20px radius (`rounded.xl`), Soft Bloom background, **no border**, **no shadow**. The tonal lift off Calm Paper is the entire elevation.
- **Padding:** 32px on mobile, 48px on desktop.
- **Layout:** Two-column on desktop (text left, action right) with a 32px gap; stack on mobile, action below text. **Not** centered + stacked + everything competing for attention.
- **Heading:** Headline scale, Slate Plum, max 36ch.
- **Action:** A single Primary button. If a secondary action is needed, it's a Ghost button to the right with 16px gap. **Two primary buttons side by side is forbidden.**

### Content Block Columns (the existing `ContentBlock`)

- **No background:** transparent, no padding (the grid gap handles rhythm). This is the existing default; do not change.
- **With background image:** 14px radius (`rounded.lg`), `relative isolate overflow-hidden`, 24px / 32px padding, image at `-z-10 object-cover`. Text gets a subtle gradient scrim if contrast falls below WCAG AA.
- **Link position:** the `linkPosition` field maps to flex justification — this is correct, leave it alone.

## 6. Do's and Don'ts

### Do:

- **Do** use **Iris Ink** (`#3c2865`) for the primary action and brand voice, **Hyacinth** (`#5a3f8e`) for hover and secondary emphasis.
- **Do** use **Soft Bloom** (`#f3eff6`) for raised surfaces (cards, CTA panel, accordion bodies). Tonal layering, not shadow stacks.
- **Do** apply the rounding scale **consistently**: `rounded.sm` (6px) for chips, `rounded.md` (10px) for buttons + inputs, `rounded.lg` (14px) for cards + accordions + backgrounded columns, `rounded.xl` (20px) for the CTA panel. One scale, every component.
- **Do** anchor focus state on the **Soft Violet ring outside the element**, not on a border-color flash inside it.
- **Do** use weight (400 / 500 / 600) and scale to build hierarchy. Color is a last resort.
- **Do** cap body measure at 65–75ch.
- **Do** tint every neutral toward the brand hue (chroma 0.005–0.01). No `#fff`. No `#000`.

### Don't:

- **Don't** use **Soft Violet** (`#b9aacd`) as a background fill or as a default border. That single misuse — surviving from the previous system as `--muted` and `--border` — is the largest reason the site reads candy-flat. Soft Violet is an accent, not a surface.
- **Don't** put a shadow on a button. **Don't** put a shadow on an input. **Don't** stack a shadow with a border with a gradient.
- **Don't** use `rounded` (4px Tailwind default), `rounded-xl` (12px), or any radius that isn't in the scale. The audit test: if a screenshot of three components side-by-side shows three different corner curves, the screen has failed.
- **Don't** color a heading Iris Ink for "emphasis." Use weight.
- **Don't** use `bg-muted` as it's currently configured (the candy lavender). Either retire the token, or rebind it to **Soft Bloom**. The current value is not used anywhere it shouldn't be retired from.
- **Don't** wrap the CTA in a card with a border, a shadow, AND a background tint. Pick one — and the answer is "background tint, no border, no shadow."
- **Don't** write `border-left: 4px solid var(--primary)` as a callout accent. Side-stripe borders are forbidden across the system.
- **Don't** introduce gradient text, glassmorphism panels, or "neon glow" hover states. None of those are the practice we're representing.
- **Don't** animate `width` / `height` / margin / padding. Animate `opacity` and `transform` only, with ease-out-quart at 200–300ms.
- **Don't** ship a section in pure `#fff` against the rest of the page. Calm Paper is the floor.
