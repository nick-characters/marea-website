# Roadmap: Marea (Batemans Bay)

## Brief (from Phase 1)
- **Client / project:** Marea, a collection of six custom four-bedroom waterfront residences at 43 Beach Road, Batemans Bay NSW. Developer: Place Co. Sales agent: The Property Collective (Nathan Page, Liam Lagana). Built by Characters.
- **Purpose:** a project marketing site that turns interest into brochure downloads (leads for the sales agents).
- **Pages:** Home, Residences, Amenity, Location, Team, plus Privacy and 404 (not designed; built from the system).
- **Design:** Figma `Marea_Design`. Desktop only; tablet and mobile adapted by us. Tailwind defaults fill unspecified type and spacing.
- **Content:** static. Astro content collections and data files, no CMS. Edits are made in code by Characters.
- **Form:** "Download Brochure" on every page. Fields: first name, surname, email, phone, postcode, buyer type, how did you hear. Each lead is emailed to `the.property.collective@mail.propertyshell.com`, `projects@thepropertycollective.com.au` and `nick.smith@characters.agency`. The buyer gets an auto-reply with a brochure link (placeholder until the PDF is supplied). Resend + Turnstile + honeypot + rate limit.
- **Motion:** expressive. GSAP ScrollTrigger storytelling, Lenis smooth scroll (desktop only), custom page transitions. Fully reduced-motion aware.
- **Analytics:** GA4, plus a `generate_lead` event on form success.
- **Hosting:** GitHub repo, then Cloudflare (Workers with static assets, plus server rendering for the form endpoint). The domain is with another provider, so DNS records get added there at launch.
- **Launch:** Monday 23 November 2026.
- **Stack:** Astro (TS strict), Tailwind v4, GSAP, Lenis, Resend, Turnstile, Cloudflare adapter, pnpm.

## Decisions log
| Date | Decision |
|---|---|
| 19 Nov | Static content, no Sanity. |
| 19 Nov | Expressive motion. |
| 19 Nov | Tablet and mobile adapted from the desktop system; Tailwind defaults for unspecified values. |
| 19 Nov | Brochure link in the auto-reply comes from the env var `BROCHURE_URL`. Until the PDF arrives it points to `/brochure`, a branded "brochure coming soon, an agent will be in touch" page. Swap the env var (or drop the PDF into `public/`) and nothing else changes. |
| 19 Nov | Images are placeholders via `<Placeholder>` with the final aspect ratios. Real images drop into `src/assets/images/<page>/` with the filenames listed in `PLACEHOLDERS.md`, and the data files reference those names. |
| 19 Nov | Poppins self-hosted via Fontsource. PP Hatton Medium self-hosted WOFF2 (Light/Bold kept, not loaded). |
| 19 Nov | Gaps G1–G12 approved as proposed: burgundy button text; submit variant as drawn; display type step; nav variants; consent text darkened to neutral-800 and footer disclaimer raised to 10px; credit link kept eucalyptus + underlined; placeholder privacy copy. |
| 19 Nov | The aerial "M" pins are baked into the supplied photos, so no separate pin overlay component. The illustrated map has numbers baked in, so the map is a static image and the list carries the numbers (no hover-linking, which needs pin coordinates). |
| 19 Nov | Added a floating "Menu" button that appears once the hero nav scrolls away (the design only has the nav in the hero). Same overlay as the mobile menu. |
| 19 Nov | Form fields are all required. No-JS submissions redirect to `/thank-you`. Turnstile and Resend are skipped with a console warning if their keys are missing (so previews work before keys are set). |
| 19 Nov | Copy fix: removed a stray ". ." at the end of the Amenity "A balanced lifestyle" body. |
| 19 Nov | Style guide lives at `/styleguide` (Astro ignores `_`-prefixed routes). |
| 19 Nov | `astro check` requires TypeScript 6, so TS is pinned to ^6. |
| 20 Nov | Full brand palette added (Marea_Palette.json). Button states: hover = 1 step lighter, press = 1 step darker (primary powder 300→200/400; submit + floating menu burgundy 400→300/500). |
| 20 Nov | Real assets imported into the repo (`src/assets`). Amenity "rooftop" band reuses the building-exterior image; Team project square reuses the amenity closing image (client direction). Nav uses the Marea wordmark; home hero uses the primary (MAREA / BATEMANS BAY) logo. The hero arch artwork includes its own frame, so the coded border was removed. |
| 20 Nov | Launch inputs (domain, Resend domain verification, GA4) deferred until design/build sign-off. Work continues on the `staging` preview. |

