import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Lead, Client } from '@/types';
import LeadCard from './LeadCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  title: string;
  status: Lead['status'];
  leads: Lead[];
  clients: Client[];
  onEdit: (lead: Lead, client: Client) => void;
  onView: (lead: Lead, client: Client) => void;
  onCreate: (status: Lead['status']) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  status, 
  leads, 
  clients,
  onEdit,
  onView,
  onCreate
}) => {
  const [items, setItems] = useState(leads);

  // Note: DndContext and SortableContext are for drag-and-drop reordering within a column.
  // For cross-column drag-and-drop (changing status), more complex logic would be needed
  // involving updating the lead's status in the parent CRM component.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Card className="flex-1 min-w-[300px] max-w-[350px]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs font-medium">
            {leads.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[500px]">
        <Button 
          variant="outline" 
          className="w-full border-dashed"
          onClick={() => onCreate(status)} // Botão de adicionar lead
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Lead
        </Button>
        
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.map((lead) => {
                const client = clients.find(c => c.id === lead.client_id) || {
                  id: 'unknown',
                  name: 'Cliente Desconhecido',
                  email: '',
                  phone: '',
                  type: 'individual',
                  created_at: ''
                } as Client; // Fallback client
                return (
                  <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    client={client}
                    onEdit={onEdit}
                    onView={onView}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;