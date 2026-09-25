export interface ShopItem {
  id: string;
  title: string;
  description: string;
  category: 'examen' | 'tarea' | 'laboratorio' | 'participacion' | 'comodin';
  costStamps: number;
  stampTypeRequired: 'Agua' | 'Tierra' | 'Cualquiera';
  stockLimit?: string;
  condition: string;
  iconName: 'zap' | 'shield' | 'clock' | 'file-check' | 'star' | 'gift' | 'sparkles' | 'award';
  isPopular?: boolean;
}

export const shopItemsData: ShopItem[] = [
  // --- 1er Parcial: Recompensas Oficiales Gashapon (3 sellos Agua) ---
  {
    id: 'gashapon-carta-de-tiempo',
    title: 'Carta de tiempo',
    description: 'Otorga tiempo de gracia incondicional para entregar una práctica o reporte el día de la entrega, sin penalización por retardo.',
    category: 'tarea',
    costStamps: 3,
    stampTypeRequired: 'Agua',
    stockLimit: '1er Parcial',
    condition: 'Canjeable con 3 sellos de Agua el mismo día de la entrega de la práctica o reporte.',
    iconName: 'clock',
    isPopular: true,
  },
  {
    id: 'gashapon-paso-flash',
    title: 'Paso Flash',
    description: 'En días de revisión de proyectos o actividades uno a uno, te saltas toda la fila para ser revisado prioritariamente.',
    category: 'comodin',
    costStamps: 3,
    stampTypeRequired: 'Agua',
    stockLimit: '1er Parcial',
    condition: 'Canjeable con 3 sellos de Agua al inicio de la sesión de revisión.',
    iconName: 'zap',
    isPopular: true,
  },
  {
    id: 'gashapon-shuriken',
    title: 'Shuriken',
    description: 'Derecho a subir la calificación de una actividad o bitácora. (El estudiante debe mejorar el área de oportunidad).',
    category: 'laboratorio',
    costStamps: 3,
    stampTypeRequired: 'Agua',
    stockLimit: '1er Parcial',
    condition: 'Canjeable con 3 sellos de Agua presentando la corrección y mejora técnica solicitada.',
    iconName: 'award',
    isPopular: true,
  },

  // --- 1er Parcial: Recompensas Oficiales Gashapon (4 sellos Agua) ---
  {
    id: 'gashapon-carta-espejo',
    title: 'Carta espejo',
    description: 'Solicita ver un ejemplo resuelto tipo examen antes de realizarlo para guiarte en el procedimiento analítico.',
    category: 'examen',
    costStamps: 4,
    stampTypeRequired: 'Agua',
    stockLimit: '1er Parcial',
    condition: 'Canjeable con 4 sellos de Agua en la sesión previa de repaso al examen parcial.',
    iconName: 'sparkles',
    isPopular: true,
  },
  {
    id: 'gashapon-genjutsu',
    title: 'Genjutsu',
    description: 'Compra de una insignia por personalidad de estudiante introvertido para convalidar dinámicas de oratoria/exposición.',
    category: 'participacion',
    costStamps: 4,
    stampTypeRequired: 'Agua',
    stockLimit: '1er Parcial',
    condition: 'Canjeable con 4 sellos de Agua con acreditación de trabajo individual sobresaliente.',
    iconName: 'gift',
  },

  // --- 1er Parcial: Recompensas Oficiales Gashapon (1 sello Tierra) ---
  {
    id: 'gashapon-respiracion-del-sol',
    title: 'Respiración del Sol',
    description: 'Otorga el derecho para entregar una actividad o reporte después del día de entrega sin ninguna penalización por retardo.',
    category: 'tarea',
    costStamps: 1,
    stampTypeRequired: 'Tierra',
    stockLimit: 'Nivel Tierra',
    condition: 'Canjeable con 1 sello de Tierra (desbloqueado con 5 sellos de Agua).',
    iconName: 'star',
    isPopular: true,
  },
  {
    id: 'gashapon-kunai',
    title: 'Kunai',
    description: 'Derecho a llevar un formulario o apunte escrito a mano (tamaño media carta) en el examen teórico.',
    category: 'examen',
    costStamps: 1,
    stampTypeRequired: 'Tierra',
    stockLimit: 'Nivel Tierra',
    condition: 'Canjeable con 1 sello de Tierra. El formulario debe estar estrictamente hecho a mano.',
    iconName: 'shield',
    isPopular: true,
  },
];
