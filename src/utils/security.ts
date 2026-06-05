/**
 * Cryptographic Data Obfuscation Utility (Anti-Scraping / Anti-Spam)
 * 
 * To shield Nefert's Nail Salon phone number, email and booking links from automated 
 * crawling engines, all sensitive contacts are encoded in Base64.
 * They are decoded dynamically using local JS mechanisms (window.atob) exclusively
 * upon user interaction (clicks, hover, touch, focus).
 */

// Obfuscated Base64 strings
const OBFUSCATED_DATA = {
  phoneRaw: "NjIxIDQzIDI5IDY5",                 // "621 43 29 69"
  phoneTel: "KzM0NjIxNDMyOTY5",                 // "+34621432969"
  whatsapp: "aHR0cHM6Ly93YS5tZS8zNDYyMTQzMjk2OQ==", // "https://wa.me/34621432969"
  email: "bmVmZXJ0c25haWxzYWxvbkBnbWFpbC5jb20="     // "nefertsnailsalon@gmail.com"
};

/**
 * Decodes client-side obfuscated string safely
 */
export function safeDecode(key: keyof typeof OBFUSCATED_DATA): string {
  try {
    if (typeof window !== "undefined" && window.atob) {
      return window.atob(OBFUSCATED_DATA[key]);
    }
  } catch (error) {
    console.error("Decoder error:", error);
  }
  // Soft fallback returned for static parsers (confuses scrapers further)
  return "[Protegido contra Spam]";
}

/**
 * Opens a decoded link safely avoiding any plain-text reference in static DOM.
 * Applies the mandatory 'noopener,noreferrer' flags.
 */
export function safeOpenLink(key: "whatsapp" | "email" | "phoneTel", target: "_blank" | "_self" = "_blank") {
  const value = safeDecode(key);
  if (value.startsWith("[")) return;

  let href = value;
  if (key === "email") {
    href = `mailto:${value}`;
  } else if (key === "phoneTel") {
    href = `tel:${value}`;
  }

  if (target === "_blank") {
    const newWindow = window.open(href, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  } else {
    window.location.href = href;
  }
}
