import { createClient } from '@supabase/supabase-js';

// Certifique-se de que estas variáveis de ambiente estão definidas
// VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
// VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 'Supabase URL or Anon Key is not defined in environment variables. Please check your .env file.';
  console.error(errorMsg);
  // Em um ambiente de desenvolvimento, lançar um erro é útil para parar a execução
  // Em produção, você pode querer lidar com isso de forma mais graciosa
  if (import.meta.env.DEV) {
    throw new Error(errorMsg);
  }
  // Se não estiver em DEV, podemos criar um cliente inválido que falhará nas chamadas
  // para evitar quebrar o app inteiro imediatamente.
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);