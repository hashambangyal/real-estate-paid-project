import React from 'react';
import { MapPin } from 'lucide-react';

export default function CityWisePropertiesCard({ cities = [] }) {
  const formatCityName = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-[#1A1D20]">
          City-wise Properties
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Top cities by number of properties</p>
      </div>

      {/* List */}
      {cities.length === 0 ? (
        <div className="py-10 text-center text-gray-400 text-xs">
          No cities recorded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {cities.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                {/* City name with icon */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0B5A46] flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-gray-800">
                    {formatCityName(item.name)}
                  </span>
                </div>

                {/* Count */}
                <span className="font-bold text-gray-900">
                  {item.count}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0B5A46] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(item.percentage, 6)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
