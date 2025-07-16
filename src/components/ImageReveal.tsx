import React, { useState, useRef, useEffect } from 'react';

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
  const [revealPercentage, setRevealPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateRevealPercentage(e);
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (isDragging) {
      updateRevealPercentage(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateRevealPercentage(e.touches[0] as any);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      updateRevealPercentage(e.touches[0] as any);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateRevealPercentage = (e: React.MouseEvent | MouseEvent | Touch) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setRevealPercentage(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={`relative overflow-hidden cursor-col-resize select-none ${className}`}>
      <div 
        ref={containerRef}
        className={`relative ${aspectRatio}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Original image (bottom layer) */}
        <img 
          src={originalImage}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Overlay image (top layer) with clip-path reveal */}
        {overlayImage && (
          <img 
            src={overlayImage}
            alt={`${alt} - processed`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              clipPath: `polygon(${revealPercentage}% 0%, 100% 0%, 100% 100%, ${revealPercentage}% 100%)`
            }}
            draggable={false}
          />
        )}
        
        {/* Drag indicator line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none transition-opacity duration-200"
          style={{ 
            left: `${revealPercentage}%`,
            opacity: isDragging ? 1 : 0.6
          }}
        >
          {/* Drag handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-1 h-4 bg-gray-400 rounded"></div>
            <div className="w-1 h-4 bg-gray-400 rounded ml-1"></div>
          </div>
        </div>
        
        {/* Animated placeholder hint */}
        {revealPercentage === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="flex flex-col items-center space-y-1 animate-fade-in">
              <span className="text-2xl animate-slide-x">👆</span>
              <span className="text-xs text-white bg-black/60 px-2 py-1 rounded-full animate-pulse">Desliza para ver</span>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slide-x {
          0% { transform: translateX(0); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-x {
          animation: slide-x 1.2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease;
        }
      `}</style>
    </div>
  );
};

export default ImageReveal;
