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
    nameTa: "ஜோதிடர் சுப்ரமணி",
    title: "Vedic Astrology Consultant",
    titleTa: "வேத ஜோதிட ஆலோசகர்",
    experience: "28 Years of Dedicated Experience",
    experienceTa: "28 ஆண்டுகால நீண்ட அனுபவம்",
    location: "Tamil Nadu",
    locationTa: " தமிழ்நாடு",
    serviceArea: "Tamil Nadu",
    serviceAreaTa: "தமிழ்நாடு",
  },

  // Contact details
  contact: {
    phone: "+917397162177",
    whatsapp: "+917397162177",
    displayPhone: "+91 73971 62177",
    displayWhatsApp: "+91 73971 62177",
    whatsappUrl: "https://wa.me/917397162177?text=Hello%20KMS%20Astrology,%20I%20would%20like%20to%20enquire%20about%20a%20consultation",
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
    whatsapp: "https://wa.me/917397162177?text=Hello%20KMS%20Astrology,%20I%20would%20like%20to%20enquire%20about%20a%20consultation",
  },
  // IPL Match Predictions & Videos (YouTube Shorts)
  iplPredictions: [
    {
      id: "ipl-prediction-1",
      num: "01",
      title: "IPL Prediction #1 • Rajasthan Royals",
      titleTa: "ஐபிஎல் கணிப்பு #1 • ராஜஸ்தான் ராயல்ஸ்",
      team: "Rajasthan Royals Match Astrology",
      teamTa: "ராஜஸ்தான் ராயல்ஸ் போட்டி கணிப்பு",
      tag: "IPL 2024 / 2025",
      tagTa: "ஐபிஎல் தொடர்",
      image: "/images/ipl-prediction-1.png",
      videoUrl: "https://www.youtube.com/shorts/1UaS3pqm9Pw",
      youtubeId: "1UaS3pqm9Pw",
      isFeatured: true,
    },
    {
      id: "ipl-prediction-2",
      num: "02",
      title: "IPL Prediction #2 • RCB vs GT",
      titleTa: "ஐபிஎல் கணிப்பு #2 • RCB vs GT",
      team: "Who will win in The Final RCB or GT?",
      teamTa: "RCB vs GT இறுதிப் போட்டியில் வெற்றி பெறப்போவது யார்?",
      tag: "IPL Final Prediction",
      tagTa: "ஐபிஎல் இறுதிப் போட்டி",
      image: "/images/ipl-prediction-2.avif",
      videoUrl: "https://www.youtube.com/shorts/u7t12s1xmVw",
      youtubeId: "u7t12s1xmVw",
    },
    {
      id: "ipl-prediction-3",
      num: "03",
      title: "IPL Prediction #3 • SRH vs RR",
      titleTa: "ஐபிஎல் கணிப்பு #3 • SRH vs RR",
      team: "SRH vs RR: Who Will Go to the Next Stage?",
      teamTa: "SRH vs RR: அடுத்த சுற்றுக்கு செல்லப்போவது யார்?",
      tag: "IPL Playoff Prediction",
      tagTa: "ஐபிஎல் ப்ளேஆஃப் கணிப்பு",
      image: "/images/ipl-prediction-3.avif",
      videoUrl: "https://www.youtube.com/shorts/jPgV-Qq0GX8",
      youtubeId: "jPgV-Qq0GX8",
    },
    {
      id: "ipl-prediction-4",
      num: "04",
      title: "IPL Match Prediction #4",
      titleTa: "ஐபிஎல் போட்டி கணிப்பு #4",
      team: "Astrological Match Analysis",
      teamTa: "ஜோதிட போட்டி ஆய்வு",
      tag: "YouTube Shorts",
      tagTa: "யூடியூப் ஷார்ட்ஸ்",
      image: "/images/ipl-prediction-4.avif",
      videoUrl: "https://www.youtube.com/@kmsastrology001",
    },
    {
      id: "ipl-prediction-5",
      num: "05",
      title: "IPL Match Prediction #5",
      titleTa: "ஐபிஎல் போட்டி கணிப்பு #5",
      team: "Team Victory Astrology Forecast",
      teamTa: "அணி வெற்றி வாய்ப்புகள் ஜோதிடம்",
      tag: "YouTube Shorts",
      tagTa: "யூடியூப் ஷார்ட்ஸ்",
      image: "/images/ipl-prediction-5.avif",
      videoUrl: "https://www.youtube.com/@kmsastrology001",
    },
    {
      id: "ipl-prediction-6",
      num: "06",
      title: "IPL Match Prediction #6",
      titleTa: "ஐபிஎல் போட்டி கணிப்பு #6",
      team: "Match Winner Astrology Analysis",
      teamTa: "வெற்றி அணி ஜோதிடக் கணிப்பு",
      tag: "YouTube Shorts",
      tagTa: "யூடியூப் ஷார்ட்ஸ்",
      image: "/images/ipl-prediction-6.avif",
      videoUrl: "https://www.youtube.com/@kmsastrology001",
    },
    {
      id: "ipl-channel-more",
      isChannelCard: true,
      title: "All IPL Predictions",
      titleTa: "அனைத்து ஐபிஎல் கணிப்புகள்",
      team: "Official KMS Astrology Channel",
      teamTa: "KMS Astrology யூடியூப் சேனல்",
      tag: "YouTube Channel",
      tagTa: "யூடியூப் சேனல்",
      image: "/images/ipl-prediction-1.png",
      videoUrl: "https://www.youtube.com/@kmsastrology001",
    },
  ],

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
    endpoint: import.meta.env.VITE_LEAD_API_URL || "/api/leads/submit.php",
    baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
    isProductionBackendConfigured: true,
  },
};
