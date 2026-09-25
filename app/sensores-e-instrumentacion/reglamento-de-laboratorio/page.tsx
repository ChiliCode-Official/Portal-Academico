import React from 'react';
import SubjectSubNav from '@/components/SubjectSubNav';
import DocumentCard from '@/components/DocumentCard';
import { sensoresNavItems } from '@/app/sensores-e-instrumentacion/page';
import { getDocumentsByCategory } from '@/lib/firebase/db';
import { ShieldAlert, Zap } from 'lucide-react';

export const metadata = {
  title: 'Reglamento - Sensores e Instrumentación | Portal Académico',
  description: 'Normativa de seguridad eléctrica y protección antiestática en laboratorio.',
};

export default async function ReglamentoSensoresPage() {
  const documents = await getDocumentsByCategory('reglamento', 'sensores-e-instrumentacion');
  const reglamentoDoc = documents[0] || {
    id: 'sensores-reglamento',
    title: 'Reglamento Específico del Laboratorio de Electrónica e Instrumentación',
    description: 'Lineamientos de manejo seguro de fuentes de alimentación, osciloscopios y componentes sensibles a ESD.',
    category: 'reglamento' as const,
    subjectId: 'sensores-e-instrumentacion' as const,
    fileUrl: '/docs/sensores/reglamento-sensores.pdf',
    fileType: 'pdf' as const,
    publishedAt: '2026-08-15',
    isAvailable: true,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-800" />
          <span>Sensores • Seguridad Operacional</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Reglamento de Laboratorio
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Normas para la manipulación correcta de fuentes de poder DC/AC, generadores de funciones, osciloscopios y circuitos integrados analógicos.
        </p>
      </div>

      <SubjectSubNav basePath="/sensores-e-instrumentacion" items={sensoresNavItems} />

      {/* Full-width responsive document view */}
      <div className="space-y-8">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand'] mb-2">
              Reglamento Técnico Oficial
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              Consulte y descargue la normativa aplicable a mesas de prueba electro-electrónicas:
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

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Reglas Esenciales de Instrumentación</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4A4A4A]">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-[#1C1C1C] block mb-1">Cero Energía Durante el Cableado:</strong>
              Todo circuito debe alambrarse con la fuente de alimentación apagada. Verifique dos veces las polaridades antes de energizar.
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-[#1C1C1C] block mb-1">Protección Contra Descargas ESD:</strong>
              Es obligatorio aterrizar o utilizar pulseras antiestáticas al manipular transductores piezoeléctricos o amplificadores CMOS.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
