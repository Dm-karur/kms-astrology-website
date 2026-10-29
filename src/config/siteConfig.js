/**
 * KMS Astrology - Site Configuration & Business Details
 * Configurable placeholders as specified in brand guidelines.
 * No unverified credentials, awards, or false claims.
 */

export const siteConfig = {
  brandName: "KMS Astrology",
  brandNameTa: "KMS ஜோதிடம்",
  tagline: "• Personal Guidance",
  taglineTa: " • தனிப்பட்ட வழிகாட்டுதல்",

  // Astrologer profile placeholders (editable by business owner)
  astrologer: {
    name: "Astrologer Subramani",
    nameTa: "ஜோதிடர் சுப்பிரமணி",
    title: "Vedic Astrology Consultant",
    titleTa: "வேத ஜோதிட ஆலோசகர்",
    experience: "28 Years of Dedicated Experience",
    experienceTa: "28 ஆண்டுகால நீண்ட அனுபவம்",
    location: "Tamil Nadu",
    locationTa: " தமிழ்நாடு",
    serviceArea: "Tamil Nadu, India & Globally (Singapore, Malaysia, Sri Lanka, Vietnam)",
    serviceAreaTa: "தமிழ்நாடு, இந்தியா & உலகளவில் (சிங்கப்பூர், மலேசியா, இலங்கை, வியட்நாம்)",
  },

  // Contact details placeholders
  contact: {
    phone: "[BUSINESS PHONE NUMBER]",
    whatsapp: "[BUSINESS WHATSAPP NUMBER]",
    displayPhone: "+91 98400 XXXXX",
    displayWhatsApp: "+91 98400 XXXXX",
    email: "consultation@kmsastrology.com",
    city: "",
    state: "Tamil Nadu",
    cityTa: "",
    stateTa: "தமிழ்நாடு",
  },

  // Official Social Media Profiles
  socials: {
    youtube: "https://www.youtube.com/@kmsastrology001",
    instagram: "https://www.instagram.com/kmsastrology",
    whatsapp: "https://wa.me/?text=Hello%20KMS%20Astrology,%20I%20would%20like%20to%20enquire%20about%20a%20consultation",
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
