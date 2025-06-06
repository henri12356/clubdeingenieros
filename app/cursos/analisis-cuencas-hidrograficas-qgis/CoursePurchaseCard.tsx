// components/CourseDetailsCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { CheckCircle, Clock, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CourseDetailsCard: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
  };

  const PROMOTION_END_DATE = {
    year: 2025,
    month: 6, // June
    day: 15,
    hour: 12,
    minute: 0,
  };

  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(
      PROMOTION_END_DATE.year,
      PROMOTION_END_DATE.month - 1, // Adjust for 0-indexed month (June is 5)
      PROMOTION_END_DATE.day,
      PROMOTION_END_DATE.hour,
      PROMOTION_END_DATE.minute,
      0
    );
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState<'plus' | 'regular'>('plus');

  useEffect(() => {
    setHasMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (unit: number) => unit.toString().padStart(2, '0');

  const handlePriceOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPriceOption(event.target.value as 'plus' | 'regular');
  };

  // Define simple button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };


  // If the component hasn't mounted yet (server-side rendering), return static content
  if (!hasMounted) {
    return (
      <motion.div
        className="w-full lg:w-96 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 flex flex-col"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Reference Image Section */}
        <div className="relative w-full rounded-lg overflow-hidden mb-6">
          <Image
            src="/banner.webp"
            alt="Referencia del Curso"
            layout="responsive"
            width={600}
            height={300}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Price Section - Server-side placeholder */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="pricePlus"
                name="priceOption"
                className="mr-3 h-5 w-5 text-blue-600"
                value="plus"
                checked={true} // Default to checked on SSR for 'plus' to match initial state
                readOnly // Essential for SSR to prevent "controlled to uncontrolled" error
              />
              <label htmlFor="pricePlus" className="text-gray-600 text-lg font-semibold">
                Precio con Prueba Plus
              </label>
            </div>
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">PLUS</span>
          </div>
          <div className="flex items-end mb-4">
            <span className="text-4xl font-extrabold text-red-600 mr-2">S/ 3.99</span>
            <span className="text-xl text-gray-500 line-through">S/ 45.90</span>
            <span className="text-green-600 font-semibold ml-auto">91% Dto.</span>
          </div>
          {/* Render the discounted button as a placeholder on SSR */}
          <Button className="w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-lg shadow-md">
            🛒 Comprar con Prueba Plus
          </Button>
          <p className="text-sm text-center text-red-500 mt-3">
            La oferta termina en <span className="font-bold">00h : 00m : 00s</span>
          </p>
        </div>

        {/* Regular Price Section - Server-side placeholder */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="regularPrice"
              name="priceOption"
              className="mr-3 h-5 w-5 text-blue-600"
              value="regular"
              checked={false} // Always unchecked on SSR for 'regular'
              readOnly // Essential for SSR to prevent "controlled to uncontrolled" error
            />
            <label htmlFor="regularPrice" className="text-xl font-semibold text-gray-800">Precio regular</label>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-3">S/ 45.90</p>
          <p className="text-sm text-gray-600">Pagar precio completo</p>
          {/* No button placeholder for regular price on SSR, it will appear on client-side interaction */}
        </div>

        {/* Benefits and Certificate Sections are the same */}
        <div className="space-y-4 text-gray-700 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>99% valoraciones positivas (<span className="font-semibold">10K</span>)</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
            <span>224 estudiantes</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
            <span>32 lecciones (3h 22m)</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <span>7 recursos adicionales (3 archivos)</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>Online y a tu ritmo</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span>Disponible en la app</span>
          </div>
          <div className="flex items-center">
            <Award className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
            <span>Audio: Español</span>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            ¡Obtén tu Certificado al Finalizar!
          </h3>
          <div className="relative w-full rounded-lg overflow-hidden">
            <Image
              src="/banner.webp"
              alt="Certificado del Curso"
              layout="responsive"
              width={800}
              height={500}
              objectFit="contain"
              className="rounded-lg border border-gray-200"
            />
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Acredita tus conocimientos y potencia tu perfil profesional.
          </p>
        </div>
      </motion.div>
    );
  }

  // Client-side render: dynamic content
  return (
    <motion.div
      className="w-full lg:w-96 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Reference Image Section */}
      <div className="relative w-full rounded-lg overflow-hidden mb-6">
        <Image
          src="/banner.webp"
          alt="Referencia del Curso"
          layout="responsive"
          width={600}
          height={300}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Price Section (Discounted) */}
      <div
        className={`mb-6 pb-6 border-b border-gray-200 cursor-pointer transition-all duration-200 ease-in-out ${selectedPriceOption === 'plus' ? 'bg-blue-50/50 rounded-lg p-2 -mx-2' : ''}`} // Added selection styling
        onClick={() => setSelectedPriceOption('plus')}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="pricePlus"
              name="priceOption"
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
              value="plus"
              checked={selectedPriceOption === 'plus'}
              onChange={handlePriceOptionChange}
            />
            <label htmlFor="pricePlus" className="text-gray-600 text-lg font-semibold cursor-pointer">
              Precio con Prueba Plus
            </label>
          </div>
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">PLUS</span>
        </div>
        <div className="flex items-end mb-4">
          <span className="text-4xl font-extrabold text-red-600 mr-2">S/ 3.99</span>
          <span className="text-xl text-gray-500 line-through">S/ 45.90</span>
          <span className="text-green-600 font-semibold ml-auto">91% Dto.</span>
        </div>
        {/* Use AnimatePresence for smooth mounting/unmounting */}
        <AnimatePresence>
          {selectedPriceOption === 'plus' && (
            <motion.div
              key="button-plus" // Unique key for AnimatePresence
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants}
            >
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 rounded-lg transition-colors shadow-md mt-4">
                🛒 Comprar con Prueba Plus
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-sm text-center text-red-500 mt-3">
          La oferta termina en{' '}
          {timeLeft.days > 0 ? (
            <span className="font-bold">
              {formatTime(timeLeft.days)}d : {formatTime(timeLeft.hours)}h : {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
            </span>
          ) : timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <span className="font-bold">
              {formatTime(timeLeft.hours)}h : {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
            </span>
          ) : (
            <span className="font-bold text-gray-700">Oferta Finalizada</span>
          )}
        </p>
      </div>

      {/* Regular Price Section */}
      <div
        className={`mb-6 pb-6 border-b border-gray-200 cursor-pointer transition-all duration-200 ease-in-out ${selectedPriceOption === 'regular' ? 'bg-green-50/50 rounded-lg p-2 -mx-2' : ''}`} // Added selection styling
        onClick={() => setSelectedPriceOption('regular')}
      >
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="regularPrice"
            name="priceOption"
            className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
            value="regular"
            checked={selectedPriceOption === 'regular'}
            onChange={handlePriceOptionChange}
          />
          <label htmlFor="regularPrice" className="text-xl font-semibold text-gray-800 cursor-pointer">
            Precio regular
          </label>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-3">S/ 45.90</p>
        <p className="text-sm text-gray-600">Pagar precio completo</p>
        {/* Use AnimatePresence for smooth mounting/unmounting */}
        <AnimatePresence>
          {selectedPriceOption === 'regular' && (
            <motion.div
              key="button-regular" // Unique key for AnimatePresence
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants}
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-3 rounded-lg transition-colors shadow-md mt-4">
                🛒 Comprar Ahora (Precio Regular)
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Benefits Section */}
      <div className="space-y-4 text-gray-700 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <span>99% valoraciones positivas (<span className="font-semibold">10K</span>)</span>
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
          <span>224.605 estudiantes</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
          <span>32 lecciones (3h 22m)</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
          <span>7 recursos adicionales (3 archivos)</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <span>Online y a tu ritmo</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <span>Disponible en la app</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
          <span>Audio: Español, Inglés</span>
        </div>
      </div>

      {/* Certificate Section */}
      <div className="pt-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          ¡Obtén tu Certificado al Finalizar!
        </h3>
        <div className="relative w-full rounded-lg overflow-hidden">
          <Image
            src="/banner.webp"
            alt="Certificado del Curso"
            layout="responsive"
            width={800}
            height={500}
            objectFit="contain"
            className="rounded-lg border border-gray-200"
          />
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm">
          Acredita tus conocimientos y potencia tu perfil profesional.
        </p>
      </div>
    </motion.div>
  );
};

export default CourseDetailsCard;