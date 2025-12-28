import { createClient } from '@supabase/supabase-js';

// These variables are provided by the Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// We provide empty strings as fallbacks to prevent immediate crash, 
// but Supabase will still require valid values to function correctly.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);