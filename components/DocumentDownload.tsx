'use client';

import { useState } from 'react';

export default function DocumentDownload({ fileUrl, title, className, children }: { fileUrl: string; title: string; className?: string; children: React.ReactNode }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const download = async () => {
    setBusy(true); setFailed(false);
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      const suffix = blob.type.includes('pdf') ? '.pdf' : '';
      link.download = title.replace(/[<>:"/\\|?*]/g, '-').replace(/\.pdf$/i, '') + suffix;
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch { setFailed(true); }
    finally { setBusy(false); }
  };
  return <><button type="button" disabled={busy} onClick={() => void download()} className={className} title="Descargar archivo" aria-label={`Descargar ${title}`}>{busy ? 'Descargando…' : children}</button>{failed && <a href={fileUrl} target="_blank" rel="noreferrer" className="text-xs text-red-700 underline" title="El servidor no permitió la descarga directa; abre el archivo y utiliza su botón Descargar.">Abrir archivo para descargar</a>}</>;
}
