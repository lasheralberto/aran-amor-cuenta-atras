
import { useEffect, useState } from 'react';
import { Snowflake } from 'lucide-react';

const randomBetween = (min: number, max: number): number => Math.random() * (max - min) + min;

const Snowfall = ({ count = 30 }: { count?: number }) => {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number;
    x: number;
    size: number;
    opacity: number;
    speed: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newSnowflakes = Array.from({ length: count }, (_, index) => ({
      id: index,
      x: randomBetween(0, 100), // Posición horizontal (%)
      size: randomBetween(10, 20), // Tamaño (px)
      opacity: randomBetween(0.5, 0.9), // Opacidad
      speed: randomBetween(30, 80), // Velocidad reducida (segundos) - antes era 60-150
      delay: randomBetween(0, 10) // Retraso reducido (segundos) - antes era 0-20
    }));

    setSnowflakes(newSnowflakes);
  }, [count]);

  return (
    <div className="snowfall-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.x}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.speed}s linear ${flake.delay}s infinite`
          }}
        >
          <Snowflake className="text-winter-medium" />
        </div>
      ))}
    </div>
  );
};

export default Snowfall;
