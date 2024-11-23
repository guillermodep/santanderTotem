import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';

interface TicketPrinterProps {
  onClose: () => void;
}

export default function TicketPrinter({ onClose }: TicketPrinterProps) {
  const [isPrinting, setIsPrinting] = useState(true);
  const [ticketNumber] = useState(`A${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
  const [showPrinterLight, setShowPrinterLight] = useState(true);

  useEffect(() => {
    // Blinking printer light effect
    const blinkInterval = setInterval(() => {
      setShowPrinterLight(prev => !prev);
    }, 500);

    // Start printing animation after a brief delay
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
            {/* Printer Device */}
            <div className="w-64 h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg mx-auto relative overflow-visible">
              {/* Printer Details */}
              <div className="absolute top-2 right-2 flex gap-2">
                <div className={`w-2 h-2 rounded-full ${showPrinterLight ? 'bg-green-400' : 'bg-green-800'} 
                  transition-colors duration-200`}></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
              
              {/* Printer Slot */}
              <div className="absolute top-6 left-0 right-0 h-1.5 bg-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"></div>
              </div>
              
              {/* Printer Front Panel */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 
                border-t border-gray-600"></div>
              
              {/* Ticket */}
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-48 
                transition-all duration-[1.5s] ease-out
                ${isPrinting ? '-translate-y-4' : '-translate-y-32'}`}>
                <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Printer className="w-8 h-8 text-santander-red" />
                    </div>
                    <div className="text-2xl font-bold text-santander-red mb-1">{ticketNumber}</div>
                    <div className="text-sm text-gray-500">Atención en caja</div>
                    <div className="mt-2 pt-2 border-t border-dashed border-gray-200 text-xs text-gray-400">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Su número de atención</h2>
          <div className="text-5xl font-bold text-santander-red mb-6">{ticketNumber}</div>
          <p className="text-gray-600 mb-6">Por favor, espere a ser llamado por pantalla</p>
          
          <button
            onClick={onClose}
            className="w-full bg-santander-red text-white py-3 px-6 rounded-lg
              hover:bg-santander-dark-red transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}