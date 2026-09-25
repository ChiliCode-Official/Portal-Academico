'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, BookOpen } from 'lucide-react';
import GlobalSearchModal from '@/components/GlobalSearchModal';
import AtomLoader from '@/components/AtomLoader';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Página principal', href: '/' },
    { label: 'Dinámica de Clase', href: '/dinamica-de-clase' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 text-[#1C1C1C] hover:opacity-90 transition-opacity shrink-0"
          >
            <AtomLoader />
            <div>
              <span className="text-base sm:text-lg font-bold font-['Quicksand'] tracking-tight block leading-none">
                Portal Académico
              </span>
              <span className="text-[10px] text-[#4A4A4A] tracking-wider uppercase font-medium">
                Ingeniería & Docencia
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors font-['Quicksand'] ${
                    isActive
                      ? 'bg-slate-100 text-[#1C1C1C] font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#1C1C1C] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#4A4A4A] bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] rounded-lg transition-colors"
              aria-label="Abrir buscador global"
              title="Buscar en todo el repositorio (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Buscar recursos...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
                Ctrl K
              </kbd>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-[#1C1C1C] hover:bg-slate-100 rounded-lg md:hidden transition-colors"
              aria-label="Alternar menú de navegación"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-slate-100 text-[#1C1C1C] font-semibold'
                      : 'text-[#4A4A4A] hover:bg-slate-50 hover:text-[#1C1C1C]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#E5E7EB] mt-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Portales por Asignatura
              </div>
              <Link
                href="/fisica"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#4A4A4A] hover:text-[#1C1C1C]"
              >
                <BookOpen className="w-3.5 h-3.5" /> Física
              </Link>
              <Link
                href="/sensores-e-instrumentacion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#4A4A4A] hover:text-[#1C1C1C]"
              >
                <BookOpen className="w-3.5 h-3.5" /> Sensores e Instrumentación
              </Link>
              <Link
                href="/economia-sostenible"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#4A4A4A] hover:text-[#1C1C1C]"
              >
                <BookOpen className="w-3.5 h-3.5" /> Economía Sostenible
              </Link>
              <Link
                href="/pura-energia"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#4A4A4A] hover:text-[#1C1C1C]"
              >
                <BookOpen className="w-3.5 h-3.5" /> Pura Energía
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
