'use client';

import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { AcademicClass, StampType, UserProfile } from '@/lib/firebase/models';
import { defaultStampTypes } from '@/lib/firebase/initialData';
import { useAuth } from '@/lib/firebase/AuthContext';
import ShopProductEditor from './ShopProductEditor';
import { ShopProduct, readShopProduct, mergeShopCategories } from '@/lib/shop';
import ClassEditor from './ClassEditor';
import DocumentAdminPanel from './DocumentAdminPanel';
import CourseAdminPanel from './CourseAdminPanel';

type CalendarEvent = { id: string; title: string; date: string; classId: string; color?: string };
type ShopCategory = { id: string; label: string; active: boolean };
type CalendarLegend = { id: string; label: string; color: string };
const defaultCalendarLegend: CalendarLegend[] = [
  { id: 'inicio', label: 'Inicio de clases', color: '#ef4444' },
  { id: 'evaluacion', label: 'Evaluación', color: '#bef264' },
  { id: 'suspension', label: 'Suspensión de labores', color: '#111827' },
  { id: 'vacaciones', label: 'Vacaciones', color: '#7c3aed' },
];

export default function TeacherAdministration() {
  const { isTeacher } = useAuth();
  const [classes, setClasses] = useState<AcademicClass[]>([]);
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [categories, setCategories] = useState<ShopCategory[]>([
    { id: 'examen', label: 'Exámenes', active: true }, { id: 'tarea', label: 'Tareas', active: true },
    { id: 'laboratorio', label: 'Laboratorio', active: true }, { id: 'participacion', label: 'Puntos', active: true }, { id: 'comodin', label: 'Especiales', active: true },
  ]);
  const [stampTypes, setStampTypes] = useState<StampType[]>(defaultStampTypes);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [classId, setClassId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventMonth, setEventMonth] = useState('2026-08');
  const [eventColor, setEventColor] = useState('#2563eb');
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [classSchedule, setClassSchedule] = useState('');
  const [message, setMessage] = useState('');
  const monthNames = ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero 2027'];
  const [visibleMonths, setVisibleMonths] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [legend, setLegend] = useState<CalendarLegend[]>(defaultCalendarLegend);

  useEffect(() => {
    if (!isTeacher) return;
    const subscriptions = [
      onSnapshot(collection(db, 'classes'), snap => { const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as AcademicClass)); setClasses(list); setClassId(current => current || list[0]?.id || ''); }, () => setMessage('No se pudieron cargar las clases.')),
      onSnapshot(collection(db, 'users'), snap => setStudents(snap.docs.map(d => d.data() as UserProfile).filter(p => p.role === 'student')), () => setMessage('No se pudieron cargar los alumnos.')),
      onSnapshot(collection(db, 'calendarEvents'), snap => setEvents(snap.docs.map(d => ({ ...d.data(), id: d.id } as CalendarEvent))), () => setMessage('No se pudo cargar el calendario institucional.')),
      onSnapshot(collection(db, 'shopItems'), snap => setProducts(snap.docs.map(d => readShopProduct(d.id, d.data()))), () => setMessage('No se pudieron cargar los productos.')),
      onSnapshot(collection(db, 'shopCategories'), snap => { if (!snap.empty) setCategories(snap.docs.map(d => ({ ...d.data(), id: d.id } as ShopCategory))); else void Promise.all(categories.map(item => setDoc(doc(db, 'shopCategories', item.id), item))); }, () => setMessage('No se pudieron cargar las categorías.')),
      onSnapshot(collection(db, 'shopSettings'), snap => setOpen(Object.fromEntries(snap.docs.map(d => [d.id, Boolean(d.data().open)]))), () => setMessage('No se pudo consultar la apertura de tiendas.')),
      onSnapshot(collection(db, 'stampTypes'), snap => { if (!snap.empty) setStampTypes(snap.docs.map(d => ({ ...d.data(), id: d.id } as StampType))); else void Promise.all(defaultStampTypes.map(stamp => setDoc(doc(db, 'stampTypes', stamp.id), stamp))); }, () => setMessage('No se pudieron cargar los tipos de sello.')),
    ];
    return () => subscriptions.forEach(unsubscribe => unsubscribe());
  }, [isTeacher]);

  if (!isTeacher) return null;
  const save = async (action: () => Promise<void>) => { try { await action(); setMessage('Cambios guardados.'); } catch { setMessage('No se pudieron guardar los cambios.'); } };
  const pendingStudents = students.filter(student => student.role === 'student' && (student.enrollmentStatus === 'pending' || (!student.enrollmentStatus && (student.requestedClassIds?.length || 0) > 0)));
  const enrolledStudents = students.filter(student => student.role === 'student' && !pendingStudents.some(pending => pending.uid === student.uid));

  return <section className="space-y-4">
    <h2 className="sr-only">Administración de clases</h2>
    <div className="space-y-4"><CourseAdminPanel /><DocumentAdminPanel /></div>
    {message && <p role="status" className="text-sm text-slate-700">{message}</p>}
    <details className="rounded-xl border border-slate-200 p-4" open>
      <summary className="cursor-pointer font-bold">Grupos y apertura de tienda</summary>
    <form onSubmit={event => { event.preventDefault(); const id = crypto.randomUUID(); void save(() => setDoc(doc(db, 'classes', id), { id, name: className.trim(), code: classCode.trim().toUpperCase(), group: classGroup.trim(), schedule: classSchedule.trim(), classroom: '', teacherEmail: 'xochitl_zapatam@my.uvm.edu.mx', active: true })); setClassName(''); setClassCode(''); setClassGroup(''); setClassSchedule(''); }} className="my-4 grid gap-2 sm:grid-cols-2">
      <input required value={className} onChange={event => setClassName(event.target.value)} placeholder="Nombre de la clase" className="rounded-lg border p-2" />
      <input required value={classCode} onChange={event => setClassCode(event.target.value)} placeholder="Clave" className="rounded-lg border p-2" />
      <input required value={classGroup} onChange={event => setClassGroup(event.target.value)} placeholder="Grupo" className="rounded-lg border p-2" />
      <input required value={classSchedule} onChange={event => setClassSchedule(event.target.value)} placeholder="Horario" className="rounded-lg border p-2" />
      <button className="rounded-lg bg-slate-900 px-4 py-2 text-white sm:col-span-2">Agregar clase</button>
    </form>
    <div className="grid gap-4 md:grid-cols-2">{classes.map(item => <ClassEditor key={item.id} item={item} open={Boolean(open[item.id])} onSave={setMessage} />)}</div>
    </details>
    <details className="rounded-xl border border-slate-200 p-4">
      <summary className="cursor-pointer font-bold">Inscripciones de alumnos {pendingStudents.length > 0 && <span className="ml-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs">{pendingStudents.length} pendientes</span>}</summary>
      <div className="pt-4">
      <h3 className="text-lg font-bold">Solicitudes pendientes</h3>
      <p className="text-sm text-slate-600">Estas son las solicitudes enviadas desde el registro. Usa “Aprobar” para asignar las clases solicitadas.</p>
      <div className="mt-4 space-y-3">{pendingStudents.length === 0 && <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No hay solicitudes pendientes.</p>}{pendingStudents.map(student => <div key={student.uid} className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4">
        <strong>{student.displayName || student.email}</strong><small className="ml-2 text-slate-500">{student.email}</small>
        <p className="mt-1 text-xs text-slate-500">Solicitadas: {classes.filter(c => student.requestedClassIds?.includes(c.id)).map(c => c.name).join(', ') || 'Ninguna'}</p>
        <button type="button" onClick={() => save(() => setDoc(doc(db, 'users', student.uid), { classIds: [...new Set([...(student.classIds || []), ...(student.requestedClassIds || [])])], requestedClassIds: [], enrollmentStatus: 'approved', updatedAt: new Date().toISOString() }, { merge: true }))} className="mt-3 rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white">Aprobar solicitud</button>
        <button type="button" onClick={() => save(() => setDoc(doc(db, 'users', student.uid), { requestedClassIds: [], enrollmentStatus: 'rejected', updatedAt: new Date().toISOString() }, { merge: true }))} className="ml-2 mt-3 rounded-lg border border-rose-300 px-3 py-2 text-sm font-bold text-rose-700">Rechazar</button>
      </div>)}</div>
      <h3 className="mt-6 text-lg font-bold">Alumnos inscritos</h3>
      <p className="text-sm text-slate-600">Selecciona o quita las clases para corregir la inscripción de cada alumno.</p>
      <div className="mt-4 space-y-3">{enrolledStudents.length === 0 && <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Todavía no hay alumnos aprobados.</p>}{enrolledStudents.map(student => <div key={student.uid} className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-1"><strong className="text-slate-950">{student.displayName || 'Alumno sin nombre'}</strong><span className="text-xs text-slate-500">{student.email || 'Sin correo'} · ID: {student.uid}</span><span className="text-xs text-slate-600">Clases actuales: {classes.filter(item => student.classIds?.includes(item.id)).map(item => item.name).join(', ') || 'Ninguna'}</span></div>
        <div className="mt-3 flex flex-wrap gap-3">{classes.map(item => <label key={item.id} className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs"><input type="checkbox" checked={student.classIds?.includes(item.id) || false} onChange={event => save(() => setDoc(doc(db, 'users', student.uid), { classIds: event.target.checked ? [...new Set([...(student.classIds || []), item.id])] : (student.classIds || []).filter(id => id !== item.id), enrollmentStatus: 'approved', updatedAt: new Date().toISOString() }, { merge: true }))} /> {item.name} · {item.group}</label>)}</div>
      </div>)}</div>
    </div>
    </details>
    <details className="rounded-xl border border-slate-200 p-4">
      <summary className="cursor-pointer font-bold">Tipos de sello</summary>
      <p className="mt-3 text-sm text-slate-600">Edita el nombre, valor y color que usarás al generar QR y productos.</p>
      <div className="mt-3 space-y-2">{stampTypes.map(stamp => <div key={stamp.id} className="grid gap-2 sm:grid-cols-[1fr_100px_80px_auto]">
        <input aria-label={`Nombre de ${stamp.name}`} defaultValue={stamp.name} className="rounded-lg border p-2 text-sm" onBlur={event => void save(() => setDoc(doc(db, 'stampTypes', stamp.id), { name: event.target.value }, { merge: true }))} />
        <input aria-label={`Valor de ${stamp.name}`} type="number" min="1" defaultValue={stamp.value} className="rounded-lg border p-2 text-sm" onBlur={event => void save(() => setDoc(doc(db, 'stampTypes', stamp.id), { value: Number(event.target.value) }, { merge: true }))} />
        <input aria-label={`Color de ${stamp.name}`} type="color" defaultValue={stamp.color} className="h-10 w-full rounded-lg border p-1" onChange={event => void save(() => setDoc(doc(db, 'stampTypes', stamp.id), { color: event.target.value }, { merge: true }))} />
        <span className="self-center text-xs text-slate-500">{stamp.category}</span>
      </div>)}</div>
    </details>
    <div className="space-y-4">
      <details className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer font-bold">Productos de tienda</summary>
      <div><ShopProductEditor classes={classes} stampTypes={stampTypes} categories={mergeShopCategories(categories)} products={products} />
        <h4 className="mt-5 font-bold">Filtros y categorías</h4><p className="text-xs text-slate-500">La maestra decide qué filtros aparecen en la tienda de alumnos.</p>
        {categories.map(item => <label key={item.id} className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={item.active} onChange={event => save(() => setDoc(doc(db, 'shopCategories', item.id), { active: event.target.checked }, { merge: true }))} /><input defaultValue={item.label} onBlur={event => void save(() => setDoc(doc(db, 'shopCategories', item.id), { label: event.target.value }, { merge: true }))} className="min-w-0 flex-1 rounded border p-1" /></label>)}
      </div>
      </details>
      <details className="hidden">
      <div><h3 className="text-lg font-bold">Agregar fecha institucional</h3><form onSubmit={event => { event.preventDefault(); if (!eventDate) return; const id = crypto.randomUUID(); void save(() => setDoc(doc(db, 'calendarEvents', id), { id, title: eventTitle.trim(), date: eventDate, color: eventColor })); setEventTitle(''); setEventDate(''); }} className="mt-3 space-y-2">
        <input required placeholder="Nombre del evento" value={eventTitle} onChange={event => setEventTitle(event.target.value)} className="w-full rounded-lg border p-2" />
        <label className="block text-sm font-semibold text-slate-700">Mes del evento <input required type="month" value={eventMonth} onChange={event => { setEventMonth(event.target.value); setEventDate(''); }} className="mt-1 w-full rounded-lg border p-2" /></label>
        <div className="grid grid-cols-7 gap-1 rounded-lg border border-slate-200 p-2">{Array.from({ length: new Date(Number(eventMonth.slice(0, 4)), Number(eventMonth.slice(5, 7)), 0).getDate() }, (_, index) => { const day = index + 1; const value = `${eventMonth}-${String(day).padStart(2, '0')}`; return <button type="button" key={value} onClick={() => setEventDate(value)} className={`rounded p-1 text-xs ${eventDate === value ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-700 hover:bg-amber-100'}`}>{day}</button>; })}</div>
        <p className="text-xs text-slate-600">Día seleccionado: {eventDate || 'elige un día arriba'}</p>
        <label className="flex items-center gap-2 text-sm">Color del evento <input type="color" value={eventColor} onChange={event => setEventColor(event.target.value)} className="h-9 w-14 rounded border p-1" /></label>
        <button disabled={!classId || !eventDate} className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-50">Agregar evento</button></form>
        {events.map(item => <p key={item.id} className="mt-3 text-sm">{item.date} · {item.title}</p>)}
      </div>
      </details>
    </div>
  </section>;
}
