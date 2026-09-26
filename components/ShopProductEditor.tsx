'use client';

import { useRef, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { AcademicClass, StampType } from '@/lib/firebase/models';
import { ShopCategory, ShopProduct } from '@/lib/shop';
import { ProductAppearancePicker, ProductCard, ProductIcon } from './ProductAppearance';

const emptyProduct: ShopProduct = { id: '', title: '', description: '', costStamps: 1, category: 'comodin', classId: '', stampTypeId: '', active: true, condition: '', iconName: 'gift', color: '#7c3aed', isPopular: false };
const fieldClass = 'mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900';
export default function ShopProductEditor({ classes, stampTypes, categories, products }: { classes: AcademicClass[]; stampTypes: StampType[]; categories: ShopCategory[]; products: ShopProduct[] }) {
  const [draft, setDraft] = useState<ShopProduct>(emptyProduct);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const product = { ...draft, classId: draft.classId || classes[0]?.id || '' };
  const change = <K extends keyof ShopProduct>(key: K, value: ShopProduct[K]) => setDraft(current => ({ ...current, [key]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!product.classId || !product.title.trim() || !Number.isSafeInteger(product.costStamps) || product.costStamps < 1) { setMessage('Selecciona una clase, escribe un nombre y un costo entero mayor que cero.'); return; }
    setBusy(true); setMessage('');
    try {
      const id = product.id || crypto.randomUUID();
      await setDoc(doc(db, 'shopItems', id), { ...product, id, title: product.title.trim(), updatedAt: new Date().toISOString() }, { merge: true });
      setDraft(emptyProduct); setMessage('Producto guardado. Su icono, color y contenido ya están publicados en la tienda de la clase.');
    } catch { setMessage('No se pudo guardar el producto. Revisa la conexión y los permisos de Firebase.'); }
    finally { setBusy(false); }
  };
  const toggle = async (item: ShopProduct) => { setBusy(true); try { await setDoc(doc(db, 'shopItems', item.id), { active: !item.active }, { merge: true }); setMessage(item.active ? 'Producto oculto.' : 'Producto activado.'); } catch { setMessage('No se pudo cambiar la disponibilidad.'); } finally { setBusy(false); } };
  return <div className="mt-4">
    <form ref={formRef} onSubmit={save}>
      <fieldset disabled={busy} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] disabled:opacity-60">
        <div className="space-y-3">
          <h3 className="text-lg font-bold">{draft.id ? 'Editar producto' : 'Nuevo producto'}</h3>
          <label className="block text-sm font-semibold">Clase<select className={fieldClass} value={product.classId} onChange={event => change('classId', event.target.value)} required><option value="" disabled>Selecciona una clase</option>{classes.map(item => <option key={item.id} value={item.id}>{item.name} · {item.group}</option>)}</select></label>
          <label className="block text-sm font-semibold">Nombre<input className={fieldClass} value={product.title} maxLength={120} required onChange={event => change('title', event.target.value)} /></label>
          <label className="block text-sm font-semibold">Descripción<textarea className={fieldClass} value={product.description} rows={3} maxLength={1500} onChange={event => change('description', event.target.value)} /></label>
          <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold">Costo en sellos<input className={fieldClass} type="number" min={1} step={1} required value={product.costStamps} onChange={event => change('costStamps', Number(event.target.value))} /></label><label className="text-sm font-semibold">Categoría<select className={fieldClass} value={product.category} onChange={event => change('category', event.target.value)}>{categories.map(item => <option key={item.id} value={item.id}>{item.label}{item.active ? '' : ' (filtro oculto)'}</option>)}</select></label></div>
          <label className="block text-sm font-semibold">Tipo de sello<select className={fieldClass} value={product.stampTypeId} onChange={event => change('stampTypeId', event.target.value)}><option value="">Cualquier sello</option>{stampTypes.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label className="block text-sm font-semibold">Condiciones de uso<textarea className={fieldClass} value={product.condition} rows={2} maxLength={1000} onChange={event => change('condition', event.target.value)} /></label>
          <ProductAppearancePicker iconName={product.iconName} color={product.color} onIconChange={value => change('iconName', value)} onColorChange={value => change('color', value)} />
          <div className="flex flex-wrap gap-4"><label className="flex gap-2 text-sm"><input type="checkbox" checked={product.active} onChange={event => change('active', event.target.checked)} />Disponible</label><label className="flex gap-2 text-sm"><input type="checkbox" checked={product.isPopular} onChange={event => change('isPopular', event.target.checked)} />Destacar producto</label></div>
          <div className="flex gap-2"><button disabled={!product.classId} className="rounded-lg bg-slate-950 px-4 py-2 font-bold text-white disabled:opacity-50">{busy ? 'Guardando…' : draft.id ? 'Guardar cambios' : 'Agregar producto'}</button>{draft.id && <button type="button" onClick={() => setDraft(emptyProduct)} className="rounded-lg border px-4 py-2">Cancelar</button>}</div>
        </div>
        <div className="self-start lg:sticky lg:top-24"><h4 className="mb-3 text-sm font-bold text-slate-700">Así lo verán tus alumnos</h4><ProductCard product={product} categoryLabel={categories.find(item => item.id === product.category)?.label || 'Especiales'} stampLabel={stampTypes.find(item => item.id === product.stampTypeId)?.name || 'Cualquier sello'} /><p className="mt-4 text-xs text-slate-600">Se conserva la tarjeta con sus efectos al pasar el cursor. Aparecerá cuando abras la tienda de su clase.</p></div>
      </fieldset>
    </form>
    {message && <p role="status" className="my-4 text-sm text-slate-700">{message}</p>}
    <h4 className="mb-3 mt-6 font-bold">Productos guardados</h4>
    {!products.length && <p className="text-sm text-slate-600">Todavía no has agregado productos.</p>}
    <div className="space-y-2">{products.map(item => <div key={item.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"><span className="rounded-lg border border-slate-200 p-2" style={{ color: item.color }}><ProductIcon name={item.iconName} /></span><div className="min-w-0 flex-1"><strong className="block text-sm text-slate-900">{item.title}</strong><span className="text-xs text-slate-600">{classes.find(group => group.id === item.classId)?.name || 'Clase no disponible'} · {item.costStamps} sellos · {item.active ? 'Disponible' : 'Oculto'}</span></div><button type="button" disabled={busy} onClick={() => { setDraft(item); setMessage(''); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">Editar</button><button type="button" disabled={busy} onClick={() => void toggle(item)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">{item.active ? 'Ocultar' : 'Activar'}</button></div>)}</div>
  </div>;
}
