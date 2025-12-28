import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "@/context/AuthContext"; // Removido
import Layout from "@/components/layout/Layout";
// import Login from "@/pages/Login"; // Removido
import Dashboard from "@/pages/Dashboard";
import CRM from "@/pages/CRM";
import ServiceOrders from "@/pages/ServiceOrders";
import Budgets from "@/pages/Budgets";
import Visits from "@/pages/Visits";
import Financial from "@/pages/Financial";
import Providers from "@/pages/Providers";
import Auctions from "@/pages/Auctions";
import Execution from "@/pages/Execution";
import Fiscal from "@/pages/Fiscal";
import Clients from "@/pages/Clients";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import BudgetDetail from "@/pages/BudgetDetail";
import VisitDetail from "@/pages/VisitDetail";
import ServiceOrderDetail from "@/pages/ServiceOrderDetail";
import Scheduling from "@/pages/Scheduling"; // Importar a nova página
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      {/* Todas as rotas agora são públicas e usam o Layout */}
      <Route 
        path="/" 
        element={
          <Layout>
            <Dashboard />
          </Layout>
        } 
      />
      
      <Route 
        path="/crm" 
        element={
          <Layout>
            <CRM />
          </Layout>
        } 
      />
      
      <Route 
        path="/visits" 
        element={
          <Layout>
            <Visits />
          </Layout>
        } 
      />
      
      <Route 
        path="/visits/:id" 
        element={
          <Layout>
            <VisitDetail />
          </Layout>
        } 
      />
      
      <Route 
        path="/budgets" 
        element={
          <Layout>
            <Budgets />
          </Layout>
        } 
      />
      
      <Route 
        path="/budgets/:id" 
        element={
          <Layout>
            <BudgetDetail />
          </Layout>
        } 
      />
      
      <Route 
        path="/service-orders" 
        element={
          <Layout>
            <ServiceOrders />
          </Layout>
        } 
      />
      
      <Route 
        path="/service-orders/:id" 
        element={
          <Layout>
            <ServiceOrderDetail />
          </Layout>
        } 
      />
      
      <Route 
        path="/execution" 
        element={
          <Layout>
            <Execution />
          </Layout>
        } 
      />
      
      <Route 
        path="/financial" 
        element={
          <Layout>
            <Financial />
          </Layout>
        } 
      />
      
      <Route 
        path="/fiscal" 
        element={
          <Layout>
            <Fiscal />
          </Layout>
        } 
      />
      
      <Route 
        path="/clients" 
        element={
          <Layout>
            <Clients />
          </Layout>
        } 
      />
      
      <Route 
        path="/providers" 
        element={
          <Layout>
            <Providers />
          </Layout>
        } 
      />
      
      <Route 
        path="/auctions" 
        element={
          <Layout>
            <Auctions />
          </Layout>
        } 
      />
      
      <Route 
        path="/reports" 
        element={
          <Layout>
            <Reports />
          </Layout>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <Layout>
            <Settings />
          </Layout>
        } 
      />

      {/* Nova rota para Agendamento */}
      <Route 
        path="/scheduling" 
        element={
          <Layout>
            <Scheduling />
          </Layout>
        } 
      />
      
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <AuthProvider> Removido */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    {/* </AuthProvider> Removido */}
  </QueryClientProvider>
);

export default App;