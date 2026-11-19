# Marea: mareabatemansbay.com.au

Marketing site for Marea, six waterfront residences at 43 Beach Road, Batemans Bay. Astro 7 + Tailwind v4 + GSAP, deployed to Cloudflare Workers. Pages are prerendered; only `/api/brochure` runs on demand.

## Run
```bash
pnpm install
cp .env.example .dev.vars   # local secrets (optional: without keys, leads are logged to the console)
pnpm dev                    # http://localhost:4321
pnpm build && pnpm preview  # production build served by workerd
```

## Checks (all must pass before merging)
```bash
pnpm check:tokens   # no hardcoded design values outside src/styles/global.css
pnpm check          # astro check (TypeScript 6)
pnpm lint           # biome
pnpm build
CHROME_PATH=/path/to/chrome pnpm check:breakpoints / /residences /amenity /location /team   # needs preview running
```

## Where things live
| What | Where |
|---|---|
| Design tokens (colour, type, spacing, motion) | `src/styles/global.css` `@theme`, documented in `DESIGN-SYSTEM.md` |
| Copy | `src/data/content.ts`, `site.ts`, `brochure.ts`, `poi.ts` |
| Images / logos / icons | Drop into `src/assets/images|logos|icons/` using the names in `PLACEHOLDERS.md` |
| Primitives | `src/components/primitives/` (Container, Section, Heading, Text, Button, Image, …) |
| Sections | `src/components/sections/` (HomeHero, PageHero, SplitFeature, ImageBand, …) |
| Motion | `src/lib/motion.ts`. Opt in with `data-reveal`, `data-split`, `data-mask`, `data-zoom`, `data-parallax`, `data-statement`, `data-stagger` |
| Form endpoint + emails | `src/pages/api/brochure.ts`, `src/lib/email.ts`, `src/lib/schema.ts` |
| Style guide | `/styleguide` (noindex). Remove before launch |

## Add a page
Create `src/pages/<name>.astro`, wrap in `PageLayout`, put a `PageHero` in the `hero` slot and compose `SplitFeature` / `ImageBand` from data in `src/data/content.ts`. Add the link to `site.nav`.

## Add a token
Add it to `@theme` in `global.css` and to `DESIGN-SYSTEM.md` together, then use the generated utility (e.g. `--color-foo` gives `bg-foo`).

## Environment
See `.env.example`. In production set these in Cloudflare → Workers → marea-website → Settings → Variables: `RESEND_API_KEY` (secret), `TURNSTILE_SECRET_KEY` (secret), `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_GA_ID`, and optionally `BROCHURE_URL`, `RESEND_FROM`, `LEAD_RECIPIENTS`. `PUBLIC_*` values are read at build time, so set them as build variables too.
