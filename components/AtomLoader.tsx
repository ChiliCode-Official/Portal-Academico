'use client';

import React from 'react';
import './AtomLoader.css';

interface AtomLoaderProps {
  className?: string;
}

export default function AtomLoader({ className = '' }: AtomLoaderProps) {
  return (
    <div className={`navbar-atom-wrapper ${className}`} aria-hidden="true">
      <div className="navbar-atom-scaler">
        <span className="atom-loader" />
      </div>
    </div>
  );
}
