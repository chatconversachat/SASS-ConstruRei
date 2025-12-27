import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Printer, 
  Send, 
  FileText, 
  Calendar, 
  DollarSign, 
  User, 
  MapPin,
  Plus,
  Trash2,
  Wrench,
  CheckCircle 
} from 'lucide-react';
import { Budget, ServiceOrder } from '@/types';
import { generateSequentialNumber, appNumberConfig, updateSequence } from '@/utils/numberGenerator';
import { generatePdf } from '@/utils/pdfGenerator'; // Importar utilitário de PDF

const BudgetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const budgetContentRef = useRef<HTMLDivElement>(null); // Ref para o conteúdo do orçamento

  // Estados para os dados do orçamento
  const [budgetData, setBudgetData] = useState<Budget>(() => {
    let initialBudget: Budget;
    if (location.state && (location.state as { newBudget: Budget }).newBudget) {
      initialBudget = (location.state as { newBudget: Budget }).newBudget;
    } else {
      const initialBudgetNumber = id 
        ? `ORC-${id}` 
        : `ORC-${generateSequentialNumber(appNumberConfig.prefix, appNumberConfig.budgetSequence)}`;
      if (!id) updateSequence('budget'); // Incrementa a sequência apenas se for um novo orçamento
      
      initialBudget = {
        id: id || '001',
        budget_number: initialBudgetNumber,
        client: 'João Silva', // Mocked client data
        propertyAddress: 'Rua das Flores, 123 - São Paulo/SP',
        leadSource: 'Indicação',
        status: 'draft',
        items: [
          {
            id: '1',
            description: 'Demolição de parede',
            quantity: 1,
            unit_value: 800,
            total_value: 800,
            service_type: 'Demolição'
          },
          {
            id: '2',
            description: 'Reforma de cozinha',
            quantity: 1,
            unit_value: 12000,
            total_value: 12000,
            service_type: 'Reforma'
          }
        ],
        notes: 'Orçamento para reforma completa da cozinha com troca de armários e piso.',
        validity: '30 dias', // Este campo não está na interface Budget, manter como mock local
        lead_id: 'lead1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    return initialBudget;
  });

  // Efeito para carregar dados de um novo orçamento vindo da página de visitas
  useEffect(() => {
    if (location.state && (location.state as { newBudget: Budget }).newBudget) {
      const newBudget = (location.state as { newBudget: Budget }).newBudget;
      setBudgetData(newBudget);
      toast.info(`Orçamento ${newBudget.budget_number} carregado da visita.`);
      // Limpar o estado de navegação para evitar recarregar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const totalValue = budgetData.items.reduce((sum, item) => sum + item.total_value, 0);

  const handleAddItem = () => {
    setBudgetData({
      ...budgetData,
      items: [
        ...budgetData.items,
        {
          id: Date.now().toString(),
          description: '',
          quantity: 1,
          unit_value: 0,
          total_value: 0,
          service_type: ''
        }
      ]
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setBudgetData({
      ...budgetData,
      items: budgetData.items.filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: string, value: string | number) => {
    setBudgetData(prevData => ({
      ...prevData,
      items: prevData.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalcular valor total se quantidade ou valor unitário mudar
          if (field === 'quantity' || field === 'unit_value') {
            updatedItem.total_value = 
              (field === 'quantity' ? Number(value) : updatedItem.quantity) * 
              (field === 'unit_value' ? Number(value) : updatedItem.unit_value);
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Orçamento salvo com sucesso!');
  };

  const handleSend = () => {
    setBudgetData(prevData => ({ ...prevData, status: 'sent', sent_at: new Date().toISOString() }));
    toast.success('Orçamento enviado por e-mail e WhatsApp com sucesso! (Simulado)');
    // Em um app real, aqui você chamaria uma API de backend para enviar o PDF
    // por e-mail e/ou WhatsApp.
  };

  const handleApprove = () => {
    setBudgetData(prevData => ({ ...prevData, status: 'approved', approved_at: new Date().toISOString() }));
    toast.success('Orçamento aprovado!');
  };

  const handleGenerateServiceOrder = () => {
    if (budgetData.status !== 'approved') {
      toast.error('O orçamento precisa ser aprovado para gerar uma Ordem de Serviço.');
      return;
    }

    const newServiceOrderId = Date.now().toString();
    const newServiceOrder: ServiceOrder = {
      id: newServiceOrderId,
      service_order_number: budgetData.budget_number.replace('ORC-', 'OS-'), // Mantém o mesmo número, muda o prefixo
      budget_id: budgetData.id,
      client_id: budgetData.lead_id,
      technician_id: 'Tech1',
      status: 'issued',
      start_date: new Date().toISOString(),
      notes: budgetData.notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log('Ordem de Serviço gerada:', newServiceOrder);
    toast.success(`Ordem de Serviço ${newServiceOrder.service_order_number} gerada com sucesso!`);
    updateSequence('serviceOrder'); // Incrementa a sequência da OS
    navigate(`/service-orders/${newServiceOrderId}`, { state: { newServiceOrder } });
  };

  const handlePrintPdf = async () => {
    if (budgetContentRef.current) {
      await generatePdf({
        elementId: 'budget-content',
        filename: `Orcamento-${budgetData.budget_number}.pdf`,
      });
      toast.success('PDF do orçamento gerado e baixado!');
    } else {
      toast.error('Não foi possível gerar o PDF. Conteúdo do orçamento não encontrado.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'Rascunho',
      sent: 'Enviado',
      approved: 'Aprovado',
      rejected: 'Rejeitado'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orçamento #{budgetData.budget_number}</h1>
            <p className="text-gray-600">Detalhes do orçamento</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrintPdf}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir / Gerar PDF
          </Button>
          {budgetData.status === 'draft' && (
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          )}
          {budgetData.status === 'sent' && (
            <Button onClick={handleApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprovar Orçamento
            </Button>
          )}
          {budgetData.status === 'approved' && (
            <Button onClick={handleGenerateServiceOrder}>
              <Wrench className="h-4 w-4 mr-2" />
              Gerar Ordem de Serviço
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6" id="budget-content" ref={budgetContentRef}> {/* Adicionado ID e ref para PDF */}
          {/* Informações do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium mr-2">Cliente:</span>
                {isEditing ? (
                  <Input 
                    value={budgetData.client} 
                    onChange={(e) => setBudgetData({...budgetData, client: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span>{budgetData.client}</span>
                )}
              </div>
              
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-medium mr-2">Endereço:</span>
                {isEditing ? (
                  <Textarea 
                    value={budgetData.propertyAddress} 
                    onChange={(e) => setBudgetData({...budgetData, propertyAddress: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span>{budgetData.propertyAddress}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-medium mr-2">Origem:</span>
                {isEditing ? (
                  <Input 
                    value={budgetData.leadSource} 
                    onChange={(e) => setBudgetData({...budgetData, leadSource: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span>{budgetData.leadSource}</span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-medium mr-2">Validade:</span>
                {isEditing ? (
                  <Input 
                    value={budgetData.validity} 
                    onChange={(e) => setBudgetData({...budgetData, validity: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span>{budgetData.validity}</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Itens do Orçamento */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Itens do Orçamento</CardTitle>
              {isEditing && (
                <Button size="sm" onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Descrição</th>
                      <th className="text-center py-2">Quantidade</th>
                      <th className="text-right py-2">Valor Unitário</th>
                      <th className="text-right py-2">Total</th>
                      {isEditing && <th className="text-center py-2">Ações</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3">
                          {isEditing ? (
                            <Input
                              value={item.description}
                              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            />
                          ) : (
                            <div>
                              <div>{item.description}</div>
                              <div className="text-xs text-gray-500">{item.service_type}</div>
                            </div>
                          )}
                        </td>
                        <td className="py-3 text-center">
                          {isEditing ? (
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                              className="w-20 mx-auto"
                            />
                          ) : (
                            item.quantity
                          )}
                        </td>
                        <td className="py-3 text-right">
                          {isEditing ? (
                            <Input
                              type="number"
                              value={item.unit_value}
                              onChange={(e) => handleItemChange(item.id, 'unit_value', e.target.value)}
                              className="w-24 ml-auto text-right"
                            />
                          ) : (
                            `R$ ${item.unit_value.toLocaleString('pt-BR')}`
                          )}
                        </td>
                        <td className="py-3 text-right font-medium">
                          R$ {item.total_value.toLocaleString('pt-BR')}
                        </td>
                        {isEditing && (
                          <td className="py-3 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end mt-4 pt-4 border-t">
                <div className="text-right">
                  <div className="text-lg font-bold">
                    Total: R$ {totalValue.toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={budgetData.notes}
                  onChange={(e) => setBudgetData({...budgetData, notes: e.target.value})}
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{budgetData.notes}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Badge className={getStatusColor(budgetData.status)} size="lg">
                  {getStatusText(budgetData.status)}
                </Badge>
                
                <div className="w-full space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancelar Edição' : 'Editar Orçamento'}
                  </Button>
                  
                  {isEditing && (
                    <Button className="w-full" onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <p className="font-medium">Orçamento criado</p>
                  <p className="text-sm text-gray-600">15/06/2023 às 10:30</p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4 py-1">
                  <p className="font-medium">Orçamento enviado</p>
                  <p className="text-sm text-gray-600">16/06/2023 às 14:15</p>
                </div>
                
                <div className="border-l-2 border-gray-300 pl-4 py-1">
                  <p className="font-medium">Orçamento aprovado</p>
                  <p className="text-sm text-gray-600">18/06/2023 às 09:45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetDetail;