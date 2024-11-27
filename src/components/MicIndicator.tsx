import React from 'react';

interface MicIndicatorProps {
  isListening: boolean;
}

const MicIndicator: React.FC<MicIndicatorProps> = ({ isListening }) => {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${
        isListening 
          ? 'bg-green-500 animate-pulse' 
          : 'bg-red-500'
      }`} />
      <span className="text-sm text-white bg-black/50 px-2 py-1 rounded">
        {isListening ? 'Escuchando...' : 'Micrófono inactivo'}
      </span>
    </div>
  );
};

export default MicIndicator; 