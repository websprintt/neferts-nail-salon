import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Tag, Sparkles, Check, ArrowDown, ChevronDown } from "lucide-react";
import { SERVICES, SALON_INFO } from "../data";
import { Service } from "../types";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
  selectedServices: string[];
}

export default function Services({ onSelectService, selectedServices }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const categories = [
    { label: "Todos", value: "all" },
    { label: "Manicura Premium", value: "manicura" },
    { label: "Pedicura Spa", value: "pedicura" },
    { label: "Nail Art", value: "nail-art" }
  ];

  const filteredServices = selectedCategory === "all"
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  const toggleExpand = (serviceId: string, e: MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const handleSelectAndScroll = (serviceId: string) => {
    onSelectService(serviceId);
    
    // Smooth scroll down to the calculator
    setTimeout(() => {
      const element = document.getElementById("calculator");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <section id="servicios" className="py-20 bg-dark-luxury">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 px-2">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/20 px-3 py-1 rounded-full">
            Servicios Exclusivos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-3 leading-tight">
            Nuestra Carta de <span className="font-serif italic font-normal text-gold-primary">Tratamientos</span>
          </h2>
          <p className="text-stone-300 font-sans text-xs sm:text-sm mt-3">
            Explora nuestros servicios de manicura rusa técnica, refuerzo de gel estructural, nail art artístico y pedicura spa profunda. Todos pensados para una durabilidad espectacular.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10 max-w-md mx-auto px-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold cursor-pointer transition-all duration-250 ${
                selectedCategory === cat.value
                  ? "bg-gradient-to-r from-gold-primary to-gold-dark text-black font-extrabold shadow-md shadow-gold-primary/10"
                  : "bg-stone-900 text-stone-300 border border-stone-800/80 hover:border-gold-primary/45 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Showcase Cards - Responsive view layouts */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            const isExpanded = !!expanded[service.id];
            
            return (
              <motion.div
                layout
                key={service.id}
                className={`relative flex flex-col justify-between bg-stone-900/35 backdrop-blur-md rounded-2xl md:rounded-3xl p-3.5 md:p-6.5 border-2 transition-all duration-350 shadow-2xl hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] hover:border-gold-primary/45 col-span-1 ${
                  isSelected 
                    ? "border-gold-primary bg-stone-900/50" 
                    : "border-stone-850 bg-stone-900/30"
                }`}
              >
                {/* Popular Item Badge */}
                {service.popular && (
                  <span className="absolute -top-2 md:-top-3.5 left-2.5 md:left-6 inline-flex items-center px-2 md:px-3.5 py-0.5 md:py-1 rounded-full text-[7px] md:text-[10px] font-extrabold bg-gold-primary/25 text-gold-accent shadow-lg border border-gold-primary/35 uppercase tracking-wider z-10">
                    <Sparkles className="w-2 md:w-3.5 h-2 md:h-3.5 mr-0.5 md:mr-1.5 text-gold-primary animate-pulse shrink-0" />
                    <span>Top</span>
                  </span>
                )}

                {/* --- MOBILE CARD VIEW --- */}
                <div className="flex md:hidden flex-col h-full justify-between space-y-2 text-left">
                  <div className="space-y-1">
                    <span className="text-[7px] uppercase font-extrabold tracking-widest text-gold-primary">
                      {service.category === "manicura" ? "Manicura" : service.category === "pedicura" ? "Pedicura" : "Art Deco"}
                    </span>
                    <h3 className="font-serif text-xs font-bold text-white leading-tight min-h-[2.2rem] line-clamp-2">
                      {service.name}
                    </h3>

                    {/* Compact row with Investment and Duration next to each other */}
                    <div className="flex items-center justify-between bg-stone-950/50 p-1.5 px-2 rounded-lg border border-gold-primary/5 text-[9px] font-bold mt-1">
                      <span className="text-gold-light font-serif">
                        {service.price === 0 ? "A Valorar" : `${service.price}€`}
                      </span>
                      <span className="text-stone-300 font-extrabold flex items-center shrink-0">
                        <Clock className="w-2.5 h-2.5 mr-0.5 text-gold-primary" />
                        {service.duration}m
                      </span>
                    </div>
                  </div>

                  {/* Toggle description for mobile card */}
                  <div className="space-y-1.5">
                    <div>
                      <button
                        onClick={(e) => toggleExpand(service.id, e)}
                        className="w-full flex items-center justify-between text-[9px] text-stone-400 hover:text-white py-1 px-1.5 rounded-md bg-stone-900/60 border border-stone-800/80 transition-colors uppercase tracking-wider font-extrabold"
                        aria-label="Ver detalles"
                      >
                        <span>{isExpanded ? "Ocultar" : "Detalle"}</span>
                        <ChevronDown className={`w-2.5 h-2.5 text-gold-primary transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[9px] text-stone-300 leading-normal font-sans pt-1 border-t border-stone-850/60 font-medium">
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Compact Direct Button */}
                    <button
                      onClick={() => handleSelectAndScroll(service.id)}
                      className={`w-full h-9 flex items-center justify-center rounded-xl text-[9px] font-extrabold transition-all duration-150 uppercase tracking-widest cursor-pointer mt-1 ${
                        isSelected
                          ? "bg-gold-primary/25 text-gold-accent border border-gold-primary"
                          : "bg-stone-900 text-stone-300 border border-gold-primary/10 active:scale-95"
                      }`}
                    >
                      {isSelected ? (
                        <span className="flex items-center justify-center">
                          <Check className="w-3 h-3 mr-1 text-gold-primary" />
                          <span>Añadido</span>
                        </span>
                      ) : (
                        <span>Añadir</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* --- DESKTOP/TABLET CARD VIEW (Traditional Clean Layout) --- */}
                <div className="hidden md:flex flex-col h-full justify-between text-left space-y-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-gold-primary">
                        {service.category === "manicura" ? "Manicura Premium" : service.category === "pedicura" ? "Pedicura Spa" : "Nail Art Técnico"}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white mt-1 leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* Investment and Duration block */}
                    <div className="pt-6 mt-6 border-t border-stone-850 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-stone-400 text-[10px] uppercase font-extrabold tracking-wider animate-pulse">Inversión</span>
                        <span className="text-2xl font-serif font-bold text-white bg-gradient-to-r from-white via-gold-light to-gold-primary bg-clip-text text-transparent">
                          {service.price === 0 ? "A Valorar" : `${service.price}€`}
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-stone-400 text-[10px] uppercase font-extrabold tracking-wider">Duración</span>
                        <span className="flex items-center text-xs text-stone-300 font-extrabold mt-1">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-gold-primary" />
                          {service.duration} min.
                        </span>
                      </div>
                    </div>

                    {/* Classic Button (Touch Target: 48px) */}
                    <div className="mt-6 pt-1">
                      <button
                        onClick={() => handleSelectAndScroll(service.id)}
                        className={`w-full h-12 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 uppercase tracking-wider cursor-pointer ${
                          isSelected
                            ? "bg-gold-primary/20 text-gold-accent border-2 border-gold-primary shadow-lg"
                            : "bg-stone-900/90 text-stone-300 border border-gold-primary/10 hover:bg-stone-800 hover:border-gold-primary/30 hover:text-white"
                        }`}
                      >
                        {isSelected ? (
                          <span className="flex items-center justify-center">
                            <Check className="w-4 h-4 mr-1.5 text-gold-primary" /> Seleccionado (Calcular)
                          </span>
                        ) : (
                          "Añadir al Presupuesto"
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* Tip banner */}
        <div className="mt-12 bg-stone-900/40 border border-gold-primary/15 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto backdrop-blur-xs">
          <div className="flex items-start space-x-3 text-left">
            <span className="text-xl sm:text-2xl mt-0.5 sm:mt-0">⚜️</span>
            <div>
              <h4 className="text-xs font-extrabold text-gold-accent uppercase tracking-widest">¿Quieres combinar varios servicios?</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-1 max-w-xl leading-relaxed">
                Al seleccionar varios servicios de la carta, nuestro calculador interactivo del presupuesto consolidará la duración estimada y el precio total automático antes de enviar el formato a Nefert.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById("calculator");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="shrink-0 w-full sm:w-auto h-11 flex items-center justify-center px-4 bg-gradient-to-r from-gold-primary to-gold-dark hover:brightness-110 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <span>Ir al Calculador</span>
            <ArrowDown className="w-4.5 h-4.5 ml-1.5 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}

