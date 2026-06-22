import NationBriefClient from "@/components/NationBriefClient";
import { nations } from "@/lib/nations";

export default function BriefPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <p className="font-display text-gold tracking-widest text-sm mb-2">AI NATION BRIEF</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide">
          TACTICAL <span className="text-gold">BREAKDOWN</span>
        </h1>
        <p className="text-foreground/60 mt-3">
          Pick a nation and let Groq generate a full tactical brief — strengths, weaknesses,
          qualification journey, and group-stage chances.
        </p>
      </div>

      <NationBriefClient nations={nations} />
    </main>
  );
}
