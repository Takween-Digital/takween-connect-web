"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui";
import { RichText } from "@/components/shared/RichText";
import { cardHoverLift, fadeInOnScroll, prefersReducedMotion } from "@/lib/gsap";
import { PackageBenefits } from "./PackageBenefits";
import type { CategorizedSection as CategorizedSectionContent } from "@/lib/content/landing";

interface ScopeComparisonProps {
  included: CategorizedSectionContent;
  addOns: CategorizedSectionContent;
}

function CheckGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={20}
      height={20}
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

function PlusGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="#b45309"
      strokeWidth={2}
      strokeLinecap="round"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ScopeLabel({ label, tone }: { label: string; tone: "free" | "addon" }) {
  return (
    <div
      style={{
        fontSize: "0.82rem",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 10,
        color: tone === "free" ? "var(--color-accent)" : "#b45309",
      }}
    >
      {label}
    </div>
  );
}

/**
 * Replaces two stacked "spec sheet" blocks with side-by-side comparison cards:
 * Left: white Free Website card with a bright-green top accent
 * Right: white Optional Paid Add-ons card with an amber top accent
 *
 * Panel entrance (slide in from opposite sides) and the per-row cascading
 * checklist reveal were in the original GSAP plan's §4.7 but never built
 * during the phased rollout — added here as part of giving every card on
 * the site consistent GSAP treatment.
 */
export function ScopeComparison({ included, addOns }: ScopeComparisonProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".package-benefit-tile", ".package-benefit-grid", {
        stagger: 0.08,
        duration: 0.5,
        start: "top 80%",
      });
      fadeInOnScroll(".scope-panel-free", ".scope-panels", {
        duration: 0.55,
        start: "top 75%",
      });
      fadeInOnScroll(".scope-panel-addon", ".scope-panels", {
        duration: 0.55,
        start: "top 75%",
      });
      fadeInOnScroll(".scope-list-item", ".scope-panels", {
        stagger: 0.04,
        duration: 0.4,
        delay: 0.15,
        start: "top 75%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ position: "relative", overflow: "hidden", background: "var(--color-surface-elevated)" }}>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1040, margin: "0 auto", padding: "var(--space-12) var(--space-8)" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.7vw, 3.9rem)" }}>
            A clear <span style={{ color: "var(--color-accent)" }}>free website package</span> for Halal Muslim
            businesses
          </h2>
          <p style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-base)", margin: 0 }}>
            A starter website of this type can often be priced around £2,000–£5,000 elsewhere. For selected
            Muslim-owned businesses, the agreed development scope is £0.
          </p>
        </div>

        <PackageBenefits />

        <div
          className="scope-panels"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
            gap: "var(--space-6)",
            alignItems: "stretch",
          }}
        >
          {/* Included, free */}
          <div
            className="scope-panel-free"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-accent)",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ScopeLabel label="Free Website Package" tone="free" />
            <h3 style={{ fontSize: "var(--font-size-xl)", color: "#0f172a", marginBottom: "var(--space-6)" }}>
              {included.title}
            </h3>
            {included.categories.map((category) => (
              <div key={category.title} style={{ marginBottom: "var(--space-5)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    display: "block",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {category.title}
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="scope-list-item"
                      style={{
                        padding: "var(--space-2) 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "var(--space-3)",
                        color: "var(--color-text-primary)",
                        fontSize: "var(--font-size-base)",
                        lineHeight: 1.55,
                      }}
                    >
                      <CheckGlyph />
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div
              className="scope-note-free"
              style={{
                marginTop: "auto",
                padding: "14px 16px",
                background: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border-light)",
                borderRadius: 14,
                fontSize: "0.92rem",
                color: "var(--color-text-secondary)",
              }}
            >
              <RichText text={included.note ?? ""} />
            </div>
          </div>

          {/* Paid add-ons */}
          <div
            className="scope-panel-addon"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              padding: "var(--space-8) var(--space-6)",
              background: "var(--color-surface-base)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid #f59e0b",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ScopeLabel label="Optional Paid Add-ons" tone="addon" />
            <h3 style={{ fontSize: "var(--font-size-xl)", color: "#0f172a", marginBottom: "var(--space-6)" }}>
              {addOns.title}
            </h3>
            {addOns.categories.map((category) => (
              <div key={category.title} style={{ marginBottom: "var(--space-5)" }}>
                <span
                  style={{
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-tertiary)",
                    display: "block",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  {category.title}
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="scope-list-item"
                      style={{
                        padding: "var(--space-2) 0",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "var(--space-3)",
                        color: "var(--color-text-primary)",
                        fontSize: "var(--font-size-base)",
                        lineHeight: 1.55,
                      }}
                    >
                      <PlusGlyph />
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div
              style={{
                marginTop: "auto",
                padding: "14px 16px",
                background: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border-light)",
                borderRadius: 14,
                fontSize: "0.92rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {addOns.note}
            </div>
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
              boxShadow: "0 10px 24px rgba(41, 193, 91, 0.25)",
            }}
          >
            Apply for a Free Website
          </Button>
        </div>
      </div>
    </section>
  );
}
