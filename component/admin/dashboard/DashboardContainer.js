'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  MapPin,
  Users,
  LayoutGrid,
  Calendar,
  Loader2,
  ChevronDown,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../Sidebar';
import DashboardStatCards from './DashboardStatCards';
import PropertyOverviewCard from './PropertyOverviewCard';
import PropertyTypeDistributionCard from './PropertyTypeDistributionCard';
import RecentPropertiesCard from './RecentPropertiesCard';
import CityWisePropertiesCard from './CityWisePropertiesCard';
import RecentInquiriesCard from './RecentInquiriesCard';

export default function DashboardContainer() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('30d');

  // Fetch dashboard stats on mount
  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const res = await fetch('/api/dashboard/stats');
        if (!res.ok) throw new Error('Failed to load dashboard statistics');
        const data = await res.json();
        if (!ignore) {
          setStats(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Fetch dashboard stats error:', err);
          setError('Unable to load dashboard data. Please refresh.');
          setIsLoading(false);
        }
      }
    }

    loadStats();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar activeItem="Dashboard" />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full flex">
          <Sidebar activeItem="Dashboard" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-3 p-1.5 rounded-lg text-gray-500 hover:text-gray-900 bg-gray-100 lg:hidden cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Mobile Top Navigation Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-serif font-bold text-gray-800">
            INMOBILIARIA HERSU
          </span>
          <div className="w-8" />
        </div>

        {/* Dashboard Content Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-7 max-w-7xl mx-auto w-full">
          {/* Top Header Row */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl lg:text-[28px] font-bold text-[#1A1D20] tracking-tight">
                Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[#718096] mt-0.5 font-normal">
                Overview of your real estate platform
              </p>
            </div>

            {/* Quick Action Navigation Bar & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">
              {/* Search input */}
              <div className="relative w-full sm:w-48 xl:w-60">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here..."
                  className="w-full h-9 pl-3.5 pr-8 bg-white border border-gray-200/80 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0B5A46] focus:ring-1 focus:ring-[#0B5A46] transition-all shadow-2xs"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Navigation controls row */}
              <div className="flex items-center justify-between sm:justify-start gap-2.5 flex-wrap">
                {/* Quick links */}
                <div className="inline-flex items-center gap-1 p-1 bg-white border border-gray-200/80 rounded-xl shadow-2xs">
                  <Link
                    href="/admin/cities"
                    className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Cities</span>
                  </Link>

                  <Link
                    href="/admin/agents"
                    className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>Agents</span>
                  </Link>

                  <div className="px-2.5 py-1 text-xs font-medium bg-[#0B5A46] text-white rounded-lg flex items-center gap-1.5 shadow-2xs">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </div>
                </div>

                {/* Date timeframe selector */}
                <div className="relative">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="h-9 pl-8 pr-7 bg-white border border-gray-200/80 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-[#0B5A46] cursor-pointer appearance-none shadow-2xs"
                  >
                    <option value="30d">Last 30 days</option>
                    <option value="7d">Last 7 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="all">All time</option>
                  </select>
                  <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-2xl border border-gray-100 p-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#0B5A46] animate-spin" />
              <span className="text-xs font-medium text-gray-500">
                Loading live platform statistics...
              </span>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-white rounded-2xl border border-red-100 p-10 text-center space-y-3">
              <p className="text-xs text-red-500 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#0B5A46] text-white rounded-xl text-xs font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {/* Dashboard Main Grid */}
          {!isLoading && !error && stats && (
            <div className="space-y-6 sm:space-y-7">
              {/* Row 1: 4 Hero Metric Cards */}
              <DashboardStatCards metrics={stats.metrics} />

              {/* Row 2: 2 Distribution Donut Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                <PropertyOverviewCard
                  distributions={stats.distributions}
                  totalProperties={stats.metrics?.properties?.total ?? 0}
                />
                <PropertyTypeDistributionCard
                  distributions={stats.distributions}
                  totalProperties={stats.metrics?.properties?.total ?? 0}
                />
              </div>

              {/* Row 3: 3 Bottom Cards (Recent Properties, City-wise, Recent Inquiries) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                {/* Recent Properties Table / Mobile Card List */}
                <div className="lg:col-span-12 2xl:col-span-6">
                  <RecentPropertiesCard properties={stats.recentProperties} />
                </div>

                {/* City-wise Properties Progress List */}
                <div className="lg:col-span-6 2xl:col-span-3">
                  <CityWisePropertiesCard cities={stats.cityWiseProperties} />
                </div>

                {/* Recent Inquiries List */}
                <div className="lg:col-span-6 2xl:col-span-3">
                  <RecentInquiriesCard inquiries={stats.recentInquiries} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




