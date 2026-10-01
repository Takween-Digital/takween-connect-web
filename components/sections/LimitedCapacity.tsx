import { limitedCapacity } from "@/lib/content/landing";
import { getAcceptedCountThisMonth } from "@/lib/db/queries";
import { CapacityRingAnimated } from "./CapacityRingAnimated";

/**
 * The ring shows real spots-remaining data from D1 (see
 * getAcceptedCountThisMonth), not a fixed figure — this is why the
 * homepage route is marked force-dynamic (see app/(marketing)/page.tsx),
 * so it's read fresh on every request rather than frozen at build time.
 */
export async function LimitedCapacity() {
  const acceptedThisMonth = await getAcceptedCountThisMonth();
  const remaining = Math.max(0, limitedCapacity.count - acceptedThisMonth);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "var(--space-12) var(--space-8)",
        background: "#fafaf7",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 640,
          margin: "0 auto",
          background: "var(--color-surface-base)",
          border: "1px solid var(--color-border-light)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-xl)",
          padding: "var(--space-8) var(--space-6)",
        }}
      >
        {/* Live Cohort Status Pill */}
        <div style={{ marginBottom: "var(--space-3)" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-1) var(--space-4)",
              borderRadius: "var(--radius-full)",
              background: "rgba(39, 168, 238, 0.08)",
              border: "1px solid rgba(39, 168, 238, 0.3)",
              color: "var(--color-accent)",
              fontSize: "var(--font-size-xs)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "var(--radius-full)",
                background: "var(--color-accent)",
                boxShadow: "0 0 0 2px rgba(39, 168, 238, 0.2)",
              }}
            />
            Cohort Status: Applications Open
          </span>
        </div>

        <h2
          style={{
            margin: "0 auto var(--space-6)",
            maxWidth: 540,
            fontSize: "clamp(2rem, 3vw, 3rem)",
            lineHeight: 1.08,
          }}
        >
          We currently offer up to 5 free websites per month.
        </h2>

        {/* Capacity Ring */}
        <div style={{ margin: "var(--space-2) auto" }}>
          <CapacityRingAnimated total={limitedCapacity.count} remaining={remaining} />
        </div>

        {/* Statement & Subtext */}
        <p
          style={{
            fontSize: "1.1rem",
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
            fontWeight: 800,
            margin: "var(--space-6) 0 var(--space-2)",
            lineHeight: 1.35,
          }}
        >
          {remaining} of {limitedCapacity.count} places currently available
        </p>
      </div>
    </section>
  );
}

