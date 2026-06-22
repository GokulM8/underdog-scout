import ScoreboardClient from "@/components/ScoreboardClient";
import DisclaimerNote from "@/components/DisclaimerNote";

export default function ScoreboardPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <p className="font-display text-gold tracking-widest text-sm mb-2">SCOREBOARD</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide">
          GROUP STAGE <span className="text-gold">RESULTS</span>
        </h1>
        <p className="text-foreground/60 mt-3 max-w-2xl mx-auto">
          Live scores, full-time results, and upcoming kickoffs across all 12 groups —
          illustrative sample data, underdog matches highlighted in gold.
        </p>
        <div className="flex justify-center">
          <DisclaimerNote text="Live scores via football-data.org. Goal scorers and possession stats are illustrative." />
        </div>
      </div>

      <ScoreboardClient />
    </main>
  );
}
