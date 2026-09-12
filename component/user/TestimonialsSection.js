"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "David Wilson",
      role: "Founder & CEO",
      avatar: "/images/realtyflow/team-01.png",
      stars: 5,
      text: "The team delivered exceptional quality and maintained complete transparency throughout the project. The construction was completed on time, and the finishing exceeded our workmanship and strong project management.",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Property Investor",
      avatar: "/images/realtyflow/team-02.png",
      stars: 5,
      text: "Working with Inmobiliaria Hersu was an absolute breeze. They helped identify an off-market beachfront villa in Playa del Carmen that generated an immediate 14% rental yield in its very first year.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Commercial Director",
      avatar: "/images/realtyflow/team-04.png",
      stars: 5,
      text: "Their in-depth knowledge of commercial zoning, escrow security, and contract negotiation made our expansion seamless. Highly recommended for international corporate acquisitions.",
    },
    {
      id: 4,
      name: "Elena Rostova",
      role: "Luxury Villa Owner",
      avatar: "/images/realtyflow/team-03.png",
      stars: 5,
      text: "From architectural planning to turnkey key handover, every milestone was executed with world-class craftsmanship. The smart home integration and coastal durability are truly remarkable.",
    },
    {
      id: 5,
      name: "Marcus Thorne",
      role: "Portfolio Manager",
      avatar: "/images/realtyflow/team-05.png",
      stars: 5,
      text: "Outstanding advisory and construction supervision. They guided us through Mexican title deeds and tax incentives with complete clarity, saving us both capital and critical months.",
    },
    {
      id: 6,
      name: "Sofia Martinez",
      role: "Architect & Developer",
      avatar: "/images/realtyflow/team-06.png",
      stars: 5,
      text: "As an architect myself, I hold structural engineering and materials to the highest standard. Inmobiliaria Hersu built our residential complex with meticulous attention to every single detail.",
    },
  ];

  // Carousel slider state: slides 1 by 1
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per view: 1 on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Auto-slide 1 by 1 every 3.8 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching Uploaded Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          
          {/* Left: Badge & Large Headline */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Our Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              What Our Clients Say <br className="hidden sm:inline" />
              About Our Construction Services
            </h2>
          </div>

          {/* Right: Subtitle, "View All Review" Pill Button & Arrow Controls */}
          <div className="lg:col-span-5 flex flex-col justify-end space-y-5 lg:pl-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Our clients&apos; feedback reflects our commitment to quality, reliability, and professionalism.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#contact"
                className="bg-[#466555] hover:bg-[#395346] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-wide shadow-md active:scale-95 transition-all inline-block"
              >
                View All Review
              </a>

              {/* Slider Prev/Next Arrow Buttons (1-by-1 sliding) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 stroke-[1.75]" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 
          Slider Carousel Track 
          - 3 visible on desktop
          - 2 visible on tablet
          - 1 visible on mobile
          - Slides 1 by 1 smoothly
        */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="shrink-0 px-3 sm:px-4 flex"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="w-full bg-[#f8f9fa] rounded-3xl p-7 sm:p-8 border border-slate-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Solid Black Stars (Matching Reference Image) */}
                    <div className="flex items-center gap-1.5 mb-5">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-slate-900 text-slate-900"
                        />
                      ))}
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-slate-700 text-sm sm:text-[14.5px] leading-relaxed font-normal">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  {/* Clean Divider Line */}
                  <div>
                    <div className="w-full h-px bg-slate-200/70 my-6" />

                    {/* Client Author Info */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 border border-white shadow-sm shrink-0">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-tight">
                          {t.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-normal">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-8 h-2.5 bg-[#466555]"
                  : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
