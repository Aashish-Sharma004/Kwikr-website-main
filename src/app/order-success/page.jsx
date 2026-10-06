'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Zap, MapPin, Clock, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
  const [countdown, setCountdown] = useState(10);
  const orderId = 'GRZ' + Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { icon: <CheckCircle size={20} />, label: 'Order Placed', desc: 'Just now', done: true },
    { icon: <Package size={20} />, label: 'Packing', desc: 'In 2 mins', done: true },
    { icon: <Zap size={20} />, label: 'Out for Delivery', desc: 'In 5 mins', done: false },
    { icon: <MapPin size={20} />, label: 'Delivered', desc: 'In 10 mins', done: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 text-3xl animate-bounce">🎉</div>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-400 mb-1">Your groceries are on their way</p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Zap size={14} /> Arriving in ~10 minutes
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-bold text-gray-900 text-sm">#{orderId}</p>
            </div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Delivery To</p>
              <p className="font-semibold text-gray-800 text-sm">Home · Koramangala</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Estimated Time</p>
              <p className="font-bold text-green-600 text-sm flex items-center gap-1"><Clock size={13} /> 10 Minutes</p>
            </div>
          </div>

          {/* Delivery Steps */}
          <div className="relative mb-8">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 mx-10" />
            <div className="absolute top-5 left-0 h-0.5 bg-green-500 mx-10" style={{ width: '35%' }} />
            <div className="flex justify-between relative">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${step.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step.icon}
                  </div>
                  <p className={`text-xs font-bold ${step.done ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</p>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
            <Link href="/" className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-xl hover:border-green-300 hover:text-green-600 transition-all flex items-center justify-center">
              Go to Home
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { emoji: '⚡', title: '10 Min', sub: 'Delivery' },
            { emoji: '🌿', title: 'Fresh', sub: 'Guaranteed' },
            { emoji: '🎁', title: '₹100 Off', sub: 'Next Order' },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-2xl p-3 shadow-sm">
              <div className="text-2xl mb-1">{card.emoji}</div>
              <p className="font-bold text-gray-900 text-sm">{card.title}</p>
              <p className="text-xs text-gray-400">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
