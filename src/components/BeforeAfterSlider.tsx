import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { Sparkles, ArrowLeftRight, Heart, HelpCircle } from "lucide-react";
import { IMAGES } from "../data";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-20 bg-dark-velvet relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Informational Text Column (1 to 5) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/25 px-3 py-1 rounded-full">
              Transformación Real
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Tus uñas reales, <br />
              <span className="font-serif italic font-normal text-gold-primary bg-gradient-to-r from-gold-accent via-gold-primary to-gold-dark bg-clip-text text-transparent">
                más largas y fuertes
              </span>
            </h2>
            <p className="text-stone-300 font-sans text-sm leading-relaxed">
              Muchas clientes vienen resignadas a morderse las uñas o a tenerlas siempre cortas porque se les quiebran al mínimo roce. 
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-stone-900/40 rounded-xl border border-gold-primary/15 shadow-2xl">
                <span className="text-stone-400 font-serif italic block text-xs">Testimonio destacado:</span>
                <p className="text-stone-300 italic text-xs mt-1">
                  &ldquo;Gracias a ella ahora mis uñas son realmente mías, solo me aplica el gel, y por fin he podido tenerlas largas cuando antes nunca lo lograba... No se me cansan ni rompen.&rdquo;
                </p>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-accent block mt-2 text-right">
                  — Pilar Ruedas (Google Review 5.0)
                </span>
              </div>
 
              <div className="flex items-center space-x-2.5 text-xs text-stone-400">
                <Heart className="w-4 h-4 text-gold-primary fill-gold-primary/20" />
                <span>Salud y estética unidas en un solo tratamiento</span>
              </div>
            </div>
          </div>
 
          {/* Interactive Slider Tool Column (6 to 12) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Explanatory badge */}
            <div className="mb-4 inline-flex items-center space-x-1.5 px-3 py-1 bg-gold-primary/10 rounded-full border border-gold-primary/25 text-[11px] text-gold-accent font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-gold-primary" />
              <span>Arrastra el control para ver la diferencia</span>
            </div>
 
            {/* Slider view container */}
            <div
              ref={containerRef}
              className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-primary/20 select-none cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              
              {/* AFTER IMAGE (Base of the container - full styled) */}
              <img
                src={IMAGES.nailArtElegant}
                alt="Después: Uñas de Gel impecables Nefert's"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 bg-stone-950/90 backdrop-blur-md border border-gold-primary/20 px-3 py-1 rounded-md text-[10px] font-bold text-gold-light uppercase tracking-widest z-10">
                Después
              </div>
 
              {/* BEFORE IMAGE (Overlay resized by slider position & heavily filtered to mimic damaged nails) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={IMAGES.nailArtElegant}
                  alt="Antes: Uñas naturales debilitadas"
                  referrerPolicy="no-referrer"
                  className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none pointer-events-none filter grayscale brightness-50 contrast-115 saturate-50 blur-[1.5px] opacity-92"
                  style={{
                    width: containerRef.current ? containerRef.current.offsetWidth : "100%",
                    height: containerRef.current ? containerRef.current.offsetHeight : "100%"
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-stone-950/80 backdrop-blur-xs px-3 py-1 rounded-md text-[10px] font-bold text-stone-300 uppercase tracking-widest z-10 whitespace-nowrap">
                  Antes (Natural)
                </div>
              </div>
 
              {/* SLIDING CONTROL LINE & HANDLE */}
              <div
                className="absolute inset-y-0 z-20 w-0.5 bg-gold-primary/70 cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-stone-950 text-gold-light shadow-xl border border-gold-primary flex items-center justify-center scale-100 group-hover:scale-105 transition-transform">
                  <ArrowLeftRight className="w-4 h-4 text-gold-primary" />
                </div>
              </div>
 
            </div>
 
            {/* Quick description lines */}
            <div className="mt-4 flex justify-between w-full max-w-lg text-[11px] text-stone-400 px-2 font-medium">
              <span>← Desgastadas, rotas, sin brillo</span>
              <span className="font-extrabold text-gold-accent uppercase tracking-wider">Refuerzo Estructural de Gel</span>
              <span>Largas, nutridas y perfectas →</span>
            </div>
 
          </div>

        </div>
      </div>
    </section>
  );
}
