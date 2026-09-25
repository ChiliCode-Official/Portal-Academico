import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { economiaNavItems } from '@/app/economia-sostenible/page';
import { Presentation } from 'lucide-react';

export const metadata = {
  title: 'Presentaciones - Economía Sostenible | Portal Académico',
  description: 'Diapositivas y esquemas visuales del curso de economía sustentable.',
};

export default function PresentacionesEconomiaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Presentation className="w-3.5 h-3.5 text-slate-800" />
          <span>Economía Sostenible • Diapositivas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Presentaciones
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Materiales didácticos y resúmenes ejecutivos presentados en las sesiones de análisis económico.
        </p>
      </div>

      <SubjectSubNav basePath="/economia-sostenible" items={economiaNavItems} />

      <EmptyState
        title="Presentaciones en edición"
        description="Las presentaciones de clase se encontrarán a su disposición en formato PDF conforme se expongan los temas correspondientes."
        icon={<Presentation className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
