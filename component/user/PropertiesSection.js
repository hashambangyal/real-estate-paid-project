"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Bed, Bath, LayoutGrid, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PropertiesSection() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties?limit=6&sortBy=createdAt&sortOrder=desc");
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json) ? json : json.data;
          if (Array.isArray(list) && list.length > 0) {
            setProperties(list.slice(0, 6));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
      }

      // Default 6 properties fallback
      setProperties([
        {
          id: "rf-1",
          title: "Elegant Garden Villa",
          kind: "Apartment",
          address: "123 Business Street New York",
          sizeM2: 250,
          bedrooms: 1,
          bathrooms: 3,
          images: [{ url: "/images/realtyflow/prop-garden-villa.jpg" }],
        },
        {
          id: "rf-2",
          title: "Exclusive Luxury Villa",
          kind: "Apartment",
          address: "123 Business Street New York",
          sizeM2: 250,
          bedrooms: 1,
          bathrooms: 3,
          images: [{ url: "/images/realtyflow/prop-luxury-villa.jpg" }],
        },
        {
          id: "rf-3",
          title: "Stylish Urban Apartment",
          kind: "Bungalow",
          address: "123 Business Street New York",
          sizeM2: 250,
          bedrooms: 4,
          bathrooms: 5,
          images: [{ url: "/images/realtyflow/prop-urban-apt.jpg" }],
        },
        {
          id: "rf-4",
          title: "Contemporary 4 Bedroom Residence",
          kind: "Villa",
          address: "123 Business Street New York",
          sizeM2: 260,
          bedrooms: 4,
          bathrooms: 3,
          images: [{ url: "/images/realtyflow/hero-villa.jpg" }],
        },
        {
          id: "rf-5",
          title: "Modern Family House in Nogales",
          kind: "Apartment",
          address: "123 Business Street New York",
          sizeM2: 185,
          bedrooms: 3,
          bathrooms: 2,
          images: [{ url: "/images/realtyflow/prop-garden-villa.jpg" }],
        },
        {
          id: "rf-6",
          title: "Modern Luxury Villa",
          kind: "Bungalow",
          address: "123 Business Street New York",
          sizeM2: 320,
          bedrooms: 4,
          bathrooms: 4,
          images: [{ url: "/images/realtyflow/prop-luxury-villa.jpg" }],
        },
      ]);
      setLoading(false);
    }

    fetchProperties();
  }, []);

  const getFallbackImage = (idx) => {
    const fallbacks = [
      "/images/realtyflow/prop-garden-villa.jpg",
      "/images/realtyflow/prop-luxury-villa.jpg",
      "/images/realtyflow/prop-urban-apt.jpg",
      "/images/realtyflow/hero-villa.jpg",
      "/images/realtyflow/service-investment.jpg",
      "/images/realtyflow/service-buying.jpg",
    ];
    return fallbacks[idx % fallbacks.length];
  };

  const getTag = (prop, idx) => {
    if (prop.title) {
      const lower = prop.title.toLowerCase();
      if (lower.includes("bungalow")) return "Bungalow";
      if (lower.includes("apartment")) return "Apartment";
      if (lower.includes("villa")) return "Villa";
      if (lower.includes("residence") || lower.includes("house")) return "Apartment";
    }
    if (prop.kind && typeof prop.kind === "string") {
      if (prop.kind.toUpperCase() === "RESIDENTIAL") {
        return idx % 3 === 2 ? "Bungalow" : "Apartment";
      }
      return prop.kind.charAt(0).toUpperCase() + prop.kind.slice(1).toLowerCase();
    }
    return idx % 3 === 2 ? "Bungalow" : "Apartment";
  };

  return (
    <section id="properties" className="py-20 lg:py-24 bg-white relative">
      {/* Container with generous left and right spacing */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        
        {/* Top Header - Centered as requested */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16"
        >
          {/* Centered Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200/80 bg-white text-xs sm:text-sm font-semibold text-slate-800 shadow-xs mb-4 select-none">
            <span className="text-sm">🏢</span>
            <span>Properties</span>
          </div>

          {/* Centered Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
            Check On All Properties We Have Available
          </h2>
        </motion.div>

        {/* 6 Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => {
            const imgUrl =
              prop.images && prop.images.length > 0 && prop.images[0]?.url
                ? prop.images[0].url
                : getFallbackImage(idx);

            const tag = getTag(prop, idx);

            const address =
              prop.address ||
              (prop.city?.name ? `${prop.city.name}` : "123 Business Street New York");

            const sqft = prop.sizeM2
              ? Math.round(Number(prop.sizeM2) * 10)
              : 2500;

            const beds = prop.bedrooms !== null && prop.bedrooms !== undefined && prop.bedrooms !== 0
              ? prop.bedrooms
              : idx % 3 === 2 ? 4 : 1;

            const baths = prop.bathrooms !== null && prop.bathrooms !== undefined && prop.bathrooms !== 0
              ? Math.round(Number(prop.bathrooms))
              : idx % 3 === 2 ? 5 : 3;

            return (
              <motion.div
                key={prop.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#f5f5f5] rounded-[28px] overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Container with Top-Left Badge */}
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt={prop.title || "Property"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-white text-slate-800 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm select-none">
                    {tag}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 group-hover:text-[#3b5048] transition-colors line-clamp-1">
                      {prop.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm mt-2.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{address}</span>
                    </div>
                  </div>

                  {/* Specs & Arrow Button */}
                  <div className="mt-6 pt-2 flex items-center justify-between">
                    {/* Icons Specs */}
                    <div className="flex items-center gap-5 sm:gap-6 text-slate-700">
                      {/* Area */}
                      <div className="flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-slate-600 stroke-[1.75]" />
                        <div className="leading-tight">
                          <span className="block text-xs font-bold text-slate-800">{sqft}</span>
                          <span className="block text-[10px] text-slate-500 uppercase tracking-tight">Sq.ft</span>
                        </div>
                      </div>

                      {/* Bedrooms */}
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-slate-600 stroke-[1.75]" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">{beds}</span>
                      </div>

                      {/* Bathrooms */}
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-slate-600 stroke-[1.75]" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">{baths}</span>
                      </div>
                    </div>

                    {/* Green Circle Arrow Button */}
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-10 h-10 rounded-full bg-[#3b5048] hover:bg-[#2d4039] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shrink-0"
                      aria-label={`View ${prop.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Actions: "Start exploring" black pill + "Browse all properties →" green link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
        >
          {/* Black Pill: Start exploring */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-black hover:bg-neutral-900 text-white px-8 sm:px-9 py-3 sm:py-3.5 rounded-full text-sm sm:text-[15px] font-semibold tracking-wide transition-all shadow-md inline-flex items-center justify-center cursor-pointer select-none"
          >
            Start exploring
          </motion.a>

          {/* Sage Green Link: Browse all properties → */}
          <motion.a
            whileHover={{ x: 3 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[#506e61] hover:text-[#3b5048] font-bold text-sm sm:text-base inline-flex items-center gap-2 group transition-colors cursor-pointer select-none"
          >
            <span>Browse all properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
