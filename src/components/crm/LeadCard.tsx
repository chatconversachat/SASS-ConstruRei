import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, User, DollarSign } from 'lucide-react';
import { Lead, Client } from '@/types';

interface LeadCardProps {
  lead: Lead;
  client: Client;
  onEdit: (lead: Lead, client: Client) => void;
  onView: (lead: Lead, client: Client) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, client, onEdit, onView }) => {
  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'negotiating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Lead['status']) => {
    const statusMap: Record<Lead['status'], string> = {
      received: 'Lead Recebido',
      contacted: 'Contato Realizado',
      scheduled: 'Visita Agendada',
      visited: 'Visita Realizada',
      budgeting: 'Orçamento em Elaboração',
      sent: 'Orçamento Enviado',
      negotiating: 'Em Negociação',
      approved: 'Aprovado',
      lost: 'Perdido'
    };
    return statusMap[status];
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-600">{client.type === 'real_estate' ? 'Imobiliária' : 'Cliente'}</p>
          </div>
          <Badge className={getStatusColor(lead.status)}>
            {getStatusText(lead.status)}
          </Badge>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{lead.property_address}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            <span>Responsável: {lead.responsible_id || 'Não atribuído'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>Valor estimado: R$ {lead.estimated_value?.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(lead, client)}
          >
            Visualizar
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(lead, client)}
          >
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;