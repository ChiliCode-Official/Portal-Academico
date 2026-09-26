'use client';

import { useRef, useState } from 'react';
import { arrayRemove, arrayUnion, doc, writeBatch } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { useAuth } from '@/lib/firebase/AuthContext';
import { subjectsData } from '@/data/subjects';
import { coursePageDefaults, ManagedDocument, useCourseContent } from './CourseContent';
import DocumentCard from './DocumentCard';

const inputClass = 'w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900';
export default function DocumentAdminPanel() {
  const { isTeacher } = useAuth();
  const { documents, pages, error, loading } = useCourseContent();
  const [subjectId, setSubjectId] = useState('fisica');
  const [category, setCategory] = useState('general');
  const [editingId, setEditingId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [published, setPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  if (!isTeacher) return null;
  const sections = coursePageDefaults.filter(page => page.subjectId === subjectId);
  const filtered = documents.filter(item => item.subjectId === subjectId && item.category === category);
  const reset = () => { setEditingId(''); setTitle(''); setDescription(''); setUrl(''); setFile(null); setPublished(true); if (fileInput.current) fileInput.current.value = ''; };
  const edit = (item: ManagedDocument) => { setEditingId(item.id); setTitle(item.title); setDescription(item.description || ''); setUrl(item.fileUrl); setPublished(item.published); setFile(null); if (fileInput.current) fileInput.current.value = ''; formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    if (!title.trim() || (!file && !url.trim())) { setMessage('Escribe el título y selecciona un PDF o pega su enlace.'); return; }
    if (file && (file.type !== 'application/pdf' || file.size >= 15 * 1024 * 1024)) { setMessage('Selecciona un PDF menor de 15 MB.'); return; }
    if (!file && !url.startsWith('/docs/')) { try { if (new URL(url).protocol !== 'https:') throw new Error(); } catch { setMessage('El enlace debe comenzar por https://.'); return; } }
    const existing = documents.find(item => item.id === editingId);
    const id = editingId || crypto.randomUUID();
    let uploadedPath = '';
    setBusy(true); setMessage('Guardando…');
    try {
      let fileUrl = url.trim();
      if (file) {
        uploadedPath = `documents/${id}-${crypto.randomUUID()}.pdf`;
        const result = await uploadBytes(ref(storage, uploadedPath), file, { contentType: 'application/pdf' });
        fileUrl = await getDownloadURL(result.ref);
      }
      const batch = writeBatch(db);
      batch.set(doc(db, 'documents', id), { id, title: title.trim(), description: description.trim(), subjectId, category, fileUrl, fileType: file || fileUrl !== existing?.fileUrl ? 'pdf' : existing?.fileType || 'pdf', storagePath: uploadedPath || (fileUrl === existing?.fileUrl ? existing?.storagePath || '' : ''), published, isAvailable: true, publishedAt: new Date().toISOString().slice(0, 10), updatedAt: new Date().toISOString() });
      batch.set(doc(db, 'coursePages', 'material-visibility'), { hiddenDocumentIds: published ? arrayRemove(id) : arrayUnion(id) }, { merge: true });
      await batch.commit();
      reset(); setMessage('Guardado. Las tarjetas, el buscador y los visores conectados reciben la actualización automáticamente.');
    } catch {
      if (uploadedPath) await deleteObject(ref(storage, uploadedPath)).catch(() => undefined);
      setMessage('No se pudo guardar. Revisa los permisos de Firebase y que Storage esté habilitado para subir archivos. También puedes pegar el enlace HTTPS de un PDF ya alojado.');
    } finally { setBusy(false); }
  };
  const toggle = async (item: ManagedDocument) => { setBusy(true); try { const batch = writeBatch(db); batch.set(doc(db, 'documents', item.id), { ...item, published: !item.published, updatedAt: new Date().toISOString() }); batch.set(doc(db, 'coursePages', 'material-visibility'), { hiddenDocumentIds: item.published ? arrayUnion(item.id) : arrayRemove(item.id) }, { merge: true }); await batch.commit(); setMessage(item.published ? 'Material oculto en el catálogo de alumnos.' : 'Material publicado.'); } catch { setMessage('No se pudo cambiar la publicación. Revisa los permisos de Firebase.'); } finally { setBusy(false); } };
  return <details className="rounded-xl border border-slate-200 p-4">
    <summary className="cursor-pointer font-bold">Biblioteca de documentos · Subir, reemplazar y organizar</summary>
    <p className="mt-3 text-sm text-slate-600">Elige la materia y la pestaña. Usa “Editar / reemplazar” para actualizar un documento conservando su lugar.</p>
    {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    <div className="my-4 grid gap-3 sm:grid-cols-2">
      <label className="text-sm font-semibold">Materia<select disabled={busy} className={inputClass} value={subjectId} onChange={event => { reset(); setSubjectId(event.target.value); setCategory(event.target.value === 'general' ? 'dinamica' : 'general'); }}>{subjectsData.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}<option value="general">Dinámica y reglamento general</option></select></label>
      <label className="text-sm font-semibold">Pestaña<select disabled={busy} className={inputClass} value={category} onChange={event => { reset(); setCategory(event.target.value); }}>{sections.map(item => <option key={item.id} value={item.category}>{pages[item.id]?.label || item.label}</option>)}{subjectId === 'general' && <><option value="dinamica">Dinámica de clase</option><option value="general">Calendario institucional</option></>}</select></label>
    </div>
    <form ref={formRef} onSubmit={save} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <fieldset disabled={busy || loading || Boolean(error)} className="grid gap-3 disabled:opacity-60">
        <h3 className="font-bold">{editingId ? 'Editar documento' : 'Agregar documento'}</h3>
        <label className="text-sm">Título<input required value={title} maxLength={200} onChange={event => setTitle(event.target.value)} className={inputClass} /></label>
        <label className="text-sm">Descripción<textarea value={description} maxLength={4000} onChange={event => setDescription(event.target.value)} className={inputClass} rows={3} /></label>
        <label className="text-sm">{editingId ? 'Reemplazar PDF (opcional)' : 'Seleccionar PDF'}<input ref={fileInput} type="file" accept="application/pdf" onChange={event => setFile(event.target.files?.[0] || null)} className={inputClass} /></label>
        <label className="text-sm">O enlace HTTPS del PDF<input value={url} onChange={event => setUrl(event.target.value)} className={inputClass} placeholder="https://…" /></label>
        <p className="text-xs text-slate-600">La carga requiere Firebase Storage habilitado. El enlace permite usar archivos que ya tienes alojados en otro servicio.</p>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={published} onChange={event => setPublished(event.target.checked)} />Publicar para alumnos</label>
        <div className="flex gap-2"><button className="rounded-lg bg-slate-950 px-4 py-2 font-bold text-white">{busy ? 'Guardando…' : 'Guardar documento'}</button>{editingId && <button type="button" onClick={reset} className="rounded-lg border px-4 py-2">Cancelar edición</button>}</div>
      </fieldset>
    </form>
    {message && <p role="status" className="mt-3 text-sm text-slate-700">{message}</p>}
    <div className="mt-5 grid gap-4 md:grid-cols-2">{filtered.map(item => <div key={item.id} className="space-y-2"><DocumentCard {...item} /><div className="flex flex-wrap gap-2"><button disabled={busy} type="button" onClick={() => edit(item)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold">Editar / reemplazar</button><button disabled={busy} type="button" onClick={() => void toggle(item)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">{item.published ? 'Ocultar' : 'Publicar'}</button><span className="self-center text-xs text-slate-500">{item.published ? 'Publicado' : 'Oculto'}</span></div></div>)}</div>
  </details>;
}
