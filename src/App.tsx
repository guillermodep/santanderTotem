import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ServiceGrid from './components/ServiceGrid';
import AuthSection from './components/AuthSection';
import ServiceContent from './components/ServiceContent';
import VideoOverlay from './components/VideoOverlay';
import WelcomeModal from './components/WelcomeModal';
import TicketPrinter from './components/TicketPrinter';

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showTicketPrinter, setShowTicketPrinter] = useState(false);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsAuthenticated(false);
        setSelectedService(null);
        setTimeout(() => {
          setShowVideo(true);
        }, 100);
      }, 120000); // 2 minutes of inactivity
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('scroll', handleActivity);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, []);

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
