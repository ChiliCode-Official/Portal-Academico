'use client';

import { useState, useEffect } from 'react';
import {
  QrCode,
  Plus,
  Trash2,
  Edit3,
  Award,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { AcademicClass, StampType, StampRedemptionCode } from '@/lib/firebase/models';
import { defaultClasses, defaultStampTypes } from '@/lib/firebase/initialData';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { useAuth } from '@/lib/firebase/AuthContext';
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function TeacherPanel() {
  const { user, profile } = useAuth();
  const [classes, setClasses] = useState<AcademicClass[]>(defaultClasses);
  const [stampTypes, setStampTypes] = useState<StampType[]>(defaultStampTypes);
  const [selectedClassId, setSelectedClassId] = useState<string>(defaultClasses[0]?.id || '');
  const [selectedStampTypeId, setSelectedStampTypeId] = useState<string>(defaultStampTypes[0]?.id || '');
  const [activeQR, setActiveQR] = useState<StampRedemptionCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // New Class Form State
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');
  const [newClassGroup, setNewClassGroup] = useState('');
  const [newClassSchedule, setNewClassSchedule] = useState('');
  const [newClassRoom, setNewClassRoom] = useState('');

  // Duration in minutes for QR
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  // Load classes from Firestore if available
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const snap = await getDocs(collection(db, 'classes'));
        if (!snap.empty) {
          const list: AcademicClass[] = [];
          snap.forEach((d) => list.push({ id: d.id, ...d.data() } as AcademicClass));
          setClasses(list);
          if (list[0]) setSelectedClassId(list[0].id);
        } else {
          // Seed defaults into firestore
          defaultClasses.forEach(async (c) => {
            try {
              await setDoc(doc(db, 'classes', c.id), c);
            } catch {
              // ignore
            }
          });
        }
      } catch (e) {
        console.warn('Using local classes fallback:', e);
      }
    };
    fetchClasses();
  }, []);

  // Generate QR for student stamps
  const handleGenerateQR = async () => {
    const classObj = classes.find((c) => c.id === selectedClassId) || classes[0];
    const stampObj = stampTypes.find((s) => s.id === selectedStampTypeId) || stampTypes[0];

    setIsGenerating(true);
    const codeRandom = `SELLO-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const expiresAt = Date.now() + durationMinutes * 60 * 1000;

    const qrData: StampRedemptionCode = {
      id: `qr-${Date.now()}`,
      code: codeRandom,
      stampTypeId: stampObj.id,
      stampName: stampObj.name,
      stampValue: stampObj.value,
      classId: classObj.id,
      className: classObj.name,
      teacherUid: user?.uid || 'prof-xochitl',
      teacherEmail: user?.email || 'prof.xochitl.zapata@institucion.edu.mx',
      createdAt: Date.now(),
      expiresAt: expiresAt,
      claimedCount: 0,
      claimedBy: [],
      active: true,
    };

    try {
      await setDoc(doc(db, 'qrCodes', qrData.code), qrData);
    } catch (e) {
      console.warn('Could not save QR to Firestore, using client state:', e);
    }

    setActiveQR(qrData);
    setIsGenerating(false);
    setStatusMsg(`¡Código QR generado para ${stampObj.name} (+${stampObj.value})!`);
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Add a new class panel
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !newClassCode.trim()) return;

    const id = `${newClassCode.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-4)}`;
    const newClass: AcademicClass = {
      id,
      name: newClassName.trim(),
      code: newClassCode.trim().toUpperCase(),
      group: newClassGroup.trim() || 'Grupo Regular',
      schedule: newClassSchedule.trim() || 'Horario a definir',
      classroom: newClassRoom.trim() || 'Laboratorio',
      teacherEmail: user?.email || 'prof.xochitl.zapata@institucion.edu.mx',
      active: true,
    };

    setClasses((prev) => [...prev, newClass]);
    setSelectedClassId(id);
    setIsCreatingClass(false);
    setNewClassName('');
    setNewClassCode('');
    setNewClassGroup('');
    setNewClassSchedule('');
    setNewClassRoom('');

    try {
      await setDoc(doc(db, 'classes', id), newClass);
      setStatusMsg(`Materia "${newClass.name}" añadida con éxito.`);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      console.warn('Could not persist class in firestore:', err);
    }
  };

  // Delete a class
  const handleDeleteClass = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar la clase "${name}"?`)) return;
    setClasses((prev) => prev.filter((c) => c.id !== id));
    if (selectedClassId === id && classes.length > 1) {
      setSelectedClassId(classes.filter((c) => c.id !== id)[0].id);
    }
    try {
      await deleteDoc(doc(db, 'classes', id));
    } catch (e) {
      console.warn('Delete error:', e);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Teacher Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E5E7EB] hover:border-slate-300 shadow-sm transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Panel Oficial de la Maestra &bull; Sesión Activa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Quicksand'] text-[#1C1C1C]">
              Gestión de Sellos QR & Clases Académicas
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-2xl leading-relaxed">
              Selecciona tu grupo y el tipo de sello que deseas otorgar en la sesión práctica. Se generará un código QR dinámico y seguro que los alumnos escanearán para recibir sus sellos al instante.
            </p>
          </div>

          <div className="p-4 bg-[#FFFBEB] border-2 border-amber-300 rounded-2xl shrink-0 text-center shadow-xs">
            <span className="text-[11px] font-mono text-amber-800 block uppercase font-bold">
              Docente en línea
            </span>
            <span className="text-sm font-bold text-slate-900 block font-['Quicksand']">
              {profile?.displayName || 'Prof. Xochitl M. Zapata M.'}
            </span>
            <span className="text-[11px] text-amber-900 font-mono font-medium">
              {classes.length} Materias activas
            </span>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs sm:text-sm animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{statusMsg}</span>
        </div>
      )}

      {/* Main Grid: Left = QR Generator, Right = Classes & Stamp Types */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: QR Code Creator & Display (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
              <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Quicksand']">
                  1. Otorgar Sellos por Código QR
                </h3>
                <p className="text-xs text-slate-500">
                  Configura los detalles del sello y presiona generar
                </p>
              </div>
            </div>

            {/* Select Class */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-2">
                  Selecciona la Asignatura / Grupo:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {classes.map((cls) => {
                    const isSelected = selectedClassId === cls.id;
                    return (
                      <button
                        key={cls.id}
                        type="button"
                        onClick={() => setSelectedClassId(cls.id)}
                        className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {cls.code}
                          </span>
                          <span className="text-[10px] opacity-75">{cls.group}</span>
                        </div>
                        <span className="font-bold font-['Quicksand'] text-xs sm:text-sm line-clamp-1">
                          {cls.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Stamp Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-2">
                  Selecciona el Tipo de Sello a Otorgar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {stampTypes.map((st) => {
                    const isSelected = selectedStampTypeId === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSelectedStampTypeId(st.id)}
                        className={`p-3 rounded-2xl text-left border transition-all text-xs flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-300'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <div className="space-y-0.5 truncate">
                          <div className="font-bold font-['Quicksand'] text-xs sm:text-sm truncate">
                            {st.name}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {st.description}
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-black font-mono bg-amber-400 text-slate-950 shrink-0">
                          +{st.value}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Validity duration selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-2">
                  Vigencia del Código QR:
                </label>
                <div className="flex gap-2">
                  {[15, 30, 60, 120].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                        durationMinutes === mins
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerateQR}
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm font-['Quicksand'] transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <QrCode className="w-5 h-5" />
              <span>
                {isGenerating ? 'Generando código...' : 'Generar Código QR en Pantalla'}
              </span>
            </button>
          </div>

          {/* Render Active QR Display */}
          {activeQR && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-200">
              <QRCodeDisplay
                redemptionCode={activeQR}
                onRefresh={handleGenerateQR}
              />
            </div>
          )}
        </div>

        {/* Right Column: Manage Classes (Paneles que la maestra puede editar) (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 text-blue-900 rounded-xl">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Quicksand']">
                    Paneles de Clase
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Materias que impartes actualmente
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreatingClass(!isCreatingClass)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-['Quicksand'] flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nueva Clase</span>
              </button>
            </div>

            {/* Create Class Drawer / Form */}
            {isCreatingClass && (
              <form onSubmit={handleCreateClass} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-bold uppercase font-mono text-slate-700">
                  Agregar Nueva Asignatura / Grupo
                </h4>
                <div>
                  <input
                    type="text"
                    placeholder="Nombre (ej. Termofísica Aplicada)"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:border-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Clave (ej. TER-201)"
                    value={newClassCode}
                    onChange={(e) => setNewClassCode(e.target.value)}
                    required
                    className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white uppercase font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Grupo (ej. G1 Matutino)"
                    value={newClassGroup}
                    onChange={(e) => setNewClassGroup(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Horario (ej. Mar y Jue • 10:00 - 12:00)"
                  value={newClassSchedule}
                  onChange={(e) => setNewClassSchedule(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                />
                <input
                  type="text"
                  placeholder="Aula / Laboratorio (ej. Lab 102)"
                  value={newClassRoom}
                  onChange={(e) => setNewClassRoom(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl font-['Quicksand']"
                  >
                    Guardar Materia
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingClass(false)}
                    className="px-3 py-2 bg-slate-200 text-slate-700 text-xs rounded-xl"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* List of active classes */}
            <div className="space-y-3">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 group hover:border-slate-300 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                        {cls.code}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600">
                        {cls.group}
                      </span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 font-['Quicksand']">
                      {cls.name}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {cls.schedule} &bull; {cls.classroom}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteClass(cls.id, cls.name)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                    title="Eliminar clase"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tip Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <strong className="block font-bold font-['Quicksand']">
                Dinámica de Sellos en Clase
              </strong>
              <p className="leading-relaxed text-[11px]">
                Cuando proyectes el código QR en el proyector del aula o en tu tablet, los alumnos ingresan con su cuenta Google institucional en este portal y tocan <strong>&quot;Escanear QR de la Maestra&quot;</strong>. La verificación es instantánea e impide duplicados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