## Schedule (to hit Monday)
| Day | Work |
|---|---|
| Thu 19 (eve) | Approvals, scaffold, tokens, fonts, primitives, styleguide |
| Fri 20 | UI components, motion system, form endpoint + email templates, repo + Cloudflare preview |
| Sat 21 | Home, Residences, Amenity |
| Sun 22 | Location (map + POI), Team, Privacy, 404; signature motion passes; QA sweep |
| Mon 23 | Fixes, real-asset swap (if supplied), DNS + Resend domain verification, go live |

Risk: expressive motion is the most time-hungry part. If time gets tight, the scroll-pinned band zoom (beat 4) and the map interactions (beat 7) are the first to simplify to standard reveals. Nothing else changes.

## Phases
- [x] 4. Foundation (tokens, fonts, primitives, base layout, motion utilities, `/styleguide`)
- [~] 5. Integrations: form endpoint, Resend templates, Turnstile, env schema, GA4 and Cloudflare config done and tested locally. **Blocked:** GitHub push (account not linked), Cloudflare preview deploy, live keys.
- [x] 6. Build: Home → Residences → Amenity → Location → Team → Privacy → 404 (+ /brochure, /thank-you)
- [~] 7. QA: tokens, lint, astro check and build pass. Breakpoint sweep (320–1920) on 9 routes shows no overflow or console errors. Motion test confirms nothing is left hidden after scrolling. Reduced motion, form states and the menu were verified. **Still to do with real assets:** Lighthouse, real-device testing, final visual pass against Figma.
- [ ] 8. Handover (README, launch checklist, DNS records, remaining placeholders)

## Component inventory
| Component | Used on | New / reused |
|---|---|---|
| `Nav` (layout home/default, tone light/dark) + `MobileMenu` | All | New |
| `HomeHero` (wordmark, arched image, CTA, meta row) | Home | New |
| `PageHero` (full-bleed image + giant display title) | Residences, Amenity, Location, 404 | New, reused ×4 |
| `SplitFeature` (headline, rich body, button, square image, `imageSide`) | Home ×3, Residences ×3, Amenity ×3, Location ×3 | New, reused ×12 |
| `ImageBand` (full-bleed image, optional pin overlay, optional pinned zoom) | Home ×4, Residences ×2, Amenity ×3, Location ×2 | New, reused ×11 |
| `StatementBand` (moss, small intro + large statement) | Home | New |
| `AmenityIcons` (6 icon + label items) | Home | New |
| `IllustratedMap` (map image + positioned numbered pins) | Location | New |
| `PoiList` (3 categories of numbered items, linked to map pins) | Location | New |
| `DeveloperIntro` (label, logo, body, large image) | Team | New |
| `AgentCard` | Team | New |
| `BrochureSection` (heading, intro, `BrochureForm`; layouts `centred` / `withAgents`) | All pages (centred), Team (withAgents) | New, reused ×5 |
| `BrochureForm` (fields, Turnstile, honeypot, states) | Inside `BrochureSection` | New |
| `Footer` | All | New |
| Primitives: `Container`, `Section` (theme prop), `Grid`, `Stack`, `Heading`, `Text`, `Button`, `Link`, `Icon`, `Image`, `Placeholder` | All | New |
| Form fields: `Input`, `Select`, `FormMessage` | Form | New |
| Motion: `Reveal`, `SplitText` lines, `MaskImage`, `Parallax`, `PageTransition` | All | New |

