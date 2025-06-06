import FloatingButtons from '@/app/floating-buttons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análisis de Cuencas Hidrográficas con QGIS | Club de Ingenieros',
  description: 'Aprende análisis de cuencas hidrográficas con QGIS para gestión de recursos hídricos, prevención de desastres y planificación territorial. Curso completo con certificación.',
  keywords: ['análisis cuencas hidrográficas', 'QGIS', 'hidrología', 'recursos hídricos', 'GIS', 'sistemas de información geográfica', 'delimitación cuencas', 'modelado hidrológico', 'curso QGIS', 'ingeniería hídrica', 'perú'], // Añadido 'perú' por el locale es_PE
  
  openGraph: {
    title: 'Análisis de Cuencas Hidrográficas con QGIS | Club de Ingenieros',
    description: 'Curso profesional sobre análisis de cuencas hidrográficas utilizando QGIS, ideal para ingenieros y profesionales del sector hídrico y ambiental.',
    url: 'https://clubdeingenieros.vercel.app/cursos/analisis-cuencas-hidrograficas-qgis',
    type: 'website',
    images: [
      {
        url: 'https://clubdeingenieros.vercel.app/fondo.webp', // Asumo que esta imagen es genérica o se adaptará
        width: 1200,
        height: 630,
        alt: 'Curso de Análisis de Cuencas Hidrográficas con QGIS',
      },
    ],
    siteName: 'Club de Ingenieros',
    locale: 'es_PE', // Mantenemos el locale de Perú
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Análisis de Cuencas Hidrográficas con QGIS | Club de Ingenieros',
    description: 'Curso profesional para el análisis y modelado de cuencas hidrográficas con QGIS, optimizado para la gestión de recursos hídricos.',
    images: ['https://clubdeingenieros.vercel.app/fondo.webp'], // Asumo que esta imagen es genérica o se adaptará
  },

  alternates: {
    canonical: 'https://clubdeingenieros.vercel.app/cursos/analisis-cuencas-hidrograficas-qgis',
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

export default function AnalisisCuencasLayout({ // Renombrado el componente si aplica al nombre del curso
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