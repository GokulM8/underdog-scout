import Link from "next/link";
import { notFound } from "next/navigation";
import { getNationBySlug, nations } from "@/lib/nations";
import PlayerCard from "@/components/PlayerCard";
import FixtureRow from "@/components/FixtureRow";
import RoadToTimeline from "@/components/RoadToTimeline";
import NationReportButton from "@/components/NationReportButton";
import HiddenHeroesClient from "@/components/HiddenHeroesClient";
import DisclaimerNote from "@/components/DisclaimerNote";

export function generateStaticParams() {
  return nations.map((nation) => ({ slug: nation.slug }));
}

export default function TeamPage({ params }: { params: { slug: string } }) {
  const nation = getNationBySlug(params.slug);
  if (!nation) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-gold transition-colors mb-6"
      >
        ← Back to all nations
      </Link>

      <section
        className="relative rounded-sm border border-white/10 vhs-noise overflow-hidden mb-8"
        style={{ background: `linear-gradient(160deg, ${nation.color}33 0%, #080808 70%)` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 sm:p-8">
          <span className="text-7xl" aria-hidden>
            {nation.flag}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              {nation.isDebut ? (
                <span className="font-display text-xs bg-gold text-background px-2 py-0.5 rounded-sm tracking-wide">
                  DEBUT NATION
                </span>
              ) : (
                <span className="font-display text-xs bg-deep-green px-2 py-0.5 rounded-sm tracking-wide border border-gold/40">
                  RETURN · LAST WC {nation.lastWorldCup}
                </span>
              )}
              <span className="text-xs text-foreground/50 uppercase tracking-wider">
                {nation.confederation} · Group {nation.group}
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl tracking-wide">{nation.name}</h1>
            <p className="text-foreground/60 mt-2 max-w-xl">{nation.tagline}</p>
            <div className="flex gap-4 mt-3 text-sm text-foreground/70">
              <span>FIFA Ranking #{nation.fifaRanking}</span>
              {nation.population && <span>Population {nation.population}</span>}
            </div>
          </div>
        </div>
        <div className="h-1.5 w-full" style={{ backgroundColor: nation.color }} />
      </section>

      <section className="mb-8">
        <h2 className="font-display text-2xl text-gold mb-3 tracking-wide">SQUAD</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {nation.squad.map((player) => (
            <PlayerCard key={player.name} player={player} nationFlag={nation.flag} />
          ))}
        </div>
        <DisclaimerNote text="Squad and player data is illustrative. Live match scores via football-data.org." />
      </section>

      <section className="mb-8">
        <HiddenHeroesClient nationName={nation.name} />
      </section>

      <section className="mb-8">
        <h2 className="font-display text-2xl text-gold mb-3 tracking-wide">FIXTURES</h2>
        <div className="rounded-sm border border-white/10 overflow-hidden">
          {nation.fixtures.map((fixture) => (
            <FixtureRow key={`${fixture.opponent}-${fixture.date}`} fixture={fixture} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-gold mb-5 tracking-wide">ROAD TO 2026</h2>
        <RoadToTimeline events={nation.roadTo2026} />
        <div className="mt-6">
          <NationReportButton nation={nation} />
        </div>
      </section>
    </main>
  );
}
