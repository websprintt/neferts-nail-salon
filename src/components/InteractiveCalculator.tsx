import { useState, useEffect } from "react";
import { Calculator, Sparkles, Clock, Check, Send, CheckSquare, Square, RefreshCcw } from "lucide-react";
import { SERVICES, SALON_INFO } from "../data";
import { Service } from "../types";
import { safeDecode } from "../utils/security";

interface InteractiveCalculatorProps {
  selectedServices: string[];
  onSelectService: (serviceId: string) => void;
  onClearServices: () => void;
}

export default function InteractiveCalculator({
  selectedServices,
  onSelectService,
  onClearServices
}: InteractiveCalculatorProps) {
  const [userName, setUserName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [extraNailArt, setExtraNailArt] = useState<"none" | "simple" | "artistic">("none");
  const [removalFromOtherSalon, setRemovalFromOtherSalon] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>("");

  const timeSlots = [
    "Mañana (9:00 - 14:00)",
    "Tarde (15:00 - 18:00)",
    "Tarde Última hora (18:00 - 20:00, Lu-Ju)"
  ];

  // Base pricing configurations
  const removalPrice = 5;
  const removalDuration = 20;

  // Calculate totals
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    let price = 0;
    let duration = 0;

    // Add selected core services
    SERVICES.forEach((service) => {
      if (selectedServices.includes(service.id)) {
        price += service.price;
        duration += service.duration;
      }
    });

    // Add extras
    if (removalFromOtherSalon) {
      price += removalPrice;
      duration += removalDuration;
    }

    setTotalPrice(price);
    setTotalDuration(duration);
  }, [selectedServices, removalFromOtherSalon]);

  const handleSelectServiceLocal = (id: string) => {
    onSelectService(id);
  };

  const generateWhatsAppMessage = () => {
    // Collect service names
    const chosenObjects = SERVICES.filter(s => selectedServices.includes(s.id));
    const serviceLines = chosenObjects.map(s => `• ${s.name} (${s.price}€)`).join("\n");
    
    let extrasList = "";
    if (removalFromOtherSalon) {
      extrasList += `• Retirada de otro centro (+${removalPrice}€)\n`;
    }

    const formattedDate = selectedDate 
      ? new Date(selectedDate).toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : "No indicada";

    const textMessage = 
`¡Hola Nefert! 👋 He calculado mi presupuesto en la web y quiero solicitar cita previa:

💅 SERVICIOS SELECCIONADOS:
${serviceLines || "• Ninguno seleccionado (Consulta directa)"}
${extrasList ? `\n➕ EXTRAS:\n${extrasList}` : ""}

📅 PREFERENCIA HORARIA:
• Fecha: ${formattedDate}
• Turno original: ${selectedTimeSlot || "Por concretar"}

👤 DATOS:
• Nombre: ${userName || "Interesada"}
• Notas adicionales: ${customNotes || "Sin apuntes."}

⏱️ DURACIÓN ESTIMADA: ${totalDuration} minutos
💰 ESTIMACIÓN TOTAL: ${totalPrice}€

¿Estaría disponible ese turno? ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(textMessage);
    const finalUrl = `${safeDecode("whatsapp")}?text=${encodedMessage}`;
    
    // Open in new tab securely
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  const isFormValid = userName.trim().length > 0 && selectedServices.length > 0;

  return (
    <section id="calculator" className="py-20 bg-dark-luxury text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-luxury via-dark-velvet to-dark-luxury opacity-98 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-primary bg-gold-primary/10 px-3 py-1.5 rounded-full border border-gold-primary/20">
            Paso Inteligente • Pre-Reserva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mt-4 leading-tight">
            Calculadora de Cita <span className="font-serif italic font-normal text-gold-primary">Interactiva</span>
          </h2>
          <p className="text-stone-300 font-sans text-sm mt-3">
            Arma tu cita ideal sumando servicios de manicura, tratamientos de gel o pedicura spa. Descubre los costes estimativos y la duración estimada al instante.
          </p>
        </div>

        {/* Bento Board Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step 1 & 2 Selector: Left Side (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Core Services Section */}
            <div className="bg-stone-950/80 rounded-2xl p-6 border border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-gold-primary" />
                  <h3 className="text-base font-serif font-semibold text-white">
                    1. Elige tus Tratamientos
                  </h3>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={onClearServices}
                    className="text-stone-400 hover:text-gold-primary text-xs flex items-center space-x-1.5 uppercase tracking-wider font-bold cursor-pointer p-3.5 -mr-3.5"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Limpiar todo</span>
                  </button>
                )}
              </div>

              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {SERVICES.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleSelectServiceLocal(service.id)}
                      className={`flex items-start md:items-center justify-between p-3.5 rounded-xl border cursor-pointer select-none active:scale-[0.985] transition-all duration-150 ${
                        isChecked
                          ? "bg-gold-primary/15 border-gold-primary/60 text-white shadow-md shadow-gold-primary/5"
                          : "bg-stone-900/40 border-stone-800 hover:border-gold-primary/25 text-stone-300"
                      }`}
                    >
                      <div className="flex items-start space-x-3 max-w-[70%]">
                        <div className="mt-1 shrink-0 text-gold-primary">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 fill-gold-primary/20 text-gold-primary" />
                          ) : (
                            <Square className="w-5 h-5 text-stone-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wide leading-tight">
                            {service.name}
                          </h4>
                          <span className="text-[10px] text-stone-400 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1 text-stone-500" />
                            {service.duration} mins • {service.category === "manicura" ? "Manicura" : service.category === "pedicura" ? "Pedicura" : "Art"}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gold-primary shrink-0 ml-2">
                        {service.price}€
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Extra Options Checkbox */}
            <div className="bg-stone-950/80 rounded-2xl p-6 border border-stone-800 space-y-4">
              <h3 className="text-base font-serif font-semibold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-gold-primary" />
                <span>2. ¿Traes esmalte o gel de otro centro?</span>
              </h3>
              
              <div
                onClick={() => setRemovalFromOtherSalon(!removalFromOtherSalon)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none active:scale-[0.985] transition-all duration-150 ${
                  removalFromOtherSalon
                    ? "bg-gold-primary/15 border-gold-primary/60 text-white shadow-md shadow-gold-primary/5"
                    : "bg-stone-900/40 border-stone-800 hover:border-gold-primary/25 text-stone-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gold-primary">
                    {removalFromOtherSalon ? (
                      <CheckSquare className="w-5 h-5 fill-gold-primary/20 text-gold-primary" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Sí, necesito retirar material anterior (+5€)
                    </h4>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Suma 20 minutos adicionales de preparación segura sin dañar tu uña real.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gold-primary">
                  +5€
                </span>
              </div>
            </div>

          </div>

          {/* Checkout & Quote Summary Card: Right Side (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-stone-950 rounded-2xl border-2 border-gold-primary p-6 shadow-xl relative overflow-hidden">
              {/* Gold light shine design corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/10 rounded-full blur-xl pointer-events-none" />

              <h3 className="text-lg font-serif font-semibold tracking-tight text-white flex items-center space-x-2 border-b border-stone-800 pb-4">
                <Sparkles className="w-5 h-5 text-gold-primary animate-pulse" />
                <span>3. Tu Resumen & Reserva</span>
              </h3>

              {/* Dynamic Real-Time Calculations */}
              <div className="grid grid-cols-2 gap-4 py-6 border-b border-stone-800/80">
                <div className="p-3 bg-stone-900 rounded-xl text-left border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Presupuesto</span>
                  <div className="text-3xl font-bold font-mono text-gold-primary mt-1">
                    {totalPrice}€
                  </div>
                </div>
                <div className="p-3 bg-stone-900 rounded-xl text-left border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Duración Est.</span>
                  <div className="text-3xl font-bold font-mono text-white mt-1">
                    {totalDuration} <span className="text-xs text-stone-400">min.</span>
                  </div>
                </div>
              </div>

              {/* Contact Request Inputs */}
              <div className="py-6 space-y-4 text-left">
                {/* User Name */}
                <div>
                  <label htmlFor="user-name" className="block text-[10px] uppercase font-bold tracking-wider text-gold-primary mb-1.5">
                    Tu nombre completo *
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    placeholder="Ej. Carmen Gómez"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full h-12 bg-stone-900 text-white rounded-xl border border-stone-800 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/40 px-4 text-xs outline-none"
                  />
                </div>

                {/* Date Preference & Shift Preferred */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <label htmlFor="pref-date" className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1.5">
                      Fecha Preferente
                    </label>
                    <input
                      id="pref-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full h-12 bg-stone-900 text-white rounded-xl border border-stone-800 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/40 px-3 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="pref-time" className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1.5">
                      Preferencia Turno
                    </label>
                    <div className="relative">
                      <select
                        id="pref-time"
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full h-12 bg-stone-900 text-white rounded-xl border border-stone-800 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/40 px-3 pr-8 text-xs outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Selecciona turno...</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-stone-950 text-stone-300">
                            {slot}
                          </option>
                        ))}
                      </select>
                      {/* Stylized custom arrow down to prevent default select appearance issue */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold-primary text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes or Pinterest links */}
                <div>
                  <label htmlFor="user-notes" className="block text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1.5">
                    ¿Alguna nota o idea de nail art?
                  </label>
                  <textarea
                    id="user-notes"
                    rows={2}
                    placeholder="Ej: Quiero francesa bicolor, efecto mármol..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-stone-900 text-white rounded-xl border border-stone-800 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary/40 px-4 py-3 text-xs outline-none resize-none"
                  />
                </div>
              </div>

              {/* Informational Policy Disclaimers formatted in sleek blocks */}
              <div className="p-3.5 bg-stone-900/50 rounded-xl border border-stone-800 space-y-2 text-left mb-4">
                <p className="text-[10px] text-stone-300 leading-normal">
                  🎨 <strong>Decoración incluida:</strong> Las tarifas indicadas incluyen una decoración sencilla en <strong>1 uña</strong>. Diseños más elaborados de Nail Art se valorarán directamente en el salón.
                </p>
                <p className="text-[10px] text-stone-300 leading-normal border-t border-stone-800/60 pt-1.5">
                  💅 <strong>Arreglos & Roturas:</strong> Con total confianza, arreglos pasados 4 días tienen un coste de <strong>2.5€ por uña</strong>. De requerir la reparación de 4 o más uñas rotas, se tarifará como un juego de gel nuevo.
                </p>
              </div>

              {/* Secure Booking Actions */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={generateWhatsAppMessage}
                  disabled={!isFormValid}
                  className={`relative w-full h-13 rounded-xl text-xs font-serif font-extrabold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all overflow-hidden ${
                    isFormValid
                      ? "bg-gradient-to-r from-gold-primary to-gold-dark hover:brightness-110 text-white cursor-pointer shadow-lg shadow-gold-primary/10 active:scale-95 duration-100"
                      : "bg-stone-850 text-stone-500 cursor-not-allowed border border-stone-800"
                  }`}
                >
                  {isFormValid && (
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none animate-shine" />
                  )}
                  <Send className="w-4 h-4 text-white relative z-10" />
                  <span className="relative z-10">Enviar Presupuesto a Nefert</span>
                </button>
                
                {/* Security and direct line guarantee banner */}
                <p className="text-[10px] text-stone-400 text-center mt-3 leading-relaxed">
                  🔒 <strong>Sin compromiso de pago inicial.</strong> La pre-estimación genera un formato rápido para WhatsApp para que Nefert valide disponibilidad.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
