
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
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setShowHint(false);
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
    setShowHint(false);
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

  // Auto-hide hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
        
        {/* Animated hint */}
        {showHint && revealPercentage === 0 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 animate-pulse">
              <div className="flex items-center space-x-2 text-white bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm">
                <span className="text-sm">👆</span>
                <div className="animate-bounce text-xs">Desliza</div>
              </div>
            </div>
            
            {/* Sliding animation hint */}
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
              <div className="w-16 h-0.5 bg-white/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/80 animate-[slide-hint_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slide-hint {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default ImageReveal;
