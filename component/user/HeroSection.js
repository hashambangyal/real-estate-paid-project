"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-slate-950 pt-[72px]">
      {/* 
        Continuous Extended House Background (Images 2, 3, 4)
        Spans the entire hero from top to bottom
      */}
      <div className="relative w-full min-h-[140vh] lg:min-h-[160vh] flex flex-col justify-between">
        
        {/* The House Picture */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/realtyflow/hero-villa.jpg"
            alt="Modern Luxury House"
            fill
            priority
            className="object-cover object-center transform scale-100"
            sizes="100vw"
          />
          {/* Subtle natural vignette overlays to guarantee high contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-black/25 to-slate-950/80 pointer-events-none" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TOP SEGMENT (Image 2): Giant Semi-Transparent "LUXURY HOME"   */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 w-full pt-12 sm:pt-16 lg:pt-20 text-center select-none pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center leading-none"
          >
            <span className="text-white/30 text-[64px] sm:text-[110px] md:text-[150px] lg:text-[180px] xl:text-[210px] font-black tracking-wider uppercase font-sans drop-shadow-sm">
              LUXURY
            </span>
            <span className="text-white/25 text-[64px] sm:text-[110px] md:text-[150px] lg:text-[180px] xl:text-[210px] font-black tracking-wider uppercase font-sans -mt-4 sm:-mt-10 lg:-mt-16 drop-shadow-sm">
              HOME
            </span>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MIDDLE SEGMENT (Image 3): Floating 250+ Card (Left aligned)   */}
        {/* NOTE: No luxury/commercial/apartment pills per user instruction */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 my-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-[290px] sm:max-w-[320px] bg-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-slate-100/90"
          >
            {/* Top row: 250+ & Circular Green Arrow Button */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                250+
              </span>
              <a
                href="#properties"
                className="w-10 h-10 rounded-full bg-[#3f5f50] hover:bg-[#324f42] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm"
                aria-label="View sold properties"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-snug mb-5">
              Properties Successfully Sold Across Prime Locations
            </p>

            {/* 3 Overlapping Avatar Circles (Matching Image 3) */}
            <div className="flex items-center -space-x-2.5 pt-1">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                <Image
                  src="/images/realtyflow/team-01.png"
                  alt="Agent"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                <Image
                  src="/images/realtyflow/team-03.png"
                  alt="Agent"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100">
                <Image
                  src="/images/realtyflow/team-04.png"
                  alt="Agent"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM SEGMENT (Image 4): Headline + 2 Counter Cards           */}
        {/* House picture ends right here                                 */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-20 lg:pb-24 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            
            {/* Left Column: Big Bold Headline on House Picture */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                Creating Modern <br />
                Living Spaces That <br />
                Inspire &amp; Endure
              </h2>
            </motion.div>

            {/* Right Column: 2 Stat Cards (Properties Sold 500+ & Client Satisfaction 98%) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6"
            >
              {/* Card 1: Properties Sold 500+ */}
              <div className="bg-white/95 backdrop-blur-md p-5 sm:p-7 rounded-3xl shadow-xl border border-white/40 flex flex-col justify-center">
                <span className="text-xs sm:text-sm text-slate-600 font-medium">
                  Properties Sold
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3f5f50] mt-1 sm:mt-2 tracking-tight">
                  500+
                </span>
              </div>

              {/* Card 2: Client Satisfaction 98% */}
              <div className="bg-white/95 backdrop-blur-md p-5 sm:p-7 rounded-3xl shadow-xl border border-white/40 flex flex-col justify-center">
                <span className="text-xs sm:text-sm text-slate-600 font-medium">
                  Client Satisfaction
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3f5f50] mt-1 sm:mt-2 tracking-tight">
                  98%
                </span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
      {/* House picture ends cleanly here */}
    </section>
  );
}
