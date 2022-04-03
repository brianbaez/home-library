import React from "react";

import Hero from "../components/Hero";
import Summary from "../components/Summary";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <div className="Main">
      <Hero />
      <Summary />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}

export default MainPage;
