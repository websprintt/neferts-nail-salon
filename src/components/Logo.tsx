import { useState } from "react";
import { Sparkles } from "lucide-react";
import { IMAGES } from "../data";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [showMonogram, setShowMonogram] = useState(false);

  // Define sizes classes for tailwind
  const containerSizes = {
    sm: "w-8 h-8 p-0.5",
    md: "w-11 h-11 p-0.5",
    lg: "w-16 h-16 p-1"
  };

  // Generate sequence of alternative, CORS-friendly loader links for Instagram CDN
  const sources = [
    // 1. wsrv.nl proxy (highly reliable, bypasses Instagram hotlinking restrictions)
    `https://wsrv.nl/?url=${encodeURIComponent(IMAGES.logoUrl)}&we&n=-1`,
    // 2. images.weserv.nl proxy (reputable alternative server)
    `https://images.weserv.nl/?url=${encodeURIComponent(IMAGES.logoUrl)}`,
    // 3. corsproxy.io wrapper (secure, handles headers on the fly)
    `https://corsproxy.io/?${encodeURIComponent(IMAGES.logoUrl)}`,
    // 4. Direct CDN URL as final resort (without crosOrigin)
    IMAGES.logoUrl
  ];

  const handleNextSource = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(prev => prev + 1);
    } else {
      setShowMonogram(true);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <div 
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-200 to-amber-700 shadow-md ${containerSizes[size]}`}
      >
        {!showMonogram ? (
          <img 
            src={sources[srcIndex]} 
            alt="Nefert's Nail Salon Logo" 
            referrerPolicy="no-referrer"
            onError={handleNextSource}
            className="w-full h-full object-cover rounded-full bg-stone-950"
          />
        ) : (
          /* High-fidelity fallback luxury vector emblem if all proxies fail */
          <div className="w-full h-full rounded-full bg-stone-950 flex flex-col items-center justify-center text-amber-400 border border-amber-500/20">
            <span className={`font-serif font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 leading-none ${
              size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-base"
            }`}>
              N
            </span>
          </div>
        )}
        
        {/* Subtle decorative glow elements */}
        <Sparkles className={`absolute -top-1 -right-1 text-amber-400 animate-pulse bg-stone-950 rounded-full p-0.5 border border-amber-600/30 ${
          size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
        }`} />
      </div>
    </div>
  );
}

