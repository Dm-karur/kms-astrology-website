import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Flame, Leaf, Navigation, ArrowRight } from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const PurposeOfAstrology = ({ onBookConsultation }) => {
  const { t, isTamil } = useLanguage();
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

        {/* Unified Master Showcase Card with Image and Narrative inside the same container */}
        <div className="purpose-master-card">
          <div className="purpose-narrative-watermark" aria-hidden="true">
            <BrandMotif size={220} />
          </div>

          <div className="purpose-master-grid">
            {/* Left Column: Editorial Wisdom */}
            <div className="purpose-narrative-body">
              <h3 className="purpose-narrative-title">
                {isTamil ? "பேரண்ட ஆற்றலோடு இசைந்து வாழ ஞானியர் அருளிய ஒப்பற்ற கொடை" : "Sacred Guidance to Live in Harmony with Cosmic Energies"}
              </h3>

              <div className="purpose-narrative-text">
                <p className="purpose-p purpose-p-lead">
                  {data.p1 || data.mainQuote}
                </p>
                {data.p2 && (
                  <p className="purpose-p">
                    {data.p2}
                  </p>
                )}
              </div>

              <div className="purpose-insight-badge">
                <Navigation size={16} className="text-gold" aria-hidden="true" />
                <span>
                  {isTamil
                    ? "இயற்கை மற்றும் பிரபஞ்ச விதிகளுக்கு இசைந்து, வாழ்வின் திசையைத் தெளிவுபடுத்தும் நல்வழிகாட்டி"
                    : "Living in resonance with universal cosmic laws to navigate life with clarity"}
                </span>
              </div>
            </div>

            {/* Right Column: Cosmic Planet Earth & Sun Image Frame */}
            <div className="purpose-image-col">
              <div className="purpose-image-frame">
                <img
                  src="/images/purpose-cosmic-v2.webp"
                  alt={isTamil ? "பேரண்ட விண்வெளியில் ஒளிரும் சூரியன் மற்றும் பூமி - ஜோதிடத்தின் தோற்றம்" : "Planet Earth and the radiant sun in the cosmic expanse illustrating the creation of astrology"}
                  width="1024"
                  height="715"
                  loading="lazy"
                  className="purpose-temple-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Wisdom Pillars */}
        <div className="purpose-pillars-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="purpose-pillar-card">
              <div className="purpose-pillar-top">
                <span className="purpose-pillar-num">{pillar.num || `0${idx + 1}`}</span>
                <div className="purpose-pillar-icon-wrap" aria-hidden="true">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
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
