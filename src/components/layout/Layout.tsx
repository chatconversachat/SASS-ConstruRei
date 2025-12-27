import { Outlet } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-lg">Dyad App</span>
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          {isMobile && (
            <MobileSidebar>
              <Sidebar isMobile={true} />
            </MobileSidebar>
          )}
          <h1 className="text-xl font-semibold">Bem-vindo!</h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Outlet />
        </main>
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Layout;