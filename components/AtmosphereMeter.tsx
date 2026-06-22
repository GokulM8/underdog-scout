"use client";

import { useEffect, useState } from "react";

interface Tier {
  color: string;
  emoji: string;
  label: string;
}

function getTier(score: number): Tier {
  if (score <= 30) return { color: "#888888", emoji: "😴", label: "Dead" };
  if (score <= 60) return { color: "#C9A84C", emoji: "👏", label: "Building" };
  if (score <= 80) return { color: "#E8821A", emoji: "🔥", label: "Electric" };
  return { color: "#C0392B", emoji: "🚨", label: "CHAOS" };
}

export default function AtmosphereMeter({
  score,
  mini = false,
}: {
  score: number;
  mini?: boolean;
}) {
  const [displayScore, setDisplayScore] = useState(0);
  const tier = getTier(score);
  const isChaos = score >= 81;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplayScore(score));
    return () => cancelAnimationFrame(frame);
  }, [score]);

  if (mini) {
    return (
      <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isChaos ? "animate-atmosphere-pulse" : ""
          }`}
          style={{ width: `${displayScore}%`, backgroundColor: tier.color }}
        />
      </div>
    );
  }

  return (
    <div className="mt-3">
      <p className="font-display text-gold mb-1" style={{ fontSize: 10, letterSpacing: 2 }}>
        ATMOSPHERE
      </p>
      <div className="flex items-center gap-2">
        <span className="text-xs whitespace-nowrap shrink-0">
          {tier.emoji} {tier.label}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-black/40 overflow-hidden border-[0.5px] border-white/15">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isChaos ? "animate-atmosphere-pulse" : ""
            }`}
            style={{ width: `${displayScore}%`, backgroundColor: tier.color }}
          />
        </div>
        <span className="font-display text-sm shrink-0" style={{ color: tier.color }}>
          {score}
        </span>
      </div>
    </div>
  );
}
