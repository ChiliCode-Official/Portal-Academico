'use client';

import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { AcademicClass, UserProfile } from '@/lib/firebase/models';
import { useAuth } from '@/lib/firebase/AuthContext';

type CalendarEvent = { id: string; title: string; date: string; classId: string };
type Product = { id: string; title: string; costStamps: number; active: boolean; classId: string };

export default function TeacherAdministration() {
  const { isTeacher } = useAuth();
  const [classes, setClasses] = useState<AcademicClass[]>([]);
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [classId, setClassId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productCost, setProductCost] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isTeacher) return;
    const subscriptions = [
      onSnapshot(collection(db, 'classes'), snap => { const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as AcademicClass)); setClasses(list); setClassId(current => current || list[0]?.id || ''); }),
      onSnapshot(collection(db, 'users'), snap => setStudents(snap.docs.map(d => d.data() as UserProfile).filter(p => p.role === 'student'))),
      onSnapshot(collection(db, 'calendarEvents'), snap => setEvents(snap.docs.map(d => ({ ...d.data(), id: d.id } as CalendarEvent)))),
      onSnapshot(collection(db, 'shopItems'), snap => setProducts(snap.docs.map(d => ({ ...d.data(), id: d.id } as Product)))),
      onSnapshot(collection(db, 'shopSettings'), snap => setOpen(Object.fromEntries(snap.docs.map(d => [d.id, Boolean(d.data().open)])))),
    ];
    return () => subscriptions.forEach(unsubscribe => unsubscribe());
  }, [isTeacher]);

  if (!isTeacher) return null;
  const save = async (action: () => Promise<void>) => { try { await action(); setMessage('Cambios guardados.'); } catch { setMessage('No se pudieron guardar los cambios.'); } };

  return <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
    <h2 className="text-2xl font-bold text-slate-950">Administración de clases</h2>
    {message && <p role="status" className="text-sm text-slate-700">{message}</p>}
    <div className="grid gap-4 md:grid-cols-2">{classes.map(item => <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
      <h3 className="font-bold">{item.name} · {item.group}</h3>
      <p className="text-sm text-slate-500">{item.schedule}</p>
      <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(open[item.id])} onChange={event => save(() => setDoc(doc(db, 'shopSettings', item.id), { open: event.target.checked, updatedAt: new Date().toISOString() }, { merge: true }))} /> Tienda abierta para esta clase</label>
    </div>)}</div>
    <div className="border-t border-slate-200 pt-6">
      <h3 className="text-lg font-bold">Inscripciones</h3>
      <p className="text-sm text-slate-600">Marca las clases aprobadas de cada alumno. Solo tu cuenta puede guardar estos cambios.</p>
      <div className="mt-4 space-y-3">{students.map(student => <div key={student.uid} className="rounded-xl border border-slate-200 p-4">
        <strong>{student.displayName || student.email}</strong><small className="ml-2 text-slate-500">{student.email}</small>
        <p className="mt-1 text-xs text-slate-500">Solicitadas: {classes.filter(c => student.requestedClassIds?.includes(c.id)).map(c => c.name).join(', ') || 'Ninguna'}</p>
        <div className="mt-2 flex flex-wrap gap-3">{classes.map(item => <label key={item.id} className="flex items-center gap-1 text-xs"><input type="checkbox" checked={student.classIds?.includes(item.id) || false} onChange={event => save(() => setDoc(doc(db, 'users', student.uid), { classIds: event.target.checked ? [...new Set([...(student.classIds || []), item.id])] : (student.classIds || []).filter(id => id !== item.id), updatedAt: new Date().toISOString() }, { merge: true }))} /> {item.name} · {item.group}</label>)}</div>
      </div>)}</div>
    </div>
    <div className="grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-2">
      <div><h3 className="text-lg font-bold">Productos</h3><form onSubmit={event => { event.preventDefault(); const id = crypto.randomUUID(); void save(() => setDoc(doc(db, 'shopItems', id), { id, title: productTitle.trim(), costStamps: productCost, classId, active: true })); setProductTitle(''); }} className="mt-3 space-y-2">
        <select aria-label="Clase del producto" value={classId} onChange={event => setClassId(event.target.value)} className="w-full rounded-lg border p-2">{classes.map(c => <option key={c.id} value={c.id}>{c.name} · {c.group}</option>)}</select>
        <input required placeholder="Nombre del producto" value={productTitle} onChange={event => setProductTitle(event.target.value)} className="w-full rounded-lg border p-2" />
        <input required type="number" min="1" value={productCost} onChange={event => setProductCost(Number(event.target.value))} className="w-full rounded-lg border p-2" />
        <button disabled={!classId} className="rounded-lg bg-slate-900 px-4 py-2 text-white">Agregar producto</button></form>
        {products.map(item => <label key={item.id} className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={item.active} onChange={event => save(() => setDoc(doc(db, 'shopItems', item.id), { active: event.target.checked }, { merge: true }))} />{item.title} · {item.costStamps} sellos</label>)}
      </div>
      <div><h3 className="text-lg font-bold">Calendario</h3><form onSubmit={event => { event.preventDefault(); const id = crypto.randomUUID(); void save(() => setDoc(doc(db, 'calendarEvents', id), { id, title: eventTitle.trim(), date: eventDate, classId })); setEventTitle(''); }} className="mt-3 space-y-2">
        <input required placeholder="Nombre del evento" value={eventTitle} onChange={event => setEventTitle(event.target.value)} className="w-full rounded-lg border p-2" />
        <input required type="date" value={eventDate} onChange={event => setEventDate(event.target.value)} className="w-full rounded-lg border p-2" />
        <button disabled={!classId} className="rounded-lg bg-slate-900 px-4 py-2 text-white">Agregar evento</button></form>
        {events.map(item => <p key={item.id} className="mt-3 text-sm">{item.date} · {item.title}</p>)}
      </div>
    </div>
  </section>;
}
