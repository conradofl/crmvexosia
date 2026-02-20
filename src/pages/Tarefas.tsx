import { motion } from "framer-motion";
import { CheckSquare, Clock, AlertCircle, Plus, Calendar, User, Tag, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tasks = [
  { id: 1, title: "Ligar para Rodrigo Faria – Tech Solutions", priority: "Alta", due: "Hoje, 14h", assigned: "Ana Lima", tags: ["Follow-up", "Ligação"], status: "pending", company: "Tech Solutions SA" },
  { id: 2, title: "Enviar proposta revisada – Grupo Meridian", priority: "Alta", due: "Hoje, 17h", assigned: "Carlos Mendes", tags: ["Proposta"], status: "pending", company: "Grupo Meridian" },
  { id: 3, title: "Atualizar CRM com notas da reunião", priority: "Média", due: "Amanhã, 10h", assigned: "Ana Lima", tags: ["Admin"], status: "done", company: "Vanguard" },
  { id: 4, title: "Preparar demo para InnovateTech", priority: "Alta", due: "Sex, 09h", assigned: "Rafael Torres", tags: ["Demo"], status: "pending", company: "InnovateTech Br" },
  { id: 5, title: "Fazer onboarding do cliente Alfa Varejo", priority: "Média", due: "Seg, 10h", assigned: "Juliana Rocha", tags: ["Onboarding"], status: "pending", company: "Alfa Varejo" },
  { id: 6, title: "Revisar contrato – Atlas Corp", priority: "Baixa", due: "Qua, 15h", assigned: "Carlos Mendes", tags: ["Jurídico"], status: "done", company: "Atlas Corp" },
];

const priorityColors: Record<string, string> = {
  "Alta": "badge-danger",
  "Média": "badge-warning",
  "Baixa": "badge-neutral",
};

const tagColors = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-muted text-muted-foreground",
];

export default function TarefasPage() {
  const pending = tasks.filter((t) => t.status === "pending");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="p-6 space-y-5 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pendentes", value: pending.length, icon: Clock, color: "text-warning" },
          { label: "Concluídas Hoje", value: done.length, icon: CheckSquare, color: "text-success" },
          { label: "Atrasadas", value: 1, icon: AlertCircle, color: "text-destructive" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-xl p-4 flex items-center gap-3"
          >
            <s.icon size={20} className={s.color} />
            <div>
              <div className="text-xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary">
          <Filter size={12} /> Filtrar <ChevronDown size={11} />
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-border bg-secondary">
          <Calendar size={12} /> Período <ChevronDown size={11} />
        </Button>
      </div>

      {/* Task list */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Tarefas Pendentes</span>
          <span className="text-xs text-muted-foreground">{pending.length} tarefas</span>
        </div>
        <div className="divide-y divide-border/50">
          {pending.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 px-4 py-3.5 hover:bg-secondary/30 transition-colors group cursor-pointer"
            >
              <div className="mt-0.5 w-4 h-4 rounded border border-border-bright group-hover:border-primary transition-colors shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground leading-tight mb-1">{task.title}</div>
                <div className="flex items-center gap-3 flex-wrap text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={10} />{task.due}</span>
                  <span className="flex items-center gap-1"><User size={10} />{task.assigned}</span>
                  <span className="text-muted-foreground/60">{task.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {task.tags.map((tag, ti) => (
                  <span key={ti} className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", tagColors[ti % tagColors.length])}>
                    {tag}
                  </span>
                ))}
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", priorityColors[task.priority])}>
                  {task.priority}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {done.length > 0 && (
          <>
            <div className="px-4 py-3 border-t border-b border-border bg-secondary/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Concluídas</span>
              <span className="text-xs text-muted-foreground">{done.length}</span>
            </div>
            <div className="divide-y divide-border/50">
              {done.map((task, idx) => (
                <div key={task.id} className="flex items-start gap-3 px-4 py-3 opacity-50">
                  <CheckSquare size={16} className="text-success mt-0.5 shrink-0" />
                  <div className="text-sm line-through text-muted-foreground">{task.title}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
