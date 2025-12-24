import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { loading } = useAuth(); // Ainda precisamos do loading para evitar redirecionamentos prematuros

  useEffect(() => {
    if (!loading) {
      // Ao invés de verificar a autenticação aqui, sempre navegue para a rota principal.
      // O ProtectedRoute em App.tsx cuidará do redirecionamento para /login se o usuário não estiver autenticado.
      navigate("/");
    }
  }, [loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return null;
};

export default Index;