import { Search, Bell, Plus, Maximize2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-3.5 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
      {/* Left: page title */}
      <div className="flex flex-col min-w-0">
        <h1 className="text-base font-semibold text-foreground leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground leading-tight mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Center: global search */}
      <div className="flex-1 max-w-sm hidden md:block">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Busca global… (Ctrl+K)"
            className="pl-8 h-8 text-xs bg-secondary border-border focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 shrink-0">
        {actions}
        <Button size="sm" className="h-8 gap-1.5 bg-gradient-primary text-primary-foreground border-0 hover:opacity-90 text-xs font-semibold">
          <Plus size={13} />
          Novo
        </Button>
        <button className="relative flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary"></span>
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <HelpCircle size={15} />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <Maximize2 size={14} />
        </button>
      </div>
    </header>
  );
}
