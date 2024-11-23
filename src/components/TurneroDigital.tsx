import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export default function TurneroDigital() {
  const [waitTime, setWaitTime] = useState(15);
  const [ticketNumber, setTicketNumber] = useState('A001');

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <Timer size={64} className="mx-auto text-[#EC0000] mb-6" />
        
        <h2 className="text-3xl font-bold mb-4">Su número</h2>
        <div className="text-6xl font-bold text-[#EC0000] mb-8">{ticketNumber}</div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xl">Tiempo de espera estimado</p>
          <p className="text-4xl font-bold text-gray-800">{waitTime} min</p>
        </div>
        
        <p className="mt-6 text-gray-600">
          Por favor, espere a ser llamado por pantalla
        </p>
      </div>
    </div>
  );
}