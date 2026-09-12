"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Bed, Bath, Maximize2, ArrowRight, ArrowUpRight } from "lucide-react";
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
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setProperties(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
      }
      // Fallback matching template
      setProperties([
        {
          id: "rf-1",
          title: "Elegant Garden Villa",
          kind: "Villa",
          address: "123 Business Street, New York",
          sizeM2: 250,
          bedrooms: 4,
          bathrooms: 3,
          price: 650000,
          currency: "USD",
          images: [{ url: "/images/realtyflow/prop-garden-villa.jpg" }],
        },
        {
          id: "rf-2",
          title: "Exclusive Luxury Villa",
          kind: "Villa",
          address: "450 Ocean View Way, Miami",
          sizeM2: 320,
          bedrooms: 5,
          bathrooms: 4,
          price: 1250000,
          currency: "USD",
          images: [{ url: "/images/realtyflow/prop-luxury-villa.jpg" }],
        },
        {
          id: "rf-3",
          title: "Stylish Urban Apartment",
          kind: "Apartment",
          address: "88 Midtown Boulevard, Chicago",
          sizeM2: 180,
          bedrooms: 3,
          bathrooms: 2,
          price: 480000,
          currency: "USD",
          images: [{ url: "/images/realtyflow/prop-urban-apt.jpg" }],
        },
      ]);
      setLoading(false);
    }

    fetchProperties();
  }, []);

  const formatPrice = (price, currency = "USD") => {
    if (!price) return "Price on Request";
    const num = Number(price);
    return isNaN(num)
      ? `${currency} ${price}`
      : `$${num.toLocaleString("en-US")} ${currency}`;
  };

  return (
    <section id="properties" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase">
              Properties
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Check On All Properties We Have Available
            </h2>
          </motion.div>
          
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#3f5f50] hover:text-[#2d453a] group shrink-0"
          >
            <span>Browse all properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => {
            const imgUrl =
              prop.images && prop.images[0]?.url
                ? prop.images[0].url
                : idx === 0
                ? "/images/realtyflow/prop-garden-villa.jpg"
                : idx === 1
                ? "/images/realtyflow/prop-luxury-villa.jpg"
                : "/images/realtyflow/prop-urban-apt.jpg";

            const tag = prop.kind || (idx % 2 === 0 ? "Villa" : "Apartment");

            return (
              <motion.div
                key={prop.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={imgUrl}
                    alt={prop.title || "Property"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-md uppercase tracking-wider">
                    {tag}
                  </div>
                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md">
                    {formatPrice(prop.price, prop.currency)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#3f5f50] shrink-0" />
                      <span className="truncate">
                        {prop.address || (prop.city?.name ? `${prop.city.name}` : "Prime Location")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3f5f50] transition-colors line-clamp-1">
                      {prop.title}
                    </h3>
                  </div>

                  {/* Specs & Link */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
                    <div className="flex items-center gap-4">
                      {prop.sizeM2 ? (
                        <div className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.sizeM2 * 10 || 2500} Sq.ft</span>
                        </div>
                      ) : null}
                      {prop.bedrooms ? (
                        <div className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bedrooms}</span>
                        </div>
                      ) : null}
                      {prop.bathrooms ? (
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bathrooms}</span>
                        </div>
                      ) : null}
                    </div>

                    <a
                      href="#contact"
                      className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#3f5f50] group-hover:text-white flex items-center justify-center transition-colors text-slate-700 shrink-0"
                      aria-label="View property details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 text-center">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#3f5f50] hover:bg-[#345043] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-lg transition-all"
          >
            <span>Start exploring</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

      </div>
    </section>
  );
}
