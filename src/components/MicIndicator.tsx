import React from 'react';

interface MicIndicatorProps {
  isListening: boolean;
}

const MicIndicator: React.FC<MicIndicatorProps> = ({ isListening }) => {
  return (
    <div className="fixed top-20 right-4">
      <div 
        className={`w-4 h-4 rounded-full ${
          isListening 
            ? 'bg-green-500 animate-pulse' 
            : 'bg-red-500'
        }`} 
        title={isListening ? 'Micrófono activo' : 'Micrófono inactivo'}
      />
    </div>
  );
};

export default MicIndicator; 