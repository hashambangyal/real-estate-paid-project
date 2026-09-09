import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function RecentInquiriesCard({ inquiries = [] }) {


  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-[#1A1D20]">
          Recent Inquiries
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Latest customer inquiries</p>
      </div>

      {/* List */}
      {inquiries.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-xs">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p>No customer inquiries yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {inquiries.map((inq) => (
            <div key={inq.id} className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
              {/* Left: Avatar & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0B5A46] to-emerald-400 text-white font-semibold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {getInitials(inq.name)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {inq.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 truncate">
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate">{inq.email}</span>
                  </div>
                </div>
              </div>

              {/* Right: Message snippet & Date */}
              <div className="text-right shrink-0">
                <p className="text-[11px] font-medium text-gray-600 max-w-[110px] truncate">
                  {inq.message || 'General Inquiry'}
                </p>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {inq.posted || 'Recently'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
