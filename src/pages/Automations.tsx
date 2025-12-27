import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Automations = () => {
  // Mock data for automations
  const automations = [
    { id: "1", name: "Notificar Novo Lead", trigger: "Lead Criado", status: "Ativo" },
    { id: "2", name: "Atualizar Status OS", trigger: "Visita Concluída", status: "Ativo" },
    { id: "3", name: "Enviar Orçamento", trigger: "Orçamento Aprovado", status: "Inativo" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Automações</h2>
        <NavLink to="/automations/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Automação
          </Button>
        </NavLink>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader>
              <CardTitle>{automation.name}</CardTitle>
              <CardDescription>Gatilho: {automation.trigger}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Status: {automation.status}</p>
              <NavLink to={`/automations/${automation.id}`}>
                <Button variant="outline" className="mt-4 w-full">
                  Ver Detalhes
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  
};

export default Automations;