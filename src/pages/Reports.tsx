import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Search, Download, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('commercial');
  
  // Dados mockados para demonstração
  const commercialData = [
    { name: 'Jan', leads: 45, conversions: 12, revenue: 180000 },
    { name: 'Fev', leads: 52, conversions: 15, revenue: 220000 },
    { name: 'Mar', leads: 48, conversions: 18, revenue: 250000 },
    { name: 'Abr', leads: 61, conversions: 22, revenue: 310000 },
    { name: 'Mai', leads: 55, conversions: 20, revenue: 280000 },
    { name: 'Jun', leads: 67, conversions: 25, revenue: 350000 },
  ];

  const operationalData = [
    { name: 'Jan', scheduled: 30, completed: 25, pending: 5 },
    { name: 'Fev', scheduled: 35, completed: 32, pending: 3 },
    { name: 'Mar', scheduled: 40, completed: 38, pending: 2 },
    { name: 'Abr', scheduled: 45, completed: 42, pending: 3 },
    { name: 'Mai', scheduled: 50, completed: 48, pending: 2 },
    { name: 'Jun', scheduled: 55, completed: 52, pending: 3 },
  ];

  const financialData = [
    { name: 'Receita', value: 2100000 },
    { name: 'Custos', value: 1200000 },
    { name: 'Despesas', value: 450000 },
    { name: 'Lucro', value: 450000 },
  ];

  const providerPerformance = [
    { name: 'Carlos Silva', services: 45, rating: 4.8 },
    { name: 'Pedro Santos', services: 38, rating: 4.6 },
    { name: 'Ana Oliveira', services: 42, rating: 4.9 },
    { name: 'Roberto Lima', services: 35, rating: 4.7 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const PROVIDER_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Relatórios e Dashboards</h1>
        <p className="text-gray-600">Análise de desempenho e indicadores estratégicos</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tipo de Relatório</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="operational">Operacional</SelectItem>
                  <SelectItem value="financial">Financeiro</SelectItem>
                  <SelectItem value="strategic">Estratégico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Período</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Últimos 7 dias</SelectItem>
                  <SelectItem value="month">Últimos 30 dias</SelectItem>
                  <SelectItem value="quarter">Últimos 90 dias</SelectItem>
                  <SelectItem value="year">Últimos 12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Data Inicial</label>
              <Input type="date" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Data Final</label>
              <Input type="date" />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.400</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.1M</div>
            <p className="text-xs text-muted-foreground">+18% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 450K</div>
            <p className="text-xs text-muted-foreground">+22% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.240</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos por tipo de relatório */}
      {reportType === 'commercial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Leads e Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={commercialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#3B82F6" name="Leads" />
                  <Bar dataKey="conversions" fill="#10B981" name="Conversões" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evolução da Receita</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={commercialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8B5CF6" 
                    name="Receita" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'operational' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Agendados vs Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={operationalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scheduled" fill="#3B82F6" name="Agendados" />
                  <Bar dataKey="completed" fill="#10B981" name="Concluídos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance dos Prestadores</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={providerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="services" fill="#8B5CF6" name="Serviços" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Composição Financeira</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={financialData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {financialData.map((entry, index) => (
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

          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={commercialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']}
                  />
                  <Bar dataKey="revenue" fill="#10B981" name="Receita" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'strategic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance dos Prestadores</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={providerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#F59E0B" name="Avaliação" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume de Serviços por Prestador</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={providerPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="services"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {providerPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PROVIDER_COLORS[index % PROVIDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botão de exportação */}
      <div className="flex justify-end">
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>
    </div>
  );
};

export default Reports;