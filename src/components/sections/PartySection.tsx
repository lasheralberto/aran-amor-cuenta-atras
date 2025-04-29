
import { Calendar, Clock, Music, PartyPopper } from "lucide-react";

const PartySection = () => {
  return (
    <section id="party" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">La Fiesta</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/img/party.jpg" 
              alt="Fiesta en el Parador de Vielha" 
              className="w-full h-80 object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-wedding-burgundy">¡Celebremos juntos!</h3>
            <p className="text-wedding-slate">
              Después del convite, la celebración continuará con música y baile en el mismo Parador. Queremos que esta noche sea inolvidable y nos encantaría que la disfrutaras con nosotros.
            </p>
            
            <div className="divider">
              <span>✨</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-wedding-burgundy" />
                </div>
                <span className="text-wedding-slate">17 de enero de 2025</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-wedding-burgundy" />
                </div>
                <span className="text-wedding-slate">A partir de las 20:00h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-2 rounded-full">
                  <Music className="h-5 w-5 text-wedding-burgundy" />
                </div>
                <span className="text-wedding-slate">Salón de Eventos, Parador de Vielha</span>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-wedding-slate italic">
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
