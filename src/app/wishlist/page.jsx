'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="text-8xl mb-6">💚</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-400 mb-8 max-w-sm">Tap the heart icon on any product to save it here for later.</p>
          <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
            <ShoppingCart size={18} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const moveToCart = (item) => {
    addItem(item);
    removeFromWishlist(item.id);
    toast.success(`${item.name} moved to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="p-2 rounded-lg hover:bg-white transition-colors text-gray-600"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Heart size={22} className="text-red-500 fill-red-500" /> My Wishlist
          </h1>
          <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-0.5 rounded-full">{items.length} items</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-100 transition-colors flex gap-4">
              <Link href={`/products/${item.id}`} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">{item.brand}</p>
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-green-600 transition-colors truncate">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-400">{item.weight}{item.unit}</p>
                  </div>
                  <button onClick={() => removeFromWishlist(item.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1 ml-2 flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div>
                    <span className="font-bold text-gray-900">₹{item.price}</span>
                    {item.discount > 0 && <span className="text-xs text-gray-400 line-through ml-1">₹{item.mrp}</span>}
                  </div>
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
