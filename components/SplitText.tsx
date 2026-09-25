'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: keyof React.JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  tag = 'h2',
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const animatedRef = useRef(false);

  const items = splitType === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined' || animatedRef.current) return;

    const targets = el.querySelectorAll('[data-split-unit]');
    if (!targets.length) return;

    gsap.set(targets, { ...from });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        animatedRef.current = true;
        gsap.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            onLetterAnimationComplete?.();
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [text, delay, duration, ease, from, to, onLetterAnimationComplete]);

  const Tag = tag as any;

  return (
    <Tag
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ textAlign, willChange: 'transform, opacity' }}
    >
      {items.map((unit, i) => (
        <span
          key={i}
          data-split-unit
          style={{ display: 'inline-block', whiteSpace: unit === ' ' ? 'pre' : 'normal' }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </span>
      ))}
    </Tag>
  );
}
