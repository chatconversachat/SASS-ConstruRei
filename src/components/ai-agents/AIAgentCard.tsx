"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Bot, Link as LinkIcon, PlayCircle, PauseCircle } from 'lucide-react';
import { AIAgent } from '@/types';

interface AIAgentCardProps {
  agent: AIAgent;
  onEdit: (agent: AIAgent) => void;
  onToggleStatus: (agent: AIAgent) => void;
  onDelete: (agentId: string) => void;
}

const AIAgentCard: React.FC<AIAgentCardProps> = ({ agent, onEdit, onToggleStatus, onDelete }) => {
  const getStatusColor = (status: AIAgent['status']) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getTypeColor = (type: AIAgent['type']) => {
    switch (type) {
      case 'sdr': return 'bg-blue-100 text-blue-800';
      case 'scheduling': return 'bg-purple-100 text-purple-800';
      case 'support': return 'bg-yellow-100 text-yellow-800';
      case 'service_manager': return 'bg-indigo-100 text-indigo-800';
      case 'customer_service': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: AIAgent['type']) => {
    const typeMap: Record<AIAgent['type'], string> = {
      sdr: 'SDR',
      scheduling: 'Agendamento',
      support: 'Suporte',
      service_manager: 'Gestor de Serviços',
      customer_service: 'Atendimento ao Cliente',
      other: 'Outro',
    };
    return typeMap[type];
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-600" />
              {agent.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">{agent.description}</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={getStatusColor(agent.status)}>
              {agent.status === 'active' ? 'Ativo' : 'Inativo'}
            </Badge>
            <Badge className={getTypeColor(agent.type)}>
              {getTypeText(agent.type)}
            </Badge>
          </div>
        </div>

        {agent.n8n_workflow_id && (
          <p className="text-xs text-gray-500 flex items-center mb-2">
            <LinkIcon className="h-3 w-3 mr-1" />
            n8n Workflow ID: <span className="font-mono ml-1">{agent.n8n_workflow_id}</span>
          </p>
        )}
        {agent.n8n_webhook_url && (
          <p className="text-xs text-gray-500 flex items-center mb-2">
            <LinkIcon className="h-3 w-3 mr-1" />
            n8n Webhook: <span className="font-mono ml-1 truncate">{agent.n8n_webhook_url}</span>
          </p>
        )}

        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          <span className="font-medium">Prompt:</span> {agent.prompt}
        </p>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(agent)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onToggleStatus(agent)}
            className={agent.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}
          >
            {agent.status === 'active' ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
            {agent.status === 'active' ? 'Desativar' : 'Ativar'}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(agent.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentCard;