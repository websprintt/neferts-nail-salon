import { motion } from "motion/react";
import { Phone, MessageSquare, Calculator, Sparkles } from "lucide-react";
import { SALON_INFO } from "../data";
import { safeOpenLink } from "../utils/security";

export default function MobileFloatBar() {
  const scrollToSection = (id: string) => {
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
    <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden pointer-events-none select-none">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-md mx-auto pointer-events-auto h-16 bg-stone-950/85 backdrop-blur-xl rounded-2xl border border-gold-primary/20 shadow-2xl flex items-center justify-between p-2 select-none"
      >
        {/* Call Trigger (Tactile Target: 48px) with Base64 obfuscation */}
        <a
          href="#llamar"
          onClick={(e) => { e.preventDefault(); safeOpenLink("phoneTel"); }}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-stone-850 text-gold-accent border border-gold-primary/10 active:scale-95 transition-transform"
          aria-label="Llamar por teléfono"
          title="Llamar al salón"
        >
          <Phone className="w-5 h-5 text-gold-primary" />
        </a>

        {/* Budget Calculator Trigger (Tactile Target: 48px) */}
        <button
          onClick={() => scrollToSection("calculator")}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-900 hover:bg-stone-850 text-gold-accent border border-gold-primary/10 active:scale-95 transition-transform cursor-pointer"
          aria-label="Ir a la calculadora de tarifas"
          title="Calcular presupuesto"
        >
          <Calculator className="w-5 h-5 text-gold-primary" />
        </button>

        {/* WhatsApp Booking Cta (Tactile Target: 48px, CTA Shine Loop) with Base64 obfuscation */}
        <a
          href="#whatsapp"
          onClick={(e) => { e.preventDefault(); safeOpenLink("whatsapp"); }}
          className="relative flex-1 ml-2.5 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 active:scale-[0.98] transition-transform text-white font-serif font-bold text-xs uppercase tracking-wider overflow-hidden shadow-lg shadow-emerald-950/30 border border-emerald-500/20"
          aria-label="Reservar cita en WhatsApp"
        >
          {/* Subtle Shine Loop effect for absolute key action */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none animate-shine" />
          
          <MessageSquare className="w-4 h-4 mr-2 text-white animate-pulse" />
          <span className="text-white relative z-10">WhatsApp Cita</span>
        </a>
      </motion.div>
    </div>
  );
}
