import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import FileUpload from '@/components/ui/file-upload';
import SignaturePad from '@/components/ui/signature-pad';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
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
    return {
      id: id || '001',
      visit_number: `VIS-${id || '0001'}`,
      lead_id: 'lead1',
      appointment_id: 'app1', 
      scheduled_date: new Date().toISOString(),
      technician_id: 'Tech1',
      status: 'scheduled',
      notes: 'Avaliação inicial para reforma de cozinha.',
      findings: ['Infiltração leve', 'Piso solto'],
      recommendations: ['Impermeabilização', 'Troca de piso'],
      photos: [],
      videos: [],
      client: 'João Silva',
      propertyAddress: 'Rua das Flores, 123',
      technician: 'Carlos Lima',
      scheduledDate: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  const handleCompleteVisit = () => {
    if (photos.length === 0 && videos.length === 0) {
      toast.error('É obrigatório anexar pelo menos uma foto ou vídeo para concluir a visita.');
      return;
    }

    if (visitData.findings.length === 0 || !visitData.notes) {
      toast.error('É obrigatório preencher as constatações e observações da visita.');
      return;
    }

    setVisitData({
      ...visitData,
      status: 'completed',
      photos: photos.map(f => f.name),
      videos: videos.map(f => f.name),
    });

    if (visitData.appointment_id) {
      console.log(`[AUTOMAÇÃO] Compromisso ${visitData.appointment_id} marcado como CONCLUÍDO.`);
      toast.success('Compromisso na agenda marcado automaticamente como concluído!');
    }

    toast.success('Visita técnica finalizada com sucesso!');
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Alterações salvas.');
  };

  const handlePhotosAdded = (newPhotos: File[]) => setPhotos([...photos, ...newPhotos]);
  const handleVideosAdded = (newVideos: File[]) => setVideos([...videos, ...newVideos]);
  const handlePhotoRemove = (name: string) => setPhotos(photos.filter(p => p.name !== name));
  const handleVideoRemove = (name: string) => setVideos(videos.filter(v => v.name !== name));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visita Técnica #{visitData.visit_number}</h1>
            <p className="text-gray-600">Gestão operacional de campo</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {visitData.status === 'scheduled' && (
            <Button onClick={handleCompleteVisit} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalizar e Concluir Agenda
            </Button>
          )}
          {visitData.status === 'completed' && (
            <Button onClick={() => toast.info('Gerando orçamento...')}>
              <DollarSign className="h-4 w-4 mr-2" />
              Gerar Orçamento
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Informações Operacionais</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-sm"><User className="h-4 w-4 mr-2 text-slate-400" /> <b>Cliente:</b> <span className="ml-2">{visitData.client}</span></div>
              <div className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-slate-400" /> <b>Data:</b> <span className="ml-2">{format(parseISO(visitData.scheduled_date), 'dd/MM/yyyy')}</span></div>
              <div className="flex items-start text-sm col-span-2"><MapPin className="h-4 w-4 mr-2 text-slate-400" /> <b>Local:</b> <span className="ml-2">{visitData.propertyAddress}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Relatório de Campo</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Constatações Técnicas</label>
                <Textarea 
                  placeholder="Descreva o que foi encontrado..." 
                  value={visitData.findings.join('\n')}
                  onChange={(e) => setVisitData({...visitData, findings: e.target.value.split('\n')})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Observações Gerais</label>
                <Textarea 
                  placeholder="Notas adicionais..." 
                  value={visitData.notes}
                  onChange={(e) => setVisitData({...visitData, notes: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Evidências Fotográficas</CardTitle></CardHeader>
            <CardContent>
              <FileUpload onFilesAdded={handlePhotosAdded} onFileRemove={handlePhotoRemove} acceptedFiles={photos} accept="image/*" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Evidências em Vídeo</CardTitle></CardHeader>
            <CardContent>
              <FileUpload onFilesAdded={handleVideosAdded} onFileRemove={handleVideoRemove} acceptedFiles={videos} accept="video/*" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Status do Processo</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Badge className={visitData.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                {visitData.status === 'completed' ? 'Realizada' : 'Agendada'}
              </Badge>
              <p className="text-xs text-center text-slate-500">
                A conclusão desta visita atualizará automaticamente o status do compromisso na Agenda.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisitDetail;