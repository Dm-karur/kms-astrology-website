import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/siteConfig";
import { BrandMotif, GoldDivider } from "./SubtleKolam";
import {
  Home,
  Compass,
  ArrowRight,
  Calendar,
  Heart,
  GraduationCap,
  Briefcase,
  Phone,
  MessageCircle,
  Globe,
} from "lucide-react";

const currentYear = new Date().getFullYear();

export const NotFoundPage = ({ onNavigateHome, onSelectService }) => {
  const { toggleLanguage, t, isTamil } = useLanguage();
  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname + window.location.search
      : "/unknown";

  const handleHomeClick = (e) => {
    if (e) e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = "/";
    }
  };

  const handleServiceClick = (categoryKey) => {
    if (onSelectService) {
      onSelectService(categoryKey);
    } else if (onNavigateHome) {
      onNavigateHome("#consultation");
    } else {
      window.location.href = "/#consultation";
    }
  };

  const handleConsultationClick = () => {
    if (onNavigateHome) {
      onNavigateHome("#consultation");
    } else {
      window.location.href = "/#consultation";
    }
  };

  const notFoundText = t.notFound;

  return (
    <div className="not-found-page">
      {/* Top Navigation Bar */}
      <header className="navbar not-found-navbar">
        <div className="container nav-container">
          <button
            type="button"
            className="brand-link"
            onClick={handleHomeClick}
            aria-label={isTamil ? siteConfig.brandNameTa : siteConfig.brandName}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <div className="brand-motif">
              <BrandMotif size={24} />
            </div>
            <div className="brand-text-block">
              <span className="brand-title">
                {isTamil ? siteConfig.brandNameTa : siteConfig.brandName}
              </span>
              <span className="brand-subtitle">
                {isTamil ? siteConfig.taglineTa : siteConfig.tagline}
              </span>
            </div>
          </button>

          <div className="nav-actions">
            <button
              type="button"
              className="lang-toggle-btn"
              onClick={toggleLanguage}
              aria-label={isTamil ? "Switch to English" : "தமிழுக்கு மாற்றவும்"}
            >
              <Globe size={16} aria-hidden="true" />
              <span>{t.nav.langToggle}</span>
            </button>

            <button
              type="button"
              className="btn btn-primary not-found-nav-cta"
              onClick={handleHomeClick}
            >
              <Home size={16} aria-hidden="true" />
              <span>{notFoundText.navigateHome}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 404 Hero Content */}
      <main className="not-found-main" id="main-content">
        <div className="container">
          <div className="not-found-card">
            {/* Celestial Astrological Emblem */}
            <div className="not-found-emblem-wrap" aria-hidden="true">
              <div className="not-found-glow" />
              <div className="not-found-mandala">
                <svg
                  width="130"
                  height="130"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mandala-svg"
                >
                  {/* Outer Orbit */}
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    stroke="#B08A50"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    opacity="0.8"
                  />
                  {/* Middle Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="37"
                    stroke="#B08A50"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  {/* Inner Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    stroke="#B08A50"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.75"
                  />
                  {/* 12 Radiant Rays (12 Rasis / Zodiac signs) */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                    (deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="13"
                        x2="50"
                        y2="23"
                        stroke="#B08A50"
                        strokeWidth="1.2"
                        transform={`rotate(${deg} 50 50)`}
                        opacity="0.7"
                      />
                    )
                  )}
                  {/* Classical 8-point Astrological Star */}
                  <path
                    d="M50 16 L53 37 L74 40 L56 50 L64 71 L50 58 L36 71 L44 50 L26 40 L47 37 Z"
                    fill="#B08A50"
                    fillOpacity="0.25"
                    stroke="#B08A50"
                    strokeWidth="1.2"
                  />
                  {/* Center Bindu */}
                  <circle cx="50" cy="50" r="4.5" fill="#B08A50" />
                  <circle cx="50" cy="50" r="2" fill="#FCFAF6" />
                </svg>
              </div>
            </div>

            {/* Numeric 404 Display */}
            <div className="not-found-number-block">
              <span className="not-found-number" aria-hidden="true">
                404
              </span>
              <span className="sr-only">Error 404</span>
            </div>

            {/* Eyebrow & Headline */}
            <div className="not-found-eyebrow">
              <Compass size={16} aria-hidden="true" />
              <span>{notFoundText.eyebrow}</span>
            </div>

            <h1 className="not-found-title">{notFoundText.heading}</h1>

            <p className="not-found-desc">{notFoundText.description}</p>

            {/* Requested URL Context Box */}
            <div className="not-found-url-box">
              <span className="not-found-url-label">
                {notFoundText.urlLabel}
              </span>
              <code className="not-found-url-path">{currentPath}</code>
            </div>

            <GoldDivider />

            {/* Primary Action Buttons */}
            <div className="not-found-actions">
              <button
                type="button"
                className="btn btn-primary not-found-primary-btn"
                onClick={handleHomeClick}
              >
                <Home size={18} aria-hidden="true" />
                <span>{notFoundText.navigateHome}</span>
              </button>

              <button
                type="button"
                className="btn btn-gold not-found-gold-btn"
                onClick={handleConsultationClick}
              >
                <Calendar size={18} aria-hidden="true" />
                <span>{notFoundText.bookConsultation}</span>
              </button>
            </div>

            {/* Suggested Guidance Pathways */}
            <div className="not-found-suggestions">
              <h2 className="not-found-suggestions-title">
                {notFoundText.suggestedHeading}
              </h2>

              <div className="not-found-services-grid">
                {/* Marriage Astrology */}
                <button
                  type="button"
                  className="not-found-service-card"
                  onClick={() => handleServiceClick("marriage")}
                >
                  <div className="not-found-service-icon">
                    <Heart size={22} aria-hidden="true" />
                  </div>
                  <div className="not-found-service-text">
                    <h3>{notFoundText.marriageTitle}</h3>
                    <p>{notFoundText.marriageDesc}</p>
                  </div>
                  <ArrowRight size={18} className="not-found-service-arrow" aria-hidden="true" />
                </button>

                {/* Education Astrology */}
                <button
                  type="button"
                  className="not-found-service-card"
                  onClick={() => handleServiceClick("education")}
                >
                  <div className="not-found-service-icon">
                    <GraduationCap size={22} aria-hidden="true" />
                  </div>
                  <div className="not-found-service-text">
                    <h3>{notFoundText.educationTitle}</h3>
                    <p>{notFoundText.educationDesc}</p>
                  </div>
                  <ArrowRight size={18} className="not-found-service-arrow" aria-hidden="true" />
                </button>

                {/* Business Astrology */}
                <button
                  type="button"
                  className="not-found-service-card"
                  onClick={() => handleServiceClick("business")}
                >
                  <div className="not-found-service-icon">
                    <Briefcase size={22} aria-hidden="true" />
                  </div>
                  <div className="not-found-service-text">
                    <h3>{notFoundText.businessTitle}</h3>
                    <p>{notFoundText.businessDesc}</p>
                  </div>
                  <ArrowRight size={18} className="not-found-service-arrow" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Immediate Help / Contact Bar */}
            <div className="not-found-help-bar">
              <div className="not-found-help-text">
                <strong>{notFoundText.needHelp}</strong>{" "}
                <span>
                  {notFoundText.callOrWhatsApp}{" "}
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="not-found-phone-link"
                  >
                    {siteConfig.contact.displayPhone}
                  </a>
                </span>
              </div>
              <div className="not-found-help-actions">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="btn btn-secondary not-found-mini-btn"
                  aria-label="Call Astrologer"
                >
                  <Phone size={15} aria-hidden="true" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary not-found-mini-btn"
                  aria-label="WhatsApp Message"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="site-footer not-found-footer">
        <div className="container">
          <div className="footer-bottom" style={{ borderTop: "none", paddingTop: 0 }}>
            <p>
              © {currentYear}{" "}
              {isTamil ? siteConfig.brandNameTa : siteConfig.brandName}.{" "}
              {t.footer.allRights}
            </p>
            <p style={{ marginTop: "0.25rem", color: "var(--color-gold-light)" }}>
              {t.footer.confidentialityNotice}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
