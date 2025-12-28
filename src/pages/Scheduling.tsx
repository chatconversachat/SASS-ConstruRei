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
import { Appointment, Visit } from '@/types';
import { toast } from 'sonner';
import AppointmentCreateForm from '@/components/scheduling/AppointmentCreateForm';
import AppointmentFilters from '@/components/scheduling/AppointmentFilters';
import SchedulingIndicators from '@/components/scheduling/SchedulingIndicators';
import { generateSequentialNumber, appNumberConfig, updateSequence } from '@/utils/numberGenerator';

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      visit_id: 'vis1'
    }
  ]);

  const appointmentsForSelectedDate = appointments.filter(app => 
    selectedDate && isSameDay(parseISO(app.date), selectedDate)
  );

  const filteredAppointments = appointmentsForSelectedDate.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleSaveAppointment = (newApp: Appointment) => {
    let updatedApp = { ...newApp };

    if (newApp.type === 'visit') {
      const visitId = `vis-${Date.now()}`;
      const visitNumber = generateSequentialNumber(appNumberConfig.prefix, appNumberConfig.visitSequence);
      updateSequence('visit');

      const newVisit: Visit = {
        id: visitId,
        visit_number: visitNumber,
        lead_id: 'auto-generated',
        appointment_id: newApp.id,
        scheduled_date: newApp.date,
        technician_id: newApp.technicianName || 'Não atribuído',
        status: 'scheduled',
        notes: newApp.notes,
        findings: [],
        recommendations: [],
        photos: [],
        videos: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        client: newApp.clientName,
        propertyAddress: newApp.propertyAddress,
        technician: newApp.technicianName
      };

      updatedApp.visit_id = visitId;
      toast.info(`Registro de Visita ${visitNumber} gerado automaticamente.`);
    }

    setAppointments(prev => [...prev, updatedApp]);
    setIsModalOpen(false);
    toast.success('Compromisso agendado com sucesso!');
  };

  const handleViewAppointmentDetails = (app: Appointment) => {
    if (app.type === 'visit' && app.visit_id) {
      toast.info(`Visualizando detalhes da Visita vinculada...`);
    } else {
      toast.info(`Visualizando detalhes do agendamento: ${app.id}`);
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 max-w-full">
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

      <AppointmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

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
                  <h3 className="font-bold text-slate-900 line-clamp-1">
                    {app.title}
                  </h3>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status === 'completed' ? 'Concluído' : 'Agendado'}
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
                </div>
                
                <div className="flex justify-end mt-4 pt-3 border-t border-slate-50">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600"
                    onClick={() => handleViewAppointmentDetails(app)}
                  >
                    {app.type === 'visit' ? 'Acessar Visita' : 'Ver Detalhes'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-100">
              <p className="text-slate-500 font-medium">Nenhum compromisso estratégico agendado.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Novo Agendamento Operacional</DialogTitle>
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