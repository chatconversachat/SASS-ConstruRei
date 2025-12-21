import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, AlertCircle } from 'lucide-react';
import { ServiceOrder } from '@/types';

const ServiceOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const mockServiceOrders: ServiceOrder[] = [
    {
      id: '1',
      budget_id: '1',
      client_id: '1',
      technician_id: 'Tech1',
      status: 'issued',
      start_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      budget_id: '2',
      client_id: '2',
      technician_id: 'Tech2',
      status: 'scheduled',
      start_date: new Date(Date.now() + 86400000).toISOString(), // +1 dia
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      budget_id: '3',
      client_id: '1',
      technician_id: 'Tech1',
      status: 'in_progress',
      start_date: new Date(Date.now() - 86400000).toISOString(), // -1 dia
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      budget_id: '4',
      client_id: '3',
      technician_id: 'Tech3',
      status: 'waiting_material',
      start_date: new Date(Date.now() - 172800000).toISOString(), // -2 dias
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      budget_id: '5',
      client_id: '2',
      technician_id: 'Tech2',
      status: 'finished',
      start_date: new Date(Date.now() - 604800000).toISOString(), // -7 dias
      end_date: new Date(Date.now() - 86400000).toISOString(), // -1 dia
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const getStatusColor = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'issued': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-indigo-100 text-indigo-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'waiting_material': return 'bg-orange-100 text-orange-800';
      case 'finished': return 'bg-green-100 text-green-800';
      case 'billed': return 'bg-teal-100 text-teal-800';
      case 'paid': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ServiceOrder['status']) => {
    const statusMap: Record<ServiceOrder['status'], string> = {
      approved: 'Aprovado',
      issued: 'OS Emitida',
      scheduled: 'Agendado',
      in_progress: 'Em Execução',
      waiting_material: 'Aguardando Material',
      finished: 'Finalizado',
      billed: 'Faturado',
      paid: 'Pago'
    };
    return statusMap[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
          <p className="text-gray-600">Gestão de execução de serviços</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar ordens..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Nova OS</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServiceOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">OS #{order.id}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>Cliente: João Silva</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>Prestador: Técnico {order.technician_id}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Início: {order.start_date ? new Date(order.start_date).toLocaleDateString('pt-BR') : 'Não definido'}</span>
              </div>
              
              {order.status === 'waiting_material' && (
                <div className="flex items-center text-sm text-orange-600 bg-orange-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>Aguardando material</span>
                </div>
              )}
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Visualizar
                </Button>
                <Button size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceOrders;