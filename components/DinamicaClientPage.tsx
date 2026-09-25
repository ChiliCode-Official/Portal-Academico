'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import TeacherPanel from '@/components/TeacherPanel';
import StudentPanel from '@/components/StudentPanel';
import TeacherShop from '@/components/TeacherShop';
import DocumentCard from '@/components/DocumentCard';
import { DocumentItem } from '@/lib/types';
import {
  Award,
  Sparkles,
  ShoppingBag,
  Info,
  CheckCircle,
  LogIn,
  ShieldCheck,
  UserCheck,
  QrCode,
  ArrowRight,
  Layers
} from 'lucide-react';

interface DinamicaClientPageProps {
  documents: DocumentItem[];
}

export default function DinamicaClientPage({ documents }: DinamicaClientPageProps) {
  const { user, profile, isTeacher, signInWithGoogle, toggleDevRole, authError } = useAuth();
  const [activeTab, setActiveTab] = useState<'hub' | 'shop' | 'docs'>('hub');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Title & Introduction */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200">
            <Award className="w-3.5 h-3.5 text-slate-800" />
            <span>Dinámica Pedagógica & Sistema de Sellos Formativos</span>
          </div>

          {/* Quick role switcher / test helper */}
          {user && (
            <button
              onClick={() => toggleDevRole()}
              className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5"
              title="Cambia entre la vista de la Maestra y la del Alumno"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Modo actual: <strong>{isTeacher ? 'Maestra' : 'Alumno'}</strong> (Cambiar)</span>
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] font-['Quicksand'] tracking-tight">
          Dinámica de Clase &bull; Sellos QR y Tienda de Habilidades
        </h1>
        <p className="mt-2 text-sm text-[#4A4A4A] max-w-3xl leading-relaxed">
          Sistema formativo de acreditación con sellos digitales. La maestra genera códigos QR por sesión para sus distintas materias; los alumnos inician sesión con su cuenta Google para escanear y abonar sellos a su perfil y canjearlos en la tienda de la cátedra.
        </p>
      </div>

      {/* Tabs / Subnavigation: QR Hub, Tienda, Documentos */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab('hub')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-['Quicksand'] transition-all ${
            activeTab === 'hub'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <QrCode className="w-4 h-4 text-amber-400" />
          <span>{isTeacher ? 'Panel de la Maestra (Otorgar QR)' : 'Panel del Alumno (Escanear)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-['Quicksand'] transition-all ${
            activeTab === 'shop'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Tienda de la Maestra</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-['Quicksand'] transition-all ${
            activeTab === 'docs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Reglamento y Documentos ({documents.length})</span>
        </button>
      </div>

      {/* Content depending on selected tab */}
      {activeTab === 'hub' && (
        <section className="mb-14 space-y-8 animate-in fade-in duration-150">
          {!user ? (
            /* Clean Institutional Login Card matching portal UX */
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
                El acceso a la plataforma de sellos y dinámicas está restringido a correos con terminación <strong className="text-slate-900 font-semibold">@my.uvm.edu.mx</strong>. Inicia sesión con tu cuenta Google institucional para continuar.
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
            /* Teacher Panel */
            <TeacherPanel />
          ) : (
            /* Student Panel */
            <StudentPanel onGoToShop={() => setActiveTab('shop')} />
          )}
        </section>
      )}

      {activeTab === 'shop' && (
        <section id="tienda-de-la-maestra" className="mb-14 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-amber-400 text-slate-950 rounded-2xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Quicksand']">
                  Tienda de la Maestra &bull; Catálogo de Sellos
                </h2>
                <p className="text-xs text-slate-500">
                  Canjea tus sellos acumulados por beneficios académicos oficiales
                </p>
              </div>
            </div>
          </div>

          <TeacherShop />
        </section>
      )}

      {activeTab === 'docs' && (
        <section className="mb-14 animate-in fade-in duration-150 space-y-8">
          {/* Information Banner */}
          <div className="bg-slate-50 border border-[#E5E7EB] rounded-2xl p-5 flex items-start gap-4">
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

          {/* Three DocumentCards */}
          <div>
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
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
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
        </section>
      )}
    </div>
  );
}
