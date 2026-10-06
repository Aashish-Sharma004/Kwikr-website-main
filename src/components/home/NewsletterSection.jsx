'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Subscribed! Watch out for exclusive deals in your inbox.');
    setEmail('');
  };

  return (
    <section className="py-10 bg-green-gradient">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <Mail size={30} className="mx-auto mb-3 opacity-90" />
        <h2 className="text-2xl md:text-3xl font-black mb-2">Get Exclusive Deals in Your Inbox</h2>
        <p className="text-green-50 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Subscribe to our newsletter and be the first to know about flash sales, new arrivals, and members-only offers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm outline-none focus:ring-4 focus:ring-white/30 placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Subscribe <Send size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}
