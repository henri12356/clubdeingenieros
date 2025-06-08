import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "./GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Club de Ingenieros | Cursos Especializados",
  description: "Cursos profesionales de ingeniería civil, hidrología y análisis de cuencas con QGIS",
  
  // Verificación Google Search Console
  verification: {
    google: "s7rwNtOiZLTsTJkm10Dj-B1CNfnpkSjX7iDkXcjEVF4",
  },

  // Configuración de favicons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",

  // OpenGraph para redes sociales
  openGraph: {
    title: "Club de Ingenieros | Cursos Especializados",
    description: "Cursos profesionales de ingeniería civil, hidrología y análisis de cuencas con QGIS",
    url: "https://clubdeingenieros.vercel.app",
    siteName: "Club de Ingenieros",
    images: [
      {
        url: "https://clubdeingenieros.vercel.app/logo-og.jpg",
        width: 1200,
        height: 630,
        alt: "Club de Ingenieros - Cursos Especializados",
      },
    ],
    locale: "es_PE",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Club de Ingenieros | Cursos Especializados",
    description: "Cursos profesionales de ingeniería",
    images: ["https://clubdeingenieros.vercel.app/logo-twitter.jpg"],
    creator: "@clubingenieros",
  },

  // URL canónica
  alternates: {
    canonical: "https://clubdeingenieros.vercel.app",
  },

  // Datos estructurados para el logo en Google
  other: {
    "og:logo": "https://clubdeingenieros.vercel.app/logo-google.png",
    "og:logo:width": "400",
    "og:logo:height": "400",
  },
};

// Datos estructurados para el logo en resultados de búsqueda
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Club de Ingenieros",
    url: "https://clubdeingenieros.vercel.app",
    logo: "https://clubdeingenieros.vercel.app/logo-google.png",
    sameAs: [
      "https://facebook.com/clubdeingenieros",
      "https://twitter.com/clubingenieros"
    ]
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Incluye los datos estructurados para el logo */}
        <Script
    id="structured-data"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}