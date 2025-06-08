// app/cursos/analisis-cuencas-hidrograficas-qgis/page.tsx
'use client'; // Necesario porque contiene componentes cliente o lógica de estado

import Footer from '@/app/footer';
import Navbar from '@/app/navbar';
import Link from 'next/link';
// Asumiendo que estos componentes son reutilizables o se adaptarán para este curso
import Certificado from './certificado';
import CourseDetailsCard from './CoursePurchaseCard';
import DocenteSection from './docente';
import Hero from './hero'; // Asumiendo Hero es aún necesario por encima de las dos columnas
import Planes from './planes';
import Promocion from './promocion';
import Temario from './temario';


export default function AnalisisCuencasHidrograficasQGISPage() { // Renombrado el componente principal
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800"> {/* Set background and text color for the whole page */}
      {/* Schema.org Structured Data para el curso */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Análisis de Cuencas Hidrográficas con QGIS", // Nombre del curso
            "description": "Curso completo sobre análisis, modelado y gestión de cuencas hidrográficas utilizando QGIS, incluyendo herramientas para la prevención de desastres y planificación de recursos hídricos.", // Descripción detallada del curso
            "provider": {
              "@type": "Organization",
              "name": "Club de Ingenieros",
              "sameAs": "https://clubdeingenieros.vercel.app/cursos/analisis-cuencas-hidrograficas-qgis" // URL principal de tu organización
            },
            "image": "https://clubdeingenieros.vercel.app/banner.webp", // Ajusta a la imagen específica del curso si la hay, sino usa la genérica
            "offers": {
              "@type": "Offer",
              "price": "99", // Precio del curso (ejemplo, ajusta si es diferente)
              "priceCurrency": "PEN" // Moneda (PEN para Soles peruanos)
            },
            // Opcional: Agregar información sobre el instructor si tienes un docente específico
            // "hasCourseInstance": {
            //   "@type": "CourseInstance",
            //   "instructor": {
            //     "@type": "Person",
            //     "name": "Nombre del Docente"
            //   }
            // }
          })
        }}
      />

      <Navbar />

      {/* Breadcrumbs para SEO y navegación */}
      <nav aria-label="Ruta de navegación" className="container mx-auto px-4 py-3 text-sm bg-white">
        <ol className="flex space-x-2">
          <li><Link href="/" className="text-blue-600 hover:underline">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/cursos" className="text-blue-600 hover:underline">Cursos</Link></li>
          <li>/</li>
          <li className="text-gray-600">Análisis de Cuencas Hidrográficas con QGIS</li> {/* Texto del curso actual */}
        </ol>
      </nav>

      <Hero /> {/* Tu sección Hero existente, asegúrate de que su contenido sea para este curso */}

      {/* Área de contenido principal con dos columnas */}
      <main className="container mx-auto px-2  py-8 flex flex-col lg:flex-row gap-8">
       <div className="container mx-auto px-2 py-8 lg:flex lg:space-x-8">
        {/* Sección Izquierda: Temario */}
        <div className="lg:w-2/3 mb-8 lg:mb-0">
          <Temario /> {/* Asegúrate de que el contenido de Temario sea el del curso de cuencas */}
        </div>
        {/* Sección Derecha: Tarjeta de Detalles/Compra del Curso */}
        <div className="lg:w-1/3">
          <CourseDetailsCard /> {/* Asegúrate de que los detalles sean los de este curso */}
        </div>

       </div>
      </main>
      <Certificado/>
      <DocenteSection/> {/* Asegúrate de que esta sección muestre el docente correcto para este curso */}
      <Planes/>
      <Promocion/>
      <Footer />
    </div>
  );
}