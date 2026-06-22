const API_BASE = "https://api.football-data.org/v4";

export interface NormalizedMatch {
  id: number;
  competition: string;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELLED" | string;
  minute: number | null;
  homeTeam: string;
  awayTeam: string;
  homeCrest: string | null;
  awayCrest: string | null;
  homeScore: number | null;
  awayScore: number | null;
  isUnderdogMatch: boolean;
  underdogSide: "home" | "away" | null;
}

const UNDERDOG_NAMES = [
  "curaçao",
  "curacao",
  "cape verde",
  "jordan",
  "uzbekistan",
  "haiti",
  "scotland",
];

function isUnderdog(name: string): boolean {
  const lower = name.toLowerCase();
  return UNDERDOG_NAMES.some((n) => lower.includes(n));
}

interface RawFootballDataMatch {
  id: number;
  utcDate: string;
  status: string;
  minute: number | null;
  competition?: { name?: string };
  homeTeam?: { name?: string; crest?: string };
  awayTeam?: { name?: string; crest?: string };
  score?: { fullTime?: { home?: number | null; away?: number | null } };
}

export async function fetchTodayMatches(): Promise<NormalizedMatch[]> {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_FOOTBALL_DATA_API_KEY is not configured.");
  }

  const today = new Date();
  const dateFrom = today.toISOString().slice(0, 10);
  const dateTo = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const res = await fetch(
    `${API_BASE}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    {
      headers: { "X-Auth-Token": apiKey },
      next: { revalidate: 30 },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`football-data.org request failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { matches?: RawFootballDataMatch[] };
  const matches = data.matches ?? [];

  return matches.map((m): NormalizedMatch => {
    const homeName = m.homeTeam?.name ?? "Unknown";
    const awayName = m.awayTeam?.name ?? "Unknown";
    const homeIsUnderdog = isUnderdog(homeName);
    const awayIsUnderdog = isUnderdog(awayName);
    return {
      id: m.id,
      competition: m.competition?.name ?? "Unknown competition",
      utcDate: m.utcDate,
      status: m.status,
      minute: m.minute ?? null,
      homeTeam: homeName,
      awayTeam: awayName,
      homeCrest: m.homeTeam?.crest ?? null,
      awayCrest: m.awayTeam?.crest ?? null,
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      isUnderdogMatch: homeIsUnderdog || awayIsUnderdog,
      underdogSide: homeIsUnderdog ? "home" : awayIsUnderdog ? "away" : null,
    };
  });
}
