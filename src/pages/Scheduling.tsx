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

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'app1',
      title: 'Visita Técnica - Reforma Cozinha',
      date: '2023-07-25T10:00:00Z',
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
      title: 'Reunião - Projeto Banheiro',
      date: '2023-07-25T14:00:00Z',
      startTime: '14:00',
      endTime: '15:00',
      clientName: 'Maria Oliveira',
      technicianName: 'Ana Paula',
      type: 'meeting',
      status: 'scheduled',
      notes: 'Discussão sobre materiais e cronograma do projeto do banheiro.',
      propertyAddress: 'Av. Principal, 456 - Rio de Janeiro/RJ',
    },
    {
      id: 'app3',
      title: 'Orçamento - Instalação AC',
      date: '2023-07-26T09:30:00Z',
      startTime: '09:30',
      endTime: '10:30',
      clientName: 'Pedro Souza',
      technicianName: 'Fernando Costa',
      type: 'budget',
      status: 'scheduled',
      notes: 'Visita para levantamento de pontos para instalação de ar condicionado.',
      propertyAddress: 'Rua da Praia, 789 - Salvador/BA',
    },
  ]);

  const appointmentsForSelectedDate = appointments.filter(app => 
    selectedDate && isSameDay(parseISO(app.date), selectedDate)
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600">Gerencie seus compromissos e visitas</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Novo Agendamento</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visualização da Agenda</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-0 md:p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto"
              locale={ptBR}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Compromissos para {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: ptBR }) : 'Nenhum dia selecionado'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointmentsForSelectedDate.length > 0 ? (
              appointmentsForSelectedDate.map((app) => (
                <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{app.title}</h3>
                    <Badge className={getStatusColor(app.status)}>
                      {getStatusText(app.status)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{app.startTime} - {app.endTime}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>Cliente: {app.clientName}</span>
                    </div>
                    {app.technicianName && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Técnico: {app.technicianName}</span>
                      </div>
                    )}
                    {app.propertyAddress && (
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{app.propertyAddress}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm" onClick={() => handleViewAppointmentDetails(app.id)}>Ver Detalhes</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">Nenhum compromisso para esta data.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para reservar um horário na agenda.
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