import { motion } from "motion/react";
import { Star, ShieldCheck, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { SALON_INFO, IMAGES } from "../data";

export default function Hero() {
  const scrollToCalculator = () => {
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
  };

  const scrollToServices = () => {
    const element = document.getElementById("servicios");
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
    <section id="inicio" className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-dark-luxury via-dark-velvet to-dark-luxury text-gold-light">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e505_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e505_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Visual Content (Hero text) - Column 1 to 7 */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Google Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-start items-center space-x-2 bg-stone-900/80 hover:bg-stone-900 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gold-primary/20 shadow-lg text-gold-accent transition-all cursor-pointer"
            >
              <div className="flex items-center text-gold-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-primary text-gold-primary" />
                ))}
              </div>
              <span className="text-xs font-semibold text-gold-light">
                {SALON_INFO.rating.toFixed(1)} de Excelencia • {SALON_INFO.reviewsCount} opiniones reales
              </span>
            </motion.div>
 
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                Uñas de alta costura, <br />
                <span className="font-serif italic font-normal text-gold-primary bg-gradient-to-r from-gold-accent via-gold-primary to-gold-dark bg-clip-text text-transparent">
                  duración sin límites.
                </span>
              </h1>
              <p className="text-stone-300 font-sans text-base sm:text-lg max-w-xl leading-relaxed">
                Salón de manicura y pedicura artística de máxima precisión en Ciudad Real. No más uñas rotas o levantadas. Especializados en Refuerzo de Gel (Kapping) y Manicura Rusa impecable.
              </p>
            </motion.div>
 
            {/* Quick Value Elements */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 max-w-lg pt-2"
            >
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gold-accent uppercase tracking-wider">Duración 3-4 Semanas</h4>
                  <p className="text-[11px] text-stone-400">Gel técnico con nivelación precisa.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Sparkles className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gold-accent uppercase tracking-wider">Detalle Milimétrico</h4>
                  <p className="text-[11px] text-stone-400">Manicura rusa de alta escuela.</p>
                </div>
              </div>
            </motion.div>
 
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
            >
              <button
                onClick={scrollToCalculator}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-gradient-to-r from-gold-primary to-gold-dark hover:brightness-110 text-white font-semibold text-sm hover:scale-[1.01] transition-all cursor-pointer shadow-lg focus:ring-2 focus:ring-gold-primary/30"
              >
                <Sparkles className="w-4 h-4 mr-2 text-gold-light" />
                Presupuesto & Cita Directa
              </button>
              
              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-transparent hover:bg-stone-900 border border-gold-primary/30 hover:border-gold-primary text-gold-light font-semibold text-sm transition-all cursor-pointer shadow-xs focus:ring-2 focus:ring-gold-primary/20"
              >
                <span>Explorar Servicios</span>
                <ArrowRight className="w-4 h-4 ml-2 text-gold-primary" />
              </button>
            </motion.div>
 
            {/* Small Location / Local Timing Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2 text-stone-400 text-xs font-medium pt-2"
            >
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>{SALON_INFO.address}</span>
            </motion.div>
 
          </div>
 
          {/* Premium Visual Representation - Column 8 to 12 */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            
            {/* Main Picture Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square lg:aspect-[11/12] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-primary/20"
            >
              <img
                src={IMAGES.hero}
                alt="Nefert's Nail Salon Luxury Boutique"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-10000 ease-out hover:scale-105"
              />
              
              {/* Dynamic Overlay card inside image */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 bg-stone-950/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gold-primary/25">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs text-gold-primary font-bold uppercase tracking-widest">Boutique Exclusiva</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">Uñas mimadas individualmente</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold-primary/20 text-gold-accent border border-gold-primary/30 animate-pulse">
                      Atención Individual
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
 
            {/* Back Accent circle for aesthetic spacing */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gold-primary/10 -z-10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-gold-dark/10 -z-10 blur-3xl" />
 
          </div>

        </div>
      </div>
    </section>
  );
}
