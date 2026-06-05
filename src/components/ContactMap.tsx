import { useState, useEffect } from "react";
import { MapPin, Phone, MessageSquare, Clock, Copy, Check, ExternalLink, Mail, Eye } from "lucide-react";
import { SALON_INFO } from "../data";
import { safeDecode, safeOpenLink } from "../utils/security";

export default function ContactMap() {
  const [copied, setCopied] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [timeStatusText, setTimeStatusText] = useState("");
  const [revealedContacts, setRevealedContacts] = useState<Record<string, boolean>>({});

  const revealAndOpen = (key: "phoneTel" | "whatsapp" | "email") => {
    setRevealedContacts(prev => ({ ...prev, [key]: true }));
    safeOpenLink(key);
  };

  useEffect(() => {
    const checkSalonStatus = () => {
      // Get current date/time in Madrid time zone (Ciudad Real, Spain)
      try {
        const madridTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" });
        const localDate = new Date(madridTime);
        const day = localDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes();
        const timeInDecimal = hours + minutes / 60;

        if (day === 0) { // Sunday
          setIsOpenNow(false);
          setTimeStatusText("Cerrado hoy • Abre el lunes a las 9:00");
        } else if (day === 6) { // Saturday
          if (timeInDecimal >= 9 && timeInDecimal < 14) {
            setIsOpenNow(true);
            setTimeStatusText("Abierto ahora • Cierra hoy a las 14:00 (Sábado)");
          } else {
            setIsOpenNow(false);
            setTimeStatusText("Cerrado ahora • Abre el lunes a las 9:00");
          }
        } else if (day === 5) { // Friday
          if ((timeInDecimal >= 9 && timeInDecimal < 14) || (timeInDecimal >= 15 && timeInDecimal < 18)) {
            setIsOpenNow(true);
            setTimeStatusText("Abierto ahora (Viernes) • Cierra a las 18:00");
          } else {
            setIsOpenNow(false);
            if (timeInDecimal < 9) {
              setTimeStatusText("Cerrado ahora • Abre hoy a las 9:00");
            } else if (timeInDecimal >= 14 && timeInDecimal < 15) {
              setTimeStatusText("En descanso • Reabre esta tarde a las 15:00 (Viernes)");
            } else {
              setTimeStatusText("Cerrado por hoy • Abre mañana sábado a las 9:00");
            }
          }
        } else { // Monday to Thursday
          if ((timeInDecimal >= 9 && timeInDecimal < 14) || (timeInDecimal >= 15 && timeInDecimal < 20)) {
            setIsOpenNow(true);
            setTimeStatusText("Abierto ahora • Cierra a las 20:00 (Descanso de 14:00 a 15:00)");
          } else {
            setIsOpenNow(false);
            if (timeInDecimal < 9) {
              setTimeStatusText("Cerrado ahora • Abre hoy a las 9:00");
            } else if (timeInDecimal >= 14 && timeInDecimal < 15) {
              setTimeStatusText("En descanso de mediodía • Reabre a las 15:00");
            } else {
              setTimeStatusText("Cerrado por hoy • Abre mañana a las 9:00");
            }
          }
        }
      } catch (e) {
        // Fallback
        setIsOpenNow(true);
        setTimeStatusText("Abierto • Cierra a las 20:55");
      }
    };

    checkSalonStatus();
    // Refresh every minute
    const interval = setInterval(checkSalonStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(SALON_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacto" className="py-20 bg-dark-velvet relative">
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/25 px-3 py-1 rounded-full">
            ¿Dónde Encontrarnos?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-3 leading-tight">
            Ubicación & <span className="font-serif italic font-normal text-gold-primary bg-gradient-to-r from-gold-accent via-gold-primary to-gold-dark bg-clip-text text-transparent">Contacto</span>
          </h2>
          <p className="text-stone-300 font-sans text-sm mt-3">
            Estamos ubicados en Calle Estación Vía Crucis, 4, en pleno centro de Ciudad Real. Ven a disfrutar de un rato exclusivo de cuidado y mimos.
          </p>
        </div>

        {/* Info Grid (Bento style card left, Google maps iframe right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card Left: Hours and Details (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Quick Timing Logic Status Banner */}
            <div className={`p-4 rounded-xl border flex items-center space-x-3 text-left ${
              isOpenNow
                ? "bg-emerald-950/25 border-emerald-500/30 text-emerald-300"
                : "bg-gold-primary/5 border-gold-primary/20 text-gold-accent"
            }`}>
              <span className={`w-3 h-3 rounded-full shrink-0 ${isOpenNow ? "bg-emerald-500 animate-ping" : "bg-gold-accent"}`} />
              <div className="text-xs font-semibold leading-normal">
                {timeStatusText}
              </div>
            </div>

            {/* Address & Direct Copy */}
            <div className="bg-stone-900/40 p-6 rounded-2xl border border-gold-primary/15 shadow-2xl flex flex-col justify-between space-y-4 text-left hover:border-gold-primary/30 transition-all duration-350">
              <div>
                <span className="text-stone-450 text-[10px] uppercase font-bold tracking-wider">Nuestra Dirección</span>
                <p className="font-serif text-base font-semibold text-white mt-1">
                  {SALON_INFO.address}
                </p>
                <span className="inline-block text-[10px] text-gold-accent font-semibold bg-gold-primary/10 px-2.5 py-1 rounded-sm mt-1.5 border border-gold-primary/25">
                  Plus Code: {SALON_INFO.plusCode}
                </span>
              </div>
              <button
                onClick={copyAddressToClipboard}
                className="inline-flex self-start items-center space-x-1.5 text-xs text-gold-primary hover:text-gold-light font-bold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>¡Dirección copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Dirección</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-stone-900/40 p-6 rounded-2xl border border-gold-primary/15 shadow-2xl text-left space-y-4 hover:border-gold-primary/30 transition-all duration-350">
              <div>
                <span className="text-stone-450 text-[10px] uppercase font-bold tracking-wider">Contacto Directo (Protegido contra Spam)</span>
                <div className="flex flex-col space-y-3.5 mt-2">
                  <a
                    href="#llamar"
                    onClick={(e) => {
                      e.preventDefault();
                      revealAndOpen("phoneTel");
                    }}
                    onMouseEnter={() => setRevealedContacts(prev => ({ ...prev, phoneTel: true }))}
                    className="flex items-center space-x-3 text-stone-200 hover:text-gold-primary transition-colors py-1 group"
                  >
                    <div className="p-2 rounded-lg bg-gold-primary/10 text-gold-primary group-hover:scale-105 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-sm font-semibold block leading-none">
                        {revealedContacts.phoneTel ? safeDecode("phoneRaw") : "621 43 •• ••"}
                      </span>
                      {!revealedContacts.phoneTel && (
                        <span className="text-[10px] text-stone-400 font-sans tracking-wide block mt-1 hover:underline">
                          Pasa el ratón o haz clic para ver número
                        </span>
                      )}
                    </div>
                  </a>
                  
                  <a
                    href="#whatsapp"
                    onClick={(e) => {
                      e.preventDefault();
                      revealAndOpen("whatsapp");
                    }}
                    onMouseEnter={() => setRevealedContacts(prev => ({ ...prev, whatsapp: true }))}
                    className="flex items-center space-x-3 text-stone-200 hover:text-emerald-400 transition-colors py-1 group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-400 group-hover:scale-105 transition-all">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block leading-none">
                        Reserva o consulta por WhatsApp
                      </span>
                      <span className="text-[10px] text-stone-400 font-sans tracking-wide block mt-1">
                        Canal directo • Canal seguro cifrado
                      </span>
                    </div>
                  </a>

                  <a
                    href="#email"
                    onClick={(e) => {
                      e.preventDefault();
                      revealAndOpen("email");
                    }}
                    onMouseEnter={() => setRevealedContacts(prev => ({ ...prev, email: true }))}
                    className="flex items-center space-x-3 text-stone-200 hover:text-gold-primary transition-colors py-1 group"
                  >
                    <div className="p-2 rounded-lg bg-gold-primary/10 text-gold-primary group-hover:scale-105 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block leading-none select-all">
                        {revealedContacts.email ? safeDecode("email") : "nefertsnail•••••@gmail.com"}
                      </span>
                      {!revealedContacts.email && (
                        <span className="text-[10px] text-stone-400 font-sans tracking-wide block mt-1 hover:underline">
                          Escríbenos por email • Haz clic para ver
                        </span>
                      )}
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* opening hours layout */}
            <div className="bg-stone-900/40 p-6 rounded-2xl border border-gold-primary/15 shadow-2xl text-left hover:border-gold-primary/30 transition-all duration-350">
              <span className="text-stone-450 text-[10px] uppercase font-bold tracking-wider">Horario de Atención</span>
              <div className="space-y-2 mt-3 text-xs text-stone-300 font-medium font-sans">
                {SALON_INFO.schedule.map((entry, index) => (
                  <div key={index} className="flex justify-between border-b border-stone-850 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-stone-400 font-medium">{entry.days}:</span>
                    <span className="font-bold text-gold-primary">{entry.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Card Right: Iframe Interactive Map (7 columns) */}
          <div className="lg:col-span-7 h-[420px] lg:h-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-primary/20 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.3970342939103!2d-3.9261271!3d38.9850694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6bc312c1404df3%3A0x64e0ddfa04de7df2!2sCalle%20Estaci%C3%B3n%20V%C3%ADa%20Crucis%2C%204%2C%2013003%20Ciudad%20Real%2C%20Spain!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Nefert's Nail Salon en Ciudad Real"
              className="absolute inset-0 w-full h-full opacity-90 invert-[0.1] sepia-[0.35] saturate-[0.8] hue-rotate-[340deg]"
            />
            {/* View large maps target float */}
            <a
              href="https://maps.google.com/?q=C.+Estacion+Via+Crucis,+4,+13003+Ciudad+Real"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-stone-950 hover:bg-stone-900 border border-gold-primary/35 text-gold-light text-[11px] font-bold px-3 py-2 rounded-lg shadow-md flex items-center space-x-1.5 transition-colors"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
