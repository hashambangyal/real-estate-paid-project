'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  X,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';
import Sidebar from '../Sidebar';
import PropertyMetricCards from './PropertyMetricCards';
import PropertyChartsRow from './PropertyChartsRow';
import MissingDataWidget from './MissingDataWidget';
import QuickActionsWidget from './QuickActionsWidget';
import PropertyTipWidget from './PropertyTipWidget';
import PropertiesTable from './PropertiesTable';
import PropertyFormModal from './PropertyFormModal';
import PropertyDeleteModal from './PropertyDeleteModal';
import { useAdminCache } from '@/context/AdminCacheContext';

export default function PropertiesContainer() {
  const { getCached, fetchWithCache, invalidate } = useAdminCache();

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Timeframe for Stats Chart
  const [timeframe, setTimeframe] = useState('7d');

  // Stats State (Cached initial)
  const statsUrl = `/api/properties/stats?timeframe=${timeframe}`;
  const cachedStats = getCached(statsUrl);
  const [stats, setStats] = useState(cachedStats);
  const [isStatsLoading, setIsStatsLoading] = useState(!cachedStats);

  // Properties List & Pagination State (Cached initial)
  const initialPropsUrl = `/api/properties?page=1&limit=12&sortBy=createdAt&sortOrder=desc`;
  const cachedProps = getCached(initialPropsUrl);
  const [properties, setProperties] = useState(cachedProps?.data || []);
  const [pagination, setPagination] = useState(
    cachedProps?.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 }
  );
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(!cachedProps);

  // Filter & Search State
  const [filters, setFilters] = useState({
    search: '',
    kind: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    missingFilter: null,
    page: 1,
  });

  // Auxiliary data for dropdowns in form
  const [cities, setCities] = useState(() => getCached('/api/cities') || []);
  const [agents, setAgents] = useState(() => getCached('/api/agent') || []);
  const [amenities, setAmenities] = useState(() => getCached('/api/amenities') || []);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deletingProperty, setDeletingProperty] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast / Alert Notification State
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Refresh trigger key
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setIsStatsLoading(true);
    setIsPropertiesLoading(true);
    invalidate('/api/properties');
    setRefreshKey((k) => k + 1);
  };

  // ----------------------------------------------------
  // Load Stats (Stale-While-Revalidate)
  // ----------------------------------------------------
  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const url = `/api/properties/stats?timeframe=${timeframe}`;
        const data = await fetchWithCache(url, {
          onRevalidate: (fresh) => {
            if (!ignore) {
              setStats(fresh);
              setIsStatsLoading(false);
            }
          },
          forceRefresh: refreshKey > 0,
        });

        if (!ignore) {
          setStats(data);
          setIsStatsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('fetchStats error:', err);
          setIsStatsLoading(false);
        }
      }
    }

    loadStats();
    return () => {
      ignore = true;
    };
  }, [timeframe, refreshKey, fetchWithCache]);

  // ----------------------------------------------------
  // Load Properties with active filters (Stale-While-Revalidate)
  // ----------------------------------------------------
  useEffect(() => {
    let ignore = false;

    async function loadProperties() {
      try {
        const params = new URLSearchParams();
        if (filters.page) params.set('page', String(filters.page));
        params.set('limit', '12');
        if (filters.search) params.set('search', filters.search);
        if (filters.kind) params.set('kind', filters.kind);
        if (filters.status) params.set('status', filters.status);
        if (filters.sortBy) params.set('sortBy', filters.sortBy);
        if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
        if (filters.missingFilter) params.set('missingFilter', filters.missingFilter);

        const propUrl = `/api/properties?${params.toString()}`;
        const json = await fetchWithCache(propUrl, {
          onRevalidate: (fresh) => {
            if (!ignore) {
              setProperties(fresh.data || []);
              setPagination(fresh.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 });
              setIsPropertiesLoading(false);
            }
          },
          forceRefresh: refreshKey > 0,
        });

        if (!ignore) {
          setProperties(json.data || []);
          setPagination(json.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 });
          setIsPropertiesLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('fetchProperties error:', err);
          showToast(err.message || 'Error loading properties', 'error');
          setIsPropertiesLoading(false);
        }
      }
    }

    loadProperties();
    return () => {
      ignore = true;
    };
  }, [filters, refreshKey, fetchWithCache]);

  // ----------------------------------------------------
  // Load Auxiliaries (Cities, Agents, Amenities) with Cache
  // ----------------------------------------------------
  useEffect(() => {
    let ignore = false;

    async function loadAux() {
      try {
        const [citiesData, agentsData, amenitiesData] = await Promise.all([
          fetchWithCache('/api/cities'),
          fetchWithCache('/api/agent'),
          fetchWithCache('/api/amenities'),
        ]);

        if (!ignore) {
          if (citiesData) setCities(citiesData);
          if (agentsData) setAgents(agentsData);
          if (amenitiesData) setAmenities(amenitiesData);
        }
      } catch (err) {
        console.error('loadAux error:', err);
      }
    }

    loadAux();
    return () => {
      ignore = true;
    };
  }, [fetchWithCache]);

  // ----------------------------------------------------
  // Filter Handlers
  // ----------------------------------------------------
  const handleFilterChange = (newFilterDelta) => {
    setIsPropertiesLoading(true);
    setFilters((prev) => ({
      ...prev,
      ...newFilterDelta,
    }));
  };

  const handleClearFilters = () => {
    setIsPropertiesLoading(true);
    setFilters({
      search: '',
      kind: '',
      status: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      missingFilter: null,
      page: 1,
    });
  };

  const handleQuickActionFilter = (filterKey) => {
    setIsPropertiesLoading(true);
    setFilters((prev) => ({
      ...prev,
      missingFilter: filterKey,
      page: 1,
    }));
  };

  const handleTimeframeChange = (newTf) => {
    setIsStatsLoading(true);
    setTimeframe(newTf);
  };

  // ----------------------------------------------------
  // Modal Handlers
  // ----------------------------------------------------
  const openAddModal = () => {
    setSelectedProperty(null);
    setFormMode('create');
    setIsFormModalOpen(true);
  };

  const openEditModal = (property) => {
    setSelectedProperty(property);
    setFormMode('edit');
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedProperty(null);
  };

  const openDeleteModal = (property) => {
    setDeletingProperty(property);
  };

  const closeDeleteModal = () => {
    setDeletingProperty(null);
  };

  // ----------------------------------------------------
  // Form Submit: Create or Edit
  // ----------------------------------------------------
  const handleFormSubmit = async ({
    formData,
    amenityIds,
    newFiles,
    deletedImageIds,
    isEdit,
    propertyId,
  }) => {
    setIsSubmitting(true);
    try {
      if (!isEdit) {
        // CREATE: multipart/form-data to POST /api/properties
        const payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== '') {
            payload.append(key, val);
          }
        });

        // Append amenities
        amenityIds.forEach((id) => {
          payload.append('amenityIds', id);
        });

        // Append image files
        newFiles.forEach((file) => {
          payload.append('images', file);
        });

        const res = await fetch('/api/properties', {
          method: 'POST',
          body: payload,
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to create property');
        }

        showToast('Property created successfully!');
      } else {
        // EDIT:
        // 1. PATCH /api/properties/[id]
        const updatePayload = {
          ...formData,
          price: Number(formData.price),
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
          sizeM2: formData.sizeM2 ? Number(formData.sizeM2) : null,
          parkingSpots: formData.parkingSpots ? Number(formData.parkingSpots) : null,
          cityId: formData.cityId || null,
          agentId: formData.agentId || null,
        };

        const updateRes = await fetch(`/api/properties/${propertyId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload),
        });

        if (!updateRes.ok) {
          const errData = await updateRes.json();
          throw new Error(errData.error || 'Failed to update property details');
        }

        // 2. PUT /api/properties/[id]/amenities
        await fetch(`/api/properties/${propertyId}/amenities`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amenityIds }),
        });

        // 3. Upload new images if any
        if (newFiles.length > 0) {
          const imgFormData = new FormData();
          newFiles.forEach((file) => {
            imgFormData.append('images', file);
          });
          await fetch(`/api/properties/${propertyId}/images`, {
            method: 'POST',
            body: imgFormData,
          });
        }

        // 4. Delete removed images if any
        if (deletedImageIds.length > 0) {
          await Promise.all(
            deletedImageIds.map((imgId) =>
              fetch(`/api/properties/${propertyId}/images/${imgId}`, {
                method: 'DELETE',
              })
            )
          );
        }

        showToast('Property updated successfully!');
      }

      // Refresh data
      triggerRefresh();
      closeFormModal();
    } catch (err) {
      console.error('handleFormSubmit error:', err);
      showToast(err.message || 'Error processing request', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // Delete Handler
  // ----------------------------------------------------
  const handleDeleteConfirm = async (propertyId) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete property');
      }

      showToast('Property deleted successfully.');
      closeDeleteModal();
      triggerRefresh();
    } catch (err) {
      console.error('handleDeleteConfirm error:', err);
      showToast(err.message || 'Failed to delete property', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar activeItem="Properties" />
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
          <Sidebar activeItem="Properties" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-3 p-1.5 rounded-lg text-gray-500 hover:text-gray-900 bg-gray-100 lg:hidden cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto min-w-0">
        {/* Mobile Top Navigation Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Inmobiliaria Hersu" className="w-7 h-7 object-contain" />
            <span className="font-serif text-sm font-semibold text-[#1A1D20]">
              HERSU ADMIN
            </span>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="p-2 text-[#0B5A46] hover:bg-[#0B5A46]/10 rounded-lg cursor-pointer"
            title="Add Property"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Toast Notification */}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold animate-in slide-in-from-top-3 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dashboard Main Scrollable Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Page Title & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#1A1D20] tracking-tight">
                  Properties Management
                </h1>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Overview, listing performance, data health, and property catalog control
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={triggerRefresh}
                className="p-2 text-gray-500 hover:text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-xs transition-colors cursor-pointer"
                title="Refresh catalog"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B5A46] hover:bg-[#084435] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>
          </div>

          {/* Row 1: Top 5 Metric Cards */}
          <PropertyMetricCards
            metrics={stats?.metrics}
            isLoading={isStatsLoading}
          />

          {/* Row 2: Charts (Added Over Time & Properties by Type) */}
          <PropertyChartsRow
            addedOverTime={stats?.addedOverTime || []}
            byType={stats?.byType || {}}
            totalProperties={stats?.metrics?.total?.count || 0}
            timeframe={timeframe}
            onTimeframeChange={handleTimeframeChange}
            isLoading={isStatsLoading}
          />

          {/* Row 3: Health Breakdown, Quick Actions & Tip */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            <div className="min-w-0">
              <MissingDataWidget
                breakdown={stats?.missingBreakdown}
                totalProperties={stats?.metrics?.total?.count || 0}
                isLoading={isStatsLoading}
              />
            </div>

            <div className="min-w-0">
              <QuickActionsWidget
                activeFilter={filters.missingFilter}
                onSelectFilter={handleQuickActionFilter}
              />
            </div>

            <div className="md:col-span-2 xl:col-span-1 min-w-0 flex flex-col justify-between">
              <PropertyTipWidget />
            </div>
          </div>

          {/* Row 4: Properties List Table / Cards */}
          <PropertiesTable
            properties={properties}
            pagination={pagination}
            isLoading={isPropertiesLoading}
            filters={filters}
            onFilterChange={handleFilterChange}
            onAddProperty={openAddModal}
            onEditProperty={openEditModal}
            onDeleteProperty={openDeleteModal}
            onClearFilters={handleClearFilters}
          />
        </main>
      </div>

      {/* Add / Edit Modal */}
      <PropertyFormModal
        isOpen={isFormModalOpen}
        mode={formMode}
        propertyData={selectedProperty}
        cities={cities}
        agents={agents}
        amenities={amenities}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <PropertyDeleteModal
        isOpen={Boolean(deletingProperty)}
        property={deletingProperty}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
