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
  Wrench,
  FileSpreadsheet,
  Clock,
  Plus,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Painel', icon: Home, path: '/' },
    { name: 'Contatos', icon: Users, path: '/clients' },
    { name: 'CRM', icon: Kanban, path: '/crm' },
    { name: 'Agenda', icon: Clock, path: '/scheduling' },
    { name: 'Visitas', icon: Wrench, path: '/visits' },
    { name: 'Orçamentos', icon: FileText, path: '/budgets' },
    { name: 'Serviços', icon: Calendar, path: '/service-orders' },
    { name: 'Estoque', icon: Box, path: '/execution' },
    { name: 'Financeiro', icon: DollarSign, path: '/financial' },
    { name: 'Relatórios', icon: BarChart2, path: '/reports' },
    { name: 'Config', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#004a99] text-white w-full shadow-xl">
      {/* Botão de Adicionar Verde no Topo */}
      <div className="p-4 flex justify-center border-b border-blue-800/50">
        <button className="bg-[#28a745] hover:bg-[#218838] text-white p-2 rounded-md shadow-lg transition-all transform hover:scale-105">
          <Plus className="h-6 w-6" />
        </button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-3 rounded-md transition-all duration-200 group",
                  location.pathname === item.path 
                    ? "bg-[#003d7e] text-white shadow-inner" 
                    : "text-blue-100/70 hover:bg-[#003d7e] hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mb-1",
                  location.pathname === item.path ? "text-white" : "group-hover:text-white"
                )} />
                <span className="text-[10px] font-medium uppercase tracking-tighter">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;