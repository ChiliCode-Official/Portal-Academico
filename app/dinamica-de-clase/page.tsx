import React from 'react';
import Link from 'next/link';
import { Award, Layers, ArrowRight, ShieldCheck, FileText, CheckCircle, Flame, Droplets, Mountain, Wind, Sparkles } from 'lucide-react';
import { CourseDocuments, CourseDocumentCount } from '@/components/CourseContent';
import { getDocumentsByCategory } from '@/lib/firebase/db';

export const metadata = {
  title: 'Dinámica de Clase & Lineamientos | Portal Académico',
  description: 'Reglamentos, sistema elemental de sellos (Agua, Tierra, Fuego, Aire y Avatar) y tienda Gashapon.',
};

export default async function DinamicaDeClasePage() {
  const documents = await getDocumentsByCategory('dinamica');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Title & Introduction */}
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 mb-3">
          <Award className="w-3.5 h-3.5 text-slate-800" />
          <span>Dinámica Pedagógica & Sistema Elemental de Sellos</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Dinámica de Clase &bull; Sellos y Tienda Gashapon
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Consulta las reglas oficiales del sistema progresivo de sellos impartido por la Prof. Xochitl. Acredita méritos en clase para desbloquear niveles elementales y canjear cartas de recompensa en el Gashapon.
        </p>

        {/* Quick Nav Shortcut */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/sellos-qr"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all font-['Quicksand'] uppercase tracking-wider"
          >
            <span>Escanear / Otorgar Sellos QR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all font-['Quicksand'] uppercase tracking-wider"
          >
            <span>Ver Tienda Gashapon</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* System Overview: The 5 Elements */}
        <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0_#000000]">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b-2 border-slate-100">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-lg sm:text-xl font-black font-['Quicksand'] text-black">
                Jerarquía del Sistema Elemental de Sellos
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Desbloqueo progresivo: acumula méritos de un nivel para acceder al siguiente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Agua */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span className="font-mono font-bold text-xs uppercase text-blue-900">1. AGUA</span>
                </div>
                <h3 className="font-bold text-sm text-blue-950 mb-1 font-['Quicksand']">Base Formativa</h3>
                <p className="text-[11px] text-blue-900 leading-relaxed">
                  Participación activa, tareas a tiempo, actividad en clase terminada, resolución de ejercicios, asistencia y notas al día.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded mt-3 self-start">
                Base del sistema
              </span>
            </div>

            {/* Tierra */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mountain className="w-5 h-5 text-emerald-600" />
                  <span className="font-mono font-bold text-xs uppercase text-emerald-900">2. TIERRA</span>
                </div>
                <h3 className="font-bold text-sm text-emerald-950 mb-1 font-['Quicksand']">Análisis Crítico</h3>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  5 sellos Agua desbloquean Tierra. Pregunta crítica analítica, debate con argumentos, bitácora al corriente o 0 faltas.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded mt-3 self-start">
                Requiere 5 Agua
              </span>
            </div>

            {/* Fuego */}
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-rose-600" />
                  <span className="font-mono font-bold text-xs uppercase text-rose-900">3. FUEGO</span>
                </div>
                <h3 className="font-bold text-sm text-rose-950 mb-1 font-['Quicksand']">Desafío & Excelencia</h3>
                <p className="text-[11px] text-rose-900 leading-relaxed">
                  2 sellos Tierra desbloquean Fuego. Cuestionar el status quo, 3 prácticas seguidas con 9+ o 2 exámenes con 10.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded mt-3 self-start">
                Requiere 2 Tierra
              </span>
            </div>

            {/* Aire */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-amber-600" />
                  <span className="font-mono font-bold text-xs uppercase text-amber-900">4. AIRE</span>
                </div>
                <h3 className="font-bold text-sm text-amber-950 mb-1 font-['Quicksand']">Liderazgo & Cálculo</h3>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  2 sellos Fuego desbloquean Aire. Resolver un cálculo frente al grupo o investigación formal de 1 cuartilla.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded mt-3 self-start">
                Requiere 2 Fuego
              </span>
            </div>

            {/* Avatar */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-mono font-bold text-xs uppercase text-purple-900">5. AVATAR</span>
                </div>
                <h3 className="font-bold text-sm text-purple-950 mb-1 font-['Quicksand']">Maestría Total</h3>
                <p className="text-[11px] text-purple-900 leading-relaxed">
                  2 sellos Aire dan oportunidad a Avatar. Responder con mínimo 8 un examen sorpresa de 10 preguntas.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded mt-3 self-start">
                Requiere 2 Aire
              </span>
            </div>
          </div>
        </div>

        {/* Official Documents List */}
        <div>
          <h2 className="text-xl font-bold text-[#1C1C1C] font-['Quicksand'] mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <span>Documentos Oficiales Descargables</span>
            <span className="text-xs font-mono font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              <CourseDocumentCount category="dinamica" /> Archivos
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CourseDocuments category="dinamica" />
          </div>
        </div>
      </div>
    </div>
  );
}
