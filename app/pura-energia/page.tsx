import { CourseText, CourseDocuments } from '@/components/CourseContent';
import React from 'react';

import { Zap, Sparkles, Lightbulb, Compass } from 'lucide-react';

export const metadata = {
  title: 'Pura Energía | Portal Académico',
  description: 'Espacio transversal y repositorio de innovación y transición energética.',
};

export default function PuraEnergiaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Zap className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="pura-energia--general" fieldId="text-1">Iniciativa Académica & Transversal • Clave ENE-402</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="pura-energia--general" fieldId="text-2">
          Pura Energía
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="pura-energia--general" fieldId="text-3">
          Hub de proyectos de investigación aplicada, divulgación científica y desarrollo tecnológico enfocado en la física y economía de las energías limpias.
        </CourseText></p>
      </div>

      {/* Institutional Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg w-fit mb-3 border border-slate-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-1"><CourseText pageId="pura-energia--general" fieldId="text-4">
            Innovación y Desarrollo
          </CourseText></h3>
          <p className="text-xs text-[#4A4A4A] leading-relaxed"><CourseText pageId="pura-energia--general" fieldId="text-5">
            Prototipos estudiantiles para aprovechamiento fotovoltaico, eólico y almacenamiento electroquímico.
          </CourseText></p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg w-fit mb-3 border border-slate-100">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-1"><CourseText pageId="pura-energia--general" fieldId="text-6">
            Divulgación Científica
          </CourseText></h3>
          <p className="text-xs text-[#4A4A4A] leading-relaxed"><CourseText pageId="pura-energia--general" fieldId="text-7">
            Seminarios periódicos sobre eficiencia energética y nuevas tecnologías de conversión renovable.
          </CourseText></p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg w-fit mb-3 border border-slate-100">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-1"><CourseText pageId="pura-energia--general" fieldId="text-8">
            Vinculación Técnica
          </CourseText></h3>
          <p className="text-xs text-[#4A4A4A] leading-relaxed"><CourseText pageId="pura-energia--general" fieldId="text-9">
            Colaboración con centros de investigación y laboratorios de prueba para proyectos terminales.
          </CourseText></p>
        </div>
      </div>

      {/* Institutional landing hub with consistent layout and EmptyState ready for future course materials */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <h2 className="text-lg font-bold text-[#1C1C1C] font-['Quicksand'] mb-1"><CourseText pageId="pura-energia--general" fieldId="text-10">
            Repositorio de Materiales del Proyecto
          </CourseText></h2>
          <p className="text-xs text-[#4A4A4A]"><CourseText pageId="pura-energia--general" fieldId="text-11">
            Los recursos documentales, guías de construcción de prototipos y memorias de cálculo se alojarán en este portal.
          </CourseText></p>
        </div>

        <div className="grid gap-6 md:grid-cols-2"><CourseDocuments subjectId="pura-energia" category="general" /></div>
      </div>
    </div>
  );
}
