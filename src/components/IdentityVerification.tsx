import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IdentityVerification: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadeddata = () => {
            setCameraReady(true);
            setTimeout(() => {
              takePhoto();
            }, 1000);
          };
        }
      } catch (err) {
        console.error('Error al acceder a la cámara:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current && cameraReady) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.scale(-1, 1);
        
        const photoData = canvas.toDataURL('image/jpeg', 1.0);
        setPhoto(photoData);
        savePhoto(photoData);
      }
    }
  };

  const savePhoto = async (photoData: string) => {
    try {
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

      await axios.post('http://localhost:3001/api/save-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Navegar al home después de guardar la foto
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Error al guardar la foto:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Verificación de Identidad</h2>
      
      <div className="relative">
        {!photo ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ transform: 'scaleX(-1)' }}
            className="w-full rounded-lg shadow-lg"
          />
        ) : (
          <img 
            src={photo} 
            alt="Foto capturada" 
            className="w-full rounded-lg shadow-lg"
          />
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {!photo && cameraReady && (
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Capturando foto...
          </p>
        </div>
      )}
    </div>
  );
};

export default IdentityVerification; 