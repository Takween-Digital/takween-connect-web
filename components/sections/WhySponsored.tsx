"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cardHoverLift, fadeInOnScroll, prefersReducedMotion } from "@/lib/gsap";
import { whyItsSponsored } from "@/lib/content/landing";

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="var(--color-accent-dark)" strokeWidth={2} strokeLinecap="round">
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="var(--color-accent-dark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l5-5 4 4 7-8" />
      <path d="M15 8h5v5" />
    </svg>
  );
}

function WhyCard({
  icon,
  heading,
  body,
  accentColor,
  className,
}: {
  icon: React.ReactNode;
  heading: string;
  body: string;
  accentColor: string;
  className: string;
}) {
  return (
    <div
      className={className}
      onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
      onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
      style={{
        background: "var(--color-surface-base)",
        border: "1px solid var(--color-border-light)",
        borderTop: `4px solid ${accentColor}`,
        borderRadius: "var(--radius-2xl)",
        padding: "var(--space-8) var(--space-6)",
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        textAlign: "left",
      }}
    >
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
        {icon}
      </span>
      <div>
        <h3 style={{ fontSize: "var(--font-size-xl)", color: "#0f172a", marginBottom: "var(--space-2)" }}>
          {heading}
        </h3>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-base)", lineHeight: 1.55, margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/**
 * Two-card comparison — matches docs/index.html's `why-grid` section
 * exactly. Replaces an earlier high-contrast dark-gradient banner
 * version (shield illustration, exchange glyph, bulleted panels) that
 * predated the docs/index.html redesign and had no equivalent there.
 */
export function WhySponsored() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".why-panel-left", ".why-sponsored-grid", {
        duration: 0.55,
        start: "top 75%",
      });
      fadeInOnScroll(".why-panel-right", ".why-sponsored-grid", {
        duration: 0.55,
        start: "top 75%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id={whyItsSponsored.id}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface-base)",
        padding: "var(--space-12) var(--space-8)",
      }}
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.7vw, 3.9rem)" }}>
            A genuine exchange <span style={{ color: "var(--color-accent)" }}>not a hidden upsell.</span>
          </h2>
          <p style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-base)", margin: 0 }}>
            {whyItsSponsored.intro}
          </p>
        </div>

        <div
          className="why-sponsored-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "var(--space-6)",
          }}
        >
          <WhyCard
            className="why-panel-left"
            icon={<PlusIcon />}
            heading={whyItsSponsored.youGet.heading}
            body={whyItsSponsored.youGet.body}
            accentColor="var(--color-accent)"
          />
          <WhyCard
            className="why-panel-right"
            icon={<TrendingUpIcon />}
            heading={whyItsSponsored.weGet.heading}
            body={whyItsSponsored.weGet.body}
            accentColor="#9ca3af"
          />
        </div>
      </div>
    </section>
  );
}
