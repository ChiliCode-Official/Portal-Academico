'use client';

import { useState } from 'react';
import { Award, BookOpen, CalendarDays, CheckCheck, Clock, Coffee, Crown, Diamond, FileCheck, Flame, FlaskConical, Gift, GraduationCap, Heart, Leaf, Medal, Rocket, Shield, Sparkles, Star, Ticket, Trophy, WandSparkles, Zap } from 'lucide-react';
import { productColor, ShopProduct } from '@/lib/shop';
import './EcomCard.css';

export const productIcons = [
  { id: 'gift', label: 'Regalo', icon: Gift }, { id: 'star', label: 'Estrella', icon: Star },
  { id: 'zap', label: 'Rayo', icon: Zap }, { id: 'clock', label: 'Tiempo', icon: Clock },
  { id: 'shield', label: 'Escudo', icon: Shield }, { id: 'file-check', label: 'Entrega', icon: FileCheck },
  { id: 'award', label: 'Insignia', icon: Award }, { id: 'sparkles', label: 'Especial', icon: Sparkles },
  { id: 'book', label: 'Libro', icon: BookOpen }, { id: 'calendar', label: 'Calendario', icon: CalendarDays },
  { id: 'check', label: 'Aprobado', icon: CheckCheck }, { id: 'coffee', label: 'Descanso', icon: Coffee },
  { id: 'crown', label: 'Corona', icon: Crown }, { id: 'diamond', label: 'Diamante', icon: Diamond },
  { id: 'fire', label: 'Fuego', icon: Flame }, { id: 'flask', label: 'Laboratorio', icon: FlaskConical },
  { id: 'graduation', label: 'Graduación', icon: GraduationCap }, { id: 'heart', label: 'Corazón', icon: Heart },
  { id: 'leaf', label: 'Hoja', icon: Leaf }, { id: 'medal', label: 'Medalla', icon: Medal },
  { id: 'rocket', label: 'Cohete', icon: Rocket }, { id: 'ticket', label: 'Pase', icon: Ticket },
  { id: 'trophy', label: 'Trofeo', icon: Trophy }, { id: 'wand', label: 'Comodín', icon: WandSparkles },
];
export function ProductIcon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const Icon = (productIcons.find(item => item.id === name) || productIcons[0]).icon;
  return <Icon className={className} aria-hidden="true" />;
}
export function ProductAppearancePicker({ iconName, color, onIconChange, onColorChange }: { iconName: string; color: string; onIconChange: (name: string) => void; onColorChange: (value: string) => void }) {
  const [search, setSearch] = useState('');
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const icons = productIcons.filter(item => normalize(item.label).includes(normalize(search)));
  return <fieldset className="rounded-xl border border-slate-200 p-3">
    <legend className="px-1 text-sm font-bold">Icono y color del producto</legend>
    <label className="block text-xs text-slate-600">Buscar icono<input value={search} onChange={event => setSearch(event.target.value)} className="my-2 w-full rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900" placeholder="Regalo, laboratorio, tiempo…" /></label>
    <div className="grid max-h-60 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-6">{icons.map(item => <button type="button" key={item.id} aria-pressed={iconName === item.id} onClick={() => onIconChange(item.id)} title={item.label} className={`flex flex-col items-center gap-1 rounded-lg border-2 p-2 transition-all hover:-translate-y-0.5 ${iconName === item.id ? 'border-slate-900 bg-amber-50 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}><ProductIcon name={item.id} /><span className="text-[10px] text-slate-800">{item.label}</span></button>)}</div>
    {!icons.length && <p className="p-3 text-sm text-slate-600">No se encontraron iconos.</p>}
    <label className="mt-4 flex items-center gap-3 text-sm font-semibold">Color<input type="color" value={color} onChange={event => onColorChange(event.target.value)} className="h-10 w-14 cursor-pointer rounded border border-slate-300 bg-white p-1" /><span className="font-mono text-xs text-slate-500">{color}</span></label>
    <div className="mt-2 flex flex-wrap gap-2">{['#7c3aed','#2563eb','#0891b2','#16a34a','#dc2626','#ea580c','#ca8a04','#db2777','#0f172a'].map(value => <button type="button" key={value} onClick={() => onColorChange(value)} aria-label={`Elegir color ${value}`} aria-pressed={color === value} style={{ backgroundColor: value }} className={`h-7 w-7 rounded-full border-2 ${color === value ? 'ring-2 ring-slate-900 ring-offset-2' : ''}`} />)}</div>
  </fieldset>;
}

export function ProductCard({ product, categoryLabel, stampLabel, action }: { product: ShopProduct; categoryLabel: string; stampLabel: string; action?: React.ReactNode }) {
  const color = productColor(product.color);
  const rgb = [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16));
  const foreground = rgb[0] * .299 + rgb[1] * .587 + rgb[2] * .114 > 155 ? '#111827' : '#ffffff';
  return <article className="uiverse-ecom-card group">
    <div className="uiverse-ecom-card-img !min-h-36" style={{ backgroundColor: `${color}12`, borderColor: `${color}66` }}>
      <span className="absolute left-2 top-2 max-w-[75%] truncate rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-800">{categoryLabel}</span>
      <div className="rounded-xl border-2 border-slate-900 p-3 shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: color, color: foreground }}><ProductIcon name={product.iconName} className="h-7 w-7" /></div>
      {product.isPopular && <span className="absolute right-2 top-2 rounded border border-slate-900 bg-amber-400 px-1 text-[9px] font-black text-slate-950">TOP</span>}
      <span className="absolute bottom-2 left-2 right-2 truncate text-center text-[10px] font-semibold text-slate-700" title={stampLabel}>{stampLabel}</span>
    </div>
    <div className="space-y-2"><h3 className="uiverse-card-title">{product.title || 'Nombre del producto'}</h3>{product.description && <p className="uiverse-card-subtitle">{product.description}</p>}</div>
    {product.condition && <p className="rounded-md border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600">{product.condition}</p>}
    <hr className="uiverse-card-divider" />
    <div className="uiverse-card-footer"><div className="uiverse-card-price"><span>Sellos:</span> {product.costStamps}</div>{action}</div>
  </article>;
}
