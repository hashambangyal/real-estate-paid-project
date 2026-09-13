"use client";

import Image from "next/image";
import { Home, HandCoins, TrendingUp, Building2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Left Badge & Headline, Right Paragraph (NOT Centered) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Explore Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Experience Trusted <br className="hidden sm:inline" />
              Real Solutions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 lg:pl-4"
          >
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Comprehensive real estate and asset advisory crafted to protect your capital and maximize long-term equity growth across prime residential, coastal, and commercial spaces.
            </p>
          </motion.div>
        </div>

        {/* 
          4 Service Cards Matching Uploaded Reference (media_1789227553241.png)
          Card 1 (Black): Buying Assistance with Villa image & Home icon
          Card 2 (Sage Green): Selling Services with HandCoins icon & 02
          Card 3 (Black): Investment Consulting with Skyline image & TrendingUp icon
          Card 4 (Sage Green): Commercial Solutions with Building2 icon & 04
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* CARD 1: Black Card - Property Buying Assistance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -6 }}
            className="bg-[#0f1117] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between min-h-[460px] shadow-lg border border-slate-800/90 transition-all duration-300 group"
          >
            <div>
              {/* Top: Agent Showing House Image */}
              <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-900 mb-5">
                <Image
                  src="/images/realtyflow/service-buying.jpg"
                  alt="Property Buying Assistance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Icon Badge */}
              <div className="w-11 h-11 rounded-2xl bg-[#506e61]/25 border border-[#506e61]/40 text-[#a5c2b4] flex items-center justify-center mb-4 shadow-sm">
                <Home className="w-5 h-5" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Property Buying Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 leading-relaxed">
                We guide you through every step of the home-buying journey, from identifying the right property to negotiating the best price and ensuring clean title deeds.
              </p>
            </div>

            {/* Bottom Arrow ↗ */}
            <div className="pt-6">
              <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.div>

          {/* CARD 2: Sage Green Card - Property Selling Services */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
className="bg-[#506e61] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between h-[390px] self-center shadow-lg transition-all duration-300 text-white group"          >
            <div>
              {/* Top Row: Icon Badge & Big 02 */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 text-white flex items-center justify-center shadow-sm">
                  <HandCoins className="w-6 h-6" />
                </div>
                <span className="text-4xl sm:text-5xl font-extrabold text-white/30 font-sans tracking-tight select-none">
                  02
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Property Selling Services
              </h3>
              <p className="text-xs sm:text-sm text-white/85 font-light mt-3 leading-relaxed">
                Selling a property requires the right pricing strategy and strong market exposure. We help you position your property competitively to close top dollar.
              </p>
            </div>

            {/* Bottom Arrow ↗ */}
            <div className="pt-6">
              <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.div>

          {/* CARD 3: Black Card - Real Estate Investment Consulting */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="bg-[#0f1117] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between min-h-[460px] shadow-lg border border-slate-800/90 transition-all duration-300 group"
          >
            <div>
              {/* Top: Waterfront Skyline Image */}
              <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-900 mb-5">
                <Image
                  src="/images/realtyflow/service-investment.jpg"
                  alt="Real Estate Investment Consulting"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Icon Badge */}
              <div className="w-11 h-11 rounded-2xl bg-[#506e61]/25 border border-[#506e61]/40 text-[#a5c2b4] flex items-center justify-center mb-4 shadow-sm">
                <TrendingUp className="w-5 h-5" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Real Estate Investment Consulting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 leading-relaxed">
                Real estate is one of the most powerful wealth-building tools when guided correctly. We provide strategic investment advice based on current market trends and yields.
              </p>
            </div>

            {/* Bottom Arrow ↗ */}
            <div className="pt-6">
              <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.div>

          {/* CARD 4: Sage Green Card - Commercial Property Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
className="bg-[#506e61] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between h-[390px] self-center shadow-lg transition-all duration-300 text-white group"          >
            <div>
              {/* Top Row: Icon Badge & Big 04 */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 text-white flex items-center justify-center shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-4xl sm:text-5xl font-extrabold text-white/30 font-sans tracking-tight select-none">
                  04
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Commercial Property Solutions
              </h3>
              <p className="text-xs sm:text-sm text-white/85 font-light mt-3 leading-relaxed">
                We offer premium office spaces, retail outlets, and commercial developments in strategic business locations primed for rapid enterprise expansion.
              </p>
            </div>

            {/* Bottom Arrow ↗ */}
            <div className="pt-6">
              <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
