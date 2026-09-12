"use client";

import { Home, TrendingUp, HandCoins, Building2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      num: "01",
      title: "Property Buying Assistance",
      description:
        "We guide you through every step of the home-buying journey, from identifying the right property to negotiating the best price and ensuring clean title deeds.",
      icon: Home,
    },
    {
      num: "02",
      title: "Property Selling Services",
      description:
        "Selling a property requires the right pricing strategy and strong market exposure. We help you position your property competitively to close top dollar.",
      icon: HandCoins,
    },
    {
      num: "03",
      title: "Real Estate Investment Consulting",
      description:
        "Real estate is one of the most powerful wealth-building tools when guided correctly. We provide strategic investment advice based on current market trends and yields.",
      icon: TrendingUp,
    },
    {
      num: "04",
      title: "Commercial Property Solutions",
      description:
        "We offer premium office spaces, retail outlets, and commercial developments in strategic business locations primed for rapid enterprise expansion.",
      icon: Building2,
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase mb-3">
            Explore Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Experience Trusted Real Solutions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            Comprehensive real estate and asset advisory crafted to protect your capital and maximize long-term equity growth.
          </p>
        </motion.div>

        {/* 4 Numbered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#3f5f50] transition-colors" />

                <div>
                  {/* Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#3f5f50] flex items-center justify-center group-hover:bg-[#3f5f50] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-200 group-hover:text-emerald-200 transition-colors font-mono">
                      {srv.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#3f5f50] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {srv.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs font-bold text-slate-700 group-hover:text-[#3f5f50] transition-colors flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
