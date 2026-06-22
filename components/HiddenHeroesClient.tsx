"use client";

import { useEffect, useState } from "react";
import type { HiddenHero } from "@/lib/types";
import GraniteInsightBox from "./GraniteInsightBox";

const BADGE_STYLES: Record<string, string> = {
  MVP: "bg-gold text-background",
  "Rising Star": "bg-deep-green text-foreground border border-gold/40",
  "Breakout Pick": "bg-amber-600 text-white",
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function HiddenHeroesClient({ nationName }: { nationName: string }) {
  const [heroes, setHeroes] = useState<HiddenHero[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/hidden-heroes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nation: nationName }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to find hidden heroes.");
        if (!cancelled) setHeroes(data.heroes);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [nationName]);

  return (
    <GraniteInsightBox
      title="HIDDEN HERO FINDER"
      poweredBy="GROQ"
      loading={loading}
      error={error}
    >
      {heroes && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {heroes.map((hero, i) => (
            <div
              key={i}
              className="rounded-sm border border-white/10 bg-black/30 p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gold/15 text-gold font-display text-sm flex items-center justify-center shrink-0">
                  {initials(hero.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-medium truncate">{hero.name}</p>
                  <p className="text-xs text-foreground/50 truncate">
                    {hero.position} · {hero.club}
                  </p>
                </div>
              </div>

              <span
                className={`self-start text-[10px] font-display px-2 py-0.5 rounded-sm tracking-wide ${
                  BADGE_STYLES[hero.badge_type] ?? "bg-white/10 text-foreground/70"
                }`}
              >
                {hero.badge_type.toUpperCase()}
              </span>

              <p className="text-sm text-foreground/80 leading-relaxed flex-1">
                {hero.description}
              </p>

              <div className="flex items-center justify-between text-xs text-foreground/60 border-t border-white/10 pt-2">
                <span>{hero.goals} G</span>
                <span>{hero.assists} A</span>
                <span>Age {hero.age}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </GraniteInsightBox>
  );
}
