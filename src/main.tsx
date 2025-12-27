import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { SupabaseProvider } from "./context/SupabaseContext.tsx"; // Importar o provedor

createRoot(document.getElementById("root")!).render(
  <SupabaseProvider> {/* Envolver o App com o SupabaseProvider */}
    <App />
  </SupabaseProvider>
);