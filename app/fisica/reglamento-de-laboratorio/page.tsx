import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { fisicaNavItems } from '@/app/fisica/page';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { ShieldAlert, CheckSquare } from 'lucide-react';

export const metadata = {
  title: 'Reglamento de Laboratorio de Física | Portal Académico',
  description: 'Normativa interna, seguridad y requerimientos para el trabajo experimental.',
};

export default async function ReglamentoFisicaPage() {
  const documents = await getDocumentsByCategory('reglamento', 'fisica');
  const reglamentoDoc = documents[0] || {
    id: 'fisica-reglamento',
    title: 'Reglamento General de Seguridad e Higiene en Laboratorio de Física',
    description: 'Normas de bioseguridad, equipo de protección personal obligatorio y sanciones disciplinarias.',
    category: 'reglamento' as const,
    subjectId: 'fisica' as const,
    fileUrl: '/docs/fisica/reglamento-laboratorio-fisica.pdf',
    fileType: 'pdf' as const,
    publishedAt: '2026-08-15',
    isAvailable: true,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-800" />
          <span>Física • Marco Normativo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Reglamento de Laboratorio
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Lineamientos de observancia estricta para garantizar la integridad personal, el cuidado del equipo científico y la convivencia armónica durante las sesiones experimentales.
        </p>
      </div>

      <SubjectSubNav basePath="/fisica" items={fisicaNavItems} />

      {/* Full-width responsive document layout */}
      <div className="space-y-8">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand'] mb-2">
              Descarga y Lectura Oficial
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              Todo estudiante inscrito debe firmar la hoja de enterado del reglamento al inicio del semestre. Puede consultar el documento original a continuación:
            </p>
          </div>

          <div className="max-w-xl">
            <DocumentCard
              title={reglamentoDoc.title}
              description={reglamentoDoc.description}
              fileUrl={reglamentoDoc.fileUrl}
              fileType={reglamentoDoc.fileType}
              isAvailable={reglamentoDoc.isAvailable}
              publishedAt={reglamentoDoc.publishedAt}
            />
          </div>
        </div>

        {/* Synthesized Rules for quick reference */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-4">
            Puntos Fundamentales del Reglamento
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4A4A4A]">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1">Uso de Bata y EPP:</strong>
                Es obligatorio portar bata blanca de algodón 100% manga larga y calzado cerrado antiderrapante en cada práctica.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1">Manejo de Alimentos:</strong>
                Queda estrictamente prohibido ingerir alimentos, bebidas o mascar goma de mascar dentro del laboratorio.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1">Revisión de Instrumental:</strong>
                Cada equipo es responsable de inventariar y reportar oportunamente cualquier daño en los instrumentos antes de encender fuentes.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <CheckSquare className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1C1C1C] block mb-1">Limpieza y Desconexión:</strong>
                Al concluir la sesión, las mesas deben quedar completamente despejadas y las tomas de corriente desconectadas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
