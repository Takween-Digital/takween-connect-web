"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cardHoverLift, fadeInOnScroll, gsap, prefersReducedMotion } from "@/lib/gsap";

interface FeelCard {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const CARDS: FeelCard[] = [
  {
    icon: (
      <svg aria-hidden="true" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-dark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L5 14h6l-1 8 8-12h-6z" />
      </svg>
    ),
    title: "Fast",
    body: "Optimised for a smoother browsing experience.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-dark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v14H4z" />
        <path d="M4 9h16M8 5v4" />
      </svg>
    ),
    title: "Modern",
    body: "Clean layout, clear hierarchy and responsive presentation.",
  },
  {
    icon: (
      <svg aria-hidden="true" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-dark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Professional",
    body: "Designed to make an established business feel established online.",
  },
];

/** "Built to feel fast, modern and professional" — a short 3-card summary
 * from the docs/index.html redesign, sitting between the pricing
 * comparison and the Why Sponsored section. Cards unfold in with a 3D
 * tilt (left card leans left, right card leans right, center stays
 * flat) as the grid scrolls into view; each icon lifts 4px on hover. */
export function BuiltToFeel() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".built-card", ".built-cards-grid", {
        stagger: 0.1,
        duration: 0.55,
        start: "top 80%",
      });
    },
    { scope: sectionRef }
  );

  const handleIconEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    gsap.to(e.currentTarget, { y: -4, duration: 0.3, ease: "power2.out" });
  };
  const handleIconLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <section ref={sectionRef} style={{ background: "var(--color-surface-elevated)", padding: "var(--space-16) var(--space-8)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ marginBottom: "var(--space-10)", fontSize: "clamp(2rem, 3.7vw, 3.9rem)" }}>
          Built to feel <span style={{ color: "var(--color-accent)" }}>fast, modern and professional.</span>
        </h2>
        <div
          className="built-cards-grid"
          style={{
            display: "grid",
            gap: "var(--space-5)",
          }}
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="built-card"
              onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
              onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
              style={{
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-2xl)",
                padding: "var(--space-6) var(--space-5)",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div
                onMouseEnter={handleIconEnter}
                onMouseLeave={handleIconLeave}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "var(--radius-lg)",
                  background: "var(--color-accent-pale)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto var(--space-4)",
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ marginBottom: "var(--space-2)" }}>{card.title}</h3>
              <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
