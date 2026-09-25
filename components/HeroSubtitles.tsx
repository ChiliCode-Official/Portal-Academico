'use client';

import React, { useState, useEffect } from 'react';

interface HeroSubtitlesProps {
  nameText?: string;
  descText?: string;
  delayMs?: number;
}

export default function HeroSubtitles({
  nameText = 'Xochitl M. Zapata M.',
  descText = 'Plataforma centralizada para la consulta de programas analíticos, manuales de laboratorio, bitácoras experimentales y dinámicas pedagógicas.',
  delayMs = 1500,
}: HeroSubtitlesProps) {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');
  const [stage, setStage] = useState<'waiting' | 'typingName' | 'typingDesc' | 'done'>('waiting');

  useEffect(() => {
    // 1.5s initial delay before starting
    const startTimer = setTimeout(() => {
      setStage('typingName');
    }, delayMs);

    return () => clearTimeout(startTimer);
  }, [delayMs]);

  useEffect(() => {
    if (stage !== 'typingName') return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedName(nameText.slice(0, index));
      if (index >= nameText.length) {
        clearInterval(interval);
        // Small pause before typing description
        setTimeout(() => {
          setStage('typingDesc');
        }, 300);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [stage, nameText]);

  useEffect(() => {
    if (stage !== 'typingDesc') return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedDesc(descText.slice(0, index));
      if (index >= descText.length) {
        clearInterval(interval);
        setStage('done');
      }
    }, 20);

    return () => clearInterval(interval);
  }, [stage, descText]);

  return (
    <div className="flex flex-col items-center">
      {/* Name subtitle */}
      <div className="min-h-[44px] flex items-center justify-center">
        <p className="text-2xl sm:text-3xl text-slate-800 font-['Pacifico'] inline-flex items-center">
          <span>{displayedName}</span>
          {stage === 'typingName' && (
            <span className="inline-block w-1 h-6 ml-1 bg-slate-800 animate-pulse" />
          )}
        </p>
      </div>

      {/* Description paragraph */}
      <div className="min-h-[64px] flex items-center justify-center max-w-2xl mx-auto mt-2 mb-4">
        <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed text-center">
          {displayedDesc}
          {(stage === 'typingDesc' || stage === 'waiting' && displayedName.length > 0) && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-blue-600 animate-pulse align-middle" />
          )}
        </p>
      </div>
    </div>
  );
}
