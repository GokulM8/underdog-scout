import { NormalizedMatch } from "./footballData";
import { ScoreboardMatch } from "./scoreboardData";
import { findNationByTeamName } from "./nations";

interface AtmosphereInputs {
  underdogIsLeading: boolean;
  underdogIsDrawing: boolean;
  underdogIsLosing: boolean;
  minute: number | null;
  isScorelessDraw: boolean;
  isHeavyDefeat: boolean;
  hasDebutNation: boolean;
  underdogScoredInLastFiveMinutes: boolean;
}

/** Crowd-energy score (0-100). See feature spec for the point values below. */
export function computeAtmosphereScore(input: AtmosphereInputs): number {
  let score = 50;

  if (input.underdogIsLeading) score += 35;
  else if (input.underdogIsDrawing) score += 20;
  else if (input.underdogIsLosing) score -= 15;

  if (input.minute != null) {
    if (input.minute >= 80 && input.minute <= 90) score += 10;
    if (input.minute === 45) score += 5;
  }

  if (input.underdogScoredInLastFiveMinutes) score += 25;
  if (input.isScorelessDraw) score += 5;
  if (input.isHeavyDefeat) score -= 20;
  if (input.hasDebutNation) score += 10;

  return Math.max(0, Math.min(100, score));
}

function isLiveFootballDataStatus(status: string): boolean {
  return status === "LIVE" || status === "IN_PLAY" || status === "PAUSED";
}

/** football-data.org's free tier has no goal-scorer events, so the "scored in
 * the last 5 minutes" bonus is always false for real live-feed matches. */
export function getLiveAtmosphereScore(match: NormalizedMatch): number {
  const hasScores = match.homeScore != null && match.awayScore != null;
  const { underdogSide, homeScore, awayScore } = match;

  const underdogScore = underdogSide === "home" ? homeScore : underdogSide === "away" ? awayScore : null;
  const opponentScore = underdogSide === "home" ? awayScore : underdogSide === "away" ? homeScore : null;

  const underdogIsLeading = hasScores && underdogScore != null && opponentScore != null && underdogScore > opponentScore;
  const underdogIsDrawing = hasScores && underdogScore != null && opponentScore != null && underdogScore === opponentScore;
  const underdogIsLosing = hasScores && underdogScore != null && opponentScore != null && underdogScore < opponentScore;

  const isScorelessDraw = hasScores && homeScore === 0 && awayScore === 0;
  const isHeavyDefeat = hasScores && Math.abs((homeScore as number) - (awayScore as number)) >= 2;

  const hasDebutNation =
    (findNationByTeamName(match.homeTeam)?.isDebut ?? false) ||
    (findNationByTeamName(match.awayTeam)?.isDebut ?? false);

  const minute = isLiveFootballDataStatus(match.status)
    ? match.minute
    : match.status === "FINISHED"
      ? 90
      : null;

  return computeAtmosphereScore({
    underdogIsLeading: !!underdogIsLeading,
    underdogIsDrawing: !!underdogIsDrawing,
    underdogIsLosing: !!underdogIsLosing,
    minute,
    isScorelessDraw,
    isHeavyDefeat,
    hasDebutNation,
    underdogScoredInLastFiveMinutes: false,
  });
}

export function getScoreboardAtmosphereScore(match: ScoreboardMatch): number {
  const underdogSide: "home" | "away" | null = match.home.isUnderdog
    ? "home"
    : match.away.isUnderdog
      ? "away"
      : null;

  const hasScores = match.homeScore != null && match.awayScore != null;
  const underdogScore = underdogSide === "home" ? match.homeScore : underdogSide === "away" ? match.awayScore : null;
  const opponentScore = underdogSide === "home" ? match.awayScore : underdogSide === "away" ? match.homeScore : null;

  const underdogIsLeading = hasScores && underdogScore != null && opponentScore != null && underdogScore > opponentScore;
  const underdogIsDrawing = hasScores && underdogScore != null && opponentScore != null && underdogScore === opponentScore;
  const underdogIsLosing = hasScores && underdogScore != null && opponentScore != null && underdogScore < opponentScore;

  const isScorelessDraw = hasScores && match.homeScore === 0 && match.awayScore === 0;
  const isHeavyDefeat =
    hasScores && Math.abs((match.homeScore as number) - (match.awayScore as number)) >= 2;

  const hasDebutNation = match.home.debutBadge === "DEBUT" || match.away.debutBadge === "DEBUT";

  const minute =
    match.status === "live" ? match.minute ?? null : match.status === "completed" ? 90 : null;

  const underdogScoredInLastFiveMinutes =
    underdogSide != null &&
    minute != null &&
    match.scorers.some((s) => s.side === underdogSide && s.minute >= minute - 5);

  return computeAtmosphereScore({
    underdogIsLeading: !!underdogIsLeading,
    underdogIsDrawing: !!underdogIsDrawing,
    underdogIsLosing: !!underdogIsLosing,
    minute,
    isScorelessDraw,
    isHeavyDefeat,
    hasDebutNation,
    underdogScoredInLastFiveMinutes,
  });
}
