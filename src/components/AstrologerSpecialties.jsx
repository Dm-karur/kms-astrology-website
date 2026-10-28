import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { TrendingUp, HeartHandshake, GraduationCap, Home, PhoneCall, ArrowRight, Sparkles } from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const AstrologerSpecialties = ({ onBookConsultation }) => {
  const { t } = useLanguage();
  const data = t?.specialties;

  if (!data) return null;

  const specialtyIcons = [
    <TrendingUp key="career" size={24} className="specialty-icon-svg" aria-hidden="true" />,
    <HeartHandshake key="marriage" size={24} className="specialty-icon-svg" aria-hidden="true" />,
    <GraduationCap key="education" size={24} className="specialty-icon-svg" aria-hidden="true" />,
  ];

  const modeIcons = [
    <Home key="home" size={24} className="mode-icon-svg" aria-hidden="true" />,
    <PhoneCall key="phone" size={24} className="mode-icon-svg" aria-hidden="true" />,
  ];

  return (
    <section id="specialties" className="specialties-section" aria-labelledby="specialties-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>{data.eyebrow}</span>
          </div>
          <h2 id="specialties-heading" className="section-title">
            {data.heading}
          </h2>
          <GoldDivider />
          {data.subtitle && (
            <p className="section-subtitle">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* 3 Signature Specialty Cards Grid */}
        <div className="specialties-grid">
          {data.items?.map((item, idx) => (
            <div key={item.num || idx} className="specialty-card">
              <div className="specialty-card-header">
                <div className="specialty-badge-group">
                  <span className="specialty-number">{item.num}</span>
                  <span className="specialty-tag">{item.tag}</span>
                </div>
                <div className="specialty-icon-wrap" aria-hidden="true">
                  {specialtyIcons[idx % specialtyIcons.length]}
                </div>
              </div>

              <h3 className="specialty-card-title">{item.title}</h3>

              <div className="specialty-card-body">
                {item.text.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="specialty-card-text">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Direct & Online Delivery Modes Card */}
        <div className="specialties-modes-card">
          <div className="modes-watermark" aria-hidden="true">
            <BrandMotif size={220} />
          </div>

          <div className="modes-header">
            <h3 className="modes-title">{data.modesHeading}</h3>
            {data.modesSubtitle && (
              <p className="modes-sub">{data.modesSubtitle}</p>
            )}
          </div>

          <div className="modes-grid">
            {data.modes?.map((mode, mIdx) => (
              <div key={mIdx} className="mode-item-card">
                <div className="mode-item-top">
                  <div className="mode-icon-wrap" aria-hidden="true">
                    {modeIcons[mIdx % modeIcons.length]}
                  </div>
                  <span className="mode-badge">{mode.badge}</span>
                </div>
                <h4 className="mode-item-title">{mode.title}</h4>
                <p className="mode-item-text">{mode.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable CTA Strip */}
        <div className="specialties-cta-strip">
          <div className="specialties-cta-text">
            <span>{data.ctaText}</span>
          </div>
          {onBookConsultation && (
            <button
              type="button"
              className="btn btn-primary specialties-cta-btn"
              onClick={onBookConsultation}
            >
              <span>{data.ctaButton}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AstrologerSpecialties;
