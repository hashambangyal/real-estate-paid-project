'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Camera,
  Trash2,
  Loader2,
  Building2,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Maximize2,
  Tag,
  Users,
  Check,
} from 'lucide-react';

export default function PropertyFormModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  propertyData = null,
  cities = [],
  agents = [],
  amenities = [],
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  if (!isOpen) return null;

  return (
    <PropertyFormModalContent
      mode={mode}
      propertyData={propertyData}
      cities={cities}
      agents={agents}
      amenities={amenities}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

function PropertyFormModalContent({
  mode = 'create',
  propertyData = null,
  cities = [],
  agents = [],
  amenities = [],
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  const isEdit = mode === 'edit';
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: propertyData?.title || '',
    slug: propertyData?.slug || '',
    description: propertyData?.description || '',
    offerType: propertyData?.offerType || 'SALE',
    kind: propertyData?.kind || 'RESIDENTIAL',
    status: propertyData?.status || 'AVAILABLE',
    price: propertyData?.price !== undefined && propertyData?.price !== null ? String(propertyData.price) : '',
    currency: propertyData?.currency || 'MXN',
    bedrooms: propertyData?.bedrooms !== undefined && propertyData?.bedrooms !== null ? String(propertyData.bedrooms) : '',
    bathrooms: propertyData?.bathrooms !== undefined && propertyData?.bathrooms !== null ? String(propertyData.bathrooms) : '',
    sizeM2: propertyData?.sizeM2 !== undefined && propertyData?.sizeM2 !== null ? String(propertyData.sizeM2) : '',
    parkingSpots: propertyData?.parkingSpots !== undefined && propertyData?.parkingSpots !== null ? String(propertyData.parkingSpots) : '',
    address: propertyData?.address || '',
    cityId: propertyData?.cityId || (cities[0]?.id || ''),
    agentId: propertyData?.agentId || (agents[0]?.id || ''),
  });

  // Selected Amenities IDs
  const [selectedAmenityIds, setSelectedAmenityIds] = useState(() => {
    if (propertyData?.amenities) {
      return propertyData.amenities.map((item) => item.amenityId || item.amenity?.id).filter(Boolean);
    }
    return [];
  });

  // Existing Images (for edit mode)
  const [existingImages, setExistingImages] = useState(propertyData?.images || []);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // New Image Files to Upload
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [errors, setErrors] = useState({});

  // Auto-generate slug from title if not manually edited in create mode
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      ...(!isEdit && {
        slug: newTitle
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-'),
      }),
    }));
    if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Toggle Amenity Selection
  const toggleAmenity = (id) => {
    setSelectedAmenityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle Multi-Image Upload selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = [];
    const validPreviews = [];

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit and was skipped.`);
        return;
      }
      validFiles.push(file);
      validPreviews.push({
        name: file.name,
        previewUrl: URL.createObjectURL(file),
      });
    });

    setNewImageFiles((prev) => [...prev, ...validFiles]);
    setNewImagePreviews((prev) => [...prev, ...validPreviews]);
  };

  const removeNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    setDeletedImageIds((prev) => [...prev, imageId]);
  };

  // Form Validation
  const validate = () => {
    const err = {};
    if (!formData.title.trim()) err.title = 'Title is required';
    if (!formData.slug.trim()) err.slug = 'Slug is required';
    if (!formData.price || Number(formData.price) <= 0) err.price = 'Valid price is required';
    if (!formData.agentId) err.agentId = 'Agent assignment is required';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      formData,
      amenityIds: selectedAmenityIds,
      newFiles: newImageFiles,
      deletedImageIds,
      isEdit,
      propertyId: propertyData?.id,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 text-left">
        {/* Dialog Container */}
        <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-3xl w-full z-10 font-sans flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[88vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Pinned Modal Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0B5A46]/10 text-[#0B5A46] flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A1D20]">
                  {isEdit ? 'Edit Property Listing' : 'Add New Property Listing'}
                </h3>
                <p className="text-xs text-gray-400">
                  {isEdit
                    ? 'Update listing details, specifications, and media'
                    : 'Fill in property details to add it to your catalog'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <form id="property-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0B5A46]" />
              Basic Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Property Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Luxury 3-Bedroom Villa in Residencial Campestre"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className={`w-full px-3.5 py-2 text-xs bg-gray-50/70 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                    errors.title
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-gray-200 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]'
                  }`}
                />
                {errors.title && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Slug */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  placeholder="e.g. luxury-3-bedroom-villa-campestre"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2 text-xs bg-gray-50/70 border rounded-xl focus:outline-hidden focus:ring-2 transition-all font-mono ${
                    errors.slug
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-gray-200 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]'
                  }`}
                />
                {errors.slug && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.slug}</p>
                )}
              </div>

              {/* Offer Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Offer Type <span className="text-rose-500">*</span>
                </label>
                <select
                  name="offerType"
                  value={formData.offerType}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] cursor-pointer"
                >
                  <option value="SALE">For Sale</option>
                  <option value="RENT">For Rent</option>
                </select>
              </div>

              {/* Kind */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Property Kind <span className="text-rose-500">*</span>
                </label>
                <select
                  name="kind"
                  value={formData.kind}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] cursor-pointer"
                >
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                  <option value="WAREHOUSE">Warehouse</option>
                </select>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Listing Status <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['AVAILABLE', 'SOLD', 'RENTED', 'RESERVED'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, status: st }))}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                        formData.status === st
                          ? 'border-[#0B5A46] bg-[#0B5A46]/10 text-[#0B5A46]'
                          : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {st.charAt(0) + st.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="space-y-4 pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#0B5A46]" />
              Pricing
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Price <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="2500000"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-3.5 py-2 text-xs bg-gray-50/70 border rounded-xl focus:outline-hidden focus:ring-2 transition-all ${
                      errors.price
                        ? 'border-rose-300 focus:ring-rose-200'
                        : 'border-gray-200 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]'
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] cursor-pointer"
                >
                  <option value="MXN">MXN ($)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Specifications */}
          <div className="space-y-4 pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#0B5A46]" />
              Specifications
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="3"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  step="0.5"
                  name="bathrooms"
                  placeholder="2.5"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Size (m²)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="sizeM2"
                  placeholder="180"
                  min="0"
                  value={formData.sizeM2}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Parking Spots
                </label>
                <input
                  type="number"
                  name="parkingSpots"
                  placeholder="2"
                  min="0"
                  value={formData.parkingSpots}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Location & Agent Assignment */}
          <div className="space-y-4 pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0B5A46]" />
              Location & Agent Assignment
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Blvd. Luis Donaldo Colosio #1420"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] cursor-pointer"
                >
                  <option value="">-- Select City --</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assigned Agent */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Assigned Agent <span className="text-rose-500">*</span>
                </label>
                <select
                  name="agentId"
                  value={formData.agentId}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2 text-xs bg-gray-50/70 border rounded-xl focus:outline-hidden focus:ring-2 transition-all cursor-pointer ${
                    errors.agentId
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-gray-200 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46]'
                  }`}
                >
                  <option value="">-- Select Agent --</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} ({agent.email})
                    </option>
                  ))}
                </select>
                {errors.agentId && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.agentId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Description */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Provide a detailed description of the property highlights, neighborhood, and amenities..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0B5A46]/20 focus:border-[#0B5A46] resize-y"
            />
          </div>

          {/* Section 6: Amenities */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#0B5A46]" />
                Amenities & Features
              </h4>
              <span className="text-[11px] text-gray-400">
                {selectedAmenityIds.length} selected
              </span>
            </div>

            {amenities.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No amenities available.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity) => {
                  const isSelected = selectedAmenityIds.includes(amenity.id);
                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0B5A46] bg-[#0B5A46]/10 text-[#0B5A46]'
                          : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#0B5A46]" />}
                      <span>{amenity.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 7: Images Upload */}
          <div className="space-y-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#0B5A46]" />
                Property Photos
              </h4>
              <span className="text-[11px] text-gray-400">
                Upload JPG, PNG, WEBP (max 10MB each)
              </span>
            </div>

            {/* Existing Images (Edit mode) */}
            {existingImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Current Photos
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {existingImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-4/3 rounded-xl overflow-hidden border border-gray-200 group bg-gray-50"
                    >
                      <img
                        src={img.url}
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                      {img.isCover && (
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#0B5A46] text-white shadow-xs">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img.id)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images Previews */}
            {newImagePreviews.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  New Photos to Upload
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {newImagePreviews.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#0B5A46]/30 group bg-emerald-50/20"
                    >
                      <img
                        src={item.previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600 text-white opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drop / Browse Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 hover:border-[#0B5A46] rounded-2xl p-6 text-center cursor-pointer bg-gray-50/40 hover:bg-gray-50/80 transition-all flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#0B5A46]/10 text-gray-500 group-hover:text-[#0B5A46] flex items-center justify-center transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  Click to select photos or drag & drop
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Select multiple files to upload simultaneously
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </form>

        {/* Pinned Modal Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="property-form"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#0B5A46] hover:bg-[#084435] rounded-xl transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>
              {isSubmitting
                ? isEdit
                  ? 'Saving Changes...'
                  : 'Creating Property...'
                : isEdit
                ? 'Update Property'
                : 'Publish Property'}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
