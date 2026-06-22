import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Falls back to a stub client during local/demo use when Supabase env vars
// aren't configured yet — pages should treat empty data as "not seeded".
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export interface TeamRow {
  slug: string;
  name: string;
  group: string;
  confederation: string;
  fifa_ranking: number;
}

export interface MatchResultRow {
  team_slug: string;
  opponent: string;
  score: string;
  played_at: string;
}
