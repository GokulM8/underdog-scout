"use client";

import { useMemo, useState } from "react";
import { GROUPS, SCOREBOARD_MATCHES, ScoreboardStatus } from "@/lib/scoreboardData";
import ScoreboardMatchCard from "./ScoreboardMatchCard";

const TABS: { key: ScoreboardStatus; label: string }[] = [
  { key: "live", label: "LIVE" },
  { key: "completed", label: "COMPLETED" },
  { key: "upcoming", label: "UPCOMING" },
];

type GroupFilter = "all" | "underdogs" | (typeof GROUPS)[number];

export default function ScoreboardClient() {
  const [tab, setTab] = useState<ScoreboardStatus>("live");
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("all");

  const filtered = useMemo(() => {
    return SCOREBOARD_MATCHES.filter((m) => {
      if (m.status !== tab) return false;
      if (groupFilter === "all") return true;
      if (groupFilter === "underdogs") return m.isUnderdogMatch;
      return m.group === groupFilter;
    });
  }, [tab, groupFilter]);

  const groupedByGroup = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const match of filtered) {
      const list = map.get(match.group) ?? [];
      list.push(match);
      map.set(match.group, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <div className="flex justify-center gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-display text-sm tracking-widest px-5 py-2 rounded-sm border transition-colors ${
              tab === t.key
                ? "bg-gold text-background border-gold"
                : "text-foreground/60 border-white/15 hover:border-gold/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <FilterChip label="All Groups" active={groupFilter === "all"} onClick={() => setGroupFilter("all")} />
        <FilterChip
          label="Underdog Matches Only"
          active={groupFilter === "underdogs"}
          onClick={() => setGroupFilter("underdogs")}
        />
        {GROUPS.map((g) => (
          <FilterChip
            key={g}
            label={`Group ${g}`}
            active={groupFilter === g}
            onClick={() => setGroupFilter(g)}
          />
        ))}
      </div>

      <div key={`${tab}-${groupFilter}`} className="animate-fade-in">
        {filtered.length === 0 ? (
          <div className="rounded-sm border border-white/10 p-10 text-center text-foreground/50">
            No matches in this filter right now.
          </div>
        ) : tab === "completed" ? (
          <div className="space-y-10">
            {groupedByGroup.map(([group, matches]) => (
              <div key={group}>
                <p className="font-display text-sm text-gold tracking-widest mb-3">
                  GROUP {group}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {matches.map((match) => (
                    <ScoreboardMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((match) => (
              <ScoreboardMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-display tracking-wide px-3 py-1 rounded-full border whitespace-nowrap transition-colors ${
        active
          ? "bg-gold text-background border-gold"
          : "text-foreground/60 border-white/15 hover:border-gold/40"
      }`}
    >
      {label}
    </button>
  );
}
