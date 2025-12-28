"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Calendar, DollarSign, User } from 'lucide-react';
import { Budget } from '@/types';
import { useNavigate } from 'react-router-dom';
import { generateSequentialNumber, appNumberConfig, updateSequence } from '@/utils/numberGenerator';
import { toast } from 'sonner';

const Budgets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Dados mockados para demonstração
  const [mockBudgets, setMockBudgets] = useState<Budget[]>([
    {
      id: '1',
      budget_number: '0001-23',
      lead_id: '1',
      items: [
        { id: '1', description: 'Demolição de parede', quantity: 1, unit_value: 800, total_value: 800, service_type: 'Demolição' },
        { id: '2', description: 'Reforma de cozinha', quantity: 1, unit_value: 12000, total_value: 12000, service_type: 'Reforma' }
      ],
      total_value: 12800,
      status: 'sent',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sent_at: new Date().toISOString()
    },
    {
      id: '2',
      budget_number: '0002-23',
      lead_id: '2',
      items: [
        { id: '1', description: 'Instalação de ar condicionado', quantity: 2, unit_value: 2500, total_value: 5000, service_type: 'Instalação' }
      ],
      total_value: 5000,
      status: 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sent_at: new Date().toISOString(),
      approved_at: new Date().toISOString()
    }
  ]);

  const handleNewBudget = () => {
    const newId = Date.now().toString();
    const newBudgetNumber = generateSequentialNumber(appNumberConfig.prefix, appNumberConfig.budgetSequence);
    updateSequence('budget');
    const newBudget: Budget = {
      id: newId,
      budget_number: newBudgetNumber,
      lead_id: 'new_lead',
      items: [],
      total_value: 0,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setMockBudgets([...mockBudgets, newBudget]);
    navigate(`/budgets/${newId}`);
    toast.success(`Novo orçamento ${newBudgetNumber} criado!`);
  };

  const handleEditBudget = (budgetNumber: string) => {
    toast.info(`Editando orçamento: #${budgetNumber}`);
  };

  const getStatusColor = (status: Budget['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Budget['status']) => {
    const statusMap: Record<Budget['status'], string> = {
      draft: 'Rascunho',
      sent: 'Enviado',
      approved: 'Aprovado',
      rejected: 'Rejeitado'
    };
    return statusMap[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
          <p className="text-gray-600">Gestão de orçamentos</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar orçamentos..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleNewBudget}>Novo Orçamento</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBudgets.map((budget) => (
          <Card key={budget.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Orçamento #{budget.budget_number}</CardTitle>
                <Badge className={getStatusColor(budget.status)}>
                  {getStatusText(budget.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>Cliente: João Silva</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Criado em: {new Date(budget.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Valor total: R$ {budget.total_value.toLocaleString('pt-BR')}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                <span>{budget.items.length} itens</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/budgets/${budget.id}`)}
                >
                  Visualizar
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handleEditBudget(budget.budget_number)}>
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

export default Budgets;