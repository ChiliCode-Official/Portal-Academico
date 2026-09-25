'use client';

import React, { useState } from 'react';
import { Mail, ShieldAlert, CheckCircle, X, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reported, setReported] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  // Form states
  const [reportReason, setReportReason] = useState('');
  const [reportDetail, setReportDetail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const currentTerm = 'Periodo Escolar 2026-B (Septiembre 2026)';

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReported(true);
    setTimeout(() => {
      setReported(false);
      setIsReportOpen(false);
      setReportReason('');
      setReportDetail('');
    }, 1800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setIsContactOpen(false);
      setContactSubject('');
      setContactMessage('');
    }, 1800);
  };

  return (
    <>
      <footer className="w-full bg-white border-t border-[#E5E7EB] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-xs text-[#4A4A4A]">
            {/* Left: Last update timestamp */}
            <div className="text-left">
              <span className="font-semibold text-[#1C1C1C] block mb-0.5">
                Portal Académico Institucional
              </span>
              <span>Última actualización de la página: {currentTerm}</span>
            </div>

            {/* Center: Contact modal trigger */}
            <div className="text-left md:text-center">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#1C1C1C] hover:underline underline-offset-4 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Contacto institucional</span>
              </button>
            </div>

            {/* Right: Report abuse */}
            <div className="text-left md:text-right">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-slate-400" />
                <span>Denunciar abuso</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© {new Date().getFullYear()} Cátedra de Ingeniería — Prof. Xochitl M. Zapata M.</p>
            <p>Repositorio docente exclusivo para fines de consulta académica.</p>
          </div>
        </div>
      </footer>

      {/* Contact Institutional Modal */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-[#E5E7EB] overflow-hidden p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand']">
                  Contacto Institucional
                </h3>
              </div>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-slate-400 hover:text-[#1C1C1C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {contactSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  Mensaje enviado a la cátedra
                </p>
                <p className="text-xs text-[#4A4A4A]">
                  Se dará respuesta a través del correo institucional del alumno.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  Para dudas sobre reactivos de examen, bitácoras o asesorías presenciales, diríjase formalmente al despacho docente.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Correo Institucional del Alumno
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="matricula@institucion.edu.mx"
                    className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Ej. Duda Práctica 03 / Justificación"
                    className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Mensaje o Consulta Académica
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Escriba su consulta detallada..."
                    className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-slate-400 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="px-3 py-1.5 text-xs text-[#4A4A4A] hover:bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-black rounded-lg transition-colors"
                  >
                    Enviar comunicación
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Report Abuse Modal */}
      {isReportOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-[#E5E7EB] overflow-hidden p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold text-[#1C1C1C] font-['Quicksand']">
                  Denuncia de Mal Uso o Reporte
                </h3>
              </div>
              <button
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-[#1C1C1C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reported ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-semibold text-[#1C1C1C]">
                  Reporte enviado al Comité Académico
                </p>
                <p className="text-xs text-[#4A4A4A]">
                  El reporte ha sido canalizado bajo estricta confidencialidad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <p className="text-xs text-[#4A4A4A]">
                  Canal institucional para notificar violaciones al código de ética académica, plagio, o suplantación de identidad en materiales de cátedra.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Tipo de Incidencia
                  </label>
                  <select
                    required
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-slate-400 bg-white"
                  >
                    <option value="">Seleccione una opción...</option>
                    <option value="plagio">Plagio de reportes o bitácoras</option>
                    <option value="suplantacion">Suplantación de sellos o firmas</option>
                    <option value="conducta">Conducta no ética en el laboratorio</option>
                    <option value="otro">Otro incumplimiento disciplinario</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Descripción de los Hechos
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reportDetail}
                    onChange={(e) => setReportDetail(e.target.value)}
                    placeholder="Indique fecha, grupo y evidencia correspondiente..."
                    className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-slate-400 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-3 py-1.5 text-xs text-[#4A4A4A] hover:bg-slate-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
                  >
                    Enviar reporte confidencial
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
