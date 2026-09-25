'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, RefreshCw, AlertCircle, X } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export default function QRScannerModal({
  isOpen,
  onClose,
  onScanSuccess,
}: QRScannerModalProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isStoppingRef = useRef(false);
  const readerElementId = 'qr-camera-stream';

  const stopScannerSafely = useCallback(async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    const scanner = scannerRef.current;
    if (scanner) {
      try {
        if (scanner.isScanning) {
          await scanner.stop();
        }
        await scanner.clear();
      } catch (e) {
        console.warn('Silent scanner cleanup:', e);
      } finally {
        scannerRef.current = null;
      }
    }
    setIsScanning(false);
    isStoppingRef.current = false;
  }, []);

  const handleClose = useCallback(async () => {
    await stopScannerSafely();
    onClose();
  }, [stopScannerSafely, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    isStoppingRef.current = false;
    setErrorMsg(null);

    const startCamera = async () => {
      try {
        const container = document.getElementById(readerElementId);
        if (!container || !isMounted) return;

        const html5QrCode = new Html5Qrcode(readerElementId, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          async (decodedText) => {
            if (isMounted && !isStoppingRef.current) {
              await stopScannerSafely();
              onScanSuccess(decodedText);
            }
          },
          () => {
            // frame without QR code, ignore
          }
        );

        if (isMounted) {
          setIsScanning(true);
        }
      } catch (err: unknown) {
        console.warn('Camera start error:', err);
        if (isMounted) {
          setErrorMsg(
            'No se pudo acceder a la cámara. Otorga permisos en tu navegador o introduce el código manualmente abajo.'
          );
        }
      }
    };

    const timer = setTimeout(() => {
      startCamera();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      stopScannerSafely();
    };
  }, [isOpen, stopScannerSafely, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-black animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl border border-black shadow-2xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 font-['Quicksand']">
                Escanear Sello QR
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Apunta tu cámara al código mostrado por la maestra
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Camera stream container */}
        <div className="p-4 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] h-[280px] rounded-2xl overflow-hidden bg-slate-950 border-3 border-dashed border-amber-400 flex items-center justify-center shadow-inner">
            <div id={readerElementId} className="w-full h-full" />
            {!isScanning && !errorMsg && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-950">
                <RefreshCw className="w-7 h-7 animate-spin text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-300">Iniciando cámara...</span>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Fallback manual input */}
          <div className="w-full mt-4 pt-3 border-t border-slate-100">
            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase font-mono">
              ¿No tienes cámara o estás en PC? Pega el código:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="manual-qr-input"
                placeholder="Ej. SELLO-7842..."
                className="flex-1 px-3 py-2 text-xs border-2 border-slate-300 rounded-xl font-mono focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="button"
                onClick={async () => {
                  const input = document.getElementById('manual-qr-input') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    await handleClose();
                    onScanSuccess(input.value.trim());
                  }
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 border-2 border-black rounded-xl text-xs font-black font-['Quicksand'] uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
              >
                Validar
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>El sello se abonará de inmediato a tu perfil</span>
          <button
            onClick={handleClose}
            className="font-bold text-slate-800 hover:text-slate-950 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
