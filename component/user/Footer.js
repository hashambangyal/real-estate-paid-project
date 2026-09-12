"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Brand Banner */}
        <div className="pb-16 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-bold text-[#3f5f50] uppercase tracking-widest">
              STAY INFORMED
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Subscribe To Our Exclusive Market Letter
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Receive off-market residential deals, pre-construction opportunities, and quarterly yield reports.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#3f5f50] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#3f5f50] hover:bg-[#324f42] text-white px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 shrink-0"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Inmobiliaria Hersu"
                  width={38}
                  height={38}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] tracking-[0.22em] font-medium text-slate-300 uppercase leading-tight font-sans">
                  INMOBILIARIA
                </span>
                <span className="text-[17px] tracking-[0.14em] font-serif text-white font-normal leading-tight mt-0.5">
                  HERSU
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Committed to helping clients buy, sell, and invest in extraordinary residential, coastal, and commercial properties with verified legal compliance and superior long-term yields.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#3f5f50] border border-slate-800 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#3f5f50] border border-slate-800 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#3f5f50] border border-slate-800 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#3f5f50] border border-slate-800 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-3 lg:pl-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-light">
              <li>
                <a href="#hero" className="hover:text-[#3f5f50] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#3f5f50] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#3f5f50] transition-colors">Services</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#3f5f50] transition-colors">Properties</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#3f5f50] transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#3f5f50] transition-colors">Latest Insights</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Let&apos;s Work Together
            </h4>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#3f5f50] shrink-0 mt-0.5" />
                <a href="mailto:info@inmobiliariahersu.com" className="hover:text-white transition-colors">
                  info@inmobiliariahersu.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#3f5f50] shrink-0 mt-0.5" />
                <a href="tel:+5219841541550" className="hover:text-white transition-colors">
                  +52 1 984 154 1550
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#3f5f50] shrink-0 mt-0.5" />
                <span>123 Business Street, Prime Coastal &amp; Urban Hub</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>Copyright &copy; 2026 Inmobiliaria Hersu | All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
