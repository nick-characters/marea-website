import type { ImageMetadata } from "astro";

/**
 * Drop-in asset registry.
 * Real images live in src/assets/images/<key>.<ext> (e.g. home/exterior.jpg).
 * Logos and icons live in src/assets/logos/<name>.svg and src/assets/icons/<name>.svg.
 * Anything missing renders as a labelled placeholder, so assets can arrive in any order
 * with no code changes. See PLACEHOLDERS.md for the full list of expected keys.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);
const svgs = import.meta.glob<string>("/src/assets/{logos,icons}/**/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

export function getImage(key: string): ImageMetadata | undefined {
  for (const ext of ["jpg", "jpeg", "png", "webp", "avif"]) {
    const hit = images[`/src/assets/images/${key}.${ext}`];
    if (hit) return hit.default;
  }
  return undefined;
}

export function getSvg(kind: "logos" | "icons", name: string): string | undefined {
  return svgs[`/src/assets/${kind}/${name}.svg`];
}

export type Aspect = "square" | "band" | "arch" | "map" | "portrait" | "landscape";

export interface Media {
  /** Path under src/assets/images without extension, e.g. "home/exterior" */
  key: string;
  alt: string;
  /** What should go here; shown on the placeholder until the real image arrives */
  label: string;
}
