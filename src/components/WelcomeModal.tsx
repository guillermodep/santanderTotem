import React, { useEffect } from 'react';

interface WelcomeModalProps {
  onClose: () => void;
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-12 rounded-xl shadow-2xl transform transition-all">
        <h2 className="text-4xl font-bold text-center text-santander-red">
          Bienvenido Pablo a
          <br />
          <img 
            src="https://www.alvantia.com/wp-content/uploads/2019/10/Santander-Logo.png"
            alt="Santander"
            className="h-20 mx-auto"
          />
        </h2>
      </div>
    </div>
  );
}