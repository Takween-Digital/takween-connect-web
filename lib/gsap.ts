/**
 * GSAP + ScrollTrigger registration singleton — the one place plugin
 * registration happens, so Next.js Fast Refresh in dev doesn't register
 * ScrollTrigger multiple times across re-evaluations of this module.
 *
 * The `typeof window !== 'undefined'` guard is load-bearing, not
 * defensive style: this project ships to Cloudflare Workers via
 * @opennextjs/cloudflare, and a Worker isolate throws immediately if
 * `window`/`document`/`navigator` are referenced during request
 * handling. Every import site must still be a "use client" component —
 * this guard only stops *this specific module* from crashing the build,
 * it doesn't make GSAP safe to import from a Server Component.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
}

/**
 * WCAG 2.2 AA: every ScrollTrigger-driven animation must check this
 * before applying motion (transforms, staggers, scrub) — see
 * docs/GSAP_SCROLLTRIGGER_PLAN.md §7.2. Not cached: the OS setting can
 * change while the tab is open.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Shared hover-lift used by every card across the site (source cards,
 * scope panels, package tiles, qualification cards, etc.) — one place
 * for the lift amount/easing so cards don't each hand-roll a slightly
 * different feel. Only animates the transform; box-shadow stays a
 * plain CSS `transition` on the element itself (GSAP's CSSPlugin
 * doesn't reliably interpolate multi-part box-shadow strings — see
 * ValueComparison.tsx's glow-layer comment for the same issue).
 */
export function cardHoverLift(el: Element | null, hovered: boolean, liftPx = 6) {
  if (!el || prefersReducedMotion()) return;
  gsap.to(el, {
    y: hovered ? -liftPx : 0,
    duration: hovered ? 0.3 : 0.4,
    ease: hovered ? "power2.out" : "power2.inOut",
    overwrite: "auto",
  });
}

/**
 * Scroll-in reveal that only fades. x/y/scale/rotation here is what made
 * whole sections look like they were sliding around the page (and on
 * mobile those transforms also overflowed horizontally).
 *
 * fromTo + immediateRender:false so hydration doesn't snap content to
 * an offset "from" state before the trigger fires.
 */
export function fadeInOnScroll(
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  vars?: {
    stagger?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    targets,
    { opacity: 0 },
    {
      opacity: 1,
      duration: vars?.duration ?? 0.55,
      delay: vars?.delay ?? 0,
      stagger: vars?.stagger,
      ease: "power2.out",
      immediateRender: true,
      scrollTrigger: {
        trigger,
        start: vars?.start ?? "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    }
  );
}

export { gsap, ScrollTrigger };
