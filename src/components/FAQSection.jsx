import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <HelpCircle size={14} aria-hidden="true" />
            <span>{t.faq.eyebrow}</span>
          </div>
          <h2 id="faq-heading" className="section-title">
            {t.faq.heading}
          </h2>
          <GoldDivider />
        </div>

        {/* Accordion Container */}
        <div className="faq-container">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-answer-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div key={index} className="faq-item">
                <button
                  type="button"
                  id={headerId}
                  className="faq-trigger"
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`faq-chevron ${isOpen ? "expanded" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="faq-content"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
