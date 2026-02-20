import { motion } from "framer-motion";
import {
  Building2, Phone, Mail, Globe, MapPin, Star, MoreHorizontal, Search, Filter, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const companies = [
  { id: 1, name: "Tech Solutions SA", sector: "Tecnologia", size: "200-500", arr: "R$ 48k", deals: 3, contact: "Rodrigo Faria", phone: "(11) 9 9876-5432", email: "rodrigo@techsolutions.com", status: "Cliente", city: "São Paulo", starred: true },
  { id: 2, name: "Grupo Meridian", sector: "Consultoria", size: "500+", arr: "R$ 120k", deals: 5, contact: "Camila Souza", phone: "(21) 9 9234-5678", email: "camila@meridian.com.br", status: "Prospect", city: "Rio de Janeiro", starred: false },
  { id: 3, name: "Alfa Varejo Ltda", sector: "Varejo", size: "50-200", arr: "R$ 22k", deals: 1, contact: "Marcos Pereira", phone: "(11) 3456-7890", email: "marcos@alfavarejo.com", status: "Lead", city: "Campinas", starred: true },
  { id: 4, name: "Vanguard Consulting", sector: "Consultoria", size: "200-500", arr: "R$ 85k", deals: 2, contact: "Fernanda Lima", phone: "(48) 9 8765-4321", email: "flima@vanguard.com", status: "Prospect", city: "Florianópolis", starred: false },
  { id: 5, name: "InnovateTech Br", sector: "Tecnologia", size: "10-50", arr: "R$ 67k", deals: 4, contact: "Beatriz Martins", phone: "(11) 9 8888-1111", email: "bea@innovatetech.br", status: "Cliente", city: "São Paulo", starred: false },
  { id: 6, name: "Prime Digital", sector: "Marketing", size: "10-50", arr: "R$ 15k", deals: 1, contact: "João Costa", phone: "(51) 9 9111-2222", email: "joao@primedigital.io", status: "Lead", city: "Porto Alegre", starred: false },
];

const statusColors: Record<string, string> = {
  "Cliente": "badge-success",
  "Prospect": "badge-warning",
  "Lead": "badge-info",
};

export default function EmpresasPage() {
  return (
    <div className="p-6 space-y-4 animate-fade-up">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar empresa…" className="pl-8 h-8 text-xs bg-secondary border-border" />
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary hover:bg-secondary/80">
          <Filter size={13} /> Setor <ChevronDown size={11} />
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary hover:bg-secondary/80">
          Status <ChevronDown size={11} />
        </Button>
        <span className="text-xs text-muted-foreground ml-1">{companies.length} empresas</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {companies.map((co, idx) => (
          <motion.div
            key={co.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="glass-card rounded-xl p-4 hover:border-border-bright transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {co.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground leading-tight">{co.name}</div>
                  <div className="text-[11px] text-muted-foreground">{co.sector} · {co.size} func.</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={13} fill={co.starred ? "currentColor" : "none"} className={co.starred ? "text-warning" : "text-muted-foreground/40"} />
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 mb-3 text-[11px]">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={10} className="shrink-0" />{co.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={10} className="shrink-0" />{co.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={10} className="shrink-0" />{co.city}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
              <div className="flex items-center gap-3 text-xs">
                <div>
                  <div className="font-mono font-bold text-foreground">{co.arr}</div>
                  <div className="text-[10px] text-muted-foreground">ARR</div>
                </div>
                <div>
                  <div className="font-bold text-foreground">{co.deals}</div>
                  <div className="text-[10px] text-muted-foreground">Negócios</div>
                </div>
              </div>
              <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-semibold", statusColors[co.status])}>
                {co.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
