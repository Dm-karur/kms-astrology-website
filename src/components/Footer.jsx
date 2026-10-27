import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/siteConfig";
import { BrandMotif } from "./SubtleKolam";
import { Phone, MessageSquare, MapPin, Shield } from "lucide-react";

export const Footer = ({ onOpenPolicy, onSelectService }) => {
  const { t, isTamil } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div className="brand-motif" style={{ background: "rgba(255,255,255,0.08)" }}>
                <BrandMotif size={22} />
              </div>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#FCFAF6", fontFamily: isTamil ? "var(--font-heading-ta)" : "var(--font-heading-en)" }}>
                {isTamil ? siteConfig.brandNameTa : siteConfig.brandName}
              </span>
            </div>
            <p className="footer-desc">
              {t.footer.description}
            </p>
            <p className="footer-service-area">
              <strong>{isTamil ? "சேவை வரம்பு:" : "Service Area:"}</strong>{" "}
              {isTamil ? siteConfig.astrologer.serviceAreaTa : siteConfig.astrologer.serviceArea}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="footer-col-title">{t.footer.quickLinks}</h3>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, "home")}
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, "services")}
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, "why-astrology")}
                >
                  {t.nav.whyAstrology}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, "faq")}
                >
                  {t.nav.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Primary Services */}
          <div>
            <h3 className="footer-col-title">{t.footer.ourServices}</h3>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onSelectService("Marriage Astrology")}
                >
                  {t.services.marriage.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onSelectService("Education Astrology")}
                >
                  {t.services.education.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={() => onSelectService("Business Astrology")}
                >
                  {t.services.business.title}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h3 className="footer-col-title">{t.footer.contact}</h3>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" aria-hidden="true" />
              <span>{siteConfig.contact.displayPhone}</span>
            </div>
            <div className="footer-contact-item">
              <MessageSquare size={16} className="footer-contact-icon" aria-hidden="true" />
              <span>{siteConfig.contact.displayWhatsApp}</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" aria-hidden="true" />
              <span>
                {isTamil
                  ? `${siteConfig.contact.cityTa}, ${siteConfig.contact.stateTa}`
                  : `${siteConfig.contact.city}, ${siteConfig.contact.state}`}
              </span>
            </div>
            <div style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--color-gold-light)" }}>
              <Shield size={14} style={{ display: "inline", marginRight: "4px" }} aria-hidden="true" />
              <span>{t.footer.confidentialityNotice}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="footer-bottom-bar">
          <div>
            © {currentYear} {isTamil ? siteConfig.brandNameTa : siteConfig.brandName}. {t.footer.allRights}
          </div>

          <div className="footer-legal-links">
            <button
              type="button"
              className="legal-btn"
              onClick={() => onOpenPolicy("privacy")}
            >
              {t.footer.privacyPolicy}
            </button>
            <button
              type="button"
              className="legal-btn"
              onClick={() => onOpenPolicy("terms")}
            >
              {t.footer.termsConditions}
            </button>
            <button
              type="button"
              className="legal-btn"
              onClick={() => onOpenPolicy("disclaimer")}
            >
              {t.footer.disclaimerTitle}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
