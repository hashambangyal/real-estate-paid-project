'use client';

import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

export default function PropertyTipWidget() {
  return (
    <div className="bg-gradient-to-br from-[#0B5A46]/10 via-[#0B5A46]/5 to-transparent border border-[#0B5A46]/20 rounded-2xl p-5 sm:p-6 flex flex-col justify-center gap-3.5 shadow-xs h-full">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#0B5A46] text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-[#0B5A46] uppercase tracking-wider">
              Listing Optimization Tip
            </h4>
            <Sparkles className="w-3 h-3 text-[#0B5A46]" />
          </div>
          <span className="text-[11px] text-gray-400">Best practices for higher conversions</span>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">
        Listings featuring at least <strong>5 high-resolution photos</strong>, an assigned agent, and detailed specifications receive up to <strong>3x more views</strong> and generate significantly more verified inquiries.
      </p>
    </div>
  );
}
