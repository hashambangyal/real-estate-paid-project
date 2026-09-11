'use client';

import React from 'react';
import {
  Building2,
  Image as ImageIcon,
  Users,
  MapPin,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export default function PropertyMetricCards({ metrics, isLoading }) {
  const cards = [
    {
      label: 'Total Properties',
      value: metrics?.total?.count ?? 0,
      icon: Building2,
      iconColor: 'text-[#0B5A46]',
      iconBg: 'bg-[#0B5A46]/10',
      badge: metrics?.total?.change !== undefined ? (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          <TrendingUp className="w-3 h-3" />
          {metrics.total.change >= 0 ? `+${metrics.total.change}%` : `${metrics.total.change}%`}
        </span>
      ) : null,
      subtext: 'Active catalog listings',
    },
    {
      label: 'With Images',
      value: metrics?.withImages?.count ?? 0,
      icon: ImageIcon,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      badge: metrics?.withImages?.percentage !== undefined ? (
        <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
          {metrics.withImages.percentage}% of total
        </span>
      ) : null,
      subtext: 'Visual listings ready',
    },
    {
      label: 'With Agent',
      value: metrics?.withAgent?.count ?? 0,
      icon: Users,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      badge: metrics?.withAgent?.percentage !== undefined ? (
        <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
          {metrics.withAgent.percentage}% of total
        </span>
      ) : null,
      subtext: 'Assigned to realtors',
    },
    {
      label: 'With City',
      value: metrics?.withCity?.count ?? 0,
      icon: MapPin,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      badge: metrics?.withCity?.percentage !== undefined ? (
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          {metrics.withCity.percentage}% of total
        </span>
      ) : null,
      subtext: 'Geolocated properties',
    },
    {
      label: 'Missing Data',
      value: metrics?.missingData?.count ?? 0,
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      badge: metrics?.missingData?.percentage !== undefined ? (
        <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
          {metrics.missingData.percentage}% need info
        </span>
      ) : null,
      subtext: 'Attention required',
    },
  ];

  if (isLoading) {
    return (
      <div
        className="grid gap-3.5 sm:gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] animate-pulse flex flex-col justify-between h-[124px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-gray-100" />
              <div className="w-12 h-4 rounded-full bg-gray-100" />
            </div>
            <div>
              <div className="w-16 h-6 rounded bg-gray-100 mb-1" />
              <div className="w-24 h-3 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid gap-3.5 sm:gap-4"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100/80 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 flex flex-col justify-between relative overflow-hidden group min-w-0"
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200`}
              >
                <Icon className="w-4 h-4" />
              </div>
              {card.badge}
            </div>

            <div className="mt-3 min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-[#1A1D20] tracking-tight">
                {card.value.toLocaleString()}
              </div>
              <p className="text-xs font-medium text-gray-500 mt-0.5 truncate">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
