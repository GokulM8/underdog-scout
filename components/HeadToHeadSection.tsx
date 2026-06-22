import { getHeadToHead } from "@/lib/headToHead";
import { Nation } from "@/lib/types";

export default function HeadToHeadSection({
  nationA,
  nationB,
}: {
  nationA: Nation;
  nationB: Nation;
}) {
  const record = getHeadToHead(nationA.slug, nationB.slug);

  return (
    <div className="rounded-sm border border-white/10 bg-black/30 vhs-noise p-5">
      <p className="font-display text-xs text-foreground/50 tracking-widest mb-4 text-center">
        HEAD-TO-HEAD HISTORY
      </p>

      <div className="flex items-center justify-center gap-6 mb-5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl" aria-hidden>
            {nationA.flag}
          </span>
          <span className="text-xs text-foreground/70">{nationA.name}</span>
        </div>
        <span className="font-display text-xl text-foreground/40">VS</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl" aria-hidden>
            {nationB.flag}
          </span>
          <span className="text-xs text-foreground/70">{nationB.name}</span>
        </div>
      </div>

      {record.totalMatches === 0 ? (
        <p className="text-center text-sm text-foreground/50">
          No recorded meetings between these two nations.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 text-center mb-5">
            <div>
              <p className="font-display text-2xl text-gold">{record.winsA}</p>
              <p className="text-[11px] text-foreground/50 uppercase tracking-wide">
                {nationA.name} wins
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-foreground/80">{record.draws}</p>
              <p className="text-[11px] text-foreground/50 uppercase tracking-wide">Draws</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold">{record.winsB}</p>
              <p className="text-[11px] text-foreground/50 uppercase tracking-wide">
                {nationB.name} wins
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-3">
            {record.matches.map((match, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm text-foreground/70"
              >
                <span className="text-foreground/40 text-xs w-12 shrink-0">{match.year}</span>
                <span className="flex-1 truncate">
                  {match.homeTeam} vs {match.awayTeam}
                </span>
                <span className="text-xs text-foreground/40 mr-3 hidden sm:inline">
                  {match.competition}
                </span>
                <span className="font-display text-gold shrink-0">{match.score}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
