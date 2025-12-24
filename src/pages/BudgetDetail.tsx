import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Trash2
} from 'lucide-react';

const BudgetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para os dados do orçamento
  const [budgetData, setBudgetData] = useState({
    client: 'João Silva',
    propertyAddress: 'Rua das Flores, 123 - São Paulo/SP',
    leadSource: 'Indicação',
    status: 'draft',
    items: [
      {
        id: '1',
        description: 'Demolição de parede',
        quantity: 1,
        unitValue: 800,
        totalValue: 800,
        serviceType: 'Demolição'
      },
      {
        id: '2',
        description: 'Reforma de cozinha',
        quantity: 1,
        unitValue: 12000,
        totalValue: 12000,
        serviceType: 'Reforma'
      }
    ],
    notes: 'Orçamento para reforma completa da cozinha com troca de armários e piso.',
    validity: '30 dias'
  });

  const totalValue = budgetData.items.reduce((sum, item) => sum + item.totalValue, 0);

  const handleAddItem = () => {
    setBudgetData({
      ...budgetData,
      items: [
        ...budgetData.items,
        {
          id: Date.now().toString(),
          description: '',
          quantity: 1,
          unitValue: 0,
          totalValue: 0,
          serviceType: ''
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
    setBudgetData({
      ...budgetData,
      items: budgetData.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalcular valor total se quantidade ou valor unitário mudar
          if (field === 'quantity' || field === 'unitValue') {
            updatedItem.totalValue = 
              (field === 'quantity' ? Number(value) : item.quantity) * 
              (field === 'unitValue' ? Number(value) : item.unitValue);
          }
          
          return updatedItem;
        }
        return item;
      })
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Lógica de salvamento
  };

  const handleSend = () => {
    // Lógica de envio
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
            <h1 className="text-3xl font-bold text-gray-900">Orçamento #{id || '001'}</h1>
            <p className="text-gray-600">Detalhes do orçamento</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                              <div className="text-xs text-gray-500">{item.serviceType}</div>
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
                              value={item.unitValue}
                              onChange={(e) => handleItemChange(item.id, 'unitValue', e.target.value)}
                              className="w-24 ml-auto text-right"
                            />
                          ) : (
                            `R$ ${item.unitValue.toLocaleString('pt-BR')}`
                          )}
                        </td>
                        <td className="py-3 text-right font-medium">
                          R$ {item.totalValue.toLocaleString('pt-BR')}
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