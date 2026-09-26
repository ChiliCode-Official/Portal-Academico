export interface ShopProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  costStamps: number;
  classId: string;
  stampTypeId: string;
  active: boolean;
  condition: string;
  iconName: string;
  color: string;
  isPopular: boolean;
}
export interface ShopCategory { id: string; label: string; active: boolean }
export const defaultShopCategories: ShopCategory[] = [
  { id: 'examen', label: 'Exámenes', active: true },
  { id: 'tarea', label: 'Tareas', active: true },
  { id: 'laboratorio', label: 'Laboratorio', active: true },
  { id: 'participacion', label: 'Puntos', active: true },
  { id: 'comodin', label: 'Especiales', active: true },
];
export const productColor = (value: unknown) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : '#7c3aed';
export function readShopProduct(id: string, data: Record<string, unknown>): ShopProduct {
  return { id, title: String(data.title || ''), description: String(data.description || ''), category: String(data.category || 'comodin'), costStamps: Number(data.costStamps) || 1, classId: String(data.classId || ''), stampTypeId: String(data.stampTypeId || ''), active: data.active !== false, condition: String(data.condition || ''), iconName: String(data.iconName || 'gift'), color: productColor(data.color), isPopular: data.isPopular === true };
}
export function mergeShopCategories(items: ShopCategory[]): ShopCategory[] {
  const merged = new Map(defaultShopCategories.map(item => [item.id, item]));
  items.forEach(item => merged.set(item.id, item));
  return [...merged.values()];
}
