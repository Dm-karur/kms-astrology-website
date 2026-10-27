import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../config/translations";

const LanguageContext = createContext();

const STORAGE_KEY = "kms_astro_lang";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ta" || saved === "en") {
        return saved;
      }
    } catch {
      // localStorage may fail in private mode
    }
    return "en";
  });

  const setLanguage = (lang) => {
    if (lang !== "en" && lang !== "ta") return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ta" : "en");
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === "ta") {
      document.title = "KMS ஜோதிடம் | பாரம்பரிய வேத ஜோதிட வழிகாட்டுதல் - தமிழ்நாடு";
    } else {
      document.title = "KMS Astrology | Traditional Astrology & Personal Guidance in Tamil Nadu";
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
    isTamil: language === "ta",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
