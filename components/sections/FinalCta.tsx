import { Button } from "@/components/ui";
import { finalCta } from "@/lib/content/landing";

const REASSURANCE_CHIPS = [
  "Selected businesses only",
  "No hidden obligation",
  "Limited monthly places",
];

export function FinalCta() {
  return (
    <section
      id={finalCta.id}
      style={{
        padding: "var(--space-16) 0",
        background: "#fff",
      }}
    >
      <div className="final-cta-container" style={{ width: "min(1180px, calc(100% - var(--space-8) * 2))", margin: "0 auto" }}>
        <div
          className="final-cta-card"
          style={{
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            padding: "52px 36px",
            border: "1px solid var(--color-border-light)",
            borderRadius: 28,
            background:
              "radial-gradient(circle at 85% 20%, rgba(34, 197, 94, 0.15), transparent 24%), #fff",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          {/* Headline */}
          <h2
            style={{
              // maxWidth: 800,
              margin: "0 auto var(--space-4)",
              color: "var(--color-text-primary)",
              fontSize: "clamp(2rem, 3.7vw, 3.9rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Give your business a website that{" "}
            <span style={{ color: "var(--color-accent)" }}>
              looks as established as you are.
            </span>
          </h2>

          <p
            style={{
              fontSize: "1.06rem",
              color: "var(--color-text-tertiary)",
              maxWidth: 760,
              margin: "0 auto var(--space-6)",
              lineHeight: 1.65,
            }}
          >
            Selected UK Muslim-owned businesses. A starter website that can often cost
            £2,000–£5,000 elsewhere, with £0 development cost for the agreed free scope. No
            obligation to buy extra services.
          </p>

          {/* Reassurance Chips */}
          <div
            className="final-cta-chips"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginBottom: "var(--space-6)",
            }}
          >
            {REASSURANCE_CHIPS.map((chip) => (
              <span
                key={chip}
                className="final-cta-chip"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  background: "#fff",
                  border: "1px solid var(--color-border-light)",
                  borderRadius: "var(--radius-full)",
                  padding: "8px 14px",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
              >
                <span aria-hidden="true" style={{ color: "var(--color-accent)", fontWeight: 800 }}>✓</span>
                <span>{chip}</span>
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="final-cta-btn-wrap" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Button
              href="/apply"
              variant="primary"
              className="final-cta-btn"
              style={{
                background: "var(--color-accent)",
                color: "white",
                fontWeight: 800,
                fontSize: "1rem",
                minHeight: 50,
                padding: "0 28px",
                borderRadius: 12,
                boxShadow: "0 10px 24px rgba(41, 193, 91, 0.25)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                whiteSpace: "nowrap",
                margin: "0 auto",
              }}
            >
              <span>{finalCta.ctaLabel}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
