import React from 'react';
import { Menu, X, User } from 'lucide-react';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const menuItems = [
    'Inicio',
    'Servicios',
    'Productos',
    'Soporte',
    'Contacto'
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">BankApp</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <User className="w-4 h-4" />
              Acceder
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <User className="w-4 h-4" />
              Acceder
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;