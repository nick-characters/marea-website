# Design system: Marea (Batemans Bay)

Source of truth: Figma file `Marea_Design` (key `38zbJ7RfB8G1I8b8fw6T7q`), page "Website Design" (node 184:2), style frame "Components" (184:4) and Figma variables. Desktop frames only (1440 wide). Tablet and mobile are adapted by us (approved 19 Nov). Anything the design leaves unspecified falls back to Tailwind defaults (approved 19 Nov).

## Gaps, ambiguities, contradictions (resolve before build)

| # | Issue | Proposed resolution |
|---|---|---|
| G1 | **Pill button text colour differs.** It is neutrals/900 in the style frame and the hero, and burgundy/400 in the split sections. | One `Button` primary variant with burgundy text (8.2:1 on powder). It reads as the same dark tone, and the brand colour is the stronger choice. |
| G2 | **Form submit button is a different style.** "Request Brochure" uses PP Hatton 15px, 100px corner radius and a full-width burgundy fill. It is not in the style frame. | Add it as a `Button` `submit` variant, exactly as drawn. |
| G3 | **The inner-page hero title (120px) is not in the type scale.** The largest defined style is Title at 64px. | Add a `display` step (120px desktop), with a fluid clamp down to mobile. |
| G4 | **The nav differs by page.** On Home it's right-aligned with no logo, because the big MAREA wordmark sits in the hero. Inner pages put the links on the left and the logo on the right, over the hero image. On Team it sits on sand. | `Nav` with a `layout` prop (`home` / `default`) and a `tone` prop (`light` on burgundy, `dark` on light imagery or sand). |
| G5 | **Small legal text.** The footer disclaimer is 8px and the form consent text is 10px. The consent text (neutrals/600 on powder) is **3.71:1**, which fails WCAG AA. | Raise the footer disclaimer to 10px minimum and darken the consent text to neutrals/800 (8.1:1). Needs your OK, because it changes the design. |
| G6 | **The "characters" credit link** (eucalyptus on burgundy, 12px) is **4.36:1**, just under AA. | Keep the colour, but make the link underlined and treat it as decorative/secondary. Or switch to powder blue (8.2:1). Your call. |
| G7 | **Form placeholder text** (neutrals/500 on powder/200) is 3.23:1. | That's acceptable for placeholder text, because labels are always visible. No change. |
| G8 | **The consent text links to a Privacy Policy** (`mareabatemansbay.com.au/privacy`), but there's no privacy page in the design. | Build a simple `/privacy` page from the existing type styles. You supply the copy, or I write a placeholder. |
| G9 | **No 404, thank-you or mobile-menu designs.** | 404 page uses the inner-page hero style. Form success shows inline (no separate page). Mobile menu is a full-screen burgundy overlay using the nav label style. |
| G10 | **PP Hatton Light and Bold were supplied, but only Medium is used** in the design. | Ship Medium only (preloaded). Keep Light and Bold in the repo but don't load them unless they're needed. |
| G11 | **Font licence.** The WOFF2 files contain no licence string. | Please confirm the Pangram Pangram licence covers web use for this domain. |
| G12 | **Home's second section** (aerial photo with an "M" pin overlay) and the Location aerial both show a map pin over the photo. | Build it as an `ImageBand` with an optional pin overlay (pin SVG from the supplied assets). |

## Colour

Full palette from `Marea_Palette.json` (20 Nov). Burgundy is the brand primary; powder blue, moss and eucalyptus are secondary; neutrals for surfaces and text.

| Scale | 100 | 200 | 300 | 400 | 500 | 600 | 700 |
|---|---|---|---|---|---|---|---|
| burgundy | `#ecd0cd` | `#c08d84` | `#8a4e3f` | **`#481f15`** | `#39140f` | `#290b0b` | `#180507` |
| eucalyptus | `#e2e2cb` | `#b9b998` | **`#919169`** | `#6a6a4a` | `#46462f` | | |
| moss | `#a29d8a` | `#7a7459` | **`#544c2b`** | `#3b341a` | `#231e0b` | | |
| powder | `#f2fbff` | `#cfe2ec` | **`#b1c9d5`** | `#8c9fa9` | `#69777f` | | |

