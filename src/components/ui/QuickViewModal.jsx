'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingCart, Heart, Zap, Leaf } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuantityCounter from './QuantityCounter';
import toast from 'react-hot-toast';

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();
  const { addItem, removeItem, updateQuantity, getItemQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      .fromTo(
        panelRef.current,
        { opacity: 0, y: 28, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.15'
      );

    const onKey = (e) => e.key === 'Escape' && closeQuickView();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [product, closeQuickView]);

  if (!product) return null;

  const qty = getItemQuantity(product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={closeQuickView}
      />

      <div
        ref={panelRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto grid sm:grid-cols-2"
      >
        <button
          onClick={closeQuickView}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative bg-gray-50 h-56 sm:h-full">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 320px" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">{product.discount}% OFF</span>
            )}
            {product.isOrganic && (
              <span className="bg-lime-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Leaf size={11} /> Organic
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6 flex flex-col">
          <span className="text-green-600 font-semibold text-xs">{product.brand}</span>
          <h2 className="text-lg font-black text-gray-900 leading-snug mt-1 mb-1.5">{product.name}</h2>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">{product.reviews} reviews</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-400">{product.weight}{product.unit}</span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{product.description}</p>

          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through mb-0.5">₹{product.mrp}</span>
            )}
          </div>

          <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
            <Zap size={14} className="text-green-600 flex-shrink-0" />
            <p className="text-xs font-semibold text-green-700">Delivery in 10 minutes</p>
          </div>

          <div className="mt-auto flex gap-2">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-between bg-green-600 rounded-xl px-3">
                <QuantityCounter
                  quantity={qty}
                  onIncrease={() => updateQuantity(product.id, qty + 1)}
                  onDecrease={() => (qty === 1 ? removeItem(product.id) : updateQuantity(product.id, qty - 1))}
                  size="sm"
                />
                <span className="text-white text-xs font-bold">In Cart</span>
              </div>
            )}
            <button
              onClick={() => {
                toggleWishlist(product);
                toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1200 });
              }}
              aria-label="Toggle wishlist"
              className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors ${
                wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart size={17} className={wishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>

          <Link
            href={`/products/${product.id}`}
            onClick={closeQuickView}
            className="text-center text-green-600 hover:text-green-700 font-semibold text-xs mt-3"
          >
            View Full Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
