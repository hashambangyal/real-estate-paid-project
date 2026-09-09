import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';

export default function RecentPropertiesCard({ properties = [] }) {
  const formatPrice = (price, currency = 'MXN') => {
    if (!price && price !== 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'MXN',
      maximumFractionDigits: 0,
    }).format(Number(price));
  };



  const getKindBadgeClass = (kind) => {
    switch (kind) {
      case 'COMMERCIAL':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'LAND':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'WAREHOUSE':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'RENTED':
        return 'bg-blue-50 text-blue-700';
      case 'SOLD':
        return 'bg-gray-100 text-gray-700';
      case 'RESERVED':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-emerald-50 text-[#0B5A46]';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#1A1D20]">
            Recent Properties
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Latest added properties</p>
        </div>

        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B5A46] hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Content */}
      {properties.length === 0 ? (
        <div className="py-12 text-center text-gray-400">
          <Building2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-xs">No properties added yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile Card List View (< md) */}
          <div className="md:hidden divide-y divide-gray-100">
            {properties.map((prop) => (
              <div key={prop.id} className="py-3 flex items-center gap-3 first:pt-0 last:pb-0">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={prop.image || '/placeholder-property.jpg'}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=200';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {prop.title}
                    </h4>
                    <span className="text-xs font-bold text-gray-900 shrink-0">
                      {formatPrice(prop.price, prop.currency)}
                      {prop.offerType === 'RENT' && (
                        <span className="text-[10px] text-gray-400 font-normal">/mo</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getKindBadgeClass(
                        prop.kind
                      )}`}
                    >
                      {prop.kind ? prop.kind.charAt(0) + prop.kind.slice(1).toLowerCase() : 'Residential'}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium capitalize ${getStatusBadgeClass(
                        prop.status
                      )}`}
                    >
                      {prop.status ? prop.status.toLowerCase() : 'available'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 truncate">{prop.city}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{prop.posted || 'Recently'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-2 font-medium">Image</th>
                  <th className="py-3 px-3 font-medium">Title</th>
                  <th className="py-3 px-3 font-medium">Type</th>
                  <th className="py-3 px-3 font-medium">Price</th>
                  <th className="py-3 px-3 font-medium">Status</th>
                  <th className="py-3 px-3 font-medium">City</th>
                  <th className="py-3 px-3 font-medium text-right">Posted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {properties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-2">
                      <div className="w-11 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={prop.image || '/placeholder-property.jpg'}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=200';
                          }}
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-3 font-semibold text-gray-900 max-w-[180px] truncate">
                      {prop.title}
                    </td>

                    {/* Type Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium border ${getKindBadgeClass(
                          prop.kind
                        )}`}
                      >
                        {prop.kind ? prop.kind.charAt(0) + prop.kind.slice(1).toLowerCase() : 'Residential'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(prop.price, prop.currency)}
                      {prop.offerType === 'RENT' && (
                        <span className="text-[10px] text-gray-400 font-normal">/mo</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium capitalize ${getStatusBadgeClass(
                          prop.status
                        )}`}
                      >
                        {prop.status ? prop.status.toLowerCase() : 'available'}
                      </span>
                    </td>

                    {/* City */}
                    <td className="py-3 px-3 text-gray-600 truncate max-w-[120px]">
                      {prop.city}
                    </td>

                    {/* Posted */}
                    <td className="py-3 px-3 text-right text-gray-400 whitespace-nowrap text-[11px]">
                      {prop.posted || 'Recently'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
