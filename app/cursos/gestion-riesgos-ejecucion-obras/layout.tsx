// app/cursos/gestion-riesgos-ejecucion-obras/layout.tsx
import FloatingButtons from '@/app/floating-buttons';
import { Metadata } from 'next';

// Configuración base de la URL según el entorno
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://clubdeingenieros.vercel.app' 
  : 'https://clubdeingenieros.vercel.app';

export const metadata: Metadata = {
  title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
  description: 'Curso completo sobre gestión de riesgos en construcción según normativa OSCE 012-2017. Certificación incluida. Aprenda con expertos en ingeniería civil.',
  keywords: ['gestión de riesgos', 'OSCE 012-2017', 'construcción segura', 'ingeniería civil', 'curso certificado'],
  
  openGraph: {
    title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
    description: 'Curso profesional sobre gestión de riesgos en construcción según normativa OSCE 012-2017. Certificación incluida.',
    url: `${BASE_URL}/fondo01.jpg`,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/fondo01.jpg`,
        width: 1200,
        height: 630,
        alt: 'Curso de Gestión de Riesgos en Obras Civiles',
      },
    ],
    siteName: 'Club de Ingenieros',
    locale: 'es_PE',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
    description: 'Curso profesional sobre gestión de riesgos en construcción según normativa OSCE 012-2017',
    images: [`${BASE_URL}/fondo01.jpg`],
    site: '@ClubIngenieros',
    creator: '@ClubIngenieros',
  },

  alternates: {
    canonical: `${BASE_URL}/fondo01.jpg`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'TU_GOOGLE_VERIFICATION_CODE',
    yandex: 'TU_YANDEX_VERIFICATION_CODE',
  },
};

export default function GestionRiesgosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingButtons />
    </>
  );
}