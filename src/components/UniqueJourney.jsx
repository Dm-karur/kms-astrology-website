import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Award, Compass, Globe2, ArrowRight, Sparkles } from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const UniqueJourney = ({ onBookConsultation }) => {
  const { t } = useLanguage();
  const data = t?.uniqueJourney;

  if (!data) return null;

  const statIcons = [
    <Award key="award" size={24} className="journey-stat-icon" aria-hidden="true" />,
    <Compass key="compass" size={24} className="journey-stat-icon" aria-hidden="true" />,
    <Globe2 key="globe" size={24} className="journey-stat-icon" aria-hidden="true" />,
  ];

  return (
    <section id="unique-journey" className="journey-section" aria-labelledby="journey-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>{data.eyebrow}</span>
          </div>
          <h2 id="journey-heading" className="section-title">
            {data.heading}
          </h2>
          <GoldDivider />
        </div>

        {/* Master Story & Editorial Presentation Card */}
        <div className="journey-master-card">
          <div className="journey-watermark" aria-hidden="true">
            <BrandMotif size={240} />
          </div>

          <div className="journey-content-body">
            <div className="journey-narrative">
              <p className="journey-p journey-p-highlight">
                {data.p1}
              </p>
              <p className="journey-p">
                {data.p2}
              </p>
              <p className="journey-p">
                {data.p3}
              </p>
            </div>

            {/* 3 Impact Stat Highlights */}
            {data.highlights && (
              <div className="journey-stats-grid">
                {data.highlights.map((item, idx) => (
                  <div key={idx} className="journey-stat-card">
                    <div className="journey-stat-icon-wrap">
                      {statIcons[idx]}
                    </div>
                    <div className="journey-stat-number">{item.num}</div>
                    <div className="journey-stat-label">{item.label}</div>
                    <div className="journey-stat-sub">{item.sub}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="journey-cta-strip">
          <div className="journey-cta-text">
            <span>{data.ctaText}</span>
          </div>
          {onBookConsultation && (
            <button
              type="button"
              className="btn btn-primary journey-cta-btn"
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

export default UniqueJourney;
