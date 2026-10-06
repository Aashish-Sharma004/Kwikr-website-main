'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs as defaultFaqs } from '@/data/products';

export default function FAQSection({ faqs = defaultFaqs, title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
            <HelpCircle size={22} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">{title}</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left"
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180 text-green-600' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-gray-500 text-sm leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
