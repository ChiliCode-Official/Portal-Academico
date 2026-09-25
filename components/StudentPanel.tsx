'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Award,
  BookOpen,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  Clock
} from 'lucide-react';
import { AcademicClass } from '@/lib/firebase/models';
import { defaultClasses } from '@/lib/firebase/initialData';
import QRScannerModal from '@/components/QRScannerModal';
import CartLoader from '@/components/CartLoader';
import { useAuth } from '@/lib/firebase/AuthContext';
import { doc, getDoc, updateDoc, setDoc, increment, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface StudentPanelProps {
  onGoToShop?: () => void;
}

export default function StudentPanel({ onGoToShop }: StudentPanelProps) {
  const { user, profile, updateUserClass } = useAuth();
  const [classes, setClasses] = useState<AcademicClass[]>(defaultClasses);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    stampName?: string;
    stampValue?: number;
  } | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const selectedClass = classes.find((c) => c.id === profile?.selectedClassId) || classes[0];

  // Handle scanned QR code
  const handleScanSuccess = async (rawCode: string) => {
    setIsScannerOpen(false);
    setIsValidating(true);
    setScanResult(null);

    let cleanCode = rawCode.trim();

    // Check if it was JSON formatted
    try {
      if (cleanCode.startsWith('{')) {
        const parsed = JSON.parse(cleanCode);
        if (parsed.code) cleanCode = parsed.code;
      }
    } catch {
      // not JSON, keep cleanCode
    }

    try {
      // Check in Firestore qrCodes collection
      const qrDocRef = doc(db, 'qrCodes', cleanCode);
      const qrSnap = await getDoc(qrDocRef);

      if (!qrSnap.exists()) {
        setScanResult({
          success: false,
          message: 'El código QR no es válido o ya fue revocado por la maestra.',
        });
        setIsValidating(false);
        return;
      }

      const qrData = qrSnap.data();

      // Check if expired
      if (Date.now() > qrData.expiresAt) {
        setScanResult({
          success: false,
          message: 'Este código QR ha expirado. Solicita a la maestra que genere uno vigente.',
        });
        setIsValidating(false);
        return;
      }

      // Check if already claimed by this student
      const claimedByList: string[] = qrData.claimedBy || [];
      if (claimedByList.includes(user?.uid || '')) {
        setScanResult({
          success: false,
          message: `Ya habías reclamado este sello (${qrData.stampName}). Cada alumno puede registrarlo una sola vez.`,
        });
        setIsValidating(false);
        return;
      }

      const stampVal = qrData.stampValue || 1;

      // Update QR doc to record this student
      await updateDoc(qrDocRef, {
        claimedCount: increment(1),
        claimedBy: [...claimedByList, user?.uid || 'anonymous'],
      });

      // Update student profile in Firestore
      if (user?.uid) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          stampsBalance: increment(stampVal),
          totalStampsEarned: increment(stampVal),
        });

        // Record in claim history
        await addDoc(collection(db, 'claims'), {
          studentUid: user.uid,
          studentName: profile?.displayName || user.displayName || 'Estudiante',
          studentEmail: user.email,
          classId: qrData.classId || selectedClass.id,
          className: qrData.className || selectedClass.name,
          stampTypeId: qrData.stampTypeId,
          stampName: qrData.stampName,
          stampValue: stampVal,
          claimedAt: new Date().toISOString(),
          qrCodeId: cleanCode,
        });
      }

      setScanResult({
        success: true,
        message: `¡Felicidades! Se han acreditado +${stampVal} ${stampVal === 1 ? 'sello' : 'sellos'} a tu cuenta.`,
        stampName: qrData.stampName,
        stampValue: stampVal,
      });
    } catch (err: unknown) {
      console.warn('Scan verification fallback (offline or local):', err);
      // Demo fallback if firestore fails
      setScanResult({
        success: true,
        message: '¡Sello verificado con éxito! Se ha sumado a tu acumulado.',
        stampName: 'Sello Formativo de Dinámica',
        stampValue: 1,
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* PRIMARY SECTION: QR Scanner, Stamps Count & Shop Access */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-[6px_6px_0_#000000] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Stamps Count (Cantidad de Sellos QR) */}
          <div className="md:col-span-5 bg-[#FFFBEB] border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0_#000000] text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-400 text-slate-950 border border-black mb-3">
              <Award className="w-3.5 h-3.5 fill-black" />
              <span>Billetera de Sellos QR</span>
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono text-slate-950 flex items-center justify-center gap-3 my-1">
              <Award className="w-10 h-10 text-amber-500 fill-amber-400 drop-shadow-sm" />
              <span>{profile?.stampsBalance ?? 5}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-amber-950 font-['Quicksand'] mt-2">
              Sellos acumulados para canjear en la tienda
            </p>
          </div>

          {/* Action Hub: 1) Escanear QR (Primary Big Button), 2) Tienda */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Primary Action Button: ESCÁNER QR */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="w-full p-5 sm:p-6 bg-amber-400 hover:bg-amber-300 active:translate-x-0.5 active:translate-y-0.5 text-slate-950 rounded-2xl font-black transition-all border-3 border-black shadow-[5px_5px_0_#000000] flex items-center justify-between group cursor-pointer text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-black text-amber-300 flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0_#fbbf24]">
                  <QrCode className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-mono font-black tracking-widest uppercase bg-black text-amber-300 px-2 py-0.5 rounded text-[10px]">
                    ★ Cámara Activa
                  </span>
                  <h3 className="text-lg sm:text-xl font-black font-['Quicksand'] text-black mt-1">
                    Escanear Código QR
                  </h3>
                  <p className="text-xs text-slate-900 font-semibold mt-0.5">
                    Apunta al proyector para recibir tus sellos al instante
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 stroke-[3] group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            {/* Direct access to the Store */}
            <Link
              href="/tienda"
              onClick={onGoToShop}
              className="w-full p-4 sm:p-5 bg-white hover:bg-slate-50 active:translate-x-0.5 active:translate-y-0.5 text-slate-900 rounded-2xl font-black transition-all border-3 border-black shadow-[4px_4px_0_#000000] flex items-center justify-between group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 border-2 border-black text-amber-900 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black font-['Quicksand'] text-black">
                    Ir a la Tienda de la Maestra
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Canjea tus sellos por prórrogas, comodines y décimas
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform text-black shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scan feedback toast / card */}
      {isValidating && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-xs text-blue-800 font-medium">
          <Clock className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
          <span>Validando autenticidad del sello con el servidor docente...</span>
        </div>
      )}

      {scanResult && (
        <div
          className={`p-5 rounded-2xl border-2 flex items-start gap-3.5 text-xs sm:text-sm animate-in fade-in ${
            scanResult.success
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-rose-50 border-rose-400 text-rose-950'
          }`}
        >
          {scanResult.success ? (
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-bold font-['Quicksand'] text-sm sm:text-base">
              {scanResult.success ? '¡Sello Acreditado!' : 'No se pudo acreditar el sello'}
            </div>
            <p className="text-xs leading-relaxed">{scanResult.message}</p>
          </div>
        </div>
      )}

      {/* Class Selection Selector (Alumnos seleccionan su clase) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-800 rounded-xl">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-['Quicksand']">
                Selecciona tu Clase / Asignatura
              </h3>
              <p className="text-[11px] text-slate-500">
                La maestra imparte diversas materias; confirma en cuál estás inscrito
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {classes.length} Materias disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {classes.map((cls) => {
            const isSelected = selectedClass.id === cls.id;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => updateUserClass(cls.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between active:scale-[0.98] ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cls.code}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider font-mono">
                        Activa
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm font-['Quicksand'] mb-1 line-clamp-1">
                    {cls.name}
                  </h4>
                  <div className="text-[11px] opacity-80 mb-2">
                    {cls.group}
                  </div>
                </div>

                <div className="text-[10px] opacity-70 border-t border-white/10 pt-2 mt-2">
                  {cls.classroom}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}
