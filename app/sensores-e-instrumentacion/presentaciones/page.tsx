import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { sensoresNavItems } from '@/app/sensores-e-instrumentacion/page';
import { Presentation } from 'lucide-react';

export const metadata = {
  title: 'Presentaciones - Sensores e Instrumentación | Portal Académico',
  description: 'Diapositivas y material de apoyo audiovisual de la cátedra de sensores e instrumentación.',
};

export default function PresentacionesSensoresPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Presentation className="w-3.5 h-3.5 text-slate-800" />
          <span>Sensores e Instrumentación • Diapositivas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Presentaciones
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Diapositivas correspondientes a las sesiones magistrales de modelación de sensores, circuitos puente y sistemas de adquisición digital.
        </p>
      </div>

      <SubjectSubNav basePath="/sensores-e-instrumentacion" items={sensoresNavItems} />

      <EmptyState
        title="Presentaciones en proceso de carga"
        description="El material didáctico audiovisual estará disponible en este repositorio tras la impartición de cada bloque temático."
        icon={<Presentation className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
