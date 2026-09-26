'use client';

import { useState } from 'react';
import Link from 'next/link';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { subjectsData } from '@/data/subjects';
import { useAuth } from '@/lib/firebase/AuthContext';
import { CoursePage, PageSettings, coursePageDefaults, useCourseContent } from './CourseContent';

const fieldClass = 'mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900';
function PageEditor({ page, settings, initialOrder }: { page: CoursePage; settings: PageSettings; initialOrder: number }) {
  const [label, setLabel] = useState(settings.label ?? page.label);
  const [visible, setVisible] = useState(settings.visible !== false);
  const [order, setOrder] = useState(settings.order ?? initialOrder);
  const [fields, setFields] = useState<Record<string, string>>(() => Object.fromEntries(page.fields.map(field => [field.id, settings.fields?.[field.id] ?? field.value])));
  const [additionalText, setAdditionalText] = useState(settings.additionalText || '');
  const [links, setLinks] = useState<Record<string, string>>(() => Object.fromEntries((page.links || []).map(link => [link.id, settings.links?.[link.id] ?? link.href])));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(links).some(link => !((link.startsWith('/') && !link.startsWith('//')) || link.startsWith('https://')))) { setMessage('Los enlaces deben comenzar por / para páginas del portal o https:// para recursos externos.'); return; }
    setBusy(true); setMessage('');
    try { await setDoc(doc(db, 'coursePages', page.id), { label: label.trim(), visible, order, fields, links, additionalText, updatedAt: new Date().toISOString() }, { merge: true }); setMessage('Cambios publicados. Los alumnos los reciben automáticamente.'); }
    catch { setMessage('No se pudo guardar. Verifica los permisos de Firebase para las materias.'); }
    finally { setBusy(false); }
  };
  return <form onSubmit={save} className="mt-4 space-y-4">
    <fieldset disabled={busy} className="space-y-4 disabled:opacity-60">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold">Nombre de la pestaña<input required maxLength={80} className={fieldClass} value={label} onChange={event => setLabel(event.target.value)} /></label>
        <label className="text-sm font-semibold">Orden en la barra<input type="number" min={0} max={100} required className={fieldClass} value={order} onChange={event => setOrder(Number(event.target.value))} /></label>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={visible} onChange={event => setVisible(event.target.checked)} />Mostrar esta pestaña a los alumnos</label>
      <details className="rounded-xl border border-slate-200 p-4" open>
        <summary className="cursor-pointer font-bold">Textos dentro de esta sección</summary>
        <p className="mt-2 text-xs text-slate-600">Aparecen en el mismo orden que en la página. Se conservan sus tarjetas, colores e iconos.</p>
        <div className="mt-4 space-y-4">{page.fields.map((field, index) => <label key={field.id} className="block text-sm"><span className="font-semibold">{index + 1}. {field.value.length > 75 ? `${field.value.slice(0, 75)}…` : field.value}</span><textarea maxLength={10000} className={fieldClass} rows={field.value.length > 100 ? 3 : 2} value={fields[field.id] ?? ''} onChange={event => setFields(current => ({ ...current, [field.id]: event.target.value }))} /></label>)}</div>
      </details>
      {Boolean(page.links?.length) && <details className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer font-bold">Enlaces de esta sección</summary><div className="mt-3 space-y-3">{page.links?.map((link, index) => <label key={link.id} className="block text-sm">Enlace {index + 1}: {link.href}<input required value={links[link.id] || ''} onChange={event => setLinks(current => ({ ...current, [link.id]: event.target.value }))} className={fieldClass} /></label>)}</div></details>}
      <label className="block text-sm font-semibold">Aviso o instrucciones adicionales<textarea rows={4} maxLength={10000} value={additionalText} onChange={event => setAdditionalText(event.target.value)} className={fieldClass} /></label>
      <div className="flex flex-wrap gap-3"><button className="rounded-lg bg-slate-950 px-4 py-2 font-bold text-white">{busy ? 'Guardando…' : 'Guardar y publicar cambios'}</button><Link href={page.href} target="_blank" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Ver página</Link></div>
    </fieldset>
    {message && <p role="status" className="text-sm text-slate-700">{message}</p>}
  </form>;
}

export default function CourseAdminPanel() {
  const { isTeacher } = useAuth();
  const { pages, error, loading } = useCourseContent();
  const [subjectId, setSubjectId] = useState('fisica');
  const [pageId, setPageId] = useState('fisica--general');
  if (!isTeacher) return null;
  const sections = coursePageDefaults.filter(page => page.subjectId === subjectId);
  const page = sections.find(item => item.id === pageId) || sections[0];
  return <details className="rounded-xl border border-slate-200 bg-white p-4">
    <summary className="cursor-pointer font-bold">Materias y pestañas · General, syllabus y contenidos</summary>
    <p className="mt-3 text-sm text-slate-600">Edita los nombres de las pestañas y el contenido de cada materia. Los PDF se administran en la biblioteca de documentos de abajo.</p>
    {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <label className="text-sm font-semibold">Materia<select className={fieldClass} value={subjectId} onChange={event => { setSubjectId(event.target.value); setPageId(`${event.target.value}--general`); }}>{subjectsData.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
      <label className="text-sm font-semibold">Pestaña<select className={fieldClass} value={page.id} onChange={event => setPageId(event.target.value)}>{sections.map(item => <option key={item.id} value={item.id}>{pages[item.id]?.label || item.label}</option>)}</select></label>
    </div>
    {loading ? <p className="mt-4 text-sm" role="status">Cargando configuración…</p> : !error && <PageEditor key={page.id} page={page} settings={pages[page.id] || {}} initialOrder={sections.indexOf(page)} />}
  </details>;
}
