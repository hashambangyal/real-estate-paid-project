import React, { useState, useEffect } from 'react';
import { X, MapPin, Loader2 } from 'lucide-react';

export default function CityModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  cityData = null,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  if (!isOpen) return null;

  return (
    <CityModalContent
      mode={mode}
      cityData={cityData}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

function CityModalContent({
  mode = 'create',
  cityData = null,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  const [name, setName] = useState(cityData?.name || '');
  const [error, setError] = useState('');
  const isEdit = mode === 'edit';


  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('City name is required.');
      return;
    }

    onSubmit({ name: trimmed });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full p-6 space-y-5 z-10 font-sans animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF7F3] text-[#0B5A46] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A1D20]">
                {isEdit ? 'Edit City' : 'Add New City'}
              </h3>
              <p className="text-xs text-gray-500">
                {isEdit ? 'Update city name.' : 'Enter the city and state name.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              City Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Nogales, Sonora"
              autoFocus
              className={`w-full h-10 px-3.5 bg-white border rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                error
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:border-[#0B5A46] focus:ring-[#0B5A46]'
              }`}
            />
            {error && (
              <span className="text-[11px] text-red-500 font-medium">{error}</span>
            )}
            <p className="text-[11px] text-gray-400">
              Format: City Name, State (e.g. Hermosillo, Sonora)
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0B5A46] hover:bg-[#084A39] text-white rounded-xl text-xs font-medium shadow-xs transition-colors cursor-pointer"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isEdit ? 'Update City' : 'Create City'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
