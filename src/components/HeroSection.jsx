import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const HeroSection = ({ onBookConsultation }) => {
  const { t } = useLanguage();

  const handleExploreServices = (e) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Text & CTAs */}
          <div className="hero-content">

            <h1 id="hero-heading" className="hero-headline">
              {t.hero.headline}
            </h1>

            <GoldDivider />

            <p className="hero-supporting">
              {t.hero.supporting}
            </p>

            <div className="hero-ctas">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onBookConsultation}
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>

              <a
                href="#services"
                className="btn btn-secondary"
                onClick={handleExploreServices}
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>

            <div className="hero-trust">
              <CheckCircle2 size={18} className="hero-trust-icon" aria-hidden="true" />
              <span>{t.hero.trustLine}</span>
            </div>
          </div>

          {/* Right Column: High Quality Cosmic Planetary Image */}
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src="/images/hero-cosmic.webp"
                alt="Radiant cosmic solar system and planetary alignment illustrating Vedic astrology"
                width="960"
                height="540"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="hero-image-accent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};
