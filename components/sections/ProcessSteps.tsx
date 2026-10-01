"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { fadeInOnScroll, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui";
import { processSteps } from "@/lib/content/landing";
import { AmbientParallaxBg } from "@/components/shared/AmbientParallaxBg";

function StepCard({
  item,
  index,
}: {
  item: { step: string; description: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="process-step-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-2xl)",
        padding: "var(--space-6) var(--space-5)",
        background: "var(--color-surface-base)",
        boxShadow: hovered ? "var(--shadow-xl-hover)" : "var(--shadow-xl)",
        transform: hovered ? "translateY(-5px)" : "none",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top row: step number badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "var(--space-4)",
        }}
      >
        <span
          aria-hidden="true"
          className="process-step-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.1rem",
            height: "2.1rem",
            borderRadius: "var(--radius-full)",
            background: "var(--color-accent)",
            color: "white",
            fontWeight: 900,
            fontSize: "var(--font-size-sm)",
            flexShrink: 0,
          }}
        >
          {index + 1}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          marginBottom: "var(--space-2)",
          fontSize: "20px",
          // fontWeight: 700,
          color: "#0f172a",
          lineHeight: 1.3,
        }}
      >
        {item.step}
      </h3>

      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-base)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </li>
  );
}

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".process-step-item", ".process-step-grid", {
        stagger: 0.08,
        duration: 0.5,
        start: "top 85%",
      });
    },
    { scope: sectionRef, dependencies: [processSteps.steps.length] }
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "var(--space-12) var(--space-8)",
        background: "var(--color-surface-base)",
      }}
    >
      <AmbientParallaxBg src="/images/bg-process.svg" opacity={0.55} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 960, margin: "0 auto" }}>
        {/* Centered Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
          <h2 style={{ marginBottom: "var(--space-2)", fontSize: "clamp(2rem, 3.7vw, 3.9rem)" }}>
            A <span style={{ color: "var(--color-accent)" }}>simple 4-step</span> process.
          </h2>
          <p
            style={{
              color: "var(--color-text-tertiary)",
              fontSize: "var(--font-size-base)",
              margin: 0,
            }}
          >
            {processSteps.subtitle}
          </p>
        </div>

        {/* Step Grid (4 desktop, 2 tablet, 1 mobile) */}
        <ol
          className="process-step-grid"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "var(--space-5)",
          }}
        >
          {processSteps.steps.map((item, index) => (
            <StepCard key={item.step} item={item} index={index} />
          ))}
        </ol>

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
            Apply for a Free Website
          </Button>
        </div>
      </div>
    </section>
  );
}
