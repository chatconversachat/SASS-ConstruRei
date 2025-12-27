import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Componente protegido para rotas que requerem autenticação
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

// Componente para rotas públicas
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      {/* Dashboard agora é uma rota pública para que não seja a primeira página de login */}
      <Route 
        path="/" 
        element={
          <Layout> {/* Mantém o layout para o Dashboard */}
            <Dashboard />
          </Layout>
        } 
      />
      
      <Route 
        path="/crm" 
        element={
          <ProtectedRoute>
            <CRM />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/visits" 
        element={
          <ProtectedRoute>
            <Visits />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/visits/:id" 
        element={
          <ProtectedRoute>
            <VisitDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/budgets" 
        element={
          <ProtectedRoute>
            <Budgets />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/budgets/:id" 
        element={
          <ProtectedRoute>
            <BudgetDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/service-orders" 
        element={
          <ProtectedRoute>
            <ServiceOrders />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/service-orders/:id" 
        element={
          <ProtectedRoute>
            <ServiceOrderDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/execution" 
        element={
          <ProtectedRoute>
            <Execution />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/financial" 
        element={
          <ProtectedRoute>
            <Financial />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/fiscal" 
        element={
          <ProtectedRoute>
            <Fiscal />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/providers" 
        element={
          <ProtectedRoute>
            <Providers />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/auctions" 
        element={
          <ProtectedRoute>
            <Auctions />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;