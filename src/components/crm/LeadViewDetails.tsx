"use client";

import React from 'react';
import { Lead, Client } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Calendar, User, Info, DollarSign } from 'lucide-react';

interface LeadViewDetailsProps {
  lead: Lead;
  client: Client;
}

const LeadViewDetails: React.FC<LeadViewDetailsProps> = ({ lead, client }) => {
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
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Detalhes do Lead #{lead.id}</h3>
            <Badge className={getStatusColor(lead.status)}>
              {getStatusText(lead.status)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-700">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Cliente:</span>
              <span className="ml-2">{client.name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">E-mail:</span>
              <span className="ml-2">{client.email || 'N/A'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Telefone:</span>
              <span className="ml-2">{client.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Responsável:</span>
              <span className="ml-2">{lead.responsible_id}</span>
            </div>
          </div>

          <div className="flex items-start text-sm text-gray-700">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
            <span className="font-medium">Endereço da Propriedade:</span>
            <span className="ml-2">{lead.property_address}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-700">
              <Info className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Origem do Lead:</span>
              <span className="ml-2">{lead.lead_source}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Valor Estimado:</span>
              <span className="ml-2">R$ {lead.estimated_value?.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium">Criado em:</span>
            <span className="ml-2">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</span>
          </div>

          {lead.notes && (
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Observações:</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-line">
                {lead.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadViewDetails;