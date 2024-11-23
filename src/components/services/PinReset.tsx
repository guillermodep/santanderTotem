import React, { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';

export default function PinReset() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <Key size={48} className="text-santander-red mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Blanqueo de PIN</h2>
              <p className="text-gray-600">
                Para continuar, necesitamos verificar su identidad
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Documento
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                  placeholder="Ingrese su DNI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-santander-red text-white py-3 rounded-lg hover:bg-santander-dark-red transition-colors"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-santander-red border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg">Verificando información...</p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-green-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">PIN Blanqueado</h3>
            <p className="text-gray-600 mb-6">
              Su nuevo PIN ha sido enviado por SMS al número registrado
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-santander-red text-white px-6 py-3 rounded-lg hover:bg-santander-dark-red transition-colors"
            >
              Finalizar
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}