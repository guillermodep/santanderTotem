import React from 'react';

interface SpeechFeedbackProps {
  text: string;
}

const SpeechFeedback: React.FC<SpeechFeedbackProps> = ({ text }) => {
  return (
    <div className="fixed bottom-20 left-4 right-4">
      <div className="bg-black/70 text-white p-4 rounded-lg text-center">
        <p className="text-lg font-semibold">Texto reconocido:</p>
        <p className="text-xl">{text || '...'}</p>
      </div>
    </div>
  );
};

export default SpeechFeedback; 