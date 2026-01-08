
import { Gift, Heart } from "lucide-react";

const GiftListSection = () => {
  return (
    <section id="gift-list" className="py-10 md:py-16 lg:py-24 winter-section">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-cursive text-center text-white font-bold mb-6 md:mb-12">
          Lista de Bodas
        </h2>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-3 md:p-4 rounded-full">
              <Gift className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-white font-light leading-relaxed">
            Gracias por estar aquí, por recorrer tantos kilómetros y por todo el cariño que traéis con vosotros. Que estéis con nosotros es lo más importante, y si queréis sumarle un poquito más de amor, ¡os lo agradeceremos de todo corazón!
          </p>
          
          <div className="flex items-center justify-center py-4">
            <div className="w-12 h-0.5 bg-white/30 mr-3"></div>
            <Heart className="h-5 w-5 text-white" />
            <div className="w-12 h-0.5 bg-white/30 ml-3"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Número de cuenta
            </h3>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-white font-mono text-sm md:text-base tracking-wider">
                ES14 1583 0001 1691 7522 4200
              </p>
            </div>
            <p className="text-white/80 text-sm mt-3 font-light">
              A nombre de: Alberto Martinez Lasheras
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftListSection;
