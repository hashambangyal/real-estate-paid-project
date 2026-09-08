import React from 'react';
import { Bed, Bath, Maximize2, MapPin, Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PropertyCard({ property }) {
  if (!property) return null;

  // Formatting price
  const formatPrice = (price, currency = 'MXN') => {
    if (!price && price !== 0) return 'N/A';
    const num = Number(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'MXN',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const isRent = property.offerType === 'RENT';
  const coverImage = property.images && property.images.length > 0
    ? property.images[0].url
    : '/placeholder-property.jpg';

  return (
    <div className="bg-white rounded-2xl border border-gray-100/90 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between group">
      <div>
        {/* Thumbnail with Badges */}
        <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
          <img
            src={coverImage}
            alt={property.title || 'Property'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600';
            }}
          />

          {/* Offer Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide text-white shadow-xs ${
                isRent ? 'bg-[#1E56A0]' : 'bg-[#0B5A46]'
              }`}
            >
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
          </div>

          {/* Favorite button */}
          <button
            type="button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-[19px] font-bold text-[#1A1D20] tracking-tight">
              {formatPrice(property.price, property.currency)}
            </span>
            {isRent && (
              <span className="text-xs text-gray-400 font-normal">/ month</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[14px] font-semibold text-[#1A1D20] line-clamp-1 leading-snug group-hover:text-[#0B5A46] transition-colors">
            {property.title}
          </h3>

          {/* Address / Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">
              {property.address || property.city?.name || 'Location unavailable'}
            </span>
          </div>

          {/* Specs: Beds, Baths, Size */}
          <div className="flex items-center gap-3 pt-2 text-[11.5px] text-gray-600 border-t border-gray-50">
            {property.bedrooms !== null && property.bedrooms !== undefined && (
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-gray-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms !== null && property.bathrooms !== undefined && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-gray-400" />
                <span>{Number(property.bathrooms)} Baths</span>
              </div>
            )}
            {property.sizeM2 !== null && property.sizeM2 !== undefined && (
              <div className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                <span>{Number(property.sizeM2)} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action: View Details */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <Link
          href={`/admin/properties?propertyId=${property.id}`}
          className="w-full py-2.5 px-3 rounded-xl border border-gray-200 hover:border-gray-300 text-xs font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </Link>
      </div>
    </div>
  );
}
