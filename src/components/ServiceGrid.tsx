import React from 'react';
import { CreditCard, Wallet, UserCog, UserPlus, Printer, Key, Accessibility } from 'lucide-react';

interface ServiceGridProps {
  onServiceSelect: (service: string) => void;
  onAccessibilityToggle: () => void;
  highContrast: boolean;
}

export default function ServiceGrid({ onServiceSelect, onAccessibilityToggle, highContrast }: ServiceGridProps) {
  const services = [
    { id: 'saldos', icon: Wallet, title: 'Consulta de Saldos', description: 'Ver saldos y movimientos' },
    { id: 'pin', icon: Key, title: 'Blanqueo de PIN', description: 'Resetear PIN y cuenta' },
    { id: 'productos', icon: CreditCard, title: 'Productos Bancarios', description: 'Consultar y solicitar productos' },
    { id: 'datos', icon: UserCog, title: 'Datos Personales', description: 'Modificar información' },
    { id: 'alta', icon: UserPlus, title: 'Alta de Clientes', description: 'Registro con biometría' },
    { id: 'tarjetas', icon: Printer, title: 'Impresión de Tarjetas', description: 'Débito y crédito' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        ¡Hola! ¿En qué podemos ayudarte?
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              className={`${
                highContrast 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800'
              } p-8 rounded-xl shadow-lg transition-all duration-300 
              hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1
              flex flex-col items-center text-center gap-4 min-h-[200px] 
              border border-gray-100 relative overflow-hidden
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/10 before:to-transparent 
              before:translate-x-[-200%] hover:before:translate-x-[200%] 
              before:transition-transform before:duration-700`}
            >
              <Icon size={48} className={highContrast ? 'text-white' : 'text-santander-red'} />
              <h2 className="text-2.5xl font-bold">{service.title}</h2>
              <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </button>
          );
        })}
      </div>
      
      <button 
        onClick={onAccessibilityToggle}
        className={`w-full ${
          highContrast 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-santander-red text-white hover:bg-santander-dark-red'
        } p-6 rounded-xl shadow-lg transition-colors 
        flex items-center justify-center gap-3 text-2xl font-bold`}
      >
        <Accessibility size={32} />
        {highContrast ? 'Desactivar Accesibilidad' : 'Accesibilidad'}
      </button>
    </div>
  );
}
