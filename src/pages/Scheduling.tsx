"use client";

import React, { useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Appointment } from '@/types';
import { toast } from 'sonner';
import AppointmentCreateForm from '@/components/scheduling/AppointmentCreateForm';
import AppointmentFilters from '@/components/scheduling/AppointmentFilters';
import SchedulingIndicators from '@/components/scheduling/SchedulingIndicators';

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'app1',
      title: 'Visita Técnica - Reforma Cozinha',
      date: new Date().toISOString(),
      startTime: '10:00',
      endTime: '11:30',
      clientName: 'João Silva',
      technicianName: 'Carlos Lima',
      type: 'visit',
      status: 'scheduled',
      notes: 'Avaliação inicial para orçamento de reforma de cozinha.',
      propertyAddress: 'Rua das Flores, 123 - São Paulo/SP',
    },
    {
      id: 'app2',
      title: 'Execução - Piso Sala',
      date: new Date().toISOString(),
      startTime: '14:00',
      endTime: '17:00',
      clientName: 'Maria Oliveira',
      technicianName: 'Ana Paula',
      type: 'execution',
      status: 'scheduled',
      notes: 'Início da colocação do porcelanato na sala de estar.',
      propertyAddress: 'Av. Principal, 456 - Rio de Janeiro/RJ',
    },
    {
      id: 'app3',
      title: 'Orçamento - Instalação AC',
      date: new Date().toISOString(),
      startTime: '09:30',
      endTime: '10:30',
      clientName: 'Pedro Souza',
      technicianName: 'Fernando Costa',
      type: 'budget',
      status: 'completed',
      notes: 'Visita para levantamento de pontos para instalação de ar condicionado.',
      propertyAddress: 'Rua da Praia, 789 - Salvador/BA',
    },
  ]);

  // Filtro específico para o dia selecionado (para os indicadores)
  const appointmentsForSelectedDate = appointments.filter(app => 
    selectedDate && isSameDay(parseISO(app.date), selectedDate)
  );

  // Filtro geral (pesquisa + status + tipo + data) para a lista
  const filteredAppointments = appointmentsForSelectedDate.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    const statusMap: Record<Appointment['status'], string> = {
      scheduled: 'Agendado',
      completed: 'Concluído',
      cancelled: 'Cancelado',
      rescheduled: 'Reagendado',
    };
    return statusMap[status];
  };

  const handleSaveAppointment = (newApp: Appointment) => {
    setAppointments(prev => [...prev, newApp]);
    setIsModalOpen(false);
    toast.success('Compromisso agendado com sucesso!');
  };

  const handleViewAppointmentDetails = (appointmentId: string) => {
    toast.info(`Visualizando detalhes do agendamento: ${appointmentId}`);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Indicadores Estratégicos */}
      <SchedulingIndicators appointments={appointmentsForSelectedDate} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Agenda</h1>
          <p className="text-gray-600">Planejamento e controle de operações diárias</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shadow-sm">
          Novo Agendamento
        </Button>
      </div>

      {/* Calendário em Largura Total */}
      <Card className="w-full border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-800 font-semibold">Calendário de Operações</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-2 sm:p-6 overflow-x-auto">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-xl border shadow-sm w-full max-w-4xl bg-white"
            locale={ptBR}
          />
        </CardContent>
      </Card>

      {/* Cabeçalho de Filtros */}
      <AppointmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Lista de Compromissos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            Compromissos para {selectedDate ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR }) : 'Selecione um dia'}
          </h2>
          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
            {filteredAppointments.length} registro(s)
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((app) => (
              <div key={app.id} className="group border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {app.title}
                  </h3>
                  <Badge className={getStatusColor(app.status)}>
                    {getStatusText(app.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center bg-slate-50 p-1.5 rounded-lg">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="font-semibold text-slate-700">{app.startTime} - {app.endTime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-slate-400" />
                    <span className="font-medium">Cliente: {app.clientName}</span>
                  </div>
                  
                  {app.technicianName && (
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-2 flex items-center justify-center bg-blue-100 rounded-full">
                        <User className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-xs font-semibold text-blue-700">Responsável: {app.technicianName}</span>
                    </div>
                  )}
                  
                  {app.propertyAddress && (
                    <div className="flex items-start pt-1">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" />
                      <span className="text-xs italic line-clamp-1">{app.propertyAddress}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end mt-4 pt-3 border-t border-slate-50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => handleViewAppointmentDetails(app.id)}
                  >
                    Gerenciar Registro
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-100">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Nenhum compromisso estratégico agendado para este período.</p>
              <Button variant="link" onClick={() => setIsModalOpen(true)} className="text-blue-600">
                Agendar primeiro compromisso
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Novo Agendamento Operacional</DialogTitle>
            <DialogDescription>
              Defina os parâmetros do novo compromisso para alocação de recursos e técnicos.
            </DialogDescription>
          </DialogHeader>
          <AppointmentCreateForm 
            initialDate={selectedDate}
            onSave={handleSaveAppointment}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scheduling;