Neutrals: 50 `#f7f3ea`, **100 `#e5ddca`**, 200 `#cfc9b8`, 300 `#b6afa1`, 400 `#9b9489`, 500 `#7f7970`, 600 `#645e58`, 700 `#494440`, 800 `#2f2b28`, 900 `#181513`. (Bold = supplied base.)

### Interactive states
Hover = one palette step lighter; press (`:active`) = one step darker.
| Button | Rest | Hover | Press | Text contrast (worst case) |
|---|---|---|---|---|
| Primary | powder-300 | powder-200 | powder-400 | burgundy on powder-400 = 5.16:1 |
| Outline (border) | powder-300 | powder-200 | powder-400 | n/a |
| Submit / floating menu | burgundy-400 | burgundy-300 | burgundy-500 | sand on burgundy-300 = 4.79:1 |

### Base tokens used in the design (Figma variables)

| Token | Hex | Figma variable | Use |
|---|---|---|---|
| burgundy-400 | `#481f15` | color/burgundy/400 Base | Primary brand, hero and footer backgrounds, heading text |
| moss-300 | `#544c2b` | color/moss-green/300 Base | Statement band, POI number badges |
| eucalyptus-300 | `#919169` | color/eucalyptus/300 Base | Map land tint, credit link |
| powder-300 | `#b1c9d5` | color/powder-blue/300 Base | Buttons, form section background, text on burgundy |
| powder-200 | `#cfe2ec` | color/powder-blue/200 | Form inputs |
| neutral-50 | `#f7f3ea` | color/neutrals/50 | POI list background, text on moss |
| neutral-100 | `#e5ddca` | color/neutrals/100 Base | Default page "sand" background |
| neutral-300 | `#b6afa1` | color/neutrals/300 | Dividers, footer labels |
| neutral-500 | `#7f7970` | color/neutrals/500 | Placeholders |
| neutral-600 | `#645e58` | color/neutrals/600 | Fine print |
| neutral-800 | `#2f2b28` | color/neutrals/800 | Form labels and intro |
| neutral-900 | `#181513` | color/neutrals/900 | Body text on light backgrounds |

Section themes (semantic): `sand` (neutral-100 bg, burgundy headings), `burgundy` (bg burgundy, text sand/powder), `moss` (bg moss, text neutral-50), `powder` (bg powder-300, burgundy headings, neutral-800 text), `cream` (neutral-50 bg, neutral-900 text).

### Contrast (WCAG 2.2)
| Pair | Ratio | Result |
|---|---|---|
| Burgundy on sand / sand on burgundy | 10.47 | AAA |
| Powder on burgundy | 8.22 | AAA |
| Neutral-300 on burgundy | 6.50 | AA |
| Neutral-50 on moss | 7.75 | AAA |
| Neutral-800 on powder | 8.14 | AAA |
| Burgundy on powder (buttons) | 8.22 | AAA |
| Neutral-900 on cream | 16.41 | AAA |
| Eucalyptus on burgundy | 4.36 | **Fail AA (small text)**, see G6 |
| Neutral-600 on powder | 3.71 | **Fail AA**, see G5 |
| Neutral-500 on powder-200 (placeholder) | 3.23 | Placeholder only, see G7 |

## Typography

Families: **PP Hatton Medium (500)** for display and headings, always uppercase. **Poppins** for body and UI: Light 300 (footer names), Regular 400, Italic 400 (statement band), Medium 500 (Strong, buttons, links). Poppins is self-hosted from `@fontsource/poppins` (no Google Fonts request).

| Token | Figma style | Desktop | Mobile (375) | Line height | Tracking | Case |
|---|---|---|---|---|---|---|
| display | (inner hero title, G3) | 120px | 44px @320 / 48px @375 | 1.1 (was 1.4, tightened for big multi-line titles on mobile; single line on desktop is unchanged) | 0 | upper |
| title | Web/Title | 64px | 40px | 1.2 | 0 | upper |
| headline | Web/Headline | 40px | 28px | 1.4 | 0 | upper |
| subheading | Web/Subheading (Card Headline) | 24px | 20px | 1.4 | 0 | upper |
| strong | Web/Strong | 20px | 18px | 1.2 | 0 | as typed |
| body | Web/BodyPrimary | 16px | 16px | 1.5 | 0 | as typed |
| body-sm | Web/BodySecondary | 14px | 14px | 1.5 | 0 | as typed |
| label | Web/Label | 12px | 12px | 1 | 0.1em (10%) | upper |
| button | Web/ButtonText | 14px | 14px | 1 | 0.04em (4%) | upper |
| fine | consent / disclaimer | 10px | 10px | 1.4 | 0 | as typed |

Fluid maths (viewport 375 to 1440, range 1065px): `size = min + (max − min) × (100vw − 375px) / 1065`.
- display: 44→120 over 320–1440 (so 9-letter titles fit at 320) gives `clamp(2.75rem, 1.393rem + 6.786vw, 7.5rem)`
- title: 40→64 gives `clamp(2.5rem, 1.972rem + 2.254vw, 4rem)`
- headline: 28→40 gives `clamp(1.75rem, 1.486rem + 1.127vw, 2.5rem)`
- subheading: 20→24 gives `clamp(1.25rem, 1.162rem + 0.376vw, 1.5rem)`
- strong: 18→20 gives `clamp(1.125rem, 1.081rem + 0.188vw, 1.25rem)`

The Home hero MAREA wordmark is an SVG logo (576px wide on desktop), not text.

## Spacing

Tailwind's 4px base (`--spacing: 0.25rem`) is kept. Every value measured in Figma sits on it: 8, 12, 16, 20, 24, 28, 32, 40, 48, 60, 64, 80, 128, 160.

Named rhythm tokens (applied by the `Section`/`Container` primitives, never by pages):
| Token | Desktop | Mobile | Source |
|---|---|---|---|
| gutter | 80px | 20px | 80px side padding on every frame |
| section-band | 160px | 80px | Statement band, amenity icon row (py-160) |
| section-split | 80px | 48px | Split block image padding (py-80) |
| section-form | 80px | 48px | Brochure section (p-80) |
| stack-lg | 40px | 32px | Heading → body → button gap in splits |
| stack-md | 24px | 24px | Icon → label, footer columns |
| stack-sm | 8px | 8px | Label → input |
| field-gap | 20px | 20px | Between form fields |

## Layout

