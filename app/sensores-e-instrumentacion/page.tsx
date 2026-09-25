import React from 'react';
import Link from 'next/link';
import { Cpu, BookOpen, ClipboardList, ShieldAlert, ArrowRight, FileText } from 'lucide-react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { getDocumentsBySubject } from '@/lib/firebase/db';

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
  const allDocs = await getDocumentsBySubject('sensores-e-instrumentacion');
  const syllabusDoc = allDocs.find((d) => d.id === 'sensores-syllabus') || {
    id: 'sensores-syllabus',
    title: 'Syllabus y Guía Metodológica de Sensores e Instrumentación',
    description: 'Temario oficial, arquitectura de sistemas de medida, sensores resistivos, capacitivos y ópticos.',
    category: 'general' as const,
    subjectId: 'sensores-e-instrumentacion' as const,
    fileUrl: '/docs/sensores/syllabus-sensores-instrumentacion.pdf',
    fileType: 'pdf' as const,
    publishedAt: '2026-08-15',
    isAvailable: true,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Cpu className="w-3.5 h-3.5 text-slate-800" />
          <span>Asignatura Curricular • Clave INS-305</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Sensores e Instrumentación
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Diseño e integración de sistemas de medición electrónica, adquisición de señales analógicas/digitales y acondicionamiento operacional.
        </p>
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
                  <h2 className="text-lg font-bold text-[#1C1C1C] font-['Quicksand']">
                    Syllabus y Guía de Cátedra
                  </h2>
                  <span className="text-xs text-[#4A4A4A]">Documento Rector Semestral</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-6">
              Programa analítico de la asignatura: transducción física a eléctrica, filtros activos, amplificadores de instrumentación y convertidores ADC/DAC.
            </p>

            <DocumentCard
              title={syllabusDoc.title}
              description={syllabusDoc.description}
              fileUrl={syllabusDoc.fileUrl}
              fileType={syllabusDoc.fileType}
              isAvailable={syllabusDoc.isAvailable}
              publishedAt={syllabusDoc.publishedAt}
            />
          </div>
        </div>

        {/* Right: Direct Access Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
            Módulos de Laboratorio
          </h2>

          <Link
            href="/sensores-e-instrumentacion/practicario"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Practicario de Sensores
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2">
              Manual de pruebas y caracterización estática y dinámica de transductores.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Ir a Practicario</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/sensores-e-instrumentacion/bitacora-de-laboratorio"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <ClipboardList className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Bitácoras de Medición
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2">
              Hojas de registro individual de adquisición de señales y pruebas de linealidad.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Descargar Formatos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/sensores-e-instrumentacion/reglamento-de-laboratorio"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Reglamento de Electrónica
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2">
              Seguridad eléctrica, protección antiestática ESD y normativas de instrumental.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Consultar Reglamento</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
