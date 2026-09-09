import React from 'react';
import { Home, Users, MapPin, MessageSquare, TrendingUp } from 'lucide-react';

export default function DashboardStatCards({ metrics }) {
  const cards = [
    {
      title: 'Total Properties',
      value: metrics?.properties?.total ?? 0,
      growth: metrics?.properties?.growth ?? 12,
      bgColor: 'bg-[#10B981]', // Bright emerald green
      icon: Home,
      iconColor: 'text-[#10B981]',
    },
    {
      title: 'Total Agents',
      value: metrics?.agents?.total ?? 0,
      growth: metrics?.agents?.growth ?? 8,
      bgColor: 'bg-[#3B82F6]', // Bright blue
      icon: Users,
      iconColor: 'text-[#3B82F6]',
    },
    {
      title: 'Total Cities',
      value: metrics?.cities?.total ?? 0,
      growth: metrics?.cities?.growth ?? 5,
      bgColor: 'bg-[#8B5CF6]', // Purple
      icon: MapPin,
      iconColor: 'text-[#8B5CF6]',
    },
    {
      title: 'Total Inquiries',
      value: metrics?.inquiries?.total ?? 0,
      growth: metrics?.inquiries?.growth ?? 26,
      bgColor: 'bg-[#F97316]', // Vibrant orange
      icon: MessageSquare,
      iconColor: 'text-[#F97316]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`${card.bgColor} rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden transition-transform hover:-translate-y-0.5`}
          >
            {/* Top row: Icon and Title */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0">
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/90">
                {card.title}
              </span>
            </div>

            {/* Bottom row: Large Count & Growth Pill */}
            <div className="flex flex-wrap items-baseline justify-between gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {card.value}
              </span>

              <div className="flex items-center gap-1 text-[11px] font-medium text-white/90 bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-xs shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{card.growth}% vs last 30 days</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
