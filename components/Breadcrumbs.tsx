'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeNameMap: Record<string, string> = {
  fisica: 'Física',
  'sensores-e-instrumentacion': 'Sensores e Instrumentación',
  'economia-sostenible': 'Economía Sostenible',
  'pura-energia': 'Pura Energía',
  'dinamica-de-clase': 'Dinámica de Clase',
  practicario: 'Practicario',
  'bitacora-de-laboratorio': 'Bitácora de Laboratorio',
  'reglamento-de-laboratorio': 'Reglamento de Laboratorio',
  'lectura-obligatoria': 'Lectura Obligatoria',
  'lectura-complementaria': 'Lectura Complementaria',
  'herramientas-digitales': 'Herramientas Digitales',
  rubricas: 'Rúbricas',
  presentaciones: 'Presentaciones',
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // If we are at root, breadcrumbs aren't necessary
  if (!pathname || pathname === '/' || pathname === '/panel' || pathname === '/registro') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const accumulatedPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label =
      routeNameMap[segment] ||
      decodeURIComponent(segment)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      label,
      href: accumulatedPath,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-white border-b border-[#E5E7EB] py-2.5 px-4 sm:px-8 text-xs text-[#4A4A4A]"
    >
      <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 overflow-x-auto whitespace-nowrap">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-[#1C1C1C] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only sm:not-sr-only">Inicio</span>
        </Link>

        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={item.href}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-[#1C1C1C] truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#1C1C1C] transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
