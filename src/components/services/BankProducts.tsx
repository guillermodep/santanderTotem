import React from 'react';
import { CreditCard, Wallet, PiggyBank, Calculator } from 'lucide-react';

export default function BankProducts() {
  const products = {
    accounts: [
      {
        title: 'Cuenta Infinity',
        description: 'Cuenta premium con beneficios exclusivos',
        features: ['Sin costo de mantenimiento', 'Tarjetas premium sin cargo', 'Inversiones preferentes']
      },
      {
        title: 'Cuenta Simple',
        description: 'Tu primera cuenta bancaria',
        features: ['Sin requisitos de ingresos', 'Tarjeta de débito gratis', 'App móvil']
      }
    ],
    cards: [
      {
        title: 'Tarjeta Black',
        description: 'La tarjeta más exclusiva',
        features: ['Límites elevados', 'Acceso a salas VIP', 'Seguro de viaje premium']
      },
      {
        title: 'Tarjeta Platinum',
        description: 'Beneficios premium para tu estilo de vida',
        features: ['Millas por compras', 'Descuentos exclusivos', 'Concierge 24/7']
      }
    ],
    loans: [
      {
        title: 'Préstamo Personal',
        description: 'Financiación a tu medida',
        features: ['Hasta 60 cuotas', 'Tasa preferencial', 'Aprobación en el día']
      },
      {
        title: 'Préstamo Hipotecario',
        description: 'Tu casa propia',
        features: ['Hasta 30 años', 'Tasa fija o variable', 'Financiación hasta 80%']
      }
    ],
    investments: [
      {
        title: 'Plazo Fijo',
        description: 'Inversión segura y rentable',
        features: ['Tasas competitivas', 'Plazos flexibles', 'Renovación automática']
      },
      {
        title: 'Fondos Comunes',
        description: 'Diversifica tu inversión',
        features: ['Gestión profesional', 'Diferentes perfiles', 'Liquidez inmediata']
      }
    ]
  };

  const renderProductSection = (title: string, icon: React.ReactNode, products: any[]) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <ul className="space-y-2">
              {product.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <div className="w-1.5 h-1.5 bg-santander-red rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-santander-red text-white py-3 rounded-lg 
              hover:bg-santander-dark-red transition-colors">
              Solicitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {renderProductSection('Cuentas', <Wallet size={32} className="text-santander-red" />, products.accounts)}
      {renderProductSection('Tarjetas', <CreditCard size={32} className="text-santander-red" />, products.cards)}
      {renderProductSection('Préstamos', <Calculator size={32} className="text-santander-red" />, products.loans)}
      {renderProductSection('Inversiones', <PiggyBank size={32} className="text-santander-red" />, products.investments)}
    </div>
  );
}