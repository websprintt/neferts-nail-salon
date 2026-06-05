import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import InteractiveCalculator from "./components/InteractiveCalculator";
import Testimonials from "./components/Testimonials";
import ContactMap from "./components/ContactMap";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import MobileFloatBar from "./components/MobileFloatBar";

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["sem-nivelacion"]); // Pre-select a default popular service

  const handleSelectService = (id: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(id)) {
        return prev.filter((serviceId) => serviceId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleClearServices = () => {
    setSelectedServices([]);
  };

  return (
    <div className="min-h-screen bg-dark-luxury text-gold-light font-sans antialiased text-left w-full overflow-x-hidden selection:bg-gold-primary/30 selection:text-white">
      {/* Premium Sticky Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* Dynamic Display Hero Banner with Google Ratings */}
        <Hero />

        {/* Services Listing with Deep Linking */}
        <Services
          selectedServices={selectedServices}
          onSelectService={handleSelectService}
        />

        {/* Interactive Before/After Gel Kapping comparison */}
        <BeforeAfterSlider />

        {/* Real-time price and reservation calculator */}
        <InteractiveCalculator
          selectedServices={selectedServices}
          onSelectService={handleSelectService}
          onClearServices={handleClearServices}
        />

        {/* Authentic Customer Reviews Panel */}
        <Testimonials />

        {/* Maps Integration & Dynamic Schedule Checker */}
        <ContactMap />

        {/* Accordion FAQ Panel */}
        <FAQ />
      </main>

      {/* Understated luxury footer */}
      <Footer />

      {/* Floating Thumb Dock for Mobile Devices */}
      <MobileFloatBar />
    </div>
  );
}
