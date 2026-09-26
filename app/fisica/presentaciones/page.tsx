import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

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
          <span><CourseText pageId="fisica--presentaciones" fieldId="text-1">Física • Diapositivas de Clase</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="fisica--presentaciones" fieldId="text-2">
          Presentaciones
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="fisica--presentaciones" fieldId="text-3">
          Diapositivas y notas visuales expuestas durante las cátedras magistrales organizadas por unidades temáticas.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <div className="grid gap-6 md:grid-cols-2"><CourseDocuments subjectId="fisica" category="presentaciones" /></div>
    </div>
  );
}
