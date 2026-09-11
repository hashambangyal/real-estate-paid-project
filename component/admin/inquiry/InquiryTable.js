'use client';

import React from 'react';
import {
  Eye,
  Trash2,
  Building2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Clock,
} from 'lucide-react';

export const STATUS_CONFIG = {
  NEW: {
    label: 'New',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500',
  },
  REPLIED: {
    label: 'Replied',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    dotClass: 'bg-purple-500',
  },
  CLOSED: {
    label: 'Closed',
    badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
    dotClass: 'bg-gray-400',
  },
};

export function getInitials(name) {
  if (!name) return 'CL';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatInquiryDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  if (isToday) {
    return `Today, ${timeStr}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return `Yesterday, ${timeStr}`;
  }

  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + `, ${timeStr}`
  );
}

export default function InquiryTable({
  inquiries,
  isLoading,
  selectedInquiry,
  onSelectInquiry,
  onDeleteInquiry,
  pagination,
  onPageChange,
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-100 rounded-full w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!inquiries || inquiries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">No inquiries found</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
          There are no inquiries matching your active filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Desktop / Tablet Table View (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-[#FAFBFB] text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4">Client</th>
              <th className="py-3.5 px-4">Property</th>
              <th className="py-3.5 px-4">Message</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {inquiries.map((inquiry, index) => {
              const isSelected = selectedInquiry?.id === inquiry.id;
              const statusInfo =
                STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.NEW;

              return (
                <tr
                  key={inquiry.id}
                  onClick={() => onSelectInquiry(inquiry)}
                  className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 text-center text-xs text-gray-400 font-mono">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>

                  {/* Client */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0B6051]/10 text-[#0B6051] font-semibold text-xs flex items-center justify-center shrink-0">
                        {getInitials(inquiry.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {inquiry.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate flex items-center gap-1.5 mt-0.5">
                          <span>{inquiry.email}</span>
                          {inquiry.phone && (
                            <>
                              <span className="text-gray-300">·</span>
                              <span>{inquiry.phone}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Property */}
                  <td className="py-3.5 px-4">
                    {inquiry.property ? (
                      <div className="min-w-0 max-w-[180px]">
                        <div className="font-medium text-gray-900 truncate text-xs">
                          {inquiry.property.title}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                          {inquiry.property.city?.name || 'Inmobiliaria Hersu'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">General Inquiry</span>
                    )}
                  </td>

                  {/* Message Snippet */}
                  <td className="py-3.5 px-4">
                    <p className="text-xs text-gray-600 line-clamp-2 max-w-[220px]">
                      {inquiry.message}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                    {formatInquiryDate(inquiry.createdAt)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.badgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                      {statusInfo.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectInquiry(inquiry)}
                        title="View Details"
                        className="p-1.5 text-gray-500 hover:text-[#0B6051] hover:bg-[#0B6051]/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteInquiry(inquiry)}
                        title="Delete Inquiry"
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (< md screens) */}
      <div className="md:hidden divide-y divide-gray-100">
        {inquiries.map((inquiry) => {
          const isSelected = selectedInquiry?.id === inquiry.id;
          const statusInfo =
            STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.NEW;

          return (
            <div
              key={inquiry.id}
              onClick={() => onSelectInquiry(inquiry)}
              className={`p-4 space-y-3 cursor-pointer transition-colors ${
                isSelected ? 'bg-emerald-50/40' : 'hover:bg-gray-50'
              }`}
            >
              {/* Header: Avatar, Name, Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#0B6051]/10 text-[#0B6051] font-semibold text-xs flex items-center justify-center shrink-0">
                    {getInitials(inquiry.name)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {inquiry.name}
                    </h4>
                    <span className="text-xs text-gray-500 truncate block">
                      {inquiry.email}
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border shrink-0 ${statusInfo.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
                  {statusInfo.label}
                </span>
              </div>

              {/* Property of interest if any */}
              {inquiry.property && (
                <div className="text-xs bg-gray-50 px-2.5 py-1.5 rounded-lg text-gray-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="font-medium truncate">{inquiry.property.title}</span>
                  {inquiry.property.city && (
                    <span className="text-gray-400">({inquiry.property.city.name})</span>
                  )}
                </div>
              )}

              {/* Message */}
              <p className="text-xs text-gray-600 line-clamp-2">{inquiry.message}</p>

              {/* Footer: Date & Actions */}
              <div className="flex items-center justify-between pt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatInquiryDate(inquiry.createdAt)}
                </span>

                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onSelectInquiry(inquiry)}
                    className="p-1.5 text-gray-500 hover:text-[#0B6051] hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteInquiry(inquiry)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      {pagination && pagination.totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 bg-white">
          <span>
            Showing{' '}
            <strong className="text-gray-900">
              {(pagination.page - 1) * pagination.limit + 1}
            </strong>{' '}
            to{' '}
            <strong className="text-gray-900">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </strong>{' '}
            of <strong className="text-gray-900">{pagination.total}</strong> inquiries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
