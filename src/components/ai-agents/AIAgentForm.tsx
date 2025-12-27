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
import { AIAgent } from '@/types';

interface AIAgentFormProps {
  initialAgent?: AIAgent;
  onSave: (agent: AIAgent) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome do agente deve ter pelo menos 2 caracteres." }),
  description: z.string().min(5, { message: "Descrição deve ter pelo menos 5 caracteres." }),
  prompt: z.string().min(10, { message: "O prompt deve ter pelo menos 10 caracteres." }),
  n8n_workflow_id: z.string().optional(),
  n8n_webhook_url: z.string().url({ message: "URL do webhook inválida." }).optional().or(z.literal('')),
  type: z.enum(['sdr', 'scheduling', 'support', 'service_manager', 'customer_service', 'other']),
  status: z.enum(['active', 'inactive']),
});

const AIAgentForm: React.FC<AIAgentFormProps> = ({ initialAgent, onSave, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialAgent?.name || '',
      description: initialAgent?.description || '',
      prompt: initialAgent?.prompt || '',
      n8n_workflow_id: initialAgent?.n8n_workflow_id || '',
      n8n_webhook_url: initialAgent?.n8n_webhook_url || '',
      type: initialAgent?.type || 'other',
      status: initialAgent?.status || 'active',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newAgent: AIAgent = {
      ...initialAgent,
      id: initialAgent?.id || `agent-${Date.now()}`,
      created_at: initialAgent?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...values,
    };
    onSave(newAgent);
  };

  const agentTypes = [
    { value: 'sdr', label: 'Agente SDR' },
    { value: 'scheduling', label: 'Agente de Agendamento' },
    { value: 'support', label: 'Agente de Suporte' },
    { value: 'service_manager', label: 'Agente Gestor de Serviços' },
    { value: 'customer_service', label: 'Agente de Atendimento' },
    { value: 'other', label: 'Outro' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Agente</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Agente SDR de Qualificação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva a função e o objetivo do agente." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt Principal</FormLabel>
              <FormControl>
                <Textarea placeholder="Defina o prompt que guia o comportamento do agente." rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Agente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de agente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
          name="n8n_workflow_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID do Workflow n8n (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 12345" {...field} />
              </FormControl>
              <FormDescription>
                Este ID vincula o agente a um fluxo específico no n8n.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="n8n_webhook_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Webhook n8n (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: https://n8n.example.com/webhook/..." {...field} />
              </FormControl>
              <FormDescription>
                URL para acionar o fluxo do n8n associado a este agente.
              </FormDescription>
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
            Salvar Agente
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AIAgentForm;