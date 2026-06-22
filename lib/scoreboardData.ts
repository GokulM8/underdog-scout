// Illustrative sample data for the /scoreboard page — see footer disclaimer.

export interface ScoreboardTeam {
  name: string;
  flag: string;
  isUnderdog: boolean;
  debutBadge?: "DEBUT" | "RETURN" | null;
}

export interface ScoreboardScorer {
  side: "home" | "away";
  player: string;
  minute: number;
}

export type ScoreboardStatus = "live" | "completed" | "upcoming";

export interface ScoreboardMatch {
  id: string;
  group: string;
  stadium: string;
  city: string;
  date: string;
  kickoff: string;
  status: ScoreboardStatus;
  minute?: number;
  home: ScoreboardTeam;
  away: ScoreboardTeam;
  homeScore: number | null;
  awayScore: number | null;
  scorers: ScoreboardScorer[];
  possession: { home: number; away: number };
  isUnderdogMatch: boolean;
  isUpset: boolean;
}

function team(name: string, flag: string, opts: Partial<ScoreboardTeam> = {}): ScoreboardTeam {
  return { name, flag, isUnderdog: false, debutBadge: null, ...opts };
}

let idCounter = 0;

function match(input: {
  group: string;
  stadium: string;
  city: string;
  date: string;
  kickoff: string;
  status: ScoreboardStatus;
  minute?: number;
  home: ScoreboardTeam;
  away: ScoreboardTeam;
  homeScore: number | null;
  awayScore: number | null;
  scorers?: ScoreboardScorer[];
  possession?: { home: number; away: number };
  isUpset?: boolean;
}): ScoreboardMatch {
  idCounter += 1;
  return {
    id: `m${idCounter}`,
    group: input.group,
    stadium: input.stadium,
    city: input.city,
    date: input.date,
    kickoff: input.kickoff,
    status: input.status,
    minute: input.minute,
    home: input.home,
    away: input.away,
    homeScore: input.homeScore,
    awayScore: input.awayScore,
    scorers: input.scorers ?? [],
    possession: input.possession ?? { home: 50, away: 50 },
    isUnderdogMatch: input.home.isUnderdog || input.away.isUnderdog,
    isUpset: input.isUpset ?? false,
  };
}

// Flags
const CPV = "\u{1F1E8}\u{1F1FB}";
const URU = "\u{1F1FA}\u{1F1FE}";
const POR = "\u{1F1F5}\u{1F1F9}";
const IRN = "\u{1F1EE}\u{1F1F7}";
const CUW = "\u{1F1E8}\u{1F1FC}";
const MEX = "\u{1F1F2}\u{1F1FD}";
const SUI = "\u{1F1E8}\u{1F1ED}";
const SEN = "\u{1F1F8}\u{1F1F3}";
const HTI = "\u{1F1ED}\u{1F1F9}";
const BRA = "\u{1F1E7}\u{1F1F7}";
const NOR = "\u{1F1F3}\u{1F1F4}";
const TUN = "\u{1F1F9}\u{1F1F3}";
const SCO = "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}";
const FRA = "\u{1F1EB}\u{1F1F7}";
const MAR = "\u{1F1F2}\u{1F1E6}";
const KOR = "\u{1F1F0}\u{1F1F7}";
const JOR = "\u{1F1EF}\u{1F1F4}";
const ESP = "\u{1F1EA}\u{1F1F8}";
const AUS = "\u{1F1E6}\u{1F1FA}";
const CAN = "\u{1F1E8}\u{1F1E6}";
const UZB = "\u{1F1FA}\u{1F1FF}";
const ARG = "\u{1F1E6}\u{1F1F7}";
const EGY = "\u{1F1EA}\u{1F1EC}";
const USA = "\u{1F1FA}\u{1F1F8}";
const GER = "\u{1F1E9}\u{1F1EA}";
const NED = "\u{1F1F3}\u{1F1F1}";
const GHA = "\u{1F1EC}\u{1F1ED}";
const CRC = "\u{1F1E8}\u{1F1F7}";
const ENG = "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}";
const BEL = "\u{1F1E7}\u{1F1EA}";
const NGA = "\u{1F1F3}\u{1F1EC}";
const PAN = "\u{1F1F5}\u{1F1E6}";
const CRO = "\u{1F1ED}\u{1F1F7}";
const JPN = "\u{1F1EF}\u{1F1F5}";
const ALG = "\u{1F1E9}\u{1F1FF}";
const CHI = "\u{1F1E8}\u{1F1F1}";
const ITA = "\u{1F1EE}\u{1F1F9}";
const DEN = "\u{1F1E9}\u{1F1F0}";
const CIV = "\u{1F1E8}\u{1F1EE}";
const PAR = "\u{1F1F5}\u{1F1FE}";
const WAL = "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}";
const SRB = "\u{1F1F7}\u{1F1F8}";
const KSA = "\u{1F1F8}\u{1F1E6}";
const IRQ = "\u{1F1EE}\u{1F1F6}";
const UKR = "\u{1F1FA}\u{1F1E6}";
const AUT = "\u{1F1E6}\u{1F1F9}";
const QAT = "\u{1F1F6}\u{1F1E6}";
const PER = "\u{1F1F5}\u{1F1EA}";

