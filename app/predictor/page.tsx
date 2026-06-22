import PredictorClient from "@/components/PredictorClient";
import { nations } from "@/lib/nations";

export default function PredictorPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <p className="font-display text-gold tracking-widest text-sm mb-2">MATCH PREDICTOR</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide">
          PICK A <span className="text-gold">FIXTURE</span>
        </h1>
        <p className="text-foreground/60 mt-3">
          Select two underdog nations and let Llama 3.3 70B (via Groq) predict the scoreline, win
          probabilities, and a narrative preview — then download an IBM Docling-generated
          scout report PDF.
        </p>
      </div>

      <PredictorClient nations={nations} />
    </main>
  );
}
