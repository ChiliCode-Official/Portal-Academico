'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext';
import TeacherAdministration from '@/components/TeacherAdministration';
import OnboardingPanel from '@/components/OnboardingPanel';
import AcademicCalendar from '@/components/AcademicCalendar';

const subscribeHash = (callback: () => void) => { window.addEventListener('hashchange', callback); return () => window.removeEventListener('hashchange', callback); };
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => '';

function Section({ id, title, summary, children, open }: { id: string; title: string; summary: string; children: React.ReactNode; open?: boolean }) {
  return <details id={id} open={open} className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:hidden [&::-webkit-details-marker]:hidden">
      <span><strong className="block text-lg text-slate-950">{title}</strong><small className="mt-1 block text-slate-600">{summary}</small></span>
      <span aria-hidden className="text-xl text-slate-500 group-open:rotate-180">⌄</span>
    </summary>
    <div className="border-t border-slate-100 p-4 sm:p-6">{children}</div>
  </details>;
}

export default function PortalPanel() {
  const { user, profile, isTeacher, loading } = useAuth();
  const active = useSyncExternalStore(subscribeHash, getHash, getServerHash);

  if (loading) return <main className="mx-auto max-w-5xl p-8">Cargando tu panel…</main>;
  if (!user || !profile || (!isTeacher && !profile.onboardingComplete)) return <main className="mx-auto max-w-5xl px-4 py-10"><OnboardingPanel /></main>;

  return <main className="mx-auto w-full max-w-6xl space-y-5 px-4 py-8 sm:px-8">
    <header className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
      <p className="text-sm text-amber-300">{isTeacher ? 'Panel de la maestra' : 'Mi espacio académico'}</p>
      <h1 className="mt-1 text-3xl font-bold">Hola, {profile.displayName?.split(' ')[0] || 'bienvenido'}</h1>
      <p className="mt-2 text-sm text-slate-300">{isTeacher ? 'Administra clases, inscripciones, tienda y calendario desde aquí.' : `Tienes ${profile.stampsBalance} sellos y ${profile.classIds?.length || 0} clases aprobadas.`}</p>
    </header>
    {isTeacher ? <>
      <Section id="clases" title="Clases y alumnos" summary="Grupos, inscripciones, productos, apertura de tienda y eventos" open={!active || active === 'clases'}><TeacherAdministration /></Section>
      <Section id="sellos" title="Sellos QR" summary="Genera códigos para tus clases" open={active === 'sellos'}><Link href="/sellos-qr" className="inline-flex rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950">Abrir panel de sellos QR</Link></Section>
    </> : <>
      <Section id="sellos" title="Mis clases y sellos" summary="Consulta tus grupos aprobados y escanea sellos QR" open={!active || active === 'sellos'}><p className="mb-3 text-sm">Clases aprobadas: {profile.classIds?.length || 0}. Sellos disponibles: {profile.stampsBalance}.</p><Link href="/sellos-qr" className="inline-flex rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950">Abrir mis sellos</Link></Section>
      <Section id="tienda" title="Tienda" summary="Consulta los productos disponibles de tus clases" open={active === 'tienda'}><Link href="/tienda" className="inline-flex rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950">Abrir tienda</Link></Section>
    </>}
    <Section id="calendario" title="Calendario institucional" summary={isTeacher ? 'Edita meses, días, eventos y colores' : 'Consulta las fechas oficiales'} open={active === 'calendario'}>
      <AcademicCalendar editable={isTeacher} />
    </Section>
    <Section id="recursos" title={isTeacher ? 'Materias y documentos' : 'Recursos y reglamento'} summary={isTeacher ? 'Edita pestañas, contenidos y archivos de cada materia' : 'Materiales de clase y documentos de consulta'} open={active === 'recursos'}>
      <div className="flex flex-wrap gap-3"><Link className="rounded-xl border border-slate-300 px-4 py-2" href="/#materias">Ver materias</Link><Link className="rounded-xl border border-slate-300 px-4 py-2" href="/dinamica-de-clase">Leer reglamento</Link></div>
    </Section>
  </main>;
}
