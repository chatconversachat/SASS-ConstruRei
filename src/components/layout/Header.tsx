import React from 'react';
import { Bell, HelpCircle, Settings, User, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-30 shadow-sm h-14">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full opacity-80" />
          </div>
          <span className="font-bold text-slate-700 tracking-tight text-lg">mais<span className="font-light">controle</span></span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 h-9 w-9">
          <Printer className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 h-9 w-9">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
        <div className="h-6 w-[1px] bg-slate-200 mx-2" />
        <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
          <div className="w-7 h-7 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center">
            <User className="h-4 w-4 text-slate-500" />
          </div>
          <span className="text-sm font-medium hidden sm:inline-block">Admin</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;