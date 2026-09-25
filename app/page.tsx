import React from 'react';
import Link from 'next/link';
import { Calendar, Compass, ShieldCheck, ArrowRight, BookOpen, Download } from 'lucide-react';
import SubjectCard from '@/components/SubjectCard';
import { getSubjects } from '@/lib/firebase/db';

export default async function HomePage() {
  const subjects = await getSubjects();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#E5E7EB] py-14 sm:py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 mb-6">
            <span>Repositorio Docente Institucional de Ingeniería</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1C1C] mb-4 font-['Quicksand']">
            Portal Académico
          </h1>

          <p className="text-2xl sm:text-3xl text-slate-800 font-['Pacifico'] mt-2 mb-6">
            Xochitl M. Zapata M.
          </p>

          <p className="text-sm sm:text-base text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
            Plataforma centralizada para la consulta de programas analíticos, manuales de laboratorio, bitácoras experimentales y dinámicas pedagógicas.
          </p>
        </div>
      </section>

      {/* Bienvenida Section */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-slate-800" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] font-['Quicksand']">
              Bienvenida al Curso
            </h2>
          </div>

          <blockquote className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed italic border-l-2 border-slate-200 pl-4 py-1 my-3">
            &ldquo;Estimados estudiantes, este portal ha sido creado como un espacio de rigor académico, consulta continua y aprendizaje colaborativo para acompañar tu formación desde las bases fundamentales hasta la aplicación especializada. Aquí encontrarás las guías, recursos y herramientas necesarias para consolidar tu perfil como estudiante de ingeniería en mis asignaturas.&rdquo;
          </blockquote>

          <div className="mt-4 text-right text-xs font-semibold text-slate-700">
            — Prof. Xochitl M. Zapata M.
          </div>
        </div>
      </section>

      {/* Visual Blocks (Institutional Pillars): Calendario, Filosofía, Decálogo */}
      <section className="py-6 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] font-['Quicksand']">
            Pilares y Marco Institucional
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
            Información rectora del periodo lectivo y lineamientos de formación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendario del Periodo Escolar */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 flex flex-col justify-between hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg border border-slate-100">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand']">
                    Calendario Escolar
                  </h3>
                  <span className="text-[11px] text-[#4A4A4A] uppercase tracking-wider font-mono">
                    Periodo 2026-B
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4">
                Programación de semanas lectivas, cortes de evaluación parcial, recesos académicos y fechas límite de registro de evaluaciones.
              </p>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-xs space-y-1.5 text-slate-700 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">1er Parcial:</span>
                  <span>Semanas 05 - 06</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">2do Parcial:</span>
                  <span>Semanas 11 - 12</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Evaluación Ordinaria:</span>
                  <span>Semana 16</span>
                </div>
              </div>
            </div>

            <a
              href="/docs/institucional/calendario-escolar-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-[#1C1C1C] bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Descargar / Previsualizar Calendario</span>
            </a>
          </div>

          {/* Filosofía de la Institución */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 flex flex-col justify-between hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg border border-slate-100">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand']">
                    Filosofía Institucional
                  </h3>
                  <span className="text-[11px] text-[#4A4A4A] uppercase tracking-wider font-mono">
                    Misión y Valores
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#4A4A4A] leading-relaxed">
                <div>
                  <strong className="text-[#1C1C1C] block mb-0.5">Misión:</strong>
                  Formar profesionales íntegros de la ingeniería con pensamiento crítico, capacidad analítica y alto sentido de responsabilidad social.
                </div>
                <div>
                  <strong className="text-[#1C1C1C] block mb-0.5">Visión Docente:</strong>
                  Fomentar la excelencia experimental, la investigación aplicada y la sostenibilidad como eje directriz del diseño ingenieril.
                </div>
                <div>
                  <strong className="text-[#1C1C1C] block mb-0.5">Valores Clave:</strong>
                  Honestidad intelectual, rigor metodológico y trabajo solidario.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-[11px] text-slate-500 italic">
              Compromiso de calidad formativa y vocación científica.
            </div>
          </div>

          {/* Decálogo del Estudiante */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 flex flex-col justify-between hover:border-slate-400 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg border border-slate-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1C] font-['Quicksand']">
                    Decálogo del Estudiante
                  </h3>
                  <span className="text-[11px] text-[#4A4A4A] uppercase tracking-wider font-mono">
                    Código de Rigor
                  </span>
                </div>
              </div>

              <ol className="space-y-2 text-xs text-[#4A4A4A] list-decimal list-inside leading-relaxed">
                <li>Puntualidad en cátedra y laboratorios.</li>
                <li>Portación obligatoria de EPP y bitácora impresa.</li>
                <li>Honestidad académica: Cero tolerancia al plagio.</li>
                <li>Entrega de reportes en la fecha y formato oficial.</li>
                <li>Cuidado responsable de instrumentos y mesas.</li>
                <li>Participación argumentada y fundamentada.</li>
                <li>Actualización continua mediante lecturas clave.</li>
                <li>Respeto y colaboración entre pares.</li>
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Reglas de Convivencia</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono">100% Cúmplase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Asignaturas (Grid 4 col desktop, 2 col tablet, 1 col mobile) */}
      <section className="py-14 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono mb-1">
              Oferta Curricular
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] font-['Quicksand']">
              Asignaturas de Cátedra
            </h2>
          </div>
          <p className="text-xs text-[#4A4A4A] max-w-md">
            Selecciona un portal para acceder al syllabus, manuales de laboratorio, bitácoras y materiales específicos de cada materia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

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
