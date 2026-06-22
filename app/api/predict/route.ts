import { NextRequest, NextResponse } from "next/server";
import { generateGroqText } from "@/lib/groq";
import { extractJsonBlock } from "@/lib/extractJson";
import { getNationBySlug } from "@/lib/nations";

interface PredictionResult {
  homeScore: number;
  awayScore: number;
  winProbabilityA: number;
  drawProbability: number;
  winProbabilityB: number;
  narrative: string;
}

function buildPrompt(teamAName: string, teamBName: string): string {
  return `You are an expert football (soccer) match analyst previewing a FIFA World Cup 2026 group-stage match.

Match: ${teamAName} vs ${teamBName}

Respond with ONLY a single valid JSON object, no other text, in exactly this shape:
{
  "homeScore": <integer predicted goals for ${teamAName}>,
  "awayScore": <integer predicted goals for ${teamBName}>,
  "winProbabilityA": <integer percent chance ${teamAName} wins, 0-100>,
  "drawProbability": <integer percent chance of a draw, 0-100>,
  "winProbabilityB": <integer percent chance ${teamBName} wins, 0-100>,
  "narrative": "<exactly 3 sentences previewing the match in an exciting sports-broadcast tone>"
}
The three probabilities must sum to 100.`;
}

function clampPercent(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export async function POST(req: NextRequest) {
  try {
    const { teamA, teamB } = await req.json();

    if (!teamA || !teamB || teamA === teamB) {
      return NextResponse.json(
        { error: "Select two different teams to generate a prediction." },
        { status: 400 }
      );
    }

    const nationA = getNationBySlug(teamA);
    const nationB = getNationBySlug(teamB);
    const nameA = nationA?.name ?? teamA;
    const nameB = nationB?.name ?? teamB;

    const raw = await generateGroqText(buildPrompt(nameA, nameB), {
      maxTokens: 350,
      temperature: 0.7,
    });

    const parsed = extractJsonBlock(raw) as Partial<PredictionResult>;

    let probA = clampPercent(Number(parsed.winProbabilityA ?? 0));
    let draw = clampPercent(Number(parsed.drawProbability ?? 0));
    let probB = clampPercent(Number(parsed.winProbabilityB ?? 0));
    const total = probA + draw + probB;
    if (total > 0 && total !== 100) {
      probA = Math.round((probA / total) * 100);
      draw = Math.round((draw / total) * 100);
      probB = 100 - probA - draw;
    }

    const result: PredictionResult = {
      homeScore: Number.isFinite(Number(parsed.homeScore)) ? Number(parsed.homeScore) : 1,
      awayScore: Number.isFinite(Number(parsed.awayScore)) ? Number(parsed.awayScore) : 1,
      winProbabilityA: probA,
      drawProbability: draw,
      winProbabilityB: probB,
      narrative:
        typeof parsed.narrative === "string"
          ? parsed.narrative
          : "The model generated a prediction but no narrative was returned.",
    };

    return NextResponse.json({ teamA: nameA, teamB: nameB, ...result });
  } catch (err) {
    console.error("[/api/predict] error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to generate a prediction from Groq.",
      },
      { status: 500 }
    );
  }
}
