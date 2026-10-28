import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Flame, Leaf, Navigation, ArrowRight, Quote } from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const PurposeOfAstrology = ({ onBookConsultation }) => {
  const { t } = useLanguage();
  const data = t.purposeOfAstrology;

  if (!data) return null;

  const pillarIcons = [
    <Flame key="flame" size={24} className="pillar-icon-svg" aria-hidden="true" />,
    <Leaf key="leaf" size={24} className="pillar-icon-svg" aria-hidden="true" />,
    <Navigation key="nav" size={24} className="pillar-icon-svg" aria-hidden="true" />,
  ];

  return (
    <section id="purpose-of-astrology" className="purpose-section" aria-labelledby="purpose-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>{data.eyebrow}</span>
          </div>
          <h2 id="purpose-heading" className="section-title">
            {data.heading}
          </h2>
          <GoldDivider />
        </div>

        {/* Master Sacred Explanation Card */}
        <div className="purpose-master-card">
          <div className="purpose-watermark" aria-hidden="true">
            <BrandMotif size={220} />
          </div>

          <div className="purpose-quote-icon" aria-hidden="true">
            <Quote size={38} />
          </div>

          <div className="purpose-text-content">
            <p className="purpose-main-paragraph">
              {data.mainQuote}
            </p>
          </div>
        </div>

        {/* 3 Core Wisdom Pillars */}
        <div className="purpose-pillars-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="purpose-pillar-card">
              <div className="purpose-pillar-icon-wrap">
                {pillarIcons[idx]}
              </div>
              <h3 className="purpose-pillar-title">{pillar.title}</h3>
              <p className="purpose-pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Connecting CTA Strip */}
        <div className="purpose-cta-strip">
          <div className="purpose-cta-text">
            <span>{data.ctaText}</span>
          </div>
          {onBookConsultation && (
            <button
              type="button"
              className="btn btn-primary purpose-cta-btn"
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

export default PurposeOfAstrology;
