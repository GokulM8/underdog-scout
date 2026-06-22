"use client";

import Link from "next/link";
import { useState } from "react";
import { Nation } from "@/lib/types";
import PlayerAvatarCircle from "./PlayerAvatarCircle";

export default function NationCard({
  nation,
  index,
  powerIndex,
}: {
  nation: Nation;
  index: number;
  powerIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const previewPlayers = nation.squad.slice(0, 3);
  const remaining = nation.squad.length - previewPlayers.length;

  return (
    <div
      className="relative overflow-hidden rounded-sm border border-white/10 vhs-noise transition-transform duration-200 hover:-translate-y-1"
      style={{ background: `linear-gradient(160deg, ${nation.color}33 0%, #080808 65%)` }}
    >
      <div className="absolute top-3 -right-9 rotate-45 z-10">
        <span
          className={`block px-9 py-1 text-[10px] font-display tracking-widest shadow-md ${
            nation.isDebut
              ? "bg-gold text-background"
              : "bg-deep-green text-foreground border-y border-gold/40"
          }`}
        >
          {nation.isDebut ? "DEBUT" : "RETURN"}
        </span>
      </div>

      <Link href={`/team/${nation.slug}`} className="block">
        <p className="font-display text-xs text-gold/70 tracking-widest px-3 pt-3">
          TAPE NO. {String(index + 1).padStart(2, "0")}
        </p>

        <div className="flex flex-col items-center pt-2 pb-4 px-4">
          <span
            className="rounded-full flex items-center justify-center"
            style={{
              width: 84,
              height: 84,
              fontSize: 56,
              background: `radial-gradient(circle, ${nation.color}55 0%, transparent 70%)`,
            }}
            aria-hidden
          >
            {nation.flag}
          </span>
          <h3 className="font-display tracking-wide mt-2" style={{ fontSize: 24 }}>
            {nation.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] font-display px-2 py-0.5 rounded-sm bg-white/10 text-foreground/70 tracking-wide">
              {nation.confederation}
            </span>
            <span className="text-[10px] text-foreground/50">Group {nation.group}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-black/30">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-foreground/70">FIFA #{nation.fifaRanking}</span>
            <span className="flex items-center gap-1.5 text-xs text-foreground/60">
              <span aria-hidden>👤</span>
              {nation.population ?? `${(nation.populationValue / 1_000_000).toFixed(1)}M`}
            </span>
          </div>
          <PowerIndexRing score={powerIndex} />
        </div>
      </Link>

      <div className="px-4 py-3 border-t border-white/5">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 w-full"
        >
          <div className="flex">
            {previewPlayers.map((p, i) => (
              <PlayerAvatarCircle
                key={p.name}
                name={p.name}
                position={p.position}
                club={p.club}
                size={32}
                className={i > 0 ? "-ml-2.5" : ""}
              />
            ))}
          </div>
          {remaining > 0 && (
            <span className="text-xs text-foreground/50">+{remaining} more</span>
          )}
          <span className="ml-auto text-xs text-gold">
            {expanded ? "Hide squad ↑" : "View squad ↓"}
          </span>
        </button>

        {expanded && (
          <div className="grid grid-cols-5 gap-2 mt-3">
            {nation.squad.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1 text-center">
                <PlayerAvatarCircle name={p.name} position={p.position} club={p.club} size={36} />
                <span className="text-[9px] text-foreground/70 leading-tight">{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-1.5 w-full" style={{ backgroundColor: nation.color }} />
    </div>
  );
}

function PowerIndexRing({ score }: { score: number }) {
  const size = 44;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#C9A84C"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[11px] text-gold">
        {score}
      </span>
    </div>
  );
}
