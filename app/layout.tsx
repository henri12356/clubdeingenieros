import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  verification: {
    google: "s7rwNtOiZLTsTJkm10Dj-B1CNfnpkSjX7iDkXcjEVF4", // Reemplaza con tu código real
  },
  openGraph: {
    title: "Club de Ingenieros | Cursos Especializados",
    description: "Cursos profesionales de ingeniería civil, hidrología y análisis de cuencas con QGIS",
    url: "https://tusitio.vercel.app",
    siteName: "Club de Ingenieros",
    images: [
      {
        url: "https://tusitio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club de Ingenieros | Cursos Especializados",
    description: "Cursos profesionales de ingeniería",
    images: ["https://tusitio.vercel.app/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tusitio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}