export type Confederation = "CONCACAF" | "CAF" | "AFC" | "UEFA";

export type Position = "GK" | "DEF" | "MID" | "FWD";

export interface SquadPlayer {
  name: string;
  position: Position;
  club: string;
  age: number;
  caps: number;
  number: number;
  isKeyPlayer?: boolean;
}

export type FixtureStatus = "upcoming" | "live" | "ft";

export interface Fixture {
  opponent: string;
  opponentFlag: string;
  date: string;
  venue: string;
  status: FixtureStatus;
  score?: string;
}

export interface RoadToEvent {
  year: number;
  description: string;
}

export interface HiddenHero {
  name: string;
  position: string;
  club: string;
  age: number;
  goals: number;
  assists: number;
  badge_type: string;
  description: string;
}

export interface Nation {
  slug: string;
  name: string;
  flag: string;
  group: string;
  confederation: Confederation;
  color: string;
  isDebut: boolean;
  lastWorldCup?: number;
  population?: string;
  populationValue: number;
  qualificationDifficulty: number;
  tagline: string;
  fifaRanking: number;
  squad: SquadPlayer[];
  fixtures: Fixture[];
  roadTo2026: RoadToEvent[];
}
