import React from 'react';

export default function PropertyTypeDistributionCard({ distributions, totalProperties = 0 }) {
  const kind = distributions?.kind || {};

  const slices = [
    {
      label: 'Residential',
      count: kind.residential?.count || 0,
      percentage: kind.residential?.percentage || 0,
      color: '#3B82F6', // Blue
    },
    {
      label: 'Commercial',
      count: kind.commercial?.count || 0,
      percentage: kind.commercial?.percentage || 0,
      color: '#10B981', // Green
    },
    {
      label: 'Land',
      count: kind.land?.count || 0,
      percentage: kind.land?.percentage || 0,
      color: '#F97316', // Orange
    },
    {
      label: 'Warehouse',
      count: kind.warehouse?.count || 0,
      percentage: kind.warehouse?.percentage || 0,
      color: '#8B5CF6', // Purple
    },
  ];

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6">
      {/* Card Header */}
      <div>
        <h2 className="text-base font-bold text-[#1A1D20]">
          Property Type Distribution
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Based on total properties</p>
      </div>

      {/* Chart and Legend */}
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center xl:justify-around gap-6 py-2">
        {/* SVG Donut Chart */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#F3F4F6"
              strokeWidth="22"
            />

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

          {/* Donut Center */}
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
