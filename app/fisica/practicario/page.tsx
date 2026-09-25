import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { fisicaNavItems } from '@/app/fisica/page';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { BookOpen, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Practicario de Física | Portal Académico',
  description: 'Manual de prácticas de laboratorio vigentes y compendio anterior.',
};

export default async function PracticarioFisicaPage() {
  const documents = await getDocumentsByCategory('practicario', 'fisica');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Laboratorio Experimental</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Practicario de Física
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Manuales de prácticas experimentales para el desarrollo de competencias de medición, análisis de datos y modelación física.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Aviso a los equipos de práctica:</strong> Es indispensable leer la metodología y realizar la investigación previa indicada en el practicario antes de ingresar al laboratorio. No se permitirá el inicio de la práctica a equipos sin marco teórico resuelto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
}
