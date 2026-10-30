import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Compass, Globe2, Sun, ArrowRight, Sparkles } from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const WhatIsAstrology = ({ onBookConsultation }) => {
  const { t, isTamil } = useLanguage();
  const data = t.whatIsAstrology;

  if (!data) return null;

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

        {/* Master Editorial Narrative Showcase Card */}
        <div className="what-is-master-card">
          <div className="what-is-narrative-watermark" aria-hidden="true">
            <BrandMotif size={220} />
          </div>

          <div className="what-is-narrative-body">
            <h3 className="what-is-narrative-title">
              {isTamil ? "பிரபஞ்சத்திற்கும் மனித வாழ்விற்குமான அறிவியல் பூர்வ இணைப்பு" : "The Scientific Connection Between Cosmos and Life"}
            </h3>

            <div className="what-is-narrative-text">
              <p className="what-is-p what-is-p-lead">
                {data.p1 || data.mainQuote}
              </p>
              {data.p2 && (
                <p className="what-is-p">
                  {data.p2}
                </p>
              )}
            </div>

            <div className="what-is-insight-badge">
              <Compass size={18} className="text-gold" aria-hidden="true" />
              <span>
                {isTamil
                  ? "பிறந்த நேர பிரபஞ்ச நிலைகளை நுண்மையாக ஆராய்ந்து வழிகாட்டும் ஒப்பற்ற வானியல் முறை"
                  : "Precise mathematical calculation of planetary degrees at the exact time of birth"}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Astronomical Definition */}
        <div className="what-is-pillars-grid">
          {data.pillars.map((pillar, idx) => (
            <div key={idx} className="what-is-pillar-card">
              <div className="what-is-pillar-top">
                <span className="what-is-pillar-num">{pillar.num || `0${idx + 1}`}</span>
                <div className="what-is-pillar-icon-wrap" aria-hidden="true">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
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
                ? "உங்கள் தனித்துவமான பிரபஞ்ச வரைபடத்தை (Cosmic Map) அறிந்து கொள்ள விரும்புகிறீர்களா?"
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
