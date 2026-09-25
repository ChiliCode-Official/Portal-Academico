import React from 'react';
import DocumentCard from '@/components/DocumentCard';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { Award, CheckCircle, Info } from 'lucide-react';

export const metadata = {
  title: 'Dinámica de Clase | Portal Académico',
  description: 'Lineamientos de participación, tienda de habilidades y sistema de sellos.',
};

export default async function DinamicaDeClasePage() {
  const documents = await getDocumentsByCategory('dinamica');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Title & Introduction */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Award className="w-3.5 h-3.5 text-slate-800" />
          <span>Esquema de Evaluación & Méritos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Dinámica de Clase
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          En esta sección se detallan las mecánicas de participación activa, el sistema de incentivos para el desarrollo de competencias prácticas y la reglamentación para el registro y cancelación de sellos académicos.
        </p>
      </div>

      {/* Information Banner */}
      <div className="bg-slate-50 border border-[#E5E7EB] rounded-xl p-5 mb-10 flex items-start gap-4">
        <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
        <div className="text-xs text-[#4A4A4A] space-y-1">
          <strong className="text-[#1C1C1C] block text-sm font-semibold font-['Quicksand']">
            Aviso de Transparencia Académica
          </strong>
          <p>
            Los sellos son acumulativos y personales. Cada alumno es responsable de mantener en buen estado sus bitácoras con las firmas correspondientes. La tienda de habilidades operará exclusivamente en las fechas programadas en el calendario oficial de cada parcial.
          </p>
        </div>
      </div>

      {/* Three DocumentCards: Tienda de habilidades, Cancelación de sellos, Documento complementario */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand'] mb-6 flex items-center gap-2">
          <span>Documentación Oficial de Dinámica</span>
          <span className="text-xs font-mono font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {documents.length} Archivos
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Instructional guidelines summary */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-4">
          Resumen de Criterios de Acreditación de Sellos
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4A4A4A]">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <span>Los sellos se otorgan al término de la sesión práctica con el área limpia y ordenada.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <span>No se convalidarán sellos extemporáneos sin justificante institucional formal.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <span>El canje de habilidades debe apegarse a los límites estipulados en el catálogo vigente.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <span>Cualquier alteración en firmas o registros anula automáticamente el puntaje del parcial.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
