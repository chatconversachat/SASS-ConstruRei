import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import FileUpload from '@/components/ui/file-upload';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Clock,
  CheckCircle,
  Play,
  Pause,
  Package,
  Send,
  Camera,
  Video 
} from 'lucide-react';
import { ServiceOrder, FinancialEntry } from '@/types';
import { generateSequentialNumber, appNumberConfig, updateSequence } from '@/utils/numberGenerator';

const ServiceOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [completionNotes, setCompletionNotes] = useState('');
  const [completionPhotos, setCompletionPhotos] = useState<File[]>([]);
  const [completionVideos, setCompletionVideos] = useState<File[]>([]);
  
  const [orderData, setOrderData] = useState<ServiceOrder>(() => {
    let initialServiceOrder: ServiceOrder;
    if (location.state && (location.state as { newServiceOrder: ServiceOrder }).newServiceOrder) {
      initialServiceOrder = (location.state as { newServiceOrder: ServiceOrder }).newServiceOrder;
    } else {
      const initialServiceOrderNumber = id 
        ? `OS-${id}` 
        : `OS-${generateSequentialNumber(appNumberConfig.prefix, appNumberConfig.serviceOrderSequence)}`;
      if (!id) updateSequence('serviceOrder');

      initialServiceOrder = {
        id: id || '001',
        service_order_number: initialServiceOrderNumber,
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
          }
        ],
        materials: [
          {
            id: '1',
            name: 'Azulejos brancos 30x60',
            quantity: 20,
            unit: 'm²',
            status: 'delivered'
          }
        ],
        budget_id: 'budget1',
        client_id: 'client1',
        technician_id: 'tech1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    return initialServiceOrder;
  });

  useEffect(() => {
    if (location.state && (location.state as { newServiceOrder: ServiceOrder }).newServiceOrder) {
      const newServiceOrder = (location.state as { newServiceOrder: ServiceOrder }).newServiceOrder;
      setOrderData(newServiceOrder);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Ordem de Serviço salva com sucesso!');
  };

  const handleStartService = () => {
    setOrderData({ ...orderData, status: 'in_progress' });
    toast.success('Serviço iniciado!');
  };

  const handlePauseService = () => {
    setOrderData({ ...orderData, status: 'scheduled' });
    toast.info('Serviço pausado.');
  };

  const handleDispatchServiceOrder = () => {
    toast.success(`Ordem de Serviço ${orderData.service_order_number} disparada!`);
  };

  const handleCompleteService = () => {
    setShowCompletionForm(true);
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
    toast.success('Ordem de Serviço finalizada!');

    const financialEntry: FinancialEntry = {
      id: Date.now().toString(),
      description: `Recebimento OS #${orderData.service_order_number}`,
      value: 10500,
      type: 'income',
      status: 'pending',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      category_id: 'cat-income-services',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      related_number: orderData.service_order_number
    };
    console.log('Entrada financeira gerada:', financialEntry);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-indigo-100 text-indigo-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'finished': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      issued: 'OS Emitida',
      scheduled: 'Agendado',
      in_progress: 'Em Execução',
      finished: 'Finalizado'
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
              Disparar OS
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
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Cliente:</span>
                  <span>{orderData.client}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Técnico:</span>
                  <span>{orderData.technician || orderData.technician_id}</span>
                </div>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-medium mr-2">Endereço:</span>
                <span>{orderData.propertyAddress}</span>
              </div>
            </CardContent>
          </Card>

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
                      <Badge variant="secondary">{service.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Badge className={getStatusColor(orderData.status)}>
                  {getStatusText(orderData.status)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showCompletionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Finalizar OS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                placeholder="Detalhes da conclusão..."
              />
              <FileUpload
                onFilesAdded={(f) => setCompletionPhotos([...completionPhotos, ...f])}
                onFileRemove={(n) => setCompletionPhotos(completionPhotos.filter(p => p.name !== n))}
                acceptedFiles={completionPhotos}
                accept="image/*"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCompletionForm(false)}>Cancelar</Button>
                <Button onClick={submitCompletion}>Confirmar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ServiceOrderDetail;