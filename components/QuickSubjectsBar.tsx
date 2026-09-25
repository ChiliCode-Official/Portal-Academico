'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PhysicsAnimation from './PhysicsAnimation';
import SensorAnimation from './SensorAnimation';
import CoinAnimation from './CoinAnimation';
import BatteryAnimation from './BatteryAnimation';

interface QuickSubjectsBarProps {
  className?: string;
}

export default function QuickSubjectsBar({ className = '' }: QuickSubjectsBarProps) {
  return (
    <section className={`py-6 sm:py-8 px-3 sm:px-8 max-w-7xl mx-auto ${className}`}>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase font-mono bg-blue-50 text-blue-700 border border-blue-200 mb-1">
              <span>Acceso Rápido</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] font-['Quicksand']">
              Portales por Materia
            </h2>
          </div>
          <p className="text-xs text-[#4A4A4A] max-w-md">
            Ingreso directo a los espacios, bitácoras y materiales de cada cátedra
          </p>
        </div>

        {/* Subjects Row: 2 columns on mobile, 4 on desktop for easy tapping */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. FÍSICA con animación balancín */}
          <Link
            href="/fisica"
            className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 hover:to-blue-50/40 hover:border-blue-300 transition-all active:scale-[0.98] hover:shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-blue-100/70 text-blue-800">
                FIS-101
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="py-1 sm:py-2 flex justify-center items-center min-h-[55px] sm:min-h-[70px]">
              <PhysicsAnimation />
            </div>

            <div className="mt-2 text-center">
              <h3 className="font-bold text-xs sm:text-base text-[#1C1C1C] font-['Quicksand'] group-hover:text-blue-600 transition-colors leading-tight">
                FÍSICA
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Mecánica y laboratorio
              </p>
            </div>
          </Link>

          {/* 2. ECONOMÍA SOSTENIBLE */}
          <Link
            href="/economia-sostenible"
            className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 hover:to-emerald-50/40 hover:border-emerald-300 transition-all active:scale-[0.98] hover:shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800">
                ECO-204
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="py-1 sm:py-2 flex justify-center items-center min-h-[55px] sm:min-h-[70px]">
              <CoinAnimation />
            </div>

            <div className="mt-2 text-center">
              <h3 className="font-bold text-xs sm:text-base text-[#1C1C1C] font-['Quicksand'] group-hover:text-emerald-600 transition-colors leading-tight">
                ECONOMÍA SOST.
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Ciclos y sustentabilidad
              </p>
            </div>
          </Link>

          {/* 3. SENSORES E INSTRUMENTACIÓN */}
          <Link
            href="/sensores-e-instrumentacion"
            className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 hover:to-amber-50/40 hover:border-amber-300 transition-all active:scale-[0.98] hover:shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-amber-100/70 text-amber-800">
                INS-305
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="py-1 sm:py-2 flex justify-center items-center min-h-[55px] sm:min-h-[70px]">
              <SensorAnimation />
            </div>

            <div className="mt-2 text-center">
              <h3 className="font-bold text-xs sm:text-base text-[#1C1C1C] font-['Quicksand'] group-hover:text-amber-600 transition-colors leading-tight">
                SENSORES
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Metrología y señales
              </p>
            </div>
          </Link>

          {/* 4. PURA ENERGÍA */}
          <Link
            href="/pura-energia"
            className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 hover:to-violet-50/40 hover:border-violet-300 transition-all active:scale-[0.98] hover:shadow-md overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-violet-100/70 text-violet-800">
                ENE-402
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="py-1 sm:py-2 flex justify-center items-center min-h-[55px] sm:min-h-[70px]">
              <BatteryAnimation />
            </div>

            <div className="mt-2 text-center">
              <h3 className="font-bold text-xs sm:text-base text-[#1C1C1C] font-['Quicksand'] group-hover:text-violet-600 transition-colors leading-tight">
                PURA ENERGÍA
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Fuentes renovables
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
