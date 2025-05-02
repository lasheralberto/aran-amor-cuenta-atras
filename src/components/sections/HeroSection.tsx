
import CountdownTimer from "@/components/CountdownTimer";

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroSection = ({ backgroundImage = '/img/Alto_Aran.jpg' }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen pt-20 pb-10 flex flex-col justify-center relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-winter-dark mb-2">Alberto & Mariona</h2>
          <div className="h-0.5 w-24 bg-winter-accent mx-auto my-6"></div>
          <h1 className="font-serif text-2xl md:text-3xl text-winter-dark mb-10">
            ¡Nos casamos!
          </h1>
          <p className="text-xl md:text-2xl font-serif text-winter-dark mb-4">
            17 de enero de 2026
          </p>
          <p className="text-lg md:text-xl font-serif text-winter-dark mb-12">
            Val d'Aran, Vielha
          </p>
          
          <div className="mt-10">
            <CountdownTimer />
          </div>
          
          <div className="mt-16 flex justify-center">
            <a 
              href="#rsvp" 
              className="bg-winter-dark hover:bg-winter-dark/80 text-white py-3 px-8 rounded-md transition-colors duration-300 font-medium"
            >
              Confirmar Asistencia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
