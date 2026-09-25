import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { fisicaNavItems } from '@/app/fisica/page';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { ClipboardList, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Bitácora de Laboratorio de Física | Portal Académico',
  description: 'Formatos oficiales de registro individual y organizadores de reporte de laboratorio.',
};

export default async function BitacoraFisicaPage() {
  const documents = await getDocumentsByCategory('bitacora', 'fisica');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <ClipboardList className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Instrumento de Registro</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Bitácora de Laboratorio
        </h1>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      {/* Strict Instruction Box */}
      <div className="bg-white border-2 border-slate-800 rounded-xl p-6 sm:p-7 mb-8 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-900 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#1C1C1C] leading-relaxed">
            <p className="font-medium">
              Formato de registro para prácticas de laboratorio. Ambos documento deben ser descargados e impresos por el estudiante antes de cada sesión práctica para el registro INDIVIDUAL de datos, observaciones y resultados experimentales.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-800">
              <strong className="block font-semibold uppercase tracking-wider mb-1">
                Requisito:
              </strong>
              Presentar la bitácora impresa para cada una de las prácticas.
            </div>
            <p className="text-xs text-[#4A4A4A]">
              Documentos para utilizar en el DESARROLLO de las prácticas. Recuerden que son opcionales y cada uno debe decidir la organización de su reporte en esta área.
            </p>
          </div>
        </div>
      </div>

      {/* 8 Document Slots */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#1C1C1C] font-['Quicksand']">
            Formatos y Organizadores de Práctica ({documents.length} Archivos)
          </h2>
          <span className="text-xs text-slate-500 font-mono">Descargas Autorizadas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              fileUrl={doc.fileUrl}
              fileType={doc.fileType}
              isAvailable={doc.isAvailable}
              publishedAt={doc.publishedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
