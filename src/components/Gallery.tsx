import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../data";
import { Sparkles, Eye } from "lucide-react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<"all" | "nails" | "salon">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: "gal-1",
      src: IMAGES.nailArtElegant,
      title: "Manicura de Mármol & Oro",
      subtitle: "Acabado de alta gama con pan de oro sobre base niveladora neutra",
      tag: "nails"
    },
    {
      id: "gal-2",
      src: IMAGES.nailArtCreative,
      title: "Arte Pastel Minimalista",
      subtitle: "Líneas abstractas y tonos pastel sobre uñas de gel esculpidas",
      tag: "nails"
    },
    {
      id: "gal-3",
      src: IMAGES.hero,
      title: "El Salón Boutique",
      subtitle: "Un rincón de calma, relax y confort en el centro de Ciudad Real",
      tag: "salon"
    }
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.tag === activeFilter);

  return (
    <section id="galeria" className="py-20 bg-dark-luxury overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/25 px-3 py-1 rounded-full">
            Nuestros Trabajos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-3 leading-tight">
            Galería del <span className="font-serif italic font-normal text-gold-primary bg-gradient-to-r from-gold-accent via-gold-primary to-gold-dark bg-clip-text text-transparent">Salón</span>
          </h2>
          <p className="text-stone-300 font-sans text-sm mt-3">
            Fotografías reales tomadas en el salón. Diseños que marcan tendencia, ejecutados con materiales de la más alta calidad para garantizar salud y belleza duradera.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-2 mb-10">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeFilter === "all" ? "bg-gradient-to-r from-gold-primary to-gold-dark text-white shadow-lg shadow-gold-primary/10" : "bg-stone-900/60 text-stone-300 border border-gold-primary/20 hover:bg-stone-850 hover:text-white"
            }`}
          >
            Ver Todo
          </button>
          <button
            onClick={() => setActiveFilter("nails")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeFilter === "nails" ? "bg-gradient-to-r from-gold-primary to-gold-dark text-white shadow-lg shadow-gold-primary/10" : "bg-stone-900/60 text-stone-300 border border-gold-primary/20 hover:bg-stone-850 hover:text-white"
            }`}
          >
            Diseño de Uñas
          </button>
          <button
            onClick={() => setActiveFilter("salon")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeFilter === "salon" ? "bg-gradient-to-r from-gold-primary to-gold-dark text-white shadow-lg shadow-gold-primary/10" : "bg-stone-900/60 text-stone-300 border border-gold-primary/20 hover:bg-stone-850 hover:text-white"
            }`}
          >
            Nuestro Rincón
          </button>
        </div>

        {/* Grid Dynamic Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" >
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gold-primary/12 cursor-pointer bg-stone-950/60"
                onClick={() => setSelectedImage(item.src)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Visual Backdrop Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-6 flex flex-col justify-end h-1/2 opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-accent">
                    {item.tag === "nails" ? "Nail Art" : "Studio Interior"}
                  </span>
                  <h4 className="text-base font-serif font-semibold text-white mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-250 mt-2 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                {/* Eye icon float banner */}
                <div className="absolute top-4 right-4 bg-stone-950/95 backdrop-blur-xs p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-gold-primary/25">
                  <Eye className="w-4 h-4 text-gold-primary" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh]"
            >
              <img
                src={selectedImage}
                alt="Selected nail artwork zoom"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl border border-gold-primary/30"
              />
              <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-xs font-medium text-stone-400">
                Haz clic en cualquier parte para cerrar
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
