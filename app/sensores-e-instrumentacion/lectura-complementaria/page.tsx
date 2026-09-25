import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { sensoresNavItems } from '@/app/sensores-e-instrumentacion/page';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Lectura Complementaria - Sensores e Instrumentación | Portal Académico',
  description: 'Lecturas de apoyo y hojas de datos técnicas para sensores e instrumentación.',
};

export default function LecturaComplementariaSensoresPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-slate-800" />
          <span>Sensores e Instrumentación • Bibliografía</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Lectura Complementaria
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Artículos científicos, notas de aplicación de fabricantes (Texas Instruments, Analog Devices) y estándares IEEE de instrumentación.
        </p>
      </div>

      <SubjectSubNav basePath="/sensores-e-instrumentacion" items={sensoresNavItems} />

      <EmptyState
        title="Lecturas complementarias en selección"
        description="Las notas de aplicación y hojas de datos técnicas complementarias se publicarán conforme se aborden los módulos de acondicionamiento de señal."
        icon={<BookOpen className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
