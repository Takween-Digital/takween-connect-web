"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export interface SectionRadarItem {
  /** Must match a real section id on the page (see app/(marketing)/page.tsx). */
  id: string;
  label: string;
  subtitle?: string;
  number?: string;
}

/**
 * Comprehensive chapter list covering all key sections of the landing page.
 * Styled with adaptive micro-dots and rich two-line glassmorphic heading badges.
 */
export const DEFAULT_SECTION_RADAR_ITEMS: SectionRadarItem[] = [
  { id: "hero", number: "01", label: "Overview", subtitle: "Free Website Initiative" },
  { id: "the-problem", number: "02", label: "The Problem", subtitle: "Agency Traps & High Costs" },
  { id: "solution", number: "03", label: "The Solution", subtitle: "Zero-Interest Digital Build" },
  { id: "value-comparison", number: "04", label: "Market Value", subtitle: "£3,500 Agency Equivalent for £0" },
  { id: "built-to-feel", number: "05", label: "Built to Feel", subtitle: "Custom Motion & High-Speed Craft" },
  { id: "why-its-sponsored", number: "06", label: "Why Sponsored", subtitle: "Community Waqf Model" },
  { id: "scope", number: "07", label: "What You Get", subtitle: "Full Scope Deliverables" },
  { id: "who-qualifies", number: "08", label: "Who Qualifies", subtitle: "Eligibility & Selection Fit" },
  { id: "capacity", number: "09", label: "Live Capacity", subtitle: "Real-Time Monthly Slots" },
  { id: "how-it-works", number: "10", label: "How It Works", subtitle: "4-Step Process" },
  { id: "faq", number: "11", label: "FAQ", subtitle: "Questions & Clear Answers" },
  { id: "final-cta", number: "12", label: "Apply Now", subtitle: "Claim Your Sponsored Site" },
];

interface SectionRadarProps {
  items?: SectionRadarItem[];
  className?: string;
}

/**
 * Elite Pro Vertical Section Navigator ("Radar") floating on the right viewport edge.
 *
 * Features:
 * 1. Adaptive dot column fitting all sections with dynamic clamp spacing.
 * 2. Signature #27A8EE vibrant emerald styling (rail glow, active dot halo, pulse beacon).
 * 3. Rich two-line glassmorphic heading badges (Chapter #, Title, and Subtitle).
 * 4. GSAP ScrollTrigger continuous fill rail + IntersectionObserver spy with edge clamping.
 */
