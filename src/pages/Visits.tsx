import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Camera, Video } from 'lucide-react';
import { Visit } from '@/types';
import { useNavigate } from 'react-router-dom';
import { generateSequentialNumber, appNumberConfig, updateSequence } from '@/utils/numberGenerator';
import { toast } from 'sonner';

const Visits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Dados mockados para demonstração
  const [mockVisits, setMockVisits] = useState<Visit[]>([
    {
      id: '1',
      visit_number: '0001-23',
      lead_id: '1',
      scheduled_date: new Date().toISOString(),
      technician_id: 'Tech1',
      status: 'scheduled',
      notes: 'Visita para avaliação de reforma de cozinha',
      findings: [],
      recommendations: [],
      photos: ['photo1.jpg', 'photo2.jpg'],
      videos: ['video1.mp4'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      visit_number: '0002-23',
      lead_id: '2',
      scheduled_date: new Date(Date.now() + 86400000).toISOString(),
      technician_id: 'Tech2',
      status: 'scheduled',
      notes: 'Visita para instalação de ar condicionado',
      findings: [],
      recommendations: [],
      photos: [],
      videos: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      visit_number: '0003-23',
      lead_id: '3',
      scheduled_date: new Date(Date.now() - 86400000).toISOString(),
      technician_id: 'Tech1',
      status: 'completed',
      notes: 'Visita realizada com sucesso. Cliente aprovou orçamento.',
      findings: [],
      recommendations: [],
      photos: ['photo3.jpg', 'photo4.jpg', 'photo5.jpg'],
      videos: ['video2.mp4'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);

  const handleNewVisit = () => {
    const newId = Date.now().toString();
    const newVisitNumber = generateSequentialNumber(appNumberConfig.prefix, appNumberConfig.visitSequence);
    updateSequence('visit');
    const newVisit: Visit = {
      id: newId,
      visit_number: newVisitNumber,
      lead_id: 'new_lead',
      scheduled_date: new Date().toISOString(),
      technician_id: 'New Tech',
      status: 'scheduled',
      notes: 'Nova visita agendada',
      findings: [],
      recommendations: [],
      photos: [],
      videos: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setMockVisits([...mockVisits, newVisit]);
    navigate(`/visits/${newId}`);
    toast.success(`Nova visita ${newVisitNumber} criada!`);
  };

  const handleEditVisit = (visitNumber: string) => {
    toast.info(`Editando visita: #${visitNumber}`);
  };

  const getStatusColor = (status: Visit['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Visit['status']) => {
    const statusMap: Record<Visit['status'], string> = {
      scheduled: 'Agendada',
      completed: 'Realizada',
      cancelled: 'Cancelada'
    };
    return statusMap[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visitas Técnicas</h1>
          <p className="text-gray-600">Gestão de visitas técnicas</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar visitas..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleNewVisit}>Nova Visita</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVisits.map((visit) => (
          <Card key={visit.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Visita #{visit.visit_number}</CardTitle>
                <Badge className={getStatusColor(visit.status)}>
                  {getStatusText(visit.status)}
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
                <span>Técnico: {visit.technician_id}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Data: {new Date(visit.scheduled_date).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Horário: {new Date(visit.scheduled_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Camera className="h-4 w-4 mr-2" />
                <span>{visit.photos.length} fotos</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Video className="h-4 w-4 mr-2" />
                <span>{visit.videos.length} vídeos</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/visits/${visit.id}`)}
                >
                  Visualizar
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handleEditVisit(visit.visit_number)}>
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

export default Visits;