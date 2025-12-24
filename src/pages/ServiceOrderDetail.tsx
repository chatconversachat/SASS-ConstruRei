import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Package
} from 'lucide-react';

const ServiceOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para os dados da ordem de serviço
  const [orderData, setOrderData] = useState({
    client: 'João Silva',
    propertyAddress: 'Rua das Flores, 123 - São Paulo/SP',
    technician: 'Carlos Silva',
    startDate: '2023-06-22T08:00:00',
    endDate: '2023-06-25T18:00:00',
    status: 'scheduled',
    notes: 'Reforma completa da cozinha com troca de armários e piso.',
    budgetId: '123',
    services: [
      {
        id: '1',
        description: 'Demolição de parede',
        status: 'completed',
        startDate: '2023-06-22T08:00:00',
        endDate: '2023-06-22T12:00:00'
      },
      {
        id: '2',
        description: 'Instalação hidráulica',
        status: 'in_progress',
        startDate: '2023-06-22T13:00:00',
        endDate: null
      },
      {
        id: '3',
        description: 'Instalação elétrica',
        status: 'pending',
        startDate: null,
        endDate: null
      },
      {
        id: '4',
        description: 'Revestimento de parede',
        status: 'pending',
        startDate: null,
        endDate: null
      }
    ],
    materials: [
      {
        id: '1',
        name: 'Azulejos brancos 30x60',
        quantity: 20,
        unit: 'm²',
        status: 'delivered'
      },
      {
        id: '2',
        name: 'Piso laminado',
        quantity: 15,
        unit: 'm²',
        status: 'ordered'
      },
      {
        id: '3',
        name: 'Torneira monocomando',
        quantity: 2,
        unit: 'un',
        status: 'pending'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Lógica de salvamento
  };

  const handleStartService = () => {
    setOrderData({
      ...orderData,
      status: 'in_progress'
    });
    // Lógica para iniciar serviço
  };

  const handlePauseService = () => {
    setOrderData({
      ...orderData,
      status: 'scheduled'
    });
    // Lógica para pausar serviço
  };

  const handleCompleteService = () => {
    setOrderData({
      ...orderData,
      status: 'finished'
    });
    // Lógica para completar serviço
  };

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      approved: 'Aprovado',
      issued: 'OS Emitida',
      scheduled: 'Agendado',
      in_progress: 'Em Execução',
      waiting_material: 'Aguardando Material',
      finished: 'Finalizado',
      billed: 'Faturado',
      paid: 'Pago'
    };
    return statusMap[status] || status;
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      completed: 'Concluído',
      in_progress: 'Em Andamento',
      pending: 'Pendente'
    };
    return statusMap[status] || status;
  };

  const getMaterialStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaterialStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      delivered: 'Entregue',
      ordered: 'Pedido',
      pending: 'Pendente'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ordem de Serviço #{id || '001'}</h1>
            <p className="text-gray-600">Detalhes da ordem de serviço</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {orderData.status === 'scheduled' && (
            <Button onClick={handleStartService}>
              <Play className="h-4 w-4 mr-2" />
              Iniciar Serviço
            </Button>
          )}
          
          {orderData.status === 'in_progress' && (
            <>
              <Button variant="outline" onClick={handlePauseService}>
                <Pause className="h-4 w-4 mr-2" />
                Pausar
              </Button>
              <Button onClick={handleCompleteService}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Informações da OS */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Ordem de Serviço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Cliente:</span>
                  <span>{orderData.client}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Técnico:</span>
                  <span>{orderData.technician}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Data de Início:</span>
                  <span>{new Date(orderData.startDate).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Data de Término:</span>
                  <span>{new Date(orderData.endDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-medium mr-2">Endereço:</span>
                <span>{orderData.propertyAddress}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium mr-2">Orçamento:</span>
                <span>#{orderData.budgetId}</span>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={orderData.notes}
                  onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{orderData.notes}</p>
              )}
            </CardContent>
          </Card>

          {/* Serviços */}
          <Card>
            <CardHeader>
              <CardTitle>Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{service.description}</h3>
                      <Badge className={getServiceStatusColor(service.status)}>
                        {getServiceStatusText(service.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                      {service.startDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Início: {new Date(service.startDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                      
                      {service.endDate && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Término: {new Date(service.endDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Materiais */}
          <Card>
            <CardHeader>
              <CardTitle>Materiais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Material</th>
                      <th className="text-center py-2">Quantidade</th>
                      <th className="text-center py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.materials.map((material) => (
                      <tr key={material.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2 text-gray-500" />
                            {material.name}
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          {material.quantity} {material.unit}
                        </td>
                        <td className="py-3 text-center">
                          <Badge className={getMaterialStatusColor(material.status)}>
                            {getMaterialStatusText(material.status)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Badge className={getStatusColor(orderData.status)} size="lg">
                  {getStatusText(orderData.status)}
                </Badge>
                
                <div className="w-full space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancelar Edição' : 'Editar OS'}
                  </Button>
                  
                  {isEditing && (
                    <Button className="w-full" onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progresso */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Serviços Concluídos</span>
                    <span>1 de 4</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: '25%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Materiais Entregues</span>
                    <span>1 de 3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: '33%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <p className="font-medium">OS emitida</p>
                  <p className="text-sm text-gray-600">15/06/2023 às 14:30</p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4 py-1">
                  <p className="font-medium">Serviço agendado</p>
                  <p className="text-sm text-gray-600">20/06/2023 às 09:00</p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4 py-1">
                  <p className="font-medium">Serviço iniciado</p>
                  <p className="text-sm text-gray-600">22/06/2023 às 08:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceOrderDetail;