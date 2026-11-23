# Design system: Marea (Batemans Bay)

The design rules as built. Every value here is a token in `src/styles/global.css` (`@theme`) or a primitive in `src/components/primitives/`. If code and this file disagree, fix one of them so they match. Don't let them drift.

- **Source:** Figma `Marea_Design` (key `38zbJ7RfB8G1I8b8fw6T7q`), page "Website Design" (184:2), style frame "Components" (184:4), plus the Figma variables. Desktop frames are 1440 wide. Tablet and mobile were adapted by us (approved 19 Nov). Anything the design leaves out uses Tailwind defaults (approved 19 Nov).
- **Brand inputs:** `Marea_Palette.json` (20 Nov), PP Hatton WOFF2 files, and the logos, icons and imagery in Drive › Marea Beach Road › Website › AI Assets › Web-ready.
- **Live reference:** `/styleguide` shows every token and primitive on staging.

## Brand rules (client direction)

These apply everywhere and take priority over anything below.

1. **Burgundy is primary.** Powder blue, moss and eucalyptus are secondary. Neutrals are for surfaces and text.
2. **Button states:** hover is one palette step lighter, press is one step darker.
3. **Running text:** paragraphs are at most 400px wide with 150% line height (fine print included).
4. **Nothing feels quick or rushed.** Motion is slow and tidal, and anchor scrolling is eased over 2s.
5. **Logos are always `object-contain`.** Never crop them.
6. **Page transitions stay as signed off on 20 Nov.**
7. **Full-bleed images are no taller than 80% of the viewport.**

## Colour

### Palette

Bold marks the supplied base for each scale.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| burgundy | | `#ecd0cd` | `#c08d84` | `#8a4e3f` | **`#481f15`** | `#39140f` | `#290b0b` | `#180507` | | |
| eucalyptus | | `#e2e2cb` | `#b9b998` | **`#919169`** | `#6a6a4a` | `#46462f` | | | | |
| moss | | `#a29d8a` | `#7a7459` | **`#544c2b`** | `#3b341a` | `#231e0b` | | | | |
| powder | | `#f2fbff` | `#cfe2ec` | **`#b1c9d5`** | `#8c9fa9` | `#69777f` | | | | |
| neutral | `#f7f3ea` | **`#e5ddca`** | `#cfc9b8` | `#b6afa1` | `#9b9489` | `#7f7970` | `#645e58` | `#494440` | `#2f2b28` | `#181513` |

Tailwind's default colours are reset, so only these exist.

### Semantic roles

Components use these roles. Palette steps appear directly only for button states and a few neutrals in the footer.

| Role | Maps to | Use |
|---|---|---|
| `brand` | burgundy-400 | Headings, the default text colour, the hero, footer and menu backgrounds |
| `sand` | neutral-100 | Default page background; text on burgundy |
| `cream` | neutral-50 | Points-of-interest list background; text on moss |
| `moss` | moss-300 | Statement band, POI number badges |
| `powder` | powder-300 | Primary button, brochure section, nav and links on burgundy |
| `field` | powder-200 | Form inputs |
| `ink` | neutral-900 | Body text on light backgrounds |
| `ink-soft` | neutral-800 | Form labels, form intro, consent text |
| `muted` | neutral-500 | Placeholder text only |
| `rule` | neutral-300 | 2px dividers (also used as `neutral-300` for footer labels) |
| `accent` | eucalyptus-300 | The "Characters" credit link |

### Section themes

Set only through `Section theme=…`. Pages never set backgrounds.

| Theme | Background | Text | Used for |
|---|---|---|---|
| `sand` | sand | brand headings, `ink` body | Default: splits, the Team page, page heroes |
| `burgundy` | brand | sand, with powder for links | Home hero, amenity icons, footer |
| `moss` | moss | cream | Statement band |
| `powder` | powder | brand headings, `ink-soft` / `ink` body | Brochure section |
| `cream` | cream | ink | Points-of-interest list |

### Interactive states

