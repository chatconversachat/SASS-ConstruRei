import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Settings, Bot, Workflow } from "lucide-react";

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const navItems = [
    {
      to: "/",
      icon: Home,
      label: "Início",
    },
    {
      to: "/automations",
      icon: Workflow,
      label: "Automações",
    },
    {
      to: "/ai-agents",
      icon: Bot,
      label: "Agentes de IA",
    },
    {
      to: "/settings",
      icon: Settings,
      label: "Configurações",
    },
  ];

  const linkClasses = "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  const activeLinkClasses = "bg-muted text-primary";

  return (
    <nav className={cn("grid items-start gap-2", isMobile ? "px-4" : "px-2 py-4")}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(linkClasses, isActive && activeLinkClasses)}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;