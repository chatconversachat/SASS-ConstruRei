import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
// import { useAuth } from '@/context/AuthContext'; // Removido

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const { loading } = useAuth(); // Removido

  // if (loading) { // Removido
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;