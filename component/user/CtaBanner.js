"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden text-white my-0">
      {/* 
        Compact Letterbox Height:
        Ensures when centered on screen, parts of adjacent sections remain visible
      */}
      <div className="relative w-full py-16 sm:py-20 lg:py-24 min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] flex items-center justify-center">
        
        {/* Background Seaside Terrace with Ocean & Sunset */}
        <Image
          src="/images/realtyflow/cta-beach-deck.jpg"
          alt="Luxury Seaside Terrace"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Atmospheric Tint Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-900/35 to-slate-950/55 pointer-events-none" />

        {/* Left Side: Double Plus Icon (Matching Reference Image) */}
        <div className="absolute left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 hidden md:flex items-start text-white/90 select-none pointer-events-none">
          <span className="text-4xl lg:text-5xl font-extrabold leading-none drop-shadow-md">+</span>
          <span className="text-2xl lg:text-3xl font-bold leading-none -mt-2 -ml-0.5 drop-shadow-md">+</span>
        </div>

        {/* Center Content: Headline & Warm Amber 'Contact us' Button */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Line 1: Light text */}
            <p className="text-xl sm:text-2xl lg:text-[28px] font-light text-white tracking-wide drop-shadow-md">
              Let&apos;s talk to find out
            </p>

            {/* Line 2: Bold Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight leading-tight mt-1 sm:mt-1.5 drop-shadow-lg">
              that property is just right for you.
            </h2>

            {/* Action Button: White pill with warm amber text matching reference */}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 sm:mt-7 bg-white text-[#d97706] hover:text-[#b45309] px-8 sm:px-9 py-3 rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:bg-slate-50 transition-all cursor-pointer inline-block"
            >
              Contact us
            </motion.a>
          </motion.div>
        </div>

        {/* Right Side: 4 Vertical White Dots (Matching Reference Image) */}
        <div className="absolute right-6 sm:right-12 lg:right-20 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 select-none pointer-events-none">
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-md" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-md" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-md" />
        </div>

      </div>
    </section>
  );
}
