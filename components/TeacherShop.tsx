'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShoppingBag,
  Award,
  Zap,
  Shield,
  Clock,
  FileCheck,
  Star,
  Gift,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { shopItemsData, ShopItem } from '@/data/shopItems';
import { useAuth } from '@/lib/firebase/AuthContext';
import { doc, updateDoc, increment, addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import './EcomCard.css';

interface TeacherShopProps {
  userStamps?: number;
}

const iconComponentMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-5 h-5 text-amber-500" />,
  shield: <Shield className="w-5 h-5 text-emerald-500" />,
  clock: <Clock className="w-5 h-5 text-blue-500" />,
  'file-check': <FileCheck className="w-5 h-5 text-indigo-500" />,
  star: <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />,
  gift: <Gift className="w-5 h-5 text-purple-500" />,
  sparkles: <Sparkles className="w-5 h-5 text-rose-500" />,
  award: <Award className="w-5 h-5 text-orange-500" />,
};

const categoryBadgeMap: Record<ShopItem['category'], { label: string; color: string }> = {
  examen: { label: 'Exámenes', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  tarea: { label: 'Tareas y Prórrogas', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  laboratorio: { label: 'Laboratorio', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  participacion: { label: 'Participación', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  comodin: { label: 'Comodín Especial', color: 'bg-purple-50 text-purple-700 border-purple-200' },
};

export default function TeacherShop({ userStamps }: TeacherShopProps) {
  const { user, profile } = useAuth();
  const initialBalance = profile ? profile.stampsBalance : (userStamps ?? 5);
  const [stamps, setStamps] = useState<number>(initialBalance);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<ShopItem | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    if (profile) {
      setStamps(profile.stampsBalance);
    }
  }, [profile?.stampsBalance]);

  const categories = [
    { id: 'all', label: 'Todos los Canjes' },
    { id: 'examen', label: 'Exámenes' },
    { id: 'tarea', label: 'Tareas' },
    { id: 'laboratorio', label: 'Laboratorio' },
    { id: 'participacion', label: 'Puntos' },
    { id: 'comodin', label: 'Especiales' },
  ];

  const filteredItems = shopItemsData.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const handleRedeem = async (item: ShopItem) => {
    if (stamps < item.costStamps) {
      setActiveItem(item);
      return;
    }

    setStamps((prev) => prev - item.costStamps);

    if (user?.uid) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          stampsBalance: increment(-item.costStamps),
        });

        await addDoc(collection(db, 'purchases'), {
          studentUid: user.uid,
          studentName: profile?.displayName || user.displayName || 'Estudiante',
          studentEmail: user.email,
          itemId: item.id,
          itemTitle: item.title,
          costStamps: item.costStamps,
          purchasedAt: new Date().toISOString(),
          status: 'canjeado',
        });
      } catch (e) {
        console.warn('Purchase saved locally:', e);
      }
    }

    setRedeemSuccess(`¡Canjeaste exitosamente: "${item.title}" por ${item.costStamps} sellos!`);
    setTimeout(() => setRedeemSuccess(null), 4000);
  };

  return (
    <div id="tienda-de-la-maestra" className="w-full">
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

      {/* Success Notification */}
      {redeemSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-400 rounded-xl flex items-center gap-3 text-emerald-900 text-xs sm:text-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1 font-medium">{redeemSuccess}</div>
          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            REGISTRADO
          </span>
        </div>
      )}

      {/* Categories Filter Bar (Touch / Mobile Friendly) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
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

      {/* Items Grid: Neobrutalist E-commerce Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => {
          const canAfford = stamps >= item.costStamps;
          const badge = categoryBadgeMap[item.category];

          return (
            <div
              key={item.id}
              className="uiverse-ecom-card group"
            >
              {/* Card Img area with decorative badge and icon */}
              <div className="uiverse-ecom-card-img">
                <span
                  className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono border ${badge.color}`}
                >
                  {badge.label}
                </span>

                <div className="p-3 bg-white border-2 border-slate-900 rounded-xl shadow-xs group-hover:scale-110 transition-transform">
                  {iconComponentMap[item.iconName] || <Sparkles className="w-6 h-6 text-amber-500" />}
                </div>

                {item.isPopular && (
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 border border-slate-900 font-mono">
                    Top
                  </span>
                )}

                {item.stampTypeRequired && (
                  <span className={`absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider font-mono border ${
                    item.stampTypeRequired === 'Tierra'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}>
                    {item.stampTypeRequired === 'Tierra' ? '🌱 Tierra' : '💧 Agua'}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="uiverse-card-title">
                  {item.title}
                </div>
                <div className="uiverse-card-subtitle" title={item.description}>
                  {item.description}
                </div>
              </div>

              {/* Condition / Stock limit info */}
              <div className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200/80 rounded-md p-1.5 line-clamp-1 italic">
                {item.condition}
              </div>

              {/* Divider */}
              <hr className="uiverse-card-divider" />

              {/* Footer with Price and Cart Button */}
              <div className="uiverse-card-footer">
                <div className="uiverse-card-price">
                  <span>Sellos:</span> {item.costStamps}
                </div>

                <button
                  type="button"
                  onClick={() => handleRedeem(item)}
                  title={canAfford ? `Canjear por ${item.costStamps} sellos` : `Requiere ${item.costStamps} sellos`}
                  className={`uiverse-card-btn ${canAfford ? 'can-afford' : ''}`}
                >
                  {/* SVG Cart from Uiverse.io */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z" />
                    <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z" />
                    <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z" />
                    <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info / Rules Footer Modal or Card */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Award className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-bold text-base font-['Quicksand'] text-slate-900">
                  {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                &times;
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Costo oficial:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {activeItem.costStamps} Sellos Formativos
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tus sellos actuales:</span>
                <span className="font-bold text-amber-600 font-mono">
                  {stamps} Sellos
                </span>
              </div>
              {stamps < activeItem.costStamps && (
                <div className="pt-2 text-[11px] text-rose-600 font-medium border-t border-slate-200">
                  ⚠️ Te faltan {activeItem.costStamps - stamps} sellos para canjear este beneficio. Acude a las clases prácticas y mantén tu bitácora sellada.
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setStamps((s) => s + activeItem.costStamps);
                  handleRedeem(activeItem);
                  setActiveItem(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-['Quicksand'] transition-all"
              >
                Simular canje (+{activeItem.costStamps} sellos)
              </button>
              <button
                onClick={() => setActiveItem(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
