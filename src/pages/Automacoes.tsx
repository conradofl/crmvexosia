import { motion } from "framer-motion";
import { Zap, Mail, Phone, MessageSquare, Clock, Users, ArrowRight, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const automations = [
  {
    id: 1, name: "Follow-up Automático 48h", trigger: "Lead sem resposta há 48h",
    action: "Enviar e-mail de follow-up personalizado", channel: "email", active: true,
    runs: 142, converted: 31,
  },
  {
    id: 2, name: "Nutrição de Leads Frios", trigger: "Score < 50 por 7+ dias",
    action: "Sequência de 5 e-mails educativos (cadência 3 dias)", channel: "email", active: true,
    runs: 87, converted: 12,
  },
  {
    id: 3, name: "Alerta Lead Quente", trigger: "Score > 80 ou 3+ interações em 24h",
    action: "Notificar vendedor responsável + criar tarefa urgente", channel: "notification", active: true,
    runs: 28, converted: 21,
  },
  {
    id: 4, name: "Distribuição Round-Robin", trigger: "Novo lead inbound recebido",
    action: "Atribuir automaticamente entre vendedores ativos", channel: "system", active: false,
    runs: 203, converted: 58,
  },
  {
    id: 5, name: "SLA Atendimento 2h", trigger: "Ticket aberto sem resposta há 2h",
    action: "Escalar para gestor + WhatsApp de alerta", channel: "whatsapp", active: true,
    runs: 34, converted: 28,
  },
  {
    id: 6, name: "Proposta Visualizada", trigger: "Cliente abre proposta enviada",
    action: "Notificar vendedor em tempo real + sugerir ligação", channel: "notification", active: true,
    runs: 67, converted: 45,
  },
];

const channelIcon: Record<string, React.ElementType> = {
  email: Mail,
  whatsapp: MessageSquare,
  notification: Zap,
  system: Users,
  phone: Phone,
};

const channelColor: Record<string, string> = {
  email: "badge-info",
  whatsapp: "badge-success",
  notification: "badge-warning",
  system: "badge-neutral",
};

export default function AutomacoesPage() {
  const [items, setItems] = useState(automations);

  const toggle = (id: number) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));

  return (
    <div className="p-6 space-y-5 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Automações Ativas", value: items.filter((a) => a.active).length, color: "text-success" },
          { label: "Execuções Este Mês", value: items.reduce((s, a) => s + a.runs, 0), color: "text-primary" },
          { label: "Conversões Geradas", value: items.reduce((s, a) => s + a.converted, 0), color: "text-accent" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-xl p-4"
          >
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((auto, idx) => {
          const Icon = channelIcon[auto.channel] ?? Zap;
          return (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "glass-card rounded-xl p-4 flex items-center gap-4 transition-all",
                !auto.active && "opacity-50"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                auto.active ? "bg-primary/15" : "bg-secondary"
              )}>
                <Icon size={16} className={auto.active ? "text-primary" : "text-muted-foreground"} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground mb-1">{auto.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Clock size={10} /> {auto.trigger}
                  <ArrowRight size={10} className="text-muted-foreground/40" />
                  <span className="text-foreground/70">{auto.action}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs">
                <div className="text-center hidden md:block">
                  <div className="font-bold text-foreground">{auto.runs}</div>
                  <div className="text-[10px] text-muted-foreground">Execuções</div>
                </div>
                <div className="text-center hidden md:block">
                  <div className="font-bold text-success">{auto.converted}</div>
                  <div className="text-[10px] text-muted-foreground">Conversões</div>
                </div>
                <span className={cn("px-2 py-0.5 rounded-full font-semibold text-[10px]", channelColor[auto.channel])}>
                  {auto.channel}
                </span>
                <button onClick={() => toggle(auto.id)} className="transition-colors">
                  {auto.active
                    ? <ToggleRight size={22} className="text-primary" />
                    : <ToggleLeft size={22} className="text-muted-foreground" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-dashed border-border/60 hover:border-border-bright rounded-xl px-4 py-3 w-full justify-center">
        <Plus size={14} /> Criar nova automação
      </button>
    </div>
  );
}
