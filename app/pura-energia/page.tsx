import React from 'react';
import EmptyState from '@/components/EmptyState';
import { Zap, Sparkles, Lightbulb, Compass } from 'lucide-react';

export const metadata = {
  title: 'Pura Energía | Portal Académico',
  description: 'Espacio transversal y repositorio de innovación y transición energética.',
};

export default function PuraEnergiaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Zap className="w-3.5 h-3.5 text-slate-800" />
          <span>Iniciativa Académica & Transversal • Clave ENE-402</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Pura Energía
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Hub de proyectos de investigación aplicada, divulgación científica y desarrollo tecnológico enfocado en la física y economía de las energías limpias.
        </p>
      </div>

      {/* Institutional Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg w-fit mb-3 border border-slate-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-1">
            Innovación y Desarrollo
          </h3>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            Prototipos estudiantiles para aprovechamiento fotovoltaico, eólico y almacenamiento electroquímico.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg w-fit mb-3 border border-slate-100">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-1">
            Divulgación Científica
          </h3>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            Seminarios periódicos sobre eficiencia energética y nuevas tecnologías de conversión renovable.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg w-fit mb-3 border border-slate-100">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] mb-1">
            Vinculación Técnica
          </h3>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            Colaboración con centros de investigación y laboratorios de prueba para proyectos terminales.
          </p>
        </div>
      </div>

      {/* Institutional landing hub with consistent layout and EmptyState ready for future course materials */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <h2 className="text-lg font-bold text-[#1C1C1C] font-['Quicksand'] mb-1">
            Repositorio de Materiales del Proyecto
          </h2>
          <p className="text-xs text-[#4A4A4A]">
            Los recursos documentales, guías de construcción de prototipos y memorias de cálculo se alojarán en este portal.
          </p>
        </div>

        <EmptyState
          title="Módulo de recursos en preparación"
          description="Los documentos técnicos, reglamentos de laboratorio de energías y convocatorias de proyectos estudiantiles estarán disponibles próximamente."
          icon={<Zap className="w-8 h-8 text-slate-400" />}
        />
      </div>
    </div>
  );
}
