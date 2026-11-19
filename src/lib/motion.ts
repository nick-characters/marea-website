/**
 * Marea motion system (expressive, approved 19 Nov).
 * Declarative: components opt in with data attributes, this module wires them up.
 *   data-reveal            fade + rise on enter
 *   data-stagger           children fade + rise in sequence
 *   data-split             headline lines rise from a mask
 *   data-mask              image clip-path wipe upward, inner image settles from scale
 *   data-parallax          inner [data-parallax-target] drifts while scrolling
 *   data-zoom              (desktop) band pins and opens from an inset frame to full-bleed
 *   data-statement         words brighten as you scroll
 *   data-hero="home|page"  intro timelines
 * Durations/eases come from CSS tokens so CSS and JS stay in sync.
 * Everything is created inside gsap.matchMedia() and reverted on page swap.
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

let lenis: Lenis | null = null;
let mm: gsap.MatchMedia | null = null;
let easesReady = false;

const root = () => getComputedStyle(document.documentElement);
const seconds = (name: string) => Number.parseFloat(root().getPropertyValue(name)) / 1000 || 0.6;

function registerEases() {
  if (easesReady) return;
  for (const [name, token] of [
    ["tide", "--ease-tide"],
    ["expo", "--ease-out-expo"],
  ] as const) {
    const nums = root()
      .getPropertyValue(token)
      .match(/-?[\d.]+/g);
    CustomEase.create(name, nums && nums.length === 4 ? nums.join(",") : "0.65,0,0.35,1");
  }
  easesReady = true;
}

function startLenis() {
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;
  lenis = new Lenis({ autoRaf: false, anchors: { offset: 0 }, lerp: 0.09 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}
const raf = (time: number) => lenis?.raf(time * 1000);

export function scrollToTarget(target: string | HTMLElement) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else
    (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView({
      behavior: "smooth",
    });
}

function q<T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) {
  return Array.from(scope.querySelectorAll<T & HTMLElement>(sel));
}

function animate(isDesktop: boolean) {
  const base = seconds("--duration-base");
  const slow = seconds("--duration-slow");
  const tide = seconds("--duration-tide");

  /* Hero intros ------------------------------------------------------ */
  const homeHero = document.querySelector<HTMLElement>('[data-hero="home"]');
  if (homeHero) {
    const tl = gsap.timeline({ defaults: { ease: "expo" } });
    tl.fromTo(
      q("[data-hero-wordmark]", homeHero),
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: tide, ease: "tide" },
    )
      .fromTo(
        q("[data-hero-arch]", homeHero),
        { yPercent: 12, opacity: 0, clipPath: "inset(30% 0 0 0 round 50rem 50rem 0 0)" },
        { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0 0 round 50rem 50rem 0 0)", duration: tide },
        0.2,
      )
      .fromTo(q("[data-hero-arch] img", homeHero), { scale: 1.3 }, { scale: 1, duration: tide * 1.3 }, 0.2)
      .fromTo(
        q("[data-hero-fade]", homeHero),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: base, stagger: 0.08, clearProps: "transform" },
        0.9,
      );
  }

  const pageHero = document.querySelector<HTMLElement>('[data-hero="page"]');
  if (pageHero) {
    const title = pageHero.querySelector<HTMLElement>("[data-hero-title]");
    const tl = gsap.timeline({ defaults: { ease: "expo" } });
    tl.fromTo(
      q("[data-hero-bg]", pageHero),
      { scale: 1.18 },
      { scale: 1, duration: tide * 1.4, ease: "tide" },
      0,
    );
    if (title) {
      gsap.set(title, { opacity: 1 });
      const split = SplitText.create(title, { type: "chars", mask: "chars" });
      tl.from(split.chars, { yPercent: 110, duration: slow, stagger: 0.05 }, 0.3);
    }
    tl.fromTo(q("[data-hero-fade]", pageHero), { opacity: 0 }, { opacity: 1, duration: base }, 0.6);
    // Title drifts up and fades as the hero scrolls away
    gsap.to(q("[data-hero-title], [data-hero-bg]", pageHero), {
      yPercent: (i) => (i === 0 ? -30 : 12),
      ease: "none",
      scrollTrigger: { trigger: pageHero, start: "top top", end: "bottom top", scrub: true },
    });
  }

  /* Headlines: lines rise from a mask --------------------------------- */
  for (const el of q("[data-split]")) {
    gsap.set(el, { opacity: 1 });
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: slow,
          ease: "expo",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }),
    });
  }

  /* Simple reveals ---------------------------------------------------- */
  for (const el of q("[data-reveal]")) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: slow,
        ease: "expo",
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
  }
  for (const el of q("[data-stagger]")) {
    gsap.fromTo(
      Array.from(el.children),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: base * 1.4,
        ease: "expo",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  }

  /* Image mask wipes -------------------------------------------------- */
  for (const el of q("[data-mask]")) {
    const img = el.querySelector("img, [data-placeholder]");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true } });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0% round 6.25rem 0 0 0)" },
      { clipPath: "inset(0% 0% 0% 0% round 0rem 0 0 0)", duration: slow * 1.2, ease: "tide" },
    );
    if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: tide, ease: "expo" }, 0);
  }

  /* Parallax ---------------------------------------------------------- */
  for (const el of q("[data-parallax]")) {
    const target = el.querySelector("[data-parallax-target]");
    if (!target) continue;
    gsap.fromTo(
      target,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  /* Pinned band zoom (desktop storytelling beat) ---------------------- */
  if (isDesktop) {
    for (const el of q("[data-zoom]")) {
      const frame = el.querySelector("[data-zoom-frame]");
      if (!frame) continue;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=70%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          frame,
          { clipPath: "inset(14% 18% 14% 18% round 6.25rem 0 6.25rem 0)" },
          { clipPath: "inset(0% 0% 0% 0% round 0rem 0 0rem 0)", ease: "none" },
        )
        .fromTo(
          frame.querySelector("img, [data-placeholder]"),
          { scale: 1.3 },
          { scale: 1, ease: "none" },
          0,
        );
    }
  }

  /* Statement: words brighten with scroll ----------------------------- */
  for (const el of q("[data-statement]")) {
    gsap.set(el, { opacity: 1 });
    SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        ),
    });
  }
}

function showEverything() {
  gsap.set("[data-reveal], [data-stagger] > *, [data-split], [data-statement], [data-hero-title]", {
    opacity: 1,
    clearProps: "transform",
  });
  gsap.set("[data-mask]", { clipPath: "none" });
}

export function initMotion() {
  registerEases();
  startLenis();
  mm = gsap.matchMedia();
  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px)",
    },
    (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return showEverything();
      animate(desktop);
    },
  );
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

export function destroyMotion() {
  mm?.revert();
  mm = null;
  for (const t of ScrollTrigger.getAll()) t.kill();
  if (lenis) {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  }
}
