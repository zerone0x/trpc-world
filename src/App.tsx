import React from "react";
import { ThreeJSBackground } from "./components/threejs-background";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { FAQSection } from "./components/faq-section";
import { Footer } from "./components/footer";

function App() {
  return (
    <main className="min-h-screen bg-black relative">
      <ThreeJSBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}

export default App;
