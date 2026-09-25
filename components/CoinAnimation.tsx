'use client';

import React from 'react';
import './CoinAnimation.css';

interface CoinAnimationProps {
  className?: string;
}

export default function CoinAnimation({ className = '' }: CoinAnimationProps) {
  return (
    <div className={`coin-wrapper ${className}`} aria-hidden="true">
      <div className="coin-scaler">
        <div className="coin">
          <span className="engraving">$</span>
        </div>
      </div>
    </div>
  );
}
