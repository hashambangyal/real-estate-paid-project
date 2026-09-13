"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const [propertiesDropdown, setPropertiesDropdown] = useState(false);
  const [blogDropdown, setBlogDropdown] = useState(false);

  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [mobilePropsOpen, setMobilePropsOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  const pagesRef = useRef(null);
  const propsRef = useRef(null);
  const blogRef = useRef(null);

  const pathname = usePathname();
  const isContactPage = pathname === "/contact_us";

  const scrollToSection = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, id) => {
    if (pathname === "/") {
      scrollToSection(e, id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target))
        setPagesDropdown(false);
      if (propsRef.current && !propsRef.current.contains(e.target))
        setPropertiesDropdown(false);
      if (blogRef.current && !blogRef.current.contains(e.target))
        setBlogDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-4 sm:top-6 lg:top-7 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center pointer-events-none">
      {/* 
        Floating Oval Pill Navbar Container 
        Thicker vertical padding & refined slender typography per reference image
      */}
      <div className="pointer-events-auto w-full max-w-6xl relative">
        <div
          className={`w-full bg-white rounded-full transition-all duration-300 px-6 sm:px-10 lg:px-12 py-3.5 sm:py-5 lg:py-5.5 flex items-center justify-between border border-slate-200/90 ${
            isScrolled
              ? "shadow-2xl shadow-black/15 bg-white/95 backdrop-blur-md"
              : "shadow-xl shadow-black/10 bg-white"
          }`}
        >
          {/* Left: Brand Logo & Slender Typography */}
          <Link
            href="/"
            className="flex items-center gap-3.5 select-none group shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Inmobiliaria Hersu"
                width={62}
                height={62}
                className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] font-medium text-slate-700 uppercase leading-tight font-sans">
                INMOBILIARIA
              </span>

              <span className="text-[20px] sm:text-[18px] tracking-[0.14em] font-serif text-slate-950 font-extrabold leading-tight mt-0.5">
                HERSU
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links (Refined, Thinner Font Weight) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[14.5px] font-normal tracking-normal text-slate-600">
            {/* Home */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={
                !isContactPage
                  ? "text-[#466555] font-semibold hover:text-[#324f42] transition-colors py-1 cursor-pointer"
                  : "text-slate-600 font-normal hover:text-slate-900 transition-colors py-1 cursor-pointer"
              }
            >
              Home
            </Link>

            {/* Pages Dropdown */}
            <div
              ref={pagesRef}
              className="relative"
              onMouseEnter={() => setPagesDropdown(true)}
              onMouseLeave={() => setPagesDropdown(false)}
            >
              <button
                onClick={() => setPagesDropdown(!pagesDropdown)}
                className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-1 focus:outline-none cursor-pointer"
              >
                <span>Pages</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 stroke-[1.5] transition-transform duration-200 ${
                    pagesDropdown
                      ? "rotate-180 text-[#466555]"
                      : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {pagesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+12px)] left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 z-50"
                  >
                    <a
                      href="/#about"
                      onClick={(e) => {
                        setPagesDropdown(false);
                        handleNavClick(e, "about");
                      }}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      About Us
                    </a>
                    <a
                      href="/#services"
                      onClick={(e) => {
                        setPagesDropdown(false);
                        handleNavClick(e, "services");
                      }}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      Services
                    </a>
                    <a
                      href="/#why-us"
                      onClick={(e) => {
                        setPagesDropdown(false);
                        handleNavClick(e, "why-us");
                      }}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      Why Choose Us
                    </a>
                    <a
                      href="/#testimonials"
                      onClick={(e) => {
                        setPagesDropdown(false);
                        handleNavClick(e, "testimonials");
                      }}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      Testimonials
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Properties Dropdown */}
            <div
              ref={propsRef}
              className="relative"
              onMouseEnter={() => setPropertiesDropdown(true)}
              onMouseLeave={() => setPropertiesDropdown(false)}
            >
              <button
                onClick={() => setPropertiesDropdown(!propertiesDropdown)}
                className="flex items-center gap-1.5 hover:text-slate-900 transition-colors py-1 focus:outline-none cursor-pointer"
              >
                <span>Properties</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 stroke-[1.5] transition-transform duration-200 ${
                    propertiesDropdown
                      ? "rotate-180 text-[#466555]"
                      : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {propertiesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[calc(100%+12px)] left-0 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 z-50"
                  >
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      All Properties
                    </a>
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      Luxury Villas
                    </a>
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      Modern Apartments
                    </a>
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-normal text-slate-600 hover:text-[#466555] hover:bg-emerald-50/50 rounded-xl transition-colors"
                    >
                      Commercial Spaces
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* about us */}
             <Link
              href="/about_us"
              className={
                isContactPage
                  ? "text-[#466555] font-semibold hover:text-[#324f42] transition-colors py-1 cursor-pointer"
                  : "text-slate-600 font-normal hover:text-slate-900 transition-colors py-1 cursor-pointer"
              }
            >
               About Us
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact_us"
              className={
                isContactPage
                  ? "text-[#466555] font-semibold hover:text-[#324f42] transition-colors py-1 cursor-pointer"
                  : "text-slate-600 font-normal hover:text-slate-900 transition-colors py-1 cursor-pointer"
              }
            >
              Contact Us
            </Link>
          </nav>

          {/* Right: Oval Pill "Contact Now" Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/#contact"
              onClick={(e) => {
                if (pathname === "/") {
                  scrollToSection(e, "contact");
                }
              }}
              className="bg-[#466555] hover:bg-[#395346] text-white px-8 py-3 rounded-full text-[14px] font-normal tracking-wide shadow-md hover:shadow-emerald-900/20 transition-all flex items-center justify-center cursor-pointer"
            >
              Contact Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-slate-700 hover:text-[#466555] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-3 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <nav className="flex flex-col space-y-2 text-sm font-normal text-slate-700">
                <Link
                  href="/"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl hover:bg-emerald-50 text-[#466555] cursor-pointer"
                >
                  Home
                </Link>

                {/* Mobile Pages Accordion */}
                <div>
                  <button
                    onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-normal"
                  >
                    <span>Pages</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobilePagesOpen ? "rotate-180 text-[#466555]" : ""
                      }`}
                    />
                  </button>
                  {mobilePagesOpen && (
                    <div className="pl-6 py-1 space-y-1 text-xs text-slate-500 font-normal">
                      <a
                        href="#about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        About Us
                      </a>
                      <a
                        href="#services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        Services
                      </a>
                      <a
                        href="#why-us"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        Why Choose Us
                      </a>
                      <a
                        href="#testimonials"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        Testimonials
                      </a>
                    </div>
                  )}
                </div>

                {/* Mobile Properties Accordion */}
                <div>
                  <button
                    onClick={() => setMobilePropsOpen(!mobilePropsOpen)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-normal"
                  >
                    <span>Properties</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobilePropsOpen ? "rotate-180 text-[#466555]" : ""
                      }`}
                    />
                  </button>
                  {mobilePropsOpen && (
                    <div className="pl-6 py-1 space-y-1 text-xs text-slate-500 font-normal">
                      <a
                        href="#properties"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        All Properties
                      </a>
                      <a
                        href="#properties"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        Luxury Villas
                      </a>
                      <a
                        href="#properties"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        Modern Apartments
                      </a>
                      <a
                        href="#properties"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 px-3 hover:text-[#466555] rounded-lg"
                      >
                        Commercial Spaces
                      </a>
                    </div>
                  )}
                </div>

                {/* Mobile about us   */}
               <Link
                  href="/about_us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-normal cursor-pointer transition-colors ${
                    isContactPage
                      ? "bg-emerald-50 text-[#466555] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  About Us
                </Link>

                <Link
                  href="/contact_us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-normal cursor-pointer transition-colors ${
                    isContactPage
                      ? "bg-emerald-50 text-[#466555] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Contact Us
                </Link>
              </nav>

              <div className="pt-2">
                <a
                  href="/#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (pathname === "/") {
                      scrollToSection(e, "contact");
                    }
                  }}
                  className="w-full bg-[#466555] text-white py-3 rounded-full text-center text-sm font-normal block shadow-md cursor-pointer"
                >
                  Contact Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
