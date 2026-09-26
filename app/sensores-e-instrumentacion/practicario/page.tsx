import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

import { sensoresNavItems } from '@/app/sensores-e-instrumentacion/page';

import { Cpu } from 'lucide-react';

export const metadata = {
  title: 'Practicario - Sensores e Instrumentación | Portal Académico',
  description: 'Guía oficial de prácticas experimentales de sensores y sistemas de acondicionamiento.',
};

export default async function PracticarioSensoresPage() {
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Cpu className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="sensores-e-instrumentacion--practicario" fieldId="text-1">Sensores • Prácticas de Laboratorio</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="sensores-e-instrumentacion--practicario" fieldId="text-2">
          Practicario de Sensores e Instrumentación
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="sensores-e-instrumentacion--practicario" fieldId="text-3">
          Guía práctica de caracterización estática y dinámica de transductores resistivos, galgas extensiométricas, termopares, sensores capacitivos y ópticos.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/sensores-e-instrumentacion" items={sensoresNavItems} />

      <div className="max-w-xl">
        <CourseDocuments subjectId="sensores-e-instrumentacion" category="practicario" />
      </div>
    </div>
  );
}
