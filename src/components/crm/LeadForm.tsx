import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Lead, Client } from '@/types';

const leadFormSchema = z.object({
  clientName: z.string().min(2, { message: 'Nome do cliente é obrigatório.' }),
  clientEmail: z.string().email({ message: 'E-mail inválido.' }).optional().or(z.literal('')),
  clientPhone: z.string().min(10, { message: 'Telefone é obrigatório.' }),
  propertyAddress: z.string().min(5, { message: 'Endereço da propriedade é obrigatório.' }),
  leadSource: z.string().min(2, { message: 'Origem do lead é obrigatória.' }),
  estimatedValue: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: 'Valor estimado inválido.' }).transform(Number),
  responsibleId: z.string().optional().or(z.literal('')),
  status: z.enum(['received', 'contacted', 'scheduled', 'visited', 'budgeting', 'sent', 'negotiating', 'approved', 'lost']),
  notes: z.string().optional().or(z.literal('')),
});

interface LeadFormProps {
  initialData?: { lead: Lead; client: Client };
  onSave: (data: z.infer<typeof leadFormSchema>) => void;
  onCancel: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSave, onCancel }) => {
  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      clientName: initialData?.client.name || '',
      clientEmail: initialData?.client.email || '',
      clientPhone: initialData?.client.phone || '',
      propertyAddress: initialData?.lead.property_address || '',
      leadSource: initialData?.lead.lead_source || '',
      estimatedValue: initialData?.lead.estimated_value || 0,
      responsibleId: initialData?.lead.responsible_id || '',
      status: initialData?.lead.status || 'received',
      notes: initialData?.lead.notes || '',
    },
  });

  const onSubmit = (data: z.infer<typeof leadFormSchema>) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-semibold">Dados do Cliente</h3>
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientEmail"
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
          name="clientPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone do Cliente</Label>
              <FormControl>
                <Input placeholder="(XX) XXXXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold mt-6">Dados do Lead</h3>
        <FormField
          control={form.control}
          name="propertyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço da Propriedade</FormLabel>
              <FormControl>
                <Input placeholder="Rua, número, bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leadSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origem do Lead</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Indicação, Site, Instagram" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Estimado (R$)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(e.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsibleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input placeholder="Nome do responsável" {...field} />
              </FormControl>
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
                  <SelectItem value="received">Lead Recebido</SelectItem>
                  <SelectItem value="contacted">Contato Realizado</SelectItem>
                  <SelectItem value="scheduled">Visita Agendada</SelectItem>
                  <SelectItem value="visited">Visita Realizada</SelectItem>
                  <SelectItem value="budgeting">Orçamento em Elaboração</SelectItem>
                  <SelectItem value="sent">Orçamento Enviado</SelectItem>
                  <SelectItem value="negotiating">Em Negociação</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="lost">Perdido</SelectItem>
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
                <Textarea placeholder="Adicione observações aqui..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Lead</Button>
        </div>
      </form>
    </Form>
  );
};

export default LeadForm;