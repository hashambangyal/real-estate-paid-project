'use client';

import React from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Edit2,
  Trash2,
  Building2,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Image as ImageIcon,
} from 'lucide-react';

export default function PropertiesTable({
  properties = [],
  pagination = {},
  isLoading = false,
  filters = {},
  onFilterChange,
  onAddProperty,
  onEditProperty,
  onDeleteProperty,
  onClearFilters,
}) {
  const {
    search = '',
    kind = '',
    status = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    missingFilter = null,
    page = 1,
  } = filters;

  const totalPages = pagination?.totalPages || 1;
  const total = pagination?.total || 0;
  const limit = pagination?.limit || 12;
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Status Badge Styling
  const getStatusBadge = (statusValue) => {
    switch (statusValue) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Available
          </span>
        );
      case 'SOLD':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
            Sold
          </span>
        );
      case 'RENTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
            Rented
          </span>
        );
      case 'RESERVED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
            Reserved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-50 text-gray-600 border border-gray-200">
            {statusValue || 'Unknown'}
          </span>
        );
    }
  };

  // Kind Badge Styling
  const getKindBadge = (kindValue) => {
    switch (kindValue) {
      case 'RESIDENTIAL':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
            Residential
          </span>
        );
      case 'COMMERCIAL':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            Commercial
          </span>
        );
      case 'LAND':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
            Land
          </span>
        );
      case 'WAREHOUSE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-100">
            Warehouse
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700">
            {kindValue || 'Property'}
          </span>
        );
    }
  };

  const getMissingFilterLabel = (mf) => {
    switch (mf) {
      case 'no_images':
        return 'Properties without Images';
      case 'no_agent':
        return 'Properties without Agent';
      case 'no_city':
        return 'Properties without City';
      case 'incomplete':
        return 'Incomplete Details';
      default:
        return mf;
    }
  };

  const hasActiveFilters = Boolean(
    search || kind || status || missingFilter
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden font-sans">
      {/* ---------------- Toolbar Header ---------------- */}
      <div className="p-5 sm:p-6 border-b border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-[#1A1D20]">
                Properties List
              </h2>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {total}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Search, filter, edit, or create new listings
            </p>
          </div>

          {/* Add Property Button */}
          <button
            type="button"
            onClick={onAddProperty}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B5A46] hover:bg-[#084435] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Filters Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-2.5">
          {/* Search Input */}
          <div className="relative sm:col-span-2 lg:col-span-5">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search properties by title, address..."
              value={search}
              onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
              className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] transition-all placeholder:text-gray-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => onFilterChange({ search: '', page: 1 })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="lg:col-span-2">
            <select
              value={kind}
              onChange={(e) => onFilterChange({ kind: e.target.value, page: 1 })}
              className="w-full px-3 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] text-gray-700 transition-all cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="LAND">Land</option>
              <option value="WAREHOUSE">Warehouse</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={status}
              onChange={(e) => onFilterChange({ status: e.target.value, page: 1 })}
              className="w-full px-3 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] text-gray-700 transition-all cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
              <option value="RESERVED">Reserved</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={`${sortBy}:${sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split(':');
                onFilterChange({ sortBy: sb, sortOrder: so, page: 1 });
              }}
              className="w-full px-3 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] text-gray-700 transition-all cursor-pointer"
            >
              <option value="createdAt:desc">Sort: Newest First</option>
              <option value="createdAt:asc">Sort: Oldest First</option>
              <option value="price:desc">Sort: Price (High to Low)</option>
              <option value="price:asc">Sort: Price (Low to High)</option>
              <option value="title:asc">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips Banner */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-gray-400 font-medium">Active filters:</span>

            {missingFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0B5A46]/10 text-[#0B5A46] border border-[#0B5A46]/20">
                <span>Filter: {getMissingFilterLabel(missingFilter)}</span>
                <button
                  type="button"
                  onClick={() => onFilterChange({ missingFilter: null, page: 1 })}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {search && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                <span>Search: &quot;{search}&quot;</span>
                <button
                  type="button"
                  onClick={() => onFilterChange({ search: '', page: 1 })}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {kind && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                <span>Type: {kind}</span>
                <button
                  type="button"
                  onClick={() => onFilterChange({ kind: '', page: 1 })}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {status && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                <span>Status: {status}</span>
                <button
                  type="button"
                  onClick={() => onFilterChange({ status: '', page: 1 })}
                  className="hover:text-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium ml-1 cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* ---------------- Loading State ---------------- */}
      {isLoading ? (
        <div className="p-8 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-50 rounded-xl animate-pulse flex items-center justify-between px-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="space-y-2">
                  <div className="w-40 h-3 bg-gray-200 rounded" />
                  <div className="w-24 h-2.5 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        /* ---------------- Empty State ---------------- */
        <div className="py-16 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            No properties found
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            {hasActiveFilters
              ? 'No properties match your current filters. Try changing or clearing your search criteria.'
              : 'Start by adding your first property to the catalog.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={onClearFilters}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            ) : (
              <button
                type="button"
                onClick={onAddProperty}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B5A46] hover:bg-[#084435] rounded-xl transition-colors cursor-pointer"
              >
                Add Property
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* ---------------- Desktop Table (md+) ---------------- */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 pl-6 pr-4">Property</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Agent</th>
                  <th className="py-3.5 px-4">Added</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {properties.map((prop) => {
                  const coverImage =
                    prop.images?.find((img) => img.isCover)?.url ||
                    prop.images?.[0]?.url;

                  return (
                    <tr
                      key={prop.id}
                      className="hover:bg-gray-50/60 transition-colors group"
                    >
                      {/* Property Info */}
                      <td className="py-3.5 pl-6 pr-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200/60 flex items-center justify-center relative">
                            {coverImage ? (
                              <img
                                src={coverImage}
                                alt={prop.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                <ImageIcon className="w-5 h-5" />
                                <span className="text-[8px] mt-0.5">No photo</span>
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 max-w-xs">
                            <h4 className="font-bold text-[#1A1D20] truncate text-xs hover:text-[#0B5A46] transition-colors">
                              {prop.title}
                            </h4>

                            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5 truncate">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {prop.address || (prop.city ? prop.city.name : 'No location specified')}
                              </span>
                            </div>

                            {/* Specs badges */}
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                              {prop.bedrooms != null && (
                                <span className="inline-flex items-center gap-0.5">
                                  <Bed className="w-3 h-3 text-gray-400" />
                                  {prop.bedrooms} bed
                                </span>
                              )}
                              {prop.bathrooms != null && (
                                <span className="inline-flex items-center gap-0.5">
                                  <Bath className="w-3 h-3 text-gray-400" />
                                  {Number(prop.bathrooms)} bath
                                </span>
                              )}
                              {prop.sizeM2 != null && (
                                <span className="inline-flex items-center gap-0.5">
                                  <Maximize2 className="w-2.5 h-2.5 text-gray-400" />
                                  {Number(prop.sizeM2)} m²
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getKindBadge(prop.kind)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(prop.status)}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-[#1A1D20]">
                          ${Number(prop.price).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {prop.offerType === 'RENT' ? 'For Rent / mo' : 'For Sale'} ({prop.currency || 'MXN'})
                        </div>
                      </td>

                      {/* Agent */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {prop.agent ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200/60 overflow-hidden flex items-center justify-center shrink-0">
                              {prop.agent.avatarUrl ? (
                                <img
                                  src={prop.agent.avatarUrl}
                                  alt={prop.agent.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-[10px] font-bold text-[#0B5A46]">
                                  {prop.agent.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <span className="font-medium text-gray-800 text-xs">
                              {prop.agent.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Added Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-gray-500 text-[11px]">
                        {prop.createdAt
                          ? new Date(prop.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 pl-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onEditProperty(prop)}
                            className="p-1.5 text-gray-400 hover:text-[#0B5A46] hover:bg-[#0B5A46]/10 rounded-lg transition-colors cursor-pointer"
                            title="Edit property"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteProperty(prop)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete property"
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

          {/* ---------------- Mobile Card List (< md) ---------------- */}
          <div className="md:hidden divide-y divide-gray-100">
            {properties.map((prop) => {
              const coverImage =
                prop.images?.find((img) => img.isCover)?.url ||
                prop.images?.[0]?.url;

              return (
                <div key={prop.id} className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200/60 flex items-center justify-center relative">
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-[8px] mt-0.5">No photo</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-[#1A1D20] text-xs leading-tight line-clamp-2">
                          {prop.title}
                        </h4>
                        <div className="shrink-0">
                          {getStatusBadge(prop.status)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {prop.address || (prop.city ? prop.city.name : 'No location specified')}
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="font-extrabold text-[#1A1D20] text-sm">
                          ${Number(prop.price).toLocaleString()}{' '}
                          <span className="text-[10px] text-gray-400 font-normal">
                            {prop.currency || 'MXN'}
                          </span>
                        </span>
                        {getKindBadge(prop.kind)}
                      </div>
                    </div>
                  </div>

                  {/* Specs & Agent Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[11px] text-gray-500">
                    <div className="flex items-center gap-2.5">
                      {prop.bedrooms != null && (
                        <span className="inline-flex items-center gap-0.5">
                          <Bed className="w-3 h-3 text-gray-400" />
                          {prop.bedrooms} bed
                        </span>
                      )}
                      {prop.bathrooms != null && (
                        <span className="inline-flex items-center gap-0.5">
                          <Bath className="w-3 h-3 text-gray-400" />
                          {Number(prop.bathrooms)} bath
                        </span>
                      )}
                      {prop.sizeM2 != null && (
                        <span className="inline-flex items-center gap-0.5">
                          <Maximize2 className="w-2.5 h-2.5 text-gray-400" />
                          {Number(prop.sizeM2)}m²
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEditProperty(prop)}
                        className="px-2.5 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProperty(prop)}
                        className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- Pagination Footer ---------------- */}
          <div className="p-4 sm:px-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
            <div>
              Showing <span className="font-semibold text-gray-800">{startItem}</span> to{' '}
              <span className="font-semibold text-gray-800">{endItem}</span> of{' '}
              <span className="font-semibold text-gray-800">{total}</span> properties
            </div>

            <div className="inline-flex items-center gap-1 self-center sm:self-auto">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => onFilterChange({ page: page - 1 })}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                let pageNum = idx + 1;
                if (totalPages > 5 && page > 3) {
                  pageNum = Math.min(page - 2 + idx, totalPages - 4 + idx);
                }
                const isActive = page === pageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => onFilterChange({ page: pageNum })}
                    className={`min-w-[28px] h-7 px-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0B5A46] text-white'
                        : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onFilterChange({ page: page + 1 })}
                className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
