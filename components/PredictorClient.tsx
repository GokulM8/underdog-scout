"use client";

import { useState } from "react";
import { Nation } from "@/lib/types";
import GraniteInsightBox from "./GraniteInsightBox";
import ProbabilityBar from "./ProbabilityBar";
import HeadToHeadSection from "./HeadToHeadSection";
import DisclaimerNote from "./DisclaimerNote";

interface PredictionResponse {
  teamA: string;
  teamB: string;
  homeScore: number;
  awayScore: number;
  winProbabilityA: number;
  drawProbability: number;
  winProbabilityB: number;
  narrative: string;
}

export default function PredictorClient({ nations }: { nations: Nation[] }) {
  const [teamA, setTeamA] = useState(nations[0]?.slug ?? "");
  const [teamB, setTeamB] = useState(nations[1]?.slug ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const nationA = nations.find((n) => n.slug === teamA);
  const nationB = nations.find((n) => n.slug === teamB);

  async function handlePredict() {
    if (teamA === teamB) {
      setError("Pick two different teams.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setDownloadError(null);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamA, teamB }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate prediction.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadReport() {
    if (!result) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType: "prediction", ...result }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to generate the scout report PDF.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${result.teamA}-vs-${result.teamB}-scout-report.pdf`
        .replace(/\s+/g, "-")
        .toLowerCase();
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-4">
        <TeamSelect label="Team A" value={teamA} onChange={setTeamA} nations={nations} />
        <span className="font-display text-2xl text-gold/70 text-center pb-2 hidden sm:block">
          VS
        </span>
        <TeamSelect label="Team B" value={teamB} onChange={setTeamB} nations={nations} />
      </div>

      {nationA && nationB && teamA !== teamB && (
        <HeadToHeadSection nationA={nationA} nationB={nationB} />
      )}

      <button
        onClick={handlePredict}
        disabled={loading}
        className="w-full sm:w-auto font-display text-lg tracking-wide bg-gold text-background px-8 py-3 rounded-sm hover:bg-gold/90 transition-colors disabled:opacity-50"
      >
        {loading ? "LLAMA IS THINKING…" : "GENERATE PREDICTION"}
      </button>

      {(loading || error || result) && (
        <GraniteInsightBox
          title="MATCH PREDICTION"
          poweredBy="GROQ · LLAMA 3.3 70B"
          loading={loading}
          error={error}
        >
          {result && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-6">
                <TeamScoreColumn name={result.teamA} flag={nationA?.flag} score={result.homeScore} />
                <span className="font-display text-3xl text-foreground/40">—</span>
                <TeamScoreColumn name={result.teamB} flag={nationB?.flag} score={result.awayScore} />
              </div>

              <div className="space-y-3">
                <ProbabilityBar
                  label={`${result.teamA} win`}
                  percent={result.winProbabilityA}
                  color={nationA?.color ?? "#C9A84C"}
                />
                <ProbabilityBar label="Draw" percent={result.drawProbability} color="#9CA3AF" />
                <ProbabilityBar
                  label={`${result.teamB} win`}
                  percent={result.winProbabilityB}
                  color={nationB?.color ?? "#C9A84C"}
                />
              </div>

              <p className="text-foreground/90 leading-relaxed border-t border-white/10 pt-4">
                {result.narrative}
              </p>

              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  onClick={handleDownloadReport}
                  disabled={downloading}
                  className="font-display text-sm tracking-wide bg-deep-green border border-gold/40 text-foreground px-5 py-2.5 rounded-sm hover:bg-deep-green/70 transition-colors disabled:opacity-50"
                >
                  {downloading ? "GENERATING PDF…" : "DOWNLOAD SCOUT REPORT"}
                </button>
                <span className="text-[10px] font-display tracking-widest text-foreground/50 border border-foreground/20 px-2 py-0.5 rounded-sm self-start sm:self-auto">
                  POWERED BY IBM DOCLING
                </span>
              </div>
              {downloadError && (
                <p className="text-sm text-red-400/90">{downloadError}</p>
              )}
            </div>
          )}
        </GraniteInsightBox>
      )}

      {result && (
        <div className="flex justify-center">
          <DisclaimerNote text="Predictions generated by Groq AI. For entertainment purposes only." />
        </div>
      )}
    </div>
  );
}

function TeamScoreColumn({
  name,
  flag,
  score,
}: {
  name: string;
  flag?: string;
  score: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl" aria-hidden>
        {flag}
      </span>
      <span className="font-display text-5xl">{score}</span>
      <span className="text-xs text-foreground/60 text-center">{name}</span>
    </div>
  );
}

function TeamSelect({
  label,
  value,
  onChange,
  nations,
}: {
  label: string;
  value: string;
  onChange: (slug: string) => void;
  nations: Nation[];
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-foreground/50 mb-1 block">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/15 rounded-sm px-3 py-2.5 text-foreground font-medium focus:outline-none focus:border-gold"
      >
        {nations.map((nation) => (
          <option key={nation.slug} value={nation.slug}>
            {nation.flag} {nation.name}
          </option>
        ))}
      </select>
    </label>
  );
}
