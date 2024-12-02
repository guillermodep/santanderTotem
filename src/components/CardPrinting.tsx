import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';

interface CardPrintingProps {
  onClose: () => void;
}

export default function CardPrinting({ onClose }: CardPrintingProps) {
  const [isPrinting, setIsPrinting] = useState(true);
  const [showPrinterLight, setShowPrinterLight] = useState(true);

  useEffect(() => {
    // Efecto de luz parpadeante de la impresora
    const blinkInterval = setInterval(() => {
      setShowPrinterLight(prev => !prev);
    }, 500);

    // Iniciar animación de impresión después de un breve retraso
    const printTimer = setTimeout(() => {
      setIsPrinting(false);
    }, 2000);

    return () => {
      clearInterval(blinkInterval);
      clearTimeout(printTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="relative mb-8">
            {/* Impresora */}
            <div className="w-64 h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg mx-auto relative overflow-visible">
              {/* Luces de la impresora */}
              <div className="absolute top-2 right-2 flex gap-2">
                <div className={`w-2 h-2 rounded-full ${showPrinterLight ? 'bg-green-400' : 'bg-green-800'} 
                  transition-colors duration-200`}></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
              
              {/* Ranura de la impresora */}
              <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
              </div>
              
              {/* Panel frontal */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 
                border-t border-gray-600"></div>
              
              {/* Tarjeta */}
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-48 transform
                transition-transform duration-1000 ease-out
                ${isPrinting ? 'translate-y-0' : '-translate-y-32'}`}>
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-white font-medium">Tarjeta Santander</div>
                    <div className="mt-2 pt-2 border-t border-red-500/30 text-xs text-white/70">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Imprimiendo su tarjeta</h2>
          <p className="text-gray-600 mb-6">Por favor, espere mientras se imprime su tarjeta</p>
          
          <button
            onClick={onClose}
            className="w-full bg-santander-red text-white py-3 px-6 rounded-lg
              hover:bg-red-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
} 