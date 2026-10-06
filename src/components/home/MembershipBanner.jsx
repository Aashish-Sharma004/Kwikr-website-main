'use client';

import { useState } from 'react';
import { Crown, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const perks = [
  'Zero delivery fee on every order',
  'Early access to flash sales',
  'Exclusive member-only discounts',
  'Priority customer support',
];

export default function MembershipBanner() {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    toast.success('Welcome to Kwikr Prime! 🎉');
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-green-900 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-white text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
                <Crown size={15} /> Kwikr Prime
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">Unlock Free Delivery &amp; Exclusive Rewards</h2>
              <div className="grid sm:grid-cols-2 gap-2 max-w-xl mx-auto lg:mx-0">
                {perks.map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check size={15} className="text-green-400 flex-shrink-0" /> {perk}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 bg-white rounded-2xl p-6 text-center w-full max-w-[220px]">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Membership</p>
              <p className="text-3xl font-black text-gray-900 mt-1">₹99<span className="text-sm font-medium text-gray-400">/month</span></p>
              <button
                onClick={handleJoin}
                disabled={joined}
                className={`w-full mt-4 font-bold text-sm py-2.5 rounded-lg transition-colors ${joined ? 'bg-green-100 text-green-700' : 'bg-green-600 hover:bg-green-700 text-white'}`}
              >
                {joined ? '✓ You’re a Member' : 'Join Kwikr Prime'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
