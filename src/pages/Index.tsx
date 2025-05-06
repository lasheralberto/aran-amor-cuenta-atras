
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import ChurchSection from "@/components/sections/ChurchSection";
import ReceptionSection from "@/components/sections/ReceptionSection";
import PartySection from "@/components/sections/PartySection";
import RSVPSection from "@/components/sections/RSVPSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Snowfall from "@/components/Snowfall";

const Index = () => {
  useEffect(() => {
    document.title = "Alberto & Mariona - 17 de enero 2026";
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <Snowfall />
      <main className="relative">
        <HeroSection />
        <ChurchSection />
        <ReceptionSection />
        <PartySection />
        <RSVPSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
