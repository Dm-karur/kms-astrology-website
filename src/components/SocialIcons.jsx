import React from "react";
import { siteConfig } from "../config/siteConfig";

/**
 * YouTube SVG Icon
 */
export const YoutubeIcon = ({ size = 20, className = "" }) => (
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

/**
 * Instagram SVG Icon
 */
export const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/**
 * WhatsApp SVG Icon
 */
export const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.508-.678-.517l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.379.197 1.9.119.58-.088 1.78-.728 2.03-1.431.25-.703.25-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.516 2 2.028 6.486 2.028 12c0 1.984.58 3.834 1.583 5.397L2 22l4.747-1.558C8.267 21.282 10.103 22 12.04 22c5.522 0 10.012-4.486 10.012-10S17.562 2 12.04 2zm0 18.232c-1.758 0-3.39-.533-4.757-1.449l-.341-.228-2.82.925.938-2.748-.249-.364a8.214 8.214 0 0 1-1.284-4.368c0-4.549 3.702-8.251 8.252-8.251 4.55 0 8.251 3.702 8.251 8.251 0 4.55-3.701 8.232-8.251 8.232z" />
  </svg>
);

/**
 * Reusable SocialLinks group component for YouTube, Instagram, and WhatsApp
 */
export const SocialLinks = ({ className = "", iconSize = 18 }) => {
  const rawWhatsApp = (siteConfig.contact?.whatsapp || "").replace(/\D/g, "");
  const whatsAppUrl =
    rawWhatsApp.length >= 10
      ? `https://wa.me/${rawWhatsApp}`
      : (siteConfig.socials?.whatsapp || "https://wa.me/?text=Hello%20KMS%20Astrology");

  return (
    <div className={`footer-social-links ${className}`} aria-label="Social media profiles">
      <a
        href={siteConfig.socials?.youtube || "https://www.youtube.com"}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-btn social-youtube"
        aria-label="YouTube"
        title="YouTube"
      >
        <YoutubeIcon size={iconSize} />
      </a>
      <a
        href={siteConfig.socials?.instagram || "https://www.instagram.com"}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-btn social-instagram"
        aria-label="Instagram"
        title="Instagram"
      >
        <InstagramIcon size={iconSize} />
      </a>
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social-btn social-whatsapp"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppIcon size={iconSize} />
      </a>
    </div>
  );
};

export default SocialLinks;
