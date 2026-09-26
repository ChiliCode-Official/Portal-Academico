import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

import { fisicaNavItems } from '@/app/fisica/page';

import { Bookmark } from 'lucide-react';

export const metadata = {
  title: 'Lectura Obligatoria - Física | Portal Académico',
  description: 'Textos y capítulos de lectura obligatoria para la acreditación del curso.',
};

export default async function LecturaObligatoriaFisicaPage() {
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Bookmark className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="fisica--lectura-obligatoria" fieldId="text-1">Física • Material Bibliográfico</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="fisica--lectura-obligatoria" fieldId="text-2">
          Lectura Obligatoria
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="fisica--lectura-obligatoria" fieldId="text-3">
          Lecturas académicas seleccionadas cuyo contenido será evaluado en los exámenes teóricos y aplicado en la resolución de problemas en aula.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      {/* Sub-header "Primer Parcial" */}
      <div className="mb-10">
        <div className="border-b border-[#E5E7EB] pb-3 mb-6">
          <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand']"><CourseText pageId="fisica--lectura-obligatoria" fieldId="text-4">
            Primer Parcial
          </CourseText></h2>
          <p className="text-xs text-[#4A4A4A] mt-1"><CourseText pageId="fisica--lectura-obligatoria" fieldId="text-5">
            Descargas asignadas para el primer bloque evaluativo del semestre.
          </CourseText></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CourseDocuments subjectId="fisica" category="lectura-obligatoria" />
        </div>
      </div>
    </div>
  );
}
