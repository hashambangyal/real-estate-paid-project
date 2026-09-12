"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target)) setPagesDropdown(false);
      if (propsRef.current && !propsRef.current.contains(e.target)) setPropertiesDropdown(false);
      if (blogRef.current && !blogRef.current.contains(e.target)) setBlogDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 w-full ${
        isScrolled
          ? "shadow-md border-b border-slate-200/80 py-3.5"
          : "border-b border-slate-100 py-4 sm:py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand from Dashboard */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Inmobiliaria Hersu"
                width={40}
                height={40}
                className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[9px] tracking-[0.24em] font-medium text-slate-700 uppercase leading-tight font-sans">
                INMOBILIARIA
              </span>
              <span className="text-[17px] tracking-[0.14em] font-serif text-slate-900 font-normal leading-tight mt-0.5">
                HERSU
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-700">
            <a
              href="#hero"
              className="text-slate-900 hover:text-[#3f5f50] transition-colors py-1 relative group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3f5f50] transition-all duration-200 group-hover:w-full" />
            </a>

            {/* Pages Dropdown */}
            <div
              ref={pagesRef}
              className="relative"
              onMouseEnter={() => setPagesDropdown(true)}
              onMouseLeave={() => setPagesDropdown(false)}
            >
              <button
                onClick={() => setPagesDropdown(!pagesDropdown)}
                className="flex items-center gap-1 hover:text-[#3f5f50] transition-colors py-1 focus:outline-none cursor-pointer"
              >
                <span>Pages</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    pagesDropdown ? "rotate-180 text-[#3f5f50]" : "text-slate-400"
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
                    className="absolute top-full left-0 mt-1 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 z-50"
                  >
                    <a
                      href="#about"
                      onClick={() => setPagesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      About Us
                    </a>
                    <a
                      href="#services"
                      onClick={() => setPagesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Services
                    </a>
                    <a
                      href="#why-us"
                      onClick={() => setPagesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Why Choose Us
                    </a>
                    <a
                      href="#testimonials"
                      onClick={() => setPagesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
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
                className="flex items-center gap-1 hover:text-[#3f5f50] transition-colors py-1 focus:outline-none cursor-pointer"
              >
                <span>Properties</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    propertiesDropdown ? "rotate-180 text-[#3f5f50]" : "text-slate-400"
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
                    className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 z-50"
                  >
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      All Properties
                    </a>
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Luxury Villas
                    </a>
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Modern Apartments
                    </a>
                    <a
                      href="#properties"
                      onClick={() => setPropertiesDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Commercial Spaces
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog Dropdown */}
            <div
              ref={blogRef}
              className="relative"
              onMouseEnter={() => setBlogDropdown(true)}
              onMouseLeave={() => setBlogDropdown(false)}
            >
              <button
                onClick={() => setBlogDropdown(!blogDropdown)}
                className="flex items-center gap-1 hover:text-[#3f5f50] transition-colors py-1 focus:outline-none cursor-pointer"
              >
                <span>Blog</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    blogDropdown ? "rotate-180 text-[#3f5f50]" : "text-slate-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {blogDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 z-50"
                  >
                    <a
                      href="#blog"
                      onClick={() => setBlogDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Latest Insights
                    </a>
                    <a
                      href="#blog"
                      onClick={() => setBlogDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-medium text-slate-700 hover:text-[#3f5f50] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Home Buying Tips
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="text-slate-700 hover:text-[#3f5f50] transition-colors py-1"
            >
              Contact Us
            </a>
          </nav>

          {/* Right Action Pill Button (Dark sage green matching screenshots) */}
          <div className="hidden sm:flex items-center">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="bg-[#3f5f50] hover:bg-[#345043] text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-md flex items-center gap-1.5"
            >
              <span>Contact Now</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-[#3f5f50] p-2 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 overflow-hidden shadow-xl"
          >
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-800 hover:text-[#3f5f50] px-3 py-2 rounded-lg text-sm font-semibold"
            >
              Home
            </a>

            {/* Mobile Pages Accordion */}
            <div>
              <button
                onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
                className="w-full flex items-center justify-between text-slate-800 hover:text-[#3f5f50] px-3 py-2 rounded-lg text-sm font-semibold"
              >
                <span>Pages</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePagesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePagesOpen && (
                <div className="pl-6 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    About Us
                  </a>
                  <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    Services
                  </a>
                  <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    Why Choose Us
                  </a>
                  <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    Testimonials
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Properties Accordion */}
            <div>
              <button
                onClick={() => setMobilePropsOpen(!mobilePropsOpen)}
                className="w-full flex items-center justify-between text-slate-800 hover:text-[#3f5f50] px-3 py-2 rounded-lg text-sm font-semibold"
              >
                <span>Properties</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePropsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePropsOpen && (
                <div className="pl-6 py-1 space-y-1 bg-slate-50 rounded-xl mt-1">
                  <a href="#properties" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    All Properties
                  </a>
                  <a href="#properties" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    Luxury Villas
                  </a>
                  <a href="#properties" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    Apartments
                  </a>
                  <a href="#properties" onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 text-xs py-1.5">
                    Commercial
                  </a>
                </div>
              )}
            </div>

            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-800 hover:text-[#3f5f50] px-3 py-2 rounded-lg text-sm font-semibold"
            >
              Blog
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-800 hover:text-[#3f5f50] px-3 py-2 rounded-lg text-sm font-semibold"
            >
              Contact Us
            </a>

            <div className="pt-3 border-t border-slate-100">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-[#3f5f50] hover:bg-[#345043] text-white py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md"
              >
                Contact Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
