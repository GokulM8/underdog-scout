import { NextRequest, NextResponse } from "next/server";
import { generateGroqText } from "@/lib/groq";
import { extractJsonBlock } from "@/lib/extractJson";

interface NationBrief {
  overview: string;
  strengths: string[];
  weaknesses: string[];
  qualification: string;
  advancement_chances: string;
}

function buildPrompt(nation: string): string {
  return `Give a detailed tactical brief for ${nation} at FIFA World Cup 2026. Include:
team overview, key strengths (4 points), key weaknesses (4 points),
qualification journey summary, and chances of advancing from the group stage.
Respond in JSON: {"overview": "...", "strengths": ["...", "...", "...", "..."], "weaknesses": ["...", "...", "...", "..."], "qualification": "...", "advancement_chances": "..."}
Respond with ONLY the JSON object, no other text.`;
}

export async function POST(req: NextRequest) {
  try {
    const { nation } = await req.json();
    if (!nation || typeof nation !== "string") {
      return NextResponse.json({ error: "A nation name is required." }, { status: 400 });
    }

    const raw = await generateGroqText(buildPrompt(nation), {
      maxTokens: 700,
      temperature: 0.7,
    });
    const parsed = extractJsonBlock(raw) as Partial<NationBrief>;

    const brief: NationBrief = {
      overview: typeof parsed.overview === "string" ? parsed.overview : "",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 6).map(String) : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 6).map(String) : [],
      qualification: typeof parsed.qualification === "string" ? parsed.qualification : "",
      advancement_chances:
        typeof parsed.advancement_chances === "string" ? parsed.advancement_chances : "",
    };

    return NextResponse.json(brief);
  } catch (err) {
    console.error("[/api/nation-brief] error:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to generate the nation brief.",
      },
      { status: 500 }
    );
  }
}
