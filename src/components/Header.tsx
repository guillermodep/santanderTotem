import React from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';

interface HeaderProps {
  showBack: boolean;
  onBack: () => void;
  onHelp: () => void;
  highContrast?: boolean;
}

export default function Header({ showBack, onBack, onHelp, highContrast }: HeaderProps) {
  return (
    <header className={`${
      highContrast ? 'bg-gray-900' : 'bg-white'
    } p-4 shadow-lg`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {showBack && (
            <button
              onClick={onBack}
              className={`hover:opacity-80 transition-opacity absolute left-6 ${
                highContrast ? 'text-white' : 'text-santander-red'
              }`}
            >
              <ArrowLeft size={32} />
            </button>
          )}
          <div className="flex-1 flex justify-center">
            <img 
              src="https://www.alvantia.com/wp-content/uploads/2019/10/Santander-Logo.png" 
              alt="Santander"
              className="h-16 object-contain"
            />
          </div>
          <button
            onClick={onHelp}
            className={`cursor-pointer hover:opacity-80 transition-opacity absolute right-6 ${
              highContrast ? 'text-white' : 'text-santander-red'
            }`}
          >
            <HelpCircle size={32} />
          </button>
        </div>
      </div>
    </header>
  );
}