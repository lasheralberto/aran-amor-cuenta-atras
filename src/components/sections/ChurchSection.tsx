
import { Calendar, Clock, Church } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ChurchSection = () => {
  return <section id="church" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">La Ceremonia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg max-w-xs mx-auto">
            <AspectRatio ratio={9 / 16} className="w-full">
              <img src="/img/church.png" alt="Iglesia de Sant Miquèu de Vielha" className="w-full object-contain" />
            </AspectRatio>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-wedding-burgundy">Iglesia de Sant Miquèu de Vielha</h3>
            <p className="text-wedding-slate">
              Nos encantaría que nos acompañarais en este día tan especial. La ceremonia se celebrará en la histórica Iglesia de Sant Miquèu, uno de los monumentos más emblemáticos del Valle de Arán.
            </p>
            
            <div className="divider">
              <span>❄️</span>
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
                <span className="text-wedding-slate">12:30h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-2 rounded-full">
                  <Church className="h-5 w-5 text-wedding-burgundy" />
                </div>
                <span className="text-wedding-slate">Iglesia de Sant Miquèu, Plaça dera Glèisa, Vielha</span>
              </div>
            </div>
            
            <div className="pt-4">
              <a href="https://maps.app.goo.gl/1JmQsGcmd8J8nF7Y8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-wedding-burgundy hover:text-wedding-gold font-medium transition-colors">
                Ver ubicación
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
