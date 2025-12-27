import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 'Supabase URL or Anon Key is not defined in environment variables. Please check your .env file.';
  console.error(errorMsg);
  if (import.meta.env.DEV) {
    throw new Error(errorMsg);
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);