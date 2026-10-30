import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Compass, Clock, HeartHandshake, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const WhyAstrology = () => {
  const { t } = useLanguage();
  const data = t?.whyAstrology;

  if (!data) return null;

  const cardIcons = [
    <Compass key="compass" size={22} className="why-icon-svg" aria-hidden="true" />,
    <Clock key="clock" size={22} className="why-icon-svg" aria-hidden="true" />,
    <HeartHandshake key="rel" size={22} className="why-icon-svg" aria-hidden="true" />,
    <ShieldAlert key="health" size={22} className="why-icon-svg" aria-hidden="true" />,
    
  ];

  const cards = data.cards || [
    { num: "01", title: data.card1?.title, text: data.card1?.text },
    { num: "02", title: data.card2?.title, text: data.card2?.text },
    { num: "03", title: data.card3?.title, text: data.card3?.text },
  ];

  return (
    <section id="why-astrology" className="section-white why-astrology-section" aria-labelledby="why-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            
            <span>{data.eyebrow}</span>
          </div>
          <h2 id="why-heading" className="section-title">
            {data.heading}
          </h2>
          <GoldDivider />
          <p className="section-subtitle">
            {data.supporting}
          </p>
        </div>

        {/* 5 Clarity Cards Grid */}
        <div className="why-grid">
          {cards.map((block, idx) => (
            <div key={block.num || idx} className="why-card">
              <div className="why-card-top">
                <span className="why-number">{block.num || `0${idx + 1}`}</span>
                <div className="why-card-icon-wrap" aria-hidden="true">
                  {cardIcons[idx % cardIcons.length]}
                </div>
              </div>
              <h3 className="why-card-title">{block.title}</h3>
              <p className="why-card-text">{block.text}</p>
            </div>
          ))}
        </div>

        {/* Responsible Guidance Note */}
        <div className="guidance-note" role="note">
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
            <AlertCircle size={20} style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
            <div>
              <strong style={{ display: "block", color: "var(--color-primary-dark)", marginBottom: "0.25rem", fontSize: "0.9375rem" }}>
                {data.disclaimerTitle}
              </strong>
              <span>{data.disclaimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAstrology;
