import React from "react";

// Components
import Hero from "../components/main/hero/Hero";
import Summary from "../components/main/summary/Summary";
import Features from "../components/main/features/Features";
import FAQ from "../components/main/faq/FAQ";
import Footer from "../components/main/footer/Footer";

function MainPage() {
  return (
    <div className="MainPage">
      <Hero />
      <Summary />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}

export default MainPage;
