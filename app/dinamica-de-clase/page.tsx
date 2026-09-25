import React from 'react';
import DinamicaClientPage from '@/components/DinamicaClientPage';
import { getDocumentsByCategory } from '@/lib/firebase/db';

export const metadata = {
  title: 'Dinámica de Clase & Sellos QR | Portal Académico',
  description: 'Panel de la maestra para otorgar sellos QR, panel del alumno para escanear y tienda de habilidades.',
};

export default async function DinamicaDeClasePage() {
  const documents = await getDocumentsByCategory('dinamica');

  return <DinamicaClientPage documents={documents} />;
}
