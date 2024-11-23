import React from 'react';
import { Shield, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BankApp</h3>
            <p className="text-gray-400">
              Su banco digital seguro y accesible
            </p>
            <div className="flex items-center gap-2 mt-4 text-gray-400">
              <Shield className="w-5 h-5" />
              Conexión segura SSL
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                +1 (234) 567-890
              </a>
              <a href="mailto:soporte@bankapp.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                soporte@bankapp.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Seguridad', 'Términos y Condiciones', 'Privacidad', 'Accesibilidad'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} BankApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;