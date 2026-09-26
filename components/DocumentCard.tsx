'use client';

import React, { useState } from 'react';
import { FileText, Download, Eye, Clock, FileSpreadsheet, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import PDFViewerModal from '@/components/PDFViewerModal';
import DocumentDownload from './DocumentDownload';

interface DocumentCardProps {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'image' | 'link';
  isAvailable?: boolean;
  publishedAt?: string;
}

export default function DocumentCard({
  title,
  description,
  fileUrl,
  fileType = 'pdf',
  isAvailable = true,
  publishedAt,
}: DocumentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBadge = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
            <FileText className="w-3 h-3" /> PDF
          </span>
        );
      case 'doc':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
            <FileSpreadsheet className="w-3 h-3" /> DOC
          </span>
        );
      case 'image':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ImageIcon className="w-3 h-3" /> IMG
          </span>
        );
      case 'link':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
            <LinkIcon className="w-3 h-3" /> ENLACE
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <article className="group bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 p-5 flex flex-col justify-between transition-all duration-150">
        <div>
          {/* Header Row: Badge & Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>{getBadge()}</div>
            {!isAvailable ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Próximamente
              </span>
            ) : publishedAt ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#4A4A4A]">
                <Clock className="w-3 h-3" />
                {publishedAt}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#1C1C1C] group-hover:text-black line-clamp-2 leading-snug font-['Quicksand']">
            {title}
          </h3>

          {/* Subtitle / Description */}
          {description && (
            <p className="mt-2 text-xs text-[#4A4A4A] line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center gap-2">
          {isAvailable ? (
            <>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1C1C1C] bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] rounded-lg transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver documento</span>
              </button>

              <DocumentDownload
                fileUrl={fileUrl}
                title={title}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-[#E5E7EB] rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Descargar</span>
              </DocumentDownload>
            </>
          ) : (
            <div className="w-full text-center py-1.5 text-xs text-[#4A4A4A] italic bg-slate-50 rounded-lg border border-slate-100">
              Contenido en preparación
            </div>
          )}
        </div>
      </article>

      {/* PDF Modal */}
      {isAvailable && (
        <PDFViewerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          fileUrl={fileUrl}
        />
      )}
    </>
  );
}
