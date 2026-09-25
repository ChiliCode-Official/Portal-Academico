'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Copy, Check, Download, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { StampRedemptionCode } from '@/lib/firebase/models';

interface QRCodeDisplayProps {
  redemptionCode: StampRedemptionCode;
  onRefresh?: () => void;
}

export default function QRCodeDisplay({
  redemptionCode,
  onRefresh,
}: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Payload to encode in the QR code (JSON or direct code string)
    const payload = JSON.stringify({
      type: 'ACADEMIC_STAMP',
      code: redemptionCode.code,
      id: redemptionCode.id,
      stamp: redemptionCode.stampName,
      value: redemptionCode.stampValue,
      classId: redemptionCode.classId,
    });

    QRCode.toCanvas(
      canvasRef.current,
      payload,
      {
        width: 240,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
      },
      (error) => {
        if (error) console.error('QR Render Error:', error);
      }
    );
  }, [redemptionCode]);

  // Timer countdown
  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((redemptionCode.expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [redemptionCode.expiresAt]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(redemptionCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isExpired = secondsLeft <= 0;

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-xl flex flex-col items-center text-center max-w-sm mx-auto">
      {/* Badge with stamp value */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-mono bg-amber-100 text-amber-900 border border-amber-300 mb-3">
        <span>+{redemptionCode.stampValue} {redemptionCode.stampValue === 1 ? 'SELLO' : 'SELLOS'}</span>
        <span>&bull;</span>
        <span className="truncate max-w-[140px]">{redemptionCode.stampName}</span>
      </div>

      <h4 className="text-base font-bold text-slate-900 font-['Quicksand'] mb-1">
        {redemptionCode.className}
      </h4>
      <p className="text-xs text-slate-500 mb-4">
        Los estudiantes deben escanear este código con su teléfono desde su portal.
      </p>

      {/* QR Canvas Container with animation frame */}
      <div className="relative p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-md mb-4 flex items-center justify-center">
        <canvas ref={canvasRef} className="rounded-lg" />
        {isExpired && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-4">
            <AlertTriangle className="w-8 h-8 text-rose-500 mb-2" />
            <span className="text-xs font-bold text-rose-700 font-['Quicksand']">
              Código Expirado
            </span>
            <p className="text-[11px] text-slate-500 mt-1 mb-3">
              Por seguridad de clase, los sellos caducan periódicamente.
            </p>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold font-['Quicksand']"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Generar Nuevo</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Countdown Timer */}
      <div className="flex items-center gap-2 text-xs font-mono mb-4">
        <Clock className={`w-4 h-4 ${isExpired ? 'text-rose-500' : 'text-amber-600'}`} />
        <span className={`font-bold ${isExpired ? 'text-rose-600' : 'text-slate-700'}`}>
          {isExpired ? 'Expirado' : `Válido por: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </span>
      </div>

      {/* Manual Code with copy button */}
      <div className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
        <span className="font-mono text-slate-700 font-bold tracking-wider truncate">
          {redemptionCode.code}
        </span>
        <button
          onClick={handleCopyCode}
          className="ml-2 px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 flex items-center gap-1 shrink-0 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Claims count counter */}
      <div className="mt-3 text-[11px] text-slate-500 font-mono">
        Alumnos que lo han reclamado: <strong className="text-slate-900">{redemptionCode.claimedCount}</strong>
      </div>
    </div>
  );
}
