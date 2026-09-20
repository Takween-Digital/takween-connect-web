interface AmbientParallaxBgProps {
  /** Path to SVG in public/ (e.g. "/images/bg-problem.svg") */
  src: string;
  /** Opacity of the background layer (0 to 1, default: 0.8) */
  opacity?: number;
  /** Kept for callers; parallax translation is intentionally disabled. */
  shiftPercent?: number;
  /** Optional custom styling on the outer container */
  className?: string;
  /** Optional style overrides for background sizing */
  backgroundSize?: string;
  /** Optional style overrides for background position */
  backgroundPosition?: string;
}

/**
 * Ambient background layer behind a section. It stays pinned to the
 * section — no scroll-scrubbed yPercent, which previously made the
 * page look like whole sections were drifting.
 */
export function AmbientParallaxBg({
  src,
  opacity = 0.8,
  className = "",
  backgroundSize = "contain",
  backgroundPosition = "center center",
}: AmbientParallaxBgProps) {
  return (
    <div
      aria-hidden="true"
      className={["ambient-parallax-wrap", className].filter(Boolean).join(" ")}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition,
          backgroundSize,
          opacity,
        }}
      />
    </div>
  );
}
