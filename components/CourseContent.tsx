'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext';
import { db } from '@/lib/firebase/config';
import { documentsData } from '@/data/documents';
import coursePages from '@/data/course-pages.json';
import { DocumentItem } from '@/lib/types';
import DocumentCard from './DocumentCard';

export type CoursePage = { id: string; subjectId: string; category: string; href: string; label: string; fields: { id: string; value: string }[]; links?: { id: string; href: string }[] };
export type PageSettings = { label?: string; visible?: boolean; order?: number; fields?: Record<string, string>; links?: Record<string, string>; additionalText?: string; hiddenDocumentIds?: string[] };
export type ManagedDocument = DocumentItem & { published: boolean; storagePath?: string; updatedAt?: string };
const initialDocuments: ManagedDocument[] = documentsData.map(item => ({ ...item, published: true }));
export const coursePageDefaults: CoursePage[] = coursePages;

type Catalog = { documents: ManagedDocument[]; pages: Record<string, PageSettings>; error: string; loading: boolean };
const Context = createContext<Catalog>({ documents: initialDocuments, pages: {}, error: '', loading: false });
export const useCourseContent = () => useContext(Context);

export function CourseContentProvider({ children }: { children: React.ReactNode }) {
  const { user, isTeacher } = useAuth();
  const [state, setState] = useState<{ uid: string; documents: ManagedDocument[]; pages: Record<string, PageSettings>; errors: Record<string, string>; ready: Record<string, boolean> }>({ uid: '', documents: initialDocuments, pages: {}, errors: {}, ready: {} });
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    let active = true;
    const update = (patch: Partial<typeof state>) => { if (active) setState(current => ({ ...(current.uid === uid ? current : { uid, documents: initialDocuments, pages: {}, errors: {}, ready: {} }), ...patch })); };
    const failed = (name: string) => () => { if (active) setState(previous => { const current = previous.uid === uid ? previous : { uid, documents: initialDocuments, pages: {}, errors: {}, ready: {} }; return { ...current, errors: { ...current.errors, [name]: `No se pudo sincronizar ${name}. Verifica la sesión y los permisos de Firebase.` }, ready: { ...current.ready, [name]: true } }; }); };
    const source = isTeacher ? collection(db, 'documents') : query(collection(db, 'documents'), where('published', '==', true));
    const stopDocuments = onSnapshot(source, snapshot => {
      const merged = new Map(initialDocuments.map(item => [item.id, item]));
      snapshot.docs.forEach(item => {
        const value = item.data();
        const previous = merged.get(item.id);
        merged.set(item.id, { ...previous, ...value, id: item.id, title: String(value.title || previous?.title || 'Documento'), fileUrl: String(value.fileUrl || previous?.fileUrl || ''), fileType: value.fileType || 'pdf', subjectId: value.subjectId || 'general', category: value.category || 'general', publishedAt: value.publishedAt || value.updatedAt?.slice(0, 10) || '', isAvailable: value.isAvailable !== false, published: value.published !== false } as ManagedDocument);
      });
      update({ documents: [...merged.values()] });
      if (active) setState(current => ({ ...current, ready: { ...current.ready, documentos: true }, errors: { ...current.errors, documentos: '' } }));
    }, failed('documentos'));
    const stopPages = onSnapshot(collection(db, 'coursePages'), snapshot => {
      update({ pages: Object.fromEntries(snapshot.docs.map(item => [item.id, item.data() as PageSettings])) });
      if (active) setState(current => ({ ...current, ready: { ...current.ready, materias: true }, errors: { ...current.errors, materias: '' } }));
    }, failed('materias'));
    return () => { active = false; stopDocuments(); stopPages(); };
  }, [user, isTeacher]);
  const value = useMemo<Catalog>(() => !user ? { documents: initialDocuments, pages: {}, error: '', loading: false } : state.uid !== user.uid ? { documents: [], pages: {}, error: '', loading: true } : { documents: isTeacher ? state.documents : state.documents.filter(item => !state.pages['material-visibility']?.hiddenDocumentIds?.includes(item.id)), pages: state.pages, error: Object.values(state.errors).filter(Boolean).join(' '), loading: !state.ready.documentos || !state.ready.materias }, [state, user, isTeacher]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function CourseText({ pageId, fieldId, children }: { pageId: string; fieldId: string; children: React.ReactNode }) {
  const { pages } = useCourseContent();
  const value = pages[pageId]?.fields?.[fieldId];
  if (value === undefined) return <>{children}</>;
  const original = typeof children === 'string' ? children : '';
  return <>{/^\s/.test(original) ? ' ' : ''}{value}{/\s$/.test(original) ? ' ' : ''}</>;
}

export function CourseLink({ pageId, linkId, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { pageId: string; linkId: string; href: string }) {
  const { pages } = useCourseContent();
  const { isTeacher } = useAuth();
  const configured = pages[pageId]?.links?.[linkId] || href;
  const target = coursePageDefaults.find(item => item.href === configured);
  if (target && pages[target.id]?.visible === false && !isTeacher) return null;
  const safe = (configured.startsWith('/') && !configured.startsWith('//')) || configured.startsWith('https://');
  return <Link {...props} href={safe ? configured : href} />;
}

export function CourseDocuments({ subjectId, category }: { subjectId?: string; category: string }) {
  const { documents, error, loading } = useCourseContent();
  if (error) return <p role="alert" className="col-span-full rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</p>;
  if (loading) return <p role="status" className="col-span-full p-4 text-sm text-slate-600">Cargando materiales…</p>;
  const items = documents.filter(item => item.published && (!subjectId || item.subjectId === subjectId) && item.category === category);
  return <>{items.length ? items.map(item => <DocumentCard key={item.id} {...item} />) : <p className="col-span-full rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">Aún no hay materiales publicados en esta sección.</p>}</>;
}

export function CourseDocumentCount({ subjectId, category }: { subjectId?: string; category: string }) {
  const { documents, loading, error } = useCourseContent();
  return <>{loading || error ? '…' : documents.filter(item => item.published && (!subjectId || item.subjectId === subjectId) && item.category === category).length}</>;
}

export function CoursePageBoundary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { pages } = useCourseContent();
  const { isTeacher } = useAuth();
  const page = coursePageDefaults.find(item => item.href === pathname);
  if (page && pages[page.id]?.visible === false && !isTeacher) return <div className="mx-auto max-w-3xl p-8 text-slate-700">Esta sección no está publicada.</div>;
  return <>{children}</>;
}
