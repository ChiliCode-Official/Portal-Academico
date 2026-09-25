import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { economiaNavItems } from '@/app/economia-sostenible/page';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Lectura Complementaria - Economía Sostenible | Portal Académico',
  description: 'Lecturas y ensayos de análisis de economía circular y sostenibilidad.',
};

export default function LecturaComplementariaEconomiaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-slate-800" />
          <span>Economía Sostenible • Bibliografía de Apoyo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Lectura Complementaria
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Artículos y análisis sectoriales sobre modelos circulares, políticas públicas energéticas e impacto ambiental.
        </p>
      </div>

      <SubjectSubNav basePath="/economia-sostenible" items={economiaNavItems} />

      <EmptyState
        title="Lecturas complementarias en compilación"
        description="El repositorio de artículos y lecturas recomendadas para Economía Sostenible se habilitará para el siguiente bloque evaluativo."
        icon={<BookOpen className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
