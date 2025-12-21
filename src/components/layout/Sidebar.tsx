import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Kanban, 
  FileText, 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart2, 
  Settings,
  ShoppingCart,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'CRM Comercial', icon: Kanban, path: '/crm' },
    { name: 'Orçamentos', icon: FileText, path: '/budgets' },
    { name: 'Ordens de Serviço', icon: Calendar, path: '/service-orders' },
    { name: 'Financeiro', icon: DollarSign, path: '/financial' },
    { name: 'Clientes', icon: Users, path: '/clients' },
    { name: 'Prestadores', icon: ShoppingCart, path: '/providers' },
    { name: 'Relatórios', icon: BarChart2, path: '/reports' },
    { name: 'Configurações', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">CONSTRUREI</h1>
        <p className="text-sm text-gray-400">Sistema de Gestão</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center p-3 rounded-lg w-full transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-white border-gray-700 hover:bg-gray-800"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;