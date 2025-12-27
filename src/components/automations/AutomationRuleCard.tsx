"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, PlayCircle, PauseCircle } from 'lucide-react';
import { AutomationRule } from '@/types';

interface AutomationRuleCardProps {
  rule: AutomationRule;
  onEdit: (rule: AutomationRule) => void;
  onToggleStatus: (rule: AutomationRule) => void;
  onDelete: (ruleId: string) => void;
}

const AutomationRuleCard: React.FC<AutomationRuleCardProps> = ({ rule, onEdit, onToggleStatus, onDelete }) => {
  const getStatusColor = (status: AutomationRule['status']) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{rule.name}</h3>
            <p className="text-sm text-gray-600">Gatilho: {rule.trigger}</p>
          </div>
          <Badge className={getStatusColor(rule.status)}>
            {rule.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>

        {rule.condition && (
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Condição:</span> {rule.condition}
          </p>
        )}
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">Ação:</span> {rule.action}
        </p>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(rule)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onToggleStatus(rule)}
            className={rule.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}
          >
            {rule.status === 'active' ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
            {rule.status === 'active' ? 'Desativar' : 'Ativar'}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(rule.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationRuleCard;