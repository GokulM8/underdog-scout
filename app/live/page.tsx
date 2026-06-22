import LiveScoresClient from "@/components/LiveScoresClient";

export default function LivePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <p className="font-display text-gold tracking-widest text-sm mb-2">LIVE FEED</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide">
          SCORES <span className="text-gold">RIGHT NOW</span>
        </h1>
        <p className="text-foreground/60 mt-3">
          Live from football-data.org, refreshing every 30 seconds. Underdog nation matches
          are highlighted in gold, with upsets flagged in real time.
        </p>
      </div>

      <LiveScoresClient />
    </main>
  );
}
