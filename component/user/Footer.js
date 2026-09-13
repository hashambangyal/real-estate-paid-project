"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToSection = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Image: Modern Architectural Villa at Twilight Dusk */}
      <Image
        src="/images/realtyflow/footer-villa-dusk.jpg"
        alt="Modern Luxury Villa at Dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Contrast Overlays for Perfect Readability */}
      <div className="absolute inset-0 bg-slate-950/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ====================================================
              LEFT COLUMN: Brand, Description, Newsletter & Copyright
          ==================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Inmobiliaria Hersu"
                  fill
                  className="object-contain brightness-0 invert drop-shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-white/90 uppercase leading-none">
                  INMOBILIARIA
                </span>
                <span className="mt-1 text-2xl sm:text-[26px] font-serif font-bold tracking-[0.12em] text-white leading-none drop-shadow-sm">
                  HERSU
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-md mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
            </p>

            {/* Newsletter Subscription Pill */}
            {/* <form onSubmit={handleSubscribe} className="max-w-md w-full mb-8">
              <div className="relative flex items-center bg-black/40 border border-white/30 rounded-full p-1 pl-5 backdrop-blur-md focus-within:border-white/70 transition-colors shadow-inner">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-transparent text-white placeholder:text-white/50 text-xs sm:text-sm focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  className="bg-[#506e61] hover:bg-[#3f574d] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all shrink-0 cursor-pointer shadow-md"
                >
                  {subscribed ? "Subscribed!" : "Get Started"}
                </button>
              </div>
            </form> */}

            {/* Copyright, Creator LinkedIn, All Rights Reserved */}
            <div className="text-xs text-white/70 flex items-center flex-wrap gap-2 pt-2">
              <span>Copyright &copy; 2026 Inmobiliaria Hersu</span>
              <span className="text-white/40">|</span>
              <span className="font-medium text-white/90">Creator</span>
              <a
                href="https://www.linkedin.com/in/hashambangyal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Creator LinkedIn profile"
                title="Creator: Hasham Bangyal"
                className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#0a66c2] text-white transition-all duration-200 hover:scale-110 hover:opacity-90"
              >
                <LinkedinIcon className="w-3 h-3" />
              </a>
              <span className="text-white/40">|</span>
              <span>All Rights Reserved</span>
            </div>
          </div>

          {/* ====================================================
              VERTICAL DIVIDER (Between Left and Right Sections)
          ==================================================== */}
          <div className="hidden lg:block lg:col-span-1 h-full min-h-[260px] flex items-center justify-center">
            <div className="w-px h-full bg-white/20" />
          </div>

          {/* ====================================================
              RIGHT COLUMN: Useful links, Let's work together & Socials
          ==================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            {/* Top Sub-Grid: Useful links & Let's work together */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              
              {/* Useful links */}
              <div>
                <h4 className="text-base sm:text-lg font-medium text-white mb-4">
                  Useful links
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
                  <li>
                    <Link
                      href="/"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="hover:text-white transition-colors block cursor-pointer"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/#about"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          scrollToSection(e, "about");
                        }
                      }}
                      className="hover:text-white transition-colors block cursor-pointer"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#services"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          scrollToSection(e, "services");
                        }
                      }}
                      className="hover:text-white transition-colors block cursor-pointer"
                    >
                      Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#properties"
                      onClick={(e) => {
                        if (window.location.pathname === "/") {
                          scrollToSection(e, "properties");
                        }
                      }}
                      className="hover:text-white transition-colors block cursor-pointer"
                    >
                      Properties
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/contact_us"
                      className="hover:text-white transition-colors block cursor-pointer"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Let's work together */}
              <div>
                <h4 className="text-base sm:text-lg font-medium text-white mb-4">
                  Let&apos;s work together
                </h4>
                <div className="space-y-3.5 text-xs sm:text-sm text-white/75">
                  <a
                    href="mailto:contact@example.com"
                    className="flex items-center gap-3 hover:text-white transition-colors group"
                  >
                    <Mail className="w-4 h-4 shrink-0 stroke-[1.5] text-white/70 group-hover:text-white" />
                    <span>contact@example.com</span>
                  </a>

                  <a
                    href="tel:+11234567890"
                    className="flex items-center gap-3 hover:text-white transition-colors group"
                  >
                    <Phone className="w-4 h-4 shrink-0 stroke-[1.5] text-white/70 group-hover:text-white" />
                    <span>(123) 456-7890</span>
                  </a>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 shrink-0 stroke-[1.5] text-white/70 mt-0.5" />
                    <span className="leading-snug">
                      123 Business Street,<br />
                      New York
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: 4 Rectangular Outline Social Buttons (Matching Reference) */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="https://www.facebook.com/inmobiliariahersu/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/35 hover:border-white text-white hover:bg-white/10 px-4 sm:px-5 py-1.5 rounded text-xs font-normal transition-all"
              >
                Facebook
              </a>

              <a
                href="https://instagram.com/hersuinmobiliaria/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/35 hover:border-white text-white hover:bg-white/10 px-4 sm:px-5 py-1.5 rounded text-xs font-normal transition-all"
              >
                Instagram
              </a>

              <a
                href="https://www.youtube.com/@hersuplayadelcarmen"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/35 hover:border-white text-white hover:bg-white/10 px-4 sm:px-5 py-1.5 rounded text-xs font-normal transition-all"
              >
                Youtube
              </a>

              
            </div>

          </div>

        </div>

        {/* Subtle Horizontal Divider at the very bottom */}
        <div className="mt-12 sm:mt-16 h-px w-full bg-white/10" />
      </div>
    </footer>
  );
}