import { motion } from "framer-motion";
import { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  DollarSign,
  Calendar,
  User,
  Flame,
  Thermometer,
  Snowflake,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Deal {
  id: number;
  company: string;
  contact: string;
  value: number;
  days: number;
  heat: "hot" | "warm" | "cold";
  probability: number;
}

interface Stage {
  id: string;
  label: string;
  color: string;
  accent: string;
  deals: Deal[];
}

// ── Initial State ──────────────────────────────────────────────────────────────

const initialStages: Stage[] = [
  {
    id: "prospeccao",
    label: "Prospecção",
    color: "border-primary/40",
    accent: "bg-primary/10 text-primary",
    deals: [
      { id: 1, company: "Prime Digital", contact: "João Costa", value: 15000, days: 2, heat: "cold", probability: 20 },
      { id: 2, company: "BetaTech", contact: "Lucia Ramos", value: 32000, days: 5, heat: "warm", probability: 35 },
      { id: 3, company: "Nexo Sistemas", contact: "Paulo Melo", value: 11500, days: 1, heat: "cold", probability: 15 },
    ],
  },
  {
    id: "qualificacao",
    label: "Qualificação",
    color: "border-accent/40",
    accent: "bg-accent/10 text-accent",
    deals: [
      { id: 4, company: "Tech Solutions SA", contact: "Rodrigo Faria", value: 48000, days: 8, heat: "hot", probability: 60 },
      { id: 5, company: "InnovateTech Br", contact: "Beatriz Martins", value: 67000, days: 3, heat: "hot", probability: 70 },
    ],
  },
  {
    id: "proposta",
    label: "Proposta Enviada",
    color: "border-warning/40",
    accent: "bg-warning/10 text-warning",
    deals: [
      { id: 6, company: "Grupo Meridian", contact: "Camila Souza", value: 120000, days: 12, heat: "hot", probability: 75 },
      { id: 7, company: "Atlas Corp", contact: "Daniel Freitas", value: 43000, days: 7, heat: "warm", probability: 55 },
    ],
  },
  {
    id: "negociacao",
    label: "Negociação",
    color: "border-success/40",
    accent: "bg-success/10 text-success",
    deals: [
      { id: 8, company: "Vanguard Consulting", contact: "Fernanda Lima", value: 85000, days: 18, heat: "warm", probability: 80 },
    ],
  },
  {
    id: "fechamento",
    label: "Fechamento",
    color: "border-chart-5/40",
    accent: "bg-muted text-muted-foreground",
    deals: [
      { id: 9, company: "Alfa Varejo Ltda", contact: "Marcos Pereira", value: 22000, days: 4, heat: "warm", probability: 90 },
    ],
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function HeatIcon({ heat }: { heat: Deal["heat"] }) {
  if (heat === "hot") return <Flame size={11} className="text-destructive" />;
  if (heat === "warm") return <Thermometer size={11} className="text-warning" />;
  return <Snowflake size={11} className="text-primary" />;
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-lg p-3 cursor-pointer hover:border-border-bright transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-semibold text-xs text-foreground leading-tight">{deal.company}</div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
          <MoreHorizontal size={13} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2.5">
        <User size={10} />
        {deal.contact}
      </div>

      {/* Probability bar */}
      <div className="mb-2.5">
        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
          <span>Probabilidade</span>
          <span className="font-semibold text-foreground">{deal.probability}%</span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              deal.probability >= 70 ? "bg-success" : deal.probability >= 50 ? "bg-warning" : "bg-primary"
            )}
            style={{ width: `${deal.probability}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-mono font-bold text-xs text-foreground">
            <DollarSign size={10} />
            {(deal.value / 1000).toFixed(0)}k
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar size={9} />
            {deal.days}d
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <HeatIcon heat={deal.heat} />
        </div>
      </div>
    </motion.div>
  );
}

function StageColumn({ stage }: { stage: Stage }) {
  const totalValue = stage.deals.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className={cn("flex flex-col gap-2 min-w-56 w-56 shrink-0")}>
      {/* Header */}
      <div className={cn("rounded-lg px-3 py-2.5 border", stage.color, "border-opacity-40 bg-card/50")}>
        <div className="flex items-center justify-between mb-1">
          <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full", stage.accent)}>
            {stage.label}
          </span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Plus size={13} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="font-semibold text-foreground">{stage.deals.length}</span> negócios
          <span>·</span>
          <span className="font-mono font-semibold text-foreground">
            R$ {(totalValue / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {stage.deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
        <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-lg hover:bg-secondary/50">
          <Plus size={12} /> Adicionar negócio
        </button>
      </div>
    </div>
  );
}

// ── Summary bar ───────────────────────────────────────────────────────────────

function PipelineSummary({ stages }: { stages: Stage[] }) {
  const totalDeals = stages.reduce((s, st) => s + st.deals.length, 0);
  const totalValue = stages.reduce((s, st) => s + st.deals.reduce((ss, d) => ss + d.value, 0), 0);
  const weightedValue = stages.reduce((s, st) =>
    s + st.deals.reduce((ss, d) => ss + d.value * (d.probability / 100), 0), 0
  );
  return (
    <div className="flex items-center gap-6 px-6 py-3 border-b border-border bg-card/30 text-xs shrink-0">
      <div>
        <span className="text-muted-foreground">Total de negócios: </span>
        <span className="font-bold text-foreground">{totalDeals}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Volume bruto: </span>
        <span className="font-bold font-mono text-foreground">R$ {(totalValue / 1000).toFixed(0)}k</span>
      </div>
      <div>
        <span className="text-muted-foreground">Receita prevista: </span>
        <span className="font-bold font-mono text-primary">R$ {(weightedValue / 1000).toFixed(0)}k</span>
      </div>
      <div className="flex items-center gap-1.5 ml-auto text-muted-foreground">
        <span>Arraste para mover entre etapas</span>
        <ArrowRight size={12} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PipelinePage() {
  const [stages] = useState<Stage[]>(initialStages);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PipelineSummary stages={stages} />
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 p-6 h-full">
          {stages.map((stage) => (
            <StageColumn key={stage.id} stage={stage} />
          ))}
          {/* Add stage */}
          <div className="flex flex-col gap-2 min-w-44 w-44 shrink-0">
            <button className="rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-border-bright transition-colors flex items-center gap-2">
              <Plus size={13} /> Nova etapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
