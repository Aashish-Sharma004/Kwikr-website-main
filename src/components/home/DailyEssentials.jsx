'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getDailyEssentials } from '@/data/products';
import QuantityCounter from '@/components/ui/QuantityCounter';
import toast from 'react-hot-toast';

export default function DailyEssentials() {
  const essentials = getDailyEssentials().slice(0, 8);
  const { addItem, getItemQuantity, updateQuantity, removeItem } = useCart();

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Daily Essentials</h2>
            <p className="text-gray-400 text-sm mt-1">Stock up on everyday must-haves</p>
          </div>
          <Link href="/products?tag=daily-essential" className="text-green-600 font-semibold text-sm hover:text-green-700 hidden sm:inline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {essentials.map(product => {
            const qty = getItemQuantity(product.id);
            return (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group">
                  <div className="relative h-36 bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-400">{product.weight}{product.unit}</p>
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-1 mt-0.5">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="font-bold text-gray-900 text-sm">₹{product.price}</span>
                        {product.discount > 0 && (
                          <span className="text-gray-400 text-xs line-through ml-1">₹{product.mrp}</span>
                        )}
                      </div>
                      {qty === 0 ? (
                        <button
                          onClick={(e) => { e.preventDefault(); addItem(product); toast.success(`${product.name} added!`); }}
                          className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg p-1.5 transition-all"
                        >
                          <Plus size={13} />
                        </button>
                      ) : (
                        <QuantityCounter
                          quantity={qty}
                          onIncrease={(e) => { e?.preventDefault(); updateQuantity(product.id, qty + 1); }}
                          onDecrease={(e) => { e?.preventDefault(); qty === 1 ? removeItem(product.id) : updateQuantity(product.id, qty - 1); }}
                          size="sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
