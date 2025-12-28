import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Save, MoreVertical, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { FinancialEntry } from '@/types';

const Financial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [financialEntries] = useState<FinancialEntry[]>([
    { id: '1', description: 'Venda de Unidades', value: 2500000, type: 'income', status: 'paid', due_date: '2024-02-01', category_id: 'cat1', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0001-24' },
    { id: '2', description: '1ª Parcela', value: 25000, type: 'income', status: 'paid', due_date: '2023-10-10', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0001-24' },
    { id: '3', description: '2ª Parcela', value: 25000, type: 'income', status: 'paid', due_date: '2023-11-10', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0001-24' },
    { id: '4', description: '3ª Parcela', value: 25000, type: 'income', status: 'paid', due_date: '2023-12-10', category_id: 'cat2', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), related_number: '0001-24' },
  ]);

  return (
    <div className="space-y-6">
      {/* Cabeçalho superior conforme imagem */}
      <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Financeiro</p>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-slate-800">Venda de Unidades</h1>
              <span className="text-2xl font-bold text-slate-700">R$ 2.500.000,00</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-50 px-3 py-1.5 rounded border border-slate-100 text-center">
              <p className="text-[9px] text-slate-400 uppercase font-bold">Valor Corrigido</p>
              <p className="text-xs font-bold text-slate-600">R$ 2.524.315,53</p>
            </div>
            <div className="bg-slate-50 px-3 py-1.5 rounded border border-slate-100 text-center">
              <p className="text-[9px] text-slate-400 uppercase font-bold">Valor Recebido</p>
              <p className="text-xs font-bold text-slate-600">R$ 0,00</p>
            </div>
            <div className="bg-slate-50 px-3 py-1.5 rounded border border-slate-100 text-center">
              <p className="text-[9px] text-slate-400 uppercase font-bold">Saldo Corrigido</p>
              <p className="text-xs font-bold text-slate-600">R$ 2.524.315,53</p>
            </div>
            <Button className="bg-[#28a745] hover:bg-[#218838] text-white gap-2 ml-2">
              <Save className="h-4 w-4" /> Salvar
            </Button>
            <Button variant="outline" size="icon" className="bg-[#ffc107] border-none text-white hover:bg-[#e0a800]">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Dados Gerais</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-bold mb-1 block">Cliente *</label>
                <div className="relative">
                  <Input defaultValue="Juliano Amaral" className="bg-slate-50 border-slate-200" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Dados da Venda</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-bold mb-1 block">Vendedor</label>
                <div className="relative">
                  <Input placeholder="Selecione" className="bg-slate-50 border-slate-200 pr-10" />
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Parcelas Estilo Referência */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-0">
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 uppercase">Parcelas</h3>
            <Button size="sm" className="bg-[#28a745] hover:bg-[#218838] h-8 text-[11px] font-bold">
              <Plus className="h-3 w-3 mr-1" /> ADICIONAR
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-6 text-[11px] text-slate-500 uppercase font-bold">Recebido</th>
                  <th className="text-left py-3 px-6 text-[11px] text-slate-500 uppercase font-bold">Tipo</th>
                  <th className="text-left py-3 px-6 text-[11px] text-slate-500 uppercase font-bold">Vencimento</th>
                  <th className="text-left py-3 px-6 text-[11px] text-slate-500 uppercase font-bold">Valor</th>
                  <th className="text-left py-3 px-6 text-[11px] text-slate-500 uppercase font-bold">Valor Recebido</th>
                  <th className="text-center py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {financialEntries.slice(1).map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-slate-400">---</td>
                    <td className="py-4 px-6 font-medium text-blue-600 hover:underline cursor-pointer">{entry.description}</td>
                    <td className="py-4 px-6 text-slate-600">{new Date(entry.due_date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-4 px-6 font-bold text-slate-700">R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 px-6">
                       <div className="w-full h-8 bg-slate-50 rounded border border-slate-200" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;