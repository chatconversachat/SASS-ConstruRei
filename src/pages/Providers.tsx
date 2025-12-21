import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Star, Phone, Mail } from 'lucide-react';

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const mockProviders = [
    {
      id: '1',
      name: 'Carlos Silva',
      email: 'carlos@construtora.com',
      phone: '(11) 99999-9999',
      services: ['Pintura', 'Reforma', 'Elétrica'],
      rating: 4.8,
      documents: ['doc1.pdf', 'doc2.pdf'],
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Pedro Santos',
      email: 'pedro@pedreiro.com',
      phone: '(11) 88888-8888',
      services: ['Hidráulica', 'Instalação', 'Manutenção'],
      rating: 4.7,
      documents: ['doc3.pdf'],
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Ana Oliveira',
      email: 'ana@pintura.com',
      phone: '(11) 77777-7777',
      services: ['Pintura', 'Textura', 'Decoração'],
      rating: 4.9,
      documents: ['doc4.pdf', 'doc5.pdf', 'doc6.pdf'],
      created_at: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prestadores</h1>
          <p className="text-gray-600">Gestão de prestadores de serviço</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar prestadores..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Novo Prestador</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProviders.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span className="font-medium">{provider.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{provider.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{provider.phone}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>{provider.services.length} serviços</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {provider.services.slice(0, 3).map((service, index) => (
                  <Badge key={index} variant="secondary">{service}</Badge>
                ))}
                {provider.services.length > 3 && (
                  <Badge variant="secondary">+{provider.services.length - 3}</Badge>
                )}
              </div>
              
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

export default Providers;