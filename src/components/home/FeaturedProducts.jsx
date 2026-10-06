'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

function getPricePerUnit(product) {
  const w = parseFloat(product.weight);
  const { price, unit } = product;
  if (unit === 'kg' || unit === 'L') {
    return w === 1 ? `₹${price} per ${unit}` : `₹${Math.round(price / w)} per ${unit}`;
  }
  if (unit === 'g') return `₹${Math.round(price * 100 / w)} per 100g`;
  if (unit === 'ml') return `₹${Math.round(price * 100 / w)} per 100ml`;
  return `₹${price} per ${product.weight}${unit}`;
}

function HomeProductCard({ product }) {
  const { addItem, getItemQuantity, updateQuantity, removeItem } = useCart();
  const qty = getItemQuantity(product.id);

  const handleAdd = () => {
    addItem(product);
    toast.success('Added to cart', { duration: 1200, position: 'bottom-center' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all duration-200 flex flex-col">

      {/* Image area */}
      <div className="relative">
        {/* Top badges */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-2">
          {product.discount > 0 ? (
            <span className="bg-green-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded leading-tight">
              {product.discount}% OFF
            </span>
          ) : product.isOrganic ? (
            <span className="bg-lime-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded leading-tight">
              Organic
            </span>
          ) : <span />}

          {product.isBestSeller && (
            <span className="bg-orange-400 text-white text-[10px] font-black px-1.5 py-0.5 rounded leading-tight">
              Best Seller
            </span>
          )}
        </div>

        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-40 bg-gray-50 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        {/* Star rating */}
        <div className="flex items-center gap-0.5 mb-1.5">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              size={10}
              className={i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Product name */}
        <Link href={`/products/${product.id}`} className="mb-1">
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-green-600 transition-colors min-h-[36px]">
            {product.name}
          </h3>
        </Link>

        {/* Weight + price per unit */}
        <p className="text-[11px] text-gray-400 mb-0.5">{product.weight}{product.unit}</p>
        <p className="text-[11px] text-gray-500 mb-3">{getPricePerUnit(product)}</p>

        {/* Price row + add button — pushed to bottom */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-base font-black text-green-600">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="text-[11px] text-gray-400 line-through">₹{product.mrp}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-xs font-black px-3 py-1.5 rounded-lg transition-all flex-shrink-0"
            >
              ADD <Plus size={11} strokeWidth={3} />
            </button>
          ) : (
            <div className="flex items-center border-2 border-green-600 rounded-lg overflow-hidden flex-shrink-0">
              <button
                onClick={() => qty === 1 ? removeItem(product.id) : updateQuantity(product.id, qty - 1)}
                className="w-7 h-7 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                aria-label="Decrease"
              >
                <Minus size={11} strokeWidth={3} />
              </button>
              <span className="w-6 text-center text-xs font-black text-green-700">{qty}</span>
              <button
                onClick={() => updateQuantity(product.id, qty + 1)}
                className="w-7 h-7 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                aria-label="Increase"
              >
                <Plus size={11} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts({ title = 'Popular Products', products = [] }) {
  return (
    <section className="bg-white border-b border-gray-100 py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-gray-900">{title}</h2>
          <Link href="/products" className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map(p => (
            <HomeProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
