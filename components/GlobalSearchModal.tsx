'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Search, X, FileText, BookOpen, ArrowRight, CornerDownLeft } from 'lucide-react';
import { DocumentItem, SubjectItem } from '@/lib/types';
import { useCourseContent } from './CourseContent';
import { subjectsData } from '@/data/subjects';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const { documents: catalogDocuments, pages, error } = useCourseContent();
  const documentsData = useMemo(() => error ? [] : catalogDocuments.filter(item => item.published && pages[`${item.subjectId}--${item.category}`]?.visible !== false), [catalogDocuments, pages, error]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Triggered elsewhere or toggles modal
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  // Search filter
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        subjects: subjectsData.slice(0, 4),
        documents: documentsData.slice(0, 5),
      };
    }

    const matchedSubjects = subjectsData.filter(
      (sub) =>
        sub.title.toLowerCase().includes(q) ||
        sub.description.toLowerCase().includes(q) ||
        (sub.code && sub.code.toLowerCase().includes(q))
    );

    const matchedDocuments = documentsData.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        (doc.description && doc.description.toLowerCase().includes(q)) ||
        doc.category.toLowerCase().includes(q) ||
        doc.subjectId.toLowerCase().includes(q)
    );

    return {
      subjects: matchedSubjects,
      documents: matchedDocuments,
    };
  }, [query, documentsData]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda global"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-[#E5E7EB] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E7EB] gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar asignaturas, bitácoras, practicarios, lecturas o reglamentos..."
            className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder-slate-400 focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded shadow-xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Subjects results */}
          {filteredResults.subjects.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                Asignaturas y Portales
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.subjects.map((sub: SubjectItem) => (
                  <Link
                    key={sub.id}
                    href={sub.href}
                    onClick={onClose}
                    className="flex items-start gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:border-slate-400 hover:bg-slate-50 transition-all group"
                  >
                    <BookOpen className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#1C1C1C] uppercase group-hover:text-black">
                        {sub.title}
                      </div>
                      <div className="text-[11px] text-[#4A4A4A] truncate">
                        {sub.code ? `${sub.code} • ` : ''}
                        {sub.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Documents results */}
          {filteredResults.documents.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                Documentos Académicos
              </div>
              <div className="space-y-1.5">
                {filteredResults.documents.map((doc: DocumentItem) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB] hover:border-slate-400 hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-2">
                      <FileText className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#1C1C1C] group-hover:text-black line-clamp-1">
                          {doc.title}
                        </div>
                        <div className="text-[11px] text-[#4A4A4A] line-clamp-1">
                          {doc.description || `Categoría: ${doc.category}`}
                        </div>
                      </div>
                    </div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="shrink-0 p-1.5 text-xs text-slate-500 hover:text-[#1C1C1C] hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredResults.subjects.length === 0 &&
            filteredResults.documents.length === 0 && (
              <div className="text-center py-12 text-[#4A4A4A]">
                <p className="text-sm font-medium">
                  No se encontraron resultados para &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Intente buscando términos como &ldquo;física&rdquo;, &ldquo;bitácora&rdquo;, &ldquo;sensores&rdquo; o &ldquo;sellos&rdquo;.
                </p>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navegue con rapidez en el repositorio</span>
          </div>
          <div className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" />
            <span>Presione ESC para salir</span>
          </div>
        </div>
      </div>
    </div>
  );
}
