"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import { cardHoverLift, fadeInOnScroll, prefersReducedMotion } from "@/lib/gsap";
import type { ListSection as ListSectionContent } from "@/lib/content/landing";

function CheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent-dark)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}

function CrossIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ef4444"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * "Good fit" cascades in from the left, "Usually not a fit" from the
 * right — from the original GSAP plan's mapping-matrix row for this
 * section, never built during the phased rollout. The red cross icons
 * get one gentle pulse on the not-a-fit card's entrance (a single pulse,
 * not a loop — a permanently-pulsing red X reads as an alert/error state
 * you'd want to act on, which isn't the intent here).
 */
export function QualificationFit({
  qualifies,
  notFit,
}: {
  qualifies: ListSectionContent;
  notFit: ListSectionContent;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".qualify-card-good", ".qualify-cards", {
        duration: 0.55,
        start: "top 75%",
      });
      fadeInOnScroll(".qualify-card-bad", ".qualify-cards", {
        duration: 0.55,
        start: "top 75%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={qualifies.id}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 960,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-8)",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <h2
            style={{
              maxWidth: 760,
              margin: "0 auto",
              fontSize: "clamp(2rem, 3.7vw, 3.9rem)",
            }}
          >
            Is your Muslim business a{" "}
            <span style={{ color: "var(--color-accent)" }}>good fit?</span>
          </h2>
        </div>

        {/* Dual Cards */}
        <div
          className="qualify-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "var(--space-6)",
            alignItems: "stretch",
          }}
        >
          {/* Who Qualifies Card */}
          <div
            className="qualify-card-good"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              borderRadius: "var(--radius-2xl)",
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-accent)",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
              <span
                aria-hidden="true"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "var(--color-accent-pale)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={24} />
              </span>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  fontFamily: "var(--font-display)",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Good fit
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {qualifies.items.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "var(--space-2) 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-base)",
                    lineHeight: 1.55,
                    color: "var(--color-text-primary)",
                  }}
                >
                  <CheckIcon />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Is Usually Not a Fit Card */}
          <div
            className="qualify-card-bad"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              borderRadius: "var(--radius-2xl)",
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid #ef4444",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
              <span
                aria-hidden="true"
                className="qualify-cross-icon"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "#fff1f2",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CrossIcon size={24} />
              </span>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  fontFamily: "var(--font-display)",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Usually not a fit
              </h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {notFit.items.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "var(--space-2) 0",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-3)",
                    fontSize: "var(--font-size-base)",
                    lineHeight: 1.55,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <CrossIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Centered CTA */}
        <div style={{ marginTop: "var(--space-10)", textAlign: "center" }}>
          <Button
            href="/apply"
            variant="primary"
            className="cta-btn-accent"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 10px 24px rgba(39, 168, 238, 2.25)",
            }}
          >
            See If You Qualify
          </Button>
        </div>
      </div>
    </section>
  );
}
