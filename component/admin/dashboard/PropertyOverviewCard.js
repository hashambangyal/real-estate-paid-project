import React, { useState } from 'react';

export default function PropertyOverviewCard({ distributions, totalProperties = 0 }) {
  const [activeTab, setActiveTab] = useState('offer'); // 'offer' | 'type' | 'status'

  // Prepare active data slice based on tab
  let slices = [];
  let subtitle = '';

  if (activeTab === 'offer') {
    subtitle = 'Distribution by offer type (Sale vs Rent)';
    const sale = distributions?.offerType?.sale || { count: 0, percentage: 0 };
    const rent = distributions?.offerType?.rent || { count: 0, percentage: 0 };
    slices = [
      { label: 'For Sale', count: sale.count, percentage: sale.percentage, color: '#10B981' },
      { label: 'For Rent', count: rent.count, percentage: rent.percentage, color: '#3B82F6' },
    ];
  } else if (activeTab === 'type') {
    subtitle = 'Distribution by property kind';
    const kind = distributions?.kind || {};
    slices = [
      { label: 'Residential', count: kind.residential?.count || 0, percentage: kind.residential?.percentage || 0, color: '#3B82F6' },
      { label: 'Commercial', count: kind.commercial?.count || 0, percentage: kind.commercial?.percentage || 0, color: '#10B981' },
      { label: 'Land', count: kind.land?.count || 0, percentage: kind.land?.percentage || 0, color: '#F97316' },
      { label: 'Warehouse', count: kind.warehouse?.count || 0, percentage: kind.warehouse?.percentage || 0, color: '#8B5CF6' },
    ];
  } else {
    subtitle = 'Distribution by property status';
    const status = distributions?.status || {};
    slices = [
      { label: 'Available', count: status.available?.count || 0, percentage: status.available?.percentage || 0, color: '#10B981' },
      { label: 'Rented', count: status.rented?.count || 0, percentage: status.rented?.percentage || 0, color: '#3B82F6' },
      { label: 'Sold', count: status.sold?.count || 0, percentage: status.sold?.percentage || 0, color: '#6B7280' },
      { label: 'Reserved', count: status.reserved?.count || 0, percentage: status.reserved?.percentage || 0, color: '#F59E0B' },
    ];
  }

  // Calculate SVG donut stroke offsets
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#1A1D20]">
            Property Overview
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>

        {/* Tab toggles */}
        <div className="inline-flex items-center p-1 bg-gray-50 rounded-xl border border-gray-200/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('offer')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'offer'
                ? 'bg-[#0B5A46] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sale / Rent
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('type')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'type'
                ? 'bg-[#0B5A46] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Type
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-[#0B5A46] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Status
          </button>
        </div>
      </div>

      {/* Chart and Legend */}
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center xl:justify-around gap-6 py-2">
        {/* SVG Donut Chart */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background circle if total is 0 */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#F3F4F6"
              strokeWidth="22"
            />

            {/* Slices */}
            {slices.map((slice) => {
              const strokeLength = (slice.percentage / 100) * circumference;
              const strokeOffset = accumulatedOffset;
              accumulatedOffset -= strokeLength;

              if (slice.percentage <= 0) return null;

              return (
                <circle
                  key={slice.label}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth="22"
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-500 ease-out"
                />
              );
            })}
          </svg>

          {/* Donut Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-xl font-extrabold text-[#1A1D20] leading-none">
              {totalProperties}
            </span>
            <span className="text-[11px] font-medium text-gray-400 mt-1">
              Properties
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto min-w-0 sm:min-w-[170px] max-w-xs">
          {slices.map((slice) => (
            <div key={slice.label} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-gray-700 font-medium truncate">{slice.label}</span>
              </div>
              <div className="text-gray-500 shrink-0">
                <strong className="text-gray-900 font-semibold">{slice.count}</strong>{' '}
                <span className="text-[11px] text-gray-400">({slice.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
