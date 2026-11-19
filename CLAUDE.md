# Marea (Batemans Bay): Project Rules for Claude Code

This file is loaded every session. It is the contract for how this site is built. Read `DESIGN-SYSTEM.md` (the client's design systems, translated to tokens) and `ROADMAP.md` (current build plan and progress) before making changes.

## Stack

- **Framework:** Astro (TypeScript, strict). React is used only for islands that genuinely need it. No React islands are used.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. All design tokens live in one `@theme` block in `src/styles/global.css`.
- **Animation:** GSAP (+ ScrollTrigger, SplitText as needed), Lenis for smooth scroll, CSS transitions for simple hovers. Astro `<ClientRouter />` for page transitions. Three.js only if the brief requires it, lazy-loaded.
- **CMS:** None (Sanity, or none: content lives in `src/content/`).
- **Forms/email:** Astro endpoint or Action, Zod validation, Cloudflare Turnstile + honeypot, Resend for sending. No newsletter.
- **Hosting:** Cloudflare, Git-connected deploys. Preview per branch, production on merge to `main`.
- **Package manager:** pnpm. Node version pinned in `.nvmrc`.

## Commands

```bash
pnpm dev               # local dev server
pnpm build             # production build (must pass before any PR)
pnpm check             # astro check + tsc
pnpm lint              # eslint/biome
pnpm check:tokens      # design-token audit (must pass, see below)
pnpm check:breakpoints # Playwright overflow + screenshot sweep (needs dev/preview server running)
```

## The golden rule: the design system is the source of truth

The client's spacing, layout, typography, colour and motion systems are in `DESIGN-SYSTEM.md` and encoded in `@theme`. Never invent values. If a design needs something the system does not contain, **stop and ask** rather than adding a one-off. If the system is genuinely missing something, add a named token to `@theme` and `DESIGN-SYSTEM.md` together, after confirming with the user.

### Hard rules

1. **No hardcoded values.** No hex/rgb/hsl colours, no raw `px`/`rem` spacing, font sizes, radii, shadows, durations or easings in components, pages or scoped styles. Use token-backed Tailwind utilities (`bg-surface`, `p-section`, `text-h2`) or `var(--token)`.
2. **No arbitrary Tailwind values** (`w-[437px]`, `text-[#333]`, `mt-[13px]`). If you reach for one, a token or a layout primitive is missing.
3. **No inline `style=""`** except to pass a CSS custom property (`style={{ '--delay': '2' }}`) or genuinely dynamic data.
4. **No `!important`.**
5. **Layout goes through primitives.** Pages compose `Container`, `Section`, `Grid`, `Stack`, never ad hoc widths, margins or breakpoints.
6. **Reuse before create.** Search `src/components/` before writing markup. Section-level patterns that appear twice become components. Pages contain composition and content only, with no bespoke styling.
7. **Content is data, not markup.** Copy, links and images come in via props or the CMS/content collections, never baked into component internals.
8. `pnpm check:tokens` must pass before declaring any task done.

## Project structure

```
src/
  styles/
    global.css          # @import tailwindcss; @theme tokens; base layer; font-face; utilities
  components/
    primitives/         # Container, Section, Grid, Stack, Heading, Text, Button, Link, Icon, Image, Placeholder
    ui/                 # Accordion, Dialog, Nav, MobileMenu, Form fields, Card, Tag...
    sections/           # Hero, FeatureGrid, ProjectGallery, Testimonials, CTA, Footer...
    motion/             # Reveal, SplitText wrapper, Marquee, Parallax (GSAP/CSS)
  layouts/              # BaseLayout (head, fonts, ClientRouter, Lenis init), PageLayout
  pages/                # Routes. Composition only
    api/ or actions/    # Form handling (server-rendered)
  lib/                  # gsap.ts (plugin registration), lenis.ts, env.ts, schemas (Zod), sanity.ts
  content/              # Content collections (if no CMS)
  assets/               # Optimised local images, fonts
public/                 # Static files that must keep their URL
scripts/                # check-tokens.mjs, check-breakpoints.mjs
DESIGN-SYSTEM.md        # Source of truth, translated from client's systems
ROADMAP.md              # Plan, status, decisions log
PLACEHOLDERS.md         # Every placeholder image/asset awaiting replacement
```

## Layout and spacing

- All widths come from `Container` (max-width + fluid gutters from tokens). Grids come from `Grid` (columns and gap from tokens).
- Vertical rhythm comes from `Section` and `Stack` using the spacing scale. Do not add stray margins to children.
- Mobile-first. Breakpoints are defined once in `@theme` (`--breakpoint-*`) and match `DESIGN-SYSTEM.md`.
- Use `dvh`/`svh`, never `vh`, for full-height sections.
- Never rely on fixed heights for text containers. Test with long and short copy.

## Typography

- Fonts are self-hosted WOFF2 in `src/assets/fonts/` (or `public/fonts/`), declared once in `global.css` (or Astro's Fonts API if available in the installed version) with `font-display: swap` and a metric-matched fallback stack to prevent layout shift.
- Preload only the critical weights used above the fold.
- Type styles are semantic tokens (`text-display`, `text-h1`...`text-body`, `text-caption`), fluid with `clamp()` where the system specifies. Use the `Heading` and `Text` primitives so the HTML level and visual style can differ without ad hoc classes.

## Colour

- Colour tokens are semantic where possible (`surface`, `ink`, `accent`, `border`) on top of the raw brand palette. Defaults in Tailwind's palette are reset in `@theme` so only brand colours exist.
- Check contrast for every text/background pairing in the system (WCAG AA minimum). Flag failures to the user rather than silently altering colours.

## Animation and motion

- Animate **only `transform` and `opacity`** (plus `clip-path` where the design needs it). Never animate layout properties (`width`, `height`, `top`, `margin`).
- Durations and easings are tokens (`--duration-*`, `--ease-*`). Subtle by default.
- GSAP plugins are registered once in `src/lib/gsap.ts`. Use `gsap.matchMedia()` so animations are scoped per breakpoint and `prefers-reduced-motion` is respected, with reduced-motion users getting content immediately, no motion.
- Lenis is initialised once in `BaseLayout`, **disabled on touch devices** (native momentum scrolling is smoother there), and correctly destroyed/re-created across `ClientRouter` navigations (`astro:before-swap` / `astro:page-load`).
- Every ScrollTrigger and tween created in a component must be cleaned up on page swap.
- Content must be visible and usable with JavaScript disabled or slow. Reveal animations start from a state that does not hide content permanently if JS fails.
- Prefer CSS (transitions, `@starting-style`, scroll-driven animations where supported with a fallback) for simple effects. Reach for GSAP when choreography needs it.
- `will-change` sparingly, and only during the animation.

## Images, video and assets

- Use the `Image` primitive (wraps `astro:assets`) for all images: width/height or aspect ratio always set, `loading="lazy"` below the fold, `fetchpriority="high"` only for the LCP image, responsive `sizes`.
- **Placeholders:** until real assets arrive, use the `Placeholder` component with the intended aspect ratio and a label. Every placeholder is logged in `PLACEHOLDERS.md` (location, intended content, aspect ratio, where used). When replaced, remove the entry.
- Video: compressed MP4/WebM, `playsinline muted loop` for background video, poster image, lazy-loaded, and no autoplay for `prefers-reduced-motion` users. Large video goes in R2 (or Cloudflare Stream), not in the repo.
- Logos and icons are SVG, inlined or via the `Icon` primitive.

## Forms and email

- Client side: progressive enhancement. The form must work as a plain POST and be enhanced with JS.
- Server side: Zod validation, Turnstile verification, honeypot field, basic rate limiting, then send via Resend. Return typed success/error states. Never leak provider errors to the client.
- Secrets live in environment variables (`.env` locally, Cloudflare dashboard in production). **Never commit secrets.** `.env.example` lists every variable with a description. Read env through `src/lib/env.ts` (validated at startup).
- Every form has: visible labels, error messages tied to fields (`aria-describedby`), a success state, a loading state, and a failure fallback (a mailto or message).

## CMS

No CMS. Copy lives in `src/data/*.ts` (verbatim from Figma). Images resolve by key from `src/assets/images/` via `src/lib/media.ts`; missing files render as placeholders (see `PLACEHOLDERS.md`).

## Accessibility and SEO baseline

- Semantic HTML, one `h1` per page, logical heading order, landmarks, skip link, visible focus states from tokens.
- Interactive components use accessible primitives (Radix/headless patterns, or native `<dialog>`/`<details>` where sufficient). Keyboard operable.
- Per-page `<title>`, meta description, canonical, Open Graph and Twitter images, `sitemap.xml`, `robots.txt`.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` where the design system defines it.

## Performance budget

- Target Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- LCP < 2.5s, CLS < 0.05, INP < 200ms on a mid-range Android profile.
- Default to zero client JS. Add `client:*` directives only when interaction demands it, preferring `client:visible` or `client:idle`.
- Third-party scripts are loaded deferred, and analytics should be privacy-friendly and light (GA4 via `PUBLIC_GA_ID`, `generate_lead` event on brochure success).

## Git and deploy

- Branch per task (`feat/…`, `fix/…`). Small, descriptive commits. Never commit directly to `main`.
- Cloudflare builds every branch to a preview URL. Merging to `main` is the production deploy, and the user controls that merge.
- Do not run production deploy commands or use credentials with production write access unless the user explicitly asks in that session.
- Before opening a PR: `pnpm build`, `pnpm check`, `pnpm lint`, `pnpm check:tokens` all pass.

## Definition of done (every task)

- [ ] Uses only existing tokens and primitives (or added tokens with user approval)
- [ ] `pnpm check:tokens` passes
- [ ] Checked at 320, 375, 768, 1024, 1440, 1920 with no horizontal overflow and no broken layout
- [ ] Keyboard and reduced-motion behaviour verified
- [ ] No console errors, no layout shift on load
- [ ] Placeholders logged in `PLACEHOLDERS.md`
- [ ] `ROADMAP.md` updated

## When unsure

Ask. A short question is cheaper than rebuilding a section that drifted from the system.
