"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Bot } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import AIAgentCard from '@/components/ai-agents/AIAgentCard';
import AIAgentForm from '@/components/ai-agents/AIAgentForm';
import { AIAgent } from '@/types';
import { toast } from 'sonner';

const AIAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: 'agent1',
      name: 'Agente SDR Principal',
      description: 'Qualifica leads recebidos e os encaminha para o CRM.',
      prompt: 'Você é um Agente de Desenvolvimento de Vendas (SDR) focado em qualificar leads. Sua tarefa é coletar informações essenciais sobre o lead, como necessidade, orçamento, autoridade e prazo (BANT).',
      n8n_workflow_id: 'sdr-workflow-123',
      n8n_webhook_url: 'https://n8n.example.com/webhook/sdr-qualify',
      type: 'sdr',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'agent2',
      name: 'Agente de Agendamento de Visitas',
      description: 'Coordena e agenda visitas técnicas com clientes.',
      prompt: 'Você é um Agente de Agendamento. Sua função é interagir com os leads qualificados para encontrar a melhor data e hora para uma visita técnica, considerando a disponibilidade dos técnicos.',
      n8n_workflow_id: 'scheduling-workflow-456',
      n8n_webhook_url: 'https://n8n.example.com/webhook/schedule-visit',
      type: 'scheduling',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'agent3',
      name: 'Agente de Suporte ao Cliente',
      description: 'Fornece respostas a perguntas frequentes e direciona para o suporte humano quando necessário.',
      prompt: 'Você é um Agente de Suporte ao Cliente. Responda a perguntas sobre nossos serviços, status de ordens e orçamentos. Se a pergunta for complexa, direcione para um atendente humano.',
      n8n_workflow_id: 'support-workflow-789',
      n8n_webhook_url: 'https://n8n.example.com/webhook/customer-support',
      type: 'support',
      status: 'inactive',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleCreateAgent = () => {
    setSelectedAgent(null);
    setModalTitle('Novo Agente de IA');
    setShowCreateEditModal(true);
  };

  const handleEditAgent = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setModalTitle(`Editar Agente: ${agent.name}`);
    setShowCreateEditModal(true);
  };

  const handleSaveAgent = (newAgent: AIAgent) => {
    if (selectedAgent) {
      setAgents(agents.map(a => a.id === newAgent.id ? newAgent : a));
      toast.success(`Agente "${newAgent.name}" atualizado com sucesso!`);
    } else {
      setAgents([...agents, newAgent]);
      toast.success(`Agente "${newAgent.name}" criado com sucesso!`);
    }
    setShowCreateEditModal(false);
    setSelectedAgent(null);
  };

  const handleToggleStatus = (agentToToggle: AIAgent) => {
    const updatedAgent = {
      ...agentToToggle,
      status: agentToToggle.status === 'active' ? 'inactive' : 'active',
      updated_at: new Date().toISOString(),
    };
    setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    toast.info(`Agente "${updatedAgent.name}" foi ${updatedAgent.status === 'active' ? 'ativado' : 'desativado'}.`);
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter(a => a.id !== agentId));
    toast.success('Agente excluído com sucesso!');
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agentes de IA</h1>
          <p className="text-gray-600">Configure e gerencie seus agentes de inteligência artificial</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar agentes..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateAgent}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Agente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <AIAgentCard 
              key={agent.id} 
              agent={agent} 
              onEdit={handleEditAgent} 
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteAgent}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">Nenhum agente de IA encontrado.</p>
        )}
      </div>

      <Dialog open={showCreateEditModal} onOpenChange={setShowCreateEditModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              {selectedAgent ? 'Edite os detalhes do agente de IA.' : 'Defina o prompt e as configurações para seu novo agente.'}
            </DialogDescription>
          </DialogHeader>
          {showCreateEditModal && (
            <AIAgentForm
              initialAgent={selectedAgent || undefined}
              onSave={handleSaveAgent}
              onCancel={() => setShowCreateEditModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAgents;