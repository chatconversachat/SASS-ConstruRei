"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AutomationRule } from '@/types';

interface AutomationRuleFormProps {
  initialRule?: AutomationRule;
  onSave: (rule: AutomationRule) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome da automação deve ter pelo menos 2 caracteres." }),
  trigger: z.string().min(1, { message: "Selecione um gatilho." }),
  condition: z.string().optional(),
  action: z.string().min(1, { message: "Selecione uma ação." }),
  status: z.enum(['active', 'inactive']),
});

const AutomationRuleForm: React.FC<AutomationRuleFormProps> = ({ initialRule, onSave, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialRule?.name || '',
      trigger: initialRule?.trigger || '',
      condition: initialRule?.condition || '',
      action: initialRule?.action || '',
      status: initialRule?.status || 'active',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newRule: AutomationRule = {
      ...initialRule,
      id: initialRule?.id || `rule-${Date.now()}`,
      created_at: initialRule?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...values,
    };
    onSave(newRule);
  };

  const triggers = [
    { value: 'lead_created', label: 'Lead Criado' },
    { value: 'visit_scheduled', label: 'Visita Agendada' },
    { value: 'budget_approved', label: 'Orçamento Aprovado' },
    { value: 'service_order_finished', label: 'OS Finalizada' },
    { value: 'client_registered', label: 'Cliente Registrado' },
  ];

  const actions = [
    { value: 'send_email', label: 'Enviar E-mail' },
    { value: 'send_whatsapp', label: 'Enviar WhatsApp' },
    { value: 'create_task', label: 'Criar Tarefa' },
    { value: 'update_lead_status', label: 'Atualizar Status do Lead' },
    { value: 'generate_report', label: 'Gerar Relatório' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Automação</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Notificar novo lead de alto valor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gatilho (Quando acontece)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gatilho" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {triggers.map((trigger) => (
                    <SelectItem key={trigger.value} value={trigger.value}>
                      {trigger.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condição (Se for verdade - Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: estimated_value > 10000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ação (O que fazer)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a ação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {actions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Automação
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AutomationRuleForm;