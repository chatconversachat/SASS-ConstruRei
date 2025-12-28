"use client";

import { Bell, Search, Menu, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-slate-900 border-r-slate-800">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:relative md:flex items-center w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Buscar no sistema..." 
            className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white transition-all" 
          />
        </div>

        {/* Logo visível apenas no mobile (opcional) */}
        <h1 className="text-lg font-bold text-blue-600 lg:hidden truncate max-w-[120px]">
          CONSTRUREI
        </h1>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="icon" className="relative text-gray-600">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        
        <div className="flex items-center pl-2 border-l border-gray-200 ml-2">
          <div className="hidden sm:block text-right mr-3">
            <p className="text-sm font-semibold text-gray-700 leading-tight">Admin</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 border border-gray-200 p-0 overflow-hidden">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;