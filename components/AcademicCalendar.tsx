'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Download, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface DayEvent {
  day: number;
  type:
    | 'start'
    | 'report1'
    | 'report2'
    | 'report3'
    | 'final'
    | 'end'
    | 'recovery'
    | 'holiday'
    | 'winter';
  title: string;
}

interface MonthData {
  name: string;
  year: number;
  startWeekIndex?: number;
  firstDayOfWeek: number; // 0 = Lunes, 6 = Domingo
  daysInMonth: number;
  events: Record<number, DayEvent>;
}

const MONTHS: MonthData[] = [
  {
    name: 'Agosto',
    year: 2026,
    firstDayOfWeek: 5, // 1 de Agosto es Sábado
    daysInMonth: 31,
    events: {
      17: { day: 17, type: 'start', title: 'Inicio de Clases' }
    }
  },
  {
    name: 'Septiembre',
    year: 2026,
    firstDayOfWeek: 1, // 1 de Septiembre es Martes
    daysInMonth: 30,
    events: {
      16: { day: 16, type: 'holiday', title: 'Suspensión de Labores (Independencia)' },
      28: { day: 28, type: 'report1', title: 'Primer Reporte de Evaluación' },
      29: { day: 29, type: 'report1', title: 'Primer Reporte de Evaluación' },
      30: { day: 30, type: 'report1', title: 'Primer Reporte de Evaluación' }
    }
  },
  {
    name: 'Octubre',
    year: 2026,
    firstDayOfWeek: 3, // Jueves
    daysInMonth: 31,
    events: {
      1: { day: 1, type: 'report1', title: 'Primer Reporte de Evaluación' },
      2: { day: 2, type: 'report1', title: 'Primer Reporte de Evaluación' }
    }
  },
  {
    name: 'Noviembre',
    year: 2026,
    firstDayOfWeek: 6, // Domingo
    daysInMonth: 30,
    events: {
      2: { day: 2, type: 'holiday', title: 'Suspensión de Labores (Día de Muertos)' },
      9: { day: 9, type: 'report2', title: 'Segundo Reporte de Evaluación' },
      10: { day: 10, type: 'report2', title: 'Segundo Reporte de Evaluación' },
      11: { day: 11, type: 'report2', title: 'Segundo Reporte de Evaluación' },
      12: { day: 12, type: 'report2', title: 'Segundo Reporte de Evaluación' },
      13: { day: 13, type: 'report2', title: 'Segundo Reporte de Evaluación' },
      16: { day: 16, type: 'holiday', title: 'Suspensión de Labores (Revolución Mexicana)' }
    }
  },
  {
    name: 'Diciembre',
    year: 2026,
    firstDayOfWeek: 1, // Martes
    daysInMonth: 31,
    events: {
      21: { day: 21, type: 'winter', title: 'Vacaciones de Invierno' },
      22: { day: 22, type: 'winter', title: 'Vacaciones de Invierno' },
      23: { day: 23, type: 'winter', title: 'Vacaciones de Invierno' },
      24: { day: 24, type: 'winter', title: 'Vacaciones de Invierno' },
      25: { day: 25, type: 'holiday', title: 'Suspensión de Labores (Navidad)' },
      26: { day: 26, type: 'winter', title: 'Vacaciones de Invierno' },
      27: { day: 27, type: 'winter', title: 'Vacaciones de Invierno' },
      28: { day: 28, type: 'winter', title: 'Vacaciones de Invierno' },
      29: { day: 29, type: 'winter', title: 'Vacaciones de Invierno' },
      30: { day: 30, type: 'winter', title: 'Vacaciones de Invierno' },
      31: { day: 31, type: 'winter', title: 'Vacaciones de Invierno' }
    }
  },
  {
    name: 'Enero',
    year: 2027,
    firstDayOfWeek: 4, // Viernes
    daysInMonth: 31,
    events: {
      1: { day: 1, type: 'holiday', title: 'Suspensión de Labores (Año Nuevo)' },
      2: { day: 2, type: 'winter', title: 'Vacaciones de Invierno' },
      3: { day: 3, type: 'winter', title: 'Vacaciones de Invierno' },
      4: { day: 4, type: 'report3', title: 'Tercer Reporte de Evaluación' },
      5: { day: 5, type: 'report3', title: 'Tercer Reporte de Evaluación' },
      6: { day: 6, type: 'report3', title: 'Tercer Reporte de Evaluación' },
      7: { day: 7, type: 'report3', title: 'Tercer Reporte de Evaluación' },
      8: { day: 8, type: 'report3', title: 'Tercer Reporte de Evaluación' },
      11: { day: 11, type: 'final', title: 'Examen Final' },
      12: { day: 12, type: 'final', title: 'Examen Final' },
      13: { day: 13, type: 'final', title: 'Examen Final' },
      14: { day: 14, type: 'final', title: 'Examen Final' },
      15: { day: 15, type: 'final', title: 'Examen Final' },
      16: { day: 16, type: 'end', title: 'Fin de Clases' },
      25: { day: 25, type: 'recovery', title: 'Exámenes de Recuperación' },
      26: { day: 26, type: 'recovery', title: 'Exámenes de Recuperación' },
      27: { day: 27, type: 'recovery', title: 'Exámenes de Recuperación' },
      28: { day: 28, type: 'recovery', title: 'Exámenes de Recuperación' },
      29: { day: 29, type: 'recovery', title: 'Exámenes de Recuperación' }
    }
  }
];

