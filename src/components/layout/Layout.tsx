import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Desktop: Visível apenas em telas LG ou superiores */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
        <Sidebar />
      </aside>
      
      {/* Conteúdo Principal: Com margin-left no desktop para dar espaço ao Sidebar fixo */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto focus:outline-none custom-scrollbar">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;