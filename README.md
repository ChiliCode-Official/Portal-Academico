# Portal Académico — Prof. Xochitl M. Zapata M.

Plataforma académica institucional y repositorio privado para la cátedra de Ingeniería (Física, Sensores e Instrumentación, Economía Sostenible y Pura Energía).

## Características y Arquitectura
- **Framework:** Next.js 14+ / App Router con TypeScript estricto.
- **Estilos & UI:** Tailwind CSS, `lucide-react`, Google Fonts (`Pacifico`, `Quicksand`, `Roboto`).
- **Capa de Abstracción:** Capa de datos desacoplada en `lib/firebase/db.ts` preparada para interoperar con Firestore o datos en memoria.
- **Búsqueda Global:** Modal de indexación de asignaturas y documentos con atajo de teclado (`Ctrl + K`).
- **Visor Seguro de PDF:** Componente modal interactivo para visualización sin salir de la plataforma.

## Comandos
```bash
# Desarrollo local
npm run dev

# Compilación de producción
npm run build

# Iniciar servidor de producción
npm start
```
