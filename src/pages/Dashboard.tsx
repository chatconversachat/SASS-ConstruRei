"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Users, 
  FileText, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Wrench,
  ShoppingCart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Dados mockados para os cards
  const stats = [
    { title: 'Receita Total', value: 'R$ 125.430', change: '+12%', icon: DollarSign, trend: 'up' },
    { title: 'Novos Clientes', value: '24', change: '+8%', icon: Users, trend: 'up' },
    { title: 'Orçamentos', value: '18', change: '-3%', icon: FileText, trend: 'down' },
    { title: 'Ordens em Andamento', value: '12', change: '+5%', icon: Calendar, trend: 'up' },
  ];

  // Dados para o gráfico de faturamento
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Abr', value: 2780 },
    { name: 'Mai', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  // Dados para o gráfico de status
  const statusData = [
    { name: 'Aprovados', value: 400 },
    { name: 'Em Andamento', value: 300 },
    { name: 'Finalizados', value: 300 },
    { name: 'Cancelados', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status das Ordens</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Atividades recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Novo orçamento criado', description: 'Orçamento #123 para reforma de cozinha', time: 'há 10 minutos', icon: FileText },
                { action: 'Visita agendada', description: 'Visita técnica para cliente João Silva', time: 'há 1 hora', icon: Wrench },
                { action: 'Ordem de serviço emitida', description: 'OS #45 para instalação de ar condicionado', time: 'há 2 horas', icon: Calendar },
                { action: 'Pagamento recebido', description: 'Recebimento de R$ 2.500,00 da OS #42', time: 'há 3 horas', icon: DollarSign },
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <activity.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prestadores Destaques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Carlos Silva', services: 15, rating: 4.8, icon: ShoppingCart },
                { name: 'Pedro Santos', services: 12, rating: 4.7, icon: ShoppingCart },
                { name: 'Ana Oliveira', services: 10, rating: 4.9, icon: ShoppingCart },
              ].map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-gray-600">{provider.services} serviços</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{provider.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;