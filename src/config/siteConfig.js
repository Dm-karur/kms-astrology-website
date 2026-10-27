/**
 * KMS Astrology - Site Configuration & Business Details
 * Configurable placeholders as specified in brand guidelines.
 * No unverified credentials, awards, or false claims.
 */

export const siteConfig = {
  brandName: "KMS Astrology",
  brandNameTa: "KMS ஜோதிடம்",
  tagline: "Traditional Astrology • Personal Guidance",
  taglineTa: "பாரம்பரிய ஜோதிடம் • தனிப்பட்ட வழிகாட்டுதல்",

  // Astrologer profile placeholders (editable by business owner)
  astrologer: {
    name: "[ASTROLOGER NAME]",
    nameTa: "[ஜோதிடர் பெயர்]",
    title: "Vedic Astrology Consultant",
    titleTa: "வேத ஜோதிட ஆலோசகர்",
    experience: "[VERIFIED YEARS OF EXPERIENCE]",
    experienceTa: "[சரிபார்க்கப்பட்ட அனுபவம்]",
    location: "[Karur, TAMIL NADU]",
    locationTa: "[கரூர், தமிழ்நாடு]",
    serviceArea: "All districts across Tamil Nadu",
    serviceAreaTa: "தமிழ்நாடு முழுவதும் உள்ள அனைத்து மாவட்டங்கள்",
  },

  // Contact details placeholders
  contact: {
    phone: "[BUSINESS PHONE NUMBER]",
    whatsapp: "[BUSINESS WHATSAPP NUMBER]",
    displayPhone: "+91 98400 XXXXX",
    displayWhatsApp: "+91 98400 XXXXX",
    email: "consultation@kmsastrology.com",
    city: "Karur",
    state: "Tamil Nadu",
    cityTa: "கரூர்",
    stateTa: "தமிழ்நாடு",
  },

  // Consultation Services (The Three Primary Pillars)
  services: [
    {
      id: "marriage",
      categoryKey: "marriage",
      image: "/images/Marrige%20Astrology.webp",
    },
    {
      id: "education",
      categoryKey: "education",
      image: "/images/Education%20Astrology.webp",
    },
    {
      id: "business",
      categoryKey: "business",
      image: "/images/Business%20Astrology.webp",
    },
  ],

  // Lead Collection Endpoint Configuration
  api: {
    endpoint: import.meta.env.VITE_LEAD_API_URL || "/api/consultation-enquiry",
    isProductionBackendConfigured: Boolean(import.meta.env.VITE_LEAD_API_URL),
  },
};
