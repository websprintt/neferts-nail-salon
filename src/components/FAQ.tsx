import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-dark-luxury text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-primary bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/25">
            Preguntas Frecuentes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-4 leading-tight">
            Todo lo que Necesitas <span className="font-serif italic font-normal text-gold-primary bg-gradient-to-r from-gold-accent to-gold-primary bg-clip-text text-transparent">Saber</span>
          </h2>
          <p className="text-stone-300 font-sans text-sm mt-3 max-w-xl mx-auto">
            ¿Tienes dudas sobre las técnicas de gel, el cuidado en casa o el proceso de cita previa? Consulta nuestras respuestas directas.
          </p>
        </div>

        {/* Dynamic Accordion list */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-stone-900/30 rounded-xl border border-gold-primary/12 overflow-hidden transition-all duration-300 hover:border-gold-primary/25"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-900/40 cursor-pointer transition-colors"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold text-stone-100 pr-4">
                    {faq.q}
                  </span>
                  <div className="shrink-0 p-1.5 rounded-full bg-stone-950 text-gold-primary border border-gold-primary/20">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-900/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
