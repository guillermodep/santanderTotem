import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ServiceGrid from './components/ServiceGrid';
import AuthSection from './components/AuthSection';
import ServiceContent from './components/ServiceContent';
import VideoOverlay from './components/VideoOverlay';
import WelcomeModal from './components/WelcomeModal';
import TicketPrinter from './components/TicketPrinter';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import MicIndicator from './components/MicIndicator';
import IdentityVerification from './components/IdentityVerification';
import axios from 'axios';
import CardPrinting from './components/CardPrinting';

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
  const [verifiedPerson, setVerifiedPerson] = useState<string | null>(null);
  const [showCardPrinting, setShowCardPrinting] = useState(false);

  useEffect(() => {
    const startBackgroundVerification = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });

        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        video.srcObject = stream;

        video.onloadeddata = () => {
          setTimeout(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
              context.drawImage(video, 0, 0);
              const photoData = canvas.toDataURL('image/jpeg', 1.0);

              const base64Data = photoData.replace(/^data:image\/jpeg;base64,/, '');
              const byteCharacters = atob(base64Data);
              const byteArrays = [];

              for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
              }

              const blob = new Blob(byteArrays, { type: 'image/jpeg' });
              const formData = new FormData();
              formData.append('photo', blob, 'identity-photo.jpg');

              axios.post('http://localhost:3001/api/save-photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              .then(response => {
                if (response.data.matched) {
                  setVerifiedPerson(response.data.personName);
                }
              })
              .catch(console.error)
              .finally(() => {
                stream.getTracks().forEach(track => track.stop());
              });
            }
          }, 1000);
        };
      } catch (error) {
        console.error('Error en verificación en segundo plano:', error);
      }
    };

    startBackgroundVerification();
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('El reconocimiento de voz no está soportado en este navegador');
      return;
    }

    let recognitionInstance = new SpeechRecognition();
    let isRecognitionActive = true;
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;
    recognitionInstance.lang = 'es-ES';

    recognitionInstance.onresult = (event: any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript.toLowerCase();
      console.log('Texto reconocido:', text);
      
      if (text.includes('hola santander') || text.includes('hola')) {
        const audioFeedback = new Audio('/beep.mp3');
        audioFeedback.play().catch(console.error);
        
        setShowVideo(false);
        setSelectedService(null);
        setIsAuthenticated(false);
        setShowWelcome(false);
        setShowTicketPrinter(false);
        navigate('/');
      }
    };

    recognitionInstance.onstart = () => {
      console.log('Reconocimiento iniciado exitosamente');
      setIsListening(true);
    };

    recognitionInstance.onend = () => {
      console.log('Reconocimiento terminado');
      
      if (isRecognitionActive) {
        setTimeout(() => {
          try {
            recognitionInstance.start();
          } catch (error) {
            console.error('Error al reiniciar:', error);
          }
        }, 50);
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Error en reconocimiento de voz:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        console.log('Permiso de micrófono denegado');
        isRecognitionActive = false;
      } else {
        setTimeout(() => {
          try {
            recognitionInstance.start();
          } catch (error) {
            console.error('Error al reiniciar después de error:', error);
          }
        }, 1000);
      }
    };

    setTimeout(() => {
      recognitionInstance.start();
    }, 500);

    return () => {
      isRecognitionActive = false;
      try {
        recognitionInstance.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error al detener el reconocimiento:', error);
      }
    };
  }, [navigate]);

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
        }, 20000);
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
        <div>
          {verifiedPerson ? (
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 text-santander-red">
                ¡{verifiedPerson}!
              </h1>
            </div>
          ) : (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                ¿En qué podemos ayudarte?
              </h1>
            </div>
          )}
          <ServiceGrid 
            onServiceSelect={setSelectedService}
            onAccessibilityToggle={() => setHighContrast(!highContrast)}
            highContrast={highContrast}
          />
        </div>
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
      {showVideo && (
        <VideoOverlay onDismiss={handleVideoDismiss} />
      )}
      
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

      {showTicketPrinter && (
        <TicketPrinter onClose={() => setShowTicketPrinter(false)} />
      )}

      {showCardPrinting && (
        <CardPrinting onClose={() => setShowCardPrinting(false)} />
      )}
      
      <div className={`transition-all duration-500 ${showVideo || showWelcome || showTicketPrinter || showCardPrinting ? 'blur-md' : ''}`}>
        <Header 
          onBack={handleBack}
          showBack={selectedService !== null || location.pathname === '/verificar-identidad'}
          highContrast={highContrast}
          onHelp={() => setShowTicketPrinter(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/verificar-identidad" element={<IdentityVerification />} />
            <Route path="/" element={renderContent()} />
          </Routes>
        </main>
      </div>

      <div className="fixed bottom-4 left-4 right-4">
        <div className={`${
          highContrast 
            ? 'bg-gray-800 text-white' 
            : 'bg-white/90 backdrop-blur-sm text-gray-600'
        } rounded-lg p-4 shadow-lg border border-gray-100 text-center`}>
          <p>
            Para asistencia, llame al  <span className="font-semibold">0810-333-2400</span>
          </p>
        </div>
      </div>
    </div>
  );
} 