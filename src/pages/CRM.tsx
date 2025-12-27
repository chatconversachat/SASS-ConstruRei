import React, { useState } from 'react';
import KanbanColumn from '@/components/crm/LeadKanbanBoard';
import { Lead, Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import LeadCreateEditForm from '@/components/crm/LeadCreateEditForm';
import LeadViewDetails from '@/components/crm/LeadViewDetails';
import { toast } from 'sonner'; // Importar toast

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Estados para os modais
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  // Dados mockados para demonstração (inicialização)
  React.useEffect(() => {
    const mockClients: Client[] = [
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
    ];

    const mockLeads: Lead[] = [
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
    ];
    setClients(mockClients);
    setLeads(mockLeads);
  }, []);


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
    setSelectedLead(null); // Para criar um novo
    setSelectedClient(null);
    setModalTitle('Novo Lead');
    setShowCreateEditModal(true);
  };

  const handleEditLead = (lead: Lead, client: Client) => {
    setSelectedLead(lead);
    setSelectedClient(client);
    setModalTitle(`Editar Lead #${lead.id}`);
    setShowCreateEditModal(true);
  };

  const handleViewLead = (lead: Lead, client: Client) => {
    setSelectedLead(lead);
    setSelectedClient(client);
    setModalTitle(`Detalhes do Lead #${lead.id}`);
    setShowViewModal(true);
  };

  const handleSaveLead = (newLead: Lead) => {
    if (selectedLead) {
      // Edição
      setLeads(leads.map(l => l.id === newLead.id ? newLead : l));
      toast.success(`Lead #${newLead.id} atualizado com sucesso!`);
    } else {
      // Criação
      setLeads([...leads, newLead]);
      // Lógica para adicionar o cliente se for novo
      if (!clients.find(c => c.id === newLead.client_id)) {
        // Isso é uma simplificação. Em um app real, o formulário de lead
        // precisaria criar ou selecionar um cliente existente.
        // Por enquanto, vamos criar um cliente mock se não existir.
        const newClient: Client = {
          id: newLead.client_id,
          name: (newLead as any).client_name || 'Novo Cliente', // Acessando do formulário
          email: (newLead as any).client_email || '',
          phone: (newLead as any).client_phone || '',
          type: 'individual',
          created_at: new Date().toISOString(),
        };
        setClients([...clients, newClient]);
      }
      toast.success(`Lead #${newLead.id} criado com sucesso!`);
    }
    setShowCreateEditModal(false);
    setSelectedLead(null);
    setSelectedClient(null);
  };

  const filteredLeads = leads.filter(lead => {
    const client = clients.find(c => c.id === lead.client_id);
    const clientName = client?.name.toLowerCase() || '';
    const address = lead.property_address.toLowerCase();
    const term = searchTerm.toLowerCase();
    return clientName.includes(term) || address.includes(term);
  });

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
              leads={filteredLeads.filter(lead => lead.status === column.status)}
              clients={clients}
              onEdit={handleEditLead}
              onView={handleViewLead}
              onCreate={handleCreateLead}
            />
          ))}
        </div>
      </div>

      {/* Modal de Cadastro/Edição de Lead */}
      <Dialog open={showCreateEditModal} onOpenChange={setShowCreateEditModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              {selectedLead ? 'Edite as informações do lead.' : 'Preencha os dados para criar um novo lead.'}
            </DialogDescription>
          </DialogHeader>
          {showCreateEditModal && ( // Renderiza o formulário apenas quando o modal está aberto
            <LeadCreateEditForm
              initialLead={selectedLead || undefined}
              initialClient={selectedClient || undefined}
              onSave={handleSaveLead}
              onCancel={() => setShowCreateEditModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Visualização de Lead */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Informações detalhadas do lead.
            </DialogDescription>
          </DialogHeader>
          {selectedLead && selectedClient && (
            <LeadViewDetails lead={selectedLead} client={selectedClient} />
          )}
          <div className="flex justify-end">
            <Button onClick={() => setShowViewModal(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRM;