import React, { useEffect } from 'react';

interface VideoOverlayProps {
  onDismiss: () => void;
}

export default function VideoOverlay({ onDismiss }: VideoOverlayProps) {
  useEffect(() => {
    const handleInteraction = () => {
      onDismiss();
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/ZhLBL6qqvm8?autoplay=1&mute=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}