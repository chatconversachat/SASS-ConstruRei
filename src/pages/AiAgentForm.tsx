import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { showSuccess, showError } from "@/utils/toast";

const AiAgentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [promptTemplate, setPromptTemplate] = useState("");
  const [agentType, setAgentType] = useState("custom");
  const [n8nFlowId, setN8nFlowId] = useState("");
  const [n8nWorkflowJson, setN8nWorkflowJson] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, fetch AI agent data by id
      // For now, mock data
      const mockAgent = {
        name: "Agente SDR",
        description: "Agente para qualificação de leads.",
        promptTemplate: "Você é um agente SDR. Qualifique o lead com base nas seguintes informações: {lead_info}",
        agentType: "sdr",
        n8nFlowId: "flow-sdr-123",
        n8nWorkflowJson: JSON.stringify({ nodes: [], connections: [] }, null, 2),
        isActive: true,
      };
      setName(mockAgent.name);
      setDescription(mockAgent.description);
      setPromptTemplate(mockAgent.promptTemplate);
      setAgentType(mockAgent.agentType);
      setN8nFlowId(mockAgent.n8nFlowId);
      setN8nWorkflowJson(mockAgent.n8nWorkflowJson);
      setIsActive(mockAgent.isActive);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to Supabase
    if (id) {
      showSuccess("Agente de IA atualizado com sucesso!");
    } else {
      showSuccess("Agente de IA criado com sucesso!");
    }
    navigate("/ai-agents");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{id ? "Editar Agente de IA" : "Novo Agente de IA"}</CardTitle>
        <CardDescription>
          {id ? `Editando o agente ${name}` : "Crie e configure um novo agente de IA, com ou sem integração n8n."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do agente de IA"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a função deste agente"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="promptTemplate">Template do Prompt</Label>
            <Textarea
              id="promptTemplate"
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              placeholder="Ex: Você é um agente SDR. Qualifique o lead com base em: {lead_info}"
              rows={7}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agentType">Tipo de Agente</Label>
            <Select value={agentType} onValueChange={setAgentType}>
              <SelectTrigger id="agentType">
                <SelectValue placeholder="Selecione o tipo de agente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sdr">SDR</SelectItem>
                <SelectItem value="scheduling">Agendamento</SelectItem>
                <SelectItem value="support">Suporte</SelectItem>
                <SelectItem value="service_manager">Gestor de Serviços</SelectItem>
                <SelectItem value="customer_service">Atendimento ao Cliente</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="n8nFlowId">ID do Fluxo n8n (Opcional)</Label>
            <Input
              id="n8nFlowId"
              value={n8nFlowId}
              onChange={(e) => setN8nFlowId(e.target.value)}
              placeholder="ID do fluxo n8n associado"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="n8nWorkflowJson">JSON do Workflow n8n (Opcional)</Label>
            <Textarea
              id="n8nWorkflowJson"
              value={n8nWorkflowJson}
              onChange={(e) => setN8nWorkflowJson(e.target.value)}
              placeholder="Cole o JSON do workflow n8n aqui para importação/exportação"
              rows={10}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="isActive">Ativo</Label>
          </div>
          <Button type="submit" className="w-full">
            {id ? "Salvar Alterações" : "Criar Agente de IA"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AiAgentForm;