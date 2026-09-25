'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, RefreshCw, AlertCircle, CheckCircle2, X } from 'lucide-react';

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
  const readerElementId = 'qr-camera-stream';

  useEffect(() => {
    if (!isOpen) {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current?.clear();
          setIsScanning(false);
        }).catch(() => {});
      }
      return;
    }

    let isMounted = true;
    setErrorMsg(null);

    const startCamera = async () => {
      try {
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
          (decodedText) => {
            if (isMounted) {
              html5QrCode.stop().then(() => {
                html5QrCode.clear();
                setIsScanning(false);
                onScanSuccess(decodedText);
              }).catch(() => {
                onScanSuccess(decodedText);
              });
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
            'No se pudo acceder a la cámara. Por favor asegúrate de otorgar permisos o introduce el código manualmente si estás en un simulador.'
          );
        }
      }
    };

    // Small delay to ensure modal DOM container is rendered
    const timer = setTimeout(() => {
      startCamera();
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (scannerRef.current) {
        try {
          scannerRef.current.stop().catch(() => {}).then(() => {
            scannerRef.current?.clear();
          });
        } catch {
          // ignore
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Quicksand']">
                Escanear Sello QR
              </h3>
              <p className="text-[11px] text-slate-500">
                Apunta con tu cámara al código mostrado por la maestra
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera stream container */}
        <div className="p-4 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] h-[280px] rounded-2xl overflow-hidden bg-slate-950 border-2 border-dashed border-amber-400 flex items-center justify-center">
            <div id={readerElementId} className="w-full h-full" />
            {!isScanning && !errorMsg && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-900/90">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                <span className="text-xs">Iniciando cámara...</span>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Fallback manual input for desktop / testing */}
          <div className="w-full mt-4 pt-3 border-t border-slate-100">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase font-mono">
              ¿No tienes cámara o estás en PC? Pega el código:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="manual-qr-input"
                placeholder="Ej. SELLO-7842..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:outline-hidden focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('manual-qr-input') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    onScanSuccess(input.value.trim());
                  }
                }}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold font-['Quicksand'] hover:bg-slate-800"
              >
                Validar
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>El sello se abonará de inmediato a tu perfil</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-950"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
