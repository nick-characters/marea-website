#!/usr/bin/env node
// Breakpoint sweep: visits routes at many widths, flags horizontal overflow,
// console errors and failed requests, and saves full-page screenshots to .qa/
//
// Requires: pnpm add -D playwright && pnpm exec playwright install chromium
// Usage:    node scripts/check-breakpoints.mjs [route ...]
// Env:      BASE_URL (default http://localhost:4321), WIDTHS="320,375,..."
// Routes:   args, else .qa/routes.json (array of paths), else "/"

import { mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright not installed. Run: pnpm add -D playwright && pnpm exec playwright install chromium");
  process.exit(2);
}

const BASE = process.env.BASE_URL ?? "http://localhost:4321";
const WIDTHS = (process.env.WIDTHS ?? "320,375,390,768,1024,1280,1440,1920").split(",").map(Number);
const OUT = ".qa";
mkdirSync(OUT, { recursive: true });

let routes = process.argv.slice(2);
if (!routes.length && existsSync(join(OUT, "routes.json"))) routes = JSON.parse(readFileSync(join(OUT, "routes.json"), "utf8"));
if (!routes.length) routes = ["/"];

const slug = (r) => (r === "/" ? "home" : r.replace(/^\/|\/$/g, "").replace(/[^\w-]+/g, "_"));
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
let problems = 0;

for (const route of routes) {
  for (const width of WIDTHS) {
    const isMobile = width < 768;
    const ctx = await browser.newContext({
      viewport: { width, height: isMobile ? 800 : 900 },
      deviceScaleFactor: 1,
      hasTouch: isMobile,
      isMobile,
    });
    const page = await ctx.newPage();
    const issues = [];

    page.on("console", (m) => m.type() === "error" && issues.push(`console error: ${m.text()}`));
    page.on("pageerror", (e) => issues.push(`page error: ${e.message}`));
    page.on("requestfailed", (r) => issues.push(`request failed: ${r.url()}`));

    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(600); // let intro animations settle

      // Scroll through the page so lazy images and scroll reveals trigger before screenshotting.
      await page.evaluate(async () => {
        const step = Math.max(200, window.innerHeight * 0.8);
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const doc = document.documentElement;
        const offenders = [];
        if (doc.scrollWidth > vw + 1) {
          for (const el of document.querySelectorAll("body *")) {
            const r = el.getBoundingClientRect();
            if (r.width && (r.right > vw + 1 || r.left < -1)) {
              const cs = getComputedStyle(el);
              if (cs.position === "fixed" || cs.visibility === "hidden" || cs.display === "none") continue;
              offenders.push(
                `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${
                  el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""
                } (right=${Math.round(r.right)}, vw=${vw})`
              );
              if (offenders.length >= 8) break;
            }
          }
          return { overflow: doc.scrollWidth - vw, offenders };
        }
        return null;
      });

      if (overflow) issues.unshift(`horizontal overflow of ${overflow.overflow}px. Offenders: ${overflow.offenders.join("; ") || "unknown"}`);

      await page.screenshot({ path: join(OUT, `${slug(route)}-${width}.png`), fullPage: true });
    } catch (e) {
      issues.push(`navigation/screenshot failed: ${e.message}`);
    }

    if (issues.length) {
      problems += issues.length;
      console.log(`\n${route} @ ${width}px`);
      issues.forEach((i) => console.log("  - " + i));
    }
    await ctx.close();
  }
}

await browser.close();
console.log(
  problems
    ? `\n${problems} issue(s) found. Screenshots saved to ${OUT}/. Review them visually too.`
    : `\nNo overflow or console errors across ${routes.length} route(s) x ${WIDTHS.length} widths. Screenshots in ${OUT}/. Review them visually.`
);
process.exit(problems ? 1 : 0);
