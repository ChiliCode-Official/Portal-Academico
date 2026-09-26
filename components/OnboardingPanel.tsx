'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/lib/firebase/AuthContext';
import { AcademicClass } from '@/lib/firebase/models';

export default function OnboardingPanel() {
  const { user, profile, signInWithGoogle, requestClasses, authError } = useAuth();
  const [classes, setClasses] = useState<AcademicClass[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => onSnapshot(collection(db, 'classes'), snapshot => {
    setClasses(snapshot.docs.map(item => ({ ...item.data(), id: item.id } as AcademicClass)).filter(item => item.active));
  }, () => setError('No se pudieron cargar las clases. Revisa tu conexión.')), []);

  if (!user) return <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <p className="text-sm font-semibold text-amber-700">Paso 1 de 3 · Acceso</p>
    <h1 className="mt-2 text-3xl font-bold text-slate-950">Crea tu cuenta académica</h1>
    <p className="mt-3 text-slate-600">Usa tu correo institucional @my.uvm.edu.mx para continuar.</p>
    <button onClick={() => signInWithGoogle().catch(() => setError('No se pudo iniciar sesión con Google.'))} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">Continuar con Google</button>
    {(error || authError) && <p role="alert" className="mt-4 text-sm text-red-700">{error || authError}</p>}
  </section>;

  if (!profile) return <p className="mx-auto max-w-xl p-8">Preparando tu cuenta… {authError}</p>;

  if (profile.role === 'teacher') return <p className="mx-auto max-w-xl p-8">Tu cuenta de docente está lista. Abre el panel de clases.</p>;

  if (profile.onboardingComplete) return <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8">
    <p className="text-sm font-semibold text-emerald-700">Paso 3 de 3 · Solicitud enviada</p>
    <h1 className="mt-2 text-2xl font-bold">Tu cuenta está lista</h1>
    <p className="mt-3 text-slate-600">La maestra revisará tus clases. Solo ella podrá aprobarlas o cambiarlas después.</p>
    <p className="mt-4 text-sm">Clases aprobadas: {profile.classIds?.length || 0}</p>
  </section>;

  return <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <p className="text-sm font-semibold text-amber-700">Paso 2 de 3 · Clases</p>
    <h1 className="mt-2 text-3xl font-bold text-slate-950">Selecciona tus clases</h1>
    <p className="mt-3 text-slate-600">Puedes elegir varias. La maestra confirmará tu inscripción; después solo ella podrá cambiarla.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">{classes.map(item => <label key={item.id} className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 text-slate-900">
      <input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected(previous => previous.includes(item.id) ? previous.filter(id => id !== item.id) : [...previous, item.id])} />
      <span><strong>{item.name}</strong><small className="block text-slate-500">{item.group} · {item.schedule}</small></span>
    </label>)}</div>
    {classes.length === 0 && <p className="mt-4 text-sm text-slate-600">Aún no hay clases abiertas para inscripción.</p>}
    <button disabled={saving || selected.length === 0} onClick={async () => { setSaving(true); setError(''); try { await requestClasses(selected); } catch { setError('No se pudo guardar la solicitud. Intenta de nuevo.'); } finally { setSaving(false); } }} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white disabled:opacity-50">{saving ? 'Guardando…' : 'Solicitar inscripción'}</button>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
  </section>;
}
