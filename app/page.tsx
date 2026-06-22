import NationCard from "@/components/NationCard";
import PowerIndexSection from "@/components/PowerIndexSection";
import { nations } from "@/lib/nations";
import { computePowerIndex } from "@/lib/powerIndex";

export default function HomePage() {
  const powerIndexBySlug = new Map(
    computePowerIndex().map((entry) => [entry.slug, entry.total])
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <section className="text-center mb-12">
        <p className="font-display text-gold tracking-widest text-sm mb-2">
          FIFA WORLD CUP 2026
        </p>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wide">
          UNDERDOG <span className="text-gold">SCOUT</span>
        </h1>
        <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
          Six nations rewriting the script. Debutants, long-awaited returns, and the
          underdogs every neutral will be rooting for — tracked with AI predictions from
          Groq.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {nations.map((nation, index) => (
          <NationCard
            key={nation.slug}
            nation={nation}
            index={index}
            powerIndex={powerIndexBySlug.get(nation.slug) ?? 0}
          />
        ))}
      </section>

      <PowerIndexSection />
    </main>
  );
}
