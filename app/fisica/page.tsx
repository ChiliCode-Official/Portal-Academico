import React from 'react';
import Link from 'next/link';
import { Atom, BookOpen, ClipboardList, ShieldAlert, ArrowRight, FileText } from 'lucide-react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { getDocumentsBySubject } from '@/lib/firebase/db';

export const metadata = {
  title: 'Física | Portal Académico',
  description: 'Programa oficial, practicario, bitácora y normativas del curso de Física.',
};

export const fisicaNavItems = [
  { label: 'Practicario', href: '/fisica/practicario' },
  { label: 'Bitácora de Laboratorio', href: '/fisica/bitacora-de-laboratorio' },
  { label: 'Reglamento de Laboratorio', href: '/fisica/reglamento-de-laboratorio' },
  { label: 'Lectura Obligatoria', href: '/fisica/lectura-obligatoria' },
  { label: 'Lectura Complementaria', href: '/fisica/lectura-complementaria' },
  { label: 'Herramientas Digitales', href: '/fisica/herramientas-digitales' },
  { label: 'Rúbricas', href: '/fisica/rubricas' },
  { label: 'Presentaciones', href: '/fisica/presentaciones' },
];

export default async function FisicaPage() {
  const allDocs = await getDocumentsBySubject('fisica');
  const syllabusDoc = allDocs.find((d) => d.id === 'fisica-syllabus') || {
    id: 'fisica-syllabus',
    title: 'Syllabus Oficial de Física para Ingeniería',
    description: 'Programa analítico institucional, competencias previas, temario desglosado y criterios de evaluación.',
    category: 'general' as const,
    subjectId: 'fisica' as const,
    fileUrl: '/docs/fisica/syllabus-fisica.pdf',
    fileType: 'pdf' as const,
    publishedAt: '2026-08-15',
    isAvailable: true,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Atom className="w-3.5 h-3.5 text-slate-800" />
          <span>Asignatura Curricular • Clave FIS-101</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Física
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Cátedra orientada a la fundamentación teórico-experimental en cinemática, dinámica, termofísica y electromagnetismo aplicada a problemas reales de ingeniería.
        </p>
      </div>

      {/* Quick Index Sub-Nav */}
      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

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
                    Syllabus de la Asignatura
                  </h2>
                  <span className="text-xs text-[#4A4A4A]">Documento Rector Semestral</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-6">
              El syllabus contiene la planeación didáctica por semanas, los objetivos de aprendizaje de cada unidad temáticas, el porcentaje ponderado de exámenes, bitácoras y proyectos finales, así como la bibliografía estándar sugerida.
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

        {/* Right: Direct Access Cards: Practicario, Bitácora, Reglamento */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
            Accesos Clave de Laboratorio
          </h2>

          {/* Practicario Card */}
          <Link
            href="/fisica/practicario"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Practicario de Laboratorio
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2">
              Consulte la versión vigente del manual de prácticas experimentales y el histórico de referencia.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Ir a Practicarios</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bitácora Card */}
          <Link
            href="/fisica/bitacora-de-laboratorio"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <ClipboardList className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Bitácora de Laboratorio
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2">
              Formatos oficiales de registro individual, tablas de datos crudos y hojas de dispersión.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Ir a Formatos de Bitácora</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Reglamento Card */}
          <Link
            href="/fisica/reglamento-de-laboratorio"
            className="group block p-5 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Reglamento de Laboratorio
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A] line-clamp-2">
              Normas obligatorias de seguridad, bata blanca de algodón y protocolos de prevención de incidentes.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Ver Reglamento Completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
