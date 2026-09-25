import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Award, Sparkles, QrCode } from 'lucide-react';
import TeacherShop from '@/components/TeacherShop';

export const metadata = {
  title: 'Tienda de la Maestra | Canje de Sellos | Portal Académico',
  description: 'Canjea tus sellos acumulados por prórrogas, comodines y beneficios con la Prof. Xochitl.',
};

export default function TiendaPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Title & Introduction */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-amber-100 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Catálogo Oficial de Recompensas y Habilidades</span>
          </div>

          <Link
            href="/sellos-qr"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-black font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-600" />
            <span>¿Necesitas más sellos? Escanear QR</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-400 text-slate-950 rounded-2xl shadow-xs">
            <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
              Tienda de la Maestra
            </h1>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
              Canjea tus sellos acumulados en clase por comodines, prórrogas y décimas en evaluación continua.
            </p>
          </div>
        </div>
      </div>

      {/* Main Shop View */}
      <TeacherShop />
    </div>
  );
}
