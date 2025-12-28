import { createClient } from '@supabase/supabase-js';

// Certifique-se de que estas variáveis de ambiente estão definidas
// VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
// VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is not defined in environment variables.');
  // Em um ambiente de produção, você pode querer lançar um erro ou redirecionar
  // throw new Error('Supabase URL or Anon Key is not defined.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);