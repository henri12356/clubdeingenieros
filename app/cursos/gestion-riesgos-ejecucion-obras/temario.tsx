'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookText, Clock, Code, Download, Link, Layers, FileText, Pointer, CalendarDays, Hourglass, MapPinned } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Lesson {
  id: string;
  title: string;
  description?: string; // Added for more detailed lesson info
  time?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  time?: string;
}

const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'MÓDULO I: INTRODUCCIÓN AL SIG Y QGIS EN CUENCAS HIDROGRÁFICAS',
    time: 'Duración por definir', // Actualizar con duración real si se conoce
    lessons: [
      { id: 'lesson-1-1', title: '1.1 - ¿Qué es un SIG y por qué es útil en el estudio de cuencas?', description: 'Conceptos fundamentales de los Sistemas de Información Geográfica y su relevancia en el análisis hidrológico.' },
      { id: 'lesson-1-2', title: '1.2 - Principales componentes de un SIG', description: 'Exploración de hardware, software, datos, personal y métodos que conforman un SIG.' },
      { id: 'lesson-1-3', title: '1.3 - Visión general de QGIS y su ecosistema', description: 'Introducción al software QGIS, sus funcionalidades principales y la comunidad de usuarios.' },
      { id: 'lesson-1-4', title: '1.4 - Concepto de cuenca hidrográfica y su importancia en la gestión territorial', description: 'Definición, características y el rol crítico de las cuencas en la planificación y manejo de recursos hídricos.' },
      { id: 'lesson-1-5', title: '1.5 - Descarga, instalación y configuración básica de QGIS', description: 'Guía paso a paso para la instalación y configuración inicial del software.' },
      { id: 'lesson-1-6', title: '1.6 - Interfaz de QGIS y exploración de herramientas clave', description: 'Familiarización con el entorno de QGIS y las herramientas esenciales para el trabajo geoespacial.' },
      { id: 'lesson-1-7', title: '1.7 - Descripción de elementos vectoriales y Ráster', description: 'Entendimiento de los diferentes tipos de datos geográficos (puntos, líneas, polígonos y datos de cuadrícula).' },
      { id: 'lesson-1-8', title: '1.8 - Creación de elementos vectoriales', description: 'Práctica en la digitalización y creación de nuevas capas vectoriales.' },
      { id: 'lesson-1-9', title: '1.9 - Edición de capas vectoriales', description: 'Técnicas para modificar y refinar geometrías existentes.' },
      { id: 'lesson-1-10', title: '1.10 - Calculadora de campos', description: 'Uso de la calculadora de campos para realizar operaciones y generar nuevos atributos en capas vectoriales.' },
    ],
  },
  {
    id: 'module-2',
    title: 'MÓDULO II: CREACIÓN Y EDICIÓN DE DATOS VECTORIALES Y CORRECCIÓN DE CAPAS RÁSTER',
    time: 'Duración por definir',
    lessons: [
      { id: 'lesson-2-1', title: '2.1 - Tipos de geometría vectorial: puntos, líneas y polígonos', description: 'Profundización en la representación de características geográficas con distintas geometrías.' },
      { id: 'lesson-2-2', title: '2.2 - Estructura de atributos en capas vectoriales', description: 'Manejo y organización de la información descriptiva asociada a cada elemento vectorial.' },
      { id: 'lesson-2-3', title: '2.3 - Digitación manual y edición', description: 'Técnicas avanzadas de digitalización y herramientas de edición.' },
      { id: 'lesson-2-4', title: '2.4 - Conceptos clave en capas ráster: resolución, píxeles, valor nulo', description: 'Entendimiento de las propiedades fundamentales de los datos ráster.' },
      { id: 'lesson-2-5', title: '2.5 - Corrección y reproyección de capas ráster', description: 'Métodos para ajustar, corregir y transformar sistemas de referencia de imágenes ráster.' },
      { id: 'lesson-2-6', title: '2.6 - Práctica: Crear una capa vectorial desde cero', description: 'Ejercicios prácticos de digitalización de elementos como límites de microcuencas o puntos hidrológicos.' },
      { id: 'lesson-2-7', title: '2.7 - Práctica: Uso del panel de atributos', description: 'Añadir, editar y calcular campos para enriquecer la información de las capas.' },
      { id: 'lesson-2-8', title: '2.8 - Práctica: Herramientas de edición avanzada', description: 'Aplicación de herramientas como dividir, fusionar y recortar geometrías.' },
      { id: 'lesson-2-9', title: '2.9 - Práctica: Añadir y unir Imágenes Ráster', description: 'Combinación de múltiples imágenes ráster para crear una cobertura continua.' },
    ],
  },
  {
    id: 'module-3',
    title: 'MÓDULO III: FUENTES DE DATOS Y PROYECCIONES CARTOGRÁFICAS',
    time: 'Duración por definir',
    lessons: [
      { id: 'lesson-3-1', title: '3.1 - Fuentes de datos geoespaciales', description: 'Conocimiento de diferentes fuentes para obtener Modelos Digitales de Elevación (DEM), shapefiles y coberturas de uso del suelo.' },
      { id: 'lesson-3-2', title: '3.2 - Proyecciones y sistemas de referencia espacial (EPSG, UTM, WGS84)', description: 'Comprensión de los sistemas de coordenadas y su importancia en la precisión geográfica.' },
      { id: 'lesson-3-3', title: '3.3 - Consideraciones para trabajar en estudios hidrológicos', description: 'Pautas específicas para la selección y preparación de datos en proyectos de hidrología.' },
      { id: 'lesson-3-4', title: '3.4 - Práctica: Descarga de datos del SRTM, Teselas de terreno, o servicios geoespaciales nacionales', description: 'Obtención de datos topográficos globales y locales.' },
      { id: 'lesson-3-5', title: '3.5 - Práctica: Descarga de capas Shapefiles', description: 'Acceso a datos vectoriales preexistentes para el análisis.' },
      { id: 'lesson-3-6', title: '3.6 - Práctica: Georreferenciación de una imagen ráster', description: 'Calibración de imágenes escaneadas (ej. cartas topográficas) para que coincidan con coordenadas geográficas.' },
      { id: 'lesson-3-7', title: '3.7 - Práctica: Clipping y reproyección de una capa DEM para ajustarla al área de estudio', description: 'Recorte y transformación de Modelos Digitales de Elevación para delimitar la zona de interés.' },
      { id: 'lesson-3-8', title: '3.8 - Práctica: Corrección de huecos en DEMs', description: 'Técnicas para eliminar imperfecciones en los Modelos Digitales de Elevación que afectan el análisis hidrológico.' },
    ],
  },
  {
    id: 'module-4',
    title: 'MÓDULO IV: DELIMITACIÓN DE CUENCAS HIDROGRÁFICAS CON MODELOS DIGITALES DE ELEVACIÓN (DEM)',
    time: 'Duración por definir',
    lessons: [
      { id: 'lesson-4-1', title: '4.1 - ¿Qué es un DEM y cómo se usa para análisis hidrológicos?', description: 'Funciones y aplicaciones de los Modelos Digitales de Elevación en la hidrología.' },
      { id: 'lesson-4-2', title: '4.2 - Principios del análisis de redes de drenaje y vertientes', description: 'Entendimiento de cómo el terreno define el flujo del agua y la formación de cuencas.' },
      { id: 'lesson-4-3', title: '4.3 - Algoritmos de llenado de depresiones y dirección del flujo', description: 'Métodos para corregir errores en DEMs y determinar la trayectoria del agua.' },
      { id: 'lesson-4-4', title: '4.4 - Práctica: Uso del complemento GRASS o SAGA en QGIS para delimitar una cuenca', description: 'Aplicación de herramientas geoespaciales avanzadas para la delimitación automática de cuencas.' },
      { id: 'lesson-4-5', title: '4.5 - Práctica: Procesamiento del DEM: Fill sinks, Flow direction, Flow accumulation', description: 'Pasos esenciales para preparar un DEM para el análisis hidrológico y derivar propiedades de flujo.' },
      { id: 'lesson-4-6', title: '4.6 - Práctica: Generación del cauce principal y delimitación de la cuenca', description: 'Identificación de la red de drenaje principal y el polígono que define la cuenca hidrográfica.' },
    ],
  },
  {
    id: 'module-5',
    title: 'MÓDULO V: ANÁLISIS DE RED DE DRENAJE Y DETERMINACIÓN DE PARÁMETROS DE UNA CUENCA',
    time: 'Duración por definir',
    lessons: [
      { id: 'lesson-5-1', title: '5.1 - Determinación de redes de drenaje y su clasificación (orden de Strahler)', description: 'Métodos para extraer la red hídrica y su jerarquización según el orden de Strahler.' },
      { id: 'lesson-5-2', title: '5.2 - Parámetros morfométricos básicos: densidad de drenaje, pendiente media, etc.', description: 'Cálculo e interpretación de métricas clave que describen la forma y características físicas de una cuenca.' },
      { id: 'lesson-5-3', title: '5.3 - Importancia en la modelación hidrológica', description: 'Cómo los parámetros morfométricos influyen en la respuesta hidrológica de una cuenca.' },
      { id: 'lesson-5-4', title: '5.4 - Práctica: Generación de la red de drenaje a partir del DEM procesado', description: 'Extracción detallada de la red fluvial a partir del Modelo Digital de Elevación.' },
      { id: 'lesson-5-5', title: '5.5 - Práctica: Determinación de parámetros morfológicos', description: 'Cálculo de la forma de la cuenca, factor de forma, coeficiente de compacidad, entre otros.' },
      { id: 'lesson-5-6', title: '5.6 - Práctica: Medición de parámetros morfométricos con herramientas de QGIS', description: 'Uso de las funcionalidades de QGIS para cuantificar la densidad de drenaje, longitud del cauce principal, etc.' },
    ],
  },
  {
    id: 'module-6',
    title: 'MÓDULO VI: ELABORACIÓN DE MAPAS TEMÁTICOS Y GENERACIÓN DE INFORME FINAL',
    time: 'Duración por definir',
    lessons: [
      { id: 'lesson-6-1', title: '6.1 - Elementos Cartográficos de un mapa', description: 'Componentes esenciales de un mapa (título, leyenda, escala, orientación, etc.) para una comunicación efectiva.' },
      { id: 'lesson-6-2', title: '6.2 - Buenas prácticas para presentación de mapas en informes técnicos', description: 'Consejos de diseño y simbología para crear mapas claros y profesionales.' },
      { id: 'lesson-6-3', title: '6.3 - Estructura mínima de un informe de análisis espacial en SIG', description: 'Lineamientos para la redacción de informes técnicos basados en análisis geoespaciales.' },
      { id: 'lesson-6-4', title: '6.4 - Práctica: Composición de mapas con el diseñador de impresión', description: 'Uso de la herramienta de diseño de impresión de QGIS para crear layouts de mapa profesionales.' },
      { id: 'lesson-6-5', title: '6.5 - Práctica: Inserción de leyendas, escalas, norte, y metadatos cartográficos', description: 'Adición de todos los elementos necesarios para la correcta interpretación de los mapas.' },
      { id: 'lesson-6-6', title: '6.6 - Práctica: Exportación de mapas y armado de un informe básico con resultados del curso', description: 'Generación de mapas en diferentes formatos y compilación de un informe final que resuma los análisis realizados.' },
    ],
  },
];

