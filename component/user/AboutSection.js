"use client";

import Image from "next/image";
import { ShieldCheck, MapPin, Sparkles, Building, Check, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  // const valueCards = [
  //   {
  //     title: "Secure Transactions",
  //     description: "Certified legal contracts, clear title verification, and protected escrow accounts for every deal.",
  //     icon: ShieldCheck,
  //     color: "text-[#3f5f50] bg-emerald-50",
  //   },
  //   {
  //     title: "Prime Locations",
  //     description: "Curated residential developments and waterfront investments in the most coveted growth corridors.",
  //     icon: MapPin,
  //     color: "text-[#326bff] bg-blue-50",
  //   },
  //   {
  //     title: "Modern Living",
  //     description: "Contemporary architectural design featuring biophilic aesthetics, high ceilings, and smart home amenities.",
  //     icon: Sparkles,
  //     color: "text-amber-600 bg-amber-50",
  //   },
  //   {
  //     title: "Commercial Spaces",
  //     description: "High-yield retail spaces, modern business hubs, and strategic land development opportunities.",
  //     icon: Building,
  //     color: "text-indigo-600 bg-indigo-50",
  //   },
  // ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Visuals + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Founder Quote Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-xl bg-slate-100">
              <Image
                src="/images/realtyflow/about-consultation.jpg"
                alt="Real Estate Advisory Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Founder Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sm:absolute -bottom-8 -right-4 sm:-right-8 mt-4 sm:mt-0 bg-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-2xl max-w-sm border border-slate-800"
            >
              <Quote className="w-8 h-8 text-[#3f5f50] mb-2 fill-current opacity-80" />
              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                &ldquo;Seamless transaction from listing to closing. They handled everything with precision and care.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3f5f50] text-white font-bold flex items-center justify-center text-xs">
                  DW
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">David Wilson</h4>
                  <p className="text-xs text-slate-400">Founder &amp; CEO</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Discover Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase">
              About the Property
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Discover Insights About The Property
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              We are a dedicated real estate team committed to helping clients buy, sell, and invest in premium residential and commercial properties. With deep market knowledge and a client-first approach, we ensure every transaction is smooth, transparent, and rewarding.
            </p>

            {/* 2 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Trusted Real Estate Advisors
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Helping buyers maximize ROI with strategic property guidance and in-depth valuation analysis.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  15+ Years of Experience
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Guided by passion, precision, and professional growth across top metropolitan and coastal markets.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>End-to-end guidance from initial viewings to deed signing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Curated off-market and pre-sale investment opportunities</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Value Pillars */}
        {/* <div className="mt-20 pt-12 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color} mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div> */}

      </div>
    </section>
  );
}
