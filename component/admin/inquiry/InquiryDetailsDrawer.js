'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  Send,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { STATUS_CONFIG, getInitials } from './InquiryTable';

export function formatFullDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatPrice(price, currency = 'MXN') {
  if (!price) return 'Price on request';
  const num = Number(price);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'MXN',
    maximumFractionDigits: 0,
  }).format(num);
}

export default function InquiryDetailsDrawer({
  inquiry,
  onClose,
  onOpenReplyModal,
  onStatusChange,
  isUpdatingStatus,
  onDeleteInquiry,
}) {
  if (!inquiry) return null;

  const statusInfo = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.NEW;
  const property = inquiry.property;
  const propertyImage =
    property?.images?.[0]?.url || '/placeholder-property.jpg';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Drawer Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900 text-base">Inquiry Details</h2>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusInfo.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`} />
            {statusInfo.label}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body (scrollable) */}
      <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
        {/* Client Profile Section */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-[#0B6051]/10 text-[#0B6051] font-bold text-base flex items-center justify-center shrink-0">
            {getInitials(inquiry.name)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 text-base">{inquiry.name}</h3>
            <div className="space-y-1 mt-1 text-xs text-gray-600">
              <a
                href={`mailto:${inquiry.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0B6051] truncate transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{inquiry.email}</span>
              </a>
              {inquiry.phone && (
                <a
                  href={`tel:${inquiry.phone}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0B6051] truncate transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{inquiry.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Property of Interest */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Property of Interest
          </h4>
          {property ? (
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex gap-3">
              <img
                src={propertyImage}
                alt={property.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0 bg-gray-200"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="font-semibold text-gray-900 text-xs truncate">
                    {property.title}
                  </h5>
                  <p className="text-[11px] text-gray-500 truncate">
                    {property.city?.name || 'Hersu Real Estate'}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-xs text-[#0B6051]">
                    {formatPrice(property.price, property.currency)}
                  </span>
                  <Link
                    href={`/properties/${property.id}`}
                    target="_blank"
                    className="text-[11px] font-medium text-[#0B6051] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-500 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span>General inquiry (not linked to a specific listing)</span>
            </div>
          )}
        </div>

        {/* Full Message */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Message
          </h4>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
            {inquiry.message}
          </div>
        </div>

        {/* Date Received */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Date Received
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formatFullDate(inquiry.createdAt)}</span>
          </div>
        </div>

        {/* Interactive Status Changer */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              value={inquiry.status}
              disabled={isUpdatingStatus}
              onChange={(e) => onStatusChange(inquiry.id, e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] cursor-pointer disabled:opacity-50"
            >
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REPLIED">Replied</option>
              <option value="CLOSED">Closed</option>
            </select>
            {isUpdatingStatus && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 text-[#0B6051] animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={() => onOpenReplyModal(inquiry)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0B6051] hover:bg-[#094d41] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Reply to Inquiry</span>
          </button>

          {inquiry.status !== 'IN_PROGRESS' && (
            <button
              type="button"
              disabled={isUpdatingStatus}
              onClick={() => onStatusChange(inquiry.id, 'IN_PROGRESS')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Mark as In Progress</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onDeleteInquiry(inquiry)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Inquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
