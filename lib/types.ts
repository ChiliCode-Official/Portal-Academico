export interface DocumentItem {
  id: string;
  title: string;
  description?: string;
  category:
    | 'practicario'
    | 'bitacora'
    | 'reglamento'
    | 'lectura-obligatoria'
    | 'lectura-complementaria'
    | 'herramientas'
    | 'rubricas'
    | 'presentaciones'
    | 'dinamica'
    | 'general';
  subjectId:
    | 'fisica'
    | 'sensores-e-instrumentacion'
    | 'economia-sostenible'
    | 'pura-energia'
    | 'general';
  fileUrl: string; // Direct URL or Firebase Storage public download URL
  fileType: 'pdf' | 'doc' | 'image' | 'link';
  publishedAt: string;
  isAvailable: boolean;
}

export interface SubjectItem {
  id: string;
  title: string;
  code?: string;
  description: string;
  href: string;
  iconName?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
