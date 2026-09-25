'use client';

import React from 'react';
import './PhysicsAnimation.css';

interface PhysicsAnimationProps {
  className?: string;
}

export default function PhysicsAnimation({ className = '' }: PhysicsAnimationProps) {
  return (
    <div className={`physics-seesaw-wrapper ${className}`} aria-hidden="true">
      <div className="physics-seesaw-scaler">
        <div className="physics-bar">
          <div className="physics-ball" />
        </div>
      </div>
    </div>
  );
}
