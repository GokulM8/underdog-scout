import { NextRequest, NextResponse } from "next/server";
import { generateGroqText } from "@/lib/groq";
import { extractJsonArrayBlock } from "@/lib/extractJson";
import { HiddenHero } from "@/lib/types";

const VALID_BADGES = ["MVP", "Rising Star", "Breakout Pick"];

function buildPrompt(nation: string): string {
  return `Find 3 hidden hero players from ${nation} at FIFA World Cup 2026 that most fans
don't know. For each player include: name, position, club, age, goals, assists,
badge_type (MVP/Rising Star/Breakout Pick), and a 2-sentence description of why
they are special. Respond in JSON array format only, like:
[{"name": "...", "position": "...", "club": "...", "age": 0, "goals": 0, "assists": 0, "badge_type": "...", "description": "..."}]
Respond with ONLY the JSON array, no other text.`;
}

export async function POST(req: NextRequest) {
  try {
    const { nation } = await req.json();
    if (!nation || typeof nation !== "string") {
      return NextResponse.json({ error: "A nation name is required." }, { status: 400 });
    }

    const raw = await generateGroqText(buildPrompt(nation), {
      maxTokens: 700,
      temperature: 0.8,
    });
    const parsed = extractJsonArrayBlock(raw) as Array<Partial<HiddenHero>>;

    const heroes: HiddenHero[] = parsed.slice(0, 3).map((h) => ({
      name: typeof h.name === "string" ? h.name : "Unknown Player",
      position: typeof h.position === "string" ? h.position : "—",
      club: typeof h.club === "string" ? h.club : "—",
      age: Number.isFinite(Number(h.age)) ? Number(h.age) : 0,
      goals: Number.isFinite(Number(h.goals)) ? Number(h.goals) : 0,
      assists: Number.isFinite(Number(h.assists)) ? Number(h.assists) : 0,
      badge_type: VALID_BADGES.includes(String(h.badge_type)) ? String(h.badge_type) : "Breakout Pick",
      description: typeof h.description === "string" ? h.description : "",
    }));

    return NextResponse.json({ heroes });
  } catch (err) {
    console.error("[/api/hidden-heroes] error:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to find hidden heroes.",
      },
      { status: 500 }
    );
  }
}
