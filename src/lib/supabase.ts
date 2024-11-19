import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.SUPABASE_URL!;
const anon_key = process.env.SUPABASE_ANON_KEY!;

export const supabaseServer = createClient(supabase_url, anon_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