## Page plan
**Home** (`/`)
1. `HomeHero` (burgundy): nav (home layout, light), MAREA wordmark, Download Brochure button (scrolls to the form), arched image, meta row ("43 Beach Road, Batemans Bay NSW", "Custom four-bedroom waterfront residences", "Shaped by balance"). Motion beat 1.
2. `ImageBand`: building exterior.
3. `SplitFeature` (image right): "43 Beach Road", button View Residences.
4. `ImageBand` + pin: aerial.
5. `StatementBand`: "Derived from the Latin roots mare, and linea…" Motion beat 5.
6. `SplitFeature` (image left): "Amenities curated for contrast", button View Amenity.
7. `AmenityIcons` (burgundy): Private Pool, Sauna Room, Outdoor Shower, Secure Bike Storage, Basement Parking, Communal Areas.
8. `ImageBand`: kitchen.
9. `SplitFeature` (image right): "Bustling coastal community", button View Neighbourhood (links to Location).
10. `ImageBand`: bay aerial.
11. `BrochureSection` (centred) → `Footer`.

**Residences** (`/residences`): `PageHero` "Residence" → Split R "Four bedrooms. Three bathrooms. Six residences." → Band (kitchen) → Split L "Built around the table" → Band (bedroom) → Split R "Designed like a bathhouse" → Brochure → Footer. Split buttons say "Request Brochure" and scroll to the form.

**Amenity** (`/amenity`): `PageHero` → Split → Band → Split → Band → Split → Band → Brochure → Footer. Copy and images per Figma frames 247:415.

**Location** (`/location`): `PageHero` "Location" → Split R "First rest, then explore" → Band + pin (aerial) → `IllustratedMap` → `PoiList` (23 points in 3 categories, from a data file) → Split L "Everyday essentials within reach" → Band (main street) → Split R "Catalina Golf Club" → Brochure → Footer.

**Team** (`/team`): Nav (default, dark, on sand) → `DeveloperIntro` (Place Co) → `BrochureSection` withAgents (Sales agent intro + 2 `AgentCard`s on the left, form on the right) → Footer.

**Privacy** (`/privacy`): sand page, headline + body text styles. **404**: `PageHero` style with a "Back home" button. **`/brochure`**: interim brochure page (see decisions).

Content source: `src/content/pages/*.ts` data files (copy pulled from Figma verbatim) and `src/data/poi.ts`, `src/data/agents.ts`, `src/data/site.ts` (contacts, address, legal).

## Outstanding from client
- [ ] GitHub owner and repo name (proposed `marea-website`). The empty repo needs to be created on GitHub so this session can be connected to it.
- [ ] Confirm the domain is `mareabatemansbay.com.au` (taken from the privacy link in Figma).
- [ ] Cloudflare account access (for Workers deploy and Turnstile). Linking the GitHub repo to Cloudflare is done in the Cloudflare dashboard.
- [ ] Resend: API key into the Cloudflare env (`RESEND_API_KEY`), sending address (proposed `hello@mareabatemansbay.com.au`), DNS records added at the domain provider.
- [ ] Turnstile site key and secret.
- [ ] GA4 measurement ID (`PUBLIC_GA_ID`). Cookie banner: not legally required in AU. Default is none, and the privacy page discloses GA4 use.
- [ ] Images, logos (MAREA wordmark, M monogram/pin, Place Co, The Property Collective), 6 amenity icons, illustrated map.
- [ ] Brochure PDF.
- [ ] Privacy policy copy.
- [ ] Font licence confirmation (PP Hatton web use).
- [ ] Decisions on DESIGN-SYSTEM.md gaps G1–G12.

## Hosting status (20 Nov)
- Cloudflare Worker `marea-website`, Git-connected via Workers Builds. `main` is production (`npx wrangler deploy`); every other branch runs `npx wrangler preview`.
- Staging: branch `staging` → https://staging-marea-website.characters-agency.workers.dev
- Secrets set for Production and Previews Base: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`. Build var `PUBLIC_TURNSTILE_SITE_KEY` set for both.
- Turnstile widget "Marea brochure form" (managed) allows `mareabatemansbay.com.au` + `characters-agency.workers.dev`.
- Note: Previews Base changes only apply to newly created Previews. After changing a base secret, delete and rebuild the Preview (or set it on the Preview directly).
- Outstanding: GA4 ID (deferred), Resend domain verification, custom domain.

## Outstanding keys
`PUBLIC_GA_ID` (deferred). Done: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `PUBLIC_TURNSTILE_SITE_KEY`. Optional overrides: `RESEND_FROM`, `LEAD_RECIPIENTS`, `BROCHURE_URL`
