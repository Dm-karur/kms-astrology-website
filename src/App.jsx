import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AstrologerIntro } from "./components/AstrologerIntro";
import { ServicesSection } from "./components/ServicesSection";
import { WhyAstrology } from "./components/WhyAstrology";
import { DedicatedCTA } from "./components/DedicatedCTA";
import { LeadForm } from "./components/LeadForm";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { PolicyModal } from "./components/PolicyModal";
import { NotFoundPage } from "./components/NotFoundPage";
import { AdminPortal } from "./components/AdminPortal";
import { WhatIsAstrology } from "./components/WhatIsAstrology";
import { PurposeOfAstrology } from "./components/PurposeOfAstrology";
import { UniqueJourney } from "./components/UniqueJourney";

/**
 * Determines current client-side route
 * Returns: 'home' | 'admin' | 'not-found'
 */
function getRoute() {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
  
  if (path === "/admin" || path.startsWith("/admin/")) {
    return "admin";
  }
  
  if (path === "" || path === "/" || path === "/index.html") {
    return "home";
  }
  
  return "not-found";
}

export function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activePolicy, setActivePolicy] = useState(null); // 'privacy' | 'terms' | 'disclaimer' | null
  const [route, setRoute] = useState(getRoute);

  // Listen to browser navigation changes
  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getRoute());
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Smoothly navigates to the Home page and optional anchor section
  const handleNavigateHome = (targetHash = "") => {
    const destination = "/" + (targetHash ? targetHash : "");
    window.history.pushState({}, "", destination);
    setRoute("home");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (targetHash) {
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  // Scrolls smoothly to consultation section
  const handleScrollToConsultation = () => {
    const el = document.getElementById("consultation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Preselects category from service card and scrolls to form
  const handleSelectService = (categoryName) => {
    setSelectedCategory(categoryName);
    handleScrollToConsultation();
  };

  const handleSelectServiceFrom404 = (categoryKey) => {
    handleNavigateHome("#consultation");
    setSelectedCategory(categoryKey);
  };

  // 1. Dedicated Admin Portal URL (/admin) - 100% Tamil, PWA mobile installable
  if (route === "admin") {
    return <AdminPortal />;
  }

  // 2. 404 Error Page for mistyped URLs
  if (route === "not-found") {
    return (
      <NotFoundPage
        onNavigateHome={() => handleNavigateHome()}
        onSelectService={handleSelectServiceFrom404}
      />
    );
  }

  // 3. Public Website (Home) - Note: Strictly NO admin icons or links visible to the public
  return (
    <>
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <Navbar onOpenConsultation={handleScrollToConsultation} />

      {/* Main Content Landmark */}
      <main id="main-content">
        <HeroSection onBookConsultation={handleScrollToConsultation} />
        
        <AstrologerIntro onBookConsultation={handleScrollToConsultation} />
        
        <ServicesSection onSelectService={handleSelectService} />
        
        <WhatIsAstrology onBookConsultation={handleScrollToConsultation} />
        
        <PurposeOfAstrology onBookConsultation={handleScrollToConsultation} />
        
        <WhyAstrology />
        
        <UniqueJourney onBookConsultation={handleScrollToConsultation} />
        
        <DedicatedCTA onBookConsultation={handleScrollToConsultation} />
        
        <LeadForm
          preselectedCategory={selectedCategory}
          onOpenPolicy={(policy) => setActivePolicy(policy)}
        />
        
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onSelectService={handleSelectService}
      />

      {/* Policy Modals (Privacy, Terms, Disclaimer) */}
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
}

export default App;
