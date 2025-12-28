import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Users, Bell, Database, Shield, Hash } from 'lucide-react';
import { appNumberConfig } from '@/utils/numberGenerator';
import { toast } from 'sonner';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const [companyName, setCompanyName] = useState('CONSTRUREI');
  const [companyEmail, setCompanyEmail] = useState('contato@construrei.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [numberPrefix, setNumberPrefix] = useState(appNumberConfig.prefix); 
  
  const handleSave = () => {
    console.log('Configurações salvas');
    appNumberConfig.prefix = numberPrefix;
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">E-mail da Empresa</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberPrefix" className="flex items-center">
                  <Hash className="h-4 w-4 mr-2 text-gray-500" />
                  Prefixo de Numeração (Visitas/Orçamentos/OS)
                </Label>
                <Input
                  id="numberPrefix"
                  value={numberPrefix}
                  onChange={(e) => setNumberPrefix(e.target.value)}
                  placeholder="Ex: 0000"
                />
                <p className="text-xs text-gray-500">
                  Define o formato inicial dos números de identificação (ex: 0001-25).
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-600">Realizar backup automático dos dados</p>
                </div>
                <Switch
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>
              
              {autoBackup && (
                <div className="space-y-2">
                  <Label>Frequência do Backup</Label>
                  <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Administrador do Sistema</h3>
                    <p className="text-sm text-gray-600">Acesso total ao sistema</p>
                  </div>
                  <Button variant="outline">Gerenciar</Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Técnicos</h3>
                    <p className="text-sm text-gray-600">Acesso a visitas e ordens de serviço</p>
                  </div>
                  <Button variant="outline">Gerenciar</Button>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Clientes</h3>
                    <p className="text-sm text-gray-600">Acesso limitado aos próprios serviços</p>
                  </div>
                  <Button variant="outline">Gerenciar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações do Sistema</Label>
                  <p className="text-sm text-gray-600">Habilitar notificações gerais do sistema</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-gray-600">Enviar notificações por e-mail</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por WhatsApp</Label>
                  <p className="text-sm text-gray-600">Enviar notificações por WhatsApp</p>
                </div>
                <Switch
                  checked={whatsappNotifications}
                  onCheckedChange={setWhatsappNotifications}
                />
              </div>
              
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                    <p className="text-sm text-gray-600">Adicionar camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Expiração de Sessão</h3>
                    <p className="text-sm text-gray-600">Encerrar sessão após inatividade</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;