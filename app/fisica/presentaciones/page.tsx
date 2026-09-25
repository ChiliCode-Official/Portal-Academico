import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { fisicaNavItems } from '@/app/fisica/page';
import { Presentation } from 'lucide-react';

export const metadata = {
  title: 'Presentaciones de Física | Portal Académico',
  description: 'Diapositivas y material visual de apoyo de las clases teóricas de física.',
};

export default function PresentacionesFisicaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Presentation className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Diapositivas de Clase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Presentaciones
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Diapositivas y notas visuales expuestas durante las cátedras magistrales organizadas por unidades temáticas.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <EmptyState
        title="Presentaciones de clase en preparación"
        description="Las diapositivas correspondientes a cada unidad se subirán progresivamente conforme avancen las sesiones teóricas."
        icon={<Presentation className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
