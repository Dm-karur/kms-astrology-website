import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteConfig } from "../config/siteConfig";
import {
  TrendingUp,
  HeartHandshake,
  GraduationCap,
  Home,
  PhoneCall,
  ArrowRight,
  Award,
  MapPin,
  Calendar,
  Compass,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Trophy,
  Sparkles,
} from "lucide-react";

// Clean inline YouTube brand icon component
const YouTubeIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
import { GoldDivider, BrandMotif } from "./SubtleKolam";

export const AstrologerSpecialties = ({ onBookConsultation, onSelectService }) => {
  const { t, isTamil } = useLanguage();
  const data = t?.specialties;

  // Manual scroll state for IPL Predictions carousel
  const iplScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    const el = iplScrollRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = iplScrollRef.current;
    if (el) {
      checkScrollState();
      el.addEventListener("scroll", checkScrollState, { passive: true });
      window.addEventListener("resize", checkScrollState);
      return () => {
        el.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, []);

  const handleScroll = (direction) => {
    const el = iplScrollRef.current;
    if (el) {
      const scrollStep = 260; // 1 card width + gap
      el.scrollBy({
        left: direction === "right" ? scrollStep : -scrollStep,
        behavior: "smooth",
      });
    }
  };

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
      {/* Anchor helper for 'about' and 'services' navigation */}
      <div id="about" style={{ position: "relative", top: "-90px" }} />
      <div id="services" style={{ position: "relative", top: "-90px" }} />

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
                  alt={isTamil ? "ஜோதிடர் சுப்ரமணி - வேத ஜோதிட ஆலோசகர்" : "Astrologer Subramani - Vedic Astrology Consultant"}
                  width="420"
                  height="560"
                  loading="lazy"
                  className="specialties-photo"
                />
                <div className="specialties-image-badge">

                  <span>{isTamil ? "28+ ஆண்டுகள் நீண்ட அனுபவம்" : "28+ Years  of Dedication"}</span>
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
                {isTamil ? siteConfig.astrologer.titleTa : siteConfig.astrologer.title} • {isTamil ? " தமிழ்நாடு" : " Tamil Nadu"}
              </div>

              <p className="specialties-profile-bio">
                {isTamil
                  ? "28 ஆண்டுகளுக்கும் மேலான ஆழ்ந்த வேத ஜோதிட அனுபவம் கொண்ட ஜோதிடர் சுப்ரமணி அவர்கள், திருமணப் பொருத்தம், தொழில் வளர்ச்சி மற்றும் குழந்தைகளின் கல்வி வழிகாட்டுதலில் தனித்துவமான கணிப்பு முறைகளையும் நடைமுறைப் பரிகாரங்களையும் வழங்கி வருகிறார். பிரபஞ்ச கிரக நிலைகளை பாகை (Degree) அளவில் நுணுக்கமாக ஆராய்ந்து, வாழ்வின் முக்கியமான தருணங்களில் தெளிவான வழிகாட்டலை அளிக்கிறார்."
                  : "With over 28 years of dedicated experience in traditional Vedic astrology, Astrologer Subramani provides deep clarity and practical guidance for marriage compatibility, business success, and educational choices. By meticulously examining planetary positions and degree-level alignments, he empowers individuals and families to take confident life decisions."}
              </p>

              <div className="specialties-meta-pills">
                <div className="specialties-meta-pill">
                  <Award size={15} className="text-gold" aria-hidden="true" />
                  <span>{isTamil ? "28+ வருட தீவிரப் பயிற்சி" : "28+ Years of Dedicated Practice"}</span>
                </div>
                <div className="specialties-meta-pill">
                  <MapPin size={15} className="text-gold" aria-hidden="true" />
                  <span>{isTamil ? "தமிழ்நாடு" : " Tamil Nadu"}</span>
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

        {/* IPL Cricket Predictions Showcase - Manual Horizontal Scroll */}
        {siteConfig.iplPredictions && siteConfig.iplPredictions.length > 0 && (
          <div className="ipl-showcase-section" aria-labelledby="ipl-showcase-heading">
            <div className="ipl-showcase-header">
              <div className="ipl-showcase-title-group">
                <div className="ipl-showcase-eyebrow">
                  <Sparkles size={14} className="text-gold" aria-hidden="true" />
                  <span>
                    {isTamil
                      ? "ஜோதிடக் கணிப்புகள் & ஆலோசனைகள் • சிறப்பு வீடியோக்கள்"
                      : "Astrology Predictions & Guidance Videos"}
                  </span>
                </div>
                <h3 id="ipl-showcase-heading" className="ipl-showcase-title">
                  {isTamil
                    ? "ஜோதிடர் சுப்ரமணியின் நேரடி வீடியோ பதிவுகள்"
                    : "Video Predictions & Consultations by Astrologer Subramani"}
                </h3>
                <p className="ipl-showcase-subtitle">
                  {isTamil
                    ? "ஐபிஎல் கிரிக்கெட் போட்டிகள், உலகக் கோப்பை மற்றும் வேலைவாய்ப்பு, தொழில் சார்ந்த துல்லியமான வேத ஜோதிட வழிகாட்டல் வீடியோக்கள்."
                    : "Accurate astrological analysis for sports matches, career choices, job opportunities, and personal decisions."}
                </p>
              </div>

              {/* Manual Scroll Controls (Right / Left Arrows) */}
              <div className="ipl-scroll-controls" aria-label="IPL Prediction Navigation">
                <span className="ipl-scroll-hint">
                  {isTamil ? "உருட்டிப் பார்க்கவும்" : "Scroll to browse"}
                </span>
                <div className="ipl-scroll-btn-group">
                  <button
                    type="button"
                    className="ipl-scroll-btn"
                    onClick={() => handleScroll("left")}
                    disabled={!canScrollLeft}
                    aria-label={isTamil ? "முந்தைய கணிப்புகள்" : "Previous predictions"}
                    title={isTamil ? "முந்தைய கணிப்புகள்" : "Scroll left"}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="ipl-scroll-btn"
                    onClick={() => handleScroll("right")}
                    disabled={!canScrollRight}
                    aria-label={isTamil ? "அடுத்த கணிப்புகள்" : "Next predictions"}
                    title={isTamil ? "அடுத்த கணிப்புகள்" : "Scroll right"}
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Scrollable Track (Not infinite, manual scroll) */}
            <div
              className="ipl-scroll-track"
              ref={iplScrollRef}
              role="region"
              aria-label={isTamil ? "ஐபிஎல் கணிப்பு வீடியோக்கள் பட்டியல்" : "IPL Prediction Videos Carousel"}
              tabIndex={0}
            >
              {siteConfig.iplPredictions.map((item, pIdx) => {
                const title = isTamil ? (item.titleTa || item.title) : item.title;
                const team = isTamil ? (item.teamTa || item.team) : item.team;
                const tag = isTamil ? (item.tagTa || item.tag) : item.tag;

                if (item.isChannelCard) {
                  return (
                    <a
                      key={item.id || pIdx}
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ipl-card ipl-channel-card"
                      aria-label={`${title} - ${team}`}
                    >
                      <div className="ipl-channel-card-inner">
                        <div className="ipl-youtube-badge-large">
                          <YouTubeIcon size={40} />
                        </div>
                        <span className="ipl-card-tag">{tag}</span>
                        <h4 className="ipl-card-title">{title}</h4>
                        <p className="ipl-card-team">{team}</p>
                        <span className="ipl-card-link-pill">
                          <span>{isTamil ? "யூடியூபில் காணுங்கள்" : "Watch on YouTube"}</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </a>
                  );
                }

                return (
                  <a
                    key={item.id || pIdx}
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ipl-card"
                    aria-label={`${title} - ${isTamil ? "யூடியூப் ஷார்ட்ஸில் பார்க்க கிளிக் செய்யவும்" : "Click to watch on YouTube Shorts"}`}
                  >
                    <div className="ipl-card-image-box">
                      <img
                        src={item.image}
                        alt={title}
                        width="405"
                        height="720"
                        loading="lazy"
                        className="ipl-card-img"
                      />
                      <div className="ipl-card-overlay" />
                    </div>

                    {/* Top Tag & YouTube Shorts Badge */}
                    <div className="ipl-card-top-badge">
                      <div className="ipl-youtube-pill">
                        <YouTubeIcon size={16} />
                        <span>Shorts</span>
                      </div>
                      {tag && <span className="ipl-card-match-pill">{tag}</span>}
                    </div>

                    {/* Center Floating Play Button */}
                    <div className="ipl-play-btn-wrap" aria-hidden="true">
                      <div className="ipl-play-btn">
                        <Play size={20} fill="#FFFFFF" color="#FFFFFF" />
                      </div>
                    </div>

                    {/* Bottom Content Pill & Title */}
                    <div className="ipl-card-bottom">
                      <h4 className="ipl-card-title">{title}</h4>
                      <p className="ipl-card-team">{team}</p>
                      <div className="ipl-card-link-pill">
                        <span>{isTamil ? "வீடியோ பார்க்க" : "Watch Video"}</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* 3 Signature Specialty Cards Grid */}
        <div className="specialties-grid">
          {data.items?.map((item, idx) => {
            const cardMeta = [
              {
                id: "business",
                categoryKey: "Business Astrology",
                image: "/images/Business-image.webp",
                alt: t.services?.business?.alt || item.title,
                price: t.services?.business?.price || (isTamil ? "கட்டணம் - ₹10,000" : "Pricing - ₹10,000"),
                cta: t.services?.business?.cta || (isTamil ? "தொழில் ஆலோசனை கோருக" : "Enquire About Business"),
              },
              {
                id: "marriage",
                categoryKey: "Marriage Astrology",
                image: "/images/marrige-image.webp",
                alt: t.services?.marriage?.alt || item.title,
                price: t.services?.marriage?.price || (isTamil ? "கட்டணம் - ₹10,000" : "Pricing - ₹10,000"),
                cta: t.services?.marriage?.cta || (isTamil ? "திருமண ஆலோசனை கோருக" : "Enquire About Marriage"),
              },
              {
                id: "education",
                categoryKey: "Education Astrology",
                image: "/images/Education%20Astrology.webp",
                alt: t.services?.education?.alt || item.title,
                price: t.services?.education?.price || (isTamil ? "கட்டணம் - ₹5,000" : "Pricing - ₹5,000"),
                cta: t.services?.education?.cta || (isTamil ? "கல்வி ஆலோசனை கோருக" : "Enquire About Education"),
              },
            ][idx % 3];

            return (
              <div key={item.num || idx} className={`specialty-card specialty-card-${cardMeta.id}`}>
                <div className="specialty-card-image-box">
                  <img
                    src={cardMeta.image}
                    alt={cardMeta.alt}
                    width="600"
                    height="450"
                    loading="lazy"
                    className={`specialty-card-img specialty-img-${cardMeta.id}`}
                  />
                </div>

                <div className="specialty-card-inner">
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

                  <div className="specialty-card-footer">
                    <div className="specialty-card-pricing">
                      <span>{cardMeta.price}</span>
                    </div>
                    <button
                      type="button"
                      className="specialty-card-cta"
                      onClick={() => {
                        if (onSelectService) {
                          onSelectService(cardMeta.categoryKey);
                        } else if (onBookConsultation) {
                          onBookConsultation();
                        }
                      }}
                      aria-label={`${cardMeta.cta} - ${item.title}`}
                    >
                      <span>{cardMeta.cta}</span>
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
