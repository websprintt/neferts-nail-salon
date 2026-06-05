import { Service, Review } from "./types";
import heroImage from "https://github.com/websprintt/neferts-nail-salon/blob/01999269f682ff7335ca0055fb27bc8f342bf13b/src/assets/images/salon_hero_1780588716686.png";
import nailArtElegantImage from "./assets/images/nail_art_elegant_1780588734568.png";
import nailArtCreativeImage from "./assets/images/nail_art_creative_1780588754259.png";
import profileImage from "./assets/images/nefert_profile_1780588769842.png";

// Navigation Links
export const NAV_LINKS = [
  { label: "Inicio", id: "inicio" },
  { label: "Servicios", id: "servicios" },
  { label: "Cálculadora Interactiva", id: "calculator" },
  { label: "Nuestra Galería", id: "galeria" },
  { label: "Reseñas (5.0 ★)", id: "resenas" },
  { label: "Ubicación & Horarios", id: "contacto" }
];

// Salon General Metadata (Exactly matching the new input)
export const SALON_INFO = {
  name: "Nefert's Nail Salon",
  rating: 5.0,
  reviewsCount: 47,
  phone: "621 43 29 69",
  phoneDisplay: "621 43 29 69",
  address: "C/ Estación Vía Crucis, nº 4, 13003 Ciudad Real",
  postalCode: "13003",
  city: "Ciudad Real",
  plusCode: "X3QC+R8 Ciudad Real",
  instagramUsername: "@nefertsnailsalon",
  instagramLink: "https://www.instagram.com/nefertsnailsalon",
  whatsappLink: "https://wa.me/34621432969",
  // Updated schedule table matching official data
  schedule: [
    { days: "Lunes a Jueves", hours: "9:00 - 14:00 y 15:00 - 20:00" },
    { days: "Viernes", hours: "9:00 - 14:00 y 15:00 - 18:00" },
    { days: "Sábados", hours: "9:00 - 14:00" },
    { days: "Domingos", hours: "Cerrado" }
  ]
};

// Generated Asset Paths & Official Instagram Logo
export const IMAGES = {
  logoUrl: "https://scontent-mad1-1.cdninstagram.com/v/t51.2885-19/466067996_1627328571528475_7880055908110381705_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby43MjMuYzIifQ&_nc_ht=scontent-mad1-1.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2gH1xBedSmuMz14R9dIbjDnl-y8oEgcb_TnOjxTXNWeELnj7hTuGZL5t4zrSxRNx7tY&_nc_ohc=ydZeXz0qvwgQ7kNvwEuLYcw&_nc_gid=bSfAXEnfBb5xxPprLM5vKA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_wnuaNlHucZfV4DbjFkXyXw17L2-IrW3AnrhEFih3euQ&oe=6A2780CE&_nc_sid=7a9f4b",
  hero: heroImage,
  nailArtElegant: nailArtElegantImage,
  nailArtCreative: nailArtCreativeImage,
  profile: profileImage,
};

// Complete Service Catalog exactly parsed from the provided list
export const SERVICES: Service[] = [
  // Manicura
  {
    id: "manicura-base",
    name: "Manicura Natural",
    category: "manicura",
    price: 6,
    duration: 30,
    description: "Tratamiento básico de limpieza, limado de uñas naturales y cuidado de cutículas."
  },
  {
    id: "gel-new",
    name: "Uñas de Gel (Uñas Nuevas)",
    category: "manicura",
    price: 30,
    duration: 105,
    description: "Aplicación y modelado de uñas de gel completas de alta durabilidad y acabado impecable.",
    popular: true
  },
  {
    id: "gel-refill",
    name: "Relleno de Gel",
    category: "manicura",
    price: 23,
    duration: 90,
    description: "Mantenimiento profesional de crecimiento para uñas de gel con nivelación y refuerzo de su estructura."
  },
  {
    id: "semipermanente",
    name: "Esmaltado Semipermanente",
    category: "manicura",
    price: 16,
    duration: 50,
    description: "Esmaltado semipermanente impecable de alta adherencia y brillo espectacular.",
    popular: true
  },
  {
    id: "gel-extend",
    name: "Extend (Alargamiento técnico)",
    category: "manicura",
    price: 20,
    duration: 75,
    description: "Sistema rápido Soft Gel para conseguir un alargamiento inmediato y natural."
  },
  {
    id: "retirado-gel",
    name: "Retirado de Gel",
    category: "manicura",
    price: 8,
    duration: 30,
    description: "Retirado seguro, higiénico y cuidadoso de material de gel para proteger tu uña natural."
  },
  {
    id: "retirado-semi",
    name: "Retirado de Semipermanente",
    category: "manicura",
    price: 6,
    duration: 20,
    description: "Retirado rápido y suave de esmalte semipermanente con pulido de la lámina de la uña."
  },

  // Pedicura
  {
    id: "pedi-limpieza",
    name: "Sólo Limpieza (Pedicura)",
    category: "pedicura",
    price: 18,
    duration: 40,
    description: "Corte, limpieza profunda de cutículas y eliminación cuidadosa de impurezas en los pies."
  },
  {
    id: "pedi-cortar-limar",
    name: "Cortar y Limar (Pies)",
    category: "pedicura",
    price: 10,
    duration: 20,
    description: "Servicio rápido de corte lineal correcto y limado profesional para asentar el crecimiento saludable."
  },
  {
    id: "pedi-completa-pintar",
    name: "Cortar, Limar y Pintar (Pies)",
    category: "pedicura",
    price: 20,
    duration: 50,
    description: "Cuidado higiénico del contorno de uñas de los pies, limado técnico y esmaltado impecable."
  },
  {
    id: "pedi-completa-spa",
    name: "Pedicura Completa",
    category: "pedicura",
    price: 25,
    duration: 70,
    description: "Pedicura profunda integral para pies sanos: remoción de durezas y exfoliación premium.",
    popular: true
  },
  {
    id: "pedi-recon-dedogordo",
    name: "Reconstrucción Dedo Gordo",
    category: "pedicura",
    price: 5,
    duration: 15,
    description: "Reconstrucción estética de la uña del primer metatarso con gel terapéutico protector."
  },
  {
    id: "pedi-retirado",
    name: "Retirado Pedicura",
    category: "pedicura",
    price: 10,
    duration: 25,
    description: "Retirado exclusivo de material en pies, suavizado y acondicionamiento nutritivo final."
  },

  // Custom additions for user requests
  {
    id: "decor-custom",
    name: "Nail Art Personalizado (Consulta en Centro)",
    category: "nail-art",
    price: 0,
    duration: 20,
    description: "Selecciona esta opción si deseas diseños elaborados. El precio definitivo se valorará directamente en el salón según la complejidad.",
    popular: true
  }
];