export function SectionRadar({ items = DEFAULT_SECTION_RADAR_ITEMS, className }: SectionRadarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Active section spy with boundary edge listeners for top (Hero) and bottom (Final CTA)
  useEffect(() => {
    const targets = items
      .map((item) => ({ item, el: document.getElementById(item.id) }))
      .filter((t): t is { item: SectionRadarItem; el: HTMLElement } => t.el !== null && t.el.offsetHeight > 0);

    if (targets.length === 0) return;

    // Default to first item if near top
    if (window.scrollY < 120 && targets[0]) {
      setActiveId(targets[0].item.id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = targets.find((t) => t.el === entry.target);
            if (match) setActiveId(match.item.id);
          }
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
    );

    for (const { el } of targets) observer.observe(el);

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY < 120 && targets[0]) {
        setActiveId(targets[0].item.id);
      } else if (scrollY + windowHeight >= docHeight - 80 && targets[targets.length - 1]) {
        setActiveId(targets[targets.length - 1].item.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  // Continuous GSAP scrubbed rail fill from first to last tracked section
  useGSAP(() => {
    const fill = railFillRef.current;
    if (!fill) return;

    const firstEl = document.getElementById(items[0]?.id ?? "");
    const lastEl = document.getElementById(items[items.length - 1]?.id ?? "");
    if (!firstEl || !lastEl) return;

    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: firstEl,
          start: "top center",
          endTrigger: lastEl,
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, [items]);

  // Active dot spring feedback
  useGSAP(
    () => {
      if (prefersReducedMotion() || !activeId) return;
      const dot = dotRefs.current.get(activeId);
      if (!dot) return;
      gsap.fromTo(dot, { scale: 1 }, { scale: 1.35, duration: 0.35, ease: "back.out(2.2)" });
    },
    { dependencies: [activeId] }
  );

  return (
    <nav
      className={["section-radar-nav", className].filter(Boolean).join(" ")}
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "var(--radar-offset, var(--space-6))",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
      }}
    >
      <div
        className="section-radar"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--radar-gap, clamp(10px, 1.8vh, 18px))",
        }}
      >
        {/* Track + fill rail */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "var(--radar-rail-inset, 8px)",
            bottom: "var(--radar-rail-inset, 8px)",
            left: "50%",
            width: "var(--radar-rail-width, 2px)",
            transform: "translateX(-50%)",
            background: "rgba(39, 168, 238, 0.18)",
            borderRadius: "var(--radius-full)",
          }}
        >
          <div
            ref={railFillRef}
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "top",
              transform: "scaleY(0)",
              background: "linear-gradient(180deg, #27A8EE 0%, #10b981 100%)",
              boxShadow: "0 0 10px rgba(39, 168, 238, 0.5)",
              borderRadius: "var(--radius-full)",
            }}
          />
        </div>

        {items.map((item, index) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isVisible = isActive || isHovered;
          const numText = item.number ?? String(index + 1).padStart(2, "0");

          return (
            <div key={item.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
              {/* Rich Glassmorphic Heading Badge (Slide in from right) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "calc(100% + 14px)",
                  top: "50%",
                  transform: isVisible
                    ? "translateY(-50%) translateX(0)"
                    : "translateY(-50%) translateX(10px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 14px 6px 10px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid",
                  borderColor: isVisible ? "#27A8EE" : "rgba(39, 168, 238, 2.25)",
                  boxShadow: isActive
                    ? "0 8px 30px -4px rgba(39, 168, 238, 0.28), 0 4px 12px rgba(0, 0, 0, 0.06)"
                    : "0 6px 20px -4px rgba(0, 0, 0, 0.08)",
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: "none",
                  transition: "opacity 180ms ease, transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
                  whiteSpace: "nowrap",
                  zIndex: 20,
                }}
              >
                {/* Number chip in vibrant #27A8EE */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10.5px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono, monospace)",
                    letterSpacing: "0.04em",
                    color: "#27A8EE",
                    background: "rgba(39, 168, 238, 0.12)",
                    border: "1px solid rgba(39, 168, 238, 0.28)",
                    borderRadius: "6px",
                    padding: "2px 6px",
                    lineHeight: 1,
                  }}
                >
                  {numText}
                </span>

                {/* Section title & contextual subtitle */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", textAlign: "left" }}>
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: isActive ? "#0f172a" : "#334155",
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: isActive ? "#27A8EE" : "#64748b",
                        lineHeight: 1.15,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {/* Arrow pointer pointing towards dot */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "-5px",
                    top: "50%",
                    transform: "translateY(-50%) rotate(45deg)",
                    width: "8px",
                    height: "8px",
                    background: "rgba(255, 255, 255, 0.94)",
                    borderTop: "1px solid",
                    borderRight: "1px solid",
                    borderColor: isVisible ? "#27A8EE" : "rgba(39, 168, 238, 2.25)",
                  }}
                />
              </div>

              {/* Navigation Node Dot */}
              <a
                ref={(el) => {
                  if (el) dotRefs.current.set(item.id, el);
                  else dotRefs.current.delete(item.id);
                }}
                href={`#${item.id}`}
                aria-label={`${numText}: ${item.label}${item.subtitle ? ` — ${item.subtitle}` : ""}`}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "var(--radar-dot-size, 11px)",
                  height: "var(--radar-dot-size, 11px)",
                  borderRadius: "var(--radius-full)",
                  background: isActive ? "#27A8EE" : "#ffffff",
                  border: `var(--radar-border-width, 2px) solid ${
                    isActive ? "#27A8EE" : "rgba(39, 168, 238, 0.45)"
                  }`,
                  boxShadow: isActive
                    ? "0 0 0 3.5px rgba(39, 168, 238, 0.5), 0 0 16px rgba(39, 168, 238, 0.5)"
                    : isHovered
                    ? "0 0 0 2.5px rgba(39, 168, 238, 0.2), 0 0 10px rgba(39, 168, 238, 0.35)"
                    : "0 1px 3px rgba(0, 0, 0, 0.08)",
                  transition: "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
                  cursor: "pointer",
                }}
              >
                {/* Active radar ping beacon */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: "-4px",
                      borderRadius: "50%",
                      border: "1.5px solid #27A8EE",
                      animation: "radarPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
