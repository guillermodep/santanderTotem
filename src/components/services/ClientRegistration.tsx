import React, { useState } from 'react';
import { CreditCard, Wallet, User, Mail, Phone, MapPin, FileText } from 'lucide-react';

export default function ClientRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dni: '',
    products: {
      account: false,
      debitCard: false,
      creditCard: false
    }
  });

  const products = [
    {
      id: 'account',
      title: 'Cuenta Simple',
      icon: Wallet,
      description: 'Cuenta bancaria sin costos de mantenimiento'
    },
    {
      id: 'debitCard',
      title: 'Tarjeta de Débito',
      icon: CreditCard,
      description: 'Acceso a tu dinero en cualquier momento'
    },
    {
      id: 'creditCard',
      title: 'Tarjeta de Crédito',
      icon: CreditCard,
      description: 'Financiación y beneficios exclusivos'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Datos Personales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="flex items-center">
                  <User size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="flex items-center">
                  <Mail size={20} className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <div className="flex items-center">
                  <Phone size={20} className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                    placeholder="11-1234-5678"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <div className="flex items-center">
                  <MapPin size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                    placeholder="Ingrese su dirección"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI
                </label>
                <div className="flex items-center">
                  <FileText size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent"
                    placeholder="12345678"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Seleccione sus Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <button
                    key={product.id}
                    onClick={() => setFormData({
                      ...formData,
                      products: {
                        ...formData.products,
                        [product.id]: !formData.products[product.id as keyof typeof formData.products]
                      }
                    })}
                    className={`${
                      formData.products[product.id as keyof typeof formData.products]
                        ? 'ring-2 ring-santander-red bg-santander-soft-red'
                        : 'bg-white hover:bg-gray-50'
                    } p-6 rounded-xl shadow-lg transition-all duration-300 text-left`}
                  >
                    <Icon size={32} className="text-santander-red mb-4" />
                    <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 border-2 border-green-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">¡Registro Exitoso!</h2>
            <p className="text-gray-600 mb-8">
              Sus datos han sido registrados correctamente. En breve recibirá un correo con los próximos pasos.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-santander-red text-white px-8 py-3 rounded-lg hover:bg-santander-dark-red transition-colors"
            >
              Finalizar
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          {step < 3 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
              )}
              <button
                type="submit"
                className="bg-santander-red text-white px-8 py-3 rounded-lg hover:bg-santander-dark-red transition-colors ml-auto"
              >
                {step === 2 ? 'Finalizar' : 'Siguiente'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}