'use client';

import React from 'react';
import './SensorAnimation.css';

interface SensorAnimationProps {
  className?: string;
}

export default function SensorAnimation({ className = '' }: SensorAnimationProps) {
  return (
    <div className={`sensor-loader-wrapper ${className}`} aria-hidden="true">
      <div className="sensor-loader-scaler">
        <div className="sensor-loader">
          <div className="sensor-dot" />
          <div className="sensor-dot" />
          <div className="sensor-dot" />
        </div>
      </div>
    </div>
  );
}
