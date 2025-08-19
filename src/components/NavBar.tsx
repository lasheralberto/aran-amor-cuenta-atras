
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Inicio", href: "#home" },
    { name: "Iglesia", href: "#church" },
    { name: "Convite", href: "#reception" },
    { name: "Lista de Bodas", href: "#gift-list" },
    { name: "Confirmación", href: "#rsvp" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-winter-dark/90 shadow-md backdrop-blur-sm py-1" : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-lg md:text-2xl font-cursive text-white">
            Alberto & Mariona
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-winter-icy font-bold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-2 pb-1`}>
          <div className="bg-winter-dark/95 rounded-lg shadow-md p-2 backdrop-blur-sm">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-1.5 px-2 hover:text-winter-icy text-white font-bold text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
