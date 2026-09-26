import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

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
          <span><CourseText pageId="fisica--rubricas" fieldId="text-1">Física • Instrumentos de Calificación</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="fisica--rubricas" fieldId="text-2">
          Rúbricas
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="fisica--rubricas" fieldId="text-3">
          Matrices analíticas de evaluación con los descriptores cuantitativos y cualitativos para la calificación de reportes de laboratorio y proyectos integradores.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <div className="grid gap-6 md:grid-cols-2"><CourseDocuments subjectId="fisica" category="rubricas" /></div>
    </div>
  );
}
