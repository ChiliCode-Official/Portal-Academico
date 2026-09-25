import React from 'react';
import Link from 'next/link';
import { Atom, TrendingUp, Cpu, Zap, ArrowRight, BookOpen } from 'lucide-react';
import { SubjectItem } from '@/lib/types';

interface SubjectCardProps {
  subject: SubjectItem;
}

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-6 h-6 text-slate-700" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-slate-700" />,
  Cpu: <Cpu className="w-6 h-6 text-slate-700" />,
  Zap: <Zap className="w-6 h-6 text-slate-700" />,
};

export default function SubjectCard({ subject }: SubjectCardProps) {
  const icon = (subject.iconName && iconMap[subject.iconName]) || (
    <BookOpen className="w-6 h-6 text-slate-700" />
  );

  return (
    <Link
      href={subject.href}
      className="group bg-white rounded-xl border border-[#E5E7EB] hover:border-slate-400 p-6 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg group-hover:bg-slate-100 transition-colors">
            {icon}
          </div>
          {subject.code && (
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded tracking-wider uppercase font-mono">
              {subject.code}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[#1C1C1C] uppercase tracking-wide font-['Quicksand'] mb-2 group-hover:text-black">
          {subject.title}
        </h3>

        <p className="text-xs text-[#4A4A4A] leading-relaxed line-clamp-3">
          {subject.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-black">
        <span>Acceder al portal</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
