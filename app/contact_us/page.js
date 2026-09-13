"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/component/user/Navbar";
import Footer from "@/component/user/Footer";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    if (!formData.name.trim()) {
      setStatus({ loading: false, success: false, error: "Please enter your name" });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ loading: false, success: false, error: "Please enter your email" });
      return;
    }
    if (!formData.message.trim()) {
      setStatus({ loading: false, success: false, error: "Please write a message" });
      return;
    }

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus((p) => ({ ...p, success: false })), 6000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#3f5f50] selection:text-white font-sans antialiased">
      {/* 1. Shared Floating Oval Navbar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* ====================================================
            HERO BANNER: High-rise Skyline Image with Breadcrumbs
        ==================================================== */}
        <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center overflow-hidden">
          {/* Background Skyline Image (Same as reference image) */}
          <Image
            src="/images/realtyflow/skyline.jpg"
            alt="Modern City Skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark Contrast Overlays for Crisp Text Visibility */}
          <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Center Content: Title & Breadcrumbs */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                Contact Us
              </h1>

              {/* Breadcrumb Links: Home > Contact Us */}
              <div className="mt-4 sm:mt-5 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 drop-shadow">
                <Link
                  href="/"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
                <span className="text-white/60">&gt;</span>
                <span className="text-white font-semibold">Contact Us</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ====================================================
            INFO SECTION: Personalized Attention & Hours Row
        ==================================================== */}
        <section className="w-full bg-white border-b border-neutral-200/70 py-12 sm:py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between gap-8">
            
            {/* Left: 4 Vertical Grey Dots */}
            <div className="hidden sm:flex flex-col items-center gap-3.5 text-[#898989] select-none shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
            </div>

            {/* Middle Content: 3 Column Info Row */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Column 1: Amber Heading */}
              <div className="md:col-span-4">
                <h3 className="text-2xl sm:text-[28px] font-bold text-[#dd9130] leading-snug">
                  Personalized<br />
                  attention for each<br />
                  project.
                </h3>
              </div>

              {/* Column 2: Working Hours */}
              <div className="md:col-span-4 space-y-3 text-sm sm:text-base">
                <div>
                  <p className="font-semibold text-neutral-800">Monday - Saturday:</p>
                  <p className="text-neutral-500">10am - 6pm</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">Sundays:</p>
                  <p className="text-neutral-500">11am - 4pm</p>
                </div>
              </div>

              {/* Column 3: Contact Us Direct Details */}
              <div className="md:col-span-4 md:border-l md:border-neutral-300 md:pl-8 space-y-1.5 text-sm sm:text-base">
                <p className="text-neutral-500 text-sm">Contact us</p>
                <a
                  href="tel:+5219841541550"
                  className="font-bold text-neutral-800 hover:text-[#3b5048] transition-colors block text-base sm:text-lg"
                >
                  +52 1 984 154 1550
                </a>
                <a
                  href="mailto:info@inmobiliariahersu.com"
                  className="text-neutral-500 hover:text-[#3b5048] transition-colors block text-sm sm:text-[15px]"
                >
                  info@inmobiliariahersu.com
                </a>
              </div>

            </div>

            {/* Right: 3 Vertical Sage Green Dots */}
            <div className="hidden sm:flex flex-col items-center gap-3.5 select-none shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b5048]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b5048]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b5048]" />
            </div>

          </div>
        </section>

        {/* ====================================================
            FORM SECTION: Heading + Minimal Underline Form
        ==================================================== */}
        <section className="w-full bg-white py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Heading & Subtitle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] text-[#3b5048] leading-tight font-light">
                  <span className="font-extrabold block">You&apos;re just a</span>
                  <span className="font-extrabold text-[#3b5048]">click </span>
                  <span className="font-light">away from</span>
                  <span className="font-light block">contacting us!</span>
                </h2>

                <p className="mt-6 text-neutral-500 text-sm sm:text-base leading-relaxed max-w-sm">
                  Share your information and we will contact you as soon as possible.
                </p>
              </motion.div>

              {/* Right Column: Form Inputs & Send Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                  {/* Name and Surname */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name and Surname"
                      required
                      className="w-full bg-transparent border-b-2 border-neutral-400 focus:border-[#3b5048] py-2.5 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="w-full bg-transparent border-b-2 border-neutral-400 focus:border-[#3b5048] py-2.5 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* E-mail */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail"
                      required
                      className="w-full bg-transparent border-b-2 border-neutral-400 focus:border-[#3b5048] py-2.5 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Box */}
                  <div>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      required
                      className="w-full bg-transparent border border-neutral-300 border-b-2 border-b-neutral-400 p-3 text-sm sm:text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#3b5048] transition-colors resize-y"
                    />
                  </div>

                  {/* Submission Status & Send Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs sm:text-sm">
                      {status.success && (
                        <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Message sent successfully! Our team will contact you.
                        </span>
                      )}
                      {status.error && (
                        <span className="text-red-600 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" />
                          {status.error}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status.loading}
                      className="font-bold text-sm sm:text-base tracking-wide text-[#3b5048] hover:text-[#dd9130] transition-colors cursor-pointer py-1.5 px-2 flex items-center gap-2 disabled:opacity-50"
                    >
                      {status.loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>Send</span>
                    </button>
                  </div>
                </form>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      {/* 4. Shared Footer */}
      <Footer />
    </div>
  );
}