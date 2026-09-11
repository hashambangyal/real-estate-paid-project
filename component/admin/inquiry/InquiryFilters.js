'use client';

import React from 'react';
import { Search, Download, Mail, X, Filter } from 'lucide-react';

export default function InquiryFilters({
  filters,
  onFilterChange,
  onResetFilters,
  onExportCsv,
  isExporting,
  totalCount,
}) {
  const hasActiveFilters =
    filters.search ||
    filters.status ||
    filters.dateFilter ||
    filters.sortBy !== 'createdAt' ||
    filters.sortOrder !== 'desc';

  return (
    <div className="space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0B6051] flex items-center justify-center text-white shadow-sm shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif tracking-tight">
              Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              View and manage all customer inquiries
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onExportCsv}
          disabled={isExporting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B6051] hover:bg-[#094d41] text-white text-sm font-medium transition-colors shadow-sm disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search by name, email, or property..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] transition-all text-gray-900 placeholder:text-gray-400"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:w-auto">
            {/* Status Dropdown */}
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REPLIED">Replied</option>
              <option value="CLOSED">Closed</option>
            </select>

            {/* Date Range Dropdown */}
            <select
              value={filters.dateFilter}
              onChange={(e) => onFilterChange('dateFilter', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] cursor-pointer"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={`${filters.sortBy}:${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split(':');
                onFilterChange('sort', { sortBy, sortOrder });
              }}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] cursor-pointer"
            >
              <option value="createdAt:desc">Newest First</option>
              <option value="createdAt:asc">Oldest First</option>
              <option value="name:asc">Name (A - Z)</option>
              <option value="name:desc">Name (Z - A)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-2 text-gray-500">
              <Filter className="w-3.5 h-3.5 text-[#0B6051]" />
              <span>Filters active ({totalCount ?? 0} results found)</span>
            </div>
            <button
              type="button"
              onClick={onResetFilters}
              className="text-[#0B6051] hover:underline font-medium cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
