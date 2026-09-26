'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ShoppingBag } from 'lucide-react';
import { collection, doc, increment, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/lib/firebase/AuthContext';
import { mergeShopCategories, readShopProduct, ShopCategory, ShopProduct } from '@/lib/shop';
import { ProductCard } from './ProductAppearance';
import './HamsterClosedShop.css';

interface TeacherShopProps { userStamps?: number }
type ShopState = { uid: string; products: ShopProduct[]; openClasses: string[]; categories: ShopCategory[]; stamps: Record<string, string>; ready: Record<string, boolean>; errors: Record<string, string> };
const emptyState: ShopState = { uid: '', products: [], openClasses: [], categories: [], stamps: {}, ready: {}, errors: {} };

export default function TeacherShop({ userStamps }: TeacherShopProps) {
  const { user, profile } = useAuth();
  const [state, setState] = useState<ShopState>(emptyState);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeId, setActiveId] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [purchaseError, setPurchaseError] = useState('');
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    let active = true;
    const update = (name: string, values: Partial<ShopState>, error = '') => {
      if (active) setState(previous => {
        const current = previous.uid === uid ? previous : { ...emptyState, uid };
        return { ...current, ...values, ready: { ...current.ready, [name]: true }, errors: { ...current.errors, [name]: error } };
      });
    };
    const fail = (name: string) => () => update(name, {}, 'No se pudo cargar ' + name + '. Revisa la sesión y los permisos de Firebase.');
    const subscriptions = [
      onSnapshot(collection(db, 'shopItems'), snap => update('productos', { products: snap.docs.map(item => readShopProduct(item.id, item.data())) }), fail('productos')),
      onSnapshot(collection(db, 'shopSettings'), snap => update('apertura', { openClasses: snap.docs.filter(item => item.data().open === true).map(item => item.id) }), fail('apertura')),
      onSnapshot(collection(db, 'shopCategories'), snap => update('categorías', { categories: snap.docs.map(item => ({ id: item.id, label: String(item.data().label || item.id), active: item.data().active !== false })) }), fail('categorías')),
      onSnapshot(collection(db, 'stampTypes'), snap => update('sellos', { stamps: Object.fromEntries(snap.docs.map(item => [item.id, String(item.data().name || '')])) }), fail('sellos')),
    ];
    return () => { active = false; subscriptions.forEach(stop => stop()); };
  }, [user]);
  const data = state.uid === user?.uid ? state : emptyState;
  const error = Object.values(data.errors).filter(Boolean).join(' ');
  const loading = Boolean(user) && Object.keys(data.ready).length < 4;
  const stamps = profile?.stampsBalance ?? userStamps ?? 0;
  const allCategories = mergeShopCategories(data.categories);
  const categories = [{ id: 'all', label: 'Todos los canjes' }, ...allCategories.filter(item => item.active)];
  const effectiveCategory = categories.some(item => item.id === selectedCategory) ? selectedCategory : 'all';
  const hasOpenStore = (profile?.classIds || []).some(id => data.openClasses.includes(id));
  const storeClosed = Boolean(user) && !loading && !error && !hasOpenStore;
  const availableProducts = data.products.filter(item => item.active && profile?.classIds?.includes(item.classId) && data.openClasses.includes(item.classId));
  const filteredItems = availableProducts.filter(item => effectiveCategory === 'all' || item.category === effectiveCategory);
  const activeItem = availableProducts.find(item => item.id === activeId);

  const handleRedeem = async (item: ShopProduct) => {
    if (!user || busy || stamps < item.costStamps) return;
    setBusy(true); setPurchaseError(''); setMessage('');
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, 'users', user.uid), { stampsBalance: increment(-item.costStamps) });
      batch.set(doc(collection(db, 'purchases')), { studentUid: user.uid, studentName: profile?.displayName || user.displayName || 'Estudiante', studentEmail: user.email || '', itemId: item.id, itemTitle: item.title, costStamps: item.costStamps, purchasedAt: new Date().toISOString(), status: 'canjeado' });
      await batch.commit();
      setMessage('Canje registrado: ' + item.title + '.'); setActiveId('');
    } catch { setPurchaseError('No se pudo registrar el canje. No se descontaron sellos. Consulta a la maestra o revisa los permisos de Firebase.'); }
    finally { setBusy(false); }
  };
  return <div id="tienda-de-la-maestra" className="w-full">
      {/* Wallet / Stamp Balance Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 mb-8 border-2 border-black shadow-[5px_5px_0_#000000]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000000]">
              <Award className="w-8 h-8 text-black fill-black" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                Tu Saldo para Compras
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-['Quicksand'] text-black flex items-center gap-2">
                <span>{stamps} Sellos Disponibles</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:self-center">
            <Link
              href="/sellos-qr"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black border-2 border-black rounded-xl font-black text-xs uppercase tracking-wider font-['Quicksand'] shadow-[2px_2px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <span>+ Obtener Sellos con QR</span>
            </Link>
          </div>
        </div>
      </div>


      {/* Categories Filter Bar (Touch / Mobile Friendly) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = effectiveCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={effectiveCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>


      {!user && <p className="mb-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">Inicia sesión con tu cuenta institucional para ver la tienda de tus clases.</p>}
      {loading && <p role="status" className="p-5 text-sm text-slate-600">Consultando la tienda…</p>}
      {error && <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">{error}</p>}
      {storeClosed && <div className="closed-shop-stage" aria-label="La tienda está cerrada">
        <div className="wheel-and-hamster" role="img" aria-label="Hámster esperando a que abra la tienda"><div className="wheel" /><div className="hamster"><div className="hamster__body"><div className="hamster__head"><div className="hamster__ear" /><div className="hamster__eye" /><div className="hamster__nose" /></div><div className="hamster__limb hamster__limb--fr" /><div className="hamster__limb hamster__limb--fl" /><div className="hamster__limb hamster__limb--br" /><div className="hamster__limb hamster__limb--bl" /><div className="hamster__tail" /></div></div><div className="spoke" /></div>
        <p className="mt-5 text-center font-bold text-slate-700">La tienda está cerrada por ahora</p>
        <p className="mt-1 text-center text-sm text-slate-500">La maestra publicará los productos cuando estén disponibles.</p>
      </div>}

      {message && <p role="status" className="mb-5 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">{message}</p>}
      {user && !loading && !error && hasOpenStore && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map(item => <ProductCard key={item.id} product={item} categoryLabel={allCategories.find(category => category.id === item.category)?.label || 'Especiales'} stampLabel={data.stamps[item.stampTypeId] || 'Cualquier sello'} action={<button type="button" onClick={() => { setActiveId(item.id); setPurchaseError(''); }} className="uiverse-card-btn" title={'Ver ' + item.title} aria-label={'Ver ' + item.title}><ShoppingBag className="!fill-none" /></button>} />)}
        {!filteredItems.length && <p className="col-span-full rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">{availableProducts.length ? 'No hay productos en este filtro. Prueba con Todos los canjes.' : 'La tienda está abierta. La maestra aún no ha publicado productos para tus clases.'}</p>}
      </div>}
      {activeItem && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label={activeItem.title}>
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
          <h3 className="text-lg font-bold text-slate-950">{activeItem.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{activeItem.description}</p>
          <p className="mt-3 text-sm text-slate-700">{activeItem.condition}</p>
          <p className="mt-4 font-semibold">{activeItem.costStamps} sellos · {data.stamps[activeItem.stampTypeId] || 'Cualquier sello'}</p>
          {stamps < activeItem.costStamps && <p className="mt-2 text-sm text-red-700">No tienes suficientes sellos para este producto.</p>}
          {purchaseError && <p role="alert" className="mt-3 text-sm text-red-700">{purchaseError}</p>}
          <div className="mt-5 flex gap-2"><button disabled={busy || stamps < activeItem.costStamps} type="button" onClick={() => void handleRedeem(activeItem)} className="rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950 disabled:opacity-50">{busy ? 'Registrando…' : 'Confirmar canje'}</button><button disabled={busy} type="button" onClick={() => setActiveId('')} className="rounded-xl border border-slate-300 px-4 py-2 text-sm">Cerrar</button></div>
        </div>
      </div>}
    </div>;
}
