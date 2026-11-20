# Placeholders

All supplied imagery, logos and icons are in (20 Nov, from Drive › Marea Beach Road › Website › AI Assets › Web-ready). Images live in `src/assets/images/<page>/<name>.webp` and are resized to AVIF/WebP at build. To replace one, overwrite the file with the same name. Every image fills its frame with `object-cover`, so any aspect ratio works; crops are centred (agent headshots are top-aligned).

## Shared images (one file, used in several places)
| File | Used for |
|---|---|
| `home/exterior` | Home full-bleed exterior; Amenity "rooftop" band (as briefed) |
| `home/living` | Home "43 Beach Road" square; Residences hero |
| `home/aerial-pin` | Home aerial band; Location aerial band |
| `amenity/closing` | Amenity closing band; Team "Place Co project" square (as briefed) |
| `location/hero` | Location hero; 404 hero |

## Still outstanding
| Item | Where | Status |
|---|---|---|
| Brochure PDF | Set `BROCHURE_URL` (or drop `public/marea-brochure.pdf` and point the var at it) | Interim `/brochure` holding page |
| Social share image | `public/og.jpg`, 1200 × 630 | Missing |
| Favicon | `public/favicon.svg` | Interim "M" monogram, replace with brand monogram |
| Privacy policy copy | `src/pages/privacy.astro` | Placeholder copy, needs client approval |

Not used: `Lowres-250305-BatemansBay-516187.jpg` (no matching slot).