const LEGEND_ITEMS = [
  { label: 'Inicio de Clases', color: 'bg-red-600', icon: '▶' },
  { label: 'Primer Reporte de Evaluación', color: 'bg-[#dcf836] text-black', icon: '■' },
  { label: 'Segundo Reporte de Evaluación', color: 'bg-[#84cc16] text-black', icon: '■' },
  { label: 'Tercer Reporte de Evaluación', color: 'bg-[#10b981] text-white', icon: '■' },
  { label: 'Examen Final', color: 'bg-[#818cf8] text-white', icon: '■' },
  { label: 'Fin de Clases', color: 'bg-red-600 text-white', icon: '◀' },
  { label: 'Exámenes de Recuperación', color: 'bg-[#fde047] text-black', icon: '■' },
  { label: 'Suspensión de Labores', color: 'bg-black text-white', icon: '■' },
  { label: 'Vacaciones de Invierno', color: 'bg-[#7c3aed] text-white', icon: '■' }
];

export default function AcademicCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null);

  const getDayStyle = (event?: DayEvent) => {
    if (!event) return 'text-slate-700 hover:bg-slate-100';

    switch (event.type) {
      case 'start':
        return 'bg-red-600 text-white font-bold relative overflow-hidden shadow-xs';
      case 'end':
        return 'bg-red-600 text-white font-bold relative overflow-hidden shadow-xs';
      case 'report1':
        return 'bg-[#dcf836] text-black font-semibold';
      case 'report2':
        return 'bg-[#84cc16] text-black font-semibold';
      case 'report3':
        return 'bg-[#10b981] text-white font-semibold';
      case 'final':
        return 'bg-[#818cf8] text-white font-semibold';
      case 'recovery':
        return 'bg-[#fde047] text-black font-semibold';
      case 'holiday':
        return 'bg-black text-white font-bold';
      case 'winter':
        return 'bg-[#7c3aed] text-white font-medium';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Neobrutalist Window Container */}
      <div className="neobrutal-window bg-white">
        {/* Header */}
        <div className="neobrutal-head">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-red-600" />
            <span className="font-bold">Periodo Escolar 2/2026 | 20 Semanas Lectivas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">OFICIAL</span>
            <div className="neobrutal-window-controls">
              <span className="neobrutal-dot bg-[#ff5f56]" />
              <span className="neobrutal-dot bg-[#ffbd2e]" />
              <span className="neobrutal-dot bg-[#27c93f]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-slate-200">
            <div>
              <h2 className="text-2xl font-black font-['Quicksand'] text-slate-900 tracking-tight">
                Calendario Académico Institucional
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Fechas oficiales de inicio, cortes de evaluación, recesos académicos y exámenes
              </p>
            </div>

            <a
              href="/docs/institucional/calendario-escolar-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </a>
          </div>

          {/* 6 Months Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {MONTHS.map((month) => {
              const days = [];
              // Empty cells before start of month
              for (let i = 0; i < month.firstDayOfWeek; i++) {
                days.push(<div key={`empty-${i}`} className="h-7 w-7" />);
              }
              // Month days
              for (let d = 1; d <= month.daysInMonth; d++) {
                const event = month.events[d];
                const dayClass = getDayStyle(event);
                days.push(
                  <button
                    key={`day-${d}`}
                    onClick={() => event && setSelectedEvent(event)}
                    title={event ? `${d} ${month.name}: ${event.title}` : `${d} ${month.name}`}
                    className={`h-7 w-7 flex items-center justify-center text-[11px] rounded transition-all select-none ${dayClass}`}
                  >
                    {d}
                  </button>
                );
              }

              return (
                <div
                  key={month.name}
                  className="bg-white border-2 border-slate-900 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Month Red Title Header */}
                  <div className="bg-[#b91c1c] text-white text-center py-2 px-1">
                    <h3 className="text-xs font-black uppercase tracking-wider font-mono">
                      {month.name} {month.year === 2027 ? '2027' : ''}
                    </h3>
                  </div>

                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 text-center bg-[#ef4444] text-white text-[10px] font-bold py-1">
                    <span>L</span>
                    <span>M</span>
                    <span>M</span>
                    <span>J</span>
                    <span>V</span>
                    <span>S</span>
                    <span>D</span>
                  </div>

                  {/* Calendar Grid Days */}
                  <div className="grid grid-cols-7 gap-1 p-2 justify-items-center">
                    {days}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Event Detail Toast (if clicked) */}
          {selectedEvent && (
            <div className="mt-6 p-3 bg-blue-50 border-2 border-blue-300 rounded-lg flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Día {selectedEvent.day}:</strong> {selectedEvent.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[11px] font-bold text-blue-700 hover:underline ml-4"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Legend Grid */}
          <div className="mt-8 pt-6 border-t-2 border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
              Nomenclatura y Código de Colores
            </h4>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {LEGEND_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-800">
                  <span
                    className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px] font-bold border border-black/20 ${item.color}`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium text-[11px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
