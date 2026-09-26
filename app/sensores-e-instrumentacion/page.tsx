import { CourseText, CourseLink, CourseDocuments } from '@/components/CourseContent';
import React from 'react';

import { Cpu, BookOpen, ClipboardList, ShieldAlert, ArrowRight, FileText } from 'lucide-react';
import SubjectSubNav from '@/components/SubjectSubNav';



export const metadata = {
  title: 'Sensores e Instrumentación | Portal Académico',
  description: 'Programa oficial, practicario, bitácoras y normas del curso de Sensores e Instrumentación.',
};

export const sensoresNavItems = [
  { label: 'Practicario', href: '/sensores-e-instrumentacion/practicario' },
  { label: 'Bitácora de Laboratorio', href: '/sensores-e-instrumentacion/bitacora-de-laboratorio' },
  { label: 'Reglamento de Laboratorio', href: '/sensores-e-instrumentacion/reglamento-de-laboratorio' },
  { label: 'Lectura Complementaria', href: '/sensores-e-instrumentacion/lectura-complementaria' },
  { label: 'Presentaciones', href: '/sensores-e-instrumentacion/presentaciones' },
];

export default async function SensoresPage() {
  
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Cpu className="w-3.5 h-3.5 text-slate-800" />
          <span><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-1">Asignatura Curricular • Clave INS-305</CourseText></span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-2">
          Sensores e Instrumentación
        </CourseText></h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-3">
          Diseño e integración de sistemas de medición electrónica, adquisición de señales analógicas/digitales y acondicionamiento operacional.
        </CourseText></p>
      </div>

      {/* Quick Index Sub-Nav */}
      <SubjectSubNav basePath="/sensores-e-instrumentacion" items={sensoresNavItems} />

      {/* Main Layout: Syllabus + Direct Access Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left: Syllabus de la Asignatura */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1C1C1C] font-['Quicksand']"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-4">
                    Syllabus y Guía de Cátedra
                  </CourseText></h2>
                  <span className="text-xs text-[#4A4A4A]"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-5">Documento Rector Semestral</CourseText></span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-6"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-6">
              Programa analítico de la asignatura: transducción física a eléctrica, filtros activos, amplificadores de instrumentación y convertidores ADC/DAC.
            </CourseText></p>

            <CourseDocuments subjectId="sensores-e-instrumentacion" category="general" />
          </div>
        </div>

        {/* Right: Direct Access Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono mb-2"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-7">
            Módulos de Laboratorio
          </CourseText></h2>

          <CourseLink pageId="sensores-e-instrumentacion--general" linkId="link-1"
            href="/sensores-e-instrumentacion/practicario"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-8">
                Practicario de Sensores
              </CourseText></h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-9">
              Manual de pruebas y caracterización estática y dinámica de transductores.
            </CourseText></p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-10">Ir a Practicario</CourseText></span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </CourseLink>

          <CourseLink pageId="sensores-e-instrumentacion--general" linkId="link-2"
            href="/sensores-e-instrumentacion/bitacora-de-laboratorio"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <ClipboardList className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-11">
                Bitácoras de Medición
              </CourseText></h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-12">
              Hojas de registro individual de adquisición de señales y pruebas de linealidad.
            </CourseText></p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-13">Descargar Formatos</CourseText></span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </CourseLink>

          <CourseLink pageId="sensores-e-instrumentacion--general" linkId="link-3"
            href="/sensores-e-instrumentacion/reglamento-de-laboratorio"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-14">
                Reglamento de Electrónica
              </CourseText></h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2"><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-15">
              Seguridad eléctrica, protección antiestática ESD y normativas de instrumental.
            </CourseText></p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span><CourseText pageId="sensores-e-instrumentacion--general" fieldId="text-16">Consultar Reglamento</CourseText></span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </CourseLink>
        </div>
      </div>
    </div>
  );
}
