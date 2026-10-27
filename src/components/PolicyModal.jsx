import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, Shield } from "lucide-react";

export const PolicyModal = ({ policyType, onClose }) => {
  const { t } = useLanguage();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!policyType) return null;

  const policyData = t.policies[policyType];
  if (!policyData) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div className="modal-card" ref={modalRef}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Shield size={20} style={{ color: "var(--color-gold)" }} aria-hidden="true" />
            <h2 id="policy-modal-title" className="modal-title">
              {policyData.title}
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ fontSize: "0.8125rem", color: "var(--color-gold)", marginBottom: "1rem", fontWeight: 600 }}>
            {policyData.lastUpdated}
          </div>
          {policyData.content.map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: "1rem" }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
