'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, LogOut } from 'lucide-react';
import GlobalSearchModal from '@/components/GlobalSearchModal';
import AtomLoader from '@/components/AtomLoader';
import { useAuth } from '@/lib/firebase/AuthContext';

export default function Header() {
  const { user, signOut, authError, clearAuthError } = useAuth();
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
    { label: 'Inicio', href: '/' },
    { label: 'Materias', href: '/#materias' },
  ];

  return (
    <>
      {authError && (
        <div className="bg-rose-50 border-b-2 border-rose-400 px-4 py-2.5 text-xs text-rose-900 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1">
            <span className="font-bold uppercase tracking-wider font-mono text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded">
              Aviso de Acceso
            </span>
            <span className="leading-snug">{authError}</span>
          </div>
          <button
            onClick={() => clearAuthError()}
            className="text-rose-700 hover:text-rose-950 font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}
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

          {/* Search Trigger, User Auth and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#4A4A4A] bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] rounded-lg transition-colors"
              aria-label="Abrir buscador global"
              title="Buscar en todo el repositorio (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Buscar...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
                Ctrl K
              </kbd>
            </button>

            {/* Google User Auth */}
            {user ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
                {/* El perfil es la entrada única al panel personal. */}
                <Link
                  href="/panel"
                  className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-black transition-all cursor-pointer group"
                  title={`Abrir mi panel. Conectado como ${user.displayName || user.email}`}
                  aria-label="Abrir mi panel"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border-2 border-black object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-300 border-2 border-black flex items-center justify-center font-bold text-xs font-mono group-hover:scale-105 transition-transform">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                </Link>

                {/* Logout button */}
                <button
                  onClick={() => signOut()}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/panel"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-black rounded-xl text-xs font-black font-['Quicksand'] uppercase tracking-wider transition-all shadow-[2px_2px_0_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>Acceder</span>
              </Link>
            )}

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
            <Link href="/panel" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Mi panel</Link>
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
