import { Calendar, Clock, Church } from "lucide-react";
import ImageReveal from "../ImageReveal";
import { useIsMobile } from "@/hooks/use-mobile";
const ChurchSection = () => {
  const isMobile = useIsMobile();
  return <section id="church" className="py-10 md:py-16 lg:py-24 winter-section">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-cursive text-center text-white font-bold mb-6 md:mb-12">
          La Ceremonia
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Contenedor de imagen con ImageReveal */}
          <div className="flex justify-center">
            <ImageReveal originalImage="/img/iglesia-ori.jpg" overlayImage="/lovable-uploads/98f5845c-985c-4b03-8d2c-2d1a1850f835.png" alt="Iglesia de Sant Miquèu de Vielha" className="rounded-lg shadow-lg w-48 sm:w-56 md:max-w-xs" aspectRatio="pb-[177.78%]" />
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">Iglesia de Sant Miquèu de Vielha</h3>
            <p className="text-sm md:text-base text-white font-light">Nos encantaría que nos acompañarais en este día tan especial. La ceremonia se celebrará en la Iglesia de Sant Miquèu.</p>
            
            <div className="flex items-center justify-center py-2">
              <div className="w-10 h-0.5 bg-white/30 mr-3"></div>
              <span className="text-white">❄️</span>
              <div className="w-10 h-0.5 bg-white/30 ml-3"></div>
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
                <span className="text-sm md:text-base text-white font-normal">12:30h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 md:p-2 rounded-full">
                  <Church className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="text-sm md:text-base text-white font-normal">Iglesia de Sant Miquèu, Plaça dera Glèisa, Vielha</span>
              </div>
            </div>
            
            <div className="pt-2 md:pt-4">
              <a href="https://maps.app.goo.gl/1JmQsGcmd8J8nF7Y8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white hover:text-winter-icy font-normal transition-colors text-sm md:text-base">
                Ver ubicación
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ChurchSection;