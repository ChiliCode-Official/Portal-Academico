import React from 'react';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'Material disponible próximamente',
  description = 'Este módulo se encuentra en proceso de revisión y homologación académica para el periodo actual.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-[#E5E7EB] bg-white my-6 transition-colors">
      <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4 border border-slate-100">
        {icon || <FileQuestion className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2 font-['Quicksand']">
        {title}
      </h3>
      <p className="text-sm text-[#4A4A4A] max-w-md mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}
