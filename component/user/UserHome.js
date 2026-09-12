"use client";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PropertiesSection from "./PropertiesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import CtaBanner from "./CtaBanner";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import BlogSection from "./BlogSection";
import Footer from "./Footer";

export default function UserHome() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#3f5f50] selection:text-white scroll-smooth font-sans antialiased">
      {/* 1. Straight Full-Width Navigation Header */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* 2. Hero Section: "LUXURY HOME" with Counter Badges & Continuous Extended Villa Showcase */}
        <HeroSection />

        {/* 3. About Section: Insights, Founder Quote, & 4 Value Pillars */}
        <AboutSection />

        {/* 4. Services Section: 01 to 04 Numbered Solution Cards */}
        <ServicesSection />

        {/* 5. Properties Showcase: Dynamic Properties Connected to Backend */}
        <PropertiesSection />

        {/* 6. Why Choose Us: Skill Capability Bars & Quality Assurance */}
        {/* <WhyChooseUsSection /> */}
        
        {/* 8. Testimonials: Client Feedback with 5 Stars & Avatars */}
        <TestimonialsSection />

        {/* 7. Call To Action Banner: Explore Properties */}
        <CtaBanner />


        {/* 9. Contact Section: Contact Cards & Inquiry Form (POST /api/inquiry) */}
        <ContactSection />

        {/* 10. Latest Insights: Real Estate & Construction Blog Cards */}
        {/* <BlogSection /> */}
      </main>

      {/* 11. Footer: Newsletter Subscribe & Useful Links */}
      <Footer />
    </div>
  );
}
