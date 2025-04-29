
import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('January 17, 2025 12:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-center font-serif text-xl sm:text-2xl mb-6 text-wedding-slate">Cuenta atrás para nuestro gran día</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-wedding-burgundy">
              {unit.value < 10 ? `0${unit.value}` : unit.value}
            </span>
            <span className="text-sm sm:text-base font-medium text-wedding-slate mt-2">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
