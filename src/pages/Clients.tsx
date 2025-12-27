import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Phone, Mail, MapPin } from 'lucide-react';
import Modal from '@/components/common/Modal';
import ClientForm from '@/components/clients/ClientForm';
import { Client } from '@/types';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  // Dados mockados para demonstração
  const [mockClients, setMockClients] = useState<Client[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      type: 'individual',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Imobiliária Central',
      email: 'contato@imobcentral.com',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 1000 - São Paulo/SP',
      type: 'real_estate',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      email: 'maria@outlook.com',
      phone: '(11) 77777-7777',
      address: 'Rua dos Pinheiros, 500 - São Paulo/SP',
      type: 'individual',
      created_at: new Date().toISOString()
    }
  ]);

  const getTypeText = (type: string) => {
    return type === 'real_estate' ? 'Imobiliária' : 'Cliente';
  };

  const getTypeColor = (type: string) => {
    return type === 'real_estate' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const handleCreateClient = () => {
    setEditingClient(null);
    setIsClientModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsClientModalOpen(true);
  };

  const handleSaveClient = (data: any) => {
    if (editingClient) {
      // Lógica para atualizar um cliente existente
      setMockClients(prevClients => prevClients.map(c => 
        c.id === editingClient.id 
          ? { ...c, 
              name: data.name, 
              email: data.email, 
              phone: data.phone, 
              address: data.address, 
              type: data.type,
              updated_at: new Date().toISOString() // Adiciona updated_at se existir no tipo Client
            } 
          : c
      ));
    } else {
      // Lógica para criar um novo cliente
      const newClient: Client = {
        id: (mockClients.length + 1).toString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        type: data.type,
        created_at: new Date().toISOString()
      };
      setMockClients(prevClients => [...prevClients, newClient]);
    }
    setIsClientModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gestão de clientes e imobiliárias</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar clientes..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateClient}>Novo Cliente</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{client.name}</CardTitle>
                <Badge className={getTypeColor(client.type)}>
                  {getTypeText(client.type)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{client.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{client.phone}</span>
              </div>
              
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{client.address}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>Cliente desde: {new Date(client.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditClient(client)}>
                  Visualizar
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handleEditClient(client)}>
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        title={editingClient ? "Editar Cliente" : "Novo Cliente"}
        description={editingClient ? "Edite as informações do cliente." : "Preencha os dados para criar um novo cliente."}
      >
        <ClientForm 
          initialData={editingClient || undefined}
          onSave={handleSaveClient}
          onCancel={() => setIsClientModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Clients;