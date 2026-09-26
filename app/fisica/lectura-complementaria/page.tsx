import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

import { fisicaNavItems } from '@/app/fisica/page';

import { BookOpenCheck } from 'lucide-react';

export const metadata = {
  title: 'Lectura Complementaria - Física | Portal Académico',
  description: 'Artículos y textos complementarios para profundización de temas físicos.',
};

export default async function LecturaComplementariaFisicaPage() {
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <BookOpenCheck className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="fisica--lectura-complementaria" fieldId="text-1">Física • Extensión de Conocimiento</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="fisica--lectura-complementaria" fieldId="text-2">
          Lectura Complementaria
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="fisica--lectura-complementaria" fieldId="text-3">
          Materiales bibliográficos para profundizar en aplicaciones interdisciplinarias de la física en las ramas de la ingeniería contemporánea.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <div className="max-w-xl">
        <CourseDocuments subjectId="fisica" category="lectura-complementaria" />
      </div>
    </div>
  );
}
