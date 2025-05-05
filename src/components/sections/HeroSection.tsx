import CountdownTimer from "@/components/CountdownTimer";
import { useIsMobile } from "@/hooks/use-mobile";
interface HeroSectionProps {
  backgroundImage?: string;
}
const HeroSection = ({
  backgroundImage = '/img/Alto_Aran.jpg'
}: HeroSectionProps) => {
  const isMobile = useIsMobile();
  return <section className="relative w-full h-screen bg-cover bg-center flex items-center justify-center" style={{
    backgroundImage: `url(${backgroundImage})`
  }}>
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Contenedor con opacidad para los textos */}
      <div className="relative z-100 max-w-xs sm:max-w-sm md:max-w-xl text-center bg-white/70 backdrop-blur-md shadow-lg p-4 sm:p-6 md:p-8 mx-3 rounded-3xxl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-wedding-burgundy mb-2 md:mb-4">
          Alberto & Mariona
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-wedding-slate mb-1 md:mb-2">¡Nos casamos!</p>
        <p className="text-base sm:text-lg md:text-xl text-wedding-slate mb-1 md:mb-2">17 de enero de 2026</p>
        <p className="text-base sm:text-lg md:text-xl text-wedding-slate mb-4 md:mb-6">Val d'Aran, Vielha</p>

        <CountdownTimer />

        <a href="#rsvp" className="inline-block mt-4 md:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-wedding-burgundy text-white text-sm sm:text-base font-semibold rounded-full shadow hover:bg-wedding-burgundy/90 transition">
          Confirmar Asistencia
        </a>
      </div>
    </section>;
};
export default HeroSection;