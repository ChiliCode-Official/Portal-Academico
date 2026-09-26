'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import TeacherPanel from '@/components/TeacherPanel';
import StudentPanel from '@/components/StudentPanel';
import Link from 'next/link';
import {
  Award,
  QrCode,
  LogIn,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  ShoppingBag,
  FileText
} from 'lucide-react';

export default function QRHubClientPage() {
  const { user, profile, isTeacher, signInWithGoogle, authError } = useAuth();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Title & Introduction */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200">
            <QrCode className="w-3.5 h-3.5 text-slate-800" />
            <span>Sistema Digital de Sellos QR &bull; Acreditación Dinámica</span>
          </div>

          {/* Quick role switcher / test helper */}
          {false && user && (
            <button
              onClick={() => {}}
              className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Cambia entre la vista de la Maestra y la del Alumno"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Modo actual: <strong>{isTeacher ? 'Maestra' : 'Alumno'}</strong> (Cambiar)</span>
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          {isTeacher ? 'Panel de la Maestra &bull; Otorgar Sellos QR' : 'Panel de Sellos QR &bull; Registro y Acreditación'}
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          {isTeacher
            ? 'Genera códigos QR dinámicos por sesión para acreditar la asistencia, desempeño y disciplina en tus materias de ingeniería.'
            : 'Escanea el código QR proyectado en clase por la Prof. Xochitl para acumular sellos en tu billetera digital institucional.'}
        </p>

        {/* Quick Nav Links */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-2xs font-['Quicksand'] uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ver Tienda de Recompensas</span>
          </Link>
          <Link
            href="/dinamica-de-clase"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-all font-['Quicksand'] uppercase tracking-wider"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver Reglamento y Documentos</span>
          </Link>
        </div>
      </div>

      {/* Main Content: Login Prompt or Respective Panel */}
      <section className="mb-14">
        {!user ? (
          /* Clean Institutional Login Card */
          <div className="bg-white border-2 border-[#E5E7EB] hover:border-slate-400 rounded-3xl p-8 sm:p-12 text-center shadow-sm max-w-2xl mx-auto transition-all">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <LogIn className="w-8 h-8 text-amber-600" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Acceso Institucional Exclusivo &bull; @my.uvm.edu.mx</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-['Quicksand'] text-[#1C1C1C] mb-2 tracking-tight">
              Inicia Sesión con tu Cuenta UVM
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-md mx-auto mb-6 leading-relaxed">
              El acceso a la plataforma de sellos y escáner está restringido a correos con terminación <strong className="text-slate-900 font-semibold">@my.uvm.edu.mx</strong>. Inicia sesión con tu cuenta Google institucional.
            </p>

            {authError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-300 rounded-2xl text-left text-xs text-rose-800 flex items-start gap-3">
                <div className="p-1.5 bg-rose-100 rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-rose-900 font-semibold">Restricción de Dominio</strong>
                  <span>{authError}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => signInWithGoogle()}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 rounded-xl font-black text-xs sm:text-sm font-['Quicksand'] uppercase tracking-wider transition-all shadow-sm border border-amber-500 cursor-pointer"
            >
              <LogIn className="w-4 h-4 stroke-[2.5]" />
              <span>Entrar con Google (@my.uvm.edu.mx)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        ) : isTeacher ? (
          <TeacherPanel compact />
        ) : (
          <StudentPanel />
        )}
      </section>
    </div>
  );
}
