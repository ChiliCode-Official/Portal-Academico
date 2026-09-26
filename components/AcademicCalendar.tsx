'use client';

import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Download, Info } from 'lucide-react';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/lib/firebase/AuthContext';
import { useCourseContent } from './CourseContent';

type TeacherEvent = { id: string; title: string; date: string; color?: string };
type CalendarLegend = { id: string; label: string; color: string; icon?: string };

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
  color?: string;
  id?: string;
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

const LEGEND_ITEMS: CalendarLegend[] = [
  { id: 'start', label: 'Inicio de Clases', color: '#dc2626', icon: '▶' },
  { id: 'report1', label: 'Primer Reporte de Evaluación', color: '#dcf836', icon: '■' },
  { id: 'report2', label: 'Segundo Reporte de Evaluación', color: '#84cc16', icon: '■' },
  { id: 'report3', label: 'Tercer Reporte de Evaluación', color: '#10b981', icon: '■' },
  { id: 'final', label: 'Examen Final', color: '#818cf8', icon: '■' },
  { id: 'end', label: 'Fin de Clases', color: '#dc2626', icon: '◀' },
  { id: 'recovery', label: 'Exámenes de Recuperación', color: '#fde047', icon: '■' },
  { id: 'holiday', label: 'Suspensión de Labores', color: '#000000', icon: '■' },
  { id: 'winter', label: 'Vacaciones de Invierno', color: '#7c3aed', icon: '■' }
];
const monthKey = (year: number, month: number) => `${year}-${String(month).padStart(2, '0')}`;
const defaultMonths = [8, 9, 10, 11, 12].map(month => monthKey(2026, month)).concat('2027-01');
const textOnColor = (hex: string) => {
  const value = hex.replace('#', '');
  if (!/^[\da-f]{6}$/i.test(value)) return '#ffffff';
  const [red, green, blue] = [0, 2, 4].map(index => parseInt(value.slice(index, index + 2), 16));
  return (red * 0.299 + green * 0.587 + blue * 0.114) > 155 ? '#111827' : '#ffffff';
};