const Temario: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const filteredModules = useMemo(() => {
    if (!searchTerm) {
      return courseModules;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return courseModules.filter(module =>
      module.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      module.lessons.some(lesson =>
        lesson.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (lesson.description && lesson.description.toLowerCase().includes(lowerCaseSearchTerm))
      )
    ).map(module => ({
      ...module,
      lessons: module.lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (lesson.description && lesson.description.toLowerCase().includes(lowerCaseSearchTerm))
      ),
    }));
  }, [searchTerm]);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp group invite link
    const whatsappLink = 'https://chat.whatsapp.com/YOUR_WHATSAPP_GROUP_INVITE_LINK';
    window.open(whatsappLink, '_blank');
  };

  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-200" variants={itemVariants}>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-0">
          <Layers className="h-7 w-7 sm:h-8 sm:w-8 text-red-600" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Lo que aprenderás
          </h1>
        </div>
      </motion.div>

      {/* Course Details (Added based on your input) */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-gray-700" variants={itemVariants}>
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <MapPinned className="h-5 w-5 text-red-600" />
          <span className="font-semibold pr-1">Modalidad: </span> Virtual
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <CalendarDays className="h-5 w-5 text-red-600" />
          <span className="font-semibold pr-1">Inicio:</span> XX/XX/XXXX {/* Placeholder */}
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <Hourglass className="h-5 w-5 text-red-600" />
          <span className="font-semibold ">Duración:</span> 03 semanas
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          <Clock className="h-5 w-5 text-red-500" />
          <span className="font-semibold ">Horario:</span> 19:00 a 21:00
        </div>
      </motion.div>

      {/* Objective Section */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center">
          <BookText className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Objetivo del Curso
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Formar al estudiante para ser capaz de aplicar herramientas avanzadas de QGIS para realizar análisis hidrológicos,
          incluyendo la delimitación de cuencas hidrográficas, el cálculo de parámetros morfométricos, la elaboración de balances hídricos y la generación de mapas
          temáticos especializados. Estas capacidades fortalecerán su competencia para desarrollar estudios técnicos en gestión de recursos hídricos, empleando
          tecnologías geoespaciales con precisión y eficiencia para enfrentar problemáticas ambientales.
        </p>
      </motion.div>

      {/* Methodology Section */}
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center">
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
          Metodología
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-base sm:text-lg">
          <li>Clases dictadas en vivo.</li>
          <li>Fundamento teórico y práctico.</li>
          <li>Acceso a clases grabadas.</li>
        </ul>
      </motion.div>

      {/* Search Input */}
      <motion.div className="relative mb-6 sm:mb-8" variants={itemVariants}>
        <Input
          type="text"
          placeholder="Buscar lecciones o módulos..."
          className="w-full pl-9 pr-3 py-2 text-base sm:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      </motion.div>

      {/* Course Modules (Accordion) */}
      <Accordion type="single" collapsible className="w-full mb-8 sm:mb-10">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <motion.div key={module.id} variants={itemVariants}>
              <AccordionItem value={module.id} className="border-b border-gray-200 last:border-b-0">
                <AccordionTrigger className="flex flex-col items-start sm:flex-row sm:items-center justify-between py-3 sm:py-4 text-lg sm:text-xl font-semibold hover:no-underline text-gray-800 hover:text-red-600 transition-colors cursor-pointer text-left">
                  <span className="flex-1 mb-1 sm:mb-0">{module.title}</span>
                  {module.time && (
                    <span className="text-sm text-gray-500 sm:ml-4 flex items-center mt-1 sm:mt-0">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {module.time}
                    </span>
                  )}
                </AccordionTrigger>
                <AccordionContent className="pb-1 sm:pb-2 text-gray-700">
                  <ul className="space-y-2 sm:space-y-3 pl-3 sm:pl-4 border-l border-gray-300">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex flex-col items-start py-1.5 px-2 sm:px-3 rounded-md hover:bg-blue-50 transition-colors cursor-pointer text-sm sm:text-base">
                        <div className="flex items-center mb-1 sm:mb-0">
                          <BookText className="h-4 w-4 text-red-500 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="font-medium">{lesson.title}</span>
                        </div>
                        {lesson.description && (
                          <p className="text-xs sm:text-sm text-gray-600 pl-6 sm:pl-7 mt-0.5 leading-snug">
                            {lesson.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))
        ) : (
          <motion.p variants={itemVariants} className="text-center text-gray-600 text-base sm:text-lg py-6 sm:py-8">
            No se encontraron módulos o lecciones con la búsqueda "{searchTerm}".
          </motion.p>
        )}
      </Accordion>

      {/* RECURSOS IMPORTANTES A UTILIZAR Section */}
      <motion.div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2" />
          Herramientas Informáticas
        </h2>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>QGIS</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>EXCEL</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>GOOGLE EARTH</span>
          </li>
        </ul>
      </motion.div>

      {/* MATERIALES DE APOYO Section */}
      <motion.div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
          Materiales de Apoyo
        </h2>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Guía de configuración de entorno (PDF)</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-blue-500 hover:text-blue-700 justify-center sm:justify-start">
              <Download className="h-4 w-4 mr-1" /> Descargar
            </Button>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Conjunto de datos de práctica (Link)</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-blue-500 hover:text-blue-700 justify-center sm:justify-start">
              <Link className="h-4 w-4 mr-1" /> Ir al Enlace
            </Button>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center text-gray-700 text-base sm:text-lg py-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
              <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Ejercicios de práctica avanzados (ZIP)</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-blue-500 hover:text-blue-700 justify-center sm:justify-start">
              <Download className="h-4 w-4 mr-1" /> Descargar
            </Button>
          </li>
        </ul>
      </motion.div>

      {/* WhatsApp Community Section - Revised to match image_afd921.png */}
      <motion.div className="mt-10 pt-6 border-t border-gray-200 text-center flex flex-col items-center" variants={itemVariants}>
        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 px-4 leading-snug">
          ÚNETE A NUESTRA COMUNIDAD PRIVADA DE WHATSAPP PARA RECIBIR EL LINK DE ZOOM
        </p>
        <Button
          onClick={handleWhatsAppClick}
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-14 sm:h-16 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-yellow-300 text-xl sm:text-2xl font-extrabold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center space-x-3 group uppercase tracking-wide"
        >
          <Pointer className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 rotate-12" />
          <span>(HAGA CLIC AQUÍ)</span>
          <Pointer className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 -rotate-12 transform scale-x-[-1]" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Temario;