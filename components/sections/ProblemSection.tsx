"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cardHoverLift, fadeInOnScroll, gsap, prefersReducedMotion } from "@/lib/gsap";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";

/** Self-authored "word of mouth" glyph — no single brand to borrow, so
 * this follows the same solid-circle-badge language as InstagramIcon/
 * WhatsAppIcon (a distinct blue, --color-info, to sit apart from
 * Instagram's gradient and WhatsApp's green) rather than the generic
 * outline icon docs/index.html used as a placeholder here. */
function WordOfMouthIcon({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size}>
      <circle cx="12" cy="12" r="11" fill="var(--color-info)" />
      <path
        d="M6 9.5a3 3 0 0 1 3-3h1.5a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H9l-2.2 1.7c-.3.25-.8.03-.8-.36V13a3 3 0 0 1 0-3.5Z"
        fill="white"
      />
      <path
        d="M14 8.3c.3-.1.66-.16 1-.16h1a3 3 0 0 1 3 3v.7a3 3 0 0 1-2.2 2.9l.1 1.56c.02.35-.36.6-.66.4L14.8 15.5"
        fill="none"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SourceCard {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const SOURCE_CARDS: SourceCard[] = [
  {
    icon: <InstagramIcon size={44} />,
    title: "Instagram",
    text: "Good for content, but not a complete business presence.",
  },
  {
    icon: <WhatsAppIcon size={44} />,
    title: "WhatsApp",
    text: "Great for messages, but weak for first-time trust.",
  },
  {
    icon: <WordOfMouthIcon size={44} />,
    title: "Word of mouth",
    text: "Referrals help, but new customers still check you online.",
  },
];

function ArrowDownIcon() {
  return (
    <svg aria-hidden="true" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v14M6 12l6 6 6-6" />
    </svg>
  );
}

const SEARCH_QUERIES = [
  "Halal restaurants near me",
  "Hijab shops in Birmingham",
  "Muslim barbers in Manchester",
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

/**
 * Below-the-fold section, so unlike Hero.tsx this doesn't need a static
 * .hero-anim-init-style hidden class — by the time a user scrolls this
 * far, hydration has essentially always finished, so gsap.from()'s
 * "instant snap to the from-state, then animate to whatever's already
 * in the DOM" is safe: worst case is an imperceptible flash, and under
 * prefersReducedMotion() the early return just leaves the natural
 * (visible) DOM state alone. Same pattern as GSAPReveal.tsx.
 */
export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      fadeInOnScroll(".problem-source-card", ".problem-source-grid", {
        stagger: 0.1,
        duration: 0.55,
        start: "top 75%",
      });

      gsap.to(".problem-arrow", {
        y: 8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Search chip cycles through a few example queries as a genuine
      // typewriter — types each phrase out character by character, holds,
      // backspaces it, then types the next. A blinking caret sells the
      // "live search box" feel without the flat highlight-sweep this
      // replaced. One looping timeline (no recursive self-scheduling) so
      // useGSAP's context cleanly kills the whole cycle on unmount.
      const queryEl = sectionRef.current?.querySelector<HTMLElement>(".problem-search-query");
      if (queryEl) {
        const cycleTl = gsap.timeline({
          repeat: -1,
          scrollTrigger: { trigger: ".problem-search-box", start: "top 75%" },
        });

        SEARCH_QUERIES.forEach((query) => {
          const typeProxy = { chars: 0 };
          cycleTl
            .to(typeProxy, {
              chars: query.length,
              duration: query.length * 0.025,
              ease: "none",
              onUpdate: () => {
                queryEl.textContent = query.slice(0, Math.round(typeProxy.chars));
              },
            })
            .to({}, { duration: 1.3 }) // hold the finished phrase on screen
            .to(typeProxy, {
              chars: 0,
              duration: query.length * 0.022,
              ease: "none",
              onUpdate: () => {
                queryEl.textContent = query.slice(0, Math.round(typeProxy.chars));
              },
            })
            .to({}, { duration: 0.3 }); // brief pause on the empty box before the next phrase
        });
      }

      // Caret blinks continuously alongside the typing, independent of
      // which phrase is mid-type/delete — same idle-loop pattern as
      // FinalCta's aurora.
      gsap.to(".problem-search-caret", {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      fadeInOnScroll(".problem-callout-negative", ".problem-callout-negative", {
        duration: 0.45,
        start: "top 85%",
      });
      fadeInOnScroll(".problem-callout-positive", ".problem-callout-positive", {
        duration: 0.45,
        delay: 0.12,
        start: "top 85%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--color-surface-base)",
        padding: "var(--space-16) var(--space-8) var(--space-12)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            marginBottom: "var(--space-4)",
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "clamp(2rem, 3.7vw, 3.9rem)",
          }}
        >
          Your customers already look for{" "}
          <span style={{ color: "var(--color-accent)" }}>Muslim businesses</span> like yours online.
        </h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-base)", maxWidth: 560, margin: "0 auto var(--space-10)", lineHeight: 1.6 }}>
          The problem is what they see when they search for a Muslim-owned business like yours.
        </p>

        {/* Source cards */}
        <div
          className="problem-source-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "var(--space-5)",
            marginBottom: "var(--space-8)",
          }}
        >
          {SOURCE_CARDS.map((card) => (
            <div
              key={card.title}
              className="problem-source-card"
              onMouseEnter={(e) => cardHoverLift(e.currentTarget, true)}
              onMouseLeave={(e) => cardHoverLift(e.currentTarget, false)}
              style={{
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-border-light)",
                borderRadius: "var(--radius-2xl)",
                padding: "var(--space-6) var(--space-5)",
                boxShadow: "var(--shadow-xl)",
                textAlign: "center",
              }}
            >
              <div style={{ display: "grid", placeItems: "center", margin: "0 auto var(--space-4)" }}>
                {card.icon}
              </div>
              <h3 style={{ marginBottom: "var(--space-1)" }}>{card.title}</h3>
              <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "var(--font-size-sm)" }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <div className="problem-arrow" style={{ display: "grid", placeItems: "center", margin: "var(--space-2) 0 var(--space-8)" }}>
          <ArrowDownIcon />
        </div>

        {/* Search box */}
        <div
          className="problem-search-box"
          style={{
            maxWidth: 560,
            margin: "0 auto var(--space-5)",
            padding: "var(--space-6)",
            border: "1px solid var(--color-border-light)",
            borderRadius: "var(--radius-2xl)",
            background: "var(--color-surface-base)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          <p style={{ fontWeight: 800, marginBottom: "var(--space-4)" }}>Then they search for a business like yours.</p>
          <span
            className="problem-search-field"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-2)",
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid var(--color-border-medium)",
              borderRadius: "var(--radius-full)",
              padding: "var(--space-2) var(--space-4)",
              background: "var(--color-surface-base)",
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-sm)",
              textAlign: "left",
            }}
          >
            <span style={{ display: "inline-flex", flexShrink: 0, marginTop: 2 }}>
              <SearchIcon />
            </span>
            {/* Hidden copies of every query reserve the max width/height, so
                wrapping on a space at the end of a phrase cannot resize this
                chip or shove the callouts below. The live typewriter sits on
                the same grid cell. */}
            <span
              className="problem-search-slot"
              style={{
                display: "grid",
                flex: 1,
                minWidth: 0,
                justifyItems: "start",
                alignItems: "start",
              }}
            >
              {SEARCH_QUERIES.map((query) => (
                <span
                  key={query}
                  aria-hidden="true"
                  className="problem-search-sizer"
                  style={{
                    gridArea: "1 / 1",
                    visibility: "hidden",
                    pointerEvents: "none",
                    whiteSpace: "normal",
                  }}
                >
                  {query}
                </span>
              ))}
              <span style={{ gridArea: "1 / 1", minWidth: 0 }}>
                <span className="problem-search-query">{SEARCH_QUERIES[0]}</span>
                <span
                  className="problem-search-caret"
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: 1,
                    height: "1em",
                    background: "var(--color-text-tertiary)",
                    marginLeft: 1,
                    verticalAlign: "-0.1em",
                  }}
                />
              </span>
            </span>
          </span>
        </div>

        {/* Result callouts */}
        <div
          className="problem-callout-negative"
          style={{ maxWidth: 700, margin: "0 auto var(--space-4)", padding: 22, borderRadius: "var(--radius-lg)", background: "#fff1f2", border: "1px solid #fecdd3" }}
        >
          <p style={{ margin: 0, fontWeight: 700, fontSize: "1.08rem", color: "#b91c1c" }}>
            If they cannot find a proper website, you can look harder to trust than you really are.
          </p>
        </div>
        <div
          className="problem-callout-positive"
          style={{ maxWidth: 700, margin: "0 auto", padding: 22, borderRadius: "var(--radius-lg)", background: "var(--color-accent-pale)", border: "1px solid var(--color-primary-light)" }}
        >
          <p style={{ margin: 0, fontWeight: 700, fontSize: "1.08rem", color: "var(--color-accent-dark)" }}>
            So they may choose a competitor who looks clearer and more established online.
          </p>
        </div>
      </div>
    </section>
  );
}
