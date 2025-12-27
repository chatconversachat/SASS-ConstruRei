"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import AutomationRuleCard from '@/components/automations/AutomationRuleCard';
import AutomationRuleForm from '@/components/automations/AutomationRuleForm';
import { AutomationRule } from '@/types';
import { toast } from 'sonner';

const Automations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: 'auto1',
      name: 'Notificar novo lead de alto valor',
      trigger: 'lead_created',
      condition: 'estimated_value > 10000',
      action: 'send_email_to_sales_manager',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'auto2',
      name: 'Agendar visita após contato',
      trigger: 'lead_status_changed_to_contacted',
      action: 'create_visit_task',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'auto3',
      name: 'Enviar pesquisa de satisfação',
      trigger: 'service_order_finished',
      action: 'send_satisfaction_survey',
      status: 'inactive',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleCreateRule = () => {
    setSelectedRule(null);
    setModalTitle('Nova Automação');
    setShowCreateEditModal(true);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setSelectedRule(rule);
    setModalTitle(`Editar Automação: ${rule.name}`);
    setShowCreateEditModal(true);
  };

  const handleSaveRule = (newRule: AutomationRule) => {
    if (selectedRule) {
      setRules(rules.map(r => r.id === newRule.id ? newRule : r));
      toast.success(`Automação "${newRule.name}" atualizada com sucesso!`);
    } else {
      setRules([...rules, newRule]);
      toast.success(`Automação "${newRule.name}" criada com sucesso!`);
    }
    setShowCreateEditModal(false);
    setSelectedRule(null);
  };

  const handleToggleStatus = (ruleToToggle: AutomationRule) => {
    const updatedRule = {
      ...ruleToToggle,
      status: ruleToToggle.status === 'active' ? 'inactive' : 'active',
      updated_at: new Date().toISOString(),
    };
    setRules(rules.map(r => r.id === updatedRule.id ? updatedRule : r));
    toast.info(`Automação "${updatedRule.name}" foi ${updatedRule.status === 'active' ? 'ativada' : 'desativada'}.`);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(r => r.id !== ruleId));
    toast.success('Automação excluída com sucesso!');
  };

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automações</h1>
          <p className="text-gray-600">Crie regras para automatizar tarefas e fluxos de trabalho</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar automações..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateRule}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Automação
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule) => (
            <AutomationRuleCard 
              key={rule.id} 
              rule={rule} 
              onEdit={handleEditRule} 
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteRule}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">Nenhuma automação encontrada.</p>
        )}
      </div>

      <Dialog open={showCreateEditModal} onOpenChange={setShowCreateEditModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              {selectedRule ? 'Edite os detalhes da automação.' : 'Defina um gatilho, condição e ação para sua automação.'}
            </DialogDescription>
          </DialogHeader>
          {showCreateEditModal && (
            <AutomationRuleForm
              initialRule={selectedRule || undefined}
              onSave={handleSaveRule}
              onCancel={() => setShowCreateEditModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Automations;