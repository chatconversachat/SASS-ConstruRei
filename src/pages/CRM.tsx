import React, { useState } from 'react';
import KanbanColumn from '@/components/crm/LeadKanbanBoard';
import { Lead, Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      type: 'individual',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Imobiliária Central',
      email: 'contato@imobcentral.com',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 1000',
      type: 'real_estate',
      createdAt: new Date()
    }
  ];

  const mockLeads: Lead[] = [
    {
      id: '1',
      clientId: '1',
      propertyAddress: 'Rua das Flores, 123',
      leadSource: 'Indicação',
      estimatedValue: 15000,
      responsibleId: 'Admin',
      status: 'received',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      clientId: '2',
      propertyAddress: 'Av. Paulista, 1000',
      leadSource: 'Site',
      estimatedValue: 25000,
      responsibleId: 'Admin',
      status: 'contacted',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      clientId: '1',
      propertyAddress: 'Rua das Flores, 123',
      leadSource: 'WhatsApp',
      estimatedValue: 18000,
      responsibleId: 'Admin',
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      clientId: '2',
      propertyAddress: 'Av. Paulista, 1000',
      leadSource: 'Instagram',
      estimatedValue: 32000,
      responsibleId: 'Admin',
      status: 'visited',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const statusColumns = [
    { status: 'received', title: 'Lead Recebido' },
    { status: 'contacted', title: 'Contato Realizado' },
    { status: 'scheduled', title: 'Visita Agendada' },
    { status: 'visited', title: 'Visita Realizada' },
    { status: 'budgeting', title: 'Orçamento em Elaboração' },
    { status: 'sent', title: 'Orçamento Enviado' },
    { status: 'negotiating', title: 'Em Negociação' },
    { status: 'approved', title: 'Aprovado' },
    { status: 'lost', title: 'Perdido' }
  ];

  const handleEditLead = (lead: Lead) => {
    console.log('Editar lead:', lead);
  };

  const handleViewLead = (lead: Lead) => {
    console.log('Visualizar lead:', lead);
  };

  const handleCreateLead = (status: Lead['status']) => {
    console.log('Criar lead com status:', status);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM Comercial</h1>
          <p className="text-gray-600">Gestão de leads e oportunidades</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar leads..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Novo Lead</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ minWidth: '1200px' }}>
          {statusColumns.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status as Lead['status']}
              leads={mockLeads.filter(lead => lead.status === column.status)}
              clients={mockClients}
              onEdit={handleEditLead}
              onView={handleViewLead}
              onCreate={handleCreateLead}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRM;