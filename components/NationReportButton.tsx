"use client";

import { useState } from "react";
import { Nation } from "@/lib/types";

export default function NationReportButton({ nation }: { nation: Nation }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: "nation",
          name: nation.name,
          flag: nation.flag,
          group: nation.group,
          population: nation.population ?? `${(nation.populationValue / 1_000_000).toFixed(1)}M`,
          fifaRanking: nation.fifaRanking,
          roadTo2026: nation.roadTo2026,
          squad: nation.squad,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to generate the scout report PDF.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${nation.name}-scout-report.pdf`.replace(/\s+/g, "-").toLowerCase();
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="font-display text-sm tracking-wide bg-gold text-background px-6 py-3 rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
      >
        {downloading ? "GENERATING PDF…" : "DOWNLOAD PDF · IBM DOCLING"}
      </button>
      {error && <p className="text-sm text-red-400/90">{error}</p>}
    </div>
  );
}
