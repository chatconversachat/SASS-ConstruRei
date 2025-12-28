import React from 'react';
import { Appointment } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, MapPin, CheckCircle, Clock } from 'lucide-react';

interface SchedulingIndicatorsProps {
  appointments: Appointment[];
}

const SchedulingIndicators: React.FC<SchedulingIndicatorsProps> = ({ appointments }) => {
  const visits = appointments.filter(a => a.type === 'visit').length;
  const executions = appointments.filter(a => a.type === 'execution').length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const pending = appointments.length - completed;

  const stats = [
    { 
      label: 'Visitas Técnicas', 
      value: visits, 
      icon: MapPin, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      description: 'Avaliações de campo'
    },
    { 
      label: 'Execuções / Obras', 
      value: executions, 
      icon: Wrench, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50',
      description: 'Serviços ativos'
    },
    { 
      label: 'Concluídos', 
      value: completed, 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50',
      description: 'Meta atingida'
    },
    { 
      label: 'Pendente / Total', 
      value: `${pending}/${appointments.length}`, 
      icon: Clock, 
      color: 'text-slate-600', 
      bgColor: 'bg-slate-50',
      description: 'Carga de trabalho'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-2xl font-bold text-slate-900">{stat.value}</h2>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  {stat.description}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SchedulingIndicators;