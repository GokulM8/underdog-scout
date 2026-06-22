"use client";

import { useEffect, useRef, useState } from "react";
import { NormalizedMatch } from "@/lib/footballData";
import { findNationByTeamName } from "@/lib/nations";
import LiveDot from "./LiveDot";

const REFRESH_SECONDS = 30;

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  LIVE: { label: "LIVE", className: "bg-red-600/20 text-red-400 border border-red-500/40" },
  IN_PLAY: { label: "LIVE", className: "bg-red-600/20 text-red-400 border border-red-500/40" },
  PAUSED: { label: "HT", className: "bg-red-600/20 text-red-400 border border-red-500/40" },
  FINISHED: { label: "FT", className: "bg-gold/15 text-gold border border-gold/40" },
  SCHEDULED: { label: "UPCOMING", className: "bg-white/10 text-foreground/70" },
  TIMED: { label: "UPCOMING", className: "bg-white/10 text-foreground/70" },
  POSTPONED: { label: "POSTPONED", className: "bg-white/10 text-foreground/50" },
  CANCELLED: { label: "CANCELLED", className: "bg-white/10 text-foreground/50" },
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live Now" },
  { key: "underdogs", label: "Underdogs" },
  { key: "completed", label: "Completed" },
  { key: "upcoming", label: "Upcoming" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function isLiveStatus(status: string) {
  return status === "LIVE" || status === "IN_PLAY" || status === "PAUSED";
}

function isUpset(match: NormalizedMatch): boolean {
  if (!match.underdogSide) return false;
  if (!isLiveStatus(match.status) && match.status !== "FINISHED") return false;
  if (match.homeScore == null || match.awayScore == null) return false;
  const underdogScore = match.underdogSide === "home" ? match.homeScore : match.awayScore;
  const opponentScore = match.underdogSide === "home" ? match.awayScore : match.homeScore;
  return underdogScore >= opponentScore;
}

function matchesFilter(match: NormalizedMatch, filter: FilterKey): boolean {
  switch (filter) {
    case "all":
      return true;
    case "live":
      return isLiveStatus(match.status);
    case "underdogs":
      return match.isUnderdogMatch;
    case "completed":
      return match.status === "FINISHED";
    case "upcoming":
      return match.status === "SCHEDULED" || match.status === "TIMED";
  }
}

function teamBadge(teamName: string): "DEBUT" | "RETURN" | null {
  const nation = findNationByTeamName(teamName);
  if (!nation) return null;
  return nation.isDebut ? "DEBUT" : nation.lastWorldCup ? "RETURN" : null;
}

function teamFlag(teamName: string): string | null {
  return findNationByTeamName(teamName)?.flag ?? null;
}

export default function LiveScoresClient() {
  const [matches, setMatches] = useState<NormalizedMatch[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_SECONDS);
  const [flashIds, setFlashIds] = useState<Set<number>>(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const previousScores = useRef<Map<number, string>>(new Map());

  async function load() {
    try {
      const res = await fetch("/api/live-scores");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load live scores.");
      const newMatches: NormalizedMatch[] = data.matches;

      const changed = new Set<number>();
      newMatches.forEach((m) => {
        const key = `${m.homeScore}-${m.awayScore}`;
        const prev = previousScores.current.get(m.id);
        if (prev !== undefined && prev !== key) changed.add(m.id);
        previousScores.current.set(m.id, key);
      });

      setMatches(newMatches);
      setError(null);
      if (changed.size > 0) {
        setFlashIds(changed);
        setTimeout(() => setFlashIds(new Set()), 700);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
      setSecondsLeft(REFRESH_SECONDS);
      setRefreshKey((k) => k + 1);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, REFRESH_SECONDS * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 bg-white/5 rounded-sm border border-white/10" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-sm border border-red-500/30 bg-red-950/20 p-5 text-red-400 text-sm">
        Couldn&apos;t load live scores: {error}
        <p className="text-foreground/50 mt-2">
          Check that NEXT_PUBLIC_FOOTBALL_DATA_API_KEY is configured.
        </p>
      </div>
    );
  }

  const all = matches ?? [];

  if (all.length === 0) {
    return (
      <div className="rounded-sm border border-white/10 p-8 text-center text-foreground/50">
        No matches scheduled in the next 24 hours.
      </div>
    );
  }

  const filtered = all.filter((m) => matchesFilter(m, filter));
  const bannerUpset = all.find((m) => isUpset(m) && isLiveStatus(m.status));

  const liveMatches = filtered.filter((m) => isLiveStatus(m.status));
  const completedMatches = filtered.filter((m) => m.status === "FINISHED");
  const upcomingMatches = filtered.filter((m) => m.status === "SCHEDULED" || m.status === "TIMED");
  const otherMatches = filtered.filter(
    (m) =>
      !isLiveStatus(m.status) &&
      m.status !== "SCHEDULED" &&
      m.status !== "TIMED" &&
      m.status !== "FINISHED"
  );

  return (
    <div>
      <LiveTicker matches={all} />

      {bannerUpset && <UpsetBanner match={bannerUpset} />}

      <div className="flex items-center justify-between gap-3 flex-wrap mt-4 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-display text-xs tracking-wide px-3 py-1 rounded-full border whitespace-nowrap transition-colors ${
                filter === f.key
                  ? "bg-gold text-background border-gold"
                  : "text-foreground/60 border-white/15 hover:border-gold/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-foreground/50 shrink-0">
          Next update in <span className="text-gold font-medium">{secondsLeft}s</span>
        </div>
      </div>

      <div key={refreshKey} className="h-0.5 w-full bg-white/10 mb-5 overflow-hidden rounded-full">
        <div className="h-full bg-gold animate-countdown" />
      </div>

      <div className="space-y-6">
        {liveMatches.length > 0 && (
          <MatchGroup label="LIVE NOW" matches={liveMatches} flashIds={flashIds} />
        )}
        {completedMatches.length > 0 && (
          <MatchGroup label="COMPLETED" matches={completedMatches} flashIds={flashIds} />
        )}
        {upcomingMatches.length > 0 && (
          <MatchGroup label="UPCOMING TODAY" matches={upcomingMatches} flashIds={flashIds} />
        )}
        {otherMatches.length > 0 && (
          <MatchGroup label="OTHER" matches={otherMatches} flashIds={flashIds} />
        )}
        {filtered.length === 0 && (
          <div className="rounded-sm border border-white/10 p-8 text-center text-foreground/50">
            No matches in this filter right now.
          </div>
        )}
      </div>
    </div>
  );
}

function LiveTicker({ matches }: { matches: NormalizedMatch[] }) {
  const live = matches.filter((m) => isLiveStatus(m.status));
  const items =
    live.length > 0
      ? live.map((m) => `${m.homeTeam} ${m.homeScore ?? 0}–${m.awayScore ?? 0} ${m.awayTeam}`)
      : ["NO MATCHES LIVE RIGHT NOW"];
  const upset = matches.find((m) => isUpset(m) && isLiveStatus(m.status));
  if (upset) {
    items.push(`UPSET WATCH: ${upset.homeTeam} ${upset.homeScore ?? 0}–${upset.awayScore ?? 0} ${upset.awayTeam}`);
  }
  items.push("POWERED BY FOOTBALL-DATA.ORG");
  const looped = [...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-gold text-background rounded-sm">
      <div className="flex w-max animate-ticker py-1.5">
        {looped.map((text, i) => (
          <span
            key={i}
            className="font-display text-xs sm:text-sm px-5 whitespace-nowrap tracking-wide"
          >
            {text} <span className="mx-2">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function UpsetBanner({ match }: { match: NormalizedMatch }) {
  const underdogName = match.underdogSide === "home" ? match.homeTeam : match.awayTeam;
  const opponentName = match.underdogSide === "home" ? match.awayTeam : match.homeTeam;
  return (
    <div className="mt-4 flex items-center gap-3 bg-red-600 px-4 py-2.5 rounded-sm animate-slide-in-top">
      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse-red shrink-0" />
      <div>
        <p className="font-display text-sm text-white tracking-wide">
          UPSET ALERT — {underdogName} {isLiveStatus(match.status) ? "holding" : "beating"} {opponentName}{" "}
          {match.homeScore ?? 0}–{match.awayScore ?? 0}
        </p>
        <p className="text-[10px] text-white/80">{match.competition}</p>
      </div>
    </div>
  );
}

function MatchGroup({
  label,
  matches,
  flashIds,
}: {
  label: string;
  matches: NormalizedMatch[];
  flashIds: Set<number>;
}) {
  return (
    <div>
      <p className="font-display text-xs text-foreground/50 tracking-widest mb-2">{label}</p>
      <div className="space-y-3">
        {matches.map((match) => (
          <MatchRow key={match.id} match={match} flashing={flashIds.has(match.id)} />
        ))}
      </div>
    </div>
  );
}

function MatchRow({ match, flashing }: { match: NormalizedMatch; flashing: boolean }) {
  const badge = STATUS_BADGE[match.status] ?? {
    label: match.status,
    className: "bg-white/10 text-foreground/70",
  };
  const upset = isUpset(match);

  return (
    <div
      className={`rounded-sm border p-4 relative ${
        match.isUnderdogMatch ? "border-gold/50 bg-gold/5" : "border-white/10"
      } ${upset ? "animate-upset-pulse" : ""} ${flashing ? "animate-score-flash" : ""}`}
    >
      {match.isUnderdogMatch && !upset && (
        <p className="font-display text-xs text-gold tracking-widest mb-2">★ UNDERDOG WATCH</p>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-foreground/40 mb-1">{match.competition}</p>
          <TeamLine
            name={match.homeTeam}
            score={match.homeScore}
            isUnderdog={match.underdogSide === "home"}
            isUpset={upset && match.underdogSide === "home"}
            flashing={flashing}
          />
          <TeamLine
            name={match.awayTeam}
            score={match.awayScore}
            isUnderdog={match.underdogSide === "away"}
            isUpset={upset && match.underdogSide === "away"}
            flashing={flashing}
          />
        </div>
        <span
          className={`flex items-center gap-1.5 text-xs font-display px-2 py-1 rounded-sm tracking-wide shrink-0 ${badge.className}`}
        >
          {isLiveStatus(match.status) && <LiveDot />}
          {match.minute != null && isLiveStatus(match.status) ? `${match.minute}'` : badge.label}
        </span>
      </div>
    </div>
  );
}

function TeamLine({
  name,
  score,
  isUnderdog,
  isUpset,
  flashing,
}: {
  name: string;
  score: number | null;
  isUnderdog: boolean;
  isUpset: boolean;
  flashing: boolean;
}) {
  const badge = isUnderdog ? teamBadge(name) : null;
  const flag = isUnderdog ? teamFlag(name) : null;

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 min-w-0">
        {flag && (
          <span className="text-sm" aria-hidden>
            {flag}
          </span>
        )}
        <span className="font-medium truncate">{name}</span>
        {badge && (
          <span className="text-[9px] font-display px-1.5 py-0.5 rounded-sm bg-gold/20 text-gold tracking-wide">
            {badge}
          </span>
        )}
        {isUpset && (
          <span className="text-[9px] font-display px-1.5 py-0.5 rounded-sm bg-red-600 text-white tracking-wide">
            UPSET
          </span>
        )}
      </span>
      <span
        className={`font-display text-xl shrink-0 ${isUpset ? "text-gold" : ""} ${flashing ? "animate-flip-in" : ""}`}
      >
        {score ?? "–"}
      </span>
    </div>
  );
}
