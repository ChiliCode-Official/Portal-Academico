import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

import { fisicaNavItems } from '@/app/fisica/page';

import { BookOpen, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Practicario de Física | Portal Académico',
  description: 'Manual de prácticas de laboratorio vigentes y compendio anterior.',
};

export default async function PracticarioFisicaPage() {
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="fisica--practicario" fieldId="text-1">Física • Laboratorio Experimental</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="fisica--practicario" fieldId="text-2">
          Practicario de Física
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="fisica--practicario" fieldId="text-3">
          Manuales de prácticas experimentales para el desarrollo de competencias de medición, análisis de datos y modelación física.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong><CourseText pageId="fisica--practicario" fieldId="text-4">Aviso a los equipos de práctica:</CourseText></strong><CourseText pageId="fisica--practicario" fieldId="text-5"> Es indispensable leer la metodología y realizar la investigación previa indicada en el practicario antes de ingresar al laboratorio. No se permitirá el inicio de la práctica a equipos sin marco teórico resuelto.
        </CourseText></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CourseDocuments subjectId="fisica" category="practicario" />
      </div>
    </div>
  );
}
