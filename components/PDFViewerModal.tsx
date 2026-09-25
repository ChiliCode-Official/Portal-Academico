'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, Download, AlertCircle } from 'lucide-react';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
}

export default function PDFViewerModal({
  isOpen,
  onClose,
  title,
  fileUrl,
}: PDFViewerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col border border-[#E5E7EB] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-slate-50">
          <div className="flex items-center space-x-3 truncate mr-4">
            <span className="text-xs font-semibold uppercase tracking-wider bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
              Visor Seguro
            </span>
            <h2 id="modal-title" className="text-base font-semibold text-[#1C1C1C] truncate">
              {title}
            </h2>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 hover:text-[#1C1C1C] hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Pestaña nueva</span>
            </a>
            <a
              href={fileUrl}
              download
              className="p-2 text-slate-600 hover:text-[#1C1C1C] hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Descargar documento"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#1C1C1C] hover:bg-slate-200 rounded-lg transition-colors ml-1"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content iframe */}
        <div className="flex-1 w-full bg-slate-100 relative">
          <iframe
            src={`${fileUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-0"
            title={title}
          />
          <div className="absolute bottom-4 right-4 bg-white/90 border border-slate-200 text-xs text-slate-600 px-3 py-1.5 rounded-md shadow-xs flex items-center gap-2 pointer-events-none">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Documento oficial de cátedra institucional</span>
          </div>
        </div>
      </div>
    </div>
  );
}
