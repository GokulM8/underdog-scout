import { Nation } from "./types";

// Squad and fixture details are illustrative sample data for this demo app.
export const nations: Nation[] = [
  {
    slug: "curacao",
    name: "Curaçao",
    flag: "\u{1F1E8}\u{1F1FC}",
    group: "D",
    confederation: "CONCACAF",
    color: "#003DA5",
    isDebut: true,
    population: "156K",
    populationValue: 156000,
    qualificationDifficulty: 25,
    tagline: "The smallest nation ever to reach a World Cup.",
    fifaRanking: 82,
    roadTo2026: [
      { year: 2022, description: "Begins Concacaf qualifying in Round 1 as a 156,000-person underdog." },
      { year: 2023, description: "Stuns Honduras in Round 2 group play to advance unbeaten." },
      { year: 2024, description: "Edges past Trinidad & Tobago and Jamaica to reach the Concacaf final round." },
      { year: 2025, description: "Grinds out draws against Mexico and the USA to seal a historic qualification." },
      { year: 2026, description: "Becomes the smallest nation ever to reach a FIFA World Cup." },
    ],
    squad: [
      { name: "Eloy Room", position: "GK", club: "FC Cincinnati", age: 34, caps: 41, number: 1, isKeyPlayer: true },
      { name: "Leandro Bacuna", position: "MID", club: "Cádiz CF", age: 33, caps: 51, number: 6, isKeyPlayer: true },
      { name: "Gevaro Nepomuceno", position: "FWD", club: "Lechia Gdańsk", age: 31, caps: 38, number: 11 },
      { name: "Juriën Gaari", position: "MID", club: "FC Volendam", age: 26, caps: 12, number: 14 },
      { name: "Rangelo Janga", position: "FWD", club: "Sabah FK", age: 33, caps: 44, number: 9 },
    ],
    fixtures: [
      { opponent: "Mexico", opponentFlag: "\u{1F1F2}\u{1F1FD}", date: "2026-06-13", venue: "Estadio Akron, Guadalajara", status: "ft", score: "2-0" },
      { opponent: "Switzerland", opponentFlag: "\u{1F1E8}\u{1F1ED}", date: "2026-06-19", venue: "Lumen Field, Seattle", status: "live" },
      { opponent: "Senegal", opponentFlag: "\u{1F1F8}\u{1F1F3}", date: "2026-06-25", venue: "BC Place, Vancouver", status: "upcoming" },
    ],
  },
  {
    slug: "cape-verde",
    name: "Cape Verde",
    flag: "\u{1F1E8}\u{1F1FB}",
    group: "B",
    confederation: "CAF",
    color: "#003893",
    isDebut: true,
    populationValue: 593000,
    qualificationDifficulty: 22,
    tagline: "Tubarões Azuis — the Blue Sharks make their World Cup debut.",
    fifaRanking: 70,
    roadTo2026: [
      { year: 2023, description: "Finishes top of their Africa Cup of Nations qualifying group." },
      { year: 2024, description: "Reaches the AFCON quarterfinals, announcing themselves on the continental stage." },
      { year: 2024, description: "Tops CAF World Cup qualifying Group D ahead of Cameroon and Egypt." },
      { year: 2025, description: "Holds firm in the final round to lock up their qualifying spot." },
      { year: 2026, description: "Confirms a first-ever World Cup berth for the Blue Sharks." },
    ],
    squad: [
      { name: "Ryan Mendes", position: "MID", club: "CD Nacional", age: 34, caps: 45, number: 10, isKeyPlayer: true },
      { name: "Stopira", position: "DEF", club: "Gil Vicente FC", age: 36, caps: 38, number: 4, isKeyPlayer: true },
      { name: "Kenny Rocha", position: "MID", club: "Trapani Calcio", age: 25, caps: 14, number: 8 },
      { name: "Garry Rodrigues", position: "FWD", club: "Al-Wehda", age: 35, caps: 56, number: 7 },
      { name: "Elias Fernandes", position: "MID", club: "Vitória de Guimarães", age: 28, caps: 22, number: 6 },
    ],
    fixtures: [
      { opponent: "Portugal", opponentFlag: "\u{1F1F5}\u{1F1F9}", date: "2026-06-14", venue: "Mercedes-Benz Stadium, Atlanta", status: "ft", score: "1-3" },
      { opponent: "Colombia", opponentFlag: "\u{1F1E8}\u{1F1F4}", date: "2026-06-20", venue: "Hard Rock Stadium, Miami", status: "live" },
      { opponent: "Iran", opponentFlag: "\u{1F1EE}\u{1F1F7}", date: "2026-06-26", venue: "AT&T Stadium, Dallas", status: "upcoming" },
    ],
  },
  {
    slug: "jordan",
    name: "Jordan",
    flag: "\u{1F1EF}\u{1F1F4}",
    group: "G",
    confederation: "AFC",
    color: "#007A3D",
    isDebut: true,
    populationValue: 11300000,
    qualificationDifficulty: 18,
    tagline: "The Chivalrous — Asian Cup finalists chasing a historic first.",
    fifaRanking: 67,
    roadTo2026: [
      { year: 2023, description: "Reaches the AFC Asian Cup final for the first time in their history." },
      { year: 2024, description: "Advances through AFC Qualifiers Round 2 unbeaten." },
      { year: 2024, description: "Tops their Round 3 group ahead of South Korea." },
      { year: 2025, description: "Secures direct qualification in the AFC final round with games to spare." },
      { year: 2026, description: "Jordan qualifies for a first-ever FIFA World Cup." },
    ],
    squad: [
      { name: "Yazan Al-Naimat", position: "FWD", club: "Petrolul Ploiești", age: 27, caps: 35, number: 9, isKeyPlayer: true },
      { name: "Baha' Faisal", position: "MID", club: "Al-Faisaly", age: 26, caps: 18, number: 8, isKeyPlayer: true },
      { name: "Osama Rashid", position: "DEF", club: "Al-Ramtha", age: 29, caps: 25, number: 5 },
      { name: "Musa Al-Taamari", position: "FWD", club: "Montpellier HSC", age: 28, caps: 67, number: 17 },
      { name: "Mohammad Abu Zema", position: "GK", club: "Al-Faisaly", age: 24, caps: 6, number: 1 },
    ],
    fixtures: [
      { opponent: "Spain", opponentFlag: "\u{1F1EA}\u{1F1F8}", date: "2026-06-15", venue: "Levi's Stadium, San Francisco", status: "ft", score: "0-4" },
      { opponent: "Australia", opponentFlag: "\u{1F1E6}\u{1F1FA}", date: "2026-06-21", venue: "Lincoln Financial Field, Philadelphia", status: "live" },
      { opponent: "Canada", opponentFlag: "\u{1F1E8}\u{1F1E6}", date: "2026-06-27", venue: "BMO Field, Toronto", status: "upcoming" },
    ],
  },
  {
    slug: "uzbekistan",
    name: "Uzbekistan",
    flag: "\u{1F1FA}\u{1F1FF}",
    group: "H",
    confederation: "AFC",
    color: "#1EB53A",
    isDebut: true,
    populationValue: 35200000,
    qualificationDifficulty: 19,
    tagline: "The White Wolves — Central Asia's first-ever World Cup nation.",
    fifaRanking: 58,
    roadTo2026: [
      { year: 2023, description: "Reaches the AFC Asian Cup quarterfinals for the first time." },
      { year: 2024, description: "Tops AFC Qualifiers Round 2 group unbeaten." },
      { year: 2024, description: "Advances through Round 3 ahead of regional rivals." },
      { year: 2025, description: "Clinches direct qualification with games still to play." },
      { year: 2026, description: "Becomes the first Central Asian nation ever to qualify for a World Cup." },
    ],
    squad: [
      { name: "Eldor Shomurodov", position: "FWD", club: "Cagliari", age: 30, caps: 64, number: 9, isKeyPlayer: true },
      { name: "Otabek Shukurov", position: "MID", club: "Pakhtakor", age: 27, caps: 32, number: 8, isKeyPlayer: true },
      { name: "Jasur Yaxshiboyev", position: "MID", club: "Pakhtakor", age: 23, caps: 25, number: 10 },
      { name: "Abbosbek Fayzullayev", position: "FWD", club: "CSKA Moscow", age: 21, caps: 29, number: 7 },
      { name: "Lochinbek Qodirov", position: "DEF", club: "Nasaf Qarshi", age: 25, caps: 19, number: 3 },
    ],
    fixtures: [
      { opponent: "Argentina", opponentFlag: "\u{1F1E6}\u{1F1F7}", date: "2026-06-16", venue: "SoFi Stadium, Los Angeles", status: "ft", score: "0-2" },
      { opponent: "Egypt", opponentFlag: "\u{1F1EA}\u{1F1EC}", date: "2026-06-22", venue: "Arrowhead Stadium, Kansas City", status: "live" },
      { opponent: "USA", opponentFlag: "\u{1F1FA}\u{1F1F8}", date: "2026-06-28", venue: "MetLife Stadium, New Jersey", status: "upcoming" },
    ],
  },
  {
    slug: "haiti",
    name: "Haiti",
    flag: "\u{1F1ED}\u{1F1F9}",
    group: "E",
    confederation: "CONCACAF",
    color: "#00209F",
    isDebut: false,
    lastWorldCup: 1974,
    populationValue: 11700000,
    qualificationDifficulty: 20,
    tagline: "Les Grenadiers return to the world stage after 52 years.",
    fifaRanking: 85,
    roadTo2026: [
      { year: 2023, description: "Reaches the Concacaf Nations League Finals for the first time." },
      { year: 2024, description: "Tops their Concacaf qualifying Round 2 group." },
      { year: 2024, description: "Advances through Round 3 while playing home qualifiers abroad." },
      { year: 2025, description: "Secures a final-round spot in the Concacaf Sixth Round." },
      { year: 2026, description: "Haiti returns to the World Cup stage after 52 years away." },
    ],
    squad: [
      { name: "Frantzdy Pierrot", position: "FWD", club: "Le Havre AC", age: 28, caps: 26, number: 9, isKeyPlayer: true },
      { name: "Derrick Etienne", position: "MID", club: "Columbus Crew", age: 28, caps: 24, number: 7, isKeyPlayer: true },
      { name: "Mechack Jerome", position: "DEF", club: "Montreal CF", age: 32, caps: 30, number: 4 },
      { name: "Duckens Nazon", position: "FWD", club: "AC Ajaccio", age: 30, caps: 33, number: 11 },
      { name: "Steeven Saba", position: "MID", club: "AS Furiani", age: 25, caps: 11, number: 6 },
    ],
    fixtures: [
      { opponent: "Brazil", opponentFlag: "\u{1F1E7}\u{1F1F7}", date: "2026-06-13", venue: "Gillette Stadium, Boston", status: "ft", score: "0-3" },
      { opponent: "Norway", opponentFlag: "\u{1F1F3}\u{1F1F4}", date: "2026-06-19", venue: "NRG Stadium, Houston", status: "live" },
      { opponent: "Tunisia", opponentFlag: "\u{1F1F9}\u{1F1F3}", date: "2026-06-25", venue: "Estadio BBVA, Monterrey", status: "upcoming" },
    ],
  },
  {
    slug: "scotland",
    name: "Scotland",
    flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
    group: "F",
    confederation: "UEFA",
    color: "#003DA5",
    isDebut: false,
    lastWorldCup: 1998,
    populationValue: 5500000,
    qualificationDifficulty: 16,
    tagline: "The Tartan Army end a 28-year wait for the finals.",
    fifaRanking: 39,
    roadTo2026: [
      { year: 2023, description: "Tops their UEFA Euro 2024 qualifying group unbeaten." },
      { year: 2024, description: "Reaches the Euro 2024 finals in Germany." },
      { year: 2024, description: "Opens World Cup qualifying with a home win over their nearest group rival." },
      { year: 2025, description: "Clinches automatic qualification on the back of strong group-stage form." },
      { year: 2026, description: "Scotland ends a 28-year wait and returns to the World Cup." },
    ],
    squad: [
      { name: "Andy Robertson", position: "DEF", club: "Liverpool", age: 32, caps: 81, number: 3, isKeyPlayer: true },
      { name: "Scott McTominay", position: "MID", club: "Napoli", age: 29, caps: 56, number: 4, isKeyPlayer: true },
      { name: "Che Adams", position: "FWD", club: "Torino", age: 30, caps: 32, number: 9 },
      { name: "John McGinn", position: "MID", club: "Aston Villa", age: 31, caps: 68, number: 7 },
      { name: "Craig Gordon", position: "GK", club: "Hearts", age: 42, caps: 76, number: 1 },
    ],
    fixtures: [
      { opponent: "France", opponentFlag: "\u{1F1EB}\u{1F1F7}", date: "2026-06-14", venue: "Soldier Field, Chicago", status: "ft", score: "0-1" },
      { opponent: "Morocco", opponentFlag: "\u{1F1F2}\u{1F1E6}", date: "2026-06-20", venue: "Rose Bowl, Los Angeles", status: "live" },
      { opponent: "South Korea", opponentFlag: "\u{1F1F0}\u{1F1F7}", date: "2026-06-26", venue: "Estadio Banorte, Monterrey", status: "upcoming" },
    ],
  },
];

export function getNationBySlug(slug: string): Nation | undefined {
  return nations.find((n) => n.slug === slug);
}

function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function findNationByTeamName(name: string): Nation | undefined {
  const normalized = normalizeTeamName(name);
  return nations.find((n) => {
    const nationName = normalizeTeamName(n.name);
    return normalized.includes(nationName) || nationName.includes(normalized);
  });
}
