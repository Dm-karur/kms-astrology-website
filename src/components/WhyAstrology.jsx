import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { HelpCircle, AlertCircle } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const WhyAstrology = () => {
  const { t } = useLanguage();

  const blocks = [
    {
      num: "01",
      title: t.whyAstrology.card1.title,
      text: t.whyAstrology.card1.text,
    },
    {
      num: "02",
      title: t.whyAstrology.card2.title,
      text: t.whyAstrology.card2.text,
    },
    {
      num: "03",
      title: t.whyAstrology.card3.title,
      text: t.whyAstrology.card3.text,
    },
  ];

  return (
    <section id="why-astrology" className="section-white" aria-labelledby="why-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <HelpCircle size={14} aria-hidden="true" />
            <span>{t.whyAstrology.eyebrow}</span>
          </div>
          <h2 id="why-heading" className="section-title">
            {t.whyAstrology.heading}
          </h2>
          <GoldDivider />
          <p className="section-subtitle">
            {t.whyAstrology.supporting}
          </p>
        </div>

        {/* 3 Simple Clarity Blocks */}
        <div className="why-grid">
          {blocks.map((block) => (
            <div key={block.num} className="why-card">
              <div className="why-number">{block.num}</div>
              <h3 className="why-card-title">{block.title}</h3>
              <p className="why-card-text">{block.text}</p>
            </div>
          ))}
        </div>

        {/* Responsible Guidance Note */}
        <div className="guidance-note" role="note">
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
            <AlertCircle size={18} style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
            <div>
              <strong style={{ display: "block", color: "var(--color-primary-dark)", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                {t.whyAstrology.disclaimerTitle}
              </strong>
              <span>{t.whyAstrology.disclaimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
