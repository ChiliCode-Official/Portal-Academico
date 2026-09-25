import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import TechText from '@/components/TechText';
import StrokeText from '@/components/StrokeText';
import PencilBadge from '@/components/PencilBadge';
import QuickSubjectsBar from '@/components/QuickSubjectsBar';
import SplitText from '@/components/SplitText';
import AcademicCalendar from '@/components/AcademicCalendar';
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

          {/* Subtítulo / Descripción animada con StrokeText: contorno negro y texto negro */}
          <div className="w-full max-w-3xl mx-auto mt-3 mb-2">
            <StrokeText
              text="Plataforma centralizada para la consulta de programas analíticos, manuales de laboratorio, bitácoras experimentales y dinámicas pedagógicas."
              strokeColor="#000000"
              fillColor="#000000"
              strokeWidth={1}
              drawDuration={2.0}
              fillDelay={0.3}
              stagger={0.015}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={18}
              fontWeight={500}
              letterSpacing={-0.2}
              delay={2.6}
            />
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

      {/* Dinámica de Clase Quick Access Banner */}
      <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto mb-12">
        <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Evaluación Continua y Participación
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Quicksand']">
              Dinámica de Clase: Tienda de Habilidades y Sellos
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consulta los lineamientos sobre canje de puntos de participación, sistema de sellos formativos y lineamientos complementarios de dinámica grupal.
            </p>
          </div>
          <Link
            href="/dinamica-de-clase"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors font-['Quicksand'] uppercase tracking-wider"
          >
            <span>Ver Dinámica</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
