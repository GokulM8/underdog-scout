import { Fixture } from "@/lib/types";
import LiveDot from "./LiveDot";

const STATUS_LABEL: Record<Fixture["status"], string> = {
  upcoming: "UPCOMING",
  live: "LIVE",
  ft: "FT",
};

const STATUS_STYLES: Record<Fixture["status"], string> = {
  upcoming: "bg-white/10 text-foreground/70",
  live: "bg-red-600/20 text-red-400 border border-red-500/40",
  ft: "bg-gold/15 text-gold border border-gold/40",
};

export default function FixtureRow({ fixture }: { fixture: Fixture }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-white/5 first:border-t-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl" aria-hidden>
          {fixture.opponentFlag}
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate">vs {fixture.opponent}</p>
          <p className="text-xs text-foreground/50 truncate">
            {fixture.date} · {fixture.venue}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {fixture.score && (
          <span className="font-display text-lg text-foreground/90">{fixture.score}</span>
        )}
        <span
          className={`flex items-center gap-1.5 text-xs font-display px-2 py-1 rounded-sm tracking-wide ${STATUS_STYLES[fixture.status]}`}
        >
          {fixture.status === "live" && <LiveDot />}
          {STATUS_LABEL[fixture.status]}
        </span>
      </div>
    </div>
  );
}
