import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Target,
  GitBranch,
  CheckSquare,
  Calendar,
  MessageSquare,
  Zap,
  DollarSign,
  BarChart3,
  Settings,
  Puzzle,
  FileText,
  Bell,
  ChevronRight,
  Hexagon,
  Building2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Principal",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
      { icon: Bell, label: "Notificações", path: "/notificacoes", badge: 5 },
    ],
  },
  {
    label: "Comercial",
    items: [
      { icon: Target, label: "Leads", path: "/leads" },
      { icon: Users, label: "Contatos", path: "/contatos" },
      { icon: Building2, label: "Empresas", path: "/empresas" },
      { icon: GitBranch, label: "Pipeline", path: "/pipeline" },
      { icon: UserCheck, label: "Oportunidades", path: "/oportunidades" },
    ],
  },
  {
    label: "Operacional",
    items: [
      { icon: CheckSquare, label: "Tarefas", path: "/tarefas" },
      { icon: Calendar, label: "Agenda", path: "/agenda" },
      { icon: MessageSquare, label: "Atendimento", path: "/atendimento" },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { icon: Zap, label: "Automações", path: "/automacoes" },
      { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
      { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
    ],
  },
  {
    label: "Sistema",
    items: [
      { icon: Puzzle, label: "Integrações", path: "/integracoes" },
      { icon: FileText, label: "Logs & Auditoria", path: "/logs" },
      { icon: Settings, label: "Configurações", path: "/configuracoes" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setCollapsed((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  return (
    <aside className="flex flex-col h-full w-60 bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
          <Hexagon className="w-4.5 h-4.5 text-primary-foreground fill-current" size={18} />
        </div>
        <div>
          <div className="text-sm font-bold text-foreground tracking-wide">NEXUS</div>
          <div className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">CRM Enterprise</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navGroups.map((group) => {
          const isCollapsed = collapsed.includes(group.label);
          return (
            <div key={group.label} className="mb-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-3 py-1.5 mb-0.5 group"
              >
                <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                  {group.label}
                </span>
                <ChevronDown
                  size={12}
                  className={cn(
                    "text-muted-foreground/40 transition-transform duration-200",
                    isCollapsed && "-rotate-90"
                  )}
                />
              </button>

              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-0.5"
                >
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={cn("nav-item", isActive && "active")}
                      >
                        <item.icon size={16} className="shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                        {isActive && (
                          <ChevronRight size={12} className="text-primary" />
                        )}
                      </NavLink>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-foreground truncate">Admin User</div>
            <div className="text-[10px] text-muted-foreground truncate">admin@nexuscrm.io</div>
          </div>
          <Settings size={13} className="text-muted-foreground shrink-0" />
        </div>
      </div>
    </aside>
  );
}
