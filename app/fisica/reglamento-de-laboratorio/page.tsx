import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';

import { fisicaNavItems } from '@/app/fisica/page';

import { ShieldAlert, CheckSquare } from 'lucide-react';

export const metadata = {
  title: 'Reglamento de Laboratorio de Física | Portal Académico',
  description: 'Normativa interna, seguridad y requerimientos para el trabajo experimental.',
};

export default async function ReglamentoFisicaPage() {
  
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="fisica--reglamento" fieldId="text-1">Física • Marco Normativo</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="fisica--reglamento" fieldId="text-2">
          Reglamento de Laboratorio
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="fisica--reglamento" fieldId="text-3">
          Lineamientos de observancia estricta para garantizar la integridad personal, el cuidado del equipo científico y la convivencia armónica durante las sesiones experimentales.
        </CourseText></p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      {/* Full-width responsive document layout */}
      <div className="space-y-8">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand'] mb-2"><CourseText pageId="fisica--reglamento" fieldId="text-4">
              Descarga y Lectura Oficial
            </CourseText></h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed"><CourseText pageId="fisica--reglamento" fieldId="text-5">
              Todo estudiante inscrito debe firmar la hoja de enterado del reglamento al inicio del semestre. Puede consultar el documento original a continuación:
            </CourseText></p>
          </div>

          <div className="max-w-xl">
            <CourseDocuments subjectId="fisica" category="reglamento" />
          </div>
        </div>

        {/* Synthesized Rules for quick reference */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-4"><CourseText pageId="fisica--reglamento" fieldId="text-6">
            Puntos Fundamentales del Reglamento
          </CourseText></h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4A4A4A]">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1"><CourseText pageId="fisica--reglamento" fieldId="text-7">Uso de Bata y EPP:</CourseText></strong><CourseText pageId="fisica--reglamento" fieldId="text-8">
                Es obligatorio portar bata blanca de algodón 100% manga larga y calzado cerrado antiderrapante en cada práctica.
              </CourseText></div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1"><CourseText pageId="fisica--reglamento" fieldId="text-9">Manejo de Alimentos:</CourseText></strong><CourseText pageId="fisica--reglamento" fieldId="text-10">
                Queda estrictamente prohibido ingerir alimentos, bebidas o mascar goma de mascar dentro del laboratorio.
              </CourseText></div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1"><CourseText pageId="fisica--reglamento" fieldId="text-11">Revisión de Instrumental:</CourseText></strong><CourseText pageId="fisica--reglamento" fieldId="text-12">
                Cada equipo es responsable de inventariar y reportar oportunamente cualquier daño en los instrumentos antes de encender fuentes.
              </CourseText></div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1"><CourseText pageId="fisica--reglamento" fieldId="text-13">Limpieza y Desconexión:</CourseText></strong><CourseText pageId="fisica--reglamento" fieldId="text-14">
                Al concluir la sesión, las mesas deben quedar completamente despejadas y las tomas de corriente desconectadas.
              </CourseText></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
