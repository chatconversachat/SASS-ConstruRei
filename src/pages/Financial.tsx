import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, DollarSign, TrendingUp, TrendingDown, Plus, Edit, Receipt, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { FinancialEntry } from '@/types';

const Financial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados com o DNA (Related Number)
  const [financialEntries, setFinancialEntries] = useState<FinancialEntry[]>([
    { id: '1', description: 'Pagamento OS #0001-23', value: 5000, type: 'income', status: 'paid', due_date: '2023-06-15', payment_date: '2023-06-15', category_id: 'cat1', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0001-23' },
    { id: '2', description: 'Material para reforma', value: 2500, type: 'expense', status: 'paid', due_date: '2023-06-10', payment_date: '2023-06-10', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0001-23' },
    { id: '3', description: 'Pagamento técnico', value: 1200, type: 'expense', status: 'paid', due_date: '2023-06-05', payment_date: '2023-06-05', category_id: 'cat3', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0002-23' },
    { id: '4', description: 'OS #0002-23', value: 3500, type: 'income', status: 'pending', due_date: '2023-06-20', category_id: 'cat1', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0002-23' },
    { id: '5', description: 'Equipamentos', value: 8000, type: 'expense', status: 'pending', due_date: '2023-06-25', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0003-23' },
  ]);

  const revenueData = [
    { name: 'Jan', receita: 4000, despesa: 2400 },
    { name: 'Fev', receita: 3000, despesa: 1398 },
    { name: 'Mar', receita: 2000, despesa: 1800 },
    { name: 'Abr', receita: 2780, despesa: 2000 },
    { name: 'Mai', receita: 1890, despesa: 1500 },
    { name: 'Jun', receita: 2390, despesa: 1900 },
  ];

  const cashFlowData = [
    { name: 'Entradas', value: 15000 },
    { name: 'Saídas', value: 12000 },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  const getTypeColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Atrasado'
    };
    return statusMap[status] || status;
  };

  const handleAddEntry = () => {
    toast.info('Funcionalidade de adicionar lançamento com vínculo de DNA em desenvolvimento.');
  };

  const handleEditEntry = (entryId: string) => {
    toast.info(`Editando lançamento ${entryId}.`);
  };

  const handleDeleteEntry = (entryId: string) => {
    setFinancialEntries(financialEntries.filter(entry => entry.id !== entryId));
    toast.success('Lançamento excluído.');
  };

  const handleIssueInvoice = (entryId?: string) => {
    toast.success(`Nota fiscal processada para o registro.`);
  };

  // Filtragem básica por DNA ou descrição
  const filteredEntries = financialEntries.filter(entry => 
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.related_number && entry.related_number.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">Gestão financeira por serviço/obra (DNA)</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar por DNA (ex: 0001-23)..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.000</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.000</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.000</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lançamentos Financeiros (DNA do Serviço)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">DNA do Serviço</th>
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-left py-2">Valor</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">Vencimento</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-3">
                      <Badge variant="outline" className="font-mono bg-blue-50 text-blue-700 border-blue-200">
                        {entry.related_number || 'S/ DNA'}
                      </Badge>
                    </td>
                    <td className="py-3">{entry.description}</td>
                    <td className={`py-3 font-medium ${getTypeColor(entry.type)}`}>
                      {entry.type === 'income' ? '+' : '-'} R$ {entry.value.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3">
                      <Badge variant={entry.type === 'income' ? 'default' : 'destructive'}>
                        {entry.type === 'income' ? 'Receita' : 'Despesa'}
                      </Badge>
                    </td>
                    <td className="py-3">{new Date(entry.due_date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3">
                      <Badge className={getStatusColor(entry.status)}>
                        {getStatusText(entry.status)}
                      </Badge>
                    </td>
                    <td className="py-3 flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditEntry(entry.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;