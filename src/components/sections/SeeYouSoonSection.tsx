
import { Snowflake } from "lucide-react";

const SeeYouSoonSection = () => {
  return (
    <section id="see-you-soon" className="py-10 md:py-16 lg:py-24 winter-section">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-12 text-center">
          ¡Os esperamos!
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-lg w-48 sm:w-56 md:max-w-xs">
              <div className="relative pb-[133.33%]">
                <img 
                  alt="Alberto y Mariona" 
                  src="/lovable-uploads/b51ddb01-b11b-45fe-86b0-70c2b084cf9f.png" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg" 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6 order-1 md:order-2">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="bg-white/10 p-2 md:p-3 rounded-full">
                <Snowflake className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>
            
            <p className="text-base md:text-lg text-white font-light leading-relaxed text-center md:text-left">
              Gracias por venir a vernos decir 'sí' bajo cero. Prometemos calor de sobra: en los corazones, en los abrazos y en la barra libre.
            </p>
            
            <div className="flex items-center justify-center md:justify-start py-2">
              <div className="w-10 h-0.5 bg-white/30 mr-3"></div>
              <span className="text-white text-xl">❄️</span>
              <div className="w-10 h-0.5 bg-white/30 ml-3"></div>
            </div>
            
            <p className="text-lg md:text-xl text-white font-normal text-center md:text-left">
              ¡Nos vemos pronto!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeeYouSoonSection;
