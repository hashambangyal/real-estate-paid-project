"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
      const fullMessage = formData.subject
        ? `[Subject: ${formData.subject.trim()}]\n\n${formData.message.trim()}`
        : formData.message.trim();

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          message: fullMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus((p) => ({ ...p, success: false })), 6000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#3f5f50] text-xs font-bold tracking-wider uppercase mb-3">
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Let&apos;s Discuss Your Next Property Acquisition
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Reach out to our certified real estate advisors for tailored consultations, property viewings, and market inquiries.
              </p>
            </div>

            {/* 3 Contact Info Cards */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#3f5f50] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call us</h4>
                  <a href="tel:+5219841541550" className="text-base font-bold text-slate-900 hover:text-[#3f5f50] transition-colors mt-0.5 block">
                    +52 1 984 154 1550
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#3f5f50] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</h4>
                  <a href="mailto:info@inmobiliariahersu.com" className="text-base font-bold text-slate-900 hover:text-[#3f5f50] transition-colors mt-0.5 block">
                    info@inmobiliariahersu.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#3f5f50] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Our Location</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    123 Business Street, Riviera Maya &amp; Berlin
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Send Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Send Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill out the form below and one of our dedicated brokers will respond within 24 hours.
            </p>

            {status.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been received. Our team will contact you promptly.</span>
              </motion.div>
            )}

            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{status.error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#3f5f50] focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#3f5f50] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#3f5f50] focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Property Inquiry / Viewing"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#3f5f50] focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you are looking for..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#3f5f50] focus:outline-none text-sm transition-colors resize-none"
                />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-[#3f5f50] hover:bg-[#324f42] text-white py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-emerald-900/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
