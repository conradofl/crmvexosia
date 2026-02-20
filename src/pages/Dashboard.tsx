import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Zap,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ── Data ─────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Ago", receita: 82000, meta: 90000 },
  { month: "Set", receita: 95000, meta: 90000 },
  { month: "Out", receita: 88000, meta: 95000 },
  { month: "Nov", receita: 112000, meta: 100000 },
  { month: "Dez", receita: 134000, meta: 110000 },
  { month: "Jan", receita: 128000, meta: 120000 },
  { month: "Fev", receita: 157000, meta: 130000 },
];

const pipelineData = [
  { stage: "Prospecção", count: 142, value: 284000 },
  { stage: "Qualificação", count: 87, value: 521000 },
  { stage: "Proposta", count: 53, value: 795000 },
  { stage: "Negociação", count: 28, value: 672000 },
  { stage: "Fechamento", count: 12, value: 348000 },
];

const conversionPie = [
  { name: "Convertidos", value: 31 },
  { name: "Em andamento", value: 45 },
  { name: "Perdidos", value: 24 },
];

const PIE_COLORS = ["hsl(190,90%,50%)", "hsl(248,70%,60%)", "hsl(222,30%,24%)"];

const activities = [
  { icon: CheckCircle2, color: "text-success", label: "Lead qualificado", name: "Tech Solutions SA", time: "há 12min" },
  { icon: DollarSign, color: "text-primary", label: "Proposta enviada", name: "Grupo Meridian", time: "há 28min" },
  { icon: AlertCircle, color: "text-warning", label: "Follow-up pendente", name: "Alfa Varejo", time: "há 1h" },
  { icon: Zap, color: "text-accent", label: "Automação disparada", name: "Nutrição Campanha Q1", time: "há 2h" },
  { icon: Calendar, color: "text-chart-4", label: "Reunião agendada", name: "Pedro Carvalho", time: "há 3h" },
  { icon: Users, color: "text-chart-5", label: "Novo lead importado", name: "Lista MQL Fev", time: "há 4h" },
];

const topSellers = [
  { name: "Ana Lima", deals: 28, revenue: "R$ 312k", conv: "78%", trend: "up" },
  { name: "Carlos Mendes", deals: 22, revenue: "R$ 245k", conv: "71%", trend: "up" },
  { name: "Juliana Rocha", deals: 19, revenue: "R$ 198k", conv: "65%", trend: "down" },
  { name: "Rafael Torres", deals: 17, revenue: "R$ 176k", conv: "63%", trend: "up" },
];

// ── Components ────────────────────────────────────────────────────────────────

function KPICard({
  label,
  value,
  sub,
  delta,
  deltaUp,
  icon: Icon,
  accent,
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  delta: string;
  deltaUp: boolean;
  icon: React.ElementType;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card rounded-xl p-5 relative overflow-hidden group hover:border-border-bright transition-colors"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${accent}`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${accent.replace("bg-gradient", "bg").split(" ")[0]} bg-opacity-20`}>
            <Icon size={18} className={deltaUp ? "text-primary" : "text-accent"} />
          </div>
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              deltaUp
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {deltaUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta}
          </span>
        </div>
        <div className="text-2xl font-bold text-foreground mb-0.5">{value}</div>
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        {sub && <div className="text-[11px] text-muted-foreground/60 mt-1">{sub}</div>}
      </div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-card">
      <div className="font-semibold text-foreground mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="text-foreground font-medium">R$ {(p.value / 1000).toFixed(0)}k</span>
        </div>
      ))}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-up">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Receita do Mês"
          value="R$ 157k"
          sub="Meta: R$ 130k (120%)"
          delta="+18.4%"
          deltaUp
          icon={DollarSign}
          accent="bg-primary/5"
          delay={0}
        />
        <KPICard
          label="Novos Leads"
          value="284"
          sub="142 qualificados"
          delta="+23%"
          deltaUp
          icon={Target}
          accent="bg-accent/5"
          delay={0.05}
        />
        <KPICard
          label="Taxa de Conversão"
          value="31.2%"
          sub="Média setor: 24%"
          delta="+3.1pp"
          deltaUp
          icon={TrendingUp}
          accent="bg-success/5"
          delay={0.1}
        />
        <KPICard
          label="Ciclo Médio de Venda"
          value="18 dias"
          sub="Anterior: 22 dias"
          delta="-18.2%"
          deltaUp
          icon={Clock}
          accent="bg-warning/5"
          delay={0.15}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue area chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-xl p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-sm font-semibold text-foreground">Receita vs. Meta</div>
              <div className="text-xs text-muted-foreground mt-0.5">Últimos 7 meses</div>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190,90%,50%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(190,90%,50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(248,70%,60%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(248,70%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215,20%,45%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215,20%,45%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$ ${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="meta" name="Meta" stroke="hsl(248,70%,60%)" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradMeta)" />
              <Area type="monotone" dataKey="receita" name="Receita" stroke="hsl(190,90%,50%)" strokeWidth={2} fill="url(#gradReceita)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Conversion Pie */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass-card rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-foreground">Conversão</div>
              <div className="text-xs text-muted-foreground mt-0.5">Status dos leads</div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={conversionPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {conversionPie.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ background: "hsl(222,40%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {conversionPie.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[idx] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-sm font-semibold text-foreground">Pipeline por Etapa</div>
              <div className="text-xs text-muted-foreground mt-0.5">Volume de negócios</div>
            </div>
          </div>
          <div className="space-y-3">
            {pipelineData.map((stage, idx) => {
              const maxVal = Math.max(...pipelineData.map((s) => s.value));
              const pct = (stage.value / maxVal) * 100;
              const colors = ["bg-primary", "bg-accent", "bg-success", "bg-warning", "bg-chart-5"];
              return (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{stage.stage}</span>
                    <span className="text-foreground font-medium">
                      {stage.count} <span className="text-muted-foreground">· R$ {(stage.value / 1000).toFixed(0)}k</span>
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${colors[idx]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + idx * 0.08 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Sellers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-foreground">Top Vendedores</div>
              <div className="text-xs text-muted-foreground mt-0.5">Mês atual</div>
            </div>
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight size={11} />
            </button>
          </div>
          <div className="space-y-3">
            {topSellers.map((seller, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shrink-0">
                  {seller.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{seller.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {seller.deals} deals · {seller.revenue}
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    seller.trend === "up" ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                  }`}
                >
                  {seller.conv}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-foreground">Atividade Recente</div>
              <div className="text-xs text-muted-foreground mt-0.5">Últimas ações</div>
            </div>
          </div>
          <div className="space-y-3">
            {activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <act.icon size={14} className={`${act.color} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">{act.label}</div>
                  <div className="text-xs font-medium text-foreground truncate">{act.name}</div>
                </div>
                <span className="text-[10px] text-muted-foreground/60 shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