export default function AcademicCalendar({ editable = false }: { editable?: boolean }) {
  const { documents: catalogDocuments } = useCourseContent();
  const calendarDocument = catalogDocuments.find(item => item.id === 'institucional-calendario' && item.published);
  const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null);
  const { user, profile, isTeacher } = useAuth();
  const [teacherEvents, setTeacherEvents] = useState<TeacherEvent[]>([]);
  const [months, setMonths] = useState<string[]>(defaultMonths);
  const [legend, setLegend] = useState<CalendarLegend[]>([]);
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingColor, setEditingColor] = useState('#2563eb');
  const [editingLegendId, setEditingLegendId] = useState<string>('');
  const [calendarError, setCalendarError] = useState('');
  useEffect(() => {
    if (!user) return;
    return onSnapshot(collection(db, 'calendarEvents'), snapshot => setTeacherEvents(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as TeacherEvent))));
  }, [user]);
  useEffect(() => {
    if (!user) return;
    return onSnapshot(doc(db, 'calendarSettings', 'main'), snapshot => {
    const data = snapshot.data();
    if (Array.isArray(data?.months) && data.months.length) setMonths(data.months.filter((value: unknown): value is string => typeof value === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)).slice(0, 12));
    else if (Array.isArray(data?.visibleMonths)) setMonths(data.visibleMonths.filter((value: unknown): value is number => typeof value === 'number').map((index: number) => defaultMonths[index]).filter(Boolean));
    });
  }, [user]);
  useEffect(() => {
    if (!user) return;
    return onSnapshot(collection(db, 'calendarLegend'), snapshot => setLegend(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as CalendarLegend))));
  }, [user]);
  const combinedLegend = LEGEND_ITEMS.map(item => ({ ...item, ...(legend.find(saved => saved.id === item.id) || {}) }));
  const extraLegend = legend.filter(item => !LEGEND_ITEMS.some(base => base.id === item.id));
  const fullLegend = [...combinedLegend, ...extraLegend];
  const visibleTeacherEvents = [...teacherEvents].filter(item => months.includes(item.date.slice(0, 7))).sort((a, b) => a.date.localeCompare(b.date));
  const eventForDate = (key: string, day: number): DayEvent | undefined => {
    const date = `${key}-${String(day).padStart(2, '0')}`;
    const custom = teacherEvents.find(item => item.date === date);
    if (custom) return { id: custom.id, day, title: custom.title, type: 'start', color: fullLegend.find(item => item.label === custom.title)?.color || custom.color };
    const baseIndex = defaultMonths.indexOf(key);
    return baseIndex >= 0 ? MONTHS[baseIndex]?.events[day] : undefined;
  };
  const saveMonths = async (next: string[]) => { try { await setDoc(doc(db, 'calendarSettings', 'main'), { months: next }, { merge: true }); setCalendarError(''); } catch { setCalendarError('No se pudieron guardar los meses.'); } };

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
    <section className="py-6 sm:py-12 px-3 sm:px-8 max-w-7xl mx-auto">
      {/* Neobrutalist Window Container */}
      <div className="neobrutal-window bg-white">
        {/* Header */}
        <div className="neobrutal-head text-xs sm:text-sm py-2 px-3 sm:px-4">
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-bold truncate">Calendario institucional &bull; {months.length} meses</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 hidden sm:inline">OFICIAL</span>
            <div className="neobrutal-window-controls">
              <span className="neobrutal-dot bg-[#ff5f56]" />
              <span className="neobrutal-dot bg-[#ffbd2e]" />
              <span className="neobrutal-dot bg-[#27c93f]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-8">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-8 pb-3 sm:pb-4 border-b-2 border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-['Quicksand'] text-slate-900 tracking-tight">
                Calendario Académico Institucional
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Fechas oficiales de inicio, cortes de evaluación, recesos académicos y exámenes
              </p>
            </div>

            {calendarDocument && (calendarDocument.updatedAt || months.join(',') === defaultMonths.join(',')) && <a
              href={calendarDocument.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </a>}
          </div>

          {editable && <p className="mb-4 text-sm text-slate-700">Pulsa el nombre de un mes para cambiarlo. Pulsa un día para asignar un evento.</p>}
          {calendarError && <p role="alert" className="mb-3 text-sm font-semibold text-red-700">{calendarError}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-4">
            {months.map((key, monthIndex) => {
              const [year, monthNumber] = key.split('-').map(Number);
              const monthName = new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(new Date(year, monthNumber - 1, 1));
              const firstDayOfWeek = (new Date(year, monthNumber - 1, 1).getDay() + 6) % 7;
              const daysInMonth = new Date(year, monthNumber, 0).getDate();
              const days = [];
              // Empty cells before start of month
              for (let i = 0; i < firstDayOfWeek; i++) {
                days.push(<div key={`empty-${i}`} className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />);
              }
              // Month days
              for (let d = 1; d <= daysInMonth; d++) {
                const event = eventForDate(key, d);
                const dayClass = getDayStyle(event);
                const color = event?.color || fullLegend.find(item => item.id === event?.type)?.color;
                const dayStyle = color ? { backgroundColor: color, color: textOnColor(color) } : undefined;
                const eventDate = `${key}-${String(d).padStart(2, '0')}`;
                days.push(
                  <button
                    key={`day-${d}`}
                    onClick={() => { if (editable) { setEditingDate(eventDate); setEditingTitle(event?.title || ''); setEditingColor(color || '#2563eb'); setEditingLegendId(fullLegend.find(item => item.label === event?.title)?.id || ''); } else if (event) setSelectedEvent(event); }}
                    title={event ? `${d} ${monthName}: ${event.title}` : `${d} ${monthName}`}
                    style={dayStyle}
                    className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex items-center justify-center text-[10px] sm:text-xs font-semibold rounded transition-all select-none active:scale-90 ${dayClass} ${editable ? 'ring-1 ring-transparent hover:ring-amber-400' : ''}`}
                  >
                    {d}
                  </button>
                );
              }

              return (
                <div
                  key={`${key}-${monthIndex}`}
                  className="bg-white border-2 border-slate-900 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Month Red Title Header */}
                  <div className="relative bg-[#b91c1c] text-white text-center py-2 px-1">
                    {editable ? <input type="month" aria-label={`Cambiar ${monthName} ${year}`} value={key} onChange={event => { const next = [...months]; next[monthIndex] = event.target.value; setMonths(next); void saveMonths(next); }} className="w-full cursor-pointer bg-transparent text-center text-xs font-black uppercase tracking-wider font-mono text-white [color-scheme:dark]" /> : <h3 className="text-xs font-black uppercase tracking-wider font-mono">{monthName} {year !== 2026 ? year : ''}</h3>}
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
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1 p-1.5 sm:p-2 justify-items-center">
                    {days}
                  </div>
                  {editable && months.length > 1 && <button type="button" onClick={() => { const next = months.filter((_, index) => index !== monthIndex); setMonths(next); void saveMonths(next); }} className="mb-2 ml-2 text-[10px] font-semibold text-red-700 underline">Quitar mes</button>}
                </div>
              );
            })}
          </div>
          {editable && months.length < 12 && <button type="button" onClick={() => { const last = months.at(-1) || defaultMonths[0]; const [year, month] = last.split('-').map(Number); const next = [...months, monthKey(year + (month === 12 ? 1 : 0), month === 12 ? 1 : month + 1)]; setMonths(next); void saveMonths(next); }} className="mt-4 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50">+ Agregar mes</button>}

          {editable && editingDate && <form className="mt-6 grid gap-3 rounded-xl border-2 border-amber-300 bg-amber-50 p-4 sm:grid-cols-[1fr_auto_auto_auto]" onSubmit={async event => { event.preventDefault(); if (!editingTitle.trim()) return; const id = teacherEvents.find(item => item.date === editingDate)?.id || crypto.randomUUID(); try { await setDoc(doc(db, 'calendarEvents', id), { id, title: editingTitle.trim(), date: editingDate, color: editingColor }); if (!editingLegendId) { const legendId = crypto.randomUUID(); await setDoc(doc(db, 'calendarLegend', legendId), { id: legendId, label: editingTitle.trim(), color: editingColor }); } setEditingDate(null); setCalendarError(''); } catch { setCalendarError('No se pudo guardar el evento.'); } }}>
            <label className="text-sm font-semibold text-amber-950">{editingDate}<select value={editingLegendId} onChange={event => { const item = fullLegend.find(legendItem => legendItem.id === event.target.value); setEditingLegendId(event.target.value); if (item) { setEditingTitle(item.label); setEditingColor(item.color); } else setEditingTitle(''); }} className="mt-1 w-full rounded-lg border border-amber-300 bg-white p-2 font-normal"><option value="">Nuevo evento…</option>{fullLegend.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select><input required value={editingTitle} onChange={event => setEditingTitle(event.target.value)} placeholder="Nombre del evento" className="mt-2 w-full rounded-lg border border-amber-300 bg-white p-2 font-normal" /></label>
            <label className="text-sm font-semibold text-amber-950">Color<input type="color" value={editingColor} onChange={event => setEditingColor(event.target.value)} className="mt-1 block h-10 w-16 rounded border bg-white p-1" /></label>
            <button className="self-end rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white">Guardar</button>
            <button type="button" onClick={async () => { const item = teacherEvents.find(event => event.date === editingDate); try { if (item) await deleteDoc(doc(db, 'calendarEvents', item.id)); setEditingDate(null); setCalendarError(''); } catch { setCalendarError('No se pudo eliminar el evento.'); } }} className="self-end rounded-lg border border-rose-300 px-4 py-2 text-sm font-bold text-rose-700">Eliminar</button>
          </form>}
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
              {fullLegend.map(item => (
                <div key={item.id} className="flex items-center gap-2 text-xs text-slate-800">
                  {editable ? <input type="color" aria-label={`Color de ${item.label}`} value={item.color} onChange={event => { void setDoc(doc(db, 'calendarLegend', item.id), { id: item.id, label: item.label, color: event.target.value }, { merge: true }).catch(() => setCalendarError('No se pudo editar el color.')); }} className="h-6 w-7 cursor-pointer rounded border p-0" /> : <span
                    className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px] font-bold border border-black/20"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </span>}
                  <span className="font-medium text-[11px]">{item.label}</span>
                  {editable && <button type="button" aria-label={`Editar ${item.label}`} onClick={() => { const name = window.prompt('Nombre del evento', item.label)?.trim(); if (name) void setDoc(doc(db, 'calendarLegend', item.id), { id: item.id, label: name, color: item.color }, { merge: true }).catch(() => setCalendarError('No se pudo editar la leyenda.')); }} className="text-[10px] underline text-slate-600">Editar</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
