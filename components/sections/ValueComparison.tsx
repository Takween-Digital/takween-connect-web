"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cardHoverLift, fadeInOnScroll, gsap, prefersReducedMotion } from "@/lib/gsap";
import { marketValueComparison } from "@/lib/config";
import { valueComparison } from "@/lib/content/landing";

/**
 * "Agency build vs £0" comparison from the docs/index.html redesign.
 * The agency price range is a real-world market claim, not something we
 * can verify ourselves, so it stays behind marketValueComparison.approved
 * (lib/config.ts) — flip that once Takween confirms £2,000–£5,000 is a
 * genuine range to publish. Until then this renders the same layout with
 * non-numeric copy instead of a specific figure, so nothing false ships.
 */
export function ValueComparison() {
  const { agency, free } = valueComparison;
  const agencyPriceLabel = marketValueComparison.approved
    ? `${marketValueComparison.currency}${marketValueComparison.agencyLow.toLocaleString()}–${marketValueComparison.currency}${marketValueComparison.agencyHigh.toLocaleString()}`
    : agency.fallbackPrice;

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".value-agency-card, .value-free-card", ".ui-value-wrap", {
        stagger: 0.12,
        duration: 0.5,
        start: "top 75%",
      });
      fadeInOnScroll(".value-price", ".ui-value-wrap", {
        stagger: 0.12,
        duration: 0.5,
        delay: 0.15,
        start: "top 75%",
      });

      // "VS" breathes gently forever once mounted — purely decorative, same
      // reasoning as FinalCta's aurora loop (this section's own visibility
      // is already gated by the outer page scroll).
      gsap.to(".ui-value-vs", {
        scale: 1.18,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // £0 card: one-time glow pulse (not looping — a permanent pulse would
      // read as an alert state, not an accent) to draw the eye to the
      // "winning" card right after it lands. A dedicated layer rather than
      // tweening box-shadow directly — GSAP's CSSPlugin doesn't reliably
      // interpolate multi-part box-shadow strings (see AfterLaunchCards'
      // now-removed equivalent for the same note).
      gsap
        .timeline({
          delay: 0.9,
          scrollTrigger: { trigger: ".value-free-card", start: "top 75%" },
        })
        .to(".value-free-glow", { opacity: 0.5, duration: 0.5, ease: "power2.out" })
        .to(".value-free-glow", { opacity: 0, duration: 0.9, ease: "power2.in" });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={valueComparison.id}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface-base)",
        padding: "var(--space-16) var(--space-8)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ marginBottom: "var(--space-4)", fontSize: "clamp(2rem, 3.7vw, 3.9rem)" }}>
          A professional website for your Halal business can cost you{" "}
          <span style={{ color: "var(--color-accent)" }}>thousands.</span>
        </h2>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-base)",
            maxWidth: 620,
            margin: "0 auto var(--space-10)",
            lineHeight: 1.6,
          }}
        >
          {valueComparison.intro}
        </p>

        <div
          className="ui-value-wrap"
          style={{
            display: "grid",
            gap: "var(--space-6)",
            alignItems: "center",
          }}
        >
          {/* Agency card */}
          <div
            className="value-agency-card"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              padding: "var(--space-8) var(--space-6)",
              textAlign: "center",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-neutral-400)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <p style={{ fontWeight: 800, color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
              {agency.label}
            </p>
            <div
              className="value-price"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-neutral-600)",
                margin: "var(--space-2) 0",
              }}
            >
              {agencyPriceLabel}
            </div>
            <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{agency.description}</p>
          </div>

          <div
            aria-hidden="true"
            className="ui-value-vs"
            style={{
              fontWeight: 800,
              // --color-neutral-400 (used elsewhere for decorative borders)
              // is only ~2.5:1 against white — fails AA for this real text
              // node. --color-neutral-600 keeps it visually secondary while
              // passing comfortably (axe-verified, see Phase 5 QA pass).
              color: "var(--color-neutral-600)",
              fontSize: "var(--font-size-lg)",
            }}
          >
            VS
          </div>

          {/* Free card */}
          <div
            className="value-free-card"
            onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
            onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
            style={{
              position: "relative",
              padding: "var(--space-8) var(--space-6)",
              textAlign: "center",
              background: "var(--color-surface-base)",
              border: "1px solid var(--color-border-light)",
              borderTop: "4px solid var(--color-accent)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div
              className="value-free-glow"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -14,
                borderRadius: "calc(var(--radius-2xl) + 14px)",
                background: "var(--color-accent)",
                filter: "blur(24px)",
                opacity: 0,
                zIndex: -1,
              }}
            />
            <p style={{ fontWeight: 800, color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
              {free.label}
            </p>
            <div
              className="value-price"
              style={{
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--color-accent)",
                margin: "var(--space-2) 0",
              }}
            >
              {free.price}
            </div>
            <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>{free.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
