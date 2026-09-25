export interface ShopItem {
  id: string;
  title: string;
  description: string;
  category: 'examen' | 'tarea' | 'laboratorio' | 'participacion' | 'comodin';
  costStamps: number;
  stockLimit?: string;
  condition: string;
  iconName: 'zap' | 'shield' | 'clock' | 'file-check' | 'star' | 'gift' | 'sparkles' | 'award';
  isPopular?: boolean;
}

export const shopItemsData: ShopItem[] = [
  {
    id: 'perdon-retardo-tarea',
    title: 'Prorroga Extra para Tarea (24h)',
    description: 'Permite entregar una tarea o reporte individual con hasta 24 horas de prórroga sin penalización en la calificación.',
    category: 'tarea',
    costStamps: 3,
    stockLimit: 'Máximo 2 por parcial',
    condition: 'Avisar a la profesora antes del vencimiento original vía correo o en clase.',
    iconName: 'clock',
    isPopular: true,
  },
  {
    id: 'comodin-pregunta-examen',
    title: 'Comodín de Pregunta en Examen Teórico',
    description: 'Anula o convalida los puntos de una pregunta de opción múltiple o teórica en la que hayas tenido error durante el examen.',
    category: 'examen',
    costStamps: 6,
    stockLimit: '1 por parcial',
    condition: 'Canjeable únicamente durante la revisión del examen parcial oficial.',
    iconName: 'zap',
    isPopular: true,
  },
  {
    id: 'decima-extra-promedio',
    title: '+0.5 Puntos Directos en Evaluación Continua',
    description: 'Suma medio punto (+0.5) directo a tu promedio de actividades y tareas del parcial vigente.',
    category: 'participacion',
    costStamps: 5,
    stockLimit: 'Máximo 2 canjes por parcial',
    condition: 'Requiere tener el 80% de tareas previamente entregadas.',
    iconName: 'star',
    isPopular: true,
  },
  {
    id: 'pase-salvavidas-laboratorio',
    title: 'Pase Salvavidas en Práctica de Laboratorio',
    description: 'Permite reponer una práctica no realizada o justificar un retraso menor en la entrega del reporte experimental.',
    category: 'laboratorio',
    costStamps: 4,
    stockLimit: '1 por semestre',
    condition: 'Sujeto a entrega de bitácora con los cálculos teóricos completos.',
    iconName: 'shield',
  },
  {
    id: 'asesoria-personalizada-vip',
    title: 'Sesión 1 a 1 de Resolución de Dudas de Proyecto',
    description: '30 minutos de asesoría personalizada con la Prof. Xochitl para revisión a fondo de circuito, código o prototipo final.',
    category: 'comodin',
    costStamps: 3,
    stockLimit: 'Disponible según agenda',
    condition: 'Agendar con 48 horas de anticipación en horario convenido.',
    iconName: 'sparkles',
  },
  {
    id: 'eleccion-equipo-laboratorio',
    title: 'Selección Libre de Mesa y Equipo de Trabajo',
    description: 'Prioridad de elección de mesa de trabajo, estación experimental e integrantes de equipo en la siguiente práctica.',
    category: 'laboratorio',
    costStamps: 2,
    stockLimit: 'Ilimitado',
    condition: 'Canjear al inicio de la sesión antes del pase de lista.',
    iconName: 'award',
  },
  {
    id: 'borron-cuenta-nueva-firmas',
    title: 'Convalidación de Firma Faltante en Bitácora',
    description: 'Repone una firma o sello de revisión formativa de avances en libreta o bitácora de notas.',
    category: 'participacion',
    costStamps: 4,
    stockLimit: 'Máximo 1 por parcial',
    condition: 'Presentar la libreta debidamente al corriente de temas.',
    iconName: 'file-check',
  },
  {
    id: 'puntos-oro-examen-final',
    title: '+1.0 Punto Extra en Examen Departamental/Parcial',
    description: 'La máxima recompensa académica: suma un punto entero a tu calificación obtenida en el examen escrito.',
    category: 'examen',
    costStamps: 10,
    stockLimit: '1 por estudiante en todo el curso',
    condition: 'Haber mantenido asistencia perfecta y entrega puntual de reportes.',
    iconName: 'gift',
    isPopular: true,
  },
];
