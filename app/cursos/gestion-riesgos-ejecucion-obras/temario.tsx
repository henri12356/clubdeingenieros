'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookText, Clock, Code, Download, Link, Layers, FileText, Pointer } from 'lucide-react'; // Changed MessageCircle to Pointer

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
    id: 'module-0',
    title: 'MÓDULO 0 : INTRODUCCIÓN GENERAL',
    time: '25 minutos',
    lessons: [
      { id: 'lesson-0-1', title: '0.1 - ¿Qué es la programación?', time: '5 min' },
      { id: 'lesson-0-2', title: '0.2 - ¿Qué es el desarrollo de software?', time: '7 min' },
      { id: 'lesson-0-3', title: '0.3 - Uso de la IA en la programación', time: '8 min' },
      { id: 'lesson-0-4', title: '0.4 - Ciclo de vida de un proyecto de software', time: '10 min' },
      { id: 'lesson-0-5', title: '0.5 - Cómo planificar un proyecto', time: '12 min' },
      { id: 'lesson-0-6', title: '0.6 - Taller: ¿Cómo planificar un proyecto de software con Inteligencia Artificial?', time: '15 min' },
    ],
  },
  {
    id: 'module-1',
    title: '1. Fundamentos de la programación',
    time: '30 minutos',
    lessons: [
      { id: 'lesson-1-1', title: '1.1 - Variables y tipos de datos', time: '10 min' },
      { id: 'lesson-1-2', title: '1.2 - Operadores', time: '8 min' },
      { id: 'lesson-1-3', title: '1.3 - Estructura de datos básicas', time: '12 min' },
    ],
  },
  {
    id: 'module-2',
    title: '2. Condicionales',
    time: '20 minutos',
    lessons: [
      { id: 'lesson-2-1', title: '2.1 - If/Else', time: '10 min' },
      { id: 'lesson-2-2', title: '2.2 - Switch', time: '10 min' },
    ],
  },
  {
    id: 'module-3',
    title: '3. Ciclos',
    time: '25 minutos',
    lessons: [
      { id: 'lesson-3-1', title: '3.1 - For loop', time: '12 min' },
      { id: 'lesson-3-2', title: '3.2 - While loop', time: '13 min' },
    ],
  },
  {
    id: 'module-4',
    title: '4. Funciones',
    time: '18 minutos',
    lessons: [
      { id: 'lesson-4-1', title: '4.1 - Creación de funciones', time: '9 min' },
      { id: 'lesson-4-2', title: '4.2 - Parámetros y retorno', time: '9 min' },
    ],
  },
  {
    id: 'module-5',
    title: '5. Programación Orientada a Objetos (OOP)',
    time: '40 minutos',
    lessons: [
      { id: 'lesson-5-1', title: '5.1 - Clases y Objetos', time: '10 min' },
      { id: 'lesson-5-2', title: '5.2 - Herencia', time: '10 min' },
      { id: 'lesson-5-3', title: '5.3 - Polimorfismo', time: '10 min' },
      { id: 'lesson-5-4', title: '5.4 - Encapsulamiento', time: '10 min' },
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
        lesson.title.toLowerCase().includes(lowerCaseSearchTerm)
      )
    ).map(module => ({
      ...module,
      lessons: module.lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(lowerCaseSearchTerm)
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
      className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-gray-200" variants={itemVariants}>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-0">
          <Layers className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Lo que aprenderás:
          </h1>
        </div>
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
                <AccordionTrigger className="flex flex-col items-start sm:flex-row sm:items-center justify-between py-3 sm:py-4 text-lg sm:text-xl font-semibold hover:no-underline text-gray-800 hover:text-blue-600 transition-colors cursor-pointer text-left">
                  <span className="flex-1 mb-1 sm:mb-0">{module.title}</span>
                  {module.time && (
                    <span className="text-sm text-gray-500 sm:ml-4 flex items-center mt-1 sm:mt-0">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {module.time}
                    </span>
                  )}
                </AccordionTrigger>
                <AccordionContent className="pb-1 sm:pb-2 text-gray-700">
                  <ul className="space-y-1 sm:space-y-2 pl-3 sm:pl-4 border-l border-gray-300">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex flex-col items-start sm:flex-row sm:items-center py-1.5 px-2 sm:px-3 rounded-md hover:bg-blue-50 transition-colors cursor-pointer text-sm sm:text-base">
                        <div className="flex items-center mb-1 sm:mb-0">
                          <BookText className="h-4 w-4 text-blue-500 mr-2 sm:mr-3 flex-shrink-0" />
                          <span className="flex-1">{lesson.title}</span>
                        </div>
                        {lesson.time && (
                          <span className="text-xs text-gray-500 sm:ml-2 flex items-center mt-1 sm:mt-0 sm:self-center">
                            <Clock className="h-3 w-3 mr-1" /> {lesson.time}
                          </span>
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
          Recursos Importantes a Utilizar
        </h2>
        <ul className="list-none space-y-2 sm:space-y-3 pl-0">
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Google Colab</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <Link className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>GitHub</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Visual Studio Code</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Python</span>
          </li>
          <li className="flex items-center text-gray-700 text-base sm:text-lg">
            <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
            <span>JavaScript</span>
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
              <span>Recursos adicionales de IA (Link)</span>
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
        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 px-4 leading-snug"> {/* Adjusted font size and spacing for the text above the button */}
          ÚNETE A NUESTRA COMUNIDAD PRIVADA DE WHATSAPP PARA RECIBIR EL LINK DE ZOOM
        </p>
        <Button
          onClick={handleWhatsAppClick}
          // Solid green background from the image
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-14 sm:h-16 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-yellow-300 text-xl sm:text-2xl font-extrabold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center space-x-3 group uppercase tracking-wide" /* */
        >
          {/* Using Pointer icon as a substitute for the finger emoji */}
          <Pointer className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 rotate-12" /> {/* Rotated for more dynamic feel */}
          <span>(HAGA CLIC AQUÍ)</span> {/* */}
          <Pointer className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 -rotate-12 transform scale-x-[-1]" /> {/* Flipped and rotated for the other pointer */}
        </Button>
        {/* Removed the small disclaimer text as it's not in the image */}
      </motion.div>
    </motion.div>
  );
};

export default Temario;