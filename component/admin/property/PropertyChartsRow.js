'use client';

import React, { useState } from 'react';
import { Calendar, Layers } from 'lucide-react';

export default function PropertyChartsRow({
  addedOverTime = [],
  byType = {},
  totalProperties = 0,
  timeframe = '7d',
  onTimeframeChange,
  isLoading = false,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // ----------------------------------------------------
  // Donut Chart calculations
  // ----------------------------------------------------
  const typeSlices = [
    {
      label: 'Residential',
      count: byType?.residential?.count || 0,
      percentage: byType?.residential?.percentage || 0,
      color: '#3B82F6',
    },
    {
      label: 'Commercial',
      count: byType?.commercial?.count || 0,
      percentage: byType?.commercial?.percentage || 0,
      color: '#10B981',
    },
    {
      label: 'Land',
      count: byType?.land?.count || 0,
      percentage: byType?.land?.percentage || 0,
      color: '#F97316',
    },
    {
      label: 'Warehouse',
      count: byType?.warehouse?.count || 0,
      percentage: byType?.warehouse?.percentage || 0,
      color: '#8B5CF6',
    },
  ];

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  // ----------------------------------------------------
  // Line Chart calculations
  // ----------------------------------------------------
  const chartWidth = 500;
  const chartHeight = 160;
  const paddingX = 35;
  const paddingY = 25;

  const maxCount = Math.max(
    5,
    ...(addedOverTime?.map((p) => p.count) || [0])
  );

  const points = (addedOverTime || []).map((point, index) => {
    const totalPoints = addedOverTime.length;
    const x =
      totalPoints <= 1
        ? chartWidth / 2
        : paddingX + (index / (totalPoints - 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      (point.count / maxCount) * (chartHeight - paddingY * 2);
    return { ...point, x, y };
  });

  const pathD =
    points.length > 0
      ? points.reduce(
          (acc, pt, i) =>
            i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`,
          ''
        )
      : '';

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x},${chartHeight - paddingY} L ${
          points[0].x
        },${chartHeight - paddingY} Z`
      : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
      {/* ---------------- Chart 1: Added Over Time ---------------- */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0B5A46]" />
              <h3 className="text-base font-bold text-[#1A1D20]">
                Properties Added Over Time
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              New property listings added to the platform
            </p>
          </div>

          {/* Timeframe pill selector */}
          <div className="inline-flex items-center p-0.5 bg-gray-100/80 rounded-xl border border-gray-200/60 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onTimeframeChange?.('7d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === '7d'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => onTimeframeChange?.('30d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                timeframe === '30d'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Chart SVG */}
        <div className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full h-full bg-gray-50/70 rounded-xl animate-pulse flex items-center justify-center text-xs text-gray-400">
              Loading timeline...
            </div>
          ) : points.length === 0 ? (
            <div className="text-xs text-gray-400">No data available</div>
          ) : (
            <div className="w-full h-full relative">
              <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="propertyLineGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#0B5A46"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="#0B5A46"
                      stopOpacity="0.0"
                    />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0, 0.5, 1].map((ratio) => {
                  const y =
                    chartHeight -
                    paddingY -
                    ratio * (chartHeight - paddingY * 2);
                  return (
                    <line
                      key={ratio}
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#F3F4F6"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Shaded Area */}
                <path d={areaD} fill="url(#propertyLineGradient)" />

                {/* Smooth/Polyline */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#0B5A46"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {points.map((pt, i) => (
                  <g key={i} className="cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPoint === i ? 6 : 3.5}
                      fill="#FFFFFF"
                      stroke="#0B5A46"
                      strokeWidth={hoveredPoint === i ? 3 : 2}
                      className="transition-all duration-150"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                ))}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredPoint !== null && points[hoveredPoint] && (
                <div
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-[#1A1D20] text-white text-[11px] py-1 px-2.5 rounded-lg shadow-lg z-20 whitespace-nowrap"
                  style={{
                    left: `${(points[hoveredPoint].x / chartWidth) * 100}%`,
                    top: `${(points[hoveredPoint].y / chartHeight) * 100}%`,
                  }}
                >
                  <span className="font-bold">{points[hoveredPoint].count} properties</span>
                  <span className="text-gray-300 ml-1.5 font-normal">
                    ({points[hoveredPoint].label})
                  </span>
                </div>
              )}

              {/* X Axis Labels */}
              <div className="flex justify-between items-center text-[10px] text-gray-400 px-3 mt-1 select-none">
                {points
                  .filter((_, i) =>
                    timeframe === '30d'
                      ? i % 5 === 0 || i === points.length - 1
                      : true
                  )
                  .map((p, i) => (
                    <span key={i} className="truncate">
                      {p.label}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Chart 2: Properties by Type ---------------- */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h3 className="text-base font-bold text-[#1A1D20]">
              Properties by Type
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Category distribution across all listings
          </p>
        </div>

        {/* Donut Chart & Legend */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-3 my-auto">
          {/* Donut Graphic */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 origin-center" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="#F3F4F6"
                strokeWidth="18"
              />

              {(() => {
                let currentOffset = 0;
                return typeSlices.map((slice) => {
                  const strokeLength = (slice.percentage / 100) * circumference;
                  const strokeOffset = currentOffset;
                  currentOffset -= strokeLength;

                  if (slice.percentage <= 0) return null;

                return (
                  <circle
                    key={slice.label}
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="18"
                    strokeDasharray={`${strokeLength} ${circumference}`}
                    strokeDashoffset={strokeOffset}
                    className="transition-all duration-500 ease-out"
                  />
                );
              });
            })()}
          </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="text-lg sm:text-xl font-black text-[#1A1D20] leading-none">
                {totalProperties}
              </span>
              <span className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wider">
                Listings
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2.5 w-full sm:w-auto min-w-[150px]">
            {typeSlices.map((slice) => (
              <div
                key={slice.label}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="text-gray-700 font-medium">
                    {slice.label}
                  </span>
                </div>
                <div className="text-right text-gray-500">
                  <strong className="text-gray-900 font-semibold">
                    {slice.count}
                  </strong>{' '}
                  <span className="text-[11px] text-gray-400">
                    ({slice.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
