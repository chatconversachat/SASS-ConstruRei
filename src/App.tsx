import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Automations from "./pages/Automations";
import AiAgents from "./pages/AiAgents";
import AutomationForm from "./pages/AutomationForm";
import AiAgentForm from "./pages/AiAgentForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="automations" element={<Automations />} />
            <Route path="automations/new" element={<AutomationForm />} />
            <Route path="automations/:id" element={<AutomationForm />} />
            <Route path="ai-agents" element={<AiAgents />} />
            <Route path="ai-agents/new" element={<AiAgentForm />} />
            <Route path="ai-agents/:id" element={<AiAgentForm />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;