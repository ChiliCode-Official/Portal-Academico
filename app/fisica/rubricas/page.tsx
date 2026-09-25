import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { fisicaNavItems } from '@/app/fisica/page';
import { CheckCheck } from 'lucide-react';

export const metadata = {
  title: 'Rúbricas de Evaluación - Física | Portal Académico',
  description: 'Instrumentos de ponderación y matrices de valoración de reportes y proyectos.',
};

export default function RubricasFisicaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <CheckCheck className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Instrumentos de Calificación</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Rúbricas
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Matrices analíticas de evaluación con los descriptores cuantitativos y cualitativos para la calificación de reportes de laboratorio y proyectos integradores.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <EmptyState
        title="Material de evaluación disponible próximamente"
        description="Las matrices de evaluación y listas de cotejo para el presente periodo se publicarán tras el consenso colegiado de la academia."
        icon={<CheckCheck className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
