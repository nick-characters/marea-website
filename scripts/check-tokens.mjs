#!/usr/bin/env node
// Design-token audit. Fails (exit 1) if source files contain hardcoded design values.
// Scans src/ for .astro .tsx .jsx .ts .js .css .mdx .html
// Allowed: src/styles/global.css (and any file listed in ALLOW_FILES) may declare raw values.
//
// Usage: node scripts/check-tokens.mjs [dir=src]
// Suppress a deliberate line with a trailing comment:  token-ok: <reason>

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative, sep } from "node:path";

const ROOT = process.argv[2] ?? "src";
const EXTS = new Set([".astro", ".tsx", ".jsx", ".ts", ".js", ".css", ".mdx", ".html", ".svelte", ".vue"]);
const ALLOW_FILES = [
  "styles/global.css",
  "styles/tokens.css",
  "assets/fonts",
  "lib/brand.ts",
  "lib/email.ts",
]; // HTML email needs literal inline styles (email clients cannot read CSS variables)
const IGNORE_DIRS = new Set(["node_modules", ".astro", "dist", ".git", "fonts", "sanity", "studio"]);

const rules = [
  {
    name: "hex colour",
    re: /(?<![\w&-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g,
    hint: "Use a colour token (bg-surface, text-ink, var(--color-*)).",
    skip: (line) => /href\s*=\s*["']#/.test(line) || /url\(#/.test(line) || /id\s*=\s*["']#/.test(line),
  },
  {
    name: "rgb/hsl/oklch literal",
    re: /\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(\s*[\d.]/g,
    hint: "Use a colour token. color-mix() with tokens is fine.",
  },
  {
    name: "arbitrary Tailwind value",
    re: /\b(?:[a-z-]+:)*(?:[a-z]+-)+\[[^\]\s]*(?:px|rem|em|vh|vw|dvh|svh|%|#|\d)[^\]\s]*\]/g,
    hint: "Arbitrary values bypass the system. Add/use a token or primitive.",
    skip: (line) => /(?:aria|data)-\[/.test(line) && !/(?:px|rem|em)\]/.test(line),
  },
  {
    name: "inline style with raw value",
    re: /style\s*=\s*(?:"[^"]*(?:px|rem|em|#[0-9a-fA-F]{3,8}|rgb|hsl)[^"]*"|\{\{[^}]*(?:px|rem|em|#[0-9a-fA-F]{3,8})[^}]*\}\})/g,
    hint: "No inline design values. Use tokens, or pass a CSS custom property.",
  },
  {
    name: "raw px/rem/em in CSS/style block",
    re: /(?:^|[\s;{(])-?(?!(?:0|1)px\b)\d*\.?\d+(?:px|rem|em)\b/g,
    hint: "Use var(--spacing-*), var(--text-*), etc. (0 and 1px hairlines: add token-ok if deliberate).",
    onlyIn: [".css", ".astro"],
    onlyInside: "style",
    skip: (line) => /^\s*(?:\/\/|\/\*|\*)/.test(line) || /@media|@container/.test(line),
  },
  {
    name: "!important",
    re: /!important/g,
    hint: "Fix specificity or layer order instead.",
  },
  {
    name: "vh unit (use dvh/svh)",
    re: /\b\d*\.?\d+vh\b/g,
    hint: "Use dvh/svh so mobile browser chrome does not break layouts.",
  },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORE_DIRS.has(name)) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

let violations = 0;
const files = walk(ROOT);

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  if (ALLOW_FILES.some((a) => rel.includes(a))) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  let inStyle = file.endsWith(".css");
  let inSvg = 0;

  lines.forEach((line, i) => {
    if (/<style[\s>]/.test(line)) inStyle = true;
    if (/<\/style>/.test(line)) inStyle = false;
    if (/<svg[\s>]/.test(line)) inSvg++;
    const svgNow = inSvg > 0;
    if (/<\/svg>/.test(line)) inSvg = Math.max(0, inSvg - 1);

    if (/token-ok/.test(line)) return;

    for (const rule of rules) {
      if (rule.onlyIn && !rule.onlyIn.includes(extname(file))) continue;
      if (rule.onlyInside === "style" && !inStyle) continue;
      // Hex colours inside inline SVG artwork (fill="#...") are assets, not design values.
      if (svgNow && (rule.name === "hex colour" || rule.name === "rgb/hsl/oklch literal")) continue;
      if (rule.skip?.(line)) continue;
      rule.re.lastIndex = 0;
      const m = rule.re.exec(line);
      if (m) {
        violations++;
        console.log(`${file}:${i + 1}  [${rule.name}]  ${m[0].trim()}\n    ${rule.hint}`);
      }
    }
  });
}

if (violations) {
  console.log(
    `\n${violations} design-token violation(s). Fix them, or add a token to @theme (with user approval).`,
  );
  process.exit(1);
} else {
  console.log(`Design-token audit passed (${files.length} files scanned).`);
}
