
import { Calendar, Clock, Utensils } from "lucide-react";
import ImageReveal from "../ImageReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const ReceptionSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="reception" className="py-10 md:py-16 lg:py-24 winter-section">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-cursive text-center text-white font-bold mb-6 md:mb-10">El Convite</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="order-2 md:order-1 space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">Hotel Parador de Vielha</h3>
            <p className="text-sm md:text-base text-white font-light">
              Después de la ceremonia, nos reuniremos en el espectacular Parador de Vielha para celebrar con una comida especial. El hotel se encuentra rodeado por las majestuosas montañas del Pirineo, creando un ambiente único para nuestro día.
            </p>
            
            <div className="divider">
              <span>🍽️</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 md:p-2 rounded-full">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="text-sm md:text-base text-white font-normal">17 de enero de 2025</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 md:p-2 rounded-full">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="text-sm md:text-base text-white font-normal">14:30h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 md:p-2 rounded-full">
                  <Utensils className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="text-sm md:text-base text-white font-normal">Parador de Vielha, Ctra. del Túnel, s/n, 25530 Vielha</span>
              </div>
            </div>
            
            <div className="pt-2 md:pt-4">
              <a 
                href="https://maps.app.goo.gl/TxpbU7njCwb5oZLr8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-white hover:text-winter-icy font-normal transition-colors text-sm md:text-base"
              >
                Ver ubicación
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            <ImageReveal
              originalImage="/lovable-uploads/b51ddb01-b11b-45fe-86b0-70c2b084cf9f.png"
              overlayImage="/img/parador-ori.jpg"
              alt="Parador de Vielha en invierno"
              className="rounded-lg shadow-lg"
              aspectRatio="pb-[56.25%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceptionSection;
