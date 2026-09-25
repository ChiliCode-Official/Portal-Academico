import React from 'react';
import Link from 'next/link';
import { TrendingUp, BookOpen, Presentation, ArrowRight, Leaf } from 'lucide-react';
import SubjectSubNav from '@/components/SubjectSubNav';

export const metadata = {
  title: 'Economía Sostenible | Portal Académico',
  description: 'Modelos económicos ecológicos, transición energética y evaluación sustentable de proyectos de ingeniería.',
};

export const economiaNavItems = [
  { label: 'Lectura Complementaria', href: '/economia-sostenible/lectura-complementaria' },
  { label: 'Presentaciones', href: '/economia-sostenible/presentaciones' },
];

export default function EconomiaSosteniblePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-slate-800" />
          <span>Asignatura Curricular • Clave ECO-204</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Economía Sostenible
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Análisis del impacto socioeconómico de la ingeniería, economía circular, evaluación de ciclo de vida (ACV) y mecanismos financieros para la mitigación del cambio climático.
        </p>
      </div>

      <SubjectSubNav basePath="/economia-sostenible" items={economiaNavItems} />

      {/* Landing Hub Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100">
                <Leaf className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#1C1C1C] font-['Quicksand']">
                Enfoque de la Asignatura
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-4">
              La materia proporciona al estudiante de ingeniería las herramientas cuantitativas necesarias para modelar la viabilidad financiera de proyectos tecnológicos integrando externalidades ambientales y criterios ESG.
            </p>
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="font-semibold text-slate-800">Ejes Analíticos Principales:</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Valor Presente Neto (VPN) y Tasa Interna de Retorno (TIR) Verde.</li>
                <li>Mercados de carbono, bonos sustentables y tributación ambiental.</li>
                <li>Diseño circular e innovación en cadenas de suministro.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-[11px] text-slate-500">
            Cátedra con enfoque en los Objetivos de Desarrollo Sostenible (ODS - Agenda 2030).
          </div>
        </div>

        {/* Sub-routes Links */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
            Módulos del Curso
          </h2>

          <Link
            href="/economia-sostenible/lectura-complementaria"
            className="group block p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Lectura Complementaria
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A]">
              Informes de organismos internacionales (CEPAL, Banco Mundial, IRENA) sobre economía y desarrollo sustentable.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Acceder a lecturas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/economia-sostenible/presentaciones"
            className="group block p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand'] group-hover:text-black">
                Presentaciones de Cátedra
              </h3>
            </div>
            <p className="text-xs text-[#4A4A4A]">
              Material de soporte gráfico, estudios de caso y diapositivas de clase teórica.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-slate-700 group-hover:text-black gap-1">
              <span>Ver diapositivas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
