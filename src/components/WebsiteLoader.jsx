import React, { useEffect } from "react";

/**
 * WebsiteLoader - Coordinates the KMS Sacred Celestial Loading Experience
 * Controls the preloader lifecycle and provides a fallback component if rendered dynamically.
 */
export const WebsiteLoader = () => {
  useEffect(() => {
    const preloader = document.getElementById("kms-preloader");
    if (!preloader) return;

    // Minimum display duration (ms) so visitors can appreciate the celestial animation
    const minDuration = 850;
    const startTime = window.__kmsLoaderStartTime || Date.now();
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    const timer = setTimeout(() => {
      preloader.classList.add("kms-loaded");
      // Clean up from DOM once transition completes
      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 650);
    }, remaining);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default WebsiteLoader;
