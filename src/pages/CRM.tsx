import React, { useState } from 'react';
import KanbanColumn from '@/components/crm/LeadKanbanBoard';
import { Lead, Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Modal from '@/components/common/Modal';
import LeadForm from '@/components/crm/LeadForm';

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<{ lead: Lead; client: Client } | null>(null);
  
  // Dados mockados para demonstração
  const [mockClients, setMockClients] = useState<Client[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      type: 'individual',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Imobiliária Central',
      email: 'contato@imobcentral.com',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 1000',
      type: 'real_estate',
      created_at: new Date().toISOString()
    }
  ]);

  const [mockLeads, setMockLeads] = useState<Lead[]>([
    {
      id: '1',
      client_id: '1',
      property_address: 'Rua das Flores, 123',
      lead_source: 'Indicação',
      estimated_value: 15000,
      responsible_id: 'Admin',
      status: 'received',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      client_id: '2',
      property_address: 'Av. Paulista, 1000',
      lead_source: 'Site',
      estimated_value: 25000,
      responsible_id: 'Admin',
      status: 'contacted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      client_id: '1',
      property_address: 'Rua das Flores, 123',
      lead_source: 'WhatsApp',
      estimated_value: 18000,
      responsible_id: 'Admin',
      status: 'scheduled',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      client_id: '2',
      property_address: 'Av. Paulista, 1000',
      lead_source: 'Instagram',
      estimated_value: 32000,
      responsible_id: 'Admin',
      status: 'visited',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);

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

  const handleCreateLead = (status: Lead['status']) => {
    setEditingLead(null);
    setIsLeadModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    const client = mockClients.find(c => c.id === lead.client_id);
    if (client) {
      setEditingLead({ lead, client });
      setIsLeadModalOpen(true);
    } else {
      console.error("Cliente não encontrado para o lead:", lead);
    }
  };

  const handleViewLead = (lead: Lead) => {
    // Por enquanto, a visualização será feita no mesmo modal de edição
    handleEditLead(lead);
  };

  const handleSaveLead = (data: any) => {
    if (editingLead) {
      // Lógica para atualizar um lead existente
      setMockLeads(prevLeads => prevLeads.map(l => 
        l.id === editingLead.lead.id 
          ? { ...l, 
              property_address: data.propertyAddress, 
              lead_source: data.leadSource, 
              estimated_value: data.estimatedValue, 
              responsible_id: data.responsibleId, 
              status: data.status,
              notes: data.notes,
              updated_at: new Date().toISOString()
            } 
          : l
      ));
      setMockClients(prevClients => prevClients.map(c => 
        c.id === editingLead.client.id
          ? { ...c,
              name: data.clientName,
              email: data.clientEmail,
              phone: data.clientPhone,
            }
          : c
      ));
    } else {
      // Lógica para criar um novo lead
      const newClientId = (mockClients.length + 1).toString();
      const newClient: Client = {
        id: newClientId,
        name: data.clientName,
        email: data.clientEmail,
        phone: data.clientPhone,
        address: data.propertyAddress, // Usando o endereço da propriedade como endereço do cliente por simplicidade
        type: 'individual', // Default para individual
        created_at: new Date().toISOString()
      };
      setMockClients(prevClients => [...prevClients, newClient]);

      const newLead: Lead = {
        id: (mockLeads.length + 1).toString(),
        client_id: newClientId,
        property_address: data.propertyAddress,
        lead_source: data.leadSource,
        estimated_value: data.estimatedValue,
        responsible_id: data.responsibleId,
        status: data.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        notes: data.notes,
      };
      setMockLeads(prevLeads => [...prevLeads, newLead]);
    }
    setIsLeadModalOpen(false);
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
          <Button onClick={() => handleCreateLead('received')}>Novo Lead</Button>
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

      <Modal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title={editingLead ? "Editar Lead" : "Novo Lead"}
        description={editingLead ? "Edite as informações do lead e do cliente." : "Preencha os dados para criar um novo lead."}
      >
        <LeadForm 
          initialData={editingLead || undefined}
          onSave={handleSaveLead}
          onCancel={() => setIsLeadModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CRM;