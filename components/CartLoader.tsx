'use client';

import React from 'react';
import './CartLoader.css';

interface CartLoaderProps {
  text?: string;
  className?: string;
  textColor?: string;
}

export default function CartLoader({
  text = 'Ver tienda',
  className = '',
  textColor,
}: CartLoaderProps) {
  return (
    <div className={`cart-loader ${className}`}>
      <div className="items-container">
        <div id="item-mobile" className="item" />
        <div id="item-laptop" className="item" />
        <div id="item-tab" className="item" />
        <div id="item-headphone" className="item" />
        <div id="item-mixer" className="item" />
      </div>

      <div id="cart-icon" />

      <div className="loading-text" style={textColor ? { color: textColor } : undefined}>
        {text}
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    </div>
  );
}
