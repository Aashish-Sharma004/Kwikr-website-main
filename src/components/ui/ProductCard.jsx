'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Star, Heart, Eye } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import QuantityCounter from './QuantityCounter';
import toast from 'react-hot-toast';

export default function ProductCard({ product, size = 'md' }) {
  const { addItem, removeItem, updateQuantity, getItemQuantity } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { openQuickView } = useQuickView();
  const qty = getItemQuantity(product.id);
  const wishlisted = isWishlisted(product.id);
  const imageWrapRef = useRef(null);
  const heartRef = useRef(null);
  const addBtnRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();

    // Fly-to-cart: hand the header a snapshot of this card's image + position
    if (imageWrapRef.current) {
      const rect = imageWrapRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('kwikr:fly-to-cart', { detail: { image: product.image, rect } })
      );
    }
    if (addBtnRef.current) {
      gsap.fromTo(addBtnRef.current, { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    }

    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    const nowWishlisted = !wishlisted;
    toggleWishlist(product);
    toast.success(nowWishlisted ? 'Added to wishlist' : 'Removed from wishlist', { duration: 1200 });

    if (heartRef.current && nowWishlisted) {
      gsap.fromTo(
        heartRef.current,
        { scale: 1 },
        { scale: 1.5, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    openQuickView(product);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    if (qty === 1) removeItem(product.id);
    else updateQuantity(product.id, qty - 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 group cursor-pointer h-full flex flex-col">
        <div ref={imageWrapRef} className="relative overflow-hidden bg-gray-50">
          <div className={`relative w-full ${size === 'sm' ? 'h-32' : 'h-44'}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
            {/* Quick View — appears on hover, desktop only */}
            <button
              onClick={handleQuickView}
              data-cursor-hover
              className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 items-center gap-1.5 bg-white/95 backdrop-blur text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:text-green-700"
            >
              <Eye size={12} /> Quick View
            </button>
          </div>
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount > 0 && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
                {product.discount}% OFF
              </span>
            )}
            {product.isOrganic && (
              <span className="bg-lime-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
                🌿 Organic
              </span>
            )}
          </div>
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            <button
              ref={heartRef}
              onClick={handleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
            >
              <Heart size={13} className={wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
            </button>
            {product.isBestSeller && (
              <span className="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
                ⭐ Best
              </span>
            )}
          </div>
        </div>

        <div className="p-3 flex flex-col flex-1">
          <p className="text-xs text-gray-400 mb-0.5">{product.weight}{product.unit}</p>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-1 flex-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-2">{product.brand}</p>
          <div className="flex items-center gap-1 mb-2">
            <Star size={10} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900 text-sm">₹{product.price}</span>
              {product.discount > 0 && (
                <span className="text-gray-400 text-xs line-through ml-1">₹{product.mrp}</span>
              )}
            </div>
            {qty === 0 ? (
              <button
                ref={addBtnRef}
                onClick={handleAdd}
                className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg p-1.5 transition-all duration-200"
              >
                <Plus size={14} />
              </button>
            ) : (
              <QuantityCounter
                quantity={qty}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
