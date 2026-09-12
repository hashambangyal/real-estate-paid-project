"use client";

import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogSection() {
  const posts = [
    {
      title: "Home Loan Tips Every Property Buyer Should Know",
      date: "March 6, 2026",
      category: "Finance",
      image: "/images/realtyflow/prop-garden-villa.jpg",
      snippet: "Navigating mortgage rates, down payment structuring, and escrow verification before closing your deal.",
    },
    {
      title: "9 Mistakes People Make When Buying Property",
      date: "March 6, 2026",
      category: "Guides",
      image: "/images/realtyflow/prop-luxury-villa.jpg",
      snippet: "From skipping structural due diligence to miscalculating property management expenses.",
    },
    {
      title: "Minimalist Interior Design Guide for New Homeowners",
      date: "March 6, 2026",
      category: "Design",
      image: "/images/realtyflow/prop-urban-apt.jpg",
      snippet: "How clean architectural lines, organic textures, and smart lighting elevate everyday coastal living.",
    },
  ];

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase mb-3">
            Latest Blog
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest Insights From Real Estate And Construction
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            Stay informed with market analyses, buyer strategies, and architectural trends.
          </p>
        </motion.div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#3f5f50]" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3f5f50] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {post.snippet}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3f5f50] group-hover:text-[#2d463b] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
