import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

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
          <span><CourseText pageId="economia-sostenible--lectura-complementaria" fieldId="text-1">Economía Sostenible • Bibliografía de Apoyo</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="economia-sostenible--lectura-complementaria" fieldId="text-2">
          Lectura Complementaria
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="economia-sostenible--lectura-complementaria" fieldId="text-3">
          Artículos y análisis sectoriales sobre modelos circulares, políticas públicas energéticas e impacto ambiental.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/economia-sostenible" items={economiaNavItems} />

      <div className="grid gap-6 md:grid-cols-2"><CourseDocuments subjectId="economia-sostenible" category="lectura-complementaria" /></div>
    </div>
  );
}
