import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const ServicesSection = ({ onSelectService }) => {
  const { t } = useLanguage();

  const services = [
    {
      id: "marriage",
      categoryKey: "Marriage Astrology",
      title: t.services.marriage.title,
      description: t.services.marriage.description,
      cta: t.services.marriage.cta,
      image: "/images/marrige-image.webp",
      alt: t.services.marriage.alt,
    },
    {
      id: "education",
      categoryKey: "Education Astrology",
      title: t.services.education.title,
      description: t.services.education.description,
      cta: t.services.education.cta,
      image: "/images/Education%20Astrology.webp",
      alt: t.services.education.alt,
    },
    {
      id: "business",
      categoryKey: "Business Astrology",
      title: t.services.business.title,
      description: t.services.business.description,
      cta: t.services.business.cta,
      image: "/images/Business-image.webp",
      alt: t.services.business.alt,
    },
  ];

  return (
    <section id="services" className="section-warm" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">

            <span>{t.services.eyebrow}</span>
          </div>
          <h2 id="services-heading" className="section-title">
            {t.services.heading}
          </h2>
          <GoldDivider />
          <p className="section-subtitle">
            {t.services.supporting}
          </p>
        </div>

        {/* 3 Premium Service Cards */}
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className={`service-card service-card-${service.id}`}>
              <div className="service-image-box">
                <img
                  src={service.image}
                  alt={service.alt}
                  width="600"
                  height="450"
                  loading="lazy"
                  className={`service-card-img service-img-${service.id}`}
                />
              </div>

              <div className="service-content">
                <h3 className="service-card-title">{service.title}</h3>
                <div className="service-card-divider" aria-hidden="true" />
                <p className="service-card-desc">{service.description}</p>

                <button
                  type="button"
                  className="service-card-cta"
                  onClick={() => onSelectService(service.categoryKey)}
                  aria-label={`${service.cta} - ${service.title}`}
                >
                  <span>{service.cta}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Services Pricing One-Liner */}
        {(t.services?.pricingText || t.services?.pricingMarriageBusiness) && (
          <div className="services-pricing-wrapper">
            <p className="services-pricing-text">
              <span className="pricing-item">{t.services.pricingMarriageBusiness || "Marriage and Business Astrology - ₹10,000"}</span>
              <span className="pricing-divider" aria-hidden="true">•</span>
              <span className="pricing-item">{t.services.pricingEducation || "Education Astrology - ₹5,000"}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
