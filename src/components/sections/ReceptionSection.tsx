
import { Calendar, Clock, Utensils } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ReceptionSection = () => {
  return (
    <section id="reception" className="py-16 md:py-24">
      <div className="section-container">
        <h2 className="section-title">El Convite</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h3 className="text-2xl font-bold text-wedding-burgundy">Hotel Parador de Vielha</h3>
            <p className="text-wedding-slate">
              Después de la ceremonia, nos reuniremos en el espectacular Parador de Vielha para celebrar con una comida especial. El hotel se encuentra rodeado por las majestuosas montañas del Pirineo, creando un ambiente único para nuestro día.
            </p>
            
            <div className="divider">
              <span>🍽️</span>
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
                <span className="text-wedding-slate">14:30h</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-wedding-burgundy/10 p-2 rounded-full">
                  <Utensils className="h-5 w-5 text-wedding-burgundy" />
                </div>
                <span className="text-wedding-slate">Parador de Vielha, Ctra. del Túnel, s/n, 25530 Vielha</span>
              </div>
            </div>
            
            <div className="pt-4">
              <a 
                href="https://maps.app.goo.gl/TxpbU7njCwb5oZLr8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-wedding-burgundy hover:text-wedding-gold font-medium transition-colors"
              >
                Ver ubicación
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
            <AspectRatio ratio={16/9} className="w-full">
              <img 
                src="/img/reception.jpg" 
                alt="Parador de Vielha" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceptionSection;
