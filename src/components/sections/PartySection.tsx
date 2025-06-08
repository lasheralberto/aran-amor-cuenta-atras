
import { Calendar, Clock, Music, PartyPopper } from "lucide-react";
import ImageReveal from "../ImageReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const PartySection = () => {
  const isMobile = useIsMobile();
  return (
    <section id="party" className="py-10 md:py-16 lg:py-24 winter-section rounded">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-10 text-center">La Fiesta</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center rounded-none">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            <ImageReveal
              originalImage="/lovable-uploads/c11b865d-08eb-4cd2-adc9-a7d53797293a.png"
              overlayImage="/lovable-uploads/c11b865d-08eb-4cd2-adc9-a7d53797293a.png"
              alt="Fiesta en el Parador de Vielha"
              className="rounded-xl shadow-lg"
              aspectRatio="pb-[133.33%]"
            />
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">¡Celebremos juntos!</h3>
            <p className="text-sm md:text-base text-white font-light">
              Después del convite, la celebración continuará con música y baile en el mismo Parador. Queremos que esta noche sea inolvidable y nos encantaría que la disfrutaras con nosotros.
            </p>
            
            <div className="divider">
              <span>✨</span>
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
                <span className="text-sm md:text-base text-white font-normal">A partir de las 20:00h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-1.5 md:p-2 rounded-full">
                  <Music className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="text-sm md:text-base text-white font-normal">Salón de Eventos, Parador de Vielha</span>
              </div>
            </div>
            
            <div className="pt-2 md:pt-4">
              <p className="text-sm md:text-base text-white font-light italic">
                "La vida es una fiesta, vístete para ella"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartySection;
