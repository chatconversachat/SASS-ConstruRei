import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Calendar, User, Camera, Video, FileText } from 'lucide-react';

const Execution = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const mockWorkDiary = [
    {
      id: '1',
      serviceOrderId: '123',
      date: new Date().toISOString(),
      description: 'Início da reforma da cozinha. Demolição das paredes antigas.',
      photos: ['photo1.jpg', 'photo2.jpg'],
      videos: [],
      technician: 'Carlos Silva'
    },
    {
      id: '2',
      serviceOrderId: '124',
      date: new Date(Date.now() - 86400000).toISOString(), // -1 dia
      description: 'Instalação elétrica concluída. Iniciando parte hidráulica.',
      photos: ['photo3.jpg'],
      videos: ['video1.mp4'],
      technician: 'Pedro Santos'
    },
    {
      id: '3',
      serviceOrderId: '125',
      date: new Date(Date.now() - 172800000).toISOString(), // -2 dias
      description: 'Pintura dos quartos finalizada. Iniciando pintura da sala.',
      photos: ['photo4.jpg', 'photo5.jpg', 'photo6.jpg'],
      videos: [],
      technician: 'Ana Oliveira'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Execução</h1>
          <p className="text-gray-600">Diário de obra e acompanhamento de serviços</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar registros..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Novo Registro</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockWorkDiary.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Registro #{entry.id} - OS #{entry.serviceOrderId}</CardTitle>
                <Badge variant="secondary">
                  {new Date(entry.date).toLocaleDateString('pt-BR')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>Técnico: {entry.technician}</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{entry.description}</p>
              </div>
              
              {entry.photos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Fotos ({entry.photos.length})
                  </h4>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {entry.photos.map((photo, index) => (
                      <div key={index} className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex-shrink-0" />
                    ))}
                  </div>
                </div>
              )}
              
              {entry.videos.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    Vídeos ({entry.videos.length})
                  </h4>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {entry.videos.map((video, index) => (
                      <div key={index} className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex-shrink-0 flex items-center justify-center">
                        <Video className="h-8 w-8 text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
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

export default Execution;