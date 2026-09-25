'use client';

import React from 'react';
import './PencilLoader.css';

interface PencilBadgeProps {
  text?: string;
  className?: string;
}

export default function PencilBadge({
  text = 'Repositorio Docente Institucional de Ingeniería',
  className = ''
}: PencilBadgeProps) {
  return (
    <div className={`pencil-loader-container ${className}`}>
      <span className="pencil-loader-text font-mono">
        {text}
      </span>
      <div className="pencil-loader" />
    </div>
  );
}
