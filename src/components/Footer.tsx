
import { Calendar, Church, Home, Mail, Music, PartyPopper, Utensils } from "lucide-react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <footer className="bg-winter-dark/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="font-cursive text-3xl mb-2">Alberto & Mariona</h2>
            <p className="text-sm opacity-80">17 de enero de 2026</p>
            <p className="text-sm opacity-80">Val d'Aran, Vielha</p>
          </div>
          
          <div className="flex flex-col space-y-2 items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#home" className="text-white hover:text-winter-icy transition-colors" aria-label="Inicio">
                <Home size={20} />
              </a>
              <a href="#church" className="text-white hover:text-winter-icy transition-colors" aria-label="Iglesia">
                <Church size={20} />
              </a>
              <a href="#reception" className="text-white hover:text-winter-icy transition-colors" aria-label="Convite">
                <Utensils size={20} />
              </a>
              <a href="#party" className="text-white hover:text-winter-icy transition-colors" aria-label="Fiesta">
                <Music size={20} />
              </a>
              <a href="#rsvp" className="text-white hover:text-winter-icy transition-colors" aria-label="RSVP">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm opacity-80">
              © {year} Alberto & Mariona
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
