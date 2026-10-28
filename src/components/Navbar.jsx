import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/siteConfig";
import { BrandMotif } from "./SubtleKolam";
import { Menu, X, Globe, Calendar } from "lucide-react";

export const Navbar = ({ onOpenConsultation }) => {
  const { language, toggleLanguage, t, isTamil } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active link
      const sections = ["home", "about", "services", "why-astrology", "faq"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "home", label: t.nav.home, href: "#home" },
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "services", label: t.nav.services, href: "#services" },
    { id: "why-astrology", label: t.nav.whyAstrology, href: "#why-astrology" },
    { id: "faq", label: t.nav.faq, href: "#faq" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const el = document.getElementById("consultation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Left: Brand Logo Lockup */}
        <a
          href="#home"
          className="brand-link"
          onClick={(e) => handleLinkClick(e, "#home")}
          aria-label={isTamil ? siteConfig.brandNameTa : siteConfig.brandName}
        >
          <div className="brand-motif">
            <BrandMotif size={24} />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">
              {isTamil ? siteConfig.brandNameTa : siteConfig.brandName}
            </span>

          </div>
        </a>

        {/* Center: Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Language Toggle & Primary CTA */}
        <div className="nav-actions">
          <button
            type="button"
            className="lang-toggle-btn"
            onClick={toggleLanguage}
            title={language === "en" ? "தமிழில் பார்க்க" : "Switch to English"}
            aria-label={`Current language: ${language === "en" ? "English" : "Tamil"}. Click to switch.`}
          >
            <Globe size={16} aria-hidden="true" />
            <span>{language === "en" ? "தமிழ்" : "English"}</span>
            <span className="lang-toggle-active-badge">
              {language.toUpperCase()}
            </span>
          </button>

          <button
            type="button"
            className="btn btn-primary nav-cta-desktop"
            onClick={handleCtaClick}
          >
            <Calendar size={16} aria-hidden="true" />
            <span>{t.nav.cta}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="mobile-drawer-link"
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
            onClick={handleCtaClick}
          >
            <Calendar size={18} aria-hidden="true" />
            <span>{t.nav.cta}</span>
          </button>
        </div>
      )}
    </header>
  );
};
