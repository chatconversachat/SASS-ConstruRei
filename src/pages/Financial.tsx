import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, DollarSign, TrendingUp, TrendingDown, Plus, Edit, Receipt, Trash2 } from 'lucide-react'; // Importar Receipt
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner'; // Importar toast
import { FinancialEntry } from '@/types'; // Importar FinancialEntry

const Financial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const [financialEntries, setFinancialEntries] = useState<FinancialEntry[]>([
    { id: '1', description: 'Pagamento OS #123', value: 5000, type: 'income', status: 'paid', dueDate: '2023-06-15', paymentDate: '2023-06-15', category_id: 'cat1', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: 'OS-123' },
    { id: '2', description: 'Material para reforma', value: 2500, type: 'expense', status: 'paid', dueDate: '2023-06-10', paymentDate: '2023-06-10', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: 'OS-123' },
    { id: '3', description: 'Pagamento técnico', value: 1200, type: 'expense', status: 'paid', dueDate: '2023-06-05', paymentDate: '2023-06-05', category_id: 'cat3', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: 'OS-124' },
    { id: '4', description: 'OS #124', value: 3500, type: 'income', status: 'pending', dueDate: '2023-06-20', category_id: 'cat1', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: 'OS-124' },
    { id: '5', description: 'Equipamentos', value: 8000, type: 'expense', status: 'pending', dueDate: '2023-06-25', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: 'OS-125' },
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
    toast.info('Funcionalidade de adicionar lançamento em desenvolvimento.');
    // Lógica para abrir um modal/formulário de adição
  };

  const handleEditEntry = (entryId: string) => {
    toast.info(`Funcionalidade de editar lançamento ${entryId} em desenvolvimento.`);
    // Lógica para abrir um modal/formulário de edição
  };

  const handleDeleteEntry = (entryId: string) => {
    setFinancialEntries(financialEntries.filter(entry => entry.id !== entryId));
    toast.success('Lançamento excluído com sucesso!');
    // Lógica para excluir lançamento
  };

  const handleIssueInvoice = (entryId?: string) => {
    if (entryId) {
      toast.success(`Nota fiscal emitida e enviada para o lançamento ${entryId}!`);
    } else {
      toast.success('Nota fiscal emitida e enviada para o cliente!');
    }
    // Lógica para emissão e envio de nota fiscal
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">Gestão financeira completa</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar lançamentos..." 
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

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.000</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.000</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 3.000</div>
            <p className="text-xs text-muted-foreground">+22% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="receita" fill="#10B981" name="Receita" />
                <Bar dataKey="despesa" fill="#EF4444" name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entradas vs Saídas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cashFlowData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {cashFlowData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lançamentos Financeiros */}
      <Card>
        <CardHeader>
          <CardTitle>Lançamentos Financeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-left py-2">Número Relacionado</th> {/* Novo cabeçalho */}
                  <th className="text-left py-2">Valor</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">Vencimento</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {financialEntries.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-3">{entry.description}</td>
                    <td className="py-3 text-sm text-gray-600">{entry.related_number || 'N/A'}</td> {/* Exibir número relacionado */}
                    <td className={`py-3 font-medium ${getTypeColor(entry.type)}`}>
                      {entry.type === 'income' ? '+' : '-'} R$ {entry.value.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3">
                      <Badge variant={entry.type === 'income' ? 'default' : 'destructive'}>
                        {entry.type === 'income' ? 'Receita' : 'Despesa'}
                      </Badge>
                    </td>
                    <td className="py-3">{new Date(entry.dueDate).toLocaleDateString('pt-BR')}</td>
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
                      {entry.type === 'income' && entry.status === 'paid' && (
                        <Button variant="secondary" size="sm" onClick={() => handleIssueInvoice(entry.id)}>
                          <Receipt className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleIssueInvoice()}>
              <Receipt className="h-4 w-4 mr-2" />
              Emitir Nota Fiscal Geral
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;