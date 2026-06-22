import { Nation } from "./types";
import { nations } from "./nations";

export interface PowerIndexBreakdown {
  slug: string;
  name: string;
  flag: string;
  color: string;
  total: number;
  populationScore: number;
  rankingScore: number;
  qualificationScore: number;
  ageScore: number;
  avgAge: number;
}

const MAX_POPULATION_SCORE = 30;
const MAX_RANKING_SCORE = 25;
const MAX_QUALIFICATION_SCORE = 25;
const MAX_AGE_SCORE = 20;

function averageAge(nation: Nation): number {
  const total = nation.squad.reduce((sum, p) => sum + p.age, 0);
  return total / nation.squad.length;
}

/** Higher score for values closer to `min` (used when "lower/smaller is better"). */
function scaleInverse(value: number, min: number, max: number, maxPoints: number): number {
  if (max === min) return maxPoints;
  const ratio = (value - min) / (max - min);
  return Math.round((1 - ratio) * maxPoints);
}

export function computePowerIndex(allNations: Nation[] = nations): PowerIndexBreakdown[] {
  const populations = allNations.map((n) => n.populationValue);
  const rankings = allNations.map((n) => n.fifaRanking);
  const ages = allNations.map((n) => averageAge(n));

  const minLogPop = Math.log(Math.min(...populations));
  const maxLogPop = Math.log(Math.max(...populations));
  const minRank = Math.min(...rankings);
  const maxRank = Math.max(...rankings);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  const results = allNations.map((nation) => {
    const avgAge = averageAge(nation);

    const logPop = Math.log(nation.populationValue);
    const populationScore =
      maxLogPop === minLogPop
        ? MAX_POPULATION_SCORE
        : Math.round((1 - (logPop - minLogPop) / (maxLogPop - minLogPop)) * MAX_POPULATION_SCORE);

    const rankingScore = scaleInverse(nation.fifaRanking, minRank, maxRank, MAX_RANKING_SCORE);
    const qualificationScore = Math.min(nation.qualificationDifficulty, MAX_QUALIFICATION_SCORE);
    const ageScore = scaleInverse(avgAge, minAge, maxAge, MAX_AGE_SCORE);

    return {
      slug: nation.slug,
      name: nation.name,
      flag: nation.flag,
      color: nation.color,
      total: populationScore + rankingScore + qualificationScore + ageScore,
      populationScore,
      rankingScore,
      qualificationScore,
      ageScore,
      avgAge: Math.round(avgAge * 10) / 10,
    };
  });

  return results.sort((a, b) => b.total - a.total);
}

export const POWER_INDEX_METRICS = [
  { key: "populationScore" as const, label: "Population", max: MAX_POPULATION_SCORE },
  { key: "rankingScore" as const, label: "FIFA Ranking", max: MAX_RANKING_SCORE },
  { key: "qualificationScore" as const, label: "Qualification Difficulty", max: MAX_QUALIFICATION_SCORE },
  { key: "ageScore" as const, label: "Squad Age", max: MAX_AGE_SCORE },
];
