import { Sparkles, Heart } from "lucide-react";
import { SALON_INFO, IMAGES } from "../data";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-stone-950 text-white border-t border-gold-primary/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Brand block */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2.5">
              <Logo size="sm" />
              <div>
                <span className="font-serif text-base font-bold tracking-tight text-white block">Nefert’s</span>
                <span className="text-[9px] tracking-widest text-gold-primary uppercase font-bold block leading-none">Nail Salon</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 max-w-xs font-sans">
              Manicura combinada y refuerzo estructural premium en Ciudad Real. Cuidado, detalle y perfección duradera.
            </p>
            <a 
              href={SALON_INFO.instagramLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] text-gold-primary hover:underline hover:text-gold-light font-mono tracking-wider font-semibold"
            >
              {SALON_INFO.instagramUsername}
            </a>
          </div>

          {/* Quick links block */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-stone-300 font-medium">
            <button
              onClick={() => scrollToSection("inicio")}
              className="hover:text-gold-primary transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="hover:text-gold-primary transition-colors cursor-pointer"
            >
              Carta Servicios
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="hover:text-gold-primary transition-colors cursor-pointer"
            >
              Calculadora
            </button>
            <button
              onClick={() => scrollToSection("resenas")}
              className="hover:text-gold-primary transition-colors cursor-pointer"
            >
              Opiniones (47)
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="hover:text-gold-primary transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </div>

          {/* Copyrights and signatures */}
          <div className="text-[10px] text-stone-500 space-y-1">
            <p>
              &copy; {currentYear} Nefert’s Nail Salon. Todos los derechos reservados.
            </p>
            <p className="flex items-center justify-center md:justify-end text-gold-primary/60">
              Hecho con <Heart className="w-3 h-3 mx-1 fill-gold-primary/30 text-gold-primary" /> para lucir perfectas.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
