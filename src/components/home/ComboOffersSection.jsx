'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { comboOffers, getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function ComboOffersSection() {
  const { addItem } = useCart();

  const handleAddCombo = (combo) => {
    combo.itemIds.forEach(id => {
      const p = getProductById(id);
      if (p) addItem(p);
    });
    toast.success(`${combo.name} added to cart!`);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900">Combo Offers</h2>
            <p className="text-gray-400 text-sm mt-0.5">Bundled deals, bigger savings</p>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-md">Save More, Together</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comboOffers.map(combo => {
            const items = combo.itemIds.map(getProductById).filter(Boolean);
            const savings = combo.mrpTotal - combo.comboPrice;
            return (
              <div key={combo.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-green-200 hover:shadow-card-hover transition-all">
                <div className="flex -space-x-3 mb-3">
                  {items.map(item => (
                    <div key={item.id} className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white bg-gray-50 shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                  ))}
                </div>
                <h3 className="font-bold text-gray-900">{combo.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{combo.description}</p>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="font-black text-gray-900 text-lg">₹{combo.comboPrice}</span>
                  <span className="text-sm text-gray-400 line-through">₹{combo.mrpTotal}</span>
                  <span className="text-xs text-green-600 font-bold">Save ₹{savings}</span>
                </div>
                <button
                  onClick={() => handleAddCombo(combo)}
                  className="w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
                >
                  <Plus size={14} /> Add Combo to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
