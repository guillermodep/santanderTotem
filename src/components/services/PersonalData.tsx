import React, { useState } from 'react';
import { Save, User, Phone, Mail, MapPin } from 'lucide-react';

export default function PersonalData() {
  const [formData, setFormData] = useState({
    name: 'Pablo',
    email: 'pablo@email.com',
    phone: '11-1234-5678',
    address: 'Av. del Libertador 101',
    city: 'Buenos Aires'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-santander-red rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{formData.name}</h2>
                <p className="text-gray-600">Cliente desde 2020</p>
              </div>
            </div>

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
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent disabled:bg-gray-50"
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
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent disabled:bg-gray-50"
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
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent disabled:bg-gray-50"
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
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-santander-red focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-santander-red text-white px-6 py-3 rounded-lg hover:bg-santander-dark-red transition-colors"
                >
                  Modificar Datos
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-santander-red text-white px-6 py-3 rounded-lg hover:bg-santander-dark-red transition-colors 
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Guardar Cambios
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}