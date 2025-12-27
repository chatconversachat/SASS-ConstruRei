import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, DollarSign, User } from 'lucide-react';
import { toast } from 'sonner'; // Importar toast

const Auctions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const mockAuctions = [
    {
      id: '1',
      serviceOrderId: '123',
      serviceName: 'Reforma de Cozinha',
      description: 'Reforma completa de cozinha com troca de armários e piso',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // +3 dias
      minBid: 8000,
      currentBid: 9500,
      bids: 5,
      status: 'active'
    },
    {
      id: '2',
      serviceOrderId: '124',
      serviceName: 'Instalação de Ar Condicionado',
      description: 'Instalação de 2 unidades de ar condicionado split',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 2).toISOString(), // +2 dias
      minBid: 2500,
      currentBid: 2800,
      bids: 3,
      status: 'active'
    },
    {
      id: '3',
      serviceOrderId: '125',
      serviceName: 'Pintura Interna',
      description: 'Pintura de 3 cômodos da residência',
      startDate: new Date(Date.now() - 86400000).toISOString(), // -1 dia
      endDate: new Date(Date.now() + 86400000 * 4).toISOString(), // +4 dias
      minBid: 1500,
      currentBid: 1500,
      bids: 1,
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'Ativo',
      completed: 'Concluído',
      cancelled: 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const handleNewAuction = () => {
    toast.info('Funcionalidade de criar novo leilão em desenvolvimento.');
  };

  const handleViewAuction = (auctionId: string) => {
    toast.info(`Visualizando detalhes do leilão: #${auctionId}`);
  };

  const handlePlaceBid = (auctionId: string) => {
    toast.info(`Funcionalidade de dar lance no leilão #${auctionId} em desenvolvimento.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leilão de Serviços</h1>
          <p className="text-gray-600">Gestão de leilões de serviços</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar leilões..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleNewAuction}>Novo Leilão</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAuctions.map((auction) => (
          <Card key={auction.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Leilão #{auction.id}</CardTitle>
                <Badge className={getStatusColor(auction.status)}>
                  {getStatusText(auction.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>OS: #{auction.serviceOrderId}</span>
              </div>
              
              <h3 className="font-medium text-gray-900">{auction.serviceName}</h3>
              <p className="text-sm text-gray-600">{auction.description}</p>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Fim: {new Date(auction.endDate).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Lance mínimo: R$ {auction.minBid.toLocaleString('pt-BR')}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Último lance: R$ {auction.currentBid.toLocaleString('pt-BR')}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>{auction.bids} lances</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewAuction(auction.id)}>
                  Visualizar
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handlePlaceBid(auction.id)}>
                  Dar Lance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Auctions;