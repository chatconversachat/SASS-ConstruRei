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
  LogOut,
  Wrench,
  FileSpreadsheet,
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SidebarProps {
  onItemClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'CRM Comercial', icon: Kanban, path: '/crm' },
    { name: 'Agendamento', icon: Clock, path: '/scheduling' }, 
    { name: 'Visitas Técnicas', icon: Wrench, path: '/visits' },
    { name: 'Orçamentos', icon: FileText, path: '/budgets' },
    { name: 'Ordens de Serviço', icon: Calendar, path: '/service-orders' },
    { name: 'Execução', icon: FileSpreadsheet, path: '/execution' },
    { name: 'Financeiro', icon: DollarSign, path: '/financial' },
    { name: 'Fiscal/DRE', icon: FileSpreadsheet, path: '/fiscal' },
    { name: 'Clientes', icon: Users, path: '/clients' },
    { name: 'Prestadores', icon: ShoppingCart, path: '/providers' },
    { name: 'Leilão de Serviços', icon: ShoppingCart, path: '/auctions' },
    { name: 'Relatórios', icon: BarChart2, path: '/reports' },
    { name: 'Configurações', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    toast.info('Funcionalidade de logout simulada.');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-full">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-blue-400">CONSTRUREI</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Gestão de Obras</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                onClick={onItemClick}
                className={cn(
                  "flex items-center p-3 rounded-lg w-full transition-all duration-200 group",
                  location.pathname === item.path 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mr-3 transition-colors",
                  location.pathname === item.path ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                )} />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center mb-4 px-2">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-full w-10 h-10 flex items-center justify-center text-blue-400 font-bold">
            AD
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-semibold truncate text-slate-200">Admin User</p>
            <p className="text-xs text-slate-500 capitalize truncate">Administrador</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair do Sistema
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;