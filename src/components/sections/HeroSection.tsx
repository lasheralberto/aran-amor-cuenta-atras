import { useState, useEffect } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, Heart, Stars } from "lucide-react";

interface ParticleProps {
  count: number;
}

const Particles = ({ count }: ParticleProps) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Crear partículas aleatorias
    const newParticles = [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      velocity: Math.random() * 1 + 0.1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float 8s infinite ease-in-out`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${8 + particle.velocity * 5}s`
          }}
        />
      ))}
    </div>
  );
};

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroSection = ({
  backgroundImage = '/img/Alto_Aran.jpg'
}: HeroSectionProps) => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Añadir animación de entrada al cargar
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay con gradiente elegante */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 z-0" />
      
      {/* Partículas flotantes */}
      <Particles count={30} />
      
      {/* Contenedor principal con animación de entrada */}
      <div 
        className={`relative z-10 max-w-xs sm:max-w-sm md:max-w-xl text-center 
                   bg-white/60 backdrop-blur-md shadow-xl p-4 sm:p-6 md:p-8 mx-3 
                   rounded-3xl border border-white/20 transition-all duration-1000 
                   ${isLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}
      >
        {/* Decoración superior */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Heart 
            className="text-wedding-burgundy animate-pulse" 
            size={isMobile ? 32 : 40} 
            fill="#9D174D" 
            strokeWidth={1} 
          />
        </div>
        
        {/* Contenido principal con animaciones escalonadas */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-wedding-burgundy mb-2 md:mb-4 tracking-tight">
            Alberto & Mariona
          </h1>
          
          <div className="flex items-center justify-center mb-1 md:mb-2">
            <div className="h-px w-12 bg-wedding-burgundy/50"></div>
            <Stars className="mx-2 text-wedding-burgundy" size={16} />
            <div className="h-px w-12 bg-wedding-burgundy/50"></div>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-wedding-slate font-medium mb-1 md:mb-2">
            ¡Nos casamos!
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-wedding-slate mb-1 md:mb-2">
            17 de enero de 2026
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-wedding-slate mb-4 md:mb-6">
            Val d'Aran, Vielha
          </p>

          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <CountdownTimer />
          </div>

          <a 
            href="#rsvp" 
            className={`inline-block mt-4 md:mt-6 px-6 sm:px-8 py-2 sm:py-3 
                      bg-wedding-burgundy text-white text-sm sm:text-base font-semibold 
                      rounded-full shadow-lg hover:bg-wedding-burgundy/90 hover:shadow-xl
                      transform transition-all duration-300 hover:-translate-y-1
                      focus:outline-none focus:ring-2 focus:ring-wedding-burgundy focus:ring-opacity-50
                      ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            Confirmar Asistencia
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 
                     transition-all duration-1000 delay-1000
                     ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          <p className="text-white text-sm mb-2 tracking-wide">Desliza para ver más</p>
          <ChevronDown className="text-white animate-bounce" size={24} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;