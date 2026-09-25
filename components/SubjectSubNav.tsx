'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavItem {
  label: string;
  href: string;
}

interface SubjectSubNavProps {
  basePath: string;
  items: SubNavItem[];
}

export default function SubjectSubNav({ basePath, items }: SubjectSubNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-[#E5E7EB] bg-white overflow-x-auto scrollbar-none mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
      <nav className="flex space-x-1.5 sm:space-x-2 py-2.5 px-0.5 text-xs font-medium font-['Quicksand'] whitespace-nowrap">
        <Link
          href={basePath}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            pathname === basePath
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-[#4A4A4A] hover:bg-slate-100 hover:text-[#1C1C1C]'
          }`}
        >
          General & Syllabus
        </Link>

        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-[#4A4A4A] hover:bg-slate-100 hover:text-[#1C1C1C]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
