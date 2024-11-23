import React, { useState } from 'react';
import { CreditCard, Shield, Star } from 'lucide-react';

export default function CardPrinting() {
  const [selectedCard, setSelectedCard] = useState<'credit' | 'debit' | null>(null);
  const [showCardAnimation, setShowCardAnimation] = useState(false);
  const [creditCardNumber] = useState(`**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`);
  const [debitCardNumber] = useState(`**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`);

  const renderCard = (type: 'credit' | 'debit', isPreview = false, isAnimated = false) => {
    const cardNumber = type === 'credit' ? creditCardNumber : debitCardNumber;
    
    return (
      <div className={`aspect-[1.586/1] ${
        type === 'credit' 
          ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-santander-red via-red-700 to-red-800'
      } rounded-xl p-6 relative overflow-hidden shadow-2xl transform transition-all duration-500
      ${isPreview ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : ''}
      ${isAnimated ? 'animate-card-shine' : ''}`}>
        {/* Premium Card Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]"></div>
            <div className="grid grid-cols-8 grid-rows-4 gap-4 p-4">
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-full rounded-full bg-white/5"
                  style={{
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
          animate-shimmer pointer-events-none"></div>
        
        <div className="relative h-full flex flex-col">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <img 
              src="https://www.alvantia.com/wp-content/uploads/2019/10/Santander-Logo.png"
              alt="Santander"
              className="h-6 opacity-90"
            />
            <div className="flex items-center gap-2">
              <div className="text-white font-bold text-lg tracking-wider">VISA</div>
              {type === 'credit' && (
                <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
              )}
            </div>
          </div>
          
          {/* Chip Section */}
          <div className="relative w-12 h-9 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg 
              transform -rotate-6 shadow-lg">
              <div className="absolute inset-0 grid grid-cols-3 gap-[1px] p-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-yellow-600/30"></div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Card Number */}
          <div className="text-white/90 font-medium tracking-widest mb-auto text-base">
            {cardNumber}
          </div>
          
          {/* Footer Section */}
          <div className="flex justify-between items-end mt-2">
            <div className="flex-1">
              <p className="text-white/60 text-[10px] uppercase mb-0.5">TITULAR</p>
              <p className="text-white/90 font-medium tracking-wider text-sm truncate pr-4">PABLO GONZÁLEZ</p>
            </div>
            <Shield className="w-5 h-5 text-white/40 flex-shrink-0" />
          </div>
        </div>
      </div>
    );
  };

  const renderPrinterAnimation = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative md:scale-150 scale-100 w-full max-w-[400px] mx-auto">
        {/* Premium Printer Design */}
        <div className="w-full h-52 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl relative mb-8
          shadow-2xl border border-zinc-700 overflow-hidden">
          {/* Glossy Surface */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]"></div>
          
          {/* Status Lights */}
          <div className="absolute top-4 right-4 flex gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75 shadow-lg shadow-blue-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-150 shadow-lg shadow-amber-400/50"></div>
          </div>
          
          {/* Card Slot with LED Strip */}
          <div className="absolute top-12 left-0 right-0">
            <div className="h-2 bg-gradient-to-r from-zinc-800 via-blue-400/20 to-zinc-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-shine"></div>
            </div>
            {/* Ambient Light */}
            <div className="absolute -inset-1 bg-blue-500/20 blur-lg"></div>
          </div>
          
          {/* Premium Details */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-10 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg
              border border-zinc-600/50 flex items-center justify-end px-4 gap-3">
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} 
                    className="w-1 h-4 bg-blue-400/30 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Brand Logo */}
          <div className="absolute bottom-4 left-4">
            <div className="text-white/90 text-xs font-semibold tracking-wider px-2 py-1 rounded
              bg-gradient-to-r from-zinc-700 to-zinc-800 border border-zinc-600/50">
            </div>
          </div>
        </div>
        
        {/* Card Animation */}
        <div className="absolute left-1/2 w-full max-w-[340px] animate-card-print-slow transform-gpu">
          {renderCard(selectedCard || 'debit', false, true)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {showCardAnimation ? (
        renderPrinterAnimation()
      ) : (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Seleccione su Tarjeta</h2>
            <p className="text-gray-600">Elija el tipo de tarjeta que desea imprimir</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div onClick={() => {
                setSelectedCard('debit');
                setShowCardAnimation(true);
                setTimeout(() => setShowCardAnimation(false), 4000);
              }} className="transform transition-all duration-300">
                <h3 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
                  <CreditCard className="w-6 h-6 text-santander-red" />
                  Tarjeta de Débito
                </h3>
                {renderCard('debit', true)}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Beneficios incluidos:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-santander-red rounded-full"></div>
                    Compras en comercios adheridos
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-santander-red rounded-full"></div>
                    Retiros en cajeros automáticos
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div onClick={() => {
                setSelectedCard('credit');
                setShowCardAnimation(true);
                setTimeout(() => setShowCardAnimation(false), 4000);
              }} className="transform transition-all duration-300">
                <h3 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
//                  <Star className="w-6 h-6 text-yellow-500" />
                  <CreditCard className="w-6 h-6 text-santander-black" />
                  Tarjeta de Crédito
                </h3>
                {renderCard('credit', true)}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Beneficios premium:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-santander-red rounded-full"></div>
                    Acceso a salas VIP en aeropuertos
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-santander-red rounded-full"></div>
                    Seguro de viaje internacional
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-santander-red rounded-full"></div>
                    Descuentos exclusivos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
