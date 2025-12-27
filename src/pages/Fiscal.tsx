import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner'; // Importar toast

const Fiscal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados mockados para demonstração
  const dreData = [
    { name: 'Receita Bruta', value: 150000 },
    { name: '(-) Impostos', value: 22500 },
    { name: '(-) Custos Diretos', value: 60000 },
    { name: '(-) Despesas Operacionais', value: 30000 },
    { name: 'Lucro Líquido', value: 37500 },
  ];

  const revenueData = [
    { name: 'Jan', receita: 25000, despesa: 18000 },
    { name: 'Fev', receita: 22000, despesa: 16000 },
    { name: 'Mar', receita: 28000, despesa: 20000 },
    { name: 'Abr', receita: 30000, despesa: 22000 },
    { name: 'Mai', receita: 27000, despesa: 19000 },
    { name: 'Jun', receita: 35000, despesa: 25000 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  const handleExportDRE = () => {
    toast.info('Funcionalidade de exportar DRE em desenvolvimento.');
  };

  const handleViewDocument = (docName: string) => {
    toast.info(`Visualizando documento fiscal: ${docName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fiscal e DRE</h1>
          <p className="text-gray-600">Demonstrativo de resultados e gestão fiscal</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar documentos..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleExportDRE}>Exportar DRE</Button>
        </div>
      </div>

      {/* Resumo Fiscal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Bruta</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 150.000</div>
            <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impostos</CardTitle>
            <FileText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 22.500</div>
            <p className="text-xs text-muted-foreground">15% da receita</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Diretos</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 60.000</div>
            <p className="text-xs text-muted-foreground">40% da receita</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 37.500</div>
            <p className="text-xs text-muted-foreground">25% da receita</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>DRE Resumida</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']}
                />
                <Bar dataKey="value" name="Valor">
                  {dreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Composição do Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dreData.filter(item => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {dreData.filter(item => item.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Demonstrativo de Resultados */}
      <Card>
        <CardHeader>
          <CardTitle>Demonstrativo de Resultados (DRE)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-right py-2">Valor (R$)</th>
                  <th className="text-right py-2">% Receita</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Receita Bruta</td>
                  <td className="py-3 text-right">150.000,00</td>
                  <td className="py-3 text-right">100%</td>
                </tr>
                <tr className="border-b bg-red-50">
                  <td className="py-3 pl-6">(-) Impostos</td>
                  <td className="py-3 text-right text-red-600">22.500,00</td>
                  <td className="py-3 text-right text-red-600">15%</td>
                </tr>
                <tr className="border-b bg-red-50">
                  <td className="py-3 pl-6">(-) Custos Diretos</td>
                  <td className="py-3 text-right text-red-600">60.000,00</td>
                  <td className="py-3 text-right text-red-600">40%</td>
                </tr>
                <tr className="border-b bg-red-50">
                  <td className="py-3 pl-6">(-) Despesas Operacionais</td>
                  <td className="py-3 text-right text-red-600">30.000,00</td>
                  <td className="py-3 text-right text-red-600">20%</td>
                </tr>
                <tr className="border-b bg-green-50 font-bold">
                  <td className="py-3">Lucro Líquido</td>
                  <td className="py-3 text-right">37.500,00</td>
                  <td className="py-3 text-right">25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Documentos Fiscais */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Fiscais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Nota Fiscal #12345', date: '15/06/2023', value: 'R$ 5.000,00', status: 'emitida' },
              { name: 'Nota Fiscal #12346', date: '18/06/2023', value: 'R$ 3.500,00', status: 'emitida' },
              { name: 'Nota Fiscal #12347', date: '20/06/2023', value: 'R$ 7.200,00', status: 'emitida' },
            ].map((doc, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.date}</p>
                  </div>
                  <Badge variant="secondary">{doc.status}</Badge>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-medium">{doc.value}</span>
                  <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc.name)}>Visualizar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fiscal;