import { useState, useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";

import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, Heart } from "lucide-react";

// Componente para texto con animación de neblina mejorada
const FogText = ({ text, className, delay = 0, duration = 1.5 }) => {
  const letters = Array.from(text);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex justify-center flex-wrap">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block transform transition-all duration-1000 opacity-0 blur-sm filter text-white"
            style={{
              animationName: "snowstormReveal",
              animationDuration: `${duration}s`,
              animationDelay: `${delay + index * 0.06}s`,
              animationFillMode: "forwards",
              animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {letter === " " ? "\u00A0" : letter.toString()}
          </span>
        ))}
      </div>
    </div>
  );
};

// Componente para copos de nieve
const Snowflake = ({ index }) => {
  const size = Math.random() * 6 + 3;
  const startX = `${Math.random() * 100}%`;
  const startDelay = Math.random() * 10;
  const duration = Math.random() * 10 + 15;
  const opacity = Math.random() * 0.7 + 0.3;
  
  return (
    <div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: startX,
        top: "-5%",
        opacity: opacity,
        animationName: "snowfall",
        animationDuration: `${duration}s`,
        animationDelay: `${startDelay}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear"
      }}
    />
  );
};

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Inyectar keyframes para las animaciones
    const style = document.createElement('style');
    style.textContent = `
      @keyframes snowstormReveal {
        0% { 
          opacity: 0;
          filter: blur(8px);
          transform: translateY(20px) translateX(-8px) scale(0.95) rotate(-2deg);
        }
        20% {
          opacity: 0.2;
          filter: blur(6px);
          transform: translateY(15px) translateX(-5px) scale(0.97) rotate(-1deg);
        }
        40% {
          opacity: 0.5;
          filter: blur(4px);
          transform: translateY(10px) translateX(-2px) scale(0.99) rotate(-0.5deg);
        }
        60% {
          opacity: 0.7;
          filter: blur(2px);
          transform: translateY(5px) translateX(1px) scale(1.01) rotate(0.2deg);
        }
        80% {
          opacity: 0.9;
          filter: blur(1px);
          transform: translateY(2px) translateX(0px) scale(1.005) rotate(0deg);
        }
        100% { 
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) translateX(0) scale(1) rotate(0deg);
        }
      }

      @keyframes heartbeat {
        0%, 100% {
          transform: scale(1);
        }
        25% {
          transform: scale(1.1);
        }
        50% {
          transform: scale(0.98);
        }
        75% {
          transform: scale(1.05);
        }
      }
      
      @keyframes snowfall {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
        }
        25% {
          transform: translateY(25vh) translateX(12px) rotate(45deg);
        }
        50% {
          transform: translateY(50vh) translateX(-12px) rotate(90deg);
        }
        75% {
          transform: translateY(75vh) translateX(12px) rotate(180deg);
        }
        100% {
          transform: translateY(105vh) translateX(0) rotate(360deg);
        }
      }
      
      @keyframes pulseGlow {
        0%, 100% {
          filter: brightness(1) blur(4px);
          opacity: 0.5;
        }
        50% {
          filter: brightness(1.2) blur(6px);
          opacity: 0.7;
        }
      }
      
      @keyframes fadeSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
          filter: blur(2px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes bounceScroll {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-8px);
        }
        60% {
          transform: translateY(-4px);
        }
      }

      @keyframes winterFadeIn {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(15px) scale(0.95);
          filter: blur(2px);
        }
        100% {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
          filter: blur(0);  
        }
      }
      
      @keyframes winterBounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0) scale(1);
        }
        40% {
          transform: translateY(-6px) scale(1.05);
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6));
        }
        60% {
          transform: translateY(-3px) scale(1.02);
        }
      }
      
      @keyframes snowFall {
        0% {
          opacity: 0;
          transform: translateY(-8px) translateX(0);
        }
        50% {
          opacity: 1;
          transform: translateY(12px) translateX(1px);
        }
        100% {
          opacity: 0;
          transform: translateY(32px) translateX(-1px);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Iniciar secuencia de animación
    setTimeout(() => setLoaded(true), 200);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Generar copos de nieve
  const renderSnowflakes = () => {
    const snowflakeCount = isMobile ? 25 : 60;
    return Array.from({ length: snowflakeCount }).map((_, i) => (
      <Snowflake key={i} index={i} />
    ));
  };
  
  // Generar puntos luminosos decorativos (estrellas)
  const renderStars = () => {
    const starCount = isMobile ? 12 : 35;
    return Array.from({ length: starCount }).map((_, i) => {
      const size = Math.random() * 2.5 + 1;
      const opacity = Math.random() * 0.4 + 0.6;
      const animDuration = Math.random() * 2.5 + 2;
      return (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            opacity: opacity,
            animationName: "pulseGlow",
            animationDuration: `${animDuration}s`,
            animationDelay: `${Math.random() * 2}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite"
          }}
        />
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center winter-section"
    >
      {/* Copos de nieve */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {renderSnowflakes()}
      </div>
      
      {/* Estrellas decorativas sutiles */}
      <div className="absolute inset-0 z-1 opacity-20">
        {renderStars()}
      </div>
      
      {/* Contenedor principal con centrado mejorado */}
      <div 
        className={`relative z-10 w-11/12 max-w-xs sm:max-w-sm md:max-w-lg p-4 sm:p-5 md:p-6 mx-auto
                   flex flex-col items-center justify-center text-center
                   transition-all duration-1000 ease-out
                   ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Decoración superior */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 0.8s 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"
             }}>
          <Heart 
            className="text-wedding-burgundy animate-heartbeat" 
            size={isMobile ? 22 : 28} 
            fill="#FFFFFF" 
            strokeWidth={1} 
            style={{
              animation: loaded ? "heartbeat 1.2s infinite ease-in-out" : "none"
            }}
          />
        </div>
        
        {/* Separador superior decorativo */}
        <div className="mb-3 md:mb-4 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 0.8s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"
             }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
        </div>
        
        {/* Título principal con fuente reducida */}
        <FogText
          text="Alberto & Mariona"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-center"
          delay={0.3}
          duration={2.5}
        />
        
        <FogText
          text="17 de enero de 2026"
          className="text-sm sm:text-base md:text-lg text-white font-medium mb-1 md:mb-2 text-center"
          delay={0.8}
          duration={1.8}
        />
        
        <FogText
          text="Val d'Aran, Vielha"
          className="text-sm sm:text-base md:text-lg text-white font-medium mb-2 md:mb-3 text-center"
          delay={1.0}
          duration={1.8}
        />
        
        {/* Separador inferior decorativo */}
        <div className="my-2 md:my-3 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 0.8s 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"
             }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
        </div>

        {/* Contador con animación de entrada */}
        <div className="opacity-0 w-full"
             style={{
               animation: loaded ? "fadeSlideUp 1s 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"
             }}>
          <CountdownTimer />
        </div>
      </div>

      {/* Indicador de scroll animado */}
      <div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 opacity-0" 
        style={{
          animation: loaded ? "winterFadeIn 1s 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"
        }}
      >
        <div className="flex flex-col items-center relative">
          {/* Efecto de nieve sutil alrededor del texto */}
          <div className="absolute -inset-4 opacity-30">
            <div className="absolute top-0 left-2 w-1 h-1 bg-white/60 rounded-full animate-pulse" 
                 style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1 right-3 w-0.5 h-0.5 bg-blue-100/80 rounded-full animate-pulse" 
                 style={{ animationDelay: '1.2s' }}></div>
            <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" 
                 style={{ animationDelay: '0.8s' }}></div>
          </div>
          
          {/* Texto con efecto helado */}
          <p className="text-white/90 text-xs md:text-sm mb-3 tracking-widest font-light relative
                        drop-shadow-lg backdrop-blur-sm px-3 py-1 rounded-full
                        bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-white/10 text-center">
            <span className="relative z-10">❄ Descubre más ❄</span>
          </p>
          
          {/* Flecha con efectos invernales */}
          <div className="relative">
            {/* Aura brillante */}
            <div className="absolute inset-0 blur-sm">
              <ChevronDown 
                className="text-blue-200/40" 
                size={isMobile ? 18 : 22}
              />
            </div>
            
            {/* Flecha principal */}
            <ChevronDown 
              className="text-white relative z-10 drop-shadow-lg filter" 
              size={isMobile ? 16 : 20}
              style={{
                animation: loaded ? "winterBounce 2.5s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94) 3s" : "none",
                filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))'
              }}
            />
            
            {/* Partículas de nieve cayendo */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-white/60 rounded-full" 
                   style={{ 
                     animation: loaded ? "snowFall 2.5s infinite linear 3.5s" : "none"
                   }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