| Element | Rest | Hover | Press |
|---|---|---|---|
| Primary button (and the menu's Download Brochure) | powder-300 | powder-200 | powder-400 |
| Outline button (border) | powder-300 | powder-200 | powder-400 |
| Submit button, floating Menu button | burgundy-400 | burgundy-300 | burgundy-500 |
| Inputs and selects | outline transparent | | `brand` outline on focus or when invalid |
| Links | | underline toggles (`inline`, `plain`) or a growing underline (`nav`) | |
| Focus (global) | | | 2px `currentColor` outline, 3px offset |

### Contrast (WCAG 2.2, checked 23 Nov)

| Pair | Ratio | Result |
|---|---|---|
| ink on cream / field / sand / powder | 16.41 / 13.62 / 13.44 / 10.55 | AAA |
| brand on cream / sand / powder | 12.79 / 10.47 / 8.22 | AAA |
| sand on brand | 10.47 | AAA |
| powder on brand | 8.22 | AAA |
| ink-soft on powder (labels, consent) | 8.14 | AAA |
| cream on moss | 7.75 | AAA |
| neutral-300 on brand (footer labels) | 6.50 | AA |
| brand on powder-400 (primary, pressed) | 5.16 | AA |
| sand on burgundy-300 (submit, hover) | 4.79 | AA |
| accent on brand (credit link) | 4.36 | Below AA. Accepted as decorative: underlined, and it turns powder on hover (G6) |
| muted on field (placeholders) | 3.23 | Placeholder text only; every field has a visible label (G7) |

## Typography

### Families

- **PP Hatton Medium (500):** display and headings, always uppercase. Self-hosted WOFF2 from `src/assets/fonts`. Light and Bold are in the repo but not loaded. The Pangram Pangram web licence was confirmed 19 Nov.
- **Poppins:** body and UI. Self-hosted via Fontsource (no Google Fonts request). Weights:
  - Light 300: footer names
  - Regular 400: body
  - Italic 400: the statement band lead
  - Medium 500: `strong` and button text
- **Fallbacks:** both families have metric-adjusted fallback faces (Georgia, Arial) to limit layout shift.

### Scale

Use the `Heading` and `Text` primitives, so the HTML level and the visual size can differ.

| Token | Figma style | Desktop | Mobile | Line height | Tracking | Case | Family |
|---|---|---|---|---|---|---|---|
| `display` | inner hero title (G3) | 120px | 44px @320 | 1.1 | 0 | upper | Hatton |
| `title` | Web/Title | 64px | 40px | 1.2 | 0 | upper | Hatton (also menu links) |
| `headline` | Web/Headline | 40px | 28px | 1.4 | 0 | upper | Hatton, balanced wrap |
| `subheading` | Web/Subheading | 24px | 20px | 1.4 | 0 | upper | Hatton |
| `statement` | statement band | 24px | 20px | 1.5 | 0 | upper | Hatton, balanced wrap |
| `strong` | Web/Strong | 20px | 18px | 1.2 | 0 | as typed | Poppins 500 |
| `body` | Web/BodyPrimary | 16px | 16px | 1.5 | 0 | as typed | Poppins |
| `body-sm` | Web/BodySecondary | 14px | 14px | 1.5 | 0 | as typed | Poppins |
| `label` | Web/Label | 12px | 12px | 1 | 0.1em | upper | Poppins |
| `button` | Web/ButtonText | 14px | 14px | 1 | 0.04em | upper | Poppins 500 |
| `submit` | form button (G2) | 15px | 15px | 1 | 0 | upper | Hatton |
| `fine` | consent, disclaimer | 10px | 10px | 1.5 | 0 | as typed | Poppins |

### Fluid sizes

Sizes scale linearly between 375 and 1440 wide: `size = min + (max − min) × (100vw − 375px) / 1065`. `display` runs from 320, so nine-letter titles fit on the smallest phones.

| Token | Clamp |
|---|---|
| `display` | `clamp(2.75rem, 1.393rem + 6.786vw, 7.5rem)` |
| `title` | `clamp(2.5rem, 1.972rem + 2.254vw, 4rem)` |
| `headline` | `clamp(1.75rem, 1.486rem + 1.127vw, 2.5rem)` |
| `subheading`, `statement` | `clamp(1.25rem, 1.162rem + 0.376vw, 1.5rem)` |
| `strong` | `clamp(1.125rem, 1.081rem + 0.188vw, 1.25rem)` |

### Rules

- `Text` sizes `body`, `body-sm` and `fine` carry `max-w-measure` (400px) automatically. That is brand rule 3, so don't override it.
- Labels (`Text size="label"`) introduce a block: a section eyebrow, a column role, a footer heading or a form label.
- The Home hero "MAREA / BATEMANS BAY" lockup and the nav wordmark are logos, not text (see Logos).

## Spacing

Tailwind's 4px base (`--spacing: 0.25rem`) is kept, and every measured Figma value sits on it.

### Named rhythm tokens

Fluid from 375 to 1440. Applied by primitives and section components, never by pages.

| Token | Mobile → desktop | Applied by |
|---|---|---|
| `gutter` | 20 → 80px | `Container` (side padding); split columns |
| `band` | 80 → 160px | `Section space="band"`: statement band, amenity icons |
| `split` | 48 → 80px | `Section space="split"`, split text padding, section bottoms on mobile |
| `stack-lg` | 32 → 40px | Heading → body → button in `SplitFeature`; `Stack gap="lg"` |
| `hero-gap` | 48 → 128px | Home hero: nav → lockup → meta row |

### Numeric scale conventions

Use these so new sections match existing ones.

| Gap | Value | Use |
|---|---|---|
| `gap-2` | 8px | Label → field |
| `gap-4` | 16px | Paragraph → paragraph; label → logo (footer) |
| `gap-5` | 20px | Between form fields; agent photo → name; POI badge → name |
| `gap-6` | 24px | Icon → label; footer contact groups |
| `gap-10` | 40px | Within a column: label → logo → body (Team), heading → intro (brochure) |
| `gap-12` | 48px | Column gap when stacked on mobile and tablet |
| `gap-15` | 60px | Block → block in a column; nav → hero content (Team); footer columns |
| `gap-20` | 80px | Column gap on desktop for 3-column content (Team, brochure with agents) |

Desktop section padding on sand, powder and cream sections is `py-20` (80px), stepping down to `split` on mobile. The footer and the POI list use `py-15`.

## Layout

### Breakpoints

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. The desktop design applies from `lg`. QA widths are 320, 375, 768, 1024, 1440 and 1920.

### Widths

| Token | Value | Use |
|---|---|---|
| `max-w-frame` | 1440 | Caps full-bleed splits on very wide screens |
| `max-w-content` | 1280 | `Container` default (1440 − 2 × 80 gutter) |
| `max-w-narrow` | 480 | Brochure form, statement band |
| `max-w-measure` | 400 | All running text |
| `max-w-agent` | 240 | Agent cards |
| `max-w-wordmark` | 576 | Home hero lockup |
| `w-logo-sm` | 129 | Nav and menu wordmark (112px below `lg`) |

Above 1440 the content stays centred, and backgrounds and imagery stay full-bleed.

### Aspect ratios

| Token | Ratio | Use |
|---|---|---|
| `aspect-band` | 1440 / 1024 | Full-bleed image bands at every width, capped by `band-cap` (80svh) |
| `aspect-arch` | 358 / 652 | Home hero arch image |
| `aspect-map` | 1440 / 788 | Illustrated location map |
| `aspect-square` | 1 / 1 | Split images, the Team project image, agent photos |

### Section patterns

- **Home hero:**
  - burgundy, at least the full viewport height (`min-h-svh`);
  - lockup and button on the left, arch image on the right;
  - below `lg` it stacks with the arch image first;
  - the meta row stacks and centres on mobile.
- **Page hero:**
  - full-viewport image with the nav at the top and the `display` title at the bottom;
  - `tone` sets a sand title (dark imagery) or a burgundy title (light imagery);
  - the nav is burgundy on both.
- **Split feature:**
  - two equal columns from `lg`, with the image side alternating (`imageSide`);
  - text column `px-20 py-15`, image column `py-20` with 40px on the outer edge;
  - below `lg` the image comes first.
- **Image band:** `aspect-band` + `band-cap`, full-bleed. Bands with `zoom` pin and open from an inset frame on desktop; the rest parallax.
- **Statement band:** moss, `narrow` container, centred.
- **Amenity icons:** burgundy, 6 columns on desktop, 3 on `sm`, 2 on mobile.
- **Location:** full-width map, then the POI list on cream (3 columns on `lg`, 2 on `md`, 1 on mobile).
- **Team page:** all on sand, top to bottom:
  1. **Developer intro (hero):** nav, then a 1/3 + 2/3 grid. The left column has the label, the Place Co logo and the body; the right has a square image.
  2. **Consultants:** a 2px `rule` divider, then three columns (2 on `md`, 1 on mobile). Each column is role label → logo → body, with `gap-10` inside and `gap-20` between columns, matching the developer intro.
  3. **Brochure `withAgents`:** the Sales Agent column (1/3) beside the form (2/3).
- **Brochure section:** powder. The `centred` layout is a single narrow column; the `withAgents` layout is used on Team.
- **Footer:**
  - burgundy; 4 columns on `lg`, 2 on `sm`, 1 on mobile;
  - a sand hairline, then the disclaimer, the Privacy Policy link and the credit.

## Shape and depth

- `rounded-tl-leaf rounded-br-leaf` (32px): pill buttons, the floating Menu button and the skip link. Always use the corner-specific utilities. `rounded-leaf` on its own rounds every corner.
- `rounded-tl-leaf-lg rounded-br-leaf-lg` (100px): the submit button. The page-transition wipe also uses this curve.
- `rounded-full`: POI badges (24px), icon placeholders.
- **Home hero arch:** the frame is part of the supplied artwork. There's no coded mask, border or rounding.
- **Dividers:** `rule` (2px, `bg-rule`) between sections on the same background. `hairline` (1px, sand) in the footer.
- **Form inputs:** no border, `field` fill, 40px tall, 12px horizontal padding, with a 1px `brand` outline on focus.
- **No shadows.** The shadow namespaces are reset.

## Imagery and logos

### Images

- Always use the `Image` primitive. It looks up `src/assets/images/<key>.*` and outputs AVIF and WebP at 480–2560 wide. If the file is missing it shows a `Placeholder`.
- The wrapper owns the aspect ratio, and the image always fills it with `object-cover`. `media.position` sets the focal point (`top` / `center` / `bottom`); agent headshots use `top`.
- `priority` goes on the hero image only. Everything else lazy-loads.
- Shared images (one file in several places) are listed in `PLACEHOLDERS.md`.

### Logos

Use the `Logo` primitive with supplied PNGs in `src/assets/logos`, trimmed and given a small transparent margin. Logos always use `object-contain`.

| Name | `tone="dark"` (on light backgrounds) | `tone="light"` (on dark backgrounds) | Where |
|---|---|---|---|
| `marea-wordmark` | burgundy | light | Nav on inner pages, menu |
| `marea-primary` | burgundy | cream | Home hero lockup |
| `placeco` | dark | light | Team intro, footer |
| `property-collective` | (light artwork only) | light | Footer |
| `place-studio`, `steel-stone`, `space-consulting` | neutral-900 | (dark artwork only) | Team consultants |

- The consultant marks were supplied white-only, so they were recoloured to neutral-900 for the sand background.
- **Sizing:**
  - `fit="width"` (default): the caller sets the width and the height follows.
  - `fit="height"`: the logo fits a fixed-height box and aligns left. Use it to align a row of different marks.
- **Optical sizing:** in a row of mixed marks, each logo gets its own height inside a shared row height, so they look equally weighted and the content below starts on one line. Consultants use a 44px row: Place\Studio 28px, Steel & Stone 44px, Space Consulting 32px.

### Icons

- Amenity icons are supplied SVGs in `src/assets/icons`, inlined with `fill: currentColor` at 64px.
- UI icons (menu, close, chevron) come from the `Icon` primitive.

## Motion (expressive, approved 19 Nov)

The feel is slow, tidal and editorial. Only `transform`, `opacity` and `clip-path` are animated. Durations and easings are read from the CSS tokens by `src/lib/motion.ts`, so CSS and JS stay in sync. `seconds()` handles both `ms` and Tailwind's minified `s` output.

### Tokens

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 300ms | Hovers, colour changes, focus |
| `duration-base` | 600ms | Small fades, nav underline, menu items, the floating Menu button |
| `duration-slow` | 1200ms | Text and line reveals, image mask wipes, menu slide |
| `duration-tide` | 1800ms | Hero intros, image settle |
| `duration-page` | 1200ms | Page transition (signed off 20 Nov, keep) |
| `duration-scroll` | 2000ms | In-page anchor scrolling |
| `ease-tide` | `cubic-bezier(0.65, 0, 0.35, 1)` | Wipes, slides, page transition, scrolling |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, staggers, settles |

### Vocabulary

Components opt in with data attributes. Never write one-off tweens.

| Attribute | Effect |
|---|---|
| `data-reveal` (optional delay value) | Fade and rise on entering the viewport |
| `data-stagger` | Children fade and rise in sequence |
| `data-split` | Heading lines rise from a mask |
| `data-mask` | Image wipes upward (clip-path) while the inner image settles from a 1.25 scale |
| `data-parallax` + `data-parallax-target` | Image drifts while scrolling |
| `data-zoom` + `data-zoom-frame` | Desktop only: the band pins and opens from an inset frame to full-bleed |
| `data-statement` | Words brighten as you scroll |
| `data-hero="home"` / `"page"` | Hero intro timelines. Inside a hero: `data-hero-wordmark`, `data-hero-arch`, `data-hero-title`, `data-hero-bg`, `data-hero-fade` |

### Signature moments (as built)

1. **Home hero:**
   - the lockup wipes in left to right (tide);
   - the arch image rises and fades in;
   - the nav, button and meta row fade in, staggered.
2. **Page hero:** the background settles from a slight scale while the `display` title rises letter by letter. On scroll, the title and image drift.
3. **Splits:** the image mask wipes, the heading lines rise, then the body and button.
4. **Image bands:** the pinned zoom on chosen bands (desktop); parallax on the rest.
5. **Statement band:** words brighten as you scroll.
6. **Amenity icons, POI list, form fields, Team columns, footer:** staggered rise.
7. **Page transition:** View Transitions API (Astro `ClientRouter`). The old page fades to 40% and lifts 4%. The new page rises over it with a clip-path wipe whose top-left corner follows the leaf-lg curve.
8. **Menu:** the panel slides down (`duration-slow`, tide), then the items rise in sequence (400ms delay, then 80ms apart).
9. **Anchor scrolling:** every `#` link, including Download Brochure, scrolls over 2s with `ease-tide`. It uses Lenis on desktop and GSAP ScrollTo on touch.

### Behaviour rules

- Lenis runs only with a fine pointer (desktop). Touch devices keep native scrolling.
- Everything is created inside `gsap.matchMedia()` and reverted on `astro:before-swap`.
- Hidden starting states apply only under `html.js` with motion allowed, so content is never hidden if JavaScript fails.
- With `prefers-reduced-motion`, content appears immediately: no parallax, pinning or page wipe, and anchor jumps are instant.

## Components (as built)

### Primitives (`src/components/primitives`)

| Component | Props | Notes |
|---|---|---|
| `Container` | `width`: `content` / `narrow` / `full`, `innerClass` | The only place gutters are applied |
| `Section` | `theme`, `space`: `band` / `split` / `none`, `as`, `label`, `id` | The only place section backgrounds are set |
| `Stack` | `gap`: `xs` 8 / `sm` 16 / `md` 24 / `field` 20 / `lg` stack-lg / `xl` 60 | Vertical rhythm helper |
| `Heading` | `as`, `size`: `display` / `title` / `headline` / `subheading` / `statement` / `strong` | |
| `Text` | `as`, `size`: `body` / `body-sm` / `label` / `fine` / `button`, `weight` | Running sizes include the 400px measure |
| `Button` | `variant`: `primary` / `outline` / `submit`, `href` | Renders `<a>` when `href` is set |
| `Link` | `variant`: `nav` / `inline` / `plain`, `current` | External links open in a new tab with `rel="noopener"` |
| `Image` | `media` (`key`, `alt`, `label`, `position`), `sizes`, `priority` | See Images |
| `Logo` | `name`, `tone`, `width`, `fit`, `priority` | See Logos |
| `Icon` | `name` | Uses `currentColor` |
| `Placeholder` | `label`, `tone` | Fallback for missing images |

### Buttons

| Variant | Spec |
|---|---|
| `primary` | powder-300 fill, brand text, `button` type, 12 / 24px padding, leaf corners |
| `outline` | 1px powder-300 border, transparent fill, same type and shape |
| `submit` | burgundy-400 fill, sand text in Hatton `submit` type, full width, 52px tall, leaf-lg corners. Fades to 60% while sending |
| Floating Menu (in `MenuOverlay`) | burgundy-400 fill, sand `label` text, 12 / 20px padding, leaf corners, fixed top right. Appears once the hero nav leaves view |

### Sections (`src/components/sections`)

| Component | Used on |
|---|---|
| `HomeHero` | Home |
| `PageHero` (`title`, `image`, `tone`) | Residences, Amenity, Location, 404 |
| `SplitFeature` | Home, Residences, Amenity, Location |
| `ImageBand` (`zoom`) | Home, Residences, Amenity, Location |
| `StatementBand` | Home |
| `AmenityIcons` | Home |
| `LocationGuide` (map + POI list) | Location |
| `DeveloperIntro` | Team (hero) |
| `Consultants` | Team |
| `BrochureSection` (`centred` / `withAgents`) | Every page via `PageLayout` (`withAgents` on Team) |

### UI (`src/components/ui`)

- **`Nav`:**
  - `layout="home"`: links on the right and no logo, because the lockup is in the hero.
  - `layout="default"`: links on the left, wordmark on the right.
  - `tone="light"` (powder, on burgundy) or `tone="dark"` (burgundy, on sand or imagery).
  - Below `lg` the links collapse to a Menu button.
- **`MenuOverlay`:**
  - a full-screen burgundy panel: wordmark, close button, `title`-size links, a primary Download Brochure button and the address;
  - a fixed overlay with a transform slide (not `<dialog>`), so it works reliably on iOS;
  - the rest of the page is made inert, Esc closes it, focus moves in and is restored on close, and it respects the safe-area inset;
  - it persists across page transitions.
- **`Footer`:** see Section patterns.
- **`BrochureForm` + `form/Field`, `Input`, `Select`:**
  - fields are a `label` (ink-soft) above a 40px `field` control, `body-sm` ink text and `muted` placeholders;
  - selects use a chevron icon;
  - errors appear in `body-sm` brand below the field (`aria-describedby`);
  - fields are 20px apart and sit 60px above the Turnstile + submit block;
  - the consent text is `fine` ink-soft;
  - after a successful submit the form is replaced by a `subheading` + body message, which receives focus.

## Resolved gaps (from the 19 Nov audit)

| # | Issue | Resolution |
|---|---|---|
| G1 | Pill button text colour differed between frames | All pill buttons use brand (burgundy) text |
| G2 | Submit button not in the style frame | `submit` variant, as drawn |
| G3 | 120px hero title not in the type scale | `display` token added |
| G4 | Nav differs by page | `Nav` `layout` + `tone` props |
| G5 | Legal text too small / low contrast | Footer disclaimer raised from 8px to 10px; consent text darkened from neutral-600 to neutral-800 |
| G6 | Credit link 4.36:1 | Kept eucalyptus, underlined, turns powder on hover |
| G7 | Placeholder text 3.23:1 | Accepted, because labels are always visible |
| G8 | No privacy page | `/privacy` built from existing styles. Copy still needs client approval |
| G9 | No 404, thank-you or menu designs | 404 uses `PageHero`. Success shows inline (no-JS submissions get `/thank-you`). Menu as above |
| G10 | Only Hatton Medium is used | Medium only is loaded |
| G11 | Font licence | Confirmed 19 Nov |
| G12 | Map pin overlays | Pins are baked into the supplied aerial and map images, so there's no overlay component |

## Deliberate deviations from Figma

| Date | Deviation | Reason |
|---|---|---|
| 19 Nov | Footer disclaimer 8px → 10px | Legibility (G5) |
| 19 Nov | Consent text neutral-600 → neutral-800 | WCAG AA (G5) |
| 19 Nov | All pill-button text burgundy | Consistency (G1) |
| 19 Nov | Display line height 1.4 → 1.1 | Multi-line titles on mobile |
| 19 Nov | Floating Menu button after the hero | Navigation on long pages |
| 20 Nov | Hover and press states one palette step either side | Brand rule |
| 20 Nov | Running text capped at 400px, 150% line height (fine print included) | Brand rule |
| 20 Nov | Footer phone number replaced by a Privacy Policy link | Client direction |
| 20 Nov | Image bands capped at 80svh | Client direction |
| 20 Nov | Hero arch image first on mobile; no coded frame or rounding | Client direction; the frame is in the artwork |
| 20 Nov | Anchor scrolling slowed to 2s | Brand rule (nothing rushed) |
| 23 Nov | Team consultants section added (not in Figma) | Client content; built from the developer intro's pattern |

## Maintenance

- **New values:** add a value only as a named token in `@theme` and in this file together, after confirming with the client. `pnpm check:tokens` blocks hardcoded values.
- **Before adding a section:** match an existing pattern above (theme, padding, column gaps, label → content order), and reuse primitives rather than repeating their classes.
- **Unused tokens:** remove them. Tailwind only emits the variables that are used, but dead tokens make this file harder to trust.
