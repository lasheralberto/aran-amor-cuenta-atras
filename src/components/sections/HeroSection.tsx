import { useState, useEffect, useRef } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, Heart } from "lucide-react";

// Componente para texto con animación de neblina
const FogText = ({ text, className, delay = 0, duration = 1.5 }) => {
  const letters = Array.from(text);
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex justify-center flex-wrap">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block transform transition-all duration-1000 opacity-0 blur-xl filter"
            style={{
              animationName: "fogReveal",
              animationDuration: `${duration}s`,
              animationDelay: `${delay + index * 0.05}s`,
              animationFillMode: "forwards",
              animationTimingFunction: "ease-out"
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
      @keyframes fogReveal {
        0% { 
          opacity: 0;
          filter: blur(20px);
          transform: translateY(15px) scale(0.9);
        }
        20% {
          opacity: 0.2;
          filter: blur(15px);
          transform: translateY(12px) scale(0.95);
        }
        40% {
          opacity: 0.6;
          filter: blur(10px);
          transform: translateY(8px) scale(0.98);
        }
        70% {
          opacity: 0.8;
          filter: blur(5px);
          transform: translateY(3px) scale(1);
        }
        85% {
          opacity: 0.9;
          filter: blur(2px);
          transform: translateY(1px) scale(1);
        }
        100% { 
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) scale(1);
        }
      }
      
      @keyframes snowfall {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
        }
        25% {
          transform: translateY(25vh) translateX(15px) rotate(45deg);
        }
        50% {
          transform: translateY(50vh) translateX(-15px) rotate(90deg);
        }
        75% {
          transform: translateY(75vh) translateX(15px) rotate(180deg);
        }
        100% {
          transform: translateY(105vh) translateX(0) rotate(360deg);
        }
      }
      
      @keyframes pulseGlow {
        0%, 100% {
          filter: brightness(1) blur(8px);
          opacity: 0.4;
        }
        50% {
          filter: brightness(1.3) blur(12px);
          opacity: 0.6;
        }
      }
      
      @keyframes fadeSlideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes mountainsParallax {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
        100% {
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Iniciar secuencia de animación
    setTimeout(() => setLoaded(true), 300);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Generar copos de nieve
  const renderSnowflakes = () => {
    const snowflakeCount = isMobile ? 30 : 70;
    return Array.from({ length: snowflakeCount }).map((_, i) => (
      <Snowflake key={i} index={i} />
    ));
  };
  
  // Generar puntos luminosos decorativos (estrellas)
  const renderStars = () => {
    const starCount = isMobile ? 15 : 40;
    return Array.from({ length: starCount }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.5 + 0.5;
      const animDuration = Math.random() * 3 + 2;
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
            animationDelay: `${Math.random() * 3}s`,
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
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Fondo invernal animado */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 z-0" />
      
      {/* Montañas nevadas al fondo */}
      <div className="absolute bottom-0 w-full h-1/3 bg-white z-0" 
           style={{
             maskImage: "linear-gradient(to top, transparent, transparent 40%, white 100%)",
             WebkitMaskImage: "linear-gradient(to top, transparent, transparent 40%, white 100%)"
           }} />
      <div className="absolute bottom-0 w-full z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            fillOpacity="0.8"
            d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,202.7C960,171,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{
              animation: "mountainsParallax 10s ease-in-out infinite"
            }}
          ></path>
        </svg>
      </div>
      <div className="absolute bottom-0 w-full z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            fillOpacity="0.6"
            d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,250.7C672,267,768,277,864,261.3C960,245,1056,203,1152,197.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{
              animation: "mountainsParallax 12s ease-in-out infinite"
            }}
          ></path>
        </svg>
      </div>
      
      {/* Estrellas en el cielo */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {renderStars()}
      </div>
      
      {/* Copos de nieve cayendo */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {renderSnowflakes()}
      </div>
      
      {/* Contenedor principal con glassmorphism avanzado */}
      <div 
        className={`relative z-10 w-11/12 max-w-xs sm:max-w-sm md:max-w-xl p-6 sm:p-8 md:p-10 mx-3 
                   bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-md 
                   border border-white/30 rounded-3xl shadow-2xl 
                   transition-all duration-1000 ease-out
                   ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2), inset 0 -5px 10px rgba(255, 255, 255, 0.4)",
        }}
      >
        {/* Decoración superior */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 1s 0.3s forwards" : "none"
             }}>
          <Heart 
            className="text-wedding-burgundy" 
            size={isMobile ? 32 : 40} 
            fill="#9D174D" 
            strokeWidth={1} 
          />
        </div>
        
        {/* Separador superior decorativo */}
        <div className="mb-6 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 1s 0.5s forwards" : "none"
             }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-wedding-burgundy/50 to-transparent"></div>
        </div>
        
        {/* Título principal con efecto de neblina mejorado */}
        <FogText
          text="Alberto & Mariona"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-wedding-burgundy mb-4 md:mb-5"
          delay={0.4}
          duration={2.5}
        />
        
        {/* Subtítulos con efectos escalonados más fluidos */}
        <FogText
          text="¡Nos casamos!"
          className="text-lg sm:text-xl md:text-2xl text-wedding-slate font-medium mb-2 md:mb-3"
          delay={0.8}
          duration={2.2}
        />
        
        <FogText
          text="17 de enero de 2026"
          className="text-base sm:text-lg md:text-xl text-wedding-slate mb-1 md:mb-2"
          delay={1.0}
          duration={2.0}
        />
        
        <FogText
          text="Val d'Aran, Vielha"
          className="text-base sm:text-lg md:text-xl text-wedding-slate mb-5 md:mb-6"
          delay={1.2}
          duration={2.0}
        />
        
        {/* Separador inferior decorativo */}
        <div className="my-4 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 1s 2s forwards" : "none"
             }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-wedding-burgundy/50 to-transparent"></div>
        </div>

        {/* Contador con animación de entrada */}
        <div className="opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 1.2s 2.2s forwards" : "none"
             }}>
          <CountdownTimer />
        </div>

        {/* Botón con efectos avanzados */}
        <div className="mt-6 opacity-0"
             style={{
               animation: loaded ? "fadeSlideUp 1s 2.5s forwards" : "none"
             }}>
          <a 
            href="#rsvp" 
            className="inline-block px-8 py-3 sm:py-4 
                      bg-gradient-to-br from-wedding-burgundy to-wedding-burgundy/90
                      text-white text-base sm:text-lg font-medium tracking-wide
                      rounded-full shadow-lg hover:shadow-xl
                      transform transition-all duration-300 hover:-translate-y-1 hover:scale-105
                      focus:outline-none focus:ring-2 focus:ring-wedding-burgundy focus:ring-opacity-50"
          >
            Confirmar Asistencia
          </a>
        </div>
      </div>

      {/* Indicador de scroll con animación retrasada */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0" 
        style={{
          animation: loaded ? "fadeSlideUp 1s 3s forwards" : "none"
        }}
      >
        <div className="flex flex-col items-center">
          <p className="text-white text-sm mb-2 tracking-wide font-light">Desliza para ver más</p>
          <ChevronDown className="text-white animate-bounce" size={24} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;