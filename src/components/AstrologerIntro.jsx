import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/siteConfig";
import { Sparkles, Calendar, MapPin, Award, Compass } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const AstrologerIntro = ({ onBookConsultation }) => {
  const { t, isTamil } = useLanguage();

  return (
    <section id="about" className="section-beige" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          {/* Image & Astrologer Sanctum Card */}
          <div className="about-image-card">
            <div className="about-image-inner">
              <img
                src="/images/Astrologer-image.webp"
                alt={t.about.imageAlt}
                width="600"
                height="800"
                loading="lazy"
              />
              <div className="about-placeholder-badge">
                <span>{isTamil ? "சரிபார்க்கப்பட்ட ஜோதிட ஆலோசனை மையம்" : "Dignified Consultation Sanctum"}</span>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="about-content">
            <div className="section-eyebrow" style={{ justifyContent: "flex-start" }}>
              <Compass size={14} aria-hidden="true" />
              <span>{t.about.eyebrow}</span>
            </div>

            <h2 id="about-heading" className="section-title" style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              {t.about.heading}
            </h2>

            <div style={{ margin: "0.5rem 0 1.25rem 0", display: "flex", justifyContent: "flex-start" }}>
              <GoldDivider />
            </div>

            <p className="about-p">
              {t.about.p1}
            </p>

            <p className="about-p">
              {t.about.p2}
            </p>

            {/* Verified Placeholders Meta Info */}
            <div className="about-meta-grid">
              <div className="about-meta-item">
                <span className="about-meta-label">
                  <Award size={13} style={{ display: "inline", marginRight: "4px" }} aria-hidden="true" />
                  {t.about.experienceLabel}
                </span>
                <span className="about-meta-value">
                  {isTamil ? siteConfig.astrologer.experienceTa : siteConfig.astrologer.experience}
                </span>
              </div>

              <div className="about-meta-item">
                <span className="about-meta-label">
                  <MapPin size={13} style={{ display: "inline", marginRight: "4px" }} aria-hidden="true" />
                  {t.about.locationLabel}
                </span>
                <span className="about-meta-value">
                  {isTamil ? siteConfig.astrologer.locationTa : siteConfig.astrologer.location}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onBookConsultation}
              >
                <Calendar size={18} aria-hidden="true" />
                <span>{t.about.consultCta}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
