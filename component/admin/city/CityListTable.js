import React from 'react';
import { MapPin, Eye, Edit2, Trash2, Plus, Building2 } from 'lucide-react';

export default function CityListTable({
  cities,
  selectedCityId,
  onSelectCity,
  onEditCity,
  onDeleteCity,
  onAddCity,
}) {
  // Helper to format city name nicely (e.g. capitalize words)
  const formatCityName = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!cities || cities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3 stroke-[1.5]" />
        <h3 className="text-base font-semibold text-gray-800">No cities found</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
          No cities match your search criteria. Add a new city or clear your search to get started.
        </p>
        <button
          onClick={onAddCity}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B5A46] hover:bg-[#084A39] text-white text-xs font-medium rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New City</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[12px] font-semibold text-gray-400">
              <th className="py-4 px-6 font-medium">City</th>
              <th className="py-4 px-4 font-medium text-center">Properties</th>
              <th className="py-4 px-4 font-medium text-center">Available</th>
              <th className="py-4 px-4 font-medium text-center">Total Listings</th>
              <th className="py-4 px-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cities.map((city) => {
              const isSelected = selectedCityId === city.id;
              return (
                <tr
                  key={city.id}
                  className={`transition-colors relative group ${
                    isSelected
                      ? 'bg-emerald-50/40'
                      : 'hover:bg-gray-50/70'
                  }`}
                >
                  {/* City Column */}
                  <td className="py-4 px-6 relative">
                    {/* Active Indicator Bar */}
                    {isSelected && (
                      <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#0B5A46] rounded-r-full" />
                    )}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#0B5A46] text-white shadow-2xs'
                            : 'bg-gray-100 text-gray-500 group-hover:text-[#0B5A46]'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-[#1A1D20]">
                        {formatCityName(city.name)}
                      </span>
                    </div>
                  </td>

                  {/* Properties Count */}
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-bold text-gray-900">
                      {city.propertiesCount ?? 0}
                    </span>
                  </td>

                  {/* Available Count */}
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-bold text-gray-900">
                      {city.availableCount ?? 0}
                    </span>
                  </td>

                  {/* Total Listings */}
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-bold text-gray-900">
                      {city.totalListings ?? city.propertiesCount ?? 0}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-2">
                      {/* View Properties Button */}
                      <button
                        type="button"
                        onClick={() => onSelectCity(city)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B5A46] text-white shadow-2xs'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Properties</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEditCity(city)}
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-500 hover:text-[#0B5A46] hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
                        title="Edit city"
                        aria-label="Edit city"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDeleteCity(city)}
                        className="p-1.5 rounded-xl border border-red-100 bg-red-50/40 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
                        title="Delete city"
                        aria-label="Delete city"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (< md) */}
      <div className="md:hidden divide-y divide-gray-100">
        {cities.map((city) => {
          const isSelected = selectedCityId === city.id;
          return (
            <div
              key={city.id}
              className={`p-4 space-y-3 transition-colors ${
                isSelected ? 'bg-emerald-50/40 border-l-4 border-[#0B5A46]' : ''
              }`}
            >
              {/* Header: Icon, Name & Actions */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#0B5A46] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {formatCityName(city.name)}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditCity(city)}
                    className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                    aria-label="Edit city"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteCity(city)}
                    className="p-1 text-red-400 hover:text-red-600 rounded-lg"
                    aria-label="Delete city"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 bg-gray-50/80 p-2.5 rounded-xl text-center">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    Properties
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {city.propertiesCount ?? 0}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    Available
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {city.availableCount ?? 0}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    Listings
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {city.totalListings ?? city.propertiesCount ?? 0}
                  </span>
                </div>
              </div>

              {/* View Properties Mobile Button */}
              <button
                type="button"
                onClick={() => onSelectCity(city)}
                className={`w-full py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B5A46] text-white'
                    : 'border border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isSelected ? 'Viewing Properties' : 'View Properties'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
