import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const AiAgents = () => {
  // Mock data for AI agents
  const aiAgents = [
    { id: "1", name: "Agente SDR", type: "SDR", status: "Ativo", n8nFlow: "flow-sdr-123" },
    { id: "2", name: "Agente Agendamento", type: "Agendamento", status: "Ativo", n8nFlow: "flow-agenda-456" },
    { id: "3", name: "Agente Suporte", type: "Suporte", status: "Inativo", n8nFlow: "flow-support-789" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agentes de IA</h2>
        <NavLink to="/ai-agents/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Agente
          </Button>
        </NavLink>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {aiAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>Tipo: {agent.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Status: {agent.status}</p>
              {agent.n8nFlow && <p>Fluxo n8n: {agent.n8nFlow}</p>}
              <NavLink to={`/ai-agents/${agent.id}`}>
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

export default AiAgents;