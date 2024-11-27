import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ServiceGrid from './components/ServiceGrid';
import AuthSection from './components/AuthSection';
import ServiceContent from './components/ServiceContent';
import VideoOverlay from './components/VideoOverlay';
import WelcomeModal from './components/WelcomeModal';
import TicketPrinter from './components/TicketPrinter';
import { useNavigate, useLocation } from 'react-router-dom';
import MicIndicator from './components/MicIndicator';
import SpeechFeedback from './components/SpeechFeedback';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showTicketPrinter, setShowTicketPrinter] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [recognizedText, setRecognizedText] = useState<string>('');

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('192.168.');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('El reconocimiento de voz no está soportado en este navegador');
      return;
    }

    let recognitionInstance = new SpeechRecognition();
    let isRecognitionActive = true;
    
    // Configuración específica para Chrome
    if (isChrome) {
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
    } else {
      // Configuración para Safari y otros
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
    }
    
    recognitionInstance.lang = 'es-ES';

    const startRecognition = () => {
      if (isRecognitionActive) {
        try {
          recognitionInstance.start();
        } catch (error) {
          console.error('Error al iniciar el reconocimiento:', error);
          // Si hay un error, intentar crear una nueva instancia
          if (isChrome) {
            recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'es-ES';
            setTimeout(() => {
              recognitionInstance.start();
            }, 100);
          }
        }
      }
    };

    recognitionInstance.onstart = () => {
      console.log('Reconocimiento iniciado');
      setIsListening(true);
    };

    recognitionInstance.onend = () => {
      console.log('Reconocimiento terminado');
      setIsListening(false);
      
      // Reiniciar solo si está activo y no es Chrome
      if (isRecognitionActive && !isChrome) {
        setTimeout(startRecognition, 50);
      }
      
      // Para Chrome, reiniciar con una nueva instancia
      if (isChrome && isRecognitionActive) {
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'es-ES';
        setTimeout(startRecognition, 50);
      }
    };

    recognitionInstance.onresult = (event: any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript.toLowerCase();
      console.log('Texto reconocido:', text);
      setRecognizedText(text);
      
      if (text.includes('hola santander') || text.includes('hola')) {
        const audioFeedback = new Audio('/beep.mp3');
        audioFeedback.play().catch(console.error);
        
        setShowVideo(false);
        setSelectedService(null);
        setIsAuthenticated(false);
        setShowWelcome(false);
        setShowTicketPrinter(false);
        navigate('/');
        
        // Para Chrome, reiniciar el reconocimiento después de procesar
        if (isChrome) {
          setTimeout(startRecognition, 100);
        }
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Error en reconocimiento de voz:', event.error);
      
      if (event.error === 'not-allowed') {
        setIsListening(false);
        isRecognitionActive = false;
      } else if (event.error === 'network') {
        setTimeout(startRecognition, 1000);
      } else {
        setTimeout(startRecognition, 500);
      }
    };

    startRecognition();

    return () => {
      isRecognitionActive = false;
      try {
        recognitionInstance.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error al detener el reconocimiento:', error);
      }
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }

      if (selectedService || location.pathname !== '/') {
        inactivityTimer = setTimeout(() => {
          setSelectedService(null);
          setIsAuthenticated(false);
          setShowWelcome(false);
          setShowTicketPrinter(false);
          setShowVideo(true);
          navigate('/');
        }, 2000);
      }
    };

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart'
    ];

    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();
  }, [selectedService, location.pathname, navigate]);

  const handleBack = () => {
    if (selectedService && isAuthenticated) {
      setIsAuthenticated(false);
    } else if (selectedService) {
      setSelectedService(null);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowWelcome(true);
  };

  const handleVideoDismiss = () => {
    setShowVideo(false);
    setSelectedService(null);
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    if (!selectedService) {
      return (
        <ServiceGrid 
          onServiceSelect={setSelectedService}
          onAccessibilityToggle={() => setHighContrast(!highContrast)}
          highContrast={highContrast}
        />
      );
    }

    if (!isAuthenticated && !['productos', 'alta'].includes(selectedService)) {
      return <AuthSection onSuccess={handleAuthSuccess} />;
    }

    return <ServiceContent serviceId={selectedService} />;
  };

  return (
    <div className={`min-h-screen ${
      highContrast 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-b from-santander-bg-primary to-santander-bg-secondary'
    }`}>
      <MicIndicator isListening={isListening} />
      <SpeechFeedback text={recognizedText} />
      {showVideo && (
        <VideoOverlay onDismiss={handleVideoDismiss} />
      )}
      
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

      {showTicketPrinter && (
        <TicketPrinter onClose={() => setShowTicketPrinter(false)} />
      )}
      
      <div className={`transition-all duration-500 ${showVideo || showWelcome || showTicketPrinter ? 'blur-md' : ''}`}>
        <Header 
          onBack={handleBack}
          showBack={selectedService !== null}
          highContrast={highContrast}
          onHelp={() => setShowTicketPrinter(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>

      <div className="fixed bottom-4 left-4 right-4">
        <div className={`${
          highContrast 
            ? 'bg-gray-800 text-white' 
            : 'bg-white/90 backdrop-blur-sm text-gray-600'
        } rounded-lg p-4 shadow-lg border border-gray-100 text-center`}>
          <p>
            Para asistencia, llame al <span className="font-semibold">0810-333-2400</span>
          </p>
        </div>
      </div>
    </div>
  );
}
