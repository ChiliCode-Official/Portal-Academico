'use client';

import React from 'react';
import './BatteryAnimation.css';

interface BatteryAnimationProps {
  className?: string;
}

export default function BatteryAnimation({ className = '' }: BatteryAnimationProps) {
  return (
    <div className={`battery-wrapper ${className}`} aria-hidden="true">
      <div className="battery-scaler">
        <div className="battery-loader" />
      </div>
    </div>
  );
}