- Breakpoints: Tailwind defaults `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Desktop design applies from `lg`.
- Container: full-bleed frames, with content inset by the gutter. Max content width 1280 (1440 − 2×80). Above 1440 the content stays centred at 1280 and background colours/images stay full-bleed.
- Split block: 2 equal columns from `lg`. Text column `px-80 py-60`, body max width 400px. Image column is a square image (560/560), padded `py-80`, with 40px on the outer edge. Image side alternates. Below `lg` it stacks with the image first, and the text keeps its order.
- Narrow column: 480px (brochure form, statement copy).
- Full-bleed image bands: 1440×1024 ratio at every width, capped at 80svh (`--band-max-height`) so wide screens keep a sensible crop and phones see the whole landscape image (client direction 20 Nov).
- Amenity icon row: 6 columns on desktop, 3 on tablet, 2 on mobile.
- POI list: 3 columns from `lg`, 1 column below.
- Footer: 4 columns from `lg`, 2 on tablet, 1 on mobile.
- Team: 1/3 + 2/3 split (373 / 827) from `lg`.

## Shape and depth

- `radius-leaf`: 32px on the top-left and bottom-right corners only (pill buttons).
- `radius-leaf-lg`: 100px on the top-left and bottom-right (submit button).
- `radius-full`: POI badges (24px circles).
- Home hero image: an arched, rounded portrait frame (358×652) with a burgundy keyline. Built as a masked image with an SVG/CSS arch mask.
- Dividers: 2px neutral-300 (style frame). Footer rule: 1px neutral-100.
- Form inputs: no border, filled powder-200, height 40px, padding 12px. The style frame shows an outlined 1px powder variant (used for focus state).
- No shadows anywhere in the design. The shadow namespace is reset to none.

## Motion (expressive, approved 19 Nov)

Principles: slow, tidal, editorial. Transform, opacity and clip-path only. Everything is reduced-motion aware: reveals become instant and parallax and pinning are off.

| Token | Value | Use |
|---|---|---|
| duration-fast | 200ms | Hovers, focus |
| duration-base | 600ms | Text reveals |
| duration-slow | 1200ms | Image mask wipes, hero |
| duration-tide | 1800ms | Hero intro sequence |
| ease-tide | `cubic-bezier(0.65, 0, 0.35, 1)` | Mask wipes, page transitions |
| ease-out-expo | `cubic-bezier(0.16, 1, 0.3, 1)` | Text and line reveals |

Planned signature moments:
1. **Home hero intro:** the MAREA wordmark draws or wipes in, then the arched image rises with an inner scale-down, then the nav and footer meta lines fade in.
2. **Inner hero:** the giant title reveals letter by letter (masked lines rising), and the background image slowly scales and parallaxes.
3. **Split blocks:** the image reveals with a clip-path wipe from the leaf-corner direction. The heading reveals line by line, then the body and button.
4. **Full-bleed bands:** pinned scroll with the image scaling from inset (framed) to full-bleed. This is the main "storytelling" beat.
5. **Statement band:** words fade from 20% to 100% opacity as you scroll.
6. **Amenity icons:** staggered rise. Icon strokes draw in, if the supplied SVGs are stroke-based.
7. **Location map:** POI pins pop in sequence. Hovering a list item highlights its pin, and the reverse.
8. **Page transitions:** a burgundy panel wipe using the leaf-shape corner (Astro ClientRouter + GSAP).
9. **Smooth scrolling:** Lenis on desktop only, off on touch.

## Components (from the style frame)

- **Button primary:** powder-300 fill, burgundy text, button type style, padding 12/24, leaf radius.
- **Button outline:** 1px powder-300 border, transparent fill, same text style.
- **Button submit (G2):** burgundy fill, sand text in PP Hatton 15px uppercase, full width, height 52, leaf radius large.
- **Link:** button type style. Underline on hover/focus (not drawn in the design; Tailwind default treatment).
- **Input/Select:** label in the label style (neutral-800) with an 8px gap above the field. Field is powder-200, 40px tall, body-sm, neutral-500 placeholder. Select uses a 12×6 chevron. Focus: 1px powder-300/burgundy outline (from the style frame outline variant). Error: message in body-sm burgundy below the field.
- **POI item:** a 24px moss circle with the number (label style, neutral-50), 20px gap, then the name in body-sm neutral-900.
- **Agent card:** square photo (placeholder), name in strong style, phone in body.

## Deliberate deviations
| Date | Deviation | Reason |
|---|---|---|
| 19 Nov | Footer disclaimer 8px → 10px (`text-fine`) | Legibility (G5) |
| 19 Nov | Form consent text neutral-600 → neutral-800 | WCAG AA contrast (G5) |
| 19 Nov | All pill-button text burgundy | Consistency (G1) |
| 19 Nov | Display line-height 1.4 → 1.1 | Multi-line titles on mobile |
| 19 Nov | Floating menu button after the hero | Navigation access on long pages (not in design) |
