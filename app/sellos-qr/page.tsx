import React from 'react';
import QRHubClientPage from '@/components/QRHubClientPage';

export const metadata = {
  title: 'Sellos QR | Escanear & Otorgar Sellos | Portal Académico',
  description: 'Panel para escanear y generar sellos QR de evaluación continua con cuenta Google institucional UVM.',
};

export default function SellosQRPage() {
  return <QRHubClientPage />;
}
