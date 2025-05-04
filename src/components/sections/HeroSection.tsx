import CountdownTimer from "@/components/CountdownTimer";

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroSection = ({ backgroundImage = '/img/Alto_Aran.jpg' }: HeroSectionProps) => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Contenedor con opacidad para los textos */}
      <div className="relative z-10 max-w-xl text-center bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-wedding-burgundy mb-4">
          Alberto & Mariona
        </h1>
        <p className="text-xl md:text-2xl text-wedding-slate mb-2">¡Nos casamos!</p>
        <p className="text-lg md:text-xl text-wedding-slate mb-2">17 de enero de 2026</p>
        <p className="text-lg md:text-xl text-wedding-slate mb-6">Val d'Aran, Vielha</p>

        <CountdownTimer />

        <a
          href="#rsvp"
          className="inline-block mt-6 px-6 py-3 bg-wedding-burgundy text-white font-semibold rounded-full shadow hover:bg-wedding-burgundy/90 transition"
        >
          Confirmar Asistencia
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
