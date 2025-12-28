import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import FileUpload from '@/components/ui/file-upload';
import SignaturePad from '@/components/ui/signature-pad';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Camera, 
  Video, 
  Clock,
  CheckCircle,
  XCircle,
  DollarSign 
} from 'lucide-react';
import { Visit, Budget } from '@/types';
import { generateSequentialNumber, appNumberConfig, updateSequence } from '@/utils/numberGenerator';

const VisitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  
  const [visitData, setVisitData] = useState<Visit>(() => {
    const initialVisitNumber = id 
      ? `VIS-${id}` 
      : `VIS-${generateSequentialNumber(appNumberConfig.prefix, appNumberConfig.visitSequence)}`;
    if (!id) updateSequence('visit');
    
    return {
      id: id || '001',
      visit_number: initialVisitNumber,
      client: 'João Silva',
      propertyAddress: 'Rua das Flores, 123 - São Paulo/SP',
      technician: 'Carlos Silva',
      scheduledDate: '2023-06-20T10:00:00',
      scheduled_date: '2023-06-20T10:00:00',
      technician_id: 'Tech1',
      status: 'scheduled',
      notes: 'Visita para avaliação de reforma de cozinha. Cliente relatou problemas com azulejos e piso.',
      findings: [
        'Azulejos da cozinha com rachaduras',
        'Piso com desníveis',
        'Torneira com vazamento'
      ],
      recommendations: [
        'Substituição completa dos azulejos',
        'Nivelamento do piso',
        'Troca da torneira'
      ],
      photos: [],
      videos: [],
      lead_id: 'lead1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Visita salva com sucesso!');
  };

  const handleCompleteVisit = () => {
    setVisitData({
      ...visitData,
      status: 'completed',
      photos: photos.map(f => f.name),
      videos: videos.map(f => f.name),
    });
    toast.success('Visita finalizada com sucesso!');
  };

  const handleCancelVisit = () => {
    setVisitData({
      ...visitData,
      status: 'cancelled'
    });
    toast.info('Visita cancelada.');
  };

  const handlePhotosAdded = (newPhotos: File[]) => {
    setPhotos([...photos, ...newPhotos]);
  };

  const handleVideosAdded = (newVideos: File[]) => {
    setVideos([...videos, ...newVideos]);
  };

  const handlePhotoRemove = (fileName: string) => {
    setPhotos(photos.filter(photo => photo.name !== fileName));
  };

  const handleVideoRemove = (fileName: string) => {
    setVideos(videos.filter(video => video.name !== fileName));
  };

  const handleSignatureSave = (dataUrl: string) => {
    setSignature(dataUrl);
    setShowSignaturePad(false);
    toast.success('Assinatura salva!');
  };

  const handleSignatureCancel = () => {
    setSignature(null);
    setShowSignaturePad(false);
    toast.info('Assinatura cancelada.');
  };

  const handleGenerateBudget = () => {
    if (visitData.status !== 'completed') {
      toast.error('A visita precisa ser finalizada para gerar um orçamento.');
      return;
    }
    if (photos.length === 0 && videos.length === 0) {
      toast.error('É necessário anexar fotos ou vídeos para gerar um orçamento.');
      return;
    }

    const newBudgetId = Date.now().toString();
    const newBudget: Budget = {
      id: newBudgetId,
      budget_number: visitData.visit_number.replace('VIS-', 'ORC-'),
      lead_id: visitData.lead_id,
      visit_id: visitData.id,
      items: [
        { id: 'item1', description: 'Serviço de Demolição', quantity: 1, unit_value: 500, total_value: 500, service_type: 'Demolição' },
        { id: 'item2', description: 'Reforma Geral', quantity: 1, unit_value: 10000, total_value: 10000, service_type: 'Reforma' },
      ],
      total_value: 10500,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    updateSequence('budget');
    navigate(`/budgets/${newBudgetId}`, { state: { newBudget } });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      scheduled: 'Agendada',
      completed: 'Realizada',
      cancelled: 'Cancelada'
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
            <h1 className="text-3xl font-bold text-gray-900">Visita Técnica #{visitData.visit_number}</h1>
            <p className="text-gray-600">Detalhes da visita técnica</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {visitData.status === 'scheduled' && (
            <>
              <Button variant="outline" onClick={handleCancelVisit}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleCompleteVisit}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Visita
              </Button>
            </>
          )}
          {visitData.status === 'completed' && (
            <Button onClick={handleGenerateBudget}>
              <DollarSign className="h-4 w-4 mr-2" />
              Gerar Orçamento
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Visita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Cliente:</span>
                  <span>{visitData.client}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Técnico:</span>
                  <span>{visitData.technician}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Data:</span>
                  <span>{visitData.scheduledDate ? new Date(visitData.scheduledDate).toLocaleDateString('pt-BR') : 'N/A'}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">Horário:</span>
                  <span>{visitData.scheduledDate ? new Date(visitData.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
                </div>
              </div>
              
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-medium mr-2">Endereço:</span>
                <span>{visitData.propertyAddress}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={visitData.notes || ''}
                  onChange={(e) => setVisitData({...visitData, notes: e.target.value})}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{visitData.notes}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Constatações</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  {visitData.findings.map((finding, index) => (
                    <div key={index} className="flex items-center">
                      <Input
                        value={finding}
                        onChange={(e) => {
                          const newFindings = [...visitData.findings];
                          newFindings[index] = e.target.value;
                          setVisitData({...visitData, findings: newFindings});
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newFindings = [...visitData.findings];
                          newFindings.splice(index, 1);
                          setVisitData({...visitData, findings: newFindings});
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisitData({
                      ...visitData,
                      findings: [...visitData.findings, '']
                    })}
                  >
                    Adicionar Constatação
                  </Button>
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {visitData.findings.map((finding, index) => (
                    <li key={index} className="text-gray-700">{finding}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-2">
                  {visitData.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center">
                      <Input
                        value={recommendation}
                        onChange={(e) => {
                          const newRecommendations = [...visitData.recommendations];
                          newRecommendations[index] = e.target.value;
                          setVisitData({...visitData, recommendations: newRecommendations});
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newRecommendations = [...visitData.recommendations];
                          newRecommendations.splice(index, 1);
                          setVisitData({...visitData, recommendations: newRecommendations});
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisitData({
                      ...visitData,
                      recommendations: [...visitData.recommendations, '']
                    })}
                  >
                    Adicionar Recomendação
                  </Button>
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {visitData.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-gray-700">{recommendation}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fotos</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesAdded={handlePhotosAdded}
                onFileRemove={handlePhotoRemove}
                acceptedFiles={photos}
                accept="image/*"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vídeos</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesAdded={handleVideosAdded}
                onFileRemove={handleVideoRemove}
                acceptedFiles={videos}
                accept="video/*"
              />
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
                <Badge className={getStatusColor(visitData.status)}>
                  {getStatusText(visitData.status)}
                </Badge>
                
                <div className="w-full space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancelar Edição' : 'Editar Visita'}
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

          <Card>
            <CardHeader>
              <CardTitle>Assinatura</CardTitle>
            </CardHeader>
            <CardContent>
              {signature ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-2 bg-gray-50">
                    <img 
                      src={signature} 
                      alt="Assinatura do cliente" 
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowSignaturePad(true)}
                  >
                    Substituir Assinatura
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Nenhuma assinatura registrada
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => setShowSignaturePad(true)}
                  >
                    Adicionar Assinatura
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {showSignaturePad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <SignaturePad 
              onSave={handleSignatureSave}
              onCancel={handleSignatureCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitDetail;