"use client";

import { useState } from "react";
import { Nation } from "@/lib/types";
import GraniteInsightBox from "./GraniteInsightBox";

interface NationBrief {
  overview: string;
  strengths: string[];
  weaknesses: string[];
  qualification: string;
  advancement_chances: string;
}

export default function NationBriefClient({ nations }: { nations: Nation[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brief, setBrief] = useState<NationBrief | null>(null);

  const selected = nations.find((n) => n.slug === selectedSlug) ?? null;

  async function handleSelect(nation: Nation) {
    setSelectedSlug(nation.slug);
    setLoading(true);
    setError(null);
    setBrief(null);
    try {
      const res = await fetch("/api/nation-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nation: nation.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate the brief.");
      setBrief(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-2">
        {nations.map((nation) => (
          <button
            key={nation.slug}
            onClick={() => handleSelect(nation)}
            className={`font-display text-sm tracking-wide px-4 py-2 rounded-full border transition-colors ${
              selectedSlug === nation.slug
                ? "bg-gold text-background border-gold"
                : "text-foreground/70 border-white/15 hover:border-gold/40"
            }`}
          >
            {nation.flag} {nation.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="FIFA Ranking" value={`#${selected.fifaRanking}`} />
            <StatCard
              label="Population"
              value={selected.population ?? `${(selected.populationValue / 1_000_000).toFixed(1)}M`}
            />
            <StatCard
              label="Advance Odds"
              value={loading ? "…" : brief?.advancement_chances || "—"}
              small
            />
          </div>

          <GraniteInsightBox title="AI NATION BRIEF" poweredBy="GROQ" loading={loading} error={error}>
            {brief && (
              <div className="space-y-6">
                <p className="text-foreground/90 leading-relaxed">{brief.overview}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="font-display text-sm text-gold tracking-wide mb-2">STRENGTHS</p>
                    <ul className="space-y-1.5">
                      {brief.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex gap-2">
                          <span className="text-gold">+</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-display text-sm text-red-400 tracking-wide mb-2">
                      WEAKNESSES
                    </p>
                    <ul className="space-y-1.5">
                      {brief.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex gap-2">
                          <span className="text-red-400">−</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="font-display text-sm text-gold tracking-wide mb-2">
                    QUALIFICATION JOURNEY
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {brief.qualification}
                  </p>
                </div>
              </div>
            )}
          </GraniteInsightBox>
        </div>
      )}

      {!selected && (
        <p className="text-center text-foreground/50 text-sm">
          Select a nation above to generate its AI scouting brief.
        </p>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/30 p-3 text-center">
      <p className={`font-display text-gold ${small ? "text-sm" : "text-2xl"}`}>{value}</p>
      <p className="text-[10px] text-foreground/50 uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}
