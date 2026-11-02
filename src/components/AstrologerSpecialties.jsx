import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/siteConfig";
import {
  TrendingUp,
  HeartHandshake,
  GraduationCap,
  Home,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Award,
  MapPin,
  Calendar,
  Compass,
} from "lucide-react";
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const AstrologerSpecialties = ({ onBookConsultation }) => {
  const { t, isTamil } = useLanguage();
  const data = t?.specialties;

  if (!data) return null;

  const specialtyIcons = [
    <TrendingUp key="career" size={24} className="specialty-icon-svg" aria-hidden="true" />,
    <HeartHandshake key="marriage" size={24} className="specialty-icon-svg" aria-hidden="true" />,
    <GraduationCap key="education" size={24} className="specialty-icon-svg" aria-hidden="true" />,
  ];

  const modeIcons = [
    <Home key="home" size={24} className="mode-icon-svg" aria-hidden="true" />,
    <PhoneCall key="phone" size={24} className="mode-icon-svg" aria-hidden="true" />,
  ];

  return (
    <section id="specialties" className="specialties-section" aria-labelledby="specialties-heading">
      {/* Anchor helper for 'about' navigation */}
      <div id="about" style={{ position: "relative", top: "-90px" }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>{data.eyebrow}</span>
          </div>
          <h2 id="specialties-heading" className="section-title">
            {data.heading}
          </h2>
          <GoldDivider />
          {data.subtitle && (
            <p className="section-subtitle">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Astrologer Subramani Profile Showcase Card */}
        <div className="specialties-profile-card">
          <div className="specialties-profile-watermark" aria-hidden="true">
            <BrandMotif size={240} />
          </div>

          <div className="specialties-profile-grid">
            {/* Left: Authentic Portrait Photo */}
            <div className="specialties-image-col">
              <div className="specialties-image-frame">
                <img
                  src="/images/astrologer-subramani.webp"
                  alt={isTamil ? "ஜோதிடர் சுப்பிரமணி - வேத ஜோதிட ஆலோசகர்" : "Astrologer Subramani - Vedic Astrology Consultant"}
                  width="420"
                  height="560"
                  loading="lazy"
                  className="specialties-photo"
                />
                <div className="specialties-image-badge">
                  <Sparkles size={14} className="text-gold" aria-hidden="true" />
                  <span>{isTamil ? "28+ ஆண்டுகள் நீண்ட அனுபவம்" : "28+ Years Dedication"}</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Credentials & Bio */}
            <div className="specialties-profile-content">
              <div className="specialties-role-pill">
                <Compass size={14} aria-hidden="true" />
                <span>{isTamil ? "முதன்மை வேத ஜோதிட ஆலோசகர்" : "Lead Vedic Astrology Consultant"}</span>
              </div>

              <h3 className="specialties-profile-name">
                {isTamil ? siteConfig.astrologer.nameTa : siteConfig.astrologer.name}
              </h3>

              <div className="specialties-profile-title-tag">
                {isTamil ? siteConfig.astrologer.titleTa : siteConfig.astrologer.title} • {isTamil ? "கரூர், தமிழ்நாடு" : "Karur, Tamil Nadu"}
              </div>

              <p className="specialties-profile-bio">
                {isTamil
                  ? "28 ஆண்டுகளுக்கும் மேலான ஆழ்ந்த வேத ஜோதிட அனுபவம் கொண்ட ஜோதிடர் சுப்பிரமணி அவர்கள், திருமணப் பொருத்தம், தொழில் வளர்ச்சி மற்றும் குழந்தைகளின் கல்வி வழிகாட்டுதலில் தனித்துவமான கணிப்பு முறைகளையும் நடைமுறைப் பரிகாரங்களையும் வழங்கி வருகிறார். பிரபஞ்ச கிரக நிலைகளை பாகை (Degree) அளவில் நுணுக்கமாக ஆராய்ந்து, வாழ்வின் முக்கியமான தருணங்களில் தெளிவான வழிகாட்டலை அளிக்கிறார்."
                  : "With over 28 years of dedicated experience in traditional Vedic astrology, Astrologer Subramani provides deep clarity and practical guidance for marriage compatibility, business success, and educational choices. By meticulously examining planetary positions and degree-level alignments, he empowers individuals and families to take confident life decisions."}
              </p>

              <div className="specialties-meta-pills">
                <div className="specialties-meta-pill">
                  <Award size={15} className="text-gold" aria-hidden="true" />
                  <span>{isTamil ? "28+ வருட தீவிரப் பயிற்சி" : "28+ Years Dedicated Practice"}</span>
                </div>
                <div className="specialties-meta-pill">
                  <MapPin size={15} className="text-gold" aria-hidden="true" />
                  <span>{isTamil ? "கரூர், தமிழ்நாடு & உலகளாவிய சேவை" : "Karur, Tamil Nadu & Global Service"}</span>
                </div>
              </div>

              {onBookConsultation && (
                <div className="specialties-profile-action">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onBookConsultation}
                  >
                    <Calendar size={17} aria-hidden="true" />
                    <span>{isTamil ? "ஜோதிடரிடம் ஆலோசனை பெறுக" : "Book a Consultation"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Signature Specialty Cards Grid */}
        <div className="specialties-grid">
          {data.items?.map((item, idx) => (
            <div key={item.num || idx} className="specialty-card">
              <div className="specialty-card-header">
                <div className="specialty-badge-group">
                  <span className="specialty-number">{item.num}</span>
                  <span className="specialty-tag">{item.tag}</span>
                </div>
                <div className="specialty-icon-wrap" aria-hidden="true">
                  {specialtyIcons[idx % specialtyIcons.length]}
                </div>
              </div>

              <h3 className="specialty-card-title">{item.title}</h3>

              <div className="specialty-card-body">
                {item.text.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="specialty-card-text">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Direct & Online Delivery Modes Card */}
        <div className="specialties-modes-card">
          <div className="modes-watermark" aria-hidden="true">
            <BrandMotif size={220} />
          </div>

          <div className="modes-header">
            <h3 className="modes-title">{data.modesHeading}</h3>
            {data.modesSubtitle && (
              <p className="modes-sub">{data.modesSubtitle}</p>
            )}
          </div>

          <div className="modes-grid">
            {data.modes?.map((mode, mIdx) => (
              <div key={mIdx} className="mode-item-card">
                <div className="mode-item-top">
                  <div className="mode-icon-wrap" aria-hidden="true">
                    {modeIcons[mIdx % modeIcons.length]}
                  </div>
                  <span className="mode-badge">{mode.badge}</span>
                </div>
                <h4 className="mode-item-title">{mode.title}</h4>
                <p className="mode-item-text">{mode.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable CTA Strip */}
        <div className="specialties-cta-strip">
          <div className="specialties-cta-text">
            <span>{data.ctaText}</span>
          </div>
          {onBookConsultation && (
            <button
              type="button"
              className="btn btn-primary specialties-cta-btn"
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

export default AstrologerSpecialties;
