import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, PhoneCall } from "lucide-react";
import { NAV_LINKS, SALON_INFO, IMAGES } from "../data";
import Logo from "./Logo";
import { safeDecode, safeOpenLink } from "../utils/security";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-luxury/90 backdrop-blur-md shadow-lg border-b border-gold-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand with Official Instagram Pic */}
          <div 
            onClick={() => scrollToSection("inicio")} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <Logo size="md" />
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-gold-light group-hover:text-gold-accent transition-colors duration-200">
                Nefert’s
              </span>
              <span className="block text-[10px] tracking-widest text-gold-primary uppercase font-bold leading-none mt-0.5">
                Nail Salon
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-stone-300 hover:text-gold-primary text-sm font-medium transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#llamar"
              onClick={(e) => { e.preventDefault(); safeOpenLink("phoneTel"); }}
              className="flex items-center space-x-1.5 text-stone-300 hover:text-gold-primary text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-stone-900/50 transition-all duration-200"
            >
              <PhoneCall className="w-4 h-4 text-gold-primary" />
              <span>{safeDecode("phoneRaw")}</span>
            </a>
            <a
              href="#whatsapp"
              onClick={(e) => { e.preventDefault(); safeOpenLink("whatsapp"); }}
              className="relative inline-flex items-center justify-center p-0.5 rounded-lg group bg-gradient-to-br from-gold-accent via-gold-primary to-gold-dark hover:from-white hover:to-gold-accent text-white hover:text-stone-950 focus:ring-4 focus:outline-none focus:ring-gold-primary/20 cursor-pointer transition-all duration-300"
            >
              <span className="relative px-4 py-2.5 transition-all duration-75 bg-dark-luxury rounded-md group-hover:bg-opacity-0 hover:text-inherit font-bold tracking-wide text-xs text-gold-light">
                Reservar Cita
              </span>
            </a>
          </div>

          {/* Mobile Menu Button - Optimized to meet Lighthouse 48x48px touch target */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-stone-300 hover:text-white hover:bg-stone-900/50 focus:outline-none transition-colors border border-gold-primary/10"
              aria-expanded={isOpen}
              aria-label="Menú principal"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-50 md:hidden"
            />

            {/* Slide-up bottom sheet drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-55 md:hidden bg-stone-950 border-t border-gold-primary/20 rounded-t-[2.5rem] p-6 pb-26 shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* iOS-style slide handle bar */}
              <div className="w-12 h-1 bg-stone-800 rounded-full mx-auto mb-2" />

              <div className="flex items-center justify-between pb-3 border-b border-gold-primary/10">
                <div>
                  <h4 className="font-serif text-lg font-bold text-gold-light">Nefert’s Nail Salon</h4>
                  <p className="text-[10px] text-gold-primary uppercase tracking-widest font-extrabold mt-0.5">Navegación Premium</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-900 text-stone-300 hover:text-white active:scale-90 transition-transform cursor-pointer border border-gold-primary/10"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bento Link Selector Panel */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="flex flex-col justify-between p-3.5 h-20 rounded-xl bg-stone-900/50 border border-gold-primary/5 hover:border-gold-primary/20 text-left active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <span className="text-[9px] text-gold-accent uppercase tracking-wider font-extrabold">Sección</span>
                    <span className="text-xs sm:text-sm font-semibold text-white mt-1 leading-tight">{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Drawer Contact CTA Blocks */}
              <div className="pt-4 border-t border-gold-primary/10 flex flex-col space-y-3">
                <a
                  href="#llamar"
                  onClick={(e) => { e.preventDefault(); safeOpenLink("phoneTel"); }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-stone-900/30 border border-gold-primary/5 text-stone-300 text-xs font-semibold"
                >
                  <div className="flex items-center space-x-2.5">
                    <PhoneCall className="w-4 h-4 text-gold-primary" />
                    <span>Llamar al {safeDecode("phoneRaw")}</span>
                  </div>
                  <span className="text-[10px] text-gold-primary font-mono select-all">Directo</span>
                </a>
                
                <a
                  href="#whatsapp"
                  onClick={(e) => { e.preventDefault(); safeOpenLink("whatsapp"); }}
                  className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-gold-primary to-gold-dark text-white rounded-xl font-serif font-extrabold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
                >
                  Reservar en WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
