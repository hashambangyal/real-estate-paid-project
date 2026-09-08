import React, { useState, useMemo } from 'react';
import { MapPin, Search, ChevronDown, Info, Loader2, Home } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function CityPropertiesSection({
  selectedCity,
  properties,
  isLoadingProperties,
}) {
  const [propertySearch, setPropertySearch] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price_asc' | 'price_desc'

  const formatCityName = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    if (!properties) return [];

    let list = properties.filter((p) => {
      const q = propertySearch.toLowerCase().trim();
      if (!q) return true;
      return (
        p.title?.toLowerCase().includes(q) ||
        p.address?.toLowerCase().includes(q) ||
        p.kind?.toLowerCase().includes(q) ||
        p.offerType?.toLowerCase().includes(q)
      );
    });

    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price_asc') {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [properties, propertySearch, sortBy]);

  if (!selectedCity) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500 shadow-2xs">
        <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-2" />
        <p className="text-sm font-medium">Please select a city to view its properties.</p>
      </div>
    );
  }

  const cityName = formatCityName(selectedCity.name);
  const totalCount = selectedCity.propertiesCount ?? properties?.length ?? 0;
  const availableCount = selectedCity.availableCount ?? properties?.filter((p) => p.status === 'AVAILABLE').length ?? 0;
  const totalListings = selectedCity.totalListings ?? totalCount;

  // City cover fallback
  const cityCover = selectedCity.coverImage ||
    (properties && properties.length > 0 && properties[0]?.images?.[0]?.url) ||
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800';

  return (
    <div id="city-properties-section" className="space-y-6 pt-2">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B5A46] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1D20] tracking-tight">
              Properties in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-[#718096] mt-0.5 font-normal">
              Showing {filteredAndSortedProperties.length} properties in this city
            </p>
          </div>
        </div>

        {/* Right Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search inside this city */}
          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              placeholder="Search properties in this city..."
              className="w-full h-10 pl-10 pr-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all shadow-2xs"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 pl-3.5 pr-8 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-[#0B5A46] cursor-pointer appearance-none shadow-2xs w-full"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price_asc">Sort by: Price (Low to High)</option>
              <option value="price_desc">Sort by: Price (High to Low)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Layout: City Summary Card (Left) + Properties Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: City Overview Summary Card (takes 3 or 4 cols on lg) */}
        <div className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 sticky top-6">
          {/* City Image */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 shadow-2xs">
            <img
              src={cityCover}
              alt={cityName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>

          {/* City Name & Region */}
          <div>
            <h3 className="text-lg font-bold text-[#1A1D20] leading-snug">
              {cityName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>Sonora, México</span>
            </div>
          </div>

          {/* 3 Metric Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
            <div>
              <span className="text-xl font-extrabold text-gray-900 block leading-tight">
                {totalCount}
              </span>
              <span className="text-[10.5px] font-medium text-gray-400 mt-0.5 block">
                Total Properties
              </span>
            </div>

            <div>
              <span className="text-xl font-extrabold text-gray-900 block leading-tight">
                {availableCount}
              </span>
              <span className="text-[10.5px] font-medium text-gray-400 mt-0.5 block">
                Available
              </span>
            </div>

            <div>
              <span className="text-xl font-extrabold text-gray-900 block leading-tight">
                {totalListings}
              </span>
              <span className="text-[10.5px] font-medium text-gray-400 mt-0.5 block">
                Total Listings
              </span>
            </div>
          </div>

          {/* Informational Callout Box */}
          <div className="p-3 bg-[#EAF7F3] border border-[#C5E9DE] rounded-xl flex items-start gap-2.5 text-[#0B5A46]">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-[11.5px] font-medium leading-relaxed">
              This city has <strong className="font-bold">{availableCount} available</strong> properties out of <strong className="font-bold">{totalListings} total</strong> listings.
            </p>
          </div>
        </div>

        {/* Right: Properties Grid (takes 8 or 9 cols on lg) */}
        <div className="lg:col-span-8 xl:col-span-9">
          {isLoadingProperties ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center gap-3 shadow-2xs">
              <Loader2 className="w-8 h-8 text-[#0B5A46] animate-spin" />
              <span className="text-xs text-gray-500 font-medium">Loading properties for {cityName}...</span>
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center shadow-2xs space-y-3">
              <Home className="w-12 h-12 text-gray-300 mx-auto stroke-[1.5]" />
              <h4 className="text-base font-semibold text-gray-800">
                No properties in {cityName}
              </h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                No properties match your current filters or query for this city. Add properties or adjust filter settings above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredAndSortedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
