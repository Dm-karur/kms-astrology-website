import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Sparkles, Compass, Globe2, Sun, Quote, ArrowRight } from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const WhatIsAstrology = ({ onBookConsultation }) => {
  const { t, isTamil } = useLanguage();
  const data = t.whatIsAstrology;

  const pillarIcons = [
    <Compass key="compass" size={24} className="pillar-icon-svg" aria-hidden="true" />,
    <Globe2 key="globe" size={24} className="pillar-icon-svg" aria-hidden="true" />,
    <Sun key="sun" size={24} className="pillar-icon-svg" aria-hidden="true" />,
  ];

  return (
    <section id="what-is-astrology" className="what-is-section" aria-labelledby="what-is-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">

            <span>{data.eyebrow}</span>
          </div>
          <h2 id="what-is-heading" className="section-title">
            {data.heading}
          </h2>
          <GoldDivider />
        </div>

        {/* Master Explanation Illuminated Card */}
        <div className="what-is-master-card">
          <div className="what-is-watermark" aria-hidden="true">
            <BrandMotif size={220} />
          </div>

          <div className="what-is-quote-icon" aria-hidden="true">
            <Quote size={40} />
          </div>

          <div className="what-is-text-content">
            <p className="what-is-main-paragraph">
              {data.mainQuote}
            </p>
          </div>
        </div>

        {/* 3 Pillars of Astrology Definition */}
        <div className="what-is-pillars-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="what-is-pillar-card">
              <div className="what-is-pillar-icon-wrap">
                {pillarIcons[idx]}
              </div>
              <h3 className="what-is-pillar-title">{pillar.title}</h3>
              <p className="what-is-pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Connecting Banner */}
        <div className="what-is-cta-strip">
          <div className="what-is-cta-text">
            <span>
              {isTamil
                ? "உங்கள் தனித்துவமான பிரபஞ்ச வரைபடத்தை (Cosmic Map) அறிய விரும்புகிறீர்களா?"
                : "Curious to understand your unique Cosmic Blueprint?"}
            </span>
          </div>
          {onBookConsultation && (
            <button
              type="button"
              className="btn btn-primary what-is-cta-btn"
              onClick={onBookConsultation}
            >
              <span>{isTamil ? "ஆலோசனை பெறுக" : "Book a Consultation"}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatIsAstrology;
