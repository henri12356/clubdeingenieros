// app/cursos/gestion-riesgos-ejecucion-obras/page.tsx
'use client'; // Necesario porque contiene componentes cliente o lógica de estado

import Footer from '@/app/footer';
import Navbar from '@/app/navbar';
import Link from 'next/link';
import Hero from './hero'; // Assuming Hero is still needed above the two columns
import Temario from './temario';
import CoursePurchaseCard from './CoursePurchaseCard';
import CourseDetailsCard from './CoursePurchaseCard';
import DocenteSection from './docente';
import Planes from './planes';
import Certificado from './certificado';
import Promocion from './promocion';


export default function GestionRiesgosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800"> {/* Set background and text color for the whole page */}
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Gestión de Riesgos en Obras Civiles",
            "description": "Curso completo sobre gestión de riesgos en construcción según normativa OSCE 012-2017",
            "provider": {
              "@type": "Organization",
              "name": "Club de Ingenieros",
              "sameAs": "https://clubdeingenieros.com"
            },
            "image": "https://clubdeingenieros.com/images/og-riesgos.jpg",
            "offers": {
              "@type": "Offer",
              "price": "899",
              "priceCurrency": "PEN"
            }
          })
        }}
      />

      <Navbar />

      {/* Breadcrumbs para SEO */}
      <nav aria-label="Ruta de navegación" className="container mx-auto px-4 py-3 text-sm bg-white">
        <ol className="flex space-x-2">
          <li><Link href="/" className="text-blue-600 hover:underline">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/cursos" className="text-blue-600 hover:underline">Cursos</Link></li>
          <li>/</li>
          <li className="text-gray-600">Gestión de Riesgos</li>
        </ol>
      </nav>

      <Hero /> {/* Your existing Hero section */}

      {/* Main content area with two columns */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
       <div className="container mx-auto px-4 py-8 lg:flex lg:space-x-8">
      {/* Left Section: Temario */}
      <div className="lg:w-2/3 mb-8 lg:mb-0">
        <Temario />
      </div>

      {/* Right Section: Course Details Card */}
      <div className="lg:w-1/3">
        <CourseDetailsCard />
      </div>
    </div>
      </main>
      <DocenteSection/>
      <Planes/>
       <Certificado/>
       <Promocion/>
      <Footer />
    </div>
  );
}