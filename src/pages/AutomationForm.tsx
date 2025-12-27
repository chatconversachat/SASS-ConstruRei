import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { showSuccess, showError } from "@/utils/toast";

const AutomationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("");
  const [conditionJson, setConditionJson] = useState("");
  const [actionJson, setActionJson] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, fetch automation data by id
      // For now, mock data
      const mockAutomation = {
        name: "Notificar Novo Lead",
        description: "Envia uma notificação quando um novo lead é criado.",
        triggerEvent: "lead_created",
        conditionJson: JSON.stringify({ status: "new" }, null, 2),
        actionJson: JSON.stringify({ type: "send_email", to: "admin@example.com" }, null, 2),
        isActive: true,
      };
      setName(mockAutomation.name);
      setDescription(mockAutomation.description);
      setTriggerEvent(mockAutomation.triggerEvent);
      setConditionJson(mockAutomation.conditionJson);
      setActionJson(mockAutomation.actionJson);
      setIsActive(mockAutomation.isActive);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to Supabase
    if (id) {
      showSuccess("Automação atualizada com sucesso!");
    } else {
      showSuccess("Automação criada com sucesso!");
    }
    navigate("/automations");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{id ? "Editar Automação" : "Nova Automação"}</CardTitle>
        <CardDescription>
          {id ? `Editando a automação ${name}` : "Crie uma nova automação para integrar funções do sistema."}
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
              placeholder="Nome da automação"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que esta automação faz"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="triggerEvent">Evento Gatilho</Label>
            <Input
              id="triggerEvent"
              value={triggerEvent}
              onChange={(e) => setTriggerEvent(e.target.value)}
              placeholder="Ex: lead_created, service_order_status_changed"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="conditionJson">Condição (JSON)</Label>
            <Textarea
              id="conditionJson"
              value={conditionJson}
              onChange={(e) => setConditionJson(e.target.value)}
              placeholder='Ex: { "field": "status", "operator": "=", "value": "approved" }'
              rows={5}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="actionJson">Ação (JSON)</Label>
            <Textarea
              id="actionJson"
              value={actionJson}
              onChange={(e) => setActionJson(e.target.value)}
              placeholder='Ex: { "type": "send_email", "to": "admin@example.com", "subject": "Novo Lead" }'
              rows={5}
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
            {id ? "Salvar Alterações" : "Criar Automação"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AutomationForm;