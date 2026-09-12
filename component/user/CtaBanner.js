"use client";

import Image from "next/image";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="relative py-20 sm:py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background Architectural Skyline */}
      <Image
        src="/images/realtyflow/skyline.jpg"
        alt="Urban Skyline"
        fill
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-[#1a2f26]/90 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Animated Marquee/Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-widest uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>EXPLORE PROPERTIES • EXPERT CONSULTING</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Find Your Perfect Property Today. Contact Us For Expert Real Estate Guidance.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed"
        >
          Speak with our senior brokers for private viewings, tailored investment portfolios, and comprehensive legal deed support.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="bg-[#3f5f50] hover:bg-[#324f42] text-white px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-xl hover:shadow-emerald-900/30 flex items-center gap-2 active:scale-95"
          >
            <span>Contact Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="tel:+5219841541550"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+52 1 984 154 1550</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
