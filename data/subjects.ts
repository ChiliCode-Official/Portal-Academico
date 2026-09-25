import { SubjectItem } from '@/lib/types';

export const subjectsData: SubjectItem[] = [
  {
    id: 'fisica',
    title: 'FÍSICA',
    code: 'FIS-101',
    description: 'Fundamentos de mecánica clásica, termodinámica, electromagnetismo y experimentación de laboratorio para ingeniería.',
    href: '/fisica',
    iconName: 'Atom',
  },
  {
    id: 'economia-sostenible',
    title: 'ECONOMÍA SOSTENIBLE',
    code: 'ECO-204',
    description: 'Análisis de viabilidad económica, ciclos de vida de proyectos, modelos sustentables y transición energética.',
    href: '/economia-sostenible',
    iconName: 'TrendingUp',
  },
  {
    id: 'sensores-e-instrumentacion',
    title: 'SENSORES E INSTRUMENTACIÓN',
    code: 'INS-305',
    description: 'Principios de transducción, acondicionamiento de señales analógicas y digitales, metrología y adquisición de datos.',
    href: '/sensores-e-instrumentacion',
    iconName: 'Cpu',
  },
  {
    id: 'pura-energia',
    title: 'PURA ENERGÍA',
    code: 'ENE-402',
    description: 'Espacio transversal de investigación, termodinámica aplicada, fuentes renovables y proyectos de innovación energética.',
    href: '/pura-energia',
    iconName: 'Zap',
  },
];
