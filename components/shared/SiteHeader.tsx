import Link from "next/link";
import { Logo } from "./Logo";
import { DesktopHeaderNav } from "./DesktopHeaderNav";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui";
import { brand } from "@/lib/config";

export function SiteHeader() {
  return (
    <header
      className="ui-site-header"
      style={{
        // padding: "var(--space-4) var(--space-8)",
        padding: "1rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid var(--color-border-light)",
        minWidth: 0,
        background: "var(--color-surface-base)",
        position: "relative",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        aria-label={`${brand.name} — home`}
        className="ui-site-logo-link"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
      >
        <Logo size={32} animated showWordmark />
      </Link>
      <nav
        className="ui-header-actions"
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
      >
        <DesktopHeaderNav />
        <Button
          href="/apply"
          variant="primary"
          className="ui-header-cta"
        >
          Apply Now
        </Button>
        <MobileNav />
      </nav>
    </header>
  );
}

