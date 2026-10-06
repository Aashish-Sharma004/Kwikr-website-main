'use client';

import { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';

const areas = ['Koramangala', 'Indiranagar', 'Jayanagar', 'HSR Layout', 'Whitefield', 'Electronic City', 'Marathahalli', 'BTM Layout', 'Yelahanka', 'Hebbal', 'JP Nagar', 'Rajajinagar'];

export default function DeliveryCoverageSection() {
  const [pin, setPin] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">We Deliver Across Jaipur</h2>
            <p className="text-gray-400 text-sm md:text-base mb-5">
              Kwikr dark stores are strategically placed across the city to guarantee 10-minute delivery. Here are just some of the areas we cover:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {areas.map(area => (
                <span key={area} className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <MapPin size={11} /> {area}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="text"
                value={pin}
                onChange={e => { setPin(e.target.value.replace(/\D/g, '').slice(0, 6)); setChecked(false); }}
                placeholder="Enter your pincode"
                className="flex-1 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
              />
              <button
                onClick={() => pin.length >= 4 && setChecked(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                Check
              </button>
            </div>
            {checked && (
              <p className="flex items-center gap-1.5 text-green-600 text-sm font-semibold mt-2">
                <CheckCircle2 size={14} /> Great news! We deliver to your area.
              </p>
            )}
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-72 sm:h-80 flex items-center justify-center border border-gray-100">
            <div className="text-center px-6">
              <div className="text-6xl mb-3">🗺️</div>
              <p className="font-bold text-gray-700">100+ Dark Stores</p>
              <p className="text-sm text-gray-400">Powering 10-minute delivery city-wide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
