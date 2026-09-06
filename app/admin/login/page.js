"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Default to showing the error banner matching the provided design mockup,
  // but allow live interactive behavior.
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.error || "Login failed"
        );
      }


      router.push("/admin/dashboard");
      router.refresh();

    } catch (error) {

      setErrorMessage(error.message);

    } finally {

      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#1E242B]">
      {/* Background Image with subtle high-end atmospheric overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundPosition: 'center 42%',
        }}
      >
        {/* Very subtle gradient overlay to ensure contrast on all screen sizes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Top Header with Brand Logo & Typography */}
      <header className="relative z-10 w-full px-6 sm:px-12 md:px-16 pt-7 sm:pt-9 flex items-center justify-between">
        <div className="flex items-center gap-3.5 select-none">
          <img 
            src="/logo.png" 
            alt="Inmobiliaria Hersu" 
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm" 
          />
          <div className="flex flex-col justify-center">
            <span className="text-[9px] sm:text-[10px] tracking-[0.26em] font-medium text-[#1E2229] uppercase leading-tight font-sans">
              INMOBILIARIA
            </span>
            <span className="text-lg sm:text-xl tracking-[0.16em] font-serif text-[#1E2229] font-normal leading-tight mt-0.5">
              HERSU
            </span>
          </div>
        </div>        
      </header>

      {/* Main Content Area / Login Card */}
      <main className="relative z-10 w-full flex-1 flex items-center px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-12">
        <div className="w-full max-w-[440px] bg-white rounded-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-7 sm:p-9 md:p-10 border border-black/[0.03] transition-all">
          
          {/* Subheader: — AGENT LOGIN */}
          <div className="flex items-center gap-2 mb-2 text-[#7F8790]">
            <span className="w-4 h-[1.5px] bg-[#9CA3AF]"></span>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase font-sans text-[#6B7280]">
              AGENT LOGIN
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[32px] sm:text-[34px] leading-tight font-serif text-[#1A1D20] font-normal tracking-[-0.01em] mb-2">
            Welcome Back
          </h1>

          {/* Description */}
          <p className="text-[13.5px] text-[#6B7280] font-sans font-normal leading-relaxed mb-6">
            Please enter your credentials to access the agent portal.
          </p>

          {/* Success State Notification */}
          {isSuccess && (
            <div className="mb-5 flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Welcome back, Agent! Redirecting to your dashboard...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="email" 
                className="block text-[13px] font-medium text-[#22262C]"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                  <Mail className="w-[18px] h-[18px] stroke-[1.6]" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full h-11 pl-10 pr-3.5 bg-white text-[13.5px] text-[#1E2229] placeholder-[#9CA3AF] rounded-lg border border-[#E2E6EC] focus:border-[#22262C] focus:ring-1 focus:ring-[#22262C] transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="password" 
                className="block text-[13px] font-medium text-[#22262C]"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                  <Lock className="w-[18px] h-[18px] stroke-[1.6]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your password"
                  className="w-full h-11 pl-10 pr-10 bg-white text-[13.5px] text-[#1E2229] placeholder-[#9CA3AF] rounded-lg border border-[#E2E6EC] focus:border-[#22262C] focus:ring-1 focus:ring-[#22262C] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 flex items-center text-[#9CA3AF] hover:text-[#4B5563] transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px] stroke-[1.6]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px] stroke-[1.6]" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-0.5">
              <a 
                href="#forgot-password" 
                onClick={(e) => {
                  e.preventDefault();
                  alert('A password reset link will be sent to your registered email address.');
                }}
                className="text-[12.5px] text-[#374151] hover:text-[#111827] underline decoration-[#9CA3AF] underline-offset-2 hover:decoration-[#111827] transition-all font-normal"
              >
                Forgot password?
              </a>
            </div>

            {/* Error Notification Banner (matching the mockup design) */}
            {errorMessage && !isSuccess && (
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] transition-all">
                <AlertCircle className="w-[17px] h-[17px] text-[#DC2626] shrink-0 stroke-[2.2]" />
                <span className="text-[12.5px] text-[#DC2626] font-normal leading-tight">
                  {errorMessage}
                </span>
              </div>
            )}

            {/* Sign In Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#20252C] hover:bg-[#111418] active:bg-[#0D0F12] text-white text-[14px] font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Bottom Ornament Divider */}
          <div className="flex items-center justify-center gap-3 pt-6 mt-1">
            <div className="h-[1px] bg-[#E5E7EB] flex-1"></div>
            <div className="px-1 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Hersu Emblem" 
                className="w-6 h-6 object-contain opacity-70 grayscale-[30%]" 
              />
            </div>
            <div className="h-[1px] bg-[#E5E7EB] flex-1"></div>
          </div>

        </div>
      </main>

      {/* Footer / Copyright bar (subtle) */}
      <footer className="relative z-10 w-full px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/80 font-sans backdrop-blur-[2px] bg-black/10">
        <p>© {new Date().getFullYear()} Inmobiliaria Hersu. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors underline-offset-2 hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors underline-offset-2 hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors underline-offset-2 hover:underline">Agent Support</a>
        </div>
      </footer>
    </div>
  );
}