// Actual and expanded Google Reviews
export const REVIEWS: Review[] = [
  {
    id: "rev-ana",
    author: "Ana Cristina Moreno",
    rating: 5,
    date: "Hace 4 meses",
    authorPrefix: "Cliente habitual (1 año de confianza)",
    text: "El trato es súper amable, profesional y rápido, Nefert te hace sentir cómoda desde el primer momento. Las uñas quedan perfectas, con muchísimo detalle y duran intactas semanas. Sin duda, mi sitio de confianza desde hace ya un año. ¡Lo recomiendo 100%!"
  },
  {
    id: "rev-pilar",
    author: "Pilar Ruedas",
    rating: 5,
    date: "Hace 8 meses",
    authorPrefix: "Cliente habitual (Uñas sanas y largas)",
    text: "Estoy encantada con el trabajo de Nefert. Gracias a ella ahora mis uñas son realmente mías, solo me aplica el gel, y por fin he podido tenerlas largas cuando antes nunca lo lograba. Llevo varios meses haciéndome las uñas con ella y no se me rompen jamás."
  },
  {
    id: "rev-leticia",
    author: "Leticia S-C",
    rating: 5,
    date: "Hace 4 meses",
    authorPrefix: "Local Guide · 24 opiniones",
    text: "No hay mejor lugar para hacerse las uñas. ¡Nefert es súper eficiente, creativa y rápida! Sin contar con lo buena persona que es. ¡Un ratito de relax y charla terapéutica que todos necesitamos! Acabados ideales."
  },
  {
    id: "rev-maria",
    author: "María José Ramos",
    rating: 5,
    date: "Hace 2 meses",
    authorPrefix: "Cliente satisfecha",
    text: "Espectacular la atención al detalle de Nefert. Utiliza herramientas impecables y su precisión con el torno de manicura rusa es insuperable. Siempre salgo feliz con mis diseños impecables y duraderos."
  }
];

// FAQS
export const FAQS = [
  {
    q: "¿Qué incluye la decoración por defecto en el precio de servicio?",
    a: "Nuestros precios ordinarios de servicios estándar en manicura/gel ya incluyen decoración sencilla en una uña. En caso de preferir diseños de Nail Art complejos en más uñas de las manos o pedrería fina, se valorará y presupuestará directamente al inicio de tu sesión en el centro."
  },
  {
    q: "¿Qué sucede si se me rompe una uña al cabo de pocos días?",
    a: "¡Ofrecemos garantía! Para tu absoluta tranquilidad, cualquier arreglo de uñas pasado un plazo de hasta cuatro días tiene una tarifa de solo 2,5€ por uña. Si desafortunadamente traes 4 o más uñas rotas, esta reparación integral se valorará y cobrará bajo el estándar de un juego de gel nuevo."
  },
  {
    q: "¿Con cuánta antelación debo solicitar mi cita con Nefert?",
    a: "Dado que es un salón de atención personalizada que cuida a cada cliente de manera exclusiva y individual, recomendamos reservar tu cita con un mínimo de 3 a 5 días de anticipación, en especial para cubrir los cotizados turnos de tarde."
  },
  {
    q: "¿Se pueden morder o romper las uñas esculpidas de Gel?",
    a: "Nuestras uñas en Gel proporcionan un escudo técnico ultra resistente de alta gama. Esto ha ayudado a muchas clientas con problemas de onicofagia (uñas mordidas) o debilidad natural extrema a preservar intacto el crecimiento de sus propias uñas."
  }
];
