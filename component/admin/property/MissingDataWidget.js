'use client';

import React from 'react';
import { AlertCircle, Camera, UserX, MapPinOff, FileQuestion } from 'lucide-react';

export default function MissingDataWidget({
  breakdown = {},
  totalProperties = 0,
  isLoading = false,
}) {
  const getPercent = (count) => {
    if (!totalProperties || totalProperties === 0) return 0;
    return Math.min(100, Math.round((count / totalProperties) * 100));
  };

  const items = [
    {
      label: 'No Images Uploaded',
      count: breakdown?.noImages || 0,
      percent: getPercent(breakdown?.noImages || 0),
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      textColor: 'text-amber-700',
      icon: Camera,
    },
    {
      label: 'No Agent Assigned',
      count: breakdown?.noAgent || 0,
      percent: getPercent(breakdown?.noAgent || 0),
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: UserX,
    },
    {
      label: 'No City Assigned',
      count: breakdown?.noCity || 0,
      percent: getPercent(breakdown?.noCity || 0),
      color: 'bg-rose-500',
      lightBg: 'bg-rose-50',
      textColor: 'text-rose-700',
      icon: MapPinOff,
    },
    {
      label: 'Incomplete Details',
      count: breakdown?.incompleteDetails || 0,
      percent: getPercent(breakdown?.incompleteDetails || 0),
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-700',
      icon: FileQuestion,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-base font-bold text-[#1A1D20]">
              Missing / Incomplete Data
            </h3>
          </div>
          <AlertCircle className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 mt-0.5">
          Health summary of listings requiring data completion
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="w-32 h-3 bg-gray-100 rounded" />
                <div className="w-8 h-3 bg-gray-100 rounded" />
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${item.textColor}`} />
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900">
                      {item.count}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      ({item.percent}%)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
