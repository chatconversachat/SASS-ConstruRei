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
import { Lead, Client } from '@/types';

interface LeadCreateEditFormProps {
  initialLead?: Lead;
  initialClient?: Client;
  onSave: (lead: Lead) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  client_name: z.string().min(2, { message: "Nome do cliente deve ter pelo menos 2 caracteres." }),
  client_email: z.string().email({ message: "E-mail inválido." }).optional().or(z.literal('')),
  client_phone: z.string().min(10, { message: "Telefone inválido." }).optional().or(z.literal('')),
  property_address: z.string().min(5, { message: "Endereço da propriedade deve ter pelo menos 5 caracteres." }),
  lead_source: z.string().min(1, { message: "Selecione a origem do lead." }),
  estimated_value: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Valor estimado deve ser um número positivo." })
  ),
  responsible_id: z.string().min(1, { message: "Selecione o responsável." }),
  status: z.enum(['received', 'contacted', 'scheduled', 'visited', 'budgeting', 'sent', 'negotiating', 'approved', 'lost']),
  notes: z.string().optional(),
});

const LeadCreateEditForm: React.FC<LeadCreateEditFormProps> = ({ initialLead, initialClient, onSave, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client_name: initialClient?.name || '',
      client_email: initialClient?.email || '',
      client_phone: initialClient?.phone || '',
      property_address: initialLead?.property_address || '',
      lead_source: initialLead?.lead_source || 'site',
      estimated_value: initialLead?.estimated_value || 0,
      responsible_id: initialLead?.responsible_id || 'Admin',
      status: initialLead?.status || 'received',
      notes: initialLead?.notes || '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Aqui você precisaria de lógica para criar ou encontrar o cliente
    // Por enquanto, vamos simular um ID de cliente
    const clientId = initialClient?.id || `client-${Date.now()}`; 

    const newLead: Lead = {
      ...initialLead,
      id: initialLead?.id || `lead-${Date.now()}`,
      client_id: clientId,
      property_address: values.property_address,
      lead_source: values.lead_source,
      estimated_value: values.estimated_value,
      responsible_id: values.responsible_id,
      status: values.status,
      notes: values.notes,
      created_at: initialLead?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onSave(newLead);
  };

  const leadSources = [
    { value: 'site', label: 'Site' },
    { value: 'indication', label: 'Indicação' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'other', label: 'Outro' },
  ];

  const leadStatuses = [
    { value: 'received', label: 'Lead Recebido' },
    { value: 'contacted', label: 'Contato Realizado' },
    { value: 'scheduled', label: 'Visita Agendada' },
    { value: 'visited', label: 'Visita Realizada' },
    { value: 'budgeting', label: 'Orçamento em Elaboração' },
    { value: 'sent', label: 'Orçamento Enviado' },
    { value: 'negotiating', label: 'Em Negociação' },
    { value: 'approved', label: 'Aprovado' },
    { value: 'lost', label: 'Perdido' },
  ];

  const responsibleUsers = [
    { value: 'Admin', label: 'Administrador' },
    { value: 'Fabricio', label: 'Fabricio' },
    { value: 'Eder', label: 'Eder' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Dados do Cliente</h3>
        <FormField
          control={form.control}
          name="client_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo do cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail do Cliente</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="(XX) XXXXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold mb-2 mt-6">Dados do Lead</h3>
        <FormField
          control={form.control}
          name="property_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço da Propriedade</FormLabel>
              <FormControl>
                <Input placeholder="Rua, número, bairro, cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lead_source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origem do Lead</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leadSources.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
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
          name="estimated_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Estimado (R$)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsible_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {responsibleUsers.map((user) => (
                    <SelectItem key={user.value} value={user.value}>
                      {user.label}
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
                  {leadStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea placeholder="Adicione observações sobre o lead" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Lead
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LeadCreateEditForm;