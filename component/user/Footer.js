"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// Official Brand SVGs for Social Media
function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Panoramic Aerial Tropical Beach Coastline */}
      <Image
        src="/images/realtyflow/footer-beach.jpg"
        alt="Tropical Ocean Coastline"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />

      {/* Atmospheric Dark Teal/Slate Gradient Overlay for Contrast & Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

      {/* Footer Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10">
        
        {/* 3 Main Footer Columns (Brand, Useful Links, Let's Work Together) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Column 1: Brand Info & Social Icons */}
          <div className="lg:col-span-5 space-y-6">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Inmobiliaria Hersu"
                  width={42}
                  height={42}
                  className="w-full h-full object-contain drop-shadow-md brightness-110"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] tracking-[0.26em] font-normal text-slate-200 uppercase leading-tight font-sans">
                  INMOBILIARIA
                </span>
                <span className="text-[18px] tracking-[0.14em] font-serif text-white font-normal leading-tight mt-0.5 drop-shadow-sm">
                  HERSU
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-200/90 font-light leading-relaxed max-w-md drop-shadow-sm">
              Committed to helping clients buy, sell, and invest in extraordinary residential, coastal, and commercial properties with verified legal compliance and superior long-term yields.
            </p>

            {/* Social Icons with Real Brand Logos */}
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/inmobiliariahersu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#1877f2] backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-transparent shadow-sm"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/hersuinmobiliaria/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-transparent shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@hersuplayadelcarmen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#ff0000] backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-transparent shadow-sm"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              {/* <a
                href="https://www.linkedin.com/in/hashambangyal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#0a66c2] backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-transparent shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a> */}
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="lg:col-span-3 lg:pl-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider drop-shadow-sm">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200/85 font-light">
              <li>
                <a href="#hero" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                  Properties
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">
                  Latest Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Let's Work Together */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider drop-shadow-sm">
              Let&apos;s Work Together
            </h4>

            <div className="space-y-4 text-xs sm:text-sm text-slate-200/90 font-light">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                <a href="mailto:info@inmobiliariahersu.com" className="hover:text-white transition-colors break-all">
                  info@inmobiliariahersu.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                <a href="tel:+5219841541550" className="hover:text-white transition-colors">
                  +52 1 984 154 1550
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                <span>123 Business Street, Prime Coastal &amp; Urban Hub</span>
              </div>
            </div>
          </div>

        </div>

        {/* Crisp Full-Width Divider Line */}
        <div className="w-full h-px bg-white/20 mt-16 mb-8" />

        {/* Bottom Bar: Copyright | Creator [LinkedIn] & Policies */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 font-light">
          
          {/* Left: Copyright & Creator LinkedIn */}
          <div className="flex items-center flex-wrap gap-2 text-slate-300">
            <span>Copyright &copy; 2026 Inmobiliaria Hersu</span>
            <span className="text-white/40">|</span>
            <span className="text-slate-200 font-normal">Creator</span>
            <a
              href="https://www.linkedin.com/in/hashambangyal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-[#0a66c2] text-white hover:opacity-90 hover:scale-110 transition-all ml-0.5 shadow-sm"
              aria-label="Creator LinkedIn profile"
              title="Creator: Hasham Bangyal"
            >
              <LinkedinIcon className="w-3 h-3" />
            </a>
          </div>

          {/* Right: Policy Links */}
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
