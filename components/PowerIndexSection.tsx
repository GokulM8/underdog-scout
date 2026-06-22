import { computePowerIndex, POWER_INDEX_METRICS } from "@/lib/powerIndex";

export default function PowerIndexSection() {
  const ranked = computePowerIndex();

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <p className="font-display text-gold tracking-widest text-sm mb-2">THE NUMBERS</p>
        <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
          UNDERDOG <span className="text-gold">POWER INDEX</span>
        </h2>
        <p className="text-foreground/60 mt-2 max-w-xl mx-auto text-sm">
          Ranked by population size, FIFA ranking, qualification difficulty, and squad age —
          0 to 100.
        </p>
      </div>

      <div className="space-y-4">
        {ranked.map((entry, index) => (
          <div
            key={entry.slug}
            className="rounded-sm border border-white/10 bg-black/30 vhs-noise p-4 sm:p-5"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-display text-2xl text-gold/70 w-8 text-center shrink-0">
                {index + 1}
              </span>
              <span className="text-3xl shrink-0" aria-hidden>
                {entry.flag}
              </span>
              <span className="font-display text-xl sm:text-2xl tracking-wide flex-1 truncate">
                {entry.name}
              </span>
              <span className="font-display text-3xl sm:text-4xl text-gold shrink-0">
                {entry.total}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {POWER_INDEX_METRICS.map((metric) => {
                const score = entry[metric.key];
                const percent = Math.round((score / metric.max) * 100);
                return (
                  <div key={metric.key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-foreground/60">
                      <span>{metric.label}</span>
                      <span>
                        {score}/{metric.max}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
