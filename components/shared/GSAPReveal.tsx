"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { fadeInOnScroll, prefersReducedMotion } from "@/lib/gsap";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "stagger-children"
  | "card-3d";

interface GSAPRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean | number;
  className?: string;
  start?: string;
  id?: string;
}

/**
 * GSAP/ScrollTrigger replacement for components/shared/Reveal.tsx (plain
 * IntersectionObserver + CSS transition). Same one-shot "reveal once on
 * scroll-in" job, but parametric (variant/stagger/scrub) instead of a
 * single fixed fade-up, and GSAP-driven so it can compose with the rest
 * of the docs/GSAP_SCROLLTRIGGER_PLAN.md work instead of fighting it.
 *
 * Reveal.tsx itself is left in place and still used on the homepage —
 * this doesn't replace it wholesale, only adds the variant this plan
 * calls for wherever a section is upgraded to use it.
 */
export function GSAPReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.85,
  stagger = 0.12,
  className = "",
  start = "top 85%",
  id,
}: GSAPRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;
      const el = containerRef.current;
      const targets = variant === "stagger-children" ? el.children : el;

      fadeInOnScroll(targets, el, {
        duration,
        delay,
        stagger: variant === "stagger-children" ? stagger : undefined,
        start,
      });
    },
    { scope: containerRef, dependencies: [variant, delay, duration, stagger, start] }
  );

  return (
    <div ref={containerRef} className={className} id={id}>
      {children}
    </div>
  );
}
