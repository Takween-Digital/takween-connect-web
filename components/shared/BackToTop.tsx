"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "./SmoothScrollProvider";

const VISIBLE_AFTER_PX = 480;

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

/**
 * Floating "back to top" button, all devices — shown once the page has
 * scrolled past VISIBLE_AFTER_PX, hidden again near the top. Bottom-right
 * placement doesn't collide with SectionRadar (vertically centered,
 * tablet/desktop only) or MobileScrollProgress (pinned to the top edge).
 *
 * Scrolls via the shared Lenis instance (getLenis()) when smooth
 * scrolling is active, so this doesn't fight Lenis's own per-frame
 * scroll-position writes the way a plain window.scrollTo() would;
 * falls back to it directly when Lenis isn't running (reduced motion,
 * or before mount).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: `${VISIBLE_AFTER_PX}px top`,
      end: "max",
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => {
      trigger.kill();
    };
  });

  useGSAP(
    () => {
      const el = btnRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: visible ? 1 : 0 });
        return;
      }

      gsap.to(el, {
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.7,
        duration: 0.3,
        ease: visible ? "back.out(1.7)" : "power2.in",
        overwrite: "auto",
      });
    },
    { dependencies: [visible] }
  );

  const handleClick = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      style={{
        position: "fixed",
        right: "var(--space-5)",
        bottom: "var(--space-5)",
        zIndex: 90,
        width: 46,
        height: 46,
        borderRadius: "var(--radius-full)",
        border: "none",
        background: "var(--color-accent)",
        boxShadow: "0 10px 24px rgba(39, 168, 238, 0.35)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        opacity: 0,
        transform: "scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ArrowUpIcon />
    </button>
  );
}
