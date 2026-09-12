"use client";

import { CheckCircle2, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const skills = [
    { name: "Architectural Planning", percent: 85 },
    { name: "Exterior Design", percent: 75 },
    { name: "Commercial Construction", percent: 95 },
    { name: "Eco-Friendly Construction", percent: 95 },
  ];

  const highlights = [
    "Full Turnkey Real Estate & Architectural Advisory",
    "Over 15 Years of Proven Industry Experience",
    "Highest-Grade Construction Materials & Smart Home Tech",
    "100% Legally Audited Titles & Notarized Contracts",
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Skills Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 space-y-6"
          >
            <div>
              <span className="text-xs font-bold text-[#3f5f50] uppercase tracking-wider">
                Precision &amp; Standards
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                Our Skills &amp; Capabilities
              </h3>
            </div>

            <div className="space-y-5 pt-2">
              {skills.map((s, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-800">
                    <span>{s.name}</span>
                    <span className="text-[#3f5f50] font-mono">{s.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 }}
                      className="h-full bg-gradient-to-r from-[#3f5f50] to-[#506e61] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#3f5f50] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Awarded top regional brokerage for compliance, building integrity, and client satisfaction.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Why Choose Us Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase">
              Why Choose Us
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Experienced Professionals Building With Integrity
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              What our clients say about our services reflects our commitment to quality workmanship, timely project delivery, and transparent communication across every single deal.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#3f5f50] shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Learn More CTA */}
            <div className="pt-4 flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#3f5f50] hover:bg-[#324f42] text-white px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all active:scale-95"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
