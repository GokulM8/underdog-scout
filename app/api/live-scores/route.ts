import { NextResponse } from "next/server";
import { fetchTodayMatches } from "@/lib/footballData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = await fetchTodayMatches();
    return NextResponse.json({ matches });
  } catch (err) {
    console.error("[/api/live-scores] error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to fetch live scores from football-data.org.",
      },
      { status: 502 }
    );
  }
}
