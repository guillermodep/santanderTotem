import React, { useState } from 'react';
import { Fingerprint, KeyRound } from 'lucide-react';

interface AuthSectionProps {
  onSuccess: () => void;
}

export default function AuthSection({ onSuccess }: AuthSectionProps) {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [showPinPad, setShowPinPad] = useState(false);

  const handlePinSubmit = () => {
    if (pin === '1111') {
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      setError('PIN incorrecto');
      setPin('');
      
      if (attempts >= 2) {
        setError('Demasiados intentos. Por favor, solicite ayuda.');
      }
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(handlePinSubmit, 300);
      }
    }
  };

  if (showPinPad) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Ingrese su PIN</h2>
          
          <div className="flex justify-center mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 mx-2 rounded-full border-2 border-santander-red"
                style={{
                  backgroundColor: i < pin.length ? '#EC0000' : 'transparent'
                }}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePinInput((i + 1).toString())}
                className="p-6 text-2xl font-bold bg-gray-100 rounded-lg 
                hover:bg-gray-200 active:bg-gray-300 
                transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPin('')}
              className="p-6 text-xl font-bold bg-gray-200 rounded-lg 
              hover:bg-gray-300 active:bg-gray-400
              transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Borrar
            </button>
            <button
              onClick={() => handlePinInput('0')}
              className="p-6 text-2xl font-bold bg-gray-100 rounded-lg 
              hover:bg-gray-200 active:bg-gray-300
              transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              0
            </button>
            <button
              onClick={handlePinSubmit}
              className="p-6 text-xl font-bold bg-santander-red text-white rounded-lg 
              hover:bg-santander-dark-red active:bg-red-800
              transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Entrar
            </button>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Seleccione método de autenticación</h2>
        
        <div className="space-y-6">
          <button
            onClick={() => setShowPinPad(true)}
            className="w-full p-6 text-xl bg-santander-red text-white rounded-lg 
            hover:bg-santander-dark-red transition-all duration-300 
            transform hover:scale-105 active:scale-95
            flex items-center justify-center gap-3"
          >
            <KeyRound size={32} />
            Ingresar con PIN
          </button>
          
          <button
            onClick={onSuccess}
            className="w-full p-6 text-xl bg-gray-800 text-white rounded-lg 
            hover:bg-gray-900 transition-all duration-300 
            transform hover:scale-105 active:scale-95
            flex items-center justify-center gap-3"
          >
            <Fingerprint size={32} />
            Usar Biometría
          </button>
        </div>
      </div>
    </div>
  );
}