import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { fisicaNavItems } from '@/app/fisica/page';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { BookOpenCheck } from 'lucide-react';

export const metadata = {
  title: 'Lectura Complementaria - Física | Portal Académico',
  description: 'Artículos y textos complementarios para profundización de temas físicos.',
};

export default async function LecturaComplementariaFisicaPage() {
  const documents = await getDocumentsByCategory('lectura-complementaria', 'fisica');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <BookOpenCheck className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Extensión de Conocimiento</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Lectura Complementaria
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Materiales bibliográficos para profundizar en aplicaciones interdisciplinarias de la física en las ramas de la ingeniería contemporánea.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      <div className="max-w-xl">
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
