import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // Importar Input para notas de conclusão
import FileUpload from '@/components/ui/file-upload'; // Importar FileUpload
import { toast } from 'sonner'; // Importar toast
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
  Package,
  Send, // Ícone para disparar OS
  Camera, // Ícone para fotos de conclusão
  Video // Ícone para vídeos de conclusão
} from 'lucide-react';
import { ServiceOrder, FinancialEntry } from '@/types'; // Importar FinancialEntry

// Função para gerar um número de visita/orçamento/OS
const generateNumber = (prefix: string) => {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `${randomNum}-${year}`;
};

const ServiceOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false); // Estado para o formulário de conclusão
  const [completionNotes, setCompletionNotes] = useState('');
  const [completionPhotos, setCompletionPhotos] = useState<File[]>([]);
  const [completionVideos, setCompletionVideos] = useState<File[]>([]);
  
  // Estados para os dados da ordem de serviço
  const [orderData, setOrderData] = useState<ServiceOrder>({
    id: id || '001',
    service_order_number: id ? `OS-${id}` : generateNumber('OS'), // Gerar número se for nova
    client: 'João Silva', // Mocked client data
    propertyAddress: 'Rua das Flores, 123 - São Paulo/SP',
    technician: 'Carlos Silva',
    startDate: '2023-06-22T08:00:00',
    endDate: '2023-06-25T18:00:00',
    status: 'scheduled',
    notes: 'Reforma completa da cozinha com troca de armários e piso.',
    budgetId: '123', // Mocked budgetId
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
    ],
    budget_id: 'budget1', // Mocked budget_id
    client_id: 'client1', // Mocked client_id
    technician_id: 'tech1', // Mocked technician_id
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  // Efeito para carregar dados de uma nova OS vindo da página de orçamentos
  useEffect(() => {
    if (location.state && (location.state as { newServiceOrder: ServiceOrder }).newServiceOrder) {
      const newServiceOrder = (location.state as { newServiceOrder: ServiceOrder }).newServiceOrder;
      setOrderData(newServiceOrder);
      toast.info(`Ordem de Serviço ${newServiceOrder.service_order_number} carregada do orçamento.`);
      // Limpar o estado de navegação para evitar recarregar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleSave = () => {
    setIsEditing(false);
    // Lógica de salvamento (em um app real, enviaria para o backend)
    toast.success('Ordem de Serviço salva com sucesso!');
  };

  const handleStartService = () => {
    setOrderData({
      ...orderData,
      status: 'in_progress'
    });
    toast.success('Serviço iniciado!');
    // Lógica para iniciar serviço
  };

  const handlePauseService = () => {
    setOrderData({
      ...orderData,
      status: 'scheduled'
    });
    toast.info('Serviço pausado.');
    // Lógica para pausar serviço
  };

  const handleDispatchServiceOrder = () => {
    toast.success(`Ordem de Serviço ${orderData.service_order_number} disparada para o prestador ${orderData.technician}!`);
    // Em um app real, aqui seria a lógica para enviar e-mail/WhatsApp
  };

  const handleCompleteService = () => {
    setShowCompletionForm(true); // Abre o formulário de conclusão
  };

  const submitCompletion = () => {
    setOrderData(prevData => ({
      ...prevData,
      status: 'finished',
      completion_date: new Date().toISOString(),
      completion_notes: completionNotes,
      completion_photos: completionPhotos.map(f => f.name),
      completion_videos: completionVideos.map(f => f.name),
    }));
    setShowCompletionForm(false);
    toast.success('Ordem de Serviço finalizada com sucesso!');

    // Lógica para criar uma entrada financeira (conta a receber)
    const financialEntry: FinancialEntry = {
      id: Date.now().toString(),
      service_order_id: orderData.id,
      related_number: orderData.service_order_number,
      description: `Recebimento OS #${orderData.service_order_number}`,
      value: 10500, // Valor mockado, idealmente viria do orçamento
      type: 'income',
      status: 'pending',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Vencimento em 7 dias
      category_id: 'cat-income-services', // Categoria mockada
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log('Entrada financeira gerada:', financialEntry);
    toast.info('Entrada financeira gerada para esta OS.');
    // Em um app real, você enviaria `financialEntry` para o backend
  };

  const handleCompletionPhotosAdded = (newPhotos: File[]) => {
    setCompletionPhotos([...completionPhotos, ...newPhotos]);
  };

  const handleCompletionVideosAdded = (newVideos: File[]) => {
    setCompletionVideos([...completionVideos, ...newVideos]);
  };

  const handleCompletionPhotoRemove = (fileName: string) => {
    setCompletionPhotos(completionPhotos.filter(photo => photo.name !== fileName));
  };

  const handleCompletionVideoRemove = (fileName: string) => {
    setCompletionVideos(completionVideos.filter(video => video.name !== fileName));
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
            <h1 className="text-3xl font-bold text-gray-900">Ordem de Serviço #{orderData.service_order_number}</h1>
            <p className="text-gray-600">Detalhes da ordem de serviço</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {orderData.status === 'issued' && (
            <Button onClick={handleDispatchServiceOrder}>
              <Send className="h-4 w-4 mr-2" />
              Disparar OS para Prestador
            </Button>
          )}
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
                  <span>{orderData.start_date ? new Date(orderData.start_date).toLocaleDateString('pt-BR') : 'N/A'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Data de Término Prevista:</span>
                  <span>{orderData.endDate ? new Date(orderData.endDate).toLocaleDateString('pt-BR') : 'N/A'}</span>
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
                {orderData.services?.map((service) => (
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
                    {orderData.materials?.map((material) => (
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

          {/* Detalhes de Conclusão (se a OS estiver finalizada) */}
          {orderData.status === 'finished' && orderData.completion_date && (
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Conclusão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Data de Conclusão:</span>
                  <span>{new Date(orderData.completion_date).toLocaleDateString('pt-BR')}</span>
                </div>
                {orderData.completion_notes && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Notas de Conclusão:</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md whitespace-pre-line">
                      {orderData.completion_notes}
                    </p>
                  </div>
                )}
                {orderData.completion_photos && orderData.completion_photos.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Fotos de Conclusão ({orderData.completion_photos.length})
                    </h4>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {orderData.completion_photos.map((photoName, index) => (
                        <div key={index} className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex-shrink-0" />
                      ))}
                    </div>
                  </div>
                )}
                {orderData.completion_videos && orderData.completion_videos.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Video className="h-4 w-4 mr-2" />
                      Vídeos de Conclusão ({orderData.completion_videos.length})
                    </h4>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {orderData.completion_videos.map((videoName, index) => (
                        <div key={index} className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex-shrink-0 flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
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
                {orderData.status === 'finished' && orderData.completion_date && (
                  <div className="border-l-2 border-green-500 pl-4 py-1">
                    <p className="font-medium">Serviço finalizado</p>
                    <p className="text-sm text-gray-600">{new Date(orderData.completion_date).toLocaleDateString('pt-BR')} às {new Date(orderData.completion_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Conclusão da OS */}
      {showCompletionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Finalizar Ordem de Serviço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="completionNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notas de Conclusão
                </label>
                <Textarea
                  id="completionNotes"
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  placeholder="Descreva os detalhes da conclusão do serviço..."
                  rows={4}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Fotos de Conclusão</h4>
                <FileUpload
                  onFilesAdded={handleCompletionPhotosAdded}
                  onFileRemove={handleCompletionPhotoRemove}
                  acceptedFiles={completionPhotos}
                  accept="image/*"
                />
                {completionPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {completionPhotos.map((photo, index) => (
                      <div key={index} className="relative bg-gray-200 border-2 border-dashed rounded-xl w-full h-24 flex-shrink-0" />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Vídeos de Conclusão</h4>
                <FileUpload
                  onFilesAdded={handleCompletionVideosAdded}
                  onFileRemove={handleCompletionVideoRemove}
                  acceptedFiles={completionVideos}
                  accept="video/*"
                />
                {completionVideos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {completionVideos.map((video, index) => (
                      <div key={index} className="relative bg-gray-200 border-2 border-dashed rounded-xl w-full h-24 flex-shrink-0 flex items-center justify-center">
                        <Video className="h-6 w-6 text-gray-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCompletionForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={submitCompletion}>
                  Confirmar Conclusão
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ServiceOrderDetail;