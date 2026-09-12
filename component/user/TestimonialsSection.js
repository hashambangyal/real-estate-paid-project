"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "David Wilson",
      role: "Founder & CEO",
      avatar: "/images/realtyflow/team-01.png",
      text: "The team delivered exceptional quality and maintained complete transparency throughout the project. The transaction was completed on time, and the finishing exceeded our expectations.",
    },
    {
      name: "Sarah Jenkins",
      role: "Property Investor",
      avatar: "/images/realtyflow/team-03.png",
      text: "Working with Inmobiliaria Hersu was an absolute breeze. They helped identify an off-market beachfront property that generated an immediate 12% rental yield in its first year.",
    },
    {
      name: "Michael Chen",
      role: "Commercial Director",
      avatar: "/images/realtyflow/team-04.png",
      text: "Their in-depth knowledge of commercial zoning, escrow security, and contract negotiation made our expansion seamless. Highly recommended for international investors.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase mb-3">
            Our Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            What Our Clients Say About Us
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            Our clients&apos; feedback reflects our steadfast commitment to quality, reliability, and professionalism.
          </p>
        </motion.div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-sm leading-relaxed italic font-normal">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
                </div>
                <Quote className="w-6 h-6 text-slate-300 ml-auto fill-current opacity-40 group-hover:text-[#3f5f50] group-hover:opacity-60 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
