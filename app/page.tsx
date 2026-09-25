import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShoppingBag, Sparkles } from 'lucide-react';
import TechText from '@/components/TechText';
import StrokeText from '@/components/StrokeText';
import PencilBadge from '@/components/PencilBadge';
import QuickSubjectsBar from '@/components/QuickSubjectsBar';
import SplitText from '@/components/SplitText';
import AcademicCalendar from '@/components/AcademicCalendar';
import CartLoader from '@/components/CartLoader';
import '@/components/NeobrutalWindow.css';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden border-b border-[#E5E7EB] py-14 sm:py-20 px-4 sm:px-8">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-20"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        {/* Soft backdrop blur / white overlay to ensure perfect text contrast */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] -z-10" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <PencilBadge text="Repositorio Docente Institucional de Ingeniería" />
          </div>

          <div className="w-full h-40 sm:h-52 md:h-64 relative mb-4">
            <TechText
              text="Portal Académico"
              fontWeight={700}
              fontSize={120}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              color="#1C1C1C"
              accentColor="#2563EB"
            />
          </div>

          {/* Profesora animada con StrokeText y colores de Google (contorno y relleno coincidentes) */}
          <div className="w-full max-w-xl mx-auto my-2">
            <StrokeText
              text="Xochitl M. Zapata M."
              strokeColors={['#4285F4', '#EA4335', '#FBBC05', '#34A853']}
              fillColors={['#4285F4', '#EA4335', '#FBBC05', '#34A853']}
              strokeWidth={1.6}
              drawDuration={1.4}
              fillDelay={0.2}
              stagger={0.04}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={44}
              fontWeight={700}
              letterSpacing={1}
              delay={1.5}
            />
          </div>

          {/* Subtítulo / Descripción: totalmente legible y optimizada para teléfonos y desktop */}
          <div className="w-full max-w-2xl mx-auto mt-4 mb-2 px-2">
            <p className="text-sm sm:text-base md:text-lg text-slate-800 font-medium leading-relaxed sm:leading-normal text-balance antialiased animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
              Plataforma centralizada para la consulta de programas analíticos, manuales de laboratorio, bitácoras experimentales y dinámicas pedagógicas.
            </p>
          </div>
        </div>
      </section>

      {/* Acceso Rápido a Portales por Materia con Animaciones */}
      <QuickSubjectsBar />

      {/* Bienvenida Section - Neobrutalist Window Card */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="neobrutal-window">
          {/* Window Header */}
          <div className="neobrutal-head">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Mensaje Rector &bull; Bienvenida al Curso</span>
            </div>
            <div className="neobrutal-window-controls">
              <span className="neobrutal-dot bg-[#ff5f56]" />
              <span className="neobrutal-dot bg-[#ffbd2e]" />
              <span className="neobrutal-dot bg-[#27c93f]" />
            </div>
          </div>

          {/* Window Content */}
          <div className="neobrutal-content">
            <div className="mb-4">
              <SplitText
                text="Bienvenida al Curso"
                className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] font-['Quicksand']"
                delay={60}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="left"
                tag="h2"
              />
            </div>

            <blockquote className="text-sm sm:text-base text-[#1c1c1c] leading-relaxed italic border-l-4 border-black pl-4 py-1 my-3 bg-white/70 p-3 rounded-sm">
              &ldquo;Estimados estudiantes, este portal ha sido creado como un espacio de rigor académico, consulta continua y aprendizaje colaborativo para acompañar tu formación desde las bases fundamentales hasta la aplicación especializada. Aquí encontrarás las guías, recursos y herramientas necesarias para consolidar tu perfil como estudiante de ingeniería en mis asignaturas.&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t-2 border-black/20">
              <Link
                href="/dinamica-de-clase"
                className="neobrutal-button"
              >
                <span>Conoce la Dinámica del Curso</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-right text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                — Prof. Xochitl M. Zapata M.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendario Académico Institucional */}
      <AcademicCalendar />

      {/* Tienda de la Maestra - Tienda de Habilidades y Sellos Quick Access */}
      <section className="py-8 px-4 sm:px-8 max-w-5xl mx-auto mb-12">
        <div className="neobrutal-window bg-[#fffdfa] border-3 border-black shadow-[8px_8px_0_#000000] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[12px_12px_0_#000000]">
          {/* Header Bar */}
          <div className="bg-[#fbbf24] px-4 sm:px-6 py-3 border-b-3 border-black flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black text-amber-300 font-black text-xs">
                ★
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-black uppercase tracking-wider font-['Quicksand']">
                Dinámica de Clase &bull; Sellos Formativos
              </span>
            </div>
            <div className="neobrutal-window-controls hidden sm:flex">
              <span className="neobrutal-dot bg-[#ff5f56]" />
              <span className="neobrutal-dot bg-[#ffbd2e]" />
              <span className="neobrutal-dot bg-[#27c93f]" />
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Description & CTAs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-black text-amber-300 border-2 border-black font-mono shadow-[2px_2px_0_#fbbf24]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Tienda de la Maestra
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                    Canje por Sellos QR
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black font-['Quicksand'] tracking-tight leading-tight">
                    Tienda de Habilidades y Recompensas
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    ¡Aprovecha tus sellos acumulados en clase! Canjea prórrogas en tareas, comodines para exámenes, décimas directas en evaluación continua y pases de laboratorio con la <strong className="text-black font-bold">Prof. Xochitl</strong>.
                  </p>
                </div>

                {/* Perk tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-white text-slate-800 rounded-md border-2 border-black shadow-[2px_2px_0_#000]">
                    ⏰ Prórrogas de Tarea
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-white text-slate-800 rounded-md border-2 border-black shadow-[2px_2px_0_#000]">
                    🃏 Comodines de Examen
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-white text-slate-800 rounded-md border-2 border-black shadow-[2px_2px_0_#000]">
                    ✨ Décimas Extra
                  </span>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/tienda"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:translate-x-0.5 active:translate-y-0.5 border-3 border-black shadow-[4px_4px_0_#000000] rounded-xl transition-all font-['Quicksand'] uppercase tracking-wider cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    <span>Entrar a la Tienda</span>
                    <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
                  </Link>
                  <Link
                    href="/dinamica-de-clase"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-slate-800 hover:text-black bg-white hover:bg-slate-100 active:translate-x-0.5 active:translate-y-0.5 border-2 border-black shadow-[3px_3px_0_#000000] rounded-xl transition-all font-['Quicksand'] uppercase tracking-wider"
                  >
                    <span>Ver Lineamientos</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Interactive Cart Animation Card */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <Link
                  href="/tienda"
                  className="w-full max-w-xs bg-slate-950 hover:bg-slate-900 border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0_#000000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#000000] flex flex-col items-center justify-center group cursor-pointer"
                  title="Haz clic para explorar los artículos de la tienda"
                >
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 mb-3">
                    Catálogo Activo &bull; Toca para abrir
                  </div>
                  <div className="py-2">
                    <CartLoader text="Abrir Tienda" textColor="#FBBF24" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
