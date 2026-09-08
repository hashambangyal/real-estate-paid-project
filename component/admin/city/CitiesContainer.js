'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Menu, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Sidebar from '../Sidebar';
import CityFilters from './CityFilters';
import CityListTable from './CityListTable';
import CityPropertiesSection from './CityPropertiesSection';
import CityModal from './CityModal';
import CityDeleteModal from './CityDeleteModal';

export default function CitiesContainer() {
  const router = useRouter();

  // Data states
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [properties, setProperties] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);
  const [error, setError] = useState('');

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [offerType, setOfferType] = useState('ALL'); // 'ALL' | 'SALE' | 'RENT'
  const [propertyKind, setPropertyKind] = useState('ALL'); // 'ALL' | 'RESIDENTIAL' | ...
  const [status, setStatus] = useState('ALL'); // 'ALL' | 'AVAILABLE' | ...

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingCity, setEditingCity] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Layout states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ---- 1. Fetch Cities on Mount ----
  useEffect(() => {
    let ignore = false;

    async function loadInitialCities() {
      try {
        const res = await fetch('/api/cities');
        if (!res.ok) throw new Error('Failed to load cities');
        const data = await res.json();
        if (!ignore) {
          setCities(data);
          if (data.length > 0) {
            setSelectedCity(data[0]);
          }
          setIsLoadingCities(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Fetch cities error:', err);
          setError('Unable to load cities. Please try again.');
          setIsLoadingCities(false);
        }
      }
    }

    loadInitialCities();
    return () => {
      ignore = true;
    };
  }, []);

  // Refresh cities helper (called from event handlers)
  const refreshCities = useCallback(async (preserveSelectedId = null) => {
    setIsLoadingCities(true);
    setError('');
    try {
      const res = await fetch('/api/cities');
      if (!res.ok) throw new Error('Failed to load cities');
      const data = await res.json();
      setCities(data);

      if (data.length > 0) {
        if (preserveSelectedId) {
          const matched = data.find((c) => c.id === preserveSelectedId);
          setSelectedCity(matched || data[0]);
        } else if (!selectedCity) {
          setSelectedCity(data[0]);
        }
      } else {
        setSelectedCity(null);
      }
    } catch (err) {
      console.error('Fetch cities error:', err);
      setError('Unable to load cities. Please try again.');
    } finally {
      setIsLoadingCities(false);
    }
  }, [selectedCity]);

  // ---- 2. Fetch Properties for Selected City with Active Filters ----
  useEffect(() => {
    if (!selectedCity?.id) {
      return;
    }

    let ignore = false;
    const params = new URLSearchParams();
    params.set('cityId', selectedCity.id);
    params.set('limit', '50');

    if (offerType !== 'ALL') params.set('offerType', offerType);
    if (propertyKind !== 'ALL') params.set('kind', propertyKind);
    if (status !== 'ALL') params.set('status', status);

    fetch(`/api/properties?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load properties');
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setProperties(data.data || []);
          setIsLoadingProperties(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Fetch properties error:', err);
          setProperties([]);
          setIsLoadingProperties(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [selectedCity?.id, offerType, propertyKind, status]);

  // ---- 3. Filtered Cities List (Search filter) ----
  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) return cities;
    const q = searchTerm.toLowerCase().trim();
    return cities.filter((c) => c.name.toLowerCase().includes(q));
  }, [cities, searchTerm]);

  // ---- 4. Handlers for City Creation / Editing ----
  const handleOpenAddModal = () => {
    setModalMode('create');
    setEditingCity(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (city) => {
    setModalMode('edit');
    setEditingCity(city);
    setIsModalOpen(true);
  };

  const handleCityModalSubmit = async ({ name }) => {
    setIsSubmitting(true);
    try {
      if (modalMode === 'create') {
        const res = await fetch('/api/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });

        if (res.status === 401) {
          showToast('Unauthorized: Admin access required.', 'error');
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to create city');
        }

        showToast(`City "${data.name}" created successfully!`);
        setIsModalOpen(false);
        await refreshCities(data.id);
      } else {
        // Edit mode
        const res = await fetch(`/api/cities/${editingCity.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });

        if (res.status === 401) {
          showToast('Unauthorized: Admin access required.', 'error');
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to update city');
        }

        showToast(`City updated to "${data.name}"!`);
        setIsModalOpen(false);
        await refreshCities(data.id);
      }
    } catch (err) {
      console.error('Save city error:', err);
      showToast(err.message || 'Error saving city.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- 5. Handlers for City Deletion ----
  const handleOpenDeleteModal = (city) => {
    setCityToDelete(city);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (cityId) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/cities/${cityId}`, {
        method: 'DELETE',
      });

      if (res.status === 401) {
        showToast('Unauthorized: Admin access required.', 'error');
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete city');
      }

      showToast('City deleted successfully.');
      setIsDeleteModalOpen(false);
      setCityToDelete(null);

      // If deleted city was currently selected, pick first remaining
      const nextRemaining = cities.filter((c) => c.id !== cityId);
      if (selectedCity?.id === cityId) {
        setSelectedCity(nextRemaining[0] || null);
      }
      await refreshCities(nextRemaining[0]?.id || null);
    } catch (err) {
      console.error('Delete city error:', err);
      showToast(err.message || 'Failed to delete city.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // ---- 6. City Select Action ----
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    // Smooth scroll to properties section on mobile/desktop
    const el = document.getElementById('city-properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar activeItem="Cities" />
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
        <Sidebar activeItem="Cities" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Mobile Top Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-serif font-bold text-gray-800 tracking-tight">
            INMOBILIARIA HERSU
          </span>
          <div className="w-8" />
        </div>

        {/* Toast Notification Alert */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 transition-all animate-bounce ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-[#0B5A46]'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Page Container */}
        <div className="p-6 lg:p-8 space-y-7 max-w-7xl mx-auto w-full">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-[28px] font-bold text-[#1A1D20] tracking-tight">
                Cities
              </h1>
              <p className="text-xs sm:text-sm text-[#718096] mt-0.5 font-normal">
                Manage cities and view their properties
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 bg-[#0B5A46] hover:bg-[#084A39] active:bg-[#063C2E] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add City</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <CityFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            offerType={offerType}
            onOfferTypeChange={setOfferType}
            propertyKind={propertyKind}
            onPropertyKindChange={setPropertyKind}
            status={status}
            onStatusChange={setStatus}
          />

          {/* Cities Loading State */}
          {isLoadingCities && (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#0B5A46] animate-spin" />
              <p className="text-xs font-medium text-gray-500">Loading cities from database...</p>
            </div>
          )}

          {/* Cities Error State */}
          {!isLoadingCities && error && (
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center space-y-3">
              <p className="text-xs text-red-500 font-medium">{error}</p>
              <button
                onClick={() => refreshCities()}
                className="px-4 py-2 bg-[#0B5A46] text-white rounded-xl text-xs font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {/* Cities List / Table */}
          {!isLoadingCities && !error && (
            <div className="space-y-8">
              <CityListTable
                cities={filteredCities}
                selectedCityId={selectedCity?.id}
                onSelectCity={handleSelectCity}
                onEditCity={handleOpenEditModal}
                onDeleteCity={handleOpenDeleteModal}
                onAddCity={handleOpenAddModal}
              />

              {/* Properties in Selected City Section */}
              {selectedCity && (
                <CityPropertiesSection
                  selectedCity={selectedCity}
                  properties={properties}
                  isLoadingProperties={isLoadingProperties}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit City Modal */}
      <CityModal
        isOpen={isModalOpen}
        mode={modalMode}
        cityData={editingCity}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCityModalSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <CityDeleteModal
        isOpen={isDeleteModalOpen}
        city={cityToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
