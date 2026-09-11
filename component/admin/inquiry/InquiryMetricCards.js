'use client';

import React from 'react';
import { Mail, Clock, Calendar, Users, TrendingUp } from 'lucide-react';

export default function InquiryMetricCards({ stats, isLoading }) {
  const cards = [
    {
      title: 'Total Inquiries',
      value: stats?.totalInquiries?.value ?? 0,
      change: stats?.totalInquiries?.change ?? '+0%',
      period: stats?.totalInquiries?.period ?? 'vs. last 30 days',
      icon: Mail,
      iconBg: 'bg-emerald-50 text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'This Week',
      value: stats?.thisWeek?.value ?? 0,
      change: stats?.thisWeek?.change ?? '+0%',
      period: stats?.thisWeek?.period ?? 'vs. last week',
      icon: Clock,
      iconBg: 'bg-blue-50 text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Today',
      value: stats?.today?.value ?? 0,
      change: stats?.today?.change ?? '+0%',
      period: stats?.today?.period ?? 'vs. yesterday',
      icon: Calendar,
      iconBg: 'bg-purple-50 text-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700',
    },
    {
      title: 'Unique Users',
      value: stats?.uniqueUsers?.value ?? 0,
      change: stats?.uniqueUsers?.change ?? '+0%',
      period: stats?.uniqueUsers?.period ?? 'vs. last 30 days',
      icon: Users,
      iconBg: 'bg-amber-50 text-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col justify-between h-32"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="w-10 h-10 bg-gray-100 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-7 w-20 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = !card.change.startsWith('-');
        return (
          <div
            key={card.title}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-gray-500">{card.title}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
              </div>

              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${card.badgeBg}`}
                >
                  <TrendingUp className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`} />
                  {card.change}
                </span>
                <span className="text-xs text-gray-400 font-normal">{card.period}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
