import { CRMLayout } from "@/components/crm/CRMLayout";
import { Construction } from "lucide-react";

interface StubPageProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
}

export function StubPage({ title, subtitle, icon: Icon = Construction }: StubPageProps) {
  return (
    <CRMLayout title={title} subtitle={subtitle}>
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Icon size={28} className="text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Este módulo está em desenvolvimento. Em breve disponível nesta versão do CRM.
        </p>
        <div className="mt-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium">
          Em breve
        </div>
      </div>
    </CRMLayout>
  );
}
