"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Client } from '@/types';
import { useSupabase } from '@/context/SupabaseContext'; // Importar o hook useSupabase

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabase(); // Obter o cliente Supabase do contexto

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*');

      if (error) {
        console.error('Erro ao buscar clientes:', error);
        setError('Erro ao carregar clientes.');
        toast.error('Erro ao carregar clientes.');
      } else {
        setClients(data as Client[]);
      }
      setLoading(false);
    };

    fetchClients();
  }, [supabase]); // Dependência do supabase para refetch se o cliente mudar (raro, mas boa prática)

  const getTypeText = (type: string) => {
    return type === 'real_estate' ? 'Imobiliária' : 'Cliente';
  };

  const getTypeColor = (type: string) => {
    return type === 'real_estate' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const handleNewClient = () => {
    toast.info('Funcionalidade de adicionar novo cliente em desenvolvimento. (Integrar com Supabase)');
  };

  const handleViewClient = (clientName: string) => {
    toast.info(`Visualizando detalhes do cliente: ${clientName} (Integrar com Supabase)`);
  };

  const handleEditClient = (clientName: string) => {
    toast.info(`Editando cliente: ${clientName} (Integrar com Supabase)`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Carregando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Tentar Novamente</Button>
      </div>
    );
  }

  const filteredClients = clients.filter(client => {
    const clientName = client.name.toLowerCase();
    const clientEmail = client.email?.toLowerCase() || '';
    const clientPhone = client.phone?.toLowerCase() || '';
    const clientAddress = client.address?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return clientName.includes(term) || clientEmail.includes(term) || clientPhone.includes(term) || clientAddress.includes(term);
  });

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
          <Button onClick={handleNewClient}>Novo Cliente</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
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
                  <span>{client.email || 'N/A'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{client.phone || 'N/A'}</span>
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{client.address || 'N/A'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Cliente desde: {new Date(client.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewClient(client.name)}
                  >
                    Visualizar
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleEditClient(client.name)}>
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">Nenhum cliente encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Clients;