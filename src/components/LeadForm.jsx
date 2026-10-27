import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { submitConsultationLead } from "../services/leadService";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Lock, 
  Clock, 
  Sparkles,
  PhoneCall,
  MessageSquare
} from "lucide-react";
import { GoldDivider } from "./SubtleKolam";

export const LeadForm = ({ preselectedCategory, onOpenPolicy }) => {
  const { language, t, isTamil } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    language: language === "ta" ? "ta" : "en",
    category: "",
    contactMethod: "Either",
    concern: "",
    consent: false,
    hp_field: "", // Anti-spam honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [serverError, setServerError] = useState("");

  // Keep form language preference aligned when user switches website language
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      language: language === "ta" ? "ta" : "en",
    }));
  }, [language]);

  // Update category when preselected from service cards
  useEffect(() => {
    if (preselectedCategory) {
      setFormData((prev) => ({
        ...prev,
        category: preselectedCategory,
      }));
      // Clear category error if present
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  }, [preselectedCategory]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear inline error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = t.form.errors.nameRequired;
    } else if (trimmedName.length < 2) {
      newErrors.name = t.form.errors.nameShort;
    }

    // 2. Mobile Number (10 Indian digits)
    const rawMobile = formData.mobile.trim();
    if (!rawMobile) {
      newErrors.mobile = t.form.errors.mobileRequired;
    } else {
      const cleanDigits = rawMobile.replace(/[\s\-\(\)\+]/g, "");
      const isTenDigits = /^[6-9]\d{9}$/.test(
        cleanDigits.length === 12 && cleanDigits.startsWith("91")
          ? cleanDigits.slice(2)
          : cleanDigits.length === 11 && cleanDigits.startsWith("0")
          ? cleanDigits.slice(1)
          : cleanDigits
      );

      if (!isTenDigits) {
        newErrors.mobile = t.form.errors.mobileInvalid;
      }
    }

    // 3. Category
    if (!formData.category) {
      newErrors.category = t.form.errors.categoryRequired;
    }

    // 4. Consent
    if (!formData.consent) {
      newErrors.consent = t.form.errors.consentRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitConsultationLead(formData);
      if (result.success) {
        setSubmissionResult(result.lead);
      } else {
        setServerError(t.form.errors.serverError);
      }
    } catch (err) {
      console.error("Consultation submission error:", err);
      if (err.message === "VALIDATION_NAME") {
        setErrors((prev) => ({ ...prev, name: t.form.errors.nameRequired }));
      } else if (err.message === "VALIDATION_MOBILE") {
        setErrors((prev) => ({ ...prev, mobile: t.form.errors.mobileInvalid }));
      } else if (err.message === "VALIDATION_CATEGORY") {
        setErrors((prev) => ({ ...prev, category: t.form.errors.categoryRequired }));
      } else if (err.message === "VALIDATION_CONSENT") {
        setErrors((prev) => ({ ...prev, consent: t.form.errors.consentRequired }));
      } else {
        setServerError(err.message || t.form.errors.serverError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      name: "",
      mobile: "",
      language: language === "ta" ? "ta" : "en",
      category: "",
      contactMethod: "Either",
      concern: "",
      consent: false,
      hp_field: "",
    });
    setErrors({});
    setServerError("");
  };

  return (
    <section id="consultation" className="lead-form-section" aria-labelledby="form-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
           
            <span>{t.form.eyebrow}</span>
          </div>
          <h2 id="form-heading" className="section-title">
            {t.form.heading}
          </h2>
          <GoldDivider />
          <p className="section-subtitle">
            {t.form.supporting}
          </p>
        </div>

        <div className="form-layout">
          {/* Left Column: Reassurance & Consultation Guidance */}
          <div className="form-info-pane">
            <h3 className="form-info-title">
              {isTamil ? "ஆலோசனை அணுகுமுறை & ரகசியத்தன்மை" : "Consultation Care & Privacy"}
            </h3>
            <p className="form-info-desc">
              {isTamil
                ? "உங்கள் தனிப்பட்ட விவரங்கள் மற்றும் வாழ்க்கை சார்ந்த கவலைகள் மிகுந்த மரியாதையுடனும், முழுமையான ரகசியத்துடனும் கையாளப்படுகின்றன."
                : "Every conversation is conducted with dignity, respect, and utmost discretion. We do not ask for unnecessary private birth data on web forms."}
            </p>

            <ul className="form-guarantee-list">
              <li className="form-guarantee-item">
                <ShieldCheck size={20} className="form-guarantee-icon" aria-hidden="true" />
                <span>
                  <strong>{isTamil ? "100% ரகசியத்தன்மை" : "Confidential Discussion"}:</strong>{" "}
                  {isTamil ? "விவரங்கள் எந்த மூன்றாம் நபருக்கும் பகிரப்படாது." : "Your contact details are strictly kept private."}
                </span>
              </li>

              <li className="form-guarantee-item">
                <Clock size={20} className="form-guarantee-icon" aria-hidden="true" />
                <span>
                  <strong>{isTamil ? "விரைவான தொடர்பு" : "Timely Response"}:</strong>{" "}
                  {isTamil ? "உங்கள் வசதியான தொடர்பு முறையில் ஒருங்கிணைப்பாளர் பேசுவார்." : "We connect via your preferred contact method to discuss convenient timings."}
                </span>
              </li>

              <li className="form-guarantee-item">
                <Lock size={20} className="form-guarantee-icon" aria-hidden="true" />
                <span>
                  <strong>{isTamil ? "பாதுகாப்பான நடைமுறை" : "No Unnecessary Data"}:</strong>{" "}
                  {isTamil ? "தேவையான ஜாதக விவரங்கள் ஆலோசனையின் போது மட்டுமே கேட்கப்படும்." : "Specific horoscope charts can be reviewed directly during the consultation."}
                </span>
              </li>
            </ul>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                <PhoneCall size={14} style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                <span>{isTamil ? "நேரடி ஆலோசனை மற்றும் தொலைபேசி ஆலோசனை இரண்டும் சாத்தியம்." : "Direct in-person and remote consultations supported."}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Collection Form */}
          <div className="form-card">
            {submissionResult ? (
              <div className="form-success-box" role="status" aria-live="polite">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={32} aria-hidden="true" />
                </div>
                <h3 className="success-title">{t.form.successTitle}</h3>
                <p className="success-message">{t.form.successMessage}</p>

                <div
                  style={{
                    backgroundColor: "var(--color-bg-warm)",
                    border: "1px solid var(--color-border)",
                    padding: "1rem",
                    borderRadius: "4px",
                    textAlign: "left",
                    marginBottom: "1.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>{isTamil ? "விசாரணை எண் (Lead ID):" : "Enquiry Reference:"}</span>
                    <strong style={{ color: "var(--color-primary-dark)", letterSpacing: "0.05em" }}>{submissionResult.leadId}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>{isTamil ? "ஆலோசனை வகை:" : "Service Category:"}</span>
                    <span style={{ fontWeight: 600 }}>{submissionResult.consultationCategory}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>{isTamil ? "தொடர்பு முறை:" : "Preferred Contact:"}</span>
                    <span>{submissionResult.preferredContactMethod}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  <span>{t.form.submitAnother}</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="hp_field"
                  value={formData.hp_field}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hp-field"
                  aria-hidden="true"
                />

                {serverError && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--color-error-bg)",
                      color: "var(--color-error)",
                      borderRadius: "4px",
                      marginBottom: "1.25rem",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    role="alert"
                  >
                    <AlertCircle size={18} flexShrink={0} />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* 1. Full Name */}
                <div className="form-group">
                  <label htmlFor="form-name" className="form-label">
                    {t.form.labels.name}
                    <span className="required-star" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.form.placeholders.name}
                    className={`form-input ${errors.name ? "has-error" : ""}`}
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <div id="name-error" className="form-error-msg" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* 2. Mobile Number (India +91) */}
                <div className="form-group">
                  <label htmlFor="form-mobile" className="form-label">
                    {t.form.labels.mobile}
                    <span className="required-star" aria-hidden="true">*</span>
                  </label>
                  <div className="form-phone-wrapper">
                    <span className="form-phone-prefix">+91</span>
                    <input
                      id="form-mobile"
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder={t.form.placeholders.mobile}
                      maxLength={14}
                      className={`form-input ${errors.mobile ? "has-error" : ""}`}
                      aria-required="true"
                      aria-invalid={errors.mobile ? "true" : "false"}
                      aria-describedby={errors.mobile ? "mobile-error" : undefined}
                    />
                  </div>
                  {errors.mobile && (
                    <div id="mobile-error" className="form-error-msg" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      <span>{errors.mobile}</span>
                    </div>
                  )}
                </div>

                {/* 3. Preferred Language & 4. Consultation Category (Side by side on desktop) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {/* Preferred Language */}
                  <div className="form-group">
                    <label htmlFor="form-language" className="form-label">
                      {t.form.labels.language}
                    </label>
                    <select
                      id="form-language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="ta">{t.form.options.langTa}</option>
                      <option value="en">{t.form.options.langEn}</option>
                    </select>
                  </div>

                  {/* Consultation Category */}
                  <div className="form-group">
                    <label htmlFor="form-category" className="form-label">
                      {t.form.labels.category}
                      <span className="required-star" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="form-category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`form-select ${errors.category ? "has-error" : ""}`}
                      aria-required="true"
                      aria-invalid={errors.category ? "true" : "false"}
                      aria-describedby={errors.category ? "category-error" : undefined}
                    >
                      <option value="">-- {t.form.placeholders.selectCategory} --</option>
                      <option value="Marriage Astrology">{t.form.options.catMarriage}</option>
                      <option value="Education Astrology">{t.form.options.catEducation}</option>
                      <option value="Business Astrology">{t.form.options.catBusiness}</option>
                    </select>
                    {errors.category && (
                      <div id="category-error" className="form-error-msg" role="alert">
                        <AlertCircle size={14} aria-hidden="true" />
                        <span>{errors.category}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Preferred Contact Method */}
                <div className="form-group">
                  <label className="form-label">
                    {t.form.labels.contactMethod}
                  </label>
                  <div className="radio-pill-group">
                    {[
                      { val: "Phone Call", label: t.form.options.methodPhone },
                      { val: "WhatsApp", label: t.form.options.methodWhatsapp },
                      { val: "Either", label: t.form.options.methodEither },
                    ].map((m) => (
                      <label
                        key={m.val}
                        className={`radio-pill-label ${formData.contactMethod === m.val ? "active" : ""}`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={m.val}
                          checked={formData.contactMethod === m.val}
                          onChange={handleChange}
                        />
                        <span>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 6. Brief Description of Concern (Optional multiline textarea) */}
                <div className="form-group">
                  <label htmlFor="form-concern" className="form-label">
                    {t.form.labels.concern}
                  </label>
                  <textarea
                    id="form-concern"
                    name="concern"
                    rows={3}
                    value={formData.concern}
                    onChange={handleChange}
                    placeholder={t.form.placeholders.concern}
                    className="form-textarea"
                  />
                </div>

                {/* 7. Consent Checkbox */}
                <div className="consent-wrapper">
                  <input
                    id="form-consent"
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="consent-checkbox"
                    aria-required="true"
                    aria-invalid={errors.consent ? "true" : "false"}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                  />
                  <label htmlFor="form-consent" className="consent-text">
                    {t.form.labels.consent}{" "}
                    <button
                      type="button"
                      onClick={() => onOpenPolicy("privacy")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-gold-hover)",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        padding: 0,
                      }}
                    >
                      {isTamil ? "தனியுரிமைக் கொள்கை" : "Privacy Policy"}
                    </button>
                  </label>
                </div>
                {errors.consent && (
                  <div
                    id="consent-error"
                    className="form-error-msg"
                    style={{ marginTop: "-1rem", marginBottom: "1.25rem" }}
                    role="alert"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>{errors.consent}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: "100%", fontSize: "1rem", padding: "1rem" }}
                >
                  {isSubmitting ? (
                    <span>{t.form.submitting}</span>
                  ) : (
                    <>
                      <span>{t.form.submit}</span>
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    marginTop: "1rem",
                  }}
                >
                  <Lock size={12} aria-hidden="true" />
                  <span>{t.form.trustBadge}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
