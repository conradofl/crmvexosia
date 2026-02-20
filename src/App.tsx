import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import { CRMLayout } from "@/components/crm/CRMLayout";

// Pages
import DashboardPage from "@/pages/Dashboard";
import LeadsPage from "@/pages/Leads";
import PipelinePage from "@/pages/Pipeline";
import EmpresasPage from "@/pages/Empresas";
import TarefasPage from "@/pages/Tarefas";
import AutomacoesPage from "@/pages/Automacoes";
import { StubPage } from "@/pages/StubPage";
import NotFound from "@/pages/NotFound";

// Icons for stub pages
import {
  Users, UserCheck, Calendar, MessageSquare, DollarSign,
  BarChart3, Settings, Puzzle, FileText, Bell, GitBranch,
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={
            <CRMLayout title="Dashboard" subtitle="Visão geral do seu CRM">
              <DashboardPage />
            </CRMLayout>
          } />

          {/* Comercial */}
          <Route path="/leads" element={
            <CRMLayout title="Leads" subtitle="Gerencie e qualifique seus leads">
              <LeadsPage />
            </CRMLayout>
          } />
          <Route path="/contatos" element={
            <StubPage title="Contatos" subtitle="Gerencie seus contatos" icon={Users} />
          } />
          <Route path="/empresas" element={
            <CRMLayout title="Empresas" subtitle="Visão das contas e organizações">
              <EmpresasPage />
            </CRMLayout>
          } />
          <Route path="/pipeline" element={
            <CRMLayout title="Pipeline Comercial" subtitle="Visualize e gerencie seu funil de vendas">
              <PipelinePage />
            </CRMLayout>
          } />
          <Route path="/oportunidades" element={
            <StubPage title="Oportunidades" subtitle="Negócios em andamento" icon={UserCheck} />
          } />

          {/* Operacional */}
          <Route path="/tarefas" element={
            <CRMLayout title="Tarefas" subtitle="Gerencie atividades e follow-ups">
              <TarefasPage />
            </CRMLayout>
          } />
          <Route path="/agenda" element={
            <StubPage title="Agenda" subtitle="Calendário de atividades" icon={Calendar} />
          } />
          <Route path="/atendimento" element={
            <StubPage title="Atendimento" subtitle="Central de suporte e tickets" icon={MessageSquare} />
          } />

          {/* Inteligência */}
          <Route path="/automacoes" element={
            <CRMLayout title="Automações" subtitle="Configure fluxos automáticos e gatilhos inteligentes">
              <AutomacoesPage />
            </CRMLayout>
          } />
          <Route path="/financeiro" element={
            <StubPage title="Financeiro" subtitle="Controle financeiro e billing" icon={DollarSign} />
          } />
          <Route path="/relatorios" element={
            <StubPage title="Relatórios" subtitle="Análises avançadas e BI" icon={BarChart3} />
          } />

          {/* Sistema */}
          <Route path="/integracoes" element={
            <StubPage title="Integrações" subtitle="Conecte ferramentas externas" icon={Puzzle} />
          } />
          <Route path="/logs" element={
            <StubPage title="Logs & Auditoria" subtitle="Rastreamento completo de ações" icon={FileText} />
          } />
          <Route path="/configuracoes" element={
            <StubPage title="Configurações" subtitle="Personalize seu CRM" icon={Settings} />
          } />
          <Route path="/notificacoes" element={
            <StubPage title="Notificações" subtitle="Central de alertas" icon={Bell} />
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
