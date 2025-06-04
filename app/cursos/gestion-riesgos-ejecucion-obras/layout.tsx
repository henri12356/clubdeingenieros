// app/cursos/gestion-riesgos-ejecucion-obras/layout.tsx
import FloatingButtons from '@/app/floating-buttons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
  description: 'Curso completo sobre gestión de riesgos en construcción según normativa OSCE 012-2017. Certificación incluida. Aprenda con expertos en ingeniería civil.',
  keywords: ['gestión de riesgos', 'OSCE 012-2017', 'construcción segura', 'ingeniería civil', 'curso certificado'],
  openGraph: {
    title: 'Gestión de Riesgos en Obras Civiles | Club de Ingenieros',
    description: 'Curso profesional sobre gestión de riesgos en construcción',
    url: 'https://clubdeingenieros.com/cursos/gestion-riesgos-ejecucion-obras',
    type: 'website',
    images: [
      {
        url: 'https://clubdeingenieros.com/images/og-riesgos.jpg',
        width: 1200,
        height: 630,
        alt: 'Curso de Gestión de Riesgos',
      },
    ],
    siteName: 'Club de Ingenieros',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestión de Riesgos en Obras Civiles',
    description: 'Curso profesional sobre gestión de riesgos en construcción',
    images: ['https://clubdeingenieros.com/images/og-riesgos.jpg'],
  },
  alternates: {
    canonical: 'https://clubdeingenieros.com/cursos/gestion-riesgos-ejecucion-obras',
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
      {/* Schema.org Structured Data se mantuvo en page.tsx porque a veces necesita acceder a estado o props,
          pero idealmente podrías moverlo aquí si los datos son estáticos. */}
      {children}
              <FloatingButtons /> {/* Render the floating buttons here */}
    </>
  );
}