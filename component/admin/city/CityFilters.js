import React from 'react';
import { Search } from 'lucide-react';

export default function CityFilters({
  searchTerm,
  onSearchChange,
  offerType,
  onOfferTypeChange,
  propertyKind,
  onPropertyKindChange,
  status,
  onStatusChange,
}) {
  const offerTypeOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Sale', value: 'SALE' },
    { label: 'Rent', value: 'RENT' },
  ];

  const kindOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Residential', value: 'RESIDENTIAL' },
    { label: 'Commercial', value: 'COMMERCIAL' },
    { label: 'Land', value: 'LAND' },
    { label: 'Warehouse', value: 'WAREHOUSE' },
  ];

  const statusOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Sold', value: 'SOLD' },
    { label: 'Rented', value: 'RENTED' },
    { label: 'Reserved', value: 'RESERVED' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4 justify-between">
        
        {/* Search cities input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search cities..."
            className="w-full h-10 pl-10 pr-4 bg-gray-50/70 border border-gray-200/80 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all"
          />
        </div>

        {/* Filter Pill Groups Container */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 overflow-x-auto pb-1 xl:pb-0">
          
          {/* Offer Type Group */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-medium text-gray-400">
              Offer Type
            </span>
            <div className="inline-flex items-center gap-1 p-1 bg-gray-50 rounded-xl border border-gray-200/60">
              {offerTypeOptions.map((opt) => {
                const isActive = offerType === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onOfferTypeChange(opt.value)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0B5A46] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property Kind Group */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-medium text-gray-400">
              Property Kind
            </span>
            <div className="inline-flex items-center gap-1 p-1 bg-gray-50 rounded-xl border border-gray-200/60">
              {kindOptions.map((opt) => {
                const isActive = propertyKind === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onPropertyKindChange(opt.value)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0B5A46] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Group */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-medium text-gray-400">
              Status
            </span>
            <div className="inline-flex items-center gap-1 p-1 bg-gray-50 rounded-xl border border-gray-200/60">
              {statusOptions.map((opt) => {
                const isActive = status === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onStatusChange(opt.value)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0B5A46] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
