import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { useLanguage } from "../context/LanguageContext";
import { WhatsAppIcon } from "./SocialIcons";

/**
 * FloatingWhatsApp - Direct WhatsApp Quick Chat Float
 * Provides instant single-tap access to WhatsApp consultation inquiry.
 */
export const FloatingWhatsApp = () => {
  const { isTamil } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const whatsAppUrl =
    siteConfig.socials?.whatsapp ||
    siteConfig.contact?.whatsappUrl ||
    "https://wa.me/917397162177?text=Hello%20KMS%20Astrology,%20I%20would%20like%20to%20enquire%20about%20a%20consultation";

  return (
    <aside className="floating-whatsapp-wrap" aria-label="WhatsApp Quick Contact">
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label={isTamil ? "வாட்ஸ்அப் மூலம் தொடர்புகொள்ள" : "Chat with Astrologer on WhatsApp"}
        title={isTamil ? "வாட்ஸ்அப் மூலம் தொடர்புகொள்ள" : "Chat with Astrologer on WhatsApp"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="floating-whatsapp-glow" aria-hidden="true" />
        <WhatsAppIcon size={28} className="floating-whatsapp-icon" />
        <span className={`floating-whatsapp-label ${isHovered ? "visible" : ""}`}>
          {isTamil ? "வாட்ஸ்அப்பில் பேச" : "Chat on WhatsApp"}
        </span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