export const SCOREBOARD_MATCHES: ScoreboardMatch[] = [
  // Group B — Cape Verde
  match({
    group: "B",
    stadium: "Hard Rock Stadium",
    city: "Miami",
    date: "JUNE 18",
    kickoff: "2026-06-18T19:00:00Z",
    status: "live",
    minute: 89,
    home: team("Cape Verde", CPV, { isUnderdog: true, debutBadge: "DEBUT" }),
    away: team("Uruguay", URU),
    homeScore: 2,
    awayScore: 2,
    scorers: [
      { side: "home", player: "Mendes", minute: 34 },
      { side: "away", player: "Núñez", minute: 56 },
      { side: "away", player: "Valverde", minute: 78 },
      { side: "home", player: "Silva", minute: 89 },
    ],
    possession: { home: 45, away: 55 },
    isUpset: true,
  }),
  match({
    group: "B",
    stadium: "Hard Rock Stadium",
    city: "Miami",
    date: "JUNE 18",
    kickoff: "2026-06-18T16:00:00Z",
    status: "completed",
    home: team("Portugal", POR),
    away: team("Iran", IRN),
    homeScore: 3,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Leão", minute: 12 },
      { side: "home", player: "Fernandes", minute: 41 },
      { side: "away", player: "Taremi", minute: 65 },
      { side: "home", player: "Neves", minute: 80 },
    ],
    possession: { home: 58, away: 42 },
  }),

  // Group D — Curaçao
  match({
    group: "D",
    stadium: "Estadio Akron",
    city: "Guadalajara",
    date: "JUNE 13",
    kickoff: "2026-06-13T20:00:00Z",
    status: "completed",
    home: team("Curaçao", CUW, { isUnderdog: true, debutBadge: "DEBUT" }),
    away: team("Mexico", MEX),
    homeScore: 1,
    awayScore: 1,
    scorers: [
      { side: "away", player: "Jiménez", minute: 22 },
      { side: "home", player: "Janga", minute: 70 },
    ],
    possession: { home: 38, away: 62 },
    isUpset: true,
  }),
  match({
    group: "D",
    stadium: "Estadio Akron",
    city: "Guadalajara",
    date: "JUNE 13",
    kickoff: "2026-06-13T17:00:00Z",
    status: "completed",
    home: team("Switzerland", SUI),
    away: team("Senegal", SEN),
    homeScore: 2,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Embolo", minute: 15 },
      { side: "away", player: "Mané", minute: 50 },
      { side: "home", player: "Vargas", minute: 83 },
    ],
    possession: { home: 54, away: 46 },
  }),

  // Group E — Haiti
  match({
    group: "E",
    stadium: "Gillette Stadium",
    city: "Boston",
    date: "JUNE 13",
    kickoff: "2026-06-13T18:00:00Z",
    status: "completed",
    home: team("Haiti", HTI, { isUnderdog: true, debutBadge: "RETURN" }),
    away: team("Brazil", BRA),
    homeScore: 0,
    awayScore: 3,
    scorers: [
      { side: "away", player: "Vinícius Jr.", minute: 18 },
      { side: "away", player: "Rodrygo", minute: 44 },
      { side: "away", player: "Raphinha", minute: 76 },
    ],
    possession: { home: 32, away: 68 },
  }),
  match({
    group: "E",
    stadium: "Gillette Stadium",
    city: "Boston",
    date: "JUNE 13",
    kickoff: "2026-06-13T15:00:00Z",
    status: "completed",
    home: team("Norway", NOR),
    away: team("Tunisia", TUN),
    homeScore: 1,
    awayScore: 0,
    scorers: [{ side: "home", player: "Haaland", minute: 60 }],
    possession: { home: 61, away: 39 },
  }),

  // Group F — Scotland
  match({
    group: "F",
    stadium: "Soldier Field",
    city: "Chicago",
    date: "JUNE 14",
    kickoff: "2026-06-14T19:00:00Z",
    status: "completed",
    home: team("Scotland", SCO, { isUnderdog: true, debutBadge: "RETURN" }),
    away: team("France", FRA),
    homeScore: 0,
    awayScore: 1,
    scorers: [{ side: "away", player: "Mbappé", minute: 52 }],
    possession: { home: 41, away: 59 },
  }),
  match({
    group: "F",
    stadium: "Soldier Field",
    city: "Chicago",
    date: "JUNE 14",
    kickoff: "2026-06-14T16:00:00Z",
    status: "completed",
    home: team("Morocco", MAR),
    away: team("South Korea", KOR),
    homeScore: 2,
    awayScore: 2,
    scorers: [
      { side: "home", player: "Ziyech", minute: 10 },
      { side: "away", player: "Son", minute: 35 },
      { side: "home", player: "En-Nesyri", minute: 58 },
      { side: "away", player: "Lee Kang-in", minute: 90 },
    ],
    possession: { home: 49, away: 51 },
  }),

  // Group G — Jordan
  match({
    group: "G",
    stadium: "Levi's Stadium",
    city: "San Francisco",
    date: "JUNE 15",
    kickoff: "2026-06-15T20:00:00Z",
    status: "upcoming",
    home: team("Jordan", JOR, { isUnderdog: true, debutBadge: "DEBUT" }),
    away: team("Spain", ESP),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),
  match({
    group: "G",
    stadium: "Levi's Stadium",
    city: "San Francisco",
    date: "JUNE 15",
    kickoff: "2026-06-15T17:00:00Z",
    status: "upcoming",
    home: team("Australia", AUS),
    away: team("Canada", CAN),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),

  // Group H — Uzbekistan
  match({
    group: "H",
    stadium: "SoFi Stadium",
    city: "Los Angeles",
    date: "JUNE 16",
    kickoff: "2026-06-16T19:00:00Z",
    status: "upcoming",
    home: team("Uzbekistan", UZB, { isUnderdog: true, debutBadge: "DEBUT" }),
    away: team("Argentina", ARG),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),
  match({
    group: "H",
    stadium: "SoFi Stadium",
    city: "Los Angeles",
    date: "JUNE 16",
    kickoff: "2026-06-16T16:00:00Z",
    status: "live",
    minute: 60,
    home: team("Egypt", EGY),
    away: team("USA", USA),
    homeScore: 1,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Salah", minute: 28 },
      { side: "away", player: "Pulisic", minute: 49 },
    ],
    possession: { home: 47, away: 53 },
  }),

  // Group A
  match({
    group: "A",
    stadium: "NRG Stadium",
    city: "Houston",
    date: "JUNE 13",
    kickoff: "2026-06-13T18:00:00Z",
    status: "completed",
    home: team("Germany", GER),
    away: team("Ghana", GHA),
    homeScore: 4,
    awayScore: 0,
    scorers: [
      { side: "home", player: "Musiala", minute: 8 },
      { side: "home", player: "Havertz", minute: 33 },
      { side: "home", player: "Wirtz", minute: 61 },
      { side: "home", player: "Füllkrug", minute: 85 },
    ],
    possession: { home: 64, away: 36 },
  }),
  match({
    group: "A",
    stadium: "Mercedes-Benz Stadium",
    city: "Atlanta",
    date: "JUNE 14",
    kickoff: "2026-06-14T18:00:00Z",
    status: "completed",
    home: team("Netherlands", NED),
    away: team("Costa Rica", CRC),
    homeScore: 2,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Gakpo", minute: 20 },
      { side: "away", player: "Contreras", minute: 55 },
      { side: "home", player: "Simons", minute: 88 },
    ],
    possession: { home: 60, away: 40 },
  }),
  match({
    group: "A",
    stadium: "NRG Stadium",
    city: "Houston",
    date: "JUNE 19",
    kickoff: "2026-06-19T19:00:00Z",
    status: "upcoming",
    home: team("Germany", GER),
    away: team("Netherlands", NED),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),

  // Group C
  match({
    group: "C",
    stadium: "Lincoln Financial Field",
    city: "Philadelphia",
    date: "JUNE 15",
    kickoff: "2026-06-15T18:00:00Z",
    status: "completed",
    home: team("England", ENG),
    away: team("Nigeria", NGA),
    homeScore: 3,
    awayScore: 0,
    scorers: [
      { side: "home", player: "Bellingham", minute: 14 },
      { side: "home", player: "Foden", minute: 47 },
      { side: "home", player: "Kane", minute: 70 },
    ],
    possession: { home: 57, away: 43 },
  }),
  match({
    group: "C",
    stadium: "Lincoln Financial Field",
    city: "Philadelphia",
    date: "JUNE 15",
    kickoff: "2026-06-15T15:00:00Z",
    status: "completed",
    home: team("Belgium", BEL),
    away: team("Panama", PAN),
    homeScore: 1,
    awayScore: 0,
    scorers: [{ side: "home", player: "Lukaku", minute: 66 }],
    possession: { home: 63, away: 37 },
  }),
  match({
    group: "C",
    stadium: "Lincoln Financial Field",
    city: "Philadelphia",
    date: "JUNE 20",
    kickoff: "2026-06-20T18:00:00Z",
    status: "live",
    minute: 30,
    home: team("England", ENG),
    away: team("Belgium", BEL),
    homeScore: 1,
    awayScore: 0,
    scorers: [{ side: "home", player: "Saka", minute: 24 }],
    possession: { home: 52, away: 48 },
  }),

  // Group I
  match({
    group: "I",
    stadium: "Arrowhead Stadium",
    city: "Kansas City",
    date: "JUNE 16",
    kickoff: "2026-06-16T18:00:00Z",
    status: "completed",
    home: team("Croatia", CRO),
    away: team("Algeria", ALG),
    homeScore: 2,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Modrić", minute: 30 },
      { side: "away", player: "Mahrez", minute: 50 },
      { side: "home", player: "Kramarić", minute: 80 },
    ],
    possession: { home: 55, away: 45 },
  }),
  match({
    group: "I",
    stadium: "Arrowhead Stadium",
    city: "Kansas City",
    date: "JUNE 16",
    kickoff: "2026-06-16T15:00:00Z",
    status: "completed",
    home: team("Japan", JPN),
    away: team("Chile", CHI),
    homeScore: 3,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Mitoma", minute: 12 },
      { side: "home", player: "Kubo", minute: 38 },
      { side: "away", player: "Sánchez", minute: 64 },
      { side: "home", player: "Doan", minute: 90 },
    ],
    possession: { home: 59, away: 41 },
  }),
  match({
    group: "I",
    stadium: "Arrowhead Stadium",
    city: "Kansas City",
    date: "JUNE 21",
    kickoff: "2026-06-21T18:00:00Z",
    status: "upcoming",
    home: team("Croatia", CRO),
    away: team("Japan", JPN),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),

  // Group J
  match({
    group: "J",
    stadium: "AT&T Stadium",
    city: "Dallas",
    date: "JUNE 17",
    kickoff: "2026-06-17T18:00:00Z",
    status: "completed",
    home: team("Italy", ITA),
    away: team("Ivory Coast", CIV),
    homeScore: 2,
    awayScore: 2,
    scorers: [
      { side: "home", player: "Barella", minute: 11 },
      { side: "away", player: "Haller", minute: 29 },
      { side: "away", player: "Bailly", minute: 63 },
      { side: "home", player: "Scamacca", minute: 87 },
    ],
    possession: { home: 56, away: 44 },
  }),
  match({
    group: "J",
    stadium: "AT&T Stadium",
    city: "Dallas",
    date: "JUNE 17",
    kickoff: "2026-06-17T15:00:00Z",
    status: "completed",
    home: team("Denmark", DEN),
    away: team("Paraguay", PAR),
    homeScore: 1,
    awayScore: 0,
    scorers: [{ side: "home", player: "Højlund", minute: 71 }],
    possession: { home: 53, away: 47 },
  }),
  match({
    group: "J",
    stadium: "AT&T Stadium",
    city: "Dallas",
    date: "JUNE 22",
    kickoff: "2026-06-22T18:00:00Z",
    status: "upcoming",
    home: team("Italy", ITA),
    away: team("Denmark", DEN),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),

  // Group K
  match({
    group: "K",
    stadium: "MetLife Stadium",
    city: "New Jersey",
    date: "JUNE 14",
    kickoff: "2026-06-14T18:00:00Z",
    status: "completed",
    home: team("Wales", WAL),
    away: team("Saudi Arabia", KSA),
    homeScore: 1,
    awayScore: 1,
    scorers: [
      { side: "home", player: "James", minute: 40 },
      { side: "away", player: "Al-Dawsari", minute: 75 },
    ],
    possession: { home: 51, away: 49 },
  }),
  match({
    group: "K",
    stadium: "MetLife Stadium",
    city: "New Jersey",
    date: "JUNE 14",
    kickoff: "2026-06-14T15:00:00Z",
    status: "completed",
    home: team("Serbia", SRB),
    away: team("Iraq", IRQ),
    homeScore: 2,
    awayScore: 0,
    scorers: [
      { side: "home", player: "Vlahović", minute: 23 },
      { side: "home", player: "Mitrović", minute: 77 },
    ],
    possession: { home: 60, away: 40 },
  }),
  match({
    group: "K",
    stadium: "MetLife Stadium",
    city: "New Jersey",
    date: "JUNE 19",
    kickoff: "2026-06-19T18:00:00Z",
    status: "upcoming",
    home: team("Wales", WAL),
    away: team("Serbia", SRB),
    homeScore: null,
    awayScore: null,
    possession: { home: 50, away: 50 },
  }),

  // Group L
  match({
    group: "L",
    stadium: "BC Place",
    city: "Vancouver",
    date: "JUNE 18",
    kickoff: "2026-06-18T18:00:00Z",
    status: "completed",
    home: team("Ukraine", UKR),
    away: team("Qatar", QAT),
    homeScore: 1,
    awayScore: 0,
    scorers: [{ side: "home", player: "Dovbyk", minute: 54 }],
    possession: { home: 58, away: 42 },
  }),
  match({
    group: "L",
    stadium: "BC Place",
    city: "Vancouver",
    date: "JUNE 18",
    kickoff: "2026-06-18T15:00:00Z",
    status: "completed",
    home: team("Austria", AUT),
    away: team("Peru", PER),
    homeScore: 2,
    awayScore: 1,
    scorers: [
      { side: "home", player: "Arnautović", minute: 19 },
      { side: "away", player: "Lapadula", minute: 45 },
      { side: "home", player: "Gregoritsch", minute: 81 },
    ],
    possession: { home: 55, away: 45 },
  }),
  match({
    group: "L",
    stadium: "BC Place",
    city: "Vancouver",
    date: "JUNE 23",
    kickoff: "2026-06-23T18:00:00Z",
    status: "live",
    minute: 70,
    home: team("Ukraine", UKR),
    away: team("Austria", AUT),
    homeScore: 0,
    awayScore: 0,
    scorers: [],
    possession: { home: 44, away: 56 },
  }),
];

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
