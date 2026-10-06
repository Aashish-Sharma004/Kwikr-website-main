'use client';

import { useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ShareModal(  { isOpen, onClose, title, text, url }) {
  const [copied, setCopied] = useState(false);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const shareOptions = [
    {
      name: 'WhatsApp',
      color: 'bg-green-500',
      emoji: '💬',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      color: 'bg-blue-600',
      emoji: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter / X',
      color: 'bg-gray-900',
      emoji: '𝕏',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'Telegram',
      color: 'bg-sky-500',
      emoji: '✈️',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy link');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
          <h2 className="font-bold text-base sm:text-lg text-gray-900 truncate pr-2">
            Share {title}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          {/* Share options grid - responsive: 4 per row on mobile, fits nicely on desktop too */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-5">
            {shareOptions.map((opt) => (
              <a
                key={opt.name}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${opt.color} rounded-full flex items-center justify-center text-xl sm:text-2xl text-white shadow-sm group-hover:scale-105 transition-transform`}>
                  {opt.emoji}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600 font-medium text-center leading-tight">
                  {opt.name}
                </span>
              </a>
            ))}
          </div>

          {/* Copy link row */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2.5 sm:p-3">
            <p className="flex-1 text-xs sm:text-sm text-gray-500 truncate">{url}</p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 sm:py-2 rounded-lg transition-colors flex-shrink-0"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
