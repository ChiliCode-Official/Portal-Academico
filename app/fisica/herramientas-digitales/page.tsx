import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import EmptyState from '@/components/EmptyState';
import { fisicaNavItems } from '@/app/fisica/page';
import { Laptop } from 'lucide-react';

export const metadata = {
  title: 'Herramientas Digitales - Física | Portal Académico',
  description: 'Simuladores y software de análisis para la asignatura de física.',
};

export default function HerramientasDigitalesFisicaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Laptop className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Recursos Computacionales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Herramientas Digitales
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Simuladores interactivos (PhET, GeoGebra, Tracker) y paquetes de modelado numérico para prácticas virtuales y verificación analítica.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <EmptyState
        title="Herramientas y simuladores digitales disponibles próximamente"
        description="Se están integrando los enlaces a entornos virtuales de simulación de física y guías de uso computacional para el semestre actual."
        icon={<Laptop className="w-8 h-8 text-slate-400" />}
      />
    </div>
  );
}
