// components/Promocion.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Promocion = () => {
  const initialCoupons = 20;
  // Set initial time to 10 minutes * 60 seconds/minute
  const initialTimeInSeconds = 20 * 60;
  const price = 99; // Define the price

  // Initialize with initialCoupons. We'll still save this to localStorage.
  const [availableCoupons, setAvailableCoupons] = useState(initialCoupons);

  // Initialize timeLeft directly with initialTimeInSeconds.
  // This ensures it resets on every component mount (page refresh).
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState('');
  const [couponReserved, setCouponReserved] = useState(0);

  // Effect to load coupons from localStorage only on the client
  // This part remains as you likely want coupon availability to persist.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCoupons = localStorage.getItem('availableCoupons');
      if (savedCoupons) {
        setAvailableCoupons(parseInt(savedCoupons, 10));
      }
    }
  }, []); // Run only once on component mount

  // Effect to save coupons to localStorage and check for celebration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('availableCoupons', availableCoupons.toString());
      if (availableCoupons === 0) {
        setShowCelebration(true);
      }
    }
  }, [availableCoupons]);

  // Effect for the timer
  useEffect(() => {
    // No need to save timeLeft to localStorage if it resets on refresh.
    // if (typeof window !== 'undefined') {
    //   localStorage.setItem('timeLeft', timeLeft.toString());
    // }

    if (timeLeft <= 0) { // Removed '&& availableCoupons > 0' as timer stopping when 0 coupons is handled by the check below
      return;
    }

    if (availableCoupons === 0) {
      setShowCelebration(true);
      return; // Stop the timer if coupons are 0
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, availableCoupons]); // Keep timeLeft and availableCoupons in dependencies for timer logic

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(remainingSeconds).padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  const handlePurchaseClick = (paymentMethod: React.SetStateAction<string>) => {
    if (availableCoupons > 0 && timeLeft > 0) {
      setCurrentPaymentMethod(paymentMethod);
      setCouponReserved(initialCoupons - availableCoupons + 1); // Show which coupon number is "reserved"
      setShowConfirmationModal(true);
    } else if (availableCoupons === 0) {
      alert("¡Lo sentimos! Los cupones se han agotado.");
    } else if (timeLeft <= 0) {
      alert("¡Lo sentimos! El tiempo de la promoción ha terminado.");
    }
  };

  const confirmPurchase = () => {
    setAvailableCoupons((prevCoupons) => prevCoupons - 1);
    setShowConfirmationModal(false);
    alert(`Compra confirmada con ${currentPaymentMethod}. Cupones restantes: ${availableCoupons - 1}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Top Promotion Banner */}
      <div className="bg-red-600 text-white text-center py-3 rounded-lg mb-8 flex items-center justify-center">
        <span className="text-2xl mr-2">⚠️</span>
        <h1 className="text-xl md:text-2xl font-bold uppercase">APROVECHA LA PROMOCIÓN DE PRE-VENTA:</h1>
        <span className="text-2xl ml-2">⏰</span>
      </div>

      {/* Coupon and Timer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">CUPOS DISPONIBLES 🥳</h2>
          {showCelebration ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="text-green-600 text-3xl md:text-4xl font-bold"
            >
              🎉 ¡Felicidades! ¡Todos los cupones se agotaron! 🎉
            </motion.div>
          ) : (
            <div className="text-purple-700 text-5xl md:text-6xl font-extrabold mb-4">{availableCoupons}</div>
          )}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
            <button
              onClick={() => handlePurchaseClick('Yape')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={availableCoupons === 0 || timeLeft <= 0}
            >
              Yape
            </button>
            <button
              onClick={() => handlePurchaseClick('Plin')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={availableCoupons === 0 || timeLeft <= 0}
            >
              Plin
            </button>
            <button
              onClick={() => handlePurchaseClick('Transferencia')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={availableCoupons === 0 || timeLeft <= 0}
            >
              Transferencia
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">TIEMPO RESTANTE</h2>
          <div className="flex justify-center space-x-2 sm:space-x-4 text-3xl sm:text-4xl font-extrabold text-gray-800">
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded">{time.days}</span>
              <span className="text-xs sm:text-sm font-normal">DÍAS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded">{time.hours}</span>
              <span className="text-xs sm:text-sm font-normal">HORAS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded">{time.minutes}</span>
              <span className="text-xs sm:text-sm font-normal">MINUTOS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gray-200 p-2 rounded">{time.seconds}</span>
              <span className="text-xs sm:text-sm font-normal">SEGUNDOS</span>
            </div>
          </div>
          <p className="text-gray-600 mt-6 text-xl md:text-2xl font-bold">
            INVERSIÓN: <span className="text-purple-600">S/.{price}</span> <span className="text-sm">(Único Pago)</span>
          </p>
          <div className="mt-4 text-left text-gray-700 text-sm max-w-sm mx-auto">
            <p className="flex items-center mb-1"><span className="text-green-500 mr-2">✔</span> CERTIFICADO 120 HORAS</p>
            <p className="flex items-center mb-1"><span className="text-green-500 mr-2">✔</span> VIDEOS</p>
            <p className="flex items-center mb-1"><span className="text-green-500 mr-2">✔</span> MATERIALES</p>
            <p className="flex items-center mb-1"><span className="text-green-500 mr-2">✔</span> LIBRO NANDA</p>
            <p className="flex items-center"><span className="text-green-500 mr-2">✔</span> AUDIO LIBRO</p>
          </div>
          <p className="text-gray-500 text-xs mt-4 flex items-center justify-center text-center">
            <span className="text-yellow-500 mr-1">▲</span> Una vez realizado el Yape, Transferencia, envíe al WhatsApp: <a href="https://wa.me/51922900001" className="text-blue-500 ml-1 hover:underline">+51 922900001</a>
          </p>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">FORMAS DE PAGO</h2>
          <p className="font-bold text-gray-700 mb-2">DEPOSITO A NOMBRE: <span className="font-normal">Luis Rodrigo Flores González</span></p>

          <h3 className="font-bold text-gray-700 mb-2">FORMAS DE PAGO:</h3>

          {/* BCP */}
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span> BANCO DE CREDITO DEL PERÚ - BCP</p>
            <p className="ml-6 text-gray-600 text-sm">Número de Corriente: <span className="font-semibold">19195802594094</span></p>
            <p className="ml-6 text-gray-600 text-sm">CCI: <span className="font-semibold">00219119580259409459</span></p>
          </div>

          {/* Interbank */}
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span> BANCO INTERBANK:</p>
            <p className="ml-6 text-gray-600 text-sm">Número de cuenta: <span className="font-semibold">8983315617806</span></p>
            <p className="ml-6 text-gray-600 text-sm">CCI: <span className="font-semibold">00389801331561780642</span></p>
          </div>

          {/* Scotiabank */}
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span> BANCO SCOTIABANK:</p>
            <p className="ml-6 text-gray-600 text-sm">Número de cuenta: <span className="font-semibold">1670486669</span></p>
            <p className="ml-6 text-gray-600 text-sm">CCI: <span className="font-semibold">00905820167048666992</span></p>
          </div>
        </div>

        {/* QR Codes */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              {/* Replace with your actual Yape QR code image */}
              <img src="https://via.placeholder.com/150/8a2be2/ffffff?text=Yape+QR" alt="Yape QR Code" className="w-40 h-40 sm:w-48 sm:h-48 mx-auto" />
              <p className="text-gray-700 font-semibold mt-2">Luis Rodrigo Flores González</p>
              <p className="text-purple-600 text-xl sm:text-2xl font-bold">922 409 224</p>
            </div>
            <div className="text-center">
              {/* Replace with your actual Plin QR code image */}
              <img src="https://via.placeholder.com/150/00ff00/ffffff?text=Plin+QR" alt="Plin QR Code" className="w-40 h-40 sm:w-48 sm:h-48 mx-auto" />
              <p className="text-gray-700 font-semibold mt-2">Luis Rodrigo Flores González</p>
              <p className="text-green-600 text-xl sm:text-2xl font-bold">922 409 224</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm text-center flex items-center justify-center">
            <span className="text-purple-600 mr-1">🟣</span> ENVIA TU COMPROBANTE DE PAGO Y DATOS AL NÚMERO DE YAPE <span className="text-purple-600 ml-1">🟣</span>
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-sm text-center relative"
            >
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
              {currentPaymentMethod === 'Yape' && (
                // Replace with your Yape logo
                <img src="https://via.placeholder.com/80x80/8a2be2/ffffff?text=Yape" alt="Yape Logo" className="w-24 h-auto mx-auto mb-4" />
              )}
              {currentPaymentMethod === 'Plin' && (
                // Replace with your Plin logo
                <img src="https://via.placeholder.com/80x80/00ff00/ffffff?text=Plin" alt="Plin Logo" className="w-24 h-auto mx-auto mb-4" />
              )}
              {currentPaymentMethod === 'Transferencia' && (
                // Replace with your Bank Transfer logo
                <img src="https://via.placeholder.com/80x80/0000ff/ffffff?text=Transfer" alt="Transferencia Logo" className="w-24 h-auto mx-auto mb-4" />
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirmación de pago {currentPaymentMethod}</h3>
              <p className="text-gray-600 mb-1">Cupo #{couponReserved} reservado</p> {/* Show the actual coupon number */}
              <p className="text-green-600 font-bold text-2xl mb-4">S/. {price}</p>
              {currentPaymentMethod === 'Yape' && <p className="text-gray-500 text-sm mb-6">Yape registrado</p>}
              {currentPaymentMethod === 'Plin' && <p className="text-gray-500 text-sm mb-6">Plin registrado</p>}
              {currentPaymentMethod === 'Transferencia' && <p className="text-gray-500 text-sm mb-6">Transferencia bancaria</p>}


              <button
                onClick={confirmPurchase}
                className="w-full px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                Aceptar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Instruction Text */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-inner text-gray-700 text-center text-base">
        <p>
          Una vez realizado el depósito y / o transferencia, envíe al WhatsApp:
          <a href="https://wa.me/51916779050" className="text-blue-600 hover:underline font-semibold ml-1">+51 916 779 050</a> /
          <a href="https://wa.me/51922409224" className="text-blue-600 hover:underline font-semibold ml-1">922 409 224</a>
          la copia de la constancia de pago para su validación y sus datos: nombre y apellido, N° DNI, correo y N° celular.
        </p>
      </div>
    </div>
  );
};

export default Promocion;