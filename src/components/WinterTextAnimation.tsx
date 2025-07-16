import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  delay: number;
  settled: boolean;
}

interface WinterTextAnimationProps {
  text?: string;
  className?: string;
}

const WinterTextAnimation: React.FC<WinterTextAnimationProps> = ({
  text = "Alberto & Mariona",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Crear partículas basadas en el texto
    const createTextParticles = () => {
      const particles: Particle[] = [];
      const fontSize = Math.min(window.innerWidth * 0.08, 120);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Configurar texto
      ctx.font = `bold ${fontSize}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Crear canvas temporal para obtener los píxeles del texto
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return particles;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.font = ctx.font;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillStyle = 'white';
      tempCtx.fillText(text, centerX, centerY);

      // Obtener datos de imagen
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // Crear partículas en posiciones donde hay texto
      const step = 6; // Reducir para más densidad
      for (let y = 0; y < tempCanvas.height; y += step) {
        for (let x = 0; x < tempCanvas.width; x += step) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) { // Si hay texto en esta posición
            particles.push({
              x: Math.random() * canvas.width,
              y: -Math.random() * 200 - 50,
              targetX: x + Math.random() * 4 - 2,
              targetY: y + Math.random() * 4 - 2,
              vx: 0,
              vy: 0,
              size: Math.random() * 3 + 1,
              opacity: 0,
              delay: Math.random() * 2000 + 500,
              settled: false
            });
          }
        }
      }

      return particles;
    };

    // Inicializar partículas
    particlesRef.current = createTextParticles();
    setIsLoaded(true);

    // Función de animación
    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Crear efecto de nieve suave en el fondo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = (currentTime * 0.01 + Math.random() * 1000) % (canvas.height + 100);
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Animar partículas
      particlesRef.current.forEach((particle, index) => {
        // Verificar si la partícula debe empezar a moverse
        if (currentTime < particle.delay) return;

        // Calcular fuerzas hacia el objetivo
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5 && !particle.settled) {
          // Aplicar fuerzas suaves hacia el objetivo
          const force = 0.02;
          particle.vx += dx * force;
          particle.vy += dy * force;

          // Aplicar fricción
          particle.vx *= 0.95;
          particle.vy *= 0.95;

          // Actualizar posición
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Aumentar opacidad gradualmente
          particle.opacity = Math.min(particle.opacity + 0.02, 1);
        } else {
          // Partícula ha llegado al objetivo
          particle.settled = true;
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.opacity = Math.min(particle.opacity + 0.01, 0.9);
        }

        // Dibujar partícula con efecto brillante
        if (particle.opacity > 0) {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(200, 230, 255, ${particle.opacity * 0.6})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Agregar pequeño brillo central
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animación después de un pequeño delay
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 200);

    // Manejar redimensionado
    const handleResize = () => {
      updateCanvasSize();
      particlesRef.current = createTextParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    />
  );
};

export default WinterTextAnimation;