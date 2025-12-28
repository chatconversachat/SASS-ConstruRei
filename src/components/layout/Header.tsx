import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Buscar..." 
          className="pl-10 w-full" 
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
          <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;