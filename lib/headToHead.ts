import { getNationBySlug } from "./nations";

interface RawMatch {
  year: number;
  competition: string;
  homeSlug: string;
  awaySlug: string;
  homeScore: number;
  awayScore: number;
}

export interface HeadToHeadMatch {
  year: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
}

export interface HeadToHeadRecord {
  totalMatches: number;
  winsA: number;
  winsB: number;
  draws: number;
  matches: HeadToHeadMatch[];
}

// Illustrative sample historical data for this demo app — see footer disclaimer.
const RECORDS: Record<string, RawMatch[]> = {
  "cape-verde|curacao": [
    { year: 2016, competition: "Friendly", homeSlug: "cape-verde", awaySlug: "curacao", homeScore: 1, awayScore: 0 },
    { year: 2019, competition: "Friendly", homeSlug: "curacao", awaySlug: "cape-verde", homeScore: 2, awayScore: 1 },
    { year: 2022, competition: "Friendly", homeSlug: "cape-verde", awaySlug: "curacao", homeScore: 0, awayScore: 0 },
  ],
  "cape-verde|haiti": [
    { year: 2014, competition: "Friendly", homeSlug: "haiti", awaySlug: "cape-verde", homeScore: 1, awayScore: 1 },
    { year: 2018, competition: "Friendly", homeSlug: "cape-verde", awaySlug: "haiti", homeScore: 2, awayScore: 0 },
    { year: 2021, competition: "Friendly", homeSlug: "haiti", awaySlug: "cape-verde", homeScore: 1, awayScore: 0 },
  ],
  "cape-verde|jordan": [
    { year: 2013, competition: "Friendly", homeSlug: "jordan", awaySlug: "cape-verde", homeScore: 1, awayScore: 0 },
    { year: 2017, competition: "Friendly", homeSlug: "cape-verde", awaySlug: "jordan", homeScore: 1, awayScore: 1 },
    { year: 2023, competition: "Friendly", homeSlug: "jordan", awaySlug: "cape-verde", homeScore: 2, awayScore: 1 },
  ],
  "cape-verde|scotland": [
    { year: 2011, competition: "Friendly", homeSlug: "scotland", awaySlug: "cape-verde", homeScore: 1, awayScore: 0 },
    { year: 2015, competition: "Friendly", homeSlug: "cape-verde", awaySlug: "scotland", homeScore: 0, awayScore: 2 },
    { year: 2019, competition: "Friendly", homeSlug: "scotland", awaySlug: "cape-verde", homeScore: 1, awayScore: 1 },
  ],
  "cape-verde|uzbekistan": [
    { year: 2012, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "cape-verde", homeScore: 2, awayScore: 1 },
    { year: 2016, competition: "Friendly", homeSlug: "cape-verde", awaySlug: "uzbekistan", homeScore: 1, awayScore: 0 },
    { year: 2020, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "cape-verde", homeScore: 1, awayScore: 1 },
  ],
  "curacao|haiti": [
    { year: 2015, competition: "Concacaf Gold Cup Qualifying", homeSlug: "curacao", awaySlug: "haiti", homeScore: 1, awayScore: 1 },
    { year: 2017, competition: "Friendly", homeSlug: "haiti", awaySlug: "curacao", homeScore: 2, awayScore: 0 },
    { year: 2019, competition: "Concacaf Nations League", homeSlug: "curacao", awaySlug: "haiti", homeScore: 0, awayScore: 1 },
  ],
  "curacao|jordan": [
    { year: 2010, competition: "Friendly", homeSlug: "jordan", awaySlug: "curacao", homeScore: 1, awayScore: 0 },
    { year: 2014, competition: "Friendly", homeSlug: "curacao", awaySlug: "jordan", homeScore: 1, awayScore: 1 },
    { year: 2018, competition: "Friendly", homeSlug: "jordan", awaySlug: "curacao", homeScore: 2, awayScore: 0 },
  ],
  "curacao|scotland": [
    { year: 2009, competition: "Friendly", homeSlug: "scotland", awaySlug: "curacao", homeScore: 2, awayScore: 0 },
    { year: 2013, competition: "Friendly", homeSlug: "curacao", awaySlug: "scotland", homeScore: 0, awayScore: 1 },
    { year: 2017, competition: "Friendly", homeSlug: "scotland", awaySlug: "curacao", homeScore: 1, awayScore: 1 },
  ],
  "curacao|uzbekistan": [
    { year: 2011, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "curacao", homeScore: 1, awayScore: 1 },
    { year: 2015, competition: "Friendly", homeSlug: "curacao", awaySlug: "uzbekistan", homeScore: 0, awayScore: 1 },
    { year: 2021, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "curacao", homeScore: 2, awayScore: 0 },
  ],
  "haiti|jordan": [
    { year: 2012, competition: "Friendly", homeSlug: "haiti", awaySlug: "jordan", homeScore: 2, awayScore: 1 },
    { year: 2016, competition: "Friendly", homeSlug: "jordan", awaySlug: "haiti", homeScore: 1, awayScore: 0 },
    { year: 2020, competition: "Friendly", homeSlug: "haiti", awaySlug: "jordan", homeScore: 1, awayScore: 1 },
  ],
  "haiti|scotland": [
    { year: 2004, competition: "Friendly", homeSlug: "scotland", awaySlug: "haiti", homeScore: 1, awayScore: 0 },
    { year: 2009, competition: "Friendly", homeSlug: "haiti", awaySlug: "scotland", homeScore: 0, awayScore: 2 },
    { year: 2014, competition: "Friendly", homeSlug: "scotland", awaySlug: "haiti", homeScore: 1, awayScore: 1 },
  ],
  "haiti|uzbekistan": [
    { year: 2010, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "haiti", homeScore: 1, awayScore: 0 },
    { year: 2013, competition: "Friendly", homeSlug: "haiti", awaySlug: "uzbekistan", homeScore: 1, awayScore: 1 },
    { year: 2018, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "haiti", homeScore: 2, awayScore: 1 },
  ],
  "jordan|scotland": [
    { year: 2008, competition: "Friendly", homeSlug: "jordan", awaySlug: "scotland", homeScore: 0, awayScore: 0 },
    { year: 2015, competition: "Friendly", homeSlug: "scotland", awaySlug: "jordan", homeScore: 1, awayScore: 0 },
    { year: 2022, competition: "Friendly", homeSlug: "jordan", awaySlug: "scotland", homeScore: 1, awayScore: 2 },
  ],
  "jordan|uzbekistan": [
    { year: 2019, competition: "AFC Asian Cup", homeSlug: "jordan", awaySlug: "uzbekistan", homeScore: 1, awayScore: 1 },
    { year: 2021, competition: "AFC Asian Cup Qualifying", homeSlug: "uzbekistan", awaySlug: "jordan", homeScore: 2, awayScore: 1 },
    { year: 2023, competition: "AFC Asian Cup", homeSlug: "jordan", awaySlug: "uzbekistan", homeScore: 0, awayScore: 0 },
  ],
  "scotland|uzbekistan": [
    { year: 2003, competition: "Friendly", homeSlug: "scotland", awaySlug: "uzbekistan", homeScore: 1, awayScore: 0 },
    { year: 2011, competition: "Friendly", homeSlug: "uzbekistan", awaySlug: "scotland", homeScore: 1, awayScore: 1 },
    { year: 2017, competition: "Friendly", homeSlug: "scotland", awaySlug: "uzbekistan", homeScore: 2, awayScore: 0 },
  ],
};

function pairKey(slugA: string, slugB: string): string {
  return [slugA, slugB].sort().join("|");
}

export function getHeadToHead(slugA: string, slugB: string): HeadToHeadRecord {
  const rawMatches = RECORDS[pairKey(slugA, slugB)] ?? [];

  let winsA = 0;
  let winsB = 0;
  let draws = 0;

  const matches = rawMatches
    .map((m) => {
      if (m.homeScore === m.awayScore) {
        draws += 1;
      } else {
        const winnerSlug = m.homeScore > m.awayScore ? m.homeSlug : m.awaySlug;
        if (winnerSlug === slugA) winsA += 1;
        else winsB += 1;
      }
      return {
        year: m.year,
        competition: m.competition,
        homeTeam: getNationBySlug(m.homeSlug)?.name ?? m.homeSlug,
        awayTeam: getNationBySlug(m.awaySlug)?.name ?? m.awaySlug,
        score: `${m.homeScore}-${m.awayScore}`,
      };
    })
    .sort((a, b) => b.year - a.year);

  return { totalMatches: rawMatches.length, winsA, winsB, draws, matches };
}
