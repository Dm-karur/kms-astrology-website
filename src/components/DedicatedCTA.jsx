import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ArrowRight, Calendar } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const DedicatedCTA = ({ onBookConsultation }) => {
  const { t } = useLanguage();

  return (
    <section className="dedicated-cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="dedicated-cta-inner">
          <h2 id="cta-heading" className="dedicated-cta-title">
            {t.ctaSection.heading}
          </h2>

          <div style={{ margin: "0.5rem auto 1.5rem auto", display: "flex", justifyContent: "center" }}>
            <GoldDivider />
          </div>

          <p className="dedicated-cta-desc">
            {t.ctaSection.supporting}
          </p>

          <button
            type="button"
            className="btn btn-gold"
            onClick={onBookConsultation}
            style={{ fontSize: "1.0625rem", padding: "1rem 2.25rem" }}
          >
            <Calendar size={20} aria-hidden="true" />
            <span>{t.ctaSection.button}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>

          <div className="dedicated-cta-subdetail">
            {t.ctaSection.detail}
          </div>
        </div>
      </div>
    </section>
  );
};
