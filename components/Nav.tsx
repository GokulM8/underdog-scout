"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/predictor", label: "Predictor" },
  { href: "/live", label: "Live" },
  { href: "/scoreboard", label: "Scoreboard" },
  { href: "/brief", label: "Brief" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-gold/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-3">
        <Link
          href="/"
          className="font-display text-2xl sm:text-3xl text-gold tracking-wide shrink-0"
        >
          UNDERDOG <span className="text-foreground">SCOUT</span>
        </Link>
        <div className="flex gap-1 sm:gap-2 overflow-x-auto">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm sm:text-base px-2.5 sm:px-4 py-2 tracking-wide transition-colors whitespace-nowrap ${
                  active
                    ? "text-background bg-gold rounded-sm"
                    : "text-foreground/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
