import { Star, ShieldCheck, Mail } from "lucide-react";
import { REVIEWS, SALON_INFO } from "../data";
import { motion } from "motion/react";

export default function Testimonials() {
  return (
    <section id="resenas" className="py-20 bg-dark-velvet relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-1.5 text-gold-primary mb-3 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold-primary text-gold-primary" />
            ))}
          </div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/25 px-3 py-1.5 rounded-full">
            Nuestras Clientas Hablan por Sí Solas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-3 leading-tight">
            ¿Por qué somos el <span className="font-serif italic font-normal text-gold-primary bg-gradient-to-r from-gold-accent via-gold-primary to-gold-dark bg-clip-text text-transparent">Sitio de Confianza</span>?
          </h2>
          <p className="text-stone-300 font-sans text-sm mt-3">
            Contamos con una calificación impecable de <strong>5.0 estrellas</strong> en Google Maps basada en 47 opiniones reales sin editar. Descubre por qué nuestras clientas no cambian de salón.
          </p>
        </div>

        {/* Infinite Slow Scrolling Testimonials Carousel */}
        <div className="relative w-full overflow-hidden py-6 mt-8">
          {/* Subtle elegant gradient backdrop blur shades on coordinates edges to smooth entrance/exit */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-dark-velvet via-dark-velvet/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-dark-velvet via-dark-velvet/80 to-transparent z-20 pointer-events-none" />

          {/* Scrolling infinite track (duplicating reviews thrice for continuous loop) */}
          <motion.div
            className="flex space-x-4 sm:space-x-6 w-max cursor-grab active:cursor-grabbing px-4"
            animate={{ x: [0, "-33.333%"] }}
            transition={{
              ease: "linear",
              duration: 72, // Reduced speed dramatically (from 48 to 72 sec) to make reading effortless on mobile and desktop
              repeat: Infinity,
              repeatType: "loop"
            }}
            whileHover={{ transition: { playState: "paused" } }}
          >
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, idx) => {
              const avatarColors = [
                "bg-gold-primary/20 text-gold-accent border border-gold-primary/30",
                "bg-stone-800 text-stone-300 border border-stone-700",
                "bg-gold-dark/20 text-gold-accent border border-gold-dark/30",
                "bg-stone-900 text-stone-400 border border-stone-800"
              ];
              const colorClass = avatarColors[idx % avatarColors.length];
              const initials = review.author.split(" ").map(w => w[0]).join("").substring(0, 2);

              return (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[200px] sm:w-[380px] shrink-0 bg-stone-900/40 rounded-2xl p-3.5 sm:p-6.5 border border-gold-primary/15 shadow-2xl flex flex-col justify-between hover:border-gold-primary/35 transition-all duration-350 relative overflow-hidden select-none"
                >
                  {/* Gold glowing quotation marks background */}
                  <span className="absolute right-4 top-2 sm:right-6 sm:top-4 font-serif text-4xl sm:text-8xl text-gold-primary/10 select-none pointer-events-none">
                    “
                  </span>

                  <div className="space-y-2.5 sm:space-y-4 text-left">
                    {/* Rating Stars & Verified flag */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-0.5 text-gold-primary">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-gold-primary text-gold-primary animate-pulse" />
                        ))}
                      </div>
                      
                      <span className="inline-flex items-center text-[8px] sm:text-[10px] font-bold text-emerald-300 bg-emerald-950/40 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 text-emerald-400" />
                        <span>Reseña</span>
                      </span>
                    </div>

                    {/* Testimonial body - compactized text sizes for mobile read comfort */}
                    <p className="text-stone-300 font-sans italic text-[10px] sm:text-xs leading-relaxed">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-2 sm:space-x-4 pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-stone-850">
                    <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-[9px] sm:text-xs uppercase shrink-0 ${colorClass}`}>
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-serif text-[10px] sm:text-sm font-bold text-white leading-tight">
                        {review.author}
                      </h4>
                      <span className="block text-[7.5px] sm:text-[10px] text-stone-400 font-medium mt-0.5 leading-none">
                        {review.authorPrefix} • {review.date}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Small Google Badging banner */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.google.com/?cid=12646328328169527632" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-stone-400 hover:text-gold-primary transition-colors duration-250 cursor-pointer"
          >
            <span>Ver las 47 opiniones reales directamente en Google Maps</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
