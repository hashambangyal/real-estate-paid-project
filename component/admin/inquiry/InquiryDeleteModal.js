'use client';

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function InquiryDeleteModal({
  isOpen,
  inquiry,
  onClose,
  onConfirmDelete,
  isDeleting,
}) {
  if (!isOpen || !inquiry) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 p-6 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-gray-900">Delete Inquiry</h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to delete the inquiry from{' '}
          <strong className="text-gray-800">{inquiry.name}</strong>? This action
          will permanently delete this record from the database.
        </p>

        <div className="flex items-center gap-3 w-full mt-6">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onConfirmDelete(inquiry.id)}
            className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Permanently</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
