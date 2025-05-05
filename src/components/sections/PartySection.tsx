
import { Calendar, Clock, Music, PartyPopper } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PartySection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="party" className="py-10 md:py-16 lg:py-24 bg-white">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-winter-dark mb-6 md:mb-10 text-center">La Fiesta</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
            <img 
              src="/img/party.jpg" 
              alt="Fiesta en el Parador de Vielha" 
              className="w-full h-60 sm:h-70 md:h-80 object-cover"
            />
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-wedding-burgundy">¡Celebremos juntos!</h3>
            <p className="text-sm md:text-base text-wedding-slate">
              Después del convite, la celebración continuará con música y baile en el mismo Parador. Queremos que esta noche sea inolvidable y nos encantaría que la disfrutaras con nosotros.
            </p>
            
            <div className="divider">
              <span>✨</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-1.5 md:p-2 rounded-full">
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-wedding-burgundy" />
                </div>
                <span className="text-sm md:text-base text-wedding-slate">17 de enero de 2025</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-1.5 md:p-2 rounded-full">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-wedding-burgundy" />
                </div>
                <span className="text-sm md:text-base text-wedding-slate">A partir de las 20:00h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-1.5 md:p-2 rounded-full">
                  <Music className="h-4 w-4 md:h-5 md:w-5 text-wedding-burgundy" />
                </div>
                <span className="text-sm md:text-base text-wedding-slate">Salón de Eventos, Parador de Vielha</span>
              </div>
            </div>
            
            <div className="pt-2 md:pt-4">
              <p className="text-sm md:text-base text-wedding-slate italic">
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
