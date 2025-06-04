import FloatingButtons from '@/app/floating-buttons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
  description: 'Curso completo sobre gestión de riesgos en construcción según normativa OSCE 012-2017. Certificación incluida. Aprenda con expertos en ingeniería civil.',
  keywords: ['gestión de riesgos', 'OSCE 012-2017', 'construcción segura', 'ingeniería civil', 'curso certificado'],
  
  openGraph: {
    title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
    description: 'Curso profesional sobre gestión de riesgos en construcción según normativa OSCE 012-2017. Certificación incluida.',
    url: 'https://clubdeingenieros.vercel.app/cursos/gestion-riesgos-ejecucion-obras',
    type: 'website',
    images: [
      {
        url: 'https://clubdeingenieros.vercel.app/fondo01.jpg',
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
    description: 'Curso profesional sobre gestión de riesgos en construcción',
    images: ['https://clubdeingenieros.vercel.app/fondo01.jpg'],
  },

  alternates: {
    canonical: 'https://clubdeingenieros.vercel.app/cursos/gestion-riesgos-ejecucion-obras',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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