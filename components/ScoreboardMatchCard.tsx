"use client";

import { useEffect, useState } from "react";
import { ScoreboardMatch } from "@/lib/scoreboardData";
import LiveDot from "./LiveDot";

function useCountUp(target: number | null, durationMs = 700): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target == null) return;
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(progress * (target as number)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return target == null ? 0 : value;
}

function useCountdown(iso: string): string {
  const [label, setLabel] = useState("");

  useEffect(() => {
    function update() {
      const diff = new Date(iso).getTime() - Date.now();
      if (diff <= 0) {
        setLabel("Kicking off");
        return;
      }
      const totalHours = Math.floor(diff / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000) / 60_000);
      const days = Math.floor(totalHours / 24);
      setLabel(days > 0 ? `${days}d ${totalHours % 24}h` : `${totalHours}h ${minutes}m`);
    }
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [iso]);

  return label;
}

function formatKickoff(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const STATUS_BADGE: Record<ScoreboardMatch["status"], { label: string; className: string }> = {
  live: { label: "LIVE", className: "bg-red-600/20 text-red-400 border border-red-500/40" },
  completed: { label: "FT", className: "bg-white/10 text-foreground/60 border border-white/15" },
  upcoming: { label: "UPCOMING", className: "bg-blue-500/15 text-blue-300 border border-blue-400/30" },
};

function debutLabel(badge: "DEBUT" | "RETURN"): string {
  return badge === "DEBUT" ? "DEBUT NATION" : "RETURN NATION";
}

export default function ScoreboardMatchCard({ match }: { match: ScoreboardMatch }) {
  const homeScore = useCountUp(match.homeScore);
  const awayScore = useCountUp(match.awayScore);
  const countdown = useCountdown(match.kickoff);
  const statusBadge = STATUS_BADGE[match.status];

  const homeWinning =
    match.homeScore != null && match.awayScore != null && match.homeScore > match.awayScore;
  const awayWinning =
    match.homeScore != null && match.awayScore != null && match.awayScore > match.homeScore;

  return (
    <div
      className={`relative overflow-hidden rounded-sm border p-5 bg-[#0A0A0A] ${
        match.isUnderdogMatch ? "border-gold scanline-border" : "border-white/10"
      }`}
    >
      <div className="absolute inset-0 crowd-wave-bg pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between text-xs text-foreground/50 tracking-widest mb-4 font-display">
          <span>
            GROUP {match.group} · {match.city.toUpperCase()} · {match.date}
          </span>
          <span
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm ${statusBadge.className}`}
          >
            {match.status === "live" && <LiveDot />}
            {statusBadge.label}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-4">
          <div className="flex flex-col items-center gap-1 min-w-0">
            <span style={{ fontSize: 48 }} aria-hidden>
              {match.home.flag}
            </span>
            <span className="font-display text-lg text-center truncate w-full">
              {match.home.name}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <span
                className={`font-display ${
                  match.isUpset ? "shimmer-text" : homeWinning ? "text-gold" : "text-foreground"
                }`}
                style={{ fontSize: 64, lineHeight: 1 }}
              >
                {match.homeScore == null ? "–" : homeScore}
              </span>
              <span className="font-display text-2xl text-foreground/30">—</span>
              <span
                className={`font-display ${
                  match.isUpset ? "shimmer-text" : awayWinning ? "text-gold" : "text-foreground"
                }`}
                style={{ fontSize: 64, lineHeight: 1 }}
              >
                {match.awayScore == null ? "–" : awayScore}
              </span>
            </div>
            {match.status === "live" && match.minute != null && (
              <span className="flex items-center gap-1.5 text-xs text-red-400">
                <LiveDot />
                {match.minute}&apos;
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 min-w-0">
            <span style={{ fontSize: 48 }} aria-hidden>
              {match.away.flag}
            </span>
            <span className="font-display text-lg text-center truncate w-full">
              {match.away.name}
            </span>
          </div>
        </div>

        {match.status === "upcoming" && (
          <p className="text-center text-xs text-foreground/50 mb-4">
            Kickoff {formatKickoff(match.kickoff)} · <span className="text-gold">{countdown}</span>
          </p>
        )}

        {match.scorers.length > 0 && (
          <p className="text-center text-xs text-foreground/60 mb-4 leading-relaxed">
            {match.scorers.map((s, i) => (
              <span key={i} className="mr-3 inline-block">
                {s.player} {s.minute}&apos;
              </span>
            ))}
          </p>
        )}

        {match.status !== "upcoming" && (
          <div className="mb-4">
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
              <div className="h-full bg-gold" style={{ width: `${match.possession.home}%` }} />
              <div className="h-full bg-foreground/30" style={{ width: `${match.possession.away}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-foreground/50 mt-1">
              <span>{match.possession.home}%</span>
              <span>{match.possession.away}%</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {match.isUpset && (
            <span className="text-[10px] font-display px-2 py-1 rounded-sm tracking-wide bg-red-600 text-white">
              UPSET
            </span>
          )}
          {match.home.debutBadge && (
            <span className="text-[10px] font-display px-2 py-1 rounded-sm tracking-wide bg-gold text-background">
              {debutLabel(match.home.debutBadge)}
            </span>
          )}
          {match.away.debutBadge && (
            <span className="text-[10px] font-display px-2 py-1 rounded-sm tracking-wide bg-gold text-background">
              {debutLabel(match.away.debutBadge)}
            </span>
          )}
          <span className="text-[10px] font-display px-2 py-1 rounded-sm tracking-wide bg-white/10 text-foreground/70">
            GROUP {match.group}
          </span>
        </div>
      </div>
    </div>
  );
}
