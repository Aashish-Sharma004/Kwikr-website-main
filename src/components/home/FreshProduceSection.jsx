'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getFreshProduce } from '@/data/products';
import QuantityCounter from '@/components/ui/QuantityCounter';
import toast from 'react-hot-toast';

export default function FreshProduceSection({
  products: productsProp,
  title = 'Fresh Fruits & Vegetables',
  subtitle = 'Handpicked daily • 100% fresh guarantee',
  badgeLabel = 'Farm Fresh',
  viewAllHref = '/products?category=fruits-vegetables',
}) {
  const produce = productsProp || getFreshProduce();
  const { addItem, getItemQuantity, updateQuantity, removeItem } = useCart();

  if (!produce || produce.length === 0) return null;

  return (
    <section className="py-10 bg-gradient-to-br from-green-50 to-lime-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Leaf size={10} /> {badgeLabel}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
          </div>
          <Link href={viewAllHref} className="text-green-600 font-semibold text-sm hover:text-green-700 hidden sm:inline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {produce.slice(0, 4).map(product => {
            const qty = getItemQuantity(product.id);
            return (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isOrganic && (
                        <span className="bg-lime-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">🌿 Organic</span>
                      )}
                      {product.discount > 0 && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{product.discount}% OFF</span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-green-400/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full">✓ Freshness Guaranteed</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-0.5">{product.weight}{product.unit}</p>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900">₹{product.price}</span>
                        {product.discount > 0 && (
                          <span className="text-gray-400 text-sm line-through ml-1.5">₹{product.mrp}</span>
                        )}
                      </div>
                      {qty === 0 ? (
                        <button
                          onClick={(e) => { e.preventDefault(); addItem(product); toast.success(`${product.name} added!`); }}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 transition-all"
                        >
                          <Plus size={14} />
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
