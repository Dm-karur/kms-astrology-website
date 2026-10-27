import React from "react";

/**
 * Sacred Traditional Motifs & Accents
 * Renders understated sacred geometry / kolam / mandala accents in antique gold (#B08A50).
 */
export const BrandMotif = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
    <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    {/* Classical 8-point star / Ashtalakshmi geometry */}
    <path
      d="M20 7 L23 16 L32 20 L23 24 L20 33 L17 24 L8 20 L17 16 Z"
      fill="currentColor"
      fillOpacity="0.85"
    />
    <circle cx="20" cy="20" r="2.5" fill="#FCFAF6" />
  </svg>
);

export const GoldDivider = () => (
  <div className="gold-divider" aria-hidden="true">
    <div className="gold-divider-diamond" />
  </div>
);
