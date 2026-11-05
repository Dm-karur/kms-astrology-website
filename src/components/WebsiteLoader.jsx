import React, { useEffect } from "react";

/**
 * WebsiteLoader - Coordinates the KMS Sacred Celestial Loading Experience
 * Controls the preloader lifecycle and provides smooth dismissal.
 */
export const WebsiteLoader = () => {
  useEffect(() => {
    // Minimum display duration (ms) so visitors can appreciate the celestial animation
    const minDuration = 800;
    const startTime = (typeof window !== "undefined" && window.__kmsLoaderStartTime) || Date.now();
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && typeof window.__kmsDismissPreloader === "function") {
        window.__kmsDismissPreloader();
      } else {
        const preloader = document.getElementById("kms-preloader");
        if (preloader) {
          preloader.classList.add("kms-loaded");
          setTimeout(() => {
            if (preloader && preloader.parentNode) {
              preloader.parentNode.removeChild(preloader);
            }
          }, 650);
        }
      }
    }, remaining);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default WebsiteLoader;
