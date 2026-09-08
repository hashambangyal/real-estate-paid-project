import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function CityDeleteModal({
  isOpen,
  city,
  onClose,
  onConfirm,
  isDeleting = false,
}) {
  if (!isOpen || !city) return null;

  const hasProperties = (city.propertiesCount || 0) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full p-6 space-y-4 z-10 font-sans animate-in fade-in zoom-in-95 duration-200">
        
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6 stroke-[2]" />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-base font-bold text-gray-900">
            Delete City &quot;{city.name}&quot;?
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Are you sure you want to delete this city? This action cannot be undone.
          </p>
          {hasProperties && (
            <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 text-left">
              ⚠️ <strong>Warning:</strong> This city currently has{' '}
              <strong>{city.propertiesCount} properties</strong> linked to it.
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(city.id)}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-medium shadow-xs transition-colors cursor-pointer"
          >
            {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isDeleting ? 'Deleting...' : 'Delete City'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
