import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { fisicaNavItems } from '@/app/fisica/page';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { Bookmark } from 'lucide-react';

export const metadata = {
  title: 'Lectura Obligatoria - Física | Portal Académico',
  description: 'Textos y capítulos de lectura obligatoria para la acreditación del curso.',
};

export default async function LecturaObligatoriaFisicaPage() {
  const documents = await getDocumentsByCategory('lectura-obligatoria', 'fisica');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Bookmark className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Material Bibliográfico</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Lectura Obligatoria
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Lecturas académicas seleccionadas cuyo contenido será evaluado en los exámenes teóricos y aplicado en la resolución de problemas en aula.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      {/* Sub-header "Primer Parcial" */}
      <div className="mb-10">
        <div className="border-b border-[#E5E7EB] pb-3 mb-6">
          <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand']">
            Primer Parcial
          </h2>
          <p className="text-xs text-[#4A4A4A] mt-1">
            Descargas asignadas para el primer bloque evaluativo del semestre.
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
    </div>
  );
}
