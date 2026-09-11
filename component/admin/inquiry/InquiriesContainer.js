'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Sidebar from '../Sidebar';
import InquiryMetricCards from './InquiryMetricCards';
import InquiryFilters from './InquiryFilters';
import InquiryTable from './InquiryTable';
import InquiryDetailsDrawer from './InquiryDetailsDrawer';
import InquiryReplyModal from './InquiryReplyModal';
import InquiryDeleteModal from './InquiryDeleteModal';
import { useAdminCache } from '@/context/AdminCacheContext';

export default function InquiriesContainer() {
  const { getCached, fetchWithCache, invalidate } = useAdminCache();
  const cachedStats = getCached('/api/inquiry/stats');
  const cachedInquiries = getCached(
    '/api/inquiry?page=1&limit=15&sortBy=createdAt&sortOrder=desc'
  );

  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global top search
  const [globalSearch, setGlobalSearch] = useState('');

  // Stats State
  const [stats, setStats] = useState(cachedStats);
  const [isStatsLoading, setIsStatsLoading] = useState(!cachedStats);

  // Inquiries List & Pagination State
  const [inquiries, setInquiries] = useState(cachedInquiries?.inquiries || []);
  const [pagination, setPagination] = useState(
    cachedInquiries?.pagination || {
      page: 1,
      limit: 15,
      total: 0,
      totalPages: 1,
    }
  );
  const [isInquiriesLoading, setIsInquiriesLoading] = useState(!cachedInquiries);

  // Filter State
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateFilter: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
  });

  // Selected Inquiry for right details drawer
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Modals
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyModalInquiry, setReplyModalInquiry] = useState(null);
  const [isSendingReply, setIsSendingReply] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteModalInquiry, setDeleteModalInquiry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // CSV Export State
  const [isExporting, setIsExporting] = useState(false);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Refresh triggers
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);
  const [inquiriesRefreshKey, setInquiriesRefreshKey] = useState(0);

  // ----------------------------------------------------
  // Load Stats (Stale-While-Revalidate)
  // ----------------------------------------------------
  useEffect(() => {
    let ignore = false;
    async function loadStats() {
      try {
        const data = await fetchWithCache('/api/inquiry/stats', {
          onRevalidate: (fresh) => {
            if (!ignore) {
              setStats(fresh);
              setIsStatsLoading(false);
            }
          },
          forceRefresh: statsRefreshKey > 0,
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
  }, [statsRefreshKey, fetchWithCache]);

  // ----------------------------------------------------
  // Load Inquiries List (Stale-While-Revalidate)
  // ----------------------------------------------------
  useEffect(() => {
    let ignore = false;
    async function loadInquiries() {
      try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        if (filters.dateFilter) params.append('dateFilter', filters.dateFilter);
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        params.append('page', filters.page.toString());
        params.append('limit', '15');

        const inqUrl = `/api/inquiry?${params.toString()}`;
        const data = await fetchWithCache(inqUrl, {
          onRevalidate: (fresh) => {
            if (!ignore) {
              setInquiries(fresh.inquiries || []);
              setPagination(fresh.pagination || { page: 1, limit: 15, total: 0, totalPages: 1 });
              setIsInquiriesLoading(false);
            }
          },
          forceRefresh: inquiriesRefreshKey > 0,
        });

        if (!ignore) {
          setInquiries(data.inquiries || []);
          setPagination(data.pagination || { page: 1, limit: 15, total: 0, totalPages: 1 });

          // If on wide desktop and no inquiry is selected, auto-select the first one
          if (data.inquiries && data.inquiries.length > 0) {
            setSelectedInquiry((current) => {
              if (!current) return data.inquiries[0];
              const found = data.inquiries.find((i) => i.id === current.id);
              return found || data.inquiries[0];
            });
          } else {
            setSelectedInquiry(null);
          }
          setIsInquiriesLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error('loadInquiries error:', err);
          showToast(err.message || 'Error fetching inquiries', 'error');
          setIsInquiriesLoading(false);
        }
      }
    }

    loadInquiries();
    return () => {
      ignore = true;
    };
  }, [filters, inquiriesRefreshKey, fetchWithCache]);

  // ----------------------------------------------------
  // Filter Handlers
  // ----------------------------------------------------
  const handleFilterChange = (key, value) => {
    if (key === 'sort') {
      setFilters((prev) => ({
        ...prev,
        sortBy: value.sortBy,
        sortOrder: value.sortOrder,
        page: 1,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: 1,
      }));
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      dateFilter: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // ----------------------------------------------------
  // Select Inquiry Handler
  // ----------------------------------------------------
  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    // On small screens, open the mobile drawer
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      setMobileDrawerOpen(true);
    }
  };

  // ----------------------------------------------------
  // Status Change Handler
  // ----------------------------------------------------
  const handleStatusChange = async (inquiryId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/inquiry/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update status');
      }

      const updated = await res.json();

      setInquiries((prev) =>
        prev.map((i) => (i.id === inquiryId ? { ...i, status: updated.status } : i))
      );

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry((prev) => ({ ...prev, status: updated.status }));
      }

      showToast(`Inquiry status updated to ${updated.status}`);
      invalidate('/api/inquiry');
      setStatsRefreshKey((k) => k + 1);
      setInquiriesRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('handleStatusChange error:', err);
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // ----------------------------------------------------
  // Email Reply Handlers
  // ----------------------------------------------------
  const openReplyModal = (inquiry) => {
    setReplyModalInquiry(inquiry);
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    if (!isSendingReply) {
      setIsReplyModalOpen(false);
      setReplyModalInquiry(null);
    }
  };

  const handleSendReply = async ({ inquiryId, subject, message }) => {
    setIsSendingReply(true);
    try {
      const res = await fetch(`/api/inquiry/${inquiryId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send reply');
      }

      const data = await res.json();

      // Update in state
      setInquiries((prev) =>
        prev.map((i) => (i.id === inquiryId ? { ...i, status: 'REPLIED' } : i))
      );

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry((prev) => ({ ...prev, status: 'REPLIED' }));
      }

      showToast('Reply sent successfully to customer email!');
      closeReplyModal();
      invalidate('/api/inquiry');
      setStatsRefreshKey((k) => k + 1);
      setInquiriesRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('handleSendReply error:', err);
      showToast(err.message || 'Failed to send reply email', 'error');
    } finally {
      setIsSendingReply(false);
    }
  };

  // ----------------------------------------------------
  // Delete Handlers
  // ----------------------------------------------------
  const openDeleteModal = (inquiry) => {
    setDeleteModalInquiry(inquiry);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setIsDeleteModalOpen(false);
      setDeleteModalInquiry(null);
    }
  };

  const handleDeleteConfirm = async (inquiryId) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/inquiry/${inquiryId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete inquiry');
      }

      showToast('Inquiry deleted successfully.');

      setInquiries((prev) => prev.filter((i) => i.id !== inquiryId));

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
        setMobileDrawerOpen(false);
      }

      closeDeleteModal();
      invalidate('/api/inquiry');
      setStatsRefreshKey((k) => k + 1);
      setInquiriesRefreshKey((k) => k + 1);
    } catch (err) {
      console.error('handleDeleteConfirm error:', err);
      showToast(err.message || 'Failed to delete inquiry', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // ----------------------------------------------------
  // CSV Export Handler
  // ----------------------------------------------------
  const handleExportCsv = () => {
    if (!inquiries || inquiries.length === 0) {
      showToast('No inquiries available to export', 'error');
      return;
    }

    setIsExporting(true);
    try {
      const headers = ['ID', 'Client Name', 'Email', 'Phone', 'Property', 'Status', 'Date', 'Message'];
      const rows = inquiries.map((inq) => [
        `"${inq.id}"`,
        `"${(inq.name || '').replace(/"/g, '""')}"`,
        `"${(inq.email || '').replace(/"/g, '""')}"`,
        `"${(inq.phone || '').replace(/"/g, '""')}"`,
        `"${(inq.property?.title || 'General Inquiry').replace(/"/g, '""')}"`,
        `"${inq.status}"`,
        `"${new Date(inq.createdAt).toISOString()}"`,
        `"${(inq.message || '').replace(/"/g, '""')}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `inquiries_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Inquiries exported successfully!');
    } catch (err) {
      console.error('Export error:', err);
      showToast('Failed to export inquiries', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar activeItem="Inquiries" />
      </div>

      {/* Mobile Sidebar Backdrop */}
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
          <Sidebar activeItem="Inquiries" />
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
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Mobile Hamburger & Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Inmobiliaria Hersu" width={28} height={28} className="w-7 h-7 object-contain" />
              <span className="font-serif text-sm font-semibold text-[#1A1D20]">
                HERSU
              </span>
            </div>
          </div>

          {/* Desktop Global Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                handleFilterChange('search', e.target.value);
              }}
              placeholder="Search properties, agents, inquiries..."
              className="w-full pl-10 pr-12 py-2 text-xs bg-[#F7F8FA] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] transition-all text-gray-900 placeholder:text-gray-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] text-gray-400 font-mono shadow-2xs">
              ⌘K
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Notifications */}
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-[#0B6051] text-white flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
                SJ
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-gray-900 leading-tight">
                  Sarah Jenkins
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">
                  Admin
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Floating Toast */}
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
          </div>
        )}

        {/* Inquiries Content Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* 4 Top Metric Cards */}
          <InquiryMetricCards stats={stats} isLoading={isStatsLoading} />

          {/* Filter Bar & Header */}
          <InquiryFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onExportCsv={handleExportCsv}
            isExporting={isExporting}
            totalCount={pagination.total}
          />

          {/* Split Screen Layout: Table (Left) + Details Drawer (Right) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left: Table Section */}
            <div
              className={`transition-all duration-200 ${
                selectedInquiry ? 'xl:col-span-8' : 'xl:col-span-12'
              }`}
            >
              <InquiryTable
                inquiries={inquiries}
                isLoading={isInquiriesLoading}
                selectedInquiry={selectedInquiry}
                onSelectInquiry={handleSelectInquiry}
                onDeleteInquiry={openDeleteModal}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Right: Desktop Sticky Details Drawer (visible on xl screens) */}
            {selectedInquiry && (
              <div className="hidden xl:block xl:col-span-4 sticky top-20">
                <InquiryDetailsDrawer
                  inquiry={selectedInquiry}
                  onClose={() => setSelectedInquiry(null)}
                  onOpenReplyModal={openReplyModal}
                  onStatusChange={handleStatusChange}
                  isUpdatingStatus={isUpdatingStatus}
                  onDeleteInquiry={openDeleteModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Details Drawer (< xl screens) */}
      {mobileDrawerOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-200">
            <InquiryDetailsDrawer
              inquiry={selectedInquiry}
              onClose={() => setMobileDrawerOpen(false)}
              onOpenReplyModal={(inq) => {
                setMobileDrawerOpen(false);
                openReplyModal(inq);
              }}
              onStatusChange={handleStatusChange}
              isUpdatingStatus={isUpdatingStatus}
              onDeleteInquiry={(inq) => {
                setMobileDrawerOpen(false);
                openDeleteModal(inq);
              }}
            />
          </div>
        </div>
      )}

      {/* Reply Modal */}
      <InquiryReplyModal
        key={replyModalInquiry?.id || 'none'}
        isOpen={isReplyModalOpen}
        inquiry={replyModalInquiry}
        onClose={closeReplyModal}
        onSendReply={handleSendReply}
        isSending={isSendingReply}
      />

      {/* Delete Confirmation Modal */}
      <InquiryDeleteModal
        isOpen={isDeleteModalOpen}
        inquiry={deleteModalInquiry}
        onClose={closeDeleteModal}
        onConfirmDelete={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
