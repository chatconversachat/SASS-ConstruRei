import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Bem-vindo ao seu Dyad App!</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Explore as novas funcionalidades de Automações e Agentes de IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-md text-gray-700 mb-4">
            Use a barra lateral para navegar entre as seções.
          </p>
          <p className="text-sm text-gray-500">
            Comece a construir suas automações e configurar seus agentes inteligentes agora!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;