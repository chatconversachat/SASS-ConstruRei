import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext"; // Comentado para desativar a verificação de autenticação inicial

const Index = () => {
  const navigate = useNavigate();
  // const { isAuthenticated, loading } = useAuth(); // Comentado para desativar a verificação de autenticação inicial

  useEffect(() => {
    // if (!loading) {
    //   if (isAuthenticated) {
    //     navigate("/");
    //   } else {
    //     navigate("/login");
    //   }
    // }
    // Redireciona sempre para o Dashboard por enquanto
    navigate("/");
  }, [navigate]); // Removido isAuthenticated e loading das dependências

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return null;
};

export default Index;