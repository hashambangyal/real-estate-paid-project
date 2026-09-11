'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function InquiryReplyModal({
  isOpen,
  inquiry,
  onClose,
  onSendReply,
  isSending,
}) {
  const defaultSubject = inquiry?.property?.title
    ? `Re: Inquiry regarding ${inquiry.property.title} - Inmobiliaria Hersu`
    : `Re: Your Inquiry - Inmobiliaria Hersu`;

  const defaultMessage = inquiry
    ? `Dear ${inquiry.name},\n\nThank you for reaching out regarding your inquiry.\n\nBest regards,\nInmobiliaria Hersu Team`
    : '';

  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState(defaultMessage);
  const [error, setError] = useState('');

  if (!isOpen || !inquiry) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please enter a response message.');
      return;
    }
    setError('');
    onSendReply({
      inquiryId: inquiry.id,
      subject: subject.trim(),
      message: message.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B6051]/10 text-[#0B6051] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Reply to {inquiry.name}
              </h3>
              <p className="text-xs text-gray-500">
                Email will be sent to <span className="font-medium text-gray-700">{inquiry.email}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={isSending}
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Original Inquiry Reference */}
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/60 text-xs">
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px] block mb-1">
                Original Message from {inquiry.name}:
              </span>
              <p className="text-gray-700 italic line-clamp-3">
                &ldquo;{inquiry.message}&rdquo;
              </p>
            </div>

            {/* Recipient Input (Read-only) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                value={inquiry.email}
                disabled
                className="w-full px-3.5 py-2 text-xs bg-gray-100 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051]"
                placeholder="Enter email subject"
              />
            </div>

            {/* Response Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Reply Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Type your response to the customer here..."
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B6051]/20 focus:border-[#0B6051] resize-none leading-relaxed"
              ></textarea>
              <span className="text-[11px] text-gray-400 block mt-1">
                This response will be sent directly via SMTP to the client&apos;s email and the inquiry status will be marked as &quot;Replied&quot;.
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2.5 shrink-0">
            <button
              type="button"
              disabled={isSending}
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200/70 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#0B6051] hover:bg-[#094d41] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Email...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
