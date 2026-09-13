"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactSection() {
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
    <section id="contact" className="w-full bg-white py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
<div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">          
          {/* Left Column: 4 Vertical Grey Dots + Heading + Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
className="flex items-start gap-6 sm:gap-10 w-full lg:w-[320px] shrink-0 lg:pt-[65px]"        >
            {/* 4 Vertical Dots */}
            <div className="hidden sm:flex flex-col items-center gap-4 text-[#898989] select-none pt-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#898989]" />
            </div>

            {/* Header Text */}
            <div className="pt-0">
              <h2 className="text-2xl sm:text-[28px] lg:text-[30px] text-[#3b5048] leading-tight">
                <span className="font-extrabold block">You&apos;re just a click</span>
                <span className="font-normal block">away from</span>
                <span className="font-normal block">contacting us!</span>
              </h2>

              <p className="mt-5 text-[#898989] text-sm leading-relaxed max-w-[240px]">
                Share your information and we will contact you as soon as possible.
              </p>
            </div>
          </motion.div>

          {/* Center Column: Minimal Form */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="w-full lg:max-w-[420px] flex-1"
>
  <form onSubmit={handleSubmit} className="space-y-4">

    {/* Name and Surname */}
    <div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name and Surname"
        required
        className="w-full bg-transparent border-b-[3px] border-neutral-400 focus:border-[#3b5048] py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors"
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
        className="w-full bg-transparent border-b-[3px] border-neutral-400 focus:border-[#3b5048] py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors"
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
        className="w-full bg-transparent border-b-[3px] border-neutral-400 focus:border-[#3b5048] py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors"
      />
    </div>

    {/* Message Box */}
    <div>
      <textarea
        name="message"
        rows={3}
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        required
        className="w-full bg-transparent border-0 border-b-[3px] border-neutral-400 focus:border-[#3b5048] p-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none transition-colors resize-none"
      />
    </div>

    {/* Submission Feedback & Send Button */}
    <div className="flex items-center justify-between pt-1">
      <div className="text-xs">
        {status.success && (
          <span className="text-emerald-700 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Message sent successfully!
          </span>
        )}

        {status.error && (
          <span className="text-red-600 font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            {status.error}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="font-bold text-sm tracking-wide text-[#3b5048] hover:text-[#dd9130] transition-colors cursor-pointer py-1 px-1 flex items-center gap-2 disabled:opacity-50"
      >
        {status.loading && (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        )}
        <span>Send</span>
      </button>
    </div>

  </form>
</motion.div>

          {/* Right Column: Personalized attention & Hours */}
         <motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="w-full lg:w-[240px] shrink-0 lg:pt-[65px]"
>
  <h3 className="text-base sm:text-lg font-bold text-[#dd9130] leading-snug">
    Personalized<br />
    attention for each<br />
    project.
  </h3>

  <div className="mt-5 space-y-3.5 text-sm">
    <div>
      <p className="font-bold text-black/60 font-extrabold leading-snug">
        Monday - Saturday:
      </p>
      <p className="text-neutral-500 leading-snug">
        10am - 6pm
      </p>
    </div>

    <div>
      <p className="font-bold text-black/60 font-extrabold leading-snug">
        Sundays:
      </p>
      <p className="text-neutral-500 leading-snug">
        11am - 4pm
      </p>
    </div>
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
}
