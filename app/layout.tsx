import type { Metadata } from 'next';
import { Pacifico, Quicksand, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
});

const quicksand = Quicksand({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portal Académico | Prof. Xochitl M. Zapata M.',
  description:
    'Repositorio institucional de ingeniería, manuales de laboratorio, bitácoras y recursos académicos de cátedra.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Portal Académico',
  },
};

export const viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { AuthProvider } from '@/lib/firebase/AuthContext';
import { CourseContentProvider, CoursePageBoundary } from '@/components/CourseContent';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${pacifico.variable} ${quicksand.variable} ${roboto.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#1C1C1C] antialiased selection:bg-slate-200">
        <AuthProvider>
          <CourseContentProvider>
          <Header />
          <Breadcrumbs />
          <main className="flex-1 flex flex-col"><CoursePageBoundary>{children}</CoursePageBoundary></main>
          <Footer />
          </CourseContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
