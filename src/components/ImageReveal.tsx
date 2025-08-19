import React, { useState } from 'react';

interface ImageRevealProps {
  originalImage: string;
  overlayImage?: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

const ImageReveal: React.FC<ImageRevealProps> = ({ 
  originalImage, 
  overlayImage, 
  alt, 
  className = "",
  aspectRatio = "pb-[133.33%]" // Default 4:3 aspect ratio
}) => {
  const [revealed, setRevealed] = useState(false);

  // Alterna entre reveal y unreveal
  const handleToggleReveal = () => {
    setRevealed((prev) => !prev);
  };



  return (
    <div
      className={`relative overflow-hidden cursor-pointer select-none ${className}`}
      onClick={handleToggleReveal}
      role="button"
      tabIndex={0}
      aria-label="Revelar imagen"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleToggleReveal(); }}
    >
      <div className={`relative ${aspectRatio}`}>
        {/* Imagen overlay (ahora es la que se ve primero) */}
        {overlayImage && (
          <img
            src={overlayImage}
            alt={`${alt} - overlay`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out pointer-events-none ${revealed ? 'opacity-0' : 'opacity-100'}`}
            style={{
              maskImage: !revealed
                ? 'radial-gradient(circle at 50% 50%, white 100%, transparent 100%)'
                : 'radial-gradient(circle at 50% 50%, transparent 100%, transparent 100%)',
              WebkitMaskImage: !revealed
                ? 'radial-gradient(circle at 50% 50%, white 100%, transparent 100%)'
                : 'radial-gradient(circle at 50% 50%, transparent 100%, transparent 100%)',
              transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)'
            }}
            draggable={false}
          />
        )}
        {/* Imagen original (ahora se revela al hacer clic) */}
        <img
          src={originalImage}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${revealed ? 'opacity-100' : 'opacity-0'}`}
          style={{
            maskImage: revealed
              ? 'radial-gradient(circle at 50% 50%, white 100%, transparent 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 100%, transparent 100%)',
            WebkitMaskImage: revealed
              ? 'radial-gradient(circle at 50% 50%, white 100%, transparent 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 100%, transparent 100%)',
            transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)'
          }}
          draggable={false}
        />
        {/* Overlay de nieve animada opcional */}
        {!revealed && (
          <div className="absolute inset-0 pointer-events-none z-10 animate-fade-in bg-gradient-to-b from-white/60 to-transparent" />
        )}
        
        {/* Indicador animado para hacer clic */}
        <div className="absolute top-4 right-4 pointer-events-none z-20">
          <div className="flex items-center space-x-2 animate-bounce-gentle">
            <div className="w-8 h-8 bg-white/80 rounded-full shadow-lg flex items-center justify-center animate-pulse-ring">
              <span className="text-lg">👆</span>
            </div>
     
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        @keyframes fade-in-out {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ImageReveal;
