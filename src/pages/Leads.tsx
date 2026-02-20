import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Filter,
  Upload,
  Download,
  Star,
  Phone,
  Mail,
  MoreHorizontal,
  TrendingUp,
  Flame,
  Thermometer,
  Snowflake,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const leadsData = [
  {
    id: 1, name: "Tech Solutions SA", contact: "Rodrigo Faria", email: "rodrigo@techsolutions.com",
    phone: "(11) 9 9876-5432", source: "LinkedIn", score: 92, status: "Quente",
    stage: "Qualificação", value: "R$ 48.000", lastActivity: "há 1h", starred: true,
  },
  {
    id: 2, name: "Grupo Meridian", contact: "Camila Souza", email: "camila@meridian.com.br",
    phone: "(21) 9 9234-5678", source: "Inbound", score: 81, status: "Quente",
    stage: "Proposta", value: "R$ 120.000", lastActivity: "há 3h", starred: false,
  },
  {
    id: 3, name: "Alfa Varejo Ltda", contact: "Marcos Pereira", email: "marcos@alfavarejo.com",
    phone: "(11) 3456-7890", source: "Indicação", score: 67, status: "Morno",
    stage: "Prospecção", value: "R$ 22.000", lastActivity: "há 1 dia", starred: true,
  },
  {
    id: 4, name: "Vanguard Consulting", contact: "Fernanda Lima", email: "flima@vanguard.com",
    phone: "(48) 9 8765-4321", source: "Google Ads", score: 74, status: "Morno",
    stage: "Negociação", value: "R$ 85.000", lastActivity: "há 2 dias", starred: false,
  },
  {
    id: 5, name: "Prime Digital", contact: "João Costa", email: "joao@primedigital.io",
    phone: "(51) 9 9111-2222", source: "Facebook", score: 41, status: "Frio",
    stage: "Prospecção", value: "R$ 15.000", lastActivity: "há 5 dias", starred: false,
  },
  {
    id: 6, name: "InnovateTech Br", contact: "Beatriz Martins", email: "bea@innovatetech.br",
    phone: "(11) 9 8888-1111", source: "Evento", score: 88, status: "Quente",
    stage: "Qualificação", value: "R$ 67.000", lastActivity: "há 30min", starred: false,
  },
];

const stageColors: Record<string, string> = {
  "Prospecção": "badge-info",
  "Qualificação": "badge-warning",
  "Proposta": "badge-success",
  "Negociação": "badge-info",
  "Fechamento": "badge-neutral",
};

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-success" : score >= 60 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono font-semibold text-foreground">{score}</span>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Quente") return <Flame size={13} className="text-destructive" />;
  if (status === "Morno") return <Thermometer size={13} className="text-warning" />;
  return <Snowflake size={13} className="text-primary" />;
}

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [starred, setStarred] = useState<number[]>(
    leadsData.filter((l) => l.starred).map((l) => l.id)
  );

  const filtered = leadsData.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.contact.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStar = (id: number) =>
    setStarred((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  return (
    <div className="p-6 space-y-4 animate-fade-up">
      {/* Filters bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar lead ou contato…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-secondary border-border"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary hover:bg-secondary/80">
          <Filter size={13} /> Filtros <ChevronDown size={11} />
        </Button>
        <div className="flex items-center gap-1 px-2 h-8 rounded-lg bg-secondary border border-border text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> leads
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary hover:bg-secondary/80">
            <Upload size={12} /> Importar
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary hover:bg-secondary/80">
            <Download size={12} /> Exportar
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              {["", "Empresa / Contato", "Score", "Status", "Etapa", "Valor", "Fonte", "Últ. Atividade", ""].map((h, i) => (
                <th key={i} className="text-left px-4 py-3 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, idx) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="border-b border-border/50 hover:bg-secondary/40 transition-colors group cursor-pointer"
              >
                {/* Star */}
                <td className="pl-4 pr-2 py-3 w-8">
                  <button onClick={() => toggleStar(lead.id)} className="text-muted-foreground hover:text-warning transition-colors">
                    <Star size={13} fill={starred.includes(lead.id) ? "currentColor" : "none"} className={starred.includes(lead.id) ? "text-warning" : ""} />
                  </button>
                </td>

                {/* Name */}
                <td className="px-4 py-3">
                  <div className="font-semibold text-foreground">{lead.name}</div>
                  <div className="text-muted-foreground mt-0.5">{lead.contact}</div>
                </td>

                {/* Score */}
                <td className="px-4 py-3"><ScoreBar score={lead.score} /></td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <StatusIcon status={lead.status} />
                    {lead.status}
                  </span>
                </td>

                {/* Stage */}
                <td className="px-4 py-3">
                  <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-semibold", stageColors[lead.stage])}>
                    {lead.stage}
                  </span>
                </td>

                {/* Value */}
                <td className="px-4 py-3 font-mono font-semibold text-foreground">{lead.value}</td>

                {/* Source */}
                <td className="px-4 py-3 text-muted-foreground">{lead.source}</td>

                {/* Last Activity */}
                <td className="px-4 py-3 text-muted-foreground">{lead.lastActivity}</td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-md hover:bg-primary/15 text-muted-foreground hover:text-primary transition-colors">
                      <Phone size={12} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-primary/15 text-muted-foreground hover:text-primary transition-colors">
                      <Mail size={12} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal size={12} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 text-xs text-muted-foreground">
          <span>Mostrando {filtered.length} de {leadsData.length} leads</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-foreground">Anterior</button>
            <span className="px-3 py-1 rounded-md bg-primary/10 text-primary font-semibold">1</span>
            <button className="px-3 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-foreground">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
