import FloatingButtons from '@/app/floating-buttons';
import { Analytics } from '@/app/GoogleAnalytics';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análisis de Cuencas Hidrográficas con QGIS | Club de Ingenieros',
  verification: {
    google: "s7rwNtOiZLTsTJkm10Dj-B1CNfnpkSjX7iDkXcjEVF4",
  },
  description: 'Aprende análisis de cuencas hidrográficas con QGIS para gestión de recursos hídricos, prevención de desastres y planificación territorial. Curso completo con certificación.',
  keywords: [
    'análisis cuencas hidrográficas', 
    'QGIS', 
    'hidrología', 
    'recursos hídricos', 
    'GIS', 
    'sistemas de información geográfica', 
    'delimitación cuencas', 
    'modelado hidrológico', 
    'curso QGIS', 
    'ingeniería hídrica', 
    'Perú',
    'gestión de cuencas',
    'análisis hidrológico'
  ],
  
  // OpenGraph optimizado corregido
  openGraph: {
    title: 'Análisis de Cuencas Hidrográficas con QGIS | Club de Ingenieros',
    description: 'Curso profesional sobre análisis de cuencas hidrográficas utilizando QGIS, ideal para ingenieros y profesionales del sector hídrico y ambiental.',
    url: 'https://clubdeingenieros.vercel.app/cursos/analisis-cuencas-hidrograficas-qgis',
    type: 'website',
    images: [
      {
        url: 'https://clubdeingenieros.vercel.app/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Análisis de Cuencas Hidrográficas con Software QGIS - Club de Ingenieros',
        type: 'image/webp', // Corregido a webp para coincidir con el formato
      },
      {
        url: 'https://clubdeingenieros.vercel.app/banner.jpg', // Versión JPEG como fallback
        width: 1200,
        height: 630,
        alt: 'Análisis de Cuencas Hidrográficas con Software QGIS - Club de Ingenieros',
        type: 'image/jpeg',
      },
    ],
    siteName: 'Club de Ingenieros',
    locale: 'es_PE',
  },

  // Twitter Cards optimizado corregido
  twitter: {
    card: 'summary_large_image',
    site: '@ClubIngenierosPE',
    creator: '@ClubIngenierosPE',
    title: 'Análisis de Cuencas Hidrográficas con QGIS | Club de Ingenieros',
    description: 'Domina el análisis hidrológico con QGIS en este curso certificado para ingenieros y especialistas ambientales.',
    images: [
      'https://clubdeingenieros.vercel.app/banner.webp', // Formato preferido
      'https://clubdeingenieros.vercel.app/banner.jpg' // Fallback
    ],
  },

  alternates: {
    canonical: 'https://clubdeingenieros.vercel.app/cursos/analisis-cuencas-hidrograficas-qgis', // Corregido para apuntar a la página, no a la imagen
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Metadatos adicionales importantes
  metadataBase: new URL('https://clubdeingenieros.vercel.app'),
  authors: [
    { 
      name: 'Club de Ingenieros', 
      url: 'https://clubdeingenieros.vercel.app' 
    }
  ],
  category: 'Ingeniería Civil | Hidrología',
  creator: 'Club de Ingenieros',
  publisher: 'Club de Ingenieros',
};

export default function AnalisisCuencasLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingButtons />
      <Analytics />
    </>
  );
}