import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Certificado = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Ligeramente reducido para una aparición más rápida
        delayChildren: 0.2, // Ligeramente reducido
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Desplazamiento Y inicial sutil
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120, // Resorte ligeramente más rígido
        damping: 12,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 }, // Desplazamiento X inicial reducido
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.1, // Retraso ajustado
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 }, // Escala ligeramente menos dramática
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.2, // Retraso ajustado
      },
    },
  };

  // Variantes mejoradas para los logos: sin "marcos" y con una transición más fluida
  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.3, // Retraso ajustado
      },
    },
  };

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 font-sans text-center overflow-hidden relative">
      {/* Opcional: Añade un patrón de fondo sutil para mayor profundidad */}
      <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.svg')] opacity-5 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10"> {/* Asegura que el contenido esté sobre el fondo */}
        {/* Título Principal */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-12 md:mb-16 leading-tight tracking-tight drop-shadow-sm"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-red-600">VALIDACIÓN</span> Y <span className="text-gray-900">CERTIFICACIÓN</span>
        </motion.h2>

        {/* Sección del Certificado */}
        <div className="mb-12 md:mb-16">
          <motion.p
            className="text-lg sm:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            El programa de capacitación será certificado con 120 horas académicas, con el respaldo de Educare Internacional y auspiciado por la Cámara de Comercio de Lima.
          </motion.p>
          <motion.div
            className="flex justify-center items-center p-2 sm:p-4 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden max-w-full lg:max-w-4xl mx-auto border-4 border-red-100 transform hover:scale-[1.01] transition-transform duration-300"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Image
              src="/certificado.png" // Ruta a tu imagen de certificado desde la carpeta public
              alt="Certificado de Capacitación"
              width={1200} // Ancho aumentado para una imagen más nítida en pantallas grandes
              height={750} // Ajusta la altura para mantener la relación de aspecto
              layout="responsive"
              objectFit="contain"
              className="rounded-xl border border-gray-100" // Borde sutil para la imagen misma
            />
          </motion.div>
        </div>

        {/* Sección de Logos Mejorada */}
       <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mt-12 md:mt-16 justify-items-center"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {/* Logo 1: Educare Internacional */}
  <motion.div
    className="group flex flex-col items-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105"
    variants={logoVariants}
  >
    <Image
      src="/logo01.png"
      alt="Educare Internacional Logo"
      width={120}
      height={120}
      objectFit="contain"
      className="filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
    />
    <p className="text-gray-800 group-hover:text-red-600 text-base mt-4 font-bold transition-colors duration-300">
      EDUCARE INTERNACIONAL
    </p>
  </motion.div>

  {/* Logo 2: Asociación de Enfermeros del Perú */}
  <motion.div
    className="group flex flex-col items-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105"
    variants={logoVariants}
  >
    <Image
      src="/logo01.png"
      alt="Asociación de Enfermeros del Perú Logo"
      width={120}
      height={120}
      objectFit="contain"
      className="filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
    />
    <p className="text-gray-800 group-hover:text-red-600 text-base mt-4 text-center font-bold transition-colors duration-300">
      ASOCIACIÓN DE ENFERMEROS DEL PERÚ
    </p>
  </motion.div>

  {/* Logo 3: Cámara de Comercio de Lima */}
  <motion.div
    className="group flex flex-col items-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-105"
    variants={logoVariants}
  >
    <Image
      src="/logo01.png"
      alt="Cámara de Comercio de Lima Logo"
      width={120}
      height={120}
      objectFit="contain"
      className="filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
    />
    <p className="text-gray-800 group-hover:text-red-600 text-base mt-4 text-center font-bold transition-colors duration-300">
      CÁMARA DE COMERCIO DE LIMA
    </p>
  </motion.div>
</motion.div>


        {/* Llamada a la acción al final */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mt-16 md:mt-20 px-6 py-4 bg-red-600 rounded-full shadow-lg inline-block cursor-pointer hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          ¡NO PIERDAS LA OPORTUNIDAD DE FORTALECER TU PERFIL PROFESIONAL!
        </motion.p>
      </div>
    </section>
  );
};

export default Certificado;