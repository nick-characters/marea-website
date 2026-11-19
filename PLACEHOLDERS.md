# Placeholders

Every image, logo and icon that hasn't been supplied yet renders as a labelled placeholder. **To swap one in, drop the file at the path below. The filename must match exactly; any of .jpg / .png / .webp / .avif works.** No code changes are needed. Images are resized and converted to AVIF/WebP at build time.

Use the highest-resolution export you have. Minimums are listed below. Crop-safe areas: full-bleed images crop to 4:3 on tablet and 4:5 on mobile around the centre.

## Images (15)
| Drop file at | What goes here | Aspect | Recommended min |
|---|---|---|---|
| `src/assets/images/home/kitchen.jpg` | Full-bleed: kitchen | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |
| `src/assets/images/home/living.jpg` | Square: living room to the bay | Square 1:1 | 1600 × 1600 |
| `src/assets/images/home/sauna.jpg` | Square: wellness / sauna room | Square 1:1 | 1600 × 1600 |
| `src/assets/images/home/marina.jpg` | Square: marina aerial | Square 1:1 | 1600 × 1600 |
| `src/assets/images/residences/kitchen.jpg` | Full-bleed: kitchen | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |
| `src/assets/images/amenity/hero.jpg` | Hero: amenity | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |
| `src/assets/images/amenity/contrast.jpg` | Square: amenity detail | Square 1:1 | 1600 × 1600 |
| `src/assets/images/amenity/communal.jpg` | Square: communal space | Square 1:1 | 1600 × 1600 |
| `src/assets/images/amenity/pool.jpg` | Full-bleed: pool | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |
| `src/assets/images/amenity/rooftop.jpg` | Full-bleed: rooftop | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |
| `src/assets/images/amenity/closing.jpg` | Full-bleed: closing image | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |
| `src/assets/images/location/golf.jpg` | Square: golf course | Square 1:1 | 1600 × 1600 |
| `src/assets/images/team/nathan-page.jpg` | Agent portrait: Nathan Page | Square 1:1 | 1600 × 1600 |
| `src/assets/images/team/liam-lagana.jpg` | Agent portrait: Liam Lagana | Square 1:1 | 1600 × 1600 |
| `src/assets/images/404/hero.jpg` | Hero: calm water (reuse any bay image) | Full-bleed; desktop 1440 × 1024, crops to 4:3 tablet / 4:5 mobile | 2880 × 2048 |

## Logos (SVG, use `fill="currentColor"` so they take the section colour)
| Drop file at | What goes here |
|---|---|
| `src/assets/logos/marea-wordmark.svg` | MAREA + BATEMANS BAY wordmark (home hero, 576 wide) |
| `src/assets/logos/marea-logo.svg` | MAREA logotype (nav, 129 × 40) |
| `src/assets/logos/placeco.svg` | Place Co logo (footer, Team page) |
| `src/assets/logos/property-collective.svg` | The Property Collective logo (footer) |

## Amenity icons (SVG, stroke/fill `currentColor`, 64 × 64 viewBox)
`src/assets/icons/amenity-pool.svg`, `amenity-sauna.svg`, `amenity-shower.svg`, `amenity-bike.svg`, `amenity-parking.svg`, `amenity-communal.svg`

## Other
| Item | Where | Status |
|---|---|---|
| Brochure PDF | Set `BROCHURE_URL` env var to the PDF URL (or drop `public/marea-brochure.pdf` and point the var at it) | Interim: `/brochure` holding page |
| Social share image | `public/og.jpg`, 1200 × 630 | Missing |
| Privacy policy copy | `src/pages/privacy.astro` | Placeholder copy, needs client approval |
| Favicon | `public/favicon.svg` | Interim "M" monogram; replace with brand monogram |